import React from "react";
import PropTypes from "prop-types";
import { ReactComponent as StudentLogo } from "../../assets/logo/student.svg";
import { ReactComponent as GameLogo } from "../../assets/logo/game.svg";
import { ReactComponent as PremiumLogo } from "../../assets/logo/premium.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";

const LatpopType = (props) => {
  const laptopTypes = [
    {
      laptopType: "Gaming_Laptop",
      onDisplay: "Gaming",
      onRoutingPage: "Gaming Laptops",
      logo: <GameLogo />,
    },
    {
      laptopType: "Premium_Laptop",
      onDisplay: "Premium",
      onRoutingPage: "Premium Laptops",
      logo: <PremiumLogo />,
    },
    {
      laptopType: "Student_Laptop",
      onDisplay: "Student",
      onRoutingPage: "Student Laptops",
      logo: <StudentLogo />,
    },
  ];

  const navigate = useNavigate();
  return (
    <div className="lg:mx-24 md:mx-12 lg:mt-14 mt-8 md:mt-8 md:h-60 md:flex md:justify-around ">
      {laptopTypes.map((type) => {
        const typeId = type.laptopType;

        return (
          <div
            className="h-12 w-11/12 mx-2 my-2 lg:h-48 lg:w-48 md:h-36 md:w-36 bg-new-blue rounded-xl gap-4 grid place-items-center cursor-pointer"
            onClick={() => {
              navigate(`/category/${typeId}`, {
                state: type.onDisplay,
              });
            }}
          >
            <div
              className="h-12 w-11/12 opacity-0 i hover:opacity-100 hover:bg-opacity-25 hover:text-opacity-100 focus:text-opacity-100 duration-150 absolute bg-white lg:h-48 lg:w-48 md:h-36 md:w-36 rounded-md grid place-items-center font-bold text-light-flame-orange text-lg  "
              value="Gaming_Laptop"
              key={type.LatpopType}
            >
              {type.onDisplay}
            </div>
            <div>{type.logo}</div>
          </div>
        );
      })}
    </div>
  );
};

LatpopType.propTypes = {};

export default LatpopType;
