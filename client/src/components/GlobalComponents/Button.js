import React from "react";
import PropTypes from "prop-types";

const Button = ({ name, color, hoverColor, sw }) => {
  return (
    <div>
      <button
        className={`lg:h-5 shadow lg:w-16 md:h-5 md:w-12 ${sw}  text-base md:text-sm font-bold  ${color} transition-colors duration-150 rounded-full hover:${hoverColor}  mt-1 cursor-pointer text-white z-0"`}
      >
        <a>
          <span className="lg:p-2 ">{name}</span>
        </a>
      </button>
    </div>
  );
};

Button.defaultProps = {
  color: "bg-light-flame-orange",
  hoverColor: "bg-flame-orange ",
  sw: "w-16",
};

export default Button;
