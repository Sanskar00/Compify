import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { useLocation, useParams } from "react-router";
import ProductCard from "../components/GlobalComponents/ProductCard";
import { laptopTypeProductsAction } from "../actions/productAction";
import { ProductContext } from "../context/ProductsContext";

const LaptopTypeProducts = (props) => {
  const [state, dispatch] = useContext(ProductContext);
  const { categoryName } = useParams();
  console.log(categoryName);
  useEffect(() => {
    laptopTypeProductsAction(dispatch, categoryName);
  }, []);

  const location = useLocation();

  const { laptopTypeProducts } = state;

  console.log(laptopTypeProducts);

  return (
    <div className="mt-24 md:mt-36">
      <h1 className="text-2xl font-bold md:mx-20 lg:mx-48">
        {location.state} Laptops
      </h1>
      <div className="mt-4 mx-2 md:mx-32 lg:mx-60  md:w-2/3  grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {laptopTypeProducts.map((product) => {
          return <ProductCard product={product} key={product._id} />;
        })}
      </div>
    </div>
  );
};

LaptopTypeProducts.propTypes = {};

export default LaptopTypeProducts;
