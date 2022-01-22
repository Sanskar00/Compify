import React, { createContext, useReducer } from "react";
import { personalActionTypes } from "../actions/types";

export const PersonalInfoContext = createContext();

export const PersonalInfoProvider = ({ children }) => {
  const personalInfoReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
      case personalActionTypes.GET_ADDRESSES:
        return {
          ...state,
          addresses: payload,
          loading: false,
        };
      case personalActionTypes.ADD_ADDRESS:
        return {
          ...state,
          addresses: [...state.addresses, payload],
          loading: false,
        };
      case personalActionTypes.REMOVE_ADDRESS:
        return {
          ...state,
          cart: state.cart.filter((product) => product._id !== payload),
          loading: false,
        };

      default:
        return state;
    }
  };

  const initialState = {
    addresses: [],
    cards: [],
  };

  const [state, dispatch] = useReducer(personalInfoReducer, initialState);

  return (
    <PersonalInfoContext.Provider value={[state, dispatch]}>
      {children}
    </PersonalInfoContext.Provider>
  );
};
