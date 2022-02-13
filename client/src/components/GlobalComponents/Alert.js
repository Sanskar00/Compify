import React from "react";
import { useContext } from "react";
import { AlertContext } from "../../context/AlertContext";
import { ReactComponent as Check } from "../../assets/logo/check.svg";

const Alert = () => {
  const [state, dispatch] = useContext(AlertContext);

  const check = (
    <svg
      class="w-4 h-4"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
        clip-rule="evenodd"
      ></path>
    </svg>
  );

  const exclamation = (
    <svg
      class="w-4 h-4"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
        clip-rule="evenodd"
      ></path>
    </svg>
  );

  return (
    state.length > 0 &&
    state.map((alert) =>
      alert.alertType.includes("green") ? (
        <div
          key={alert.id}
          className={`w-10/12 h-8 left-0 text-green-500 text-sm h-fit  right-0 mr-auto ml-auto bg-white rounded gap-2 flex items-center fixed top-24   border-flame-orange border z-20 px-2   lg:w-2/3    md:top-28  lg:h-10  lg:left-10 justify-center overflow-hidden shadow-lg backdrop-filter  `}
        >
          {check}
          {alert.msg}
        </div>
      ) : (
        <div
          key={alert.id}
          className={`w-10/12 h-8 left-0 text-red-500 text-sm h-fit  right-0 mr-auto ml-auto bg-white rounded gap-2 flex items-center fixed top-24   border-flame-orange border z-20 px-2   lg:w-2/3    md:top-28  lg:h-10  lg:left-10 justify-center overflow-hidden shadow-lg backdrop-filter  `}
        >
          {exclamation}
          {alert.msg}
        </div>
      )
    )
  );
};
export default Alert;
