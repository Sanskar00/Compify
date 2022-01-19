import axios from "axios";
import { productActionTypes } from "./types";

//get all products
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

//get product
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

//get top featured products
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

//get fetured products
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

//get all laptop type products(eg: gaming laptop, premium laptops and student laptops)
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

//get brand type products
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
        msg: error.res.statusText,
        status: error.res.status,
      },
    });
  }
};

//add review to product
export const addReview = async (dispatch, productId, review) => {
  try {
    const res = await axios.put(`/api/product/review/${productId}`, review);

    dispatch({
      type: productActionTypes.ADD_REVIEW,
      payload: res,
    });
  } catch (error) {
    dispatch({
      type: productActionTypes.REVIEW_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

//clear product after unmounting component
export const clearProduct = async (dispatch) => {
  dispatch({
    type: productActionTypes.CLEAR_PRODUCT,
  });
};

//clear products after unmounting component
export const clearProducts = async (dispatch) => {
  dispatch({
    type: productActionTypes.CLEAR_PRODUCTS,
  });
};

//add current slide counter
export const currentSlideCounter = async (dispatch, current) => {
  dispatch({
    type: productActionTypes.CURRENT_SLIDE,
    payload: current,
  });
};
