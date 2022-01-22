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
      payload: res,
    });
  } catch (error) {
    dispatch({
      type: personalActionTypes.GET_ADDRESSES_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
