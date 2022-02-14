import React from "react";
import PropTypes from "prop-types";
import { ReactComponent as Star } from "../../assets/logo/star.svg";
import { ReactComponent as Rupee } from "../../assets/logo/rupee.svg";
import { useNavigate } from "react-router";

const ProductCard = ({ product, shadow }) => {
  const navigate = useNavigate();
  return (
    <div
      className={`${shadow} w-full  md:w-full  px-4 h-36 flex md:grid  md:h-96 overflow-hidden place-self-center `}
      onClick={() => {
        navigate(`/product/${product._id}`);
      }}
    >
      <div className="w-4/12 md:w-full md:h-56  grid grid-row-2 place-items-center">
        <img
          className="md:w-56 md:h-56 "
          key={product._id}
          src={product.productImage[3]}
        ></img>
      </div>
      <div className="w-2/3 md:w-11/12 ml-4  ">
        <div className="mt-4 w-11/12 md:w-full">
          <h2 className="text-sm md:text-base font-bold">
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
          {/* <div>
            <button>{deleteButton}</button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

ProductCard.defaultProps = {
  shadow: "shadow",
};

ProductCard.propTypes = {};

export default ProductCard;
