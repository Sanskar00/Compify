import { useEffect } from "react";
import { productActionTypes } from "../actions/types";

export const useOutsideAlerter = (ref, state, dispatch) => {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        if (state.visibility === "visible") {
          dispatch({
            type: productActionTypes.Search_Click,
            payload: "invisible",
          });
        }
      } else if (ref.current && ref.current.contains(event.target)) {
        dispatch({
          type: productActionTypes.Search_Click,
          payload: "visible",
        });
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, state.visibility]);
};
