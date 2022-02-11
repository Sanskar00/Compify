import React, { useEffect, useRef, useContext, useState } from "react";
import PropTypes from "prop-types";
import { ProductContext } from "../../context/ProductsContext";
import axios from "axios";
import { getProducts, searchClick } from "../../actions/productAction";
import { productActionTypes } from "../../actions/types";
import { useOutsideAlerter } from "../../utils/ProductUtils";
import SearchProducts from "./searchProducts";

const Search = (props) => {
  const [state, dispatch] = useContext(ProductContext);

  const [searchWord, setSearchWord] = useState("");

  const handleChange = (e) => {
    setSearchWord(e.target.value);
  };

  return (
    <div className=" lg:w-10/12 md:w-full grid place-items-center md:static lg:row-start-auto w-11/12  row-start-2 col-span-full lg:col-span-1 md:mt-6    md:visible  ">
      <input
        className="shadow appearance-none border rounded w-11/12 ml-8   h-3 py-3  md:static lg:pl-2 lg:py-2 lg:pr-10    text-gray-700 text-xs mb-3 leading-tight focus:outline-none focus:shadow-outline md:w-11/12 md:ml-0"
        placeholder="Search for laptops"
        onChange={handleChange}
        onClick={() => {
          searchClick(dispatch, "visible");
        }}
      ></input>
      <SearchProducts searchProduct={searchWord} />
    </div>
  );
};

Search.propTypes = {};

export default React.memo(Search);
