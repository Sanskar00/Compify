import axios from "axios";
import { cartActionTypes, orderActionTypes } from "./types";

//order product
export const orderedProduct = async (dispatch, product) => {
  console.log(product);
  dispatch({
    type: orderActionTypes.GET_PRODUCT,
    payload: product,
  });
};

//get orders
export const getOrders = async (dispatch) => {
  try {
    const res = await axios.get("/api/order");

    dispatch({
      type: orderActionTypes.GET_ORDER,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: orderActionTypes.GET_ORDER_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

//get address
export const getAddress = (dispatch, addressId) => {
  dispatch({
    type: orderActionTypes.GET_ADDRESS,
    payload: addressId,
  });
};
