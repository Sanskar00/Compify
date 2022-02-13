import React from "react";
import { useContext } from "react";
import { AlertContext } from "../../context/AlertContext";

const Alert = () => {
  const [state, dispatch] = useContext(AlertContext);

  return (
    state.length > 0 &&
    state.map((alert) => (
      <div
        key={alert.id}
        className={`w-10/12 h-8 left-0 ${alert.alertType} text-lg h-fit  right-0 mr-auto ml-auto bg-white rounded  grid items-center fixed top-24   border-flame-orange border z-20 px-2   lg:w-2/3    md:top-28  lg:h-10  lg:left-10 place-items-center overflow-hidden shadow-lg backdrop-filter  `}
      >
        {alert.msg}
      </div>
    ))
  );
};
export default Alert;
