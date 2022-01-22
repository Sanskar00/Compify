import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { getAddresses } from "../actions/personalInfoAction";
import { PersonalInfoContext } from "../context/PersonalContext";

const Address = () => {
  const [state, dispatch] = useContext(PersonalInfoContext);

  useEffect(() => {
    getAddresses(dispatch);
  }, [getAddresses]);

  console.log(state);

  const plus = (
    <svg
      className="  w-5 h-5 pointer-events-none  "
      fill="none"
      viewBox="0 0 24 24"
      stroke="black"
    >
      <path
        stroke-linecap="round"
        className="pointer-events-none"
        stroke-linejoin="round"
        stroke-width="2"
        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
      ></path>
    </svg>
  );
  const navigate = useNavigate();
  return (
    <div className="mt-24 md:mt-36">
      <div
        className="h-8 w-screen text-base text-light-flame-orange shadow flex 
       px-8 font-bold cursor-pointer"
        onClick={() => navigate("/address/addAddress")}
      >
        {plus} <h1>Add a new address</h1>
      </div>
    </div>
  );
};

export default Address;
