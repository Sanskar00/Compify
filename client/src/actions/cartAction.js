import axios from "axios";
import { cartActionTypes } from "./types";
import { setAlert } from "./alertAction";

//add product to cart
export const addProductCart = async (dispatches, productId) => {
  const { dispatch, alertDispatch } = dispatches;
  try {
    const res = await axios.post(`/api/cart/${productId}`);

    dispatch({
      type: cartActionTypes.ADD_PRODUCT,
      payload: res.data,
    });

    setAlert(alertDispatch, "Product added to cart", "text-green-600");
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach((error) =>
        setAlert(alertDispatch, error.msg, "text-red-900")
      );
    }
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

export const addBuyCart = async (dispatch, productId) => {
  try {
    const res = await axios.put(`/api/cart/buy/${productId}`);

    dispatch({
      type: cartActionTypes.ADD_BUY_CART,
      payload: res.data,
    });
  } catch (error) {
    const errors = error.response.data.errors;
    dispatch({
      type: cartActionTypes.GET_CART_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const removeProductCart = async (dispatches, productId) => {
  const { dispatch, alertDispatch } = dispatches;

  try {
    const res = await axios.delete(`/api/cart/delete/${productId}`);

    dispatch({
      type: cartActionTypes.REMOVE_PRODUCT,
      payload: productId,
    });

    setAlert(alertDispatch, "Product removed from cart", "text-green-600");
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
