import React from "react";
import PropTypes from "prop-types";

const Carousel = (props) => {
  const carouselRoundButton = [];
  for (let i = 1; i < 7; i++) {
    carouselRoundButton.push(
      <button
        type="button"
        data-bs-target="#caraouselExampleCaptions"
        data-bs-slide-to={`${i}`}
        className="active h-2 w-2 bg-white rounded"
        aria-label={`Slide ${i}`}
      ></button>
    );
  }
  return (
    <div>
      <div className="h-60 w-full grid bg-new-blue  relative border-black ">
        <div className="carousel slide relative" data-bs-ride="carousel">
          <div className="carousel-indicators absolute right-0 bottom-0 left-0 flex justify-center p-0 mb-4 space-x-2">
            <button
              type="button"
              data-bs-target="#caraouselExampleCaptions"
              data-bs-slide-to="0"
              className="active h-2 w-2 bg-white rounded"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            {carouselRoundButton}
          </div>
          {/* pre button  */}
          <button
            className="carousel-control-prev absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline left-24"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="prev"
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
          <button
            class="carousel-control-next absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline right-24"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="next"
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
      </div>
    </div>
  );
};

Carousel.propTypes = {};

export default Carousel;
