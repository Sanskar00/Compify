import axios from "axios";
import { productActionTypes } from "./types";

export const getProducts = async (dispatch) => {
  try {
    const res = await axios.get("/api/product");

    dispatch({
      type: productActionTypes.GET_PRODUCTS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: productActionTypes.Products_Error,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const getProduct = async (dispatch, productId, abortCont) => {
  try {
    const res = await axios.get(`/api/product/${productId}`, {
      signal: abortCont.signal,
    });

    dispatch({
      type: productActionTypes.Get_Product,
      payload: res.data,
    });
  } catch (error) {
    error.name === "AbortError"
      ? console.log("fetch aborted")
      : dispatch({
          type: productActionTypes.Get_Product_Error,
          payload: {
            msg: error.response.statusText,
            status: error.response.status,
          },
        });
  }
};

export const topFeatured = async (dispatch) => {
  try {
    const res = await axios.get("/api/product/topFeatured");

    dispatch({
      type: productActionTypes.TOP_FEATURED,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: productActionTypes.TOP_FEATURED_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const featuredProductsAction = async (dispatch) => {
  try {
    const res = await axios.get("/api/product/featuredProducts");

    dispatch({
      type: productActionTypes.FEATURED_PRODUCT,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: productActionTypes.FEATURED_PRODUCT_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const laptopTypeProductsAction = async (dispatch, laptopType) => {
  try {
    const res = await axios.get(`/api/product/laptopTypes/${laptopType}`);

    dispatch({
      type: productActionTypes.LAPTOP_TYPE_PRODUCT,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: productActionTypes.LAPTOP_TYPE_PRODUCT_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const brandsProductsAction = async (dispatch, brand) => {
  try {
    const res = await axios.get(`/api/product/brands/${brand}`);

    dispatch({
      type: productActionTypes.BRAND_TYPE_PRODUCT,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: productActionTypes.BRAND_TYPE_PRODUCT_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const clearProduct = async (dispatch) => {
  dispatch({
    type: productActionTypes.CLEAR_PRODUCT,
  });
};

export const clearProducts = async (dispatch) => {
  dispatch({
    type: productActionTypes.CLEAR_PRODUCTS,
  });
};

export const currentSlideCounter = async (dispatch, current) => {
  dispatch({
    type: productActionTypes.CURRENT_SLIDE,
    payload: current,
  });
};
