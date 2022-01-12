import React from "react";
import PropTypes from "prop-types";

const Button = ({ name }) => {
  return (
    <div>
      <button className="h-5 w-16 bg-light-flame-orange transition-colors duration-150 rounded-full hover:bg-flame-orange text-sm mt-1 cursor-pointer text-white z-0">
        <a>
          <span className="p-2">{name}</span>
        </a>
      </button>
    </div>
  );
};

Button.propTypes = {};

export default Button;
