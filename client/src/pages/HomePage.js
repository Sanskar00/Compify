import React from "react";
import PropTypes from "prop-types";
import Carousel from "../components/Carousel/Carousel";
import LatpopType from "../components/LatpopType";

const HomePage = (props) => {
  return (
    <div className="relative z-1">
      <Carousel />
      <LatpopType />
    </div>
  );
};

HomePage.propTypes = {};

export default HomePage;
