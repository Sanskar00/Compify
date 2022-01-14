import React from "react";
import PropTypes from "prop-types";
import { ReactComponent as StudentLogo } from "../../assets/logo/student.svg";
import { ReactComponent as GameLogo } from "../../assets/logo/game.svg";
import { ReactComponent as PremiumLogo } from "../../assets/logo/premium.svg";

const LatpopType = (props) => {
  const laptopTypes = [
    { laptopType: "Gaming", logo: <GameLogo /> },
    { laptopType: "Premium", logo: <PremiumLogo /> },
    { laptopType: "Student", logo: <StudentLogo /> },
  ];

  return (
    <div className="lg:mx-24 md:mx-12 lg:mt-14 mt-8 md:mt-8 md:h-60 md:flex md:justify-around items-center">
      {laptopTypes.map((type) => (
        <div className="h-12 w-11/12 mx-2 my-2 lg:h-48 lg:w-48 md:h-36 md:w-36 bg-new-blue rounded-md grid place-items-center cursor-pointer">
          <div
            className="opacity-0  hover:opacity-100 hover:bg-opacity-25 hover:text-opacity-100 focus:text-opacity-100 duration-150 absolute bg-white h-48 w-48 rounded-md grid place-items-center font-bold text-light-flame-orange text-lg  "
            value="Gaming_Laptop"
          >
            {type.laptopType}
          </div>
          <div>{type.logo}</div>
        </div>
      ))}
    </div>
  );
};

LatpopType.propTypes = {};

export default LatpopType;
