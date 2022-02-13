import React, { createContext, useReducer } from "react";
import { authActionTypes, productActionTypes } from "../actions/types";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const authReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
      case authActionTypes.USER_LOADED:
      case authActionTypes.EDIT_PROFILE:
        return {
          ...state,
          isAuthenticated: true,
          loading: false,
          user: payload,
        };
      case authActionTypes.REGISTER_SUCCESS:
      case authActionTypes.LOGIN_SUCCESS:
        localStorage.setItem("token", payload.token);
        return {
          ...state,
          ...payload,
          isAuthenticated: true,
          loading: false,
        };
      case authActionTypes.AUTH_ERROR:
      case authActionTypes.ACCOUNT_DELELTED:
      case authActionTypes.LOGOUT:
      case authActionTypes.LOGIN_FAIL:
        localStorage.removeItem("token");
        return {
          ...state,
          token: null,
          isAuthenticated: false,
          loading: false,
          user: null,
        };
      default:
        return state;
    }
  };

  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    user: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={[state, dispatch]}>
      {children}
    </AuthContext.Provider>
  );
};
