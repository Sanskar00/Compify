import React from "react";
import PropTypes from "prop-types";

const Button = ({ name }) => {
  return (
    <div>
      <button className="lg:h-5 lg:w-16 md:h-4 md:w-12 w-12 text-xs lg:text-sm font-bold  bg-light-flame-orange transition-colors duration-150 rounded-full hover:bg-flame-orange  mt-1 cursor-pointer text-white z-0">
        <a>
          <span className="lg:p-2 ">{name}</span>
        </a>
      </button>
    </div>
  );
};

Button.propTypes = {};

export default Button;
