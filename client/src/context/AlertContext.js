import React, { createContext, useReducer } from "react";
import { alertActionsTypes } from "../actions/types";

export const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const alertReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
      case alertActionsTypes.SET_ALERT:
        return [...state, payload];
      case alertActionsTypes.REMOVE_ALERT:
        return state.filter((alert) => alert.id !== payload);
      default:
        return state;
    }
  };

  const initialState = [];

  const [state, dispatch] = useReducer(alertReducer, initialState);

  return (
    <AlertContext.Provider value={[state, dispatch]}>
      {children}
    </AlertContext.Provider>
  );
};
