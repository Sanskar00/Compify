import React from "react";
import Button from "../GlobalComponents/Button";
import { ReactComponent as Star } from "../../assets/logo/star.svg";

const LaptopHeader = ({ product }) => {
  return (
    <div className="flex  w-full items-center justify-between ">
      <div>
        <h1 className="font-bold text-lg  ">{product.model}</h1>
        <h2 className="text-xs text-gray-500">{`${product.memorySize} Ram  ${product.storageSize}`}</h2>
      </div>
      <div className="grid place-items-center ">
        <div className="flex">
          <Star></Star>
          <Star></Star>
          <Star></Star>
          <Star></Star>
          <Star></Star>
        </div>
        <div className="text-sm text-gray-500">{`(${product.customerReviews.length} Reviews)`}</div>
      </div>
    </div>
  );
};

export default LaptopHeader;
