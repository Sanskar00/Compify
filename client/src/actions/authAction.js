import axios from "axios";
import { setAlert } from "./alertAction";
import { authActionTypes } from "./types";
import setAuthToken from "../utils/setAuthToken";

// Load User
export const loadUser = async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get("/api/auth");

    dispatch({
      type: authActionTypes.USER_LOADED,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: authActionTypes.AUTH_ERROR,
    });
  }
};

//Register User
export const register = async (dispatch, formData) => {
  try {
    const res = await axios.post("/api/users", formData);

    dispatch({
      type: authActionTypes.REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser(dispatch));
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach((error) =>
        dispatch(setAlert(dispatch, error.msg, "danger"))
      );
    }

    dispatch({
      type: authActionTypes.REGISTER_FAIL,
    });
  }
};

//login user
export const login = async (dispatch, email, password) => {
  const config = {
    heders: {
      "Content-Type": "applicaion/json",
    },
  };

  try {
    const res = await axios.post("/api/auth", { email, password }, config);

    dispatch({
      type: authActionTypes.LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser(dispatch));
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach((error) =>
        dispatch(setAlert(dispatch, error.msg, "danger"))
      );
    }

    dispatch({
      type: authActionTypes.LOGIN_FAIL,
    });
  }
};

//logout user /clear profule
export const logout = (dispatch) => {
  dispatch({
    type: authActionTypes.LOGOUT,
  });
  // dispatch({
  //   type: profileActionTypes.CLEAR_PROFILE,
  // });
};
