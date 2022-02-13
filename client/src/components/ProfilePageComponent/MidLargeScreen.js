import React, { useContext } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { logout } from "../../actions/authAction";

const MidLargeScreen = () => {
  const [authState, dispatch] = useContext(AuthContext);
  const rightArrow = (
    <svg
      class="w-6 h-6"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
        clip-rule="evenodd"
      ></path>
    </svg>
  );
  const navigate = useNavigate();
  return (
    <div className="hidden md:mt-20 md:flex h-full gap-8 lg:px-36  md:mx-12">
      <section className="self-start h-96">
        <div className=" mt-8 h-12 bg-new-blue flex  items-center  px-4 gap-8 ">
          <svg
            class="w-6 h-6 "
            fill="white"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <section>
            <h1 className="text-base   text-white "> {authState.user.name}</h1>
            <h2 className="text-xs text-gray-300">{authState.user.email}</h2>
          </section>
        </div>
        <div className=" shadow border   h-full grid grid-rows-5 gap-2  px-4  ">
          <div
            className=" flex justify-between cursor-pointer  place-items-center text-gray-500"
            onClick={() => {
              navigate("/profile/personalInfo");
            }}
          >
            <h1>Personal Info</h1>
            {rightArrow}
          </div>
          <div
            className=" flex justify-between cursor-pointer  place-items-center text-gray-500"
            onClick={() => {
              navigate("/profile/order");
            }}
          >
            <h1>My Orders</h1>
            {rightArrow}
          </div>

          <div
            className=" flex justify-between cursor-pointer place-items-center text-gray-500"
            onClick={() => {
              navigate("/profile/card");
            }}
          >
            <h1>My Cards</h1>

            {rightArrow}
          </div>
          <div
            className=" flex justify-between cursor-pointer place-items-center text-gray-500"
            onClick={() => {
              navigate("/profile/address");
            }}
          >
            <h1>My Addresses</h1>
            {rightArrow}
          </div>
          <div className=" grid  cursor-pointer w-full border  h-10 rounded text-white bg-flame-orange   ">
            <button
              className="md:w-full"
              onClick={() => {
                logout(dispatch);
                navigate("/");
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </section>

      <div className=" h-128 shadow border w-full mt-8 overflow-scroll">
        <Outlet />
      </div>
    </div>
  );
};

export default MidLargeScreen;
