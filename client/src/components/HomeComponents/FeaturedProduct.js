import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import ProductCard from "../GlobalComponents/ProductCard";
import { ProductContext } from "../../context/ProductsContext";
import { featuredProductsAction } from "../../actions/productAction";

const FeaturedProduct = (props) => {
  const [state, dispatch] = useContext(ProductContext);

  const { loading, featuredProducts } = state;

  useEffect(() => {
    featuredProductsAction(dispatch);
  }, []);

  return (
    <div className="mt-4">
      <h1 className="text-xl font-bold"> Featured Product</h1>
      {featuredProducts.map((product) => {
        return <ProductCard key={product.id} product={product} />;
      })}
    </div>
  );
};

FeaturedProduct.propTypes = {};

export default FeaturedProduct;
