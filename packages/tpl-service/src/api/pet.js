//@ts-check

import * as schemas from "./pet.schema.js";
import { validate, checkRole } from "../middlewares";
import roles from "./_roles.js";

/**
 * @typedef {Object} State
 */

export default class {
  /**
   * Bind service to router
   *
   * @param {import("koa-router")} router the koa compatible router
   * @returns {this}
   */
  bind(router) {
    const listPets = async ctx => {
      const req = {
        query: ctx.query,
      };
      const res = await this.listPets(req, ctx);
      ctx.body = res.body;
      ctx.set("x-total-count", res.headers["x-total-count"]);
      ctx.status = 200;
    };

    const createPet = async ctx => {
      const req = {
        body: ctx.request.body,
      };
      const res = await this.createPet(req, ctx);
      ctx.body = res.body;
      ctx.status = 201;
    };

    const showPetById = async ctx => {
      const req = {
        petId: ctx.params.petId,
      };
      const res = await this.showPetById(req, ctx);
      ctx.body = res.body;
      ctx.status = 200;
    };

    const updatePet = async ctx => {
      const req = {
        petId: ctx.params.petId,
        body: ctx.request.body,
      };
      const res = await this.updatePet(req, ctx);
      ctx.body = res.body;
      ctx.status = 200;
    };

    const deletePet = async ctx => {
      const req = {
        petId: ctx.params.petId,
      };
      await this.deletePet(req, ctx);
      ctx.status = 204;
    };

    router.get(
      "/pets",
      validate(schemas.listPetsReqSchema, schemas.listPetsResSchema),
      ...this.finalMiddlewares("listPets"),
      listPets
    );
    router.post(
      "/pets",
      validate(schemas.createPetReqSchema, schemas.createPetResSchema),
      ...this.finalMiddlewares("createPet"),
      createPet
    );
    router.get(
      "/pets/:petId",
      validate(schemas.showPetByIdReqSchema, schemas.showPetByIdResSchema),
      ...this.finalMiddlewares("showPetById"),
      showPetById
    );
    router.put(
      "/pets/:petId",
      validate(schemas.updatePetReqSchema, schemas.updatePetResSchema),
      ...this.finalMiddlewares("updatePet"),
      updatePet
    );
    router.delete(
      "/pets/:petId",
      validate(schemas.deletePetReqSchema),
      ...this.finalMiddlewares("deletePet"),
      deletePet
    );

    return this;
  }

  /**
   * implement following abstract methods in the inherited class
   */

  /**
   * Ability to inject some middlewares
   *
   * @abstract
   * @param {string} operation name of operation
   * @returns {Array<import("koa").Middleware<State>>} middlewares
   */
  middlewares(operation) {
    return [];
  }

  /**
   * final middleware
   *
   * @abstract
   * @param {string} operation name of operation
   * @returns {Array<import("koa").Middleware<State>>} middlewares
   */
  finalMiddlewares(operation) {
    const mws = this.middlewares(operation);
    const cr = checkRole(operation, roles);
    return mws ? mws.concat([cr]) : [cr];
  }

  /**
   * List all pets
   *
   * @abstract
   * @param {import("../api/pet").ListPetsRequest} req listPets request
   * @param {import("../api/pet").Context<State>} [ctx] koa context
   * @returns {Promise<import("../api/pet").ListPetsResponse>} A paged array of pets
   */
  listPets(req, ctx) {
    throw new Error("not implemented");
  }

  /**
   * Create a pet
   *
   * @abstract
   * @param {import("../api/pet").CreatePetRequest} req createPet request
   * @param {import("../api/pet").Context<State>} [ctx] koa context
   * @returns {Promise<import("../api/pet").CreatePetResponse>} The Pet created
   */
  createPet(req, ctx) {
    throw new Error("not implemented");
  }

  /**
   * Find pet by id
   *
   * @abstract
   * @param {import("../api/pet").ShowPetByIdRequest} req showPetById request
   * @param {import("../api/pet").Context<State>} [ctx] koa context
   * @returns {Promise<import("../api/pet").ShowPetByIdResponse>} Expected response to a valid request
   */
  showPetById(req, ctx) {
    throw new Error("not implemented");
  }

  /**
   * Update pet
   *
   * @abstract
   * @param {import("../api/pet").UpdatePetRequest} req updatePet request
   * @param {import("../api/pet").Context<State>} [ctx] koa context
   * @returns {Promise<import("../api/pet").UpdatePetResponse>} The pet
   */
  updatePet(req, ctx) {
    throw new Error("not implemented");
  }

  /**
   *
   *
   * @abstract
   * @param {import("../api/pet").DeletePetRequest} req deletePet request
   * @param {import("../api/pet").Context<State>} [ctx] koa context
   */
  deletePet(req, ctx) {
    throw new Error("not implemented");
  }
}
