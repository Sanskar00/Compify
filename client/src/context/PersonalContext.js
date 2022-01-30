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
      case personalActionTypes.GET_ADDRESSES_LOADING:
        return {
          ...state,
          loading: true,
        };
      case personalActionTypes.GET_ADDRESS:
        return {
          ...state,
          address: payload,
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
          addresses: state.addresses.filter(
            (address) => address._id !== payload
          ),
          loading: false,
        };
      case personalActionTypes.GET_CARDS:
        return {
          ...state,
          cards: payload,
          loading: false,
          cardLoading: false,
        };
      case personalActionTypes.ADD_CARD:
        console.log(payload);
        return {
          ...state,
          session: payload,
          loading: false,
          cardLoading: false,
        };
      case personalActionTypes.DELETE_CARDS:
        return {
          ...state,
          cards: state.cards.filter((card) => card.id !== payload),
          cardLoading: false,
        };
      case personalActionTypes.GET_CARDS_ERROR:
      case personalActionTypes.ADD_CARD_ERROR:
        return {
          ...state,
          session: null,
          cards: [],
          loading: true,
          cardLoading: false,
        };
      case personalActionTypes.LOADING_TRUE:
        return {
          ...state,
          loading: true,
        };

      default:
        return state;
    }
  };

  const initialState = {
    addresses: [],
    cards: [],
    address: null,
    loading: true,
    cardLoading: true,
    session: null,
  };

  const [state, dispatch] = useReducer(personalInfoReducer, initialState);

  return (
    <PersonalInfoContext.Provider value={[state, dispatch]}>
      {children}
    </PersonalInfoContext.Provider>
  );
};
