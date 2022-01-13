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
    <div className=" lg:w-10/12 md:w-11/12  md:static lg:row-start-auto w-10/12 row-start-2 col-span-full lg:col-span-1 md:mt-6 flex   md:visible  ">
      <input
        className="shadow appearance-none border rounded w-full ml-8  md:w-full h-3 py-3  md:static lg:pl-2 lg:py-2 lg:pr-10    text-gray-700 text-xs mb-3 leading-tight focus:outline-none focus:shadow-outline"
        placeholder="Search for laptops"
        ref={wrapperRef}
      ></input>
    </div>
  );
};

Search.propTypes = {};

export default Search;
