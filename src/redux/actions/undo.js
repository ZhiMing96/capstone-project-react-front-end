import { STORE_UNDO, EXECUTE_UNDO } from "./types";

export const storeUndo = (para) =>({
    type: STORE_UNDO,
    payload: para
  })

  export const executeUndo = (value) =>({
    type: STORE_UNDO,
    payload: value
  })