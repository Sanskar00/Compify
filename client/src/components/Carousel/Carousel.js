import React from "react";
import PropTypes from "prop-types";
import Caroursel_Next_Pre from "./Carousel_Next_Pre";
import Carousel_Round from "./Carousel_Round";
import CarouselContent from "./CarouselContent";

const Carousel = (props) => {
  return (
    <div
      className=" relative flex h-72 w-full  bg-new-blue  "
      data-bs-ride="carousel"
    >
      <Caroursel_Next_Pre />
      <Carousel_Round />
      <CarouselContent />
    </div>
  );
};

Carousel.propTypes = {};

export default Carousel;
