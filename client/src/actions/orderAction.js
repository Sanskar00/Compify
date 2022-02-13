import axios from "axios";
import { setAlert } from "./alertAction";
import { cartActionTypes, orderActionTypes } from "./types";

//order product
export const orderedProduct = async (dispatch, ids) => {
  try {
    const res = await axios.post(
      `/api/order/${ids.addressId}/${ids.productId}`
    );

    dispatch({
      type: orderActionTypes.ADD_ORDER,
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

//Direct payment intent
export const getDirectPayment = async (dispatches, data) => {
  const { orderdispatch, alertDispatch } = dispatches;

  const { amount, elements } = data;

  const config = {
    heders: {
      "Content-Type": "applicaion/json",
    },
  };

  try {
    const res = await axios.post(
      "/api/order/payment_intent_direct",
      { amount },
      config
    );

    orderdispatch({
      type: orderActionTypes.GET_DIRECT_PAYMENT,
      payload: {
        payment: res.data,
        elements: elements,
      },
    });

    setAlert(
      alertDispatch,
      "Payment in process confirm to buy",
      "text-green-500"
    );

    confirmClick(orderdispatch, "directContinue");
  } catch (error) {
    orderdispatch({
      type: orderActionTypes.GET_ORDER_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

//post payment_intent
export const getClientSecret = async (dispatches, data) => {
  const { orderdispatch, alertDispatch } = dispatches;
  try {
    const res = await axios.post("/api/order/payment_intent", data);

    orderdispatch({
      type: orderActionTypes.GET_CLIENT_SECRET,
      payload: {
        payment: res.data,
        cvv: data.cvv,
      },
    });

    setAlert(
      alertDispatch,
      "Payment in process confirm to buy",
      "text-green-500"
    );

    confirmClick(orderdispatch, "cardContinue");
  } catch (error) {
    orderdispatch({
      type: orderActionTypes.GET_ORDER_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
    console.error(error);
  }
};

//get orders
export const getOrders = async (dispatch) => {
  try {
    const res = await axios.get("/api/order");

    dispatch({
      type: orderActionTypes.ORDER_PRODUCT,
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

//confirm click
export const confirmClick = (dispatch, continueButton) => {
  console.log(continueButton);
  dispatch({
    type: orderActionTypes.CONFIRM_CLICK,
    payload: continueButton,
  });
};
