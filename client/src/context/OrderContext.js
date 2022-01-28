import React, { createContext, useReducer } from "react";
import { orderActionTypes } from "../actions/types";

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const orderReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
      case orderActionTypes.GET_PRODUCT:
        console.log(payload);
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
      case orderActionTypes.ORDER_PRODUCT:
        return {
          ...state,
          cart: [...state.cart, payload],
          loading: false,
        };
      //   case cartActionTypes.REMOVE_PRODUCT:
      //     return {
      //       ...state,
      //       cart: state.cart.filter((product) => product._id !== payload),
      //       loading: false,
      //     };
      //   case cartActionTypes.GET_CART_ERROR:
      case orderActionTypes.ORDER_PRODUCT_ERROR:
        //   case cartActionTypes.REMOVE_PRODUCT_ERROR:
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
    cart: [],
    addressId: "",
  };

  const [state, dispatch] = useReducer(orderReducer, initialState);

  return (
    <OrderContext.Provider value={[state, dispatch]}>
      {children}
    </OrderContext.Provider>
  );
};
