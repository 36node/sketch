import { get, camelCase, isEmpty, isArray } from "lodash";
import SwaggerParser from "swagger-parser";
import { compile } from "json-schema-to-typescript";

const initObjSchema = (properties = {}) => ({
  type: "object",
  required: [],
  properties,
});

/**
 * 对 schema 做一定的补充和变化，使得 ajv 和 compile to typedef 能正确工作
 */
function _transSchema(obj, isRequest = false) {
  if (typeof obj !== "object") return obj;
  const newobj = isArray(obj) ? [] : {};
  if (obj.format === "date-time") {
    newobj.tsType = "Date";
  }
  if (obj.type === "object") {
    if (obj.additionalProperties) {
      newobj.additionalProperties = true;
    } else {
      newobj.additionalProperties = false;
    }
  }

  for (let prop in obj) {
    if (
      (isRequest && !obj[prop].readOnly) ||
      (!isRequest && !obj[prop].writeOnly)
    ) {
      newobj[prop] = _transSchema(obj[prop], isRequest);
    }

    if (prop === "type" && obj.nullable) {
      newobj[prop] = [obj.type, "null"];
    }
  }

  return newobj;
}

/**
 * get request schema from operation
 *
 * @param {object} operation
 */
function getRequestSchema({ parameters = [], requestBody }) {
  const schema = initObjSchema();

  for (let param of parameters) {
    let seg = schema;
    if (param.in && param.in !== "path") {
      schema.properties[param.in] =
        schema.properties[param.in] || initObjSchema();
      seg = schema.properties[param.in];
    }

    if (param.required) seg.required.push(param.name);
    seg.properties[param.name] = param.schema;
  }
  if (requestBody) {
    schema.properties.body = requestBody.content;
    schema.required.push("body");
  }

  if (!isEmpty(schema.properties)) return _transSchema(schema, true);
}

/**
 * get response schema from operation.response
 *
 * @param {object} response
 */
function getResponseSchema({ headers, content }) {
  const schema = initObjSchema();
  if (content) {
    schema.properties.body = content;
    schema.required.push("body");
  }
  if (!isEmpty(headers)) {
    schema.properties.headers = initObjSchema();
    schema.required.push("headers");
  }
  for (let key in headers) {
    const lowerCasedKey = key.toLowerCase();
    if (headers[key].required) {
      schema.properties.headers.required.push(lowerCasedKey);
    }
    schema.properties.headers.properties[lowerCasedKey] = headers[key].schema;
  }

  // if no response, just return undefined
  if (!isEmpty(schema.properties)) return _transSchema(schema);
}

/**
 * get request definition from schema
 *
 * @param {object} schema
 */
function getDef(schema, name) {
  if (schema) {
    return compile(schema, name, {
      unknownAny: false,
      bannerComment: null,
    });
  }
}

/**
 * parse swagger
 *
 * @param {Object} swagger openapi object
 * @returns {Object} { info, servers, api, components, security }
 */

async function _parse(swagger) {
  const { paths, components, info, servers, security } = swagger;
  const api = {};

  for (const path in paths) {
    for (const method in paths[path]) {
      const {
        operationId,
        summary,
        tags,
        parameters,
        requestBody,
        responses,
        security,
        "x-roles": roles,
      } = paths[path][method];

      // make sure some props must exist
      if (!operationId)
        throw new Error(`missing operationId for ${method} ${path}`);
      if (!tags && !tags[0])
        throw new Error(`missing operation tag for ${method} ${path}`);

      // use 200/204 response, https://github.com/jshttp/http-errors
      const candidates = ["200", "201", "202", "204", 200, 201, 202, 204];
      const status = candidates.find(k => responses[k]);
      if (!status) {
        throw new Error(`missing 20X response for ${method} ${path}`);
      }

      const response = responses[status];
      response.status = status;
      response.content = get(response, [
        "content",
        "application/json",
        "schema",
      ]);

      // requestBody
      if (requestBody) {
        requestBody.content = get(requestBody, [
          "content",
          "application/json",
          "schema",
        ]);
      }

      // schema
      const name = camelCase(operationId);
      const requestSchema = getRequestSchema({ parameters, requestBody });
      const responseSchema = getResponseSchema(response);
      const requestDef = await getDef(requestSchema, `${name}Request`);
      const responseDef = await getDef(responseSchema, `${name}Response`);

      // use tags[0] as api's name
      api[tags[0]] = api[tags[0]] || { name: tags[0], operations: [], ref: [] };

      api[tags[0]].operations.push({
        method,
        name,
        operationId,
        parameters,
        path,
        requestBody,
        response,
        summary,
        security,
        requestSchema,
        responseSchema,
        requestDef,
        responseDef,
        roles,
      });
    }
  }

  const schemaDefs = [];
  for (const k in components.schemas) {
    const s = components.schemas[k];
    const def = await getDef(_transSchema(s), k);
    if (def) schemaDefs.push(def);
  }

  return { info, servers, api, components, schemaDefs, security };
}

/**
 * parse swagger file to expected structure
 *
 * @param {string} source file path or remote url
 * @returns { Object } { info, servers, api, components, security }
 */
export default async function parse(source, options = {}) {
  const swagger = await SwaggerParser.dereference(source);
  return await _parse(swagger);
}
