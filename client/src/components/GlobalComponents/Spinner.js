import React from "react";
import { ReactComponent as Star } from "../../assets/logo/star.svg";

const Spinner = () => {
  return (
    <div class="flex justify-center items-center text-new-blue  fixed ">
      <svg className=" animate-spin spinner-border rounded  ease  w-5 h-5 border-2 border-new-blue"></svg>
    </div>
  );
};

export default Spinner;
