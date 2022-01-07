import React from "react";
import PropTypes from "prop-types";
import Carousel from "../components/Carousel";
import LatpopType from "../components/LatpopType";

const HomePage = (props) => {
  return (
    <div>
      <Carousel />
      <LatpopType />
    </div>
  );
};

HomePage.propTypes = {};

export default HomePage;
