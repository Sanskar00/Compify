import React, { createContext, useReducer } from "react";
import { productActionTypes } from "../actions/types";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const productReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
      case productActionTypes.GET_PRODUCTS:
        return {
          ...state,
          products: payload,
          loading: false,
        };

      case productActionTypes.Search_Click:
        return {
          ...state,
          visibility: payload,
        };
      case productActionTypes.TOP_FEATURED_ERROR:
      case productActionTypes.Products_Error:
        return {
          ...state,
          error: payload,
          loading: false,
        };
      case productActionTypes.Get_Product:
        return {
          ...state,
          product: payload,
          loading: false,
        };
      case productActionTypes.TOP_FEATURED:
        return {
          ...state,
          topfeaturedProducts: payload,
          loading: false,
        };
      case productActionTypes.FEATURED_PRODUCT:
        return {
          ...state,
          featuredProducts: payload,
          loading: false,
        };
      case productActionTypes.CURRENT_SLIDE:
        return {
          ...state,
          currentSlide: payload,
        };

      default:
        return state;
    }
  };

  const inditalState = {
    products: [],
    topfeaturedProducts: [],
    featuredProducts: [],
    searchProducts: [],
    product: null,
    loading: true,
    visibility: "invisible",
    error: {},
    currentSlide: "0",
  };

  const [state, dispatch] = useReducer(productReducer, inditalState);

  return (
    <ProductContext.Provider value={[state, dispatch]}>
      {children}
    </ProductContext.Provider>
  );
};
