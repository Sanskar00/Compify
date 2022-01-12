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

export const currentSlideCounter = async (dispatch, current) => {
  dispatch({
    type: productActionTypes.CURRENT_SLIDE,
    payload: current,
  });
};
