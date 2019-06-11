import { isAssign, isSet } from "./action";
import { Assigns } from "./assigns";
import { setWith, clone, get } from "lodash";

export const initState = {
  assign: undefined,
  meta: {},
};

function r(state = initState, action) {
  const { payload = {}, meta = {} } = action;

  if (isSet(action)) {
    return {
      ...state,
      assign: payload.assign,
      meta,
    };
  }

  return state;
}

export default function reducer(state = {}, action) {
  if (!isAssign(action)) return state;

  const { key } = action;

  const assign = Assigns.get(key);

  if (!assign) {
    return state;
  }

  return setWith(
    { ...state },
    assign.reduxPath,
    r(get(state, assign.reduxPath), action),
    clone
  );
}
