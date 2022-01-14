import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { ProductContext } from "../../../context/ProductsContext";
import { currentSlideCounter } from "../../../actions/productAction";

const Caroursel_Next_Pre = (props) => {
  const [state, dispatch] = useContext(ProductContext);
  const [current, setCurrent] = useState(0);
  const { currentSlide, topfeaturedProducts } = state;

  let length = 3;

  if (topfeaturedProducts.length > 0) {
    length = topfeaturedProducts.length;
  }

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const preSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  useEffect(() => {
    currentSlideCounter(dispatch, current);
  }, [current]);

  return (
    <div className="z-10 invisible md:visible">
      {/* pre button  */}
      <button
        className="left-12 carousel-control-prev h-10 z-0 absolute  top-1/2 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline lg:left-24"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="prev"
        onClick={preSlide}
      >
        <span
          className="carousel-control-prev-icon inline-block bg-no-repeat"
          aria-hidden="true"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 "
            viewBox="0 0 20 20"
            fill="white"
          >
            <path
              fill-rule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </span>
      </button>

      {/* NextButton */}
      <button
        class="right-12 carousel-control-next absolute z-1 h-10 top-1/2 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline lg:right-24"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="next"
        onClick={nextSlide}
      >
        <span
          class="carousel-control-next-icon inline-block bg-no-repeat"
          aria-hidden="true"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 "
            viewBox="0 0 20 20"
            fill="white"
          >
            <path
              fill-rule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </span>
      </button>
    </div>
  );
};

Caroursel_Next_Pre.propTypes = {};

export default Caroursel_Next_Pre;
