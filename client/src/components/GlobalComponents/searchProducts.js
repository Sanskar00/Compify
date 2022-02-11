import React, { useContext, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { ProductContext } from "../../context/ProductsContext";
import { Link, useNavigate } from "react-router-dom";
import { useOutsideAlerter } from "../../utils/ProductUtils";
import { getProducts, searchClick } from "../../actions/productAction";

const SearchProducts = ({ searchProduct }) => {
  const [state, dispatch] = useContext(ProductContext);

  useEffect(() => {
    getProducts(dispatch);
  }, []);

  const searchProducts = state.products.filter(
    (product) =>
      product.brand.toLowerCase().includes(searchProduct.toLowerCase()) ||
      product.model.toLowerCase().includes(searchProduct.toLowerCase())
  );

  const navigate = useNavigate();

  const wrappedRef = useRef(null);

  useOutsideAlerter(wrappedRef, state, dispatch);

  const { visibility } = state;

  return (
    searchProduct !== "" &&
    visibility === "visible" && (
      <div
        className={` fixed overflow-y-auto  rounded grid gap-3 bg-white  w-10/12  top-20 ml-auto mr-auto left-0 right-0 text-xs focus:shadow-outline shadow  flex-row content-between   md:w-11/12 md:top-24 lg:w-1/4 lg:top-16  `}
        ref={wrappedRef}
      >
        {searchProducts.map((product) => {
          return (
            <div
              className="bg-white text-black  flex gap-2 border-gray-900  w-full cursor-pointer"
              onClick={() => {
                navigate(`/product/${product._id}`);
                searchClick(dispatch, "invisible");
              }}
            >
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
              <h2>{product.model}</h2>
            </div>
          );
        })}
      </div>
    )
  );
};

SearchProducts.defaultProps = {
  searchProduct: "",
};

export default React.memo(SearchProducts);
