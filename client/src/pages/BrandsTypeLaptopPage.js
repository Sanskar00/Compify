import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { brandsProductsAction } from "../actions/productAction";
import { useLocation, useParams } from "react-router";
import ProductCard from "../components/GlobalComponents/ProductCard";
import { ProductContext } from "../context/ProductsContext";

const BrandsTypeLaptopPage = (props) => {
  const [state, dispatch] = useContext(ProductContext);
  const { brand } = useParams();
  useEffect(() => {
    brandsProductsAction(dispatch, brand);
  }, []);

  const { brandTypeProducts } = state;

  return (
    <div className="mt-24 md:mt-36">
      <h1 className="text-2xl font-bold md:mx-20 lg:mx-48">
        {brand.charAt(0).toUpperCase() + brand.slice(1)} Laptops
      </h1>
      <div className="mt-4 mx-2 md:mx-32 lg:mx-60  md:w-2/3  grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {brandTypeProducts.map((product) => {
          return <ProductCard product={product} key={product._id} />;
        })}
      </div>
    </div>
  );
};

BrandsTypeLaptopPage.propTypes = {};

export default BrandsTypeLaptopPage;
