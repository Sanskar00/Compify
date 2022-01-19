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

      case productActionTypes.Get_Product:
        return {
          ...state,
          product: payload,
          loading: false,
        };

      case productActionTypes.Search_Click:
        return {
          ...state,
          visibility: payload,
        };
      case productActionTypes.TOP_FEATURED_ERROR:
      case productActionTypes.Get_Product_Error:
      case productActionTypes.Products_Error:
      case productActionTypes.FEATURED_PRODUCT_ERROR:
      case productActionTypes.LAPTOP_TYPE_PRODUCT_ERROR:
      case productActionTypes.BRAND_TYPE_PRODUCT_ERROR:
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
      case productActionTypes.LAPTOP_TYPE_PRODUCT:
        return {
          ...state,
          laptopTypeProducts: payload,
          loading: false,
        };
      case productActionTypes.BRAND_TYPE_PRODUCT:
        return {
          ...state,
          brandTypeProducts: payload,
          loading: false,
        };
      case productActionTypes.CLEAR_PRODUCT:
        return {
          ...state,
          product: null,
        };
      case productActionTypes.CLEAR_PRODUCTS:
        return {
          ...state,
          laptopTypeProducts: [],
          brandTypeProducts: [],
        };

      case productActionTypes.CURRENT_SLIDE:
        return {
          ...state,
          currentSlide: payload,
        };

      case productActionTypes.ADD_REVIEW:
        return {
          ...state,
          product: { ...state.post, cutomerReviews: payload },
          loading: false,
        };

      default:
        return state;
    }
  };

  const inditalState = {
    products: [],
    product: null,
    topfeaturedProducts: [],
    laptopTypeProducts: [],
    brandTypeProducts: [],
    featuredProducts: [],
    searchProducts: [],
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
