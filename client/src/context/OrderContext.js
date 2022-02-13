import React, { createContext, useReducer } from "react";
import { orderActionTypes } from "../actions/types";

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const orderReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
      case orderActionTypes.ORDER_PRODUCT:
        return {
          ...state,
          order: payload,
          loading: false,
        };
      case orderActionTypes.GET_PRODUCT:
        return {
          ...state,
          product: payload,
          loading: false,
        };

      case orderActionTypes.GET_ADDRESS:
        return {
          ...state,
          addressId: payload,
          loading: false,
        };

      case orderActionTypes.GET_ORDER:
        return {
          ...state,
          order: payload.products,
          loading: false,
        };
      case orderActionTypes.GET_CLIENT_SECRET:
        return {
          ...state,
          payment: payload.payment,
          cvv: payload.cvv,
          loading: false,
        };
      case orderActionTypes.GET_DIRECT_PAYMENT:
        return {
          ...state,
          payment: payload.payment,
          elements: payload.elements,
          loading: false,
        };
      case orderActionTypes.CONFIRM_CLICK:
        return {
          ...state,
          continueButton: payload,
          loading: false,
        };
      case orderActionTypes.ORDER_PRODUCT_ERROR:
        return {
          ...state,
          cartProduct: null,
          loading: false,
        };

      default:
        return state;
    }
  };

  const initialState = {
    order: [],
    loading: true,
    product: null,
    elements: null,
    addressId: "",
    payment: null,
    continueButton: "",
    cvv: "",
  };

  const [state, dispatch] = useReducer(orderReducer, initialState);

  return (
    <OrderContext.Provider value={[state, dispatch]}>
      {children}
    </OrderContext.Provider>
  );
};
