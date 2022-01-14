import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import ProductCard from "../GlobalComponents/ProductCard";
import { ProductContext } from "../../context/ProductsContext";
import { featuredProductsAction } from "../../actions/productAction";

const FeaturedProduct = (props) => {
  const [state, dispatch] = useContext(ProductContext);

  const { loading, featuredProducts } = state;
  console.log(state);

  useEffect(() => {
    featuredProductsAction(dispatch);
  }, []);

  return (
    <div className="mt-4 md:mt-12">
      <h1 className="text-xl font-bold md:mx-20 lg:mx-48"> Featured Product</h1>
      <div className="mt-4 mx-2 md:mx-32 lg:mx-60  md:w-2/3  grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {featuredProducts.map((product) => {
          return <ProductCard key={product.id} product={product} />;
        })}
      </div>
    </div>
  );
};

FeaturedProduct.propTypes = {};

export default FeaturedProduct;
