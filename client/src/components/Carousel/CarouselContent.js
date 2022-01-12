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
              ? " mt-8  w-full absolute  h-52 opactity-100 duration-300 "
              : "w-3/4  flex justify-between ml-40  h-52 opacity-0"
          }
        >
          {index === currentSlide && (
            <div className=" w-3/4  flex justify-between ml-40  h-52 ">
              <div className="ml-10 mt-16 flex-col content-around  items-baseline">
                <div className="w-60    text-2xl text-white font-semibold ">
                  <h1>{product.model}</h1>
                  <h1>{product.cpuType}</h1>
                </div>

                <div className="absolute bottom-0 ">
                  <Button name="explore" />
                </div>
              </div>

              {/* laptop image */}
              <div className="  h-36 w-36 mt-8">
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
