import { UPDATE_WORK, REMOVE_WORK, EDIT_WORK, ADD_WORK, UNDO_DELETED_WORK} from "./types";
//import history from "../history";

export const updateWork = (works)=> ({
  type: UPDATE_WORK, 
  payload: works
});
export const removeWork = (work)=> ({
  type: REMOVE_WORK, 
  payload: work
});
export const addWork = (work)=> ({
  type: ADD_WORK, 
  payload: work
});
export const editWork = (work)=> ({
  type: EDIT_WORK, 
  payload: work
});
export const undoDeletedWork = ()=> ({
  type: UNDO_DELETED_WORK, 
});
