import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import Carousel from "../components/HomeComponents/Carousel/Carousel";
import LatpopType from "../components/HomeComponents/LatpopType";
import FeaturedProduct from "../components/HomeComponents/FeaturedProduct";
import Brand from "../components/HomeComponents/Brand";
import {
  brandsProductsAction,
  clearProduct,
  clearProducts,
  laptopTypeProductsAction,
} from "../actions/productAction";
import { ProductContext } from "../context/ProductsContext";

const HomePage = (props) => {
  const [state, dispatch] = useContext(ProductContext);
  const products = [];

  useEffect(() => {
    clearProducts(dispatch);
  }, [clearProducts]);

  useEffect(() => {
    clearProduct(dispatch);
  }, [clearProduct]);

  return (
    <div className="relative z-1 overflow-hidden">
      <Carousel />
      <LatpopType />
      <FeaturedProduct />
      <Brand />
    </div>
  );
};

HomePage.propTypes = {};

export default HomePage;
