import React from "react";
import { ReactComponent as Star } from "../../assets/logo/star.svg";

const Spinner = () => {
  const spinnerStyle = {
    border: "4px solid #0F3864 ",
    borderRadius: "50%",
    borderTop: "4px solid #3498db",
    width: "28px",
    height: "28px",
  };
  return (
    <div class="flex justify-center items-center text-new-blue  fixed left-0 right-0 ml-auto mr-auto  ">
      <svg
        className=" animate-spin spinner-border rounded-full border-1/2  ease  w-5 h-5 border-2 border-new-blue"
        style={spinnerStyle}
      ></svg>
    </div>
  );
};

export default Spinner;
