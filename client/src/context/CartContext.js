import React, { createContext, useReducer } from "react";
import { getJSDocReturnType } from "typescript";
import { cartActionTypes } from "../actions/types";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const cartReducer = (state, action) => {
    console.log(action);
    const { type, payload } = action;
    switch (type) {
      case cartActionTypes.GET_CART:
        return {
          ...state,
          cart: payload.products,
          loading: false,
        };
      case cartActionTypes.ADD_PRODUCT:
        return {
          ...state,
          cart: [...state.cart, payload],
          loading: false,
        };
      case cartActionTypes.REMOVE_PRODUCT:
        return {
          ...state,
          cart: state.cart.filter((product) => product.product !== payload),
          loading: false,
        };
      case cartActionTypes.GET_CART_ERROR:
      case cartActionTypes.ADD_PRODUCT_ERROR:
      case cartActionTypes.REMOVE_PRODUCT_ERROR:
        return {
          ...state,
          cart: [],
          cartProduct: null,
          loading: false,
        };

      default:
        return state;
    }
  };

  const initialState = {
    cart: [],
    cartProduct: null,
    loading: true,
    user: null,
  };

  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={[state, dispatch]}>
      {children}
    </CartContext.Provider>
  );
};
