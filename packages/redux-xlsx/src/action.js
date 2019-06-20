import { startsWith } from "lodash";
export const PREFIX = "@XLSX";

export function isXlsx(action = {}) {
  const { key, type } = action;
  return key && startsWith(type, PREFIX);
}

// import xlsx
export const IMPORT = "IMPORT";

// reset import state
export const IMPORT_RESET = "IMPORT_RESET";

// cancel import
export const IMPORT_CANCEL = "IMPORT_CANCEL";

// import record handle result
export const IMPORT_HANDLE_RESULT = "IMPORT_HANDLE_RESULT";

// set import state
export const SET_IMPORT_STATE = "SET_IMPORT_STATE";

// export xlsx
export const EXPORT = "EXPORT";

// set export state
export const SET_EXPORT_STATE = "SET_EXPORT_STATE";

export const TYPES = {
  IMPORT: `${PREFIX}/${IMPORT}`,
  IMPORT_HANDLE_RESULT: `${PREFIX}/${IMPORT_HANDLE_RESULT}`,
  IMPORT_CANCEL: `${PREFIX}/${IMPORT_CANCEL}}`,
  IMPORT_RESET: `${PREFIX}/${IMPORT_RESET}}`,
  SET_IMPORT_STATE: `${PREFIX}/${SET_IMPORT_STATE}`,
  SET_EXPORT_STATE: `${PREFIX}/${SET_EXPORT_STATE}`,
  EXPORT: `${PREFIX}/${EXPORT}`,
};
