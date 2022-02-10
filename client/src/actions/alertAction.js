import { v4 as uuidv4 } from "uuid";
import { alertActionTypes } from "./types";

export const setAlert = (dispatch, msg, alertType) => {
  const id = uuidv4();
  dispatch({
    type: alertActionTypes.SET_ALERT,
    payload: { msg, alertType, id },
  });

  setTimeout(
    () => dispatch({ type: alertActionTypes.REMOVE_ALERT, payload: id }),
    3000
  );
};
