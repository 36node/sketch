import { pickBy, startsWith, isNil, isEmpty } from "lodash";
import { camelizeKeys } from "humps";

/**
 * 将标准url中的query 格式转换成 标准 query object
 * @param {object} fromUrl query object from url
 */
export default function normalize(fromUrl) {
  const filters = pickBy(fromUrl, (_, key) => !startsWith(key, "_"));
  const others = pickBy(fromUrl, (_, key) => startsWith(key, "_"));

  const ret = {};
  const {
    _limit,
    _offset,
    _sort,
    _populate,
    _select,
    _group,
    ...custom
  } = others;

  if (!isNil(_limit)) ret.limit = Number(_limit);
  if (!isNil(_offset)) ret.offset = Number(_offset);
  if (!isNil(_sort)) ret.sort = _sort;
  if (!isNil(_populate)) ret.populate = _populate;
  if (!isNil(_select)) ret.select = _select;
  if (!isNil(_group)) ret.group = _group;

  // handle filters
  const filter = Object.keys(filters).reduce((acc, key) => {
    let val = filters[key];

    if (!val) return acc;

    if (Array.isArray(val)) {
      acc[key] = { $in: val };
      return acc;
    }

    // `_gt`, `_lt`, `_gte` `_lte` or `_ne`
    let match = /(.+)_(gt|lt|gte|lte|ne)$/.exec(key);
    if (match) {
      const path = match[1];
      const op = match[2];
      acc[path] = acc[path] || {};
      acc[path][`$${op}`] = val;
      return acc;
    }
    // other not string
    if (typeof val !== "string") {
      acc[key] = val;
      return acc;
    }
    // remove end space
    val = val.trim();

    // `_like`
    match = /(.+)_like/.exec(key);
    if (match) {
      const path = match[1];
      acc[path] = { $regex: new RegExp(val, "i") };
      return acc;
    }

    if (key === "q") acc["$text"] = { $search: val };
    else if (val === "true") acc[key] = true;
    else if (val === "false") acc[key] = false;
    else if (val === "*") acc[key] = { $ne: [] };
    else if (val === "none") acc[key] = { $eq: [] };
    else acc[key] = val;

    return acc;
  }, {});

  if (!isEmpty(filter)) {
    ret.filter = camelizeKeys(filter, (key, convert) =>
      key === "id" ? "_id" : convert(key)
    );
  }

  return {
    ...ret,
    ...custom,
  };
}