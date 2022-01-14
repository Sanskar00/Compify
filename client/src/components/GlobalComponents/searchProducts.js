import React, { useContext, useRef } from "react";
import PropTypes from "prop-types";
import { ProductContext } from "../../context/ProductsContext";
import { Link } from "react-router-dom";
import { useOutsideAlerter } from "../../utils/ProductUtils";

const SearchProducts = (props) => {
  const [state, dispatch] = useContext(ProductContext);
  const { visibility, searchProducts, products } = state;
  const wrappedRef = useRef(null);

  useOutsideAlerter(wrappedRef, state, dispatch);

  return (
    visibility == "visible" &&
    searchProducts.length > 0 && (
      <div
        className=" fixed overflow-y-auto overflow-style-hidden  rounded  h-60 w-72  top-9 left-1/4 ml-60 text-xs focus:shadow-outline shadow  flex-row content-between  z-2"
        ref={wrappedRef}
      >
        {searchProducts.length !== 0 &&
          searchProducts.map((product) => {
            return (
              <div className="bg-white  border-inherit flex border-gray-900  w-full cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <h3>{product.name}</h3>
              </div>
            );
          })}
      </div>
    )
  );
};

SearchProducts.propTypes = {};

export default SearchProducts;
