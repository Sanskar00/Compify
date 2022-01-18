import React from "react";
import PropTypes from "prop-types";
import { brands } from "../../assets/logo/brandsLogo";
import { useNavigate } from "react-router";

const Brand = (props) => {
  const navigate = useNavigate();
  return (
    <div className="mt-4 md:my-12 grid">
      <h1 className="text-xl font-bold md:mx-20 lg:mx-48">Brands</h1>
      <div className="mt-4 mx-2 w-2/3 place-self-center md:mx-32 lg:mx-60  md:w-2/3  grid grid-cols-3 gap-2 place-items-center md:grid-cols-3  lg:grid-cols-6">
        {brands.map((brand) => {
          return (
            <div
              className="h-12 w-12 md:h-36 md:w-36 shadow grid place-items-center cursor-pointer"
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
