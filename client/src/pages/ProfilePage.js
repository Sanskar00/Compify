import React, { useContext } from "react";
import { Navigate, useNavigate } from "react-router";
import Button from "../components/GlobalComponents/Button";
import { AuthContext } from "../context/AuthContext";
import { logout } from "../actions/authAction";

const ProfilePage = () => {
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

  if (!authState.isAuthenticated) {
    return <Navigate replace to="/" />;
  }

  return (
    <div className="mt-20 md:mt-36 h-full ">
      <div className="h-48 w-screen bg-new-blue grid justify-items-center">
        <svg
          class="w-28 h-28 "
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
        <h1 className="text-lg text-white ">{authState.user.name}</h1>
        <h2 className="text-sm text-gray-300">{authState.user.email}</h2>
      </div>
      <div className="mt-4 h-64 grid grid-rows-4 gap-2 ">
        <div className="shadow flex justify-between cursor-pointer  place-items-center text-gray-500">
          <h1>My Orders</h1>
          {rightArrow}
        </div>
        <div
          className="shadow flex justify-between cursor-pointer place-items-center text-gray-500"
          onClick={() => {
            navigate("/cart");
          }}
        >
          <h1>My Cart </h1>
          {rightArrow}
        </div>
        <div
          className="shadow flex justify-between cursor-pointer place-items-center text-gray-500"
          onClick={() => {
            navigate("/card");
          }}
        >
          <h1>My Cards</h1>

          {rightArrow}
        </div>
        <div
          className="shadow flex justify-between cursor-pointer place-items-center text-gray-500"
          onClick={() => {
            navigate("/address");
          }}
        >
          <h1>My Addresses</h1>
          {rightArrow}
        </div>
        <div
          className=" grid place-items-center cursor-pointer  text-gray-500 absolute bottom-0 left-0 right-0 "
          onClick={() => {
            logout(dispatch);
            navigate("/");
          }}
        >
          <button className="md:w-48 md:h-8 lg:w-56 lg:h-10 h-10 w-80 bg-light-flame-orange hover:bg-flame-orange rounded-xl text-white ">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
