import React from "react";
import PropTypes from "prop-types";
import Carousel from "../components/HomeComponents/Carousel/Carousel";
import LatpopType from "../components/HomeComponents/LatpopType";
import FeaturedProduct from "../components/HomeComponents/FeaturedProduct";

const HomePage = (props) => {
  return (
    <div className="relative z-1">
      <Carousel />
      <LatpopType />
      <FeaturedProduct />
    </div>
  );
};

HomePage.propTypes = {};

export default HomePage;
