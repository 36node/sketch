import { Context, Middleware } from "koa";
import Router, { RouterContext } from "koa-router";

declare namespace API {
  export interface ListPetsRequest {
    query?: {
      _limit?: number;
      _offset?: number;
      _sort?: string;
      _select?: string[];
      tag?: string;
      age_gt?: number;
      birthAt_gt?: string;
      birthAt_lt?: string;
      grade_gt?: string;
      grade_lt?: string;
    };
  }
  export interface ListPetsResponse {
    body: ({
      /**
       * pet's name
       */
      name?: string;
      tag?: "DOG" | "CAT";
      age?: number;
      birthAt?: string | null;
      grade?: number;
      owner?: string;
      other1?: string;
    } & {
      id: string;
      updateAt?: Date;
      updateBy?: string;
      createAt?: Date;
      createBy?: string;
    })[];
    headers: {
      "x-total-count": number;
    };
  }
  export interface CreatePetRequest {
    body: {
      /**
       * pet's name
       */
      name?: string;
      tag?: "DOG" | "CAT";
      age?: number;
      birthAt?: string | null;
      grade?: number;
      owner?: string;
      other2?: string;
    } & {
      /**
       * pet's name
       */
      name: string;
    };
  }
  export interface CreatePetResponse {
    body: {
      /**
       * pet's name
       */
      name?: string;
      tag?: "DOG" | "CAT";
      age?: number;
      birthAt?: string | null;
      grade?: number;
      owner?: string;
      other1?: string;
    } & {
      id: string;
      updateAt?: Date;
      updateBy?: string;
      createAt?: Date;
      createBy?: string;
    };
  }
  export interface ShowPetByIdRequest {
    petId: string;
  }
  export interface ShowPetByIdResponse {
    body: {
      /**
       * pet's name
       */
      name?: string;
      tag?: "DOG" | "CAT";
      age?: number;
      birthAt?: string | null;
      grade?: number;
      owner?: string;
      other1?: string;
    } & {
      id: string;
      updateAt?: Date;
      updateBy?: string;
      createAt?: Date;
      createBy?: string;
    };
  }
  export interface UpdatePetRequest {
    petId: string;
    body: {
      /**
       * pet's name
       */
      name?: string;
      tag?: "DOG" | "CAT";
      age?: number;
      birthAt?: string | null;
      grade?: number;
      owner?: string;
      other2?: string;
    };
  }
  export interface UpdatePetResponse {
    body: {
      /**
       * pet's name
       */
      name?: string;
      tag?: "DOG" | "CAT";
      age?: number;
      birthAt?: string | null;
      grade?: number;
      owner?: string;
      other1?: string;
    } & {
      id: string;
      updateAt?: Date;
      updateBy?: string;
      createAt?: Date;
      createBy?: string;
    };
  }
  export interface DeletePetRequest {
    petId: string;
  }
  type Context<StateT, CustomT = {}> = RouterContext<StateT, CustomT>;
}

declare class API {
  middlewares(operation: string): Array<Middleware>;
  bind(router: Router): API;
  listPets(req: API.ListPetsRequest, ctx: API.Context): Promise<API.ListPetsResponse>;
  createPet(req: API.CreatePetRequest, ctx: API.Context): Promise<API.CreatePetResponse>;
  showPetById(req: API.ShowPetByIdRequest, ctx: API.Context): Promise<API.ShowPetByIdResponse>;
  updatePet(req: API.UpdatePetRequest, ctx: API.Context): Promise<API.UpdatePetResponse>;
  deletePet(req: API.DeletePetRequest, ctx: API.Context): Promise<void>;
}

export = API;
