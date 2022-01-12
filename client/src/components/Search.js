import React, { useEffect, useRef, useContext, useState } from "react";
import PropTypes from "prop-types";
import { ProductContext } from "../context/ProductsContext";
import axios from "axios";
import { getProducts } from "../actions/productAction";
import { productActionTypes } from "../actions/types";
import { useOutsideAlerter } from "../utils/ProductUtils";

const Search = (props) => {
  const [state, dispatch] = useContext(ProductContext);
  const [searchWord, setSearchWord] = useState("");

  useEffect(() => {
    getProducts(dispatch);
  }, []);

  const wrapperRef = useRef(null);

  useOutsideAlerter(wrapperRef, state, dispatch); //Used for dispatching visiblity if clicking outside or inside the search box

  return (
    <div>
      <div className=" w-72">
        <input
          className="shadow appearance-none border rounded w-full h-5 my-4 pr-10 pl-2 py-2 text-gray-700 text-xs mb-3 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Search for laptops"
          ref={wrapperRef}
        ></input>
      </div>
    </div>
  );
};

Search.propTypes = {};

export default Search;
