/// <reference path='../sdk/.github.d.ts' />

import * as CS from "../constants";

import { createApiActions } from "@36node/redux-api";
import { petSchema, repoSchema } from "../selectors/schemas";
import { github, petstore, auth } from "../sdk";
import { createToggleActions } from "@36node/redux-ui/toggle";
import { createAssignActions } from "@36node/redux-ui/assign";
import { createProgressActions } from "@36node/redux-ui/progress";
import { createFormActions } from "@36node/redux-form";

export const reduxFormActions = {
  formExample: createFormActions(CS.NS.REDUX_FORM.FORM_EXP),
};

export const reduxUiActions = {
  toggleExample: createToggleActions(CS.NS.REDUX_UI.TOGGLE_EXP),
  assignExample: createAssignActions(CS.NS.REDUX_UI.ASSIGN_EXP),
  progressExample: createProgressActions(CS.NS.REDUX_UI.PROGRESS_EXP),
};

export const githubActions = {
  listRepos: createApiActions(CS.NS.GITHUB.LIST_REPOS, {
    endpoint: github.repo.listRepos,
    schema: [repoSchema],
  }),
};

/**
 * pet store actions
 */
export const petStoreActions = {
  listPets: createApiActions(CS.NS.PET_STORE.LIST_PETS, {
    endpoint: petstore.pet.listPets,
    schema: [petSchema],
  }),
  createPets: createApiActions(CS.NS.PET_STORE.CREATE_PET, {
    endpoint: petstore.pet.createPet,
    schema: petSchema,
  }),
  getPet: createApiActions(CS.NS.PET_STORE.GET_PET, {
    endpoint: petstore.pet.showPetById,
    schema: petSchema,
  }),
};

export const globalActions = {
  login: createApiActions(CS.NS.GLOBAL.LOGIN, {
    endpoint: auth.session.createSession,
  }),
  logout: createApiActions(CS.NS.GLOBAL.LOGOUT, {
    endpoint: auth.session.deleteSession,
  }),
};
