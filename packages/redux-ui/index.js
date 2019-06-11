import { toggleReducer } from "./toggle";
import { assignReducer } from "./assign";
import { progressReducer } from "./progress";

export const reduxUiReducers = {
  toggles: toggleReducer,
  assigns: assignReducer,
  progresses: progressReducer,
};
