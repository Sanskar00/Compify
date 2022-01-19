import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Button from "../../GlobalComponents/Button";
import { ProductContext } from "../../../context/ProductsContext";
import {
  currentSlideCounter,
  topFeatured,
} from "../../../actions/productAction";
import { useNavigate } from "react-router";

const CarouselContent = (props) => {
  const [state, dispatch] = useContext(ProductContext);
  const { currentSlide, topfeaturedProducts, loading } = state;
  const navigate = useNavigate();
  const [count, setCounter] = useState(0);

  useEffect(() => {
    topFeatured(dispatch);
  }, []);

  let length = 0;

  if (topfeaturedProducts.length > 0) {
    length = topfeaturedProducts.length;
  }

  useEffect(() => {
    setTimeout(() => {
      setCounter(count === length - 1 ? 0 : count + 1);
    }, 3000);
  }, [count]);

  useEffect(() => {
    currentSlideCounter(dispatch, count);
  }, [count]);

  return loading === true ? (
    <div
      className={
        " mt-8  md:w-full md:ml-20  absolute w-full  h-52 opactity-100 overflow-hidden scroll-smooth  "
      }
    >
      <div className=" w-screen md:w-3/4 lg:ml-20   grid gap-8 grid-rows-2 mt-8 lg:flex lg:justify-between md:grid-col-3 md:grid-rows-1 md:gap-40">
        <div className="ml-5  lg:ml-10 lg:mt-16 lg:flex-col lg:static  lg:content-around absolute bottom-0 items-baseline grid-cols-2 gap-1 ">
          <div className="lg:w-60 w-60 lg:text-lg  text-sm text-white font-semibold ">
            <h1 className="w-20 h-5 animate-pulse bg-gray-200 bg-opacity-30"></h1>
            <h1 className="w-24 h-5 animate-pulse bg-gray-200 bg-opacity-30"></h1>
          </div>

          <div>
            <Button name="explore" />
          </div>
        </div>

        {/* laptop image */}
        <div className="animate-pulse place-self-center md:ml-40 bg-gray-200 bg-opacity-30    lg:h-48 lg:w-48 h-28 w-28 md:h-36 md:w-36 lg:static  order-last lg:mt-4 md:mt-4 md:col-end-3"></div>
      </div>
    </div>
  ) : (
    topfeaturedProducts.map((product, index) => {
      return (
        <div
          className={
            index === currentSlide
              ? " mt-8  md:w-full md:ml-20  absolute w-full  h-52 opactity-100 overflow-hidden scroll-smooth  "
              : " opacity-0"
          }
        >
          {index === currentSlide && (
            <div className=" w-screen md:w-3/4 lg:ml-20   grid gap-8 grid-rows-2 mt-8 lg:flex lg:justify-between md:grid-col-3 md:grid-rows-1 md:gap-40">
              <div className="ml-5  lg:ml-10 lg:mt-16 lg:flex-col lg:static  lg:content-around absolute bottom-0 items-baseline grid-cols-2 gap-1 ">
                <div className="lg:w-60 w-60 lg:text-lg  text-sm text-white font-semibold ">
                  <h1>{product.model}</h1>
                  <h1>{product.cpuType}</h1>
                </div>

                <div
                  onClick={() => {
                    navigate(`/product/${product._id}`);
                  }}
                >
                  <Button name="explore" />
                </div>
              </div>

              {/* laptop image */}
              <div className="place-self-center md:ml-40    lg:h-48 lg:w-48 h-32 w-32 md:h-36 md:w-36 lg:static  order-last lg:mt-4 md:mt-4 md:col-end-3">
                <img
                  className="h-full w-full"
                  src={product.productImage[3]}
                  alt={product.model}
                ></img>
              </div>
            </div>
          )}
        </div>
      );
    })
  );
};

CarouselContent.propTypes = {};

export default CarouselContent;
