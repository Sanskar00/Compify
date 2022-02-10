import { personalActionTypes } from "./types";
import axios from "axios";

export const addAddress = async (dispatch, formData) => {
  try {
    const res = await axios.post("/api/personalInfo/address", formData);

    dispatch({
      type: personalActionTypes.ADD_ADDRESS,
      payload: res,
    });
  } catch (error) {
    dispatch({
      type: personalActionTypes.ADD_ADDRESS_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const getAddresses = async (dispatch) => {
  try {
    const res = await axios.get("/api/personalInfo/address");
    dispatch({
      type: personalActionTypes.GET_ADDRESSES,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: personalActionTypes.GET_ADDRESSES_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const deleteAddress = async (dispatch, addressId) => {
  try {
    const res = await axios.delete(
      `/api/personalInfo/address/delete/${addressId}`
    );
    dispatch({
      type: personalActionTypes.REMOVE_ADDRESS,
      payload: addressId,
    });
  } catch (error) {
    dispatch({
      type: personalActionTypes.REMOVE_ADDRESS_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const changeDefaultAddress = async (dispatch, addressId) => {
  try {
    const res = await axios.put(
      `/api/personalInfo/address/default/${addressId}`
    );

    dispatch({
      type: personalActionTypes.CHANGE_DEFAULT_ADREES,
      payload: res,
    });
  } catch (error) {
    dispatch({
      type: personalActionTypes.REMOVE_ADDRESS_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const addCard = async (dispatch, url) => {
  try {
    const res = await axios.post("/api/personalInfo/v1/checkout/sessions", {
      url,
    });

    dispatch({
      type: personalActionTypes.ADD_CARD,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: personalActionTypes.ADD_CARD_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const getCards = async (dispatch) => {
  try {
    const res = await axios.get("/api/personalInfo/v1/customers/cards");
    dispatch({
      type: personalActionTypes.GET_CARDS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: personalActionTypes.GET_CARDS_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const deleteCards = async (dispatch, cardId) => {
  try {
    const res = await axios.delete(
      `/api/personalInfo/v1/customers/cards/delete/${cardId}`
    );
    dispatch({
      type: personalActionTypes.DELETE_CARDS,
      payload: cardId,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: personalActionTypes.GET_CARDS_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const loadingState = (dispatch) => {
  console.log("loading");
  dispatch(personalActionTypes.LOADING_TRUE);
};
