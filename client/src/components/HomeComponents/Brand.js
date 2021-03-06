import React from "react";
import PropTypes from "prop-types";
import { brands } from "../../assets/logo/brandsLogo";
import { useNavigate } from "react-router";

const Brand = (props) => {
  const navigate = useNavigate();
  return (
    <div className="my-12 md:my-12 grid">
      <h1 className="text-xl font-bold md:mx-20 lg:mx-48">Brands</h1>
      <div className="mt-4 mx-2 w-10/12 place-self-center   md:w-2/3  grid grid-cols-3 gap-2 place-items-center md:grid-cols-3  lg:grid-cols-6">
        {brands.map((brand) => {
          return (
            <div
              className="h-24 w-24 md:h-36 md:w-36 rounded-xl shadow grid place-items-center cursor-pointer"
              key={brand.brand}
              onClick={() => {
                navigate(`/brand/${brand.brand}`);
              }}
            >
              {brand.logo}
            </div>
          );
        })}
      </div>
    </div>
  );
};

Brand.propTypes = {};

export default Brand;
