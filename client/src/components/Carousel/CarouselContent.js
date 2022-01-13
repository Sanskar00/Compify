import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Button from "../Button";
import { ProductContext } from "../../context/ProductsContext";
import { currentSlideCounter, topFeatured } from "../../actions/productAction";

const CarouselContent = (props) => {
  const [state, dispatch] = useContext(ProductContext);
  const { currentSlide, topfeaturedProducts, loading } = state;
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

  console.log(state);

  return (
    loading === false &&
    topfeaturedProducts.map((product, index) => {
      return (
        <div
          className={
            index === currentSlide
              ? " mt-8  lg:w-full   absolute  h-52 opactity-100 lg:duration-300  "
              : "w-3/4  flex justify-between ml-40  h-52 opacity-0"
          }
        >
          {index === currentSlide && (
            <div className=" w-3/4  lg:flex lg:justify-between lg:ml-40 ml-20  h-52  md:w-1/2 lg:w-3/4">
              <div className="lg:ml-10 lg:mt-16 lg:flex-col lg:static  lg:content-around absolute bottom-0 items-baseline grid-cols-2 gap-1 ">
                <div className="lg:w-60 w-60 lg:text-2xl  text-sm text-white font-semibold ">
                  <h1>{product.model}</h1>
                  <h1>{product.cpuType}</h1>
                </div>

                <div className="lg:absolute lg:bottom-0 ">
                  <Button name="explore" />
                </div>
              </div>

              {/* laptop image */}
              <div className="  lg:h-36 lg:w-36 h-28 w-28 absolute  top-4 left-52 lg:static  r lg:mt-8 md:mt-12">
                <img src={product.productImage[0]} alt={product.model}></img>
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
