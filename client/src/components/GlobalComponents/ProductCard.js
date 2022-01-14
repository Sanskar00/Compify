import React from "react";
import PropTypes from "prop-types";
import { ReactComponent as Star } from "../../assets/logo/star.svg";
import { ReactComponent as Rupee } from "../../assets/logo/rupee.svg";

const ProductCard = ({ product }) => {
  return (
    <div className="mt-4 mx-2 flex-row">
      <div className="shadow w-screen h-36 flex ">
        <div className="w-4/12 bg-gray-100 grid place-items-center"></div>
        <div className="w-2/3 ml-4">
          <div className="mt-4 w-11/12">
            <h2 className="text-sm">
              {product.model} , {product.cpuType} {product.memorySize} RAM/
              {product.storageSize} {product.display} Laptop
            </h2>
            <div className="flex">
              <Star />
              <Star />
              <Star />
              <Star />
              <Star />
            </div>
            <div>
              <h2 className="text-sm items-center flex">
                <Rupee />
                {product.productPrice}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ProductCard.propTypes = {};

export default ProductCard;
