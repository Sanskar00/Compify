import React from "react";
import { ReactComponent as Star } from "../../assets/logo/star.svg";

const LaptopHeader = ({ product }) => {
  return (
    <div className="flex  w-full items-center justify-between md:grid lg:ml-64 md:ml-20 md:mb-6">
      <div className="md:w-64  md:mt-12  ">
        <h1 className="font-semi-bold md:text-5xl  text-lg">{product.model}</h1>
        <h2 className="text-xs md:text-sm text-gray-500">{`${product.memorySize} Ram  ${product.storageSize}`}</h2>
      </div>
      <div className="grid place-items-center md:place-items-start  ">
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
