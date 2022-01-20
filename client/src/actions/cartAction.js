import axios from "axios";
import { cartActionTypes } from "./types";

//add product to cart
export const addProductCart = async (dispatch, productId) => {
  try {
    const res = await axios.post(`/api/cart/${productId}`);

    dispatch({
      type: cartActionTypes.ADD_PRODUCT,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: cartActionTypes.ADD_PRODUCT_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const getCart = async (dispatch) => {
  try {
    const res = await axios.get("/api/cart");

    dispatch({
      type: cartActionTypes.GET_CART,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: cartActionTypes.GET_CART_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const removeProductCart = async (dispatch, productId) => {
  try {
    const res = await axios.delete(`/api/cart/delete/${productId}`);

    dispatch({
      type: cartActionTypes.REMOVE_PRODUCT,
      payload: productId,
    });
  } catch (error) {
    dispatch({
      type: cartActionTypes.REMOVE_PRODUCT_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
