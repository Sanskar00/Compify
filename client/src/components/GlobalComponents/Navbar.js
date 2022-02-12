import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Button from "./Button";
import Search from "./Search";
import { Link, useNavigate } from "react-router-dom";
import HomePage from "../../pages/HomePage";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { loadConfig } from "browserslist";

const Navbar = () => {
  const navigate = useNavigate();

  const [authState, dispatch] = useContext(AuthContext);

  return (
    <div className="fixed  top-0 left-0 w-full z-50 ">
      <div className="grid grid-cols-3 md:grid-rows-2 lg:grid-rows-1 h-20 md:h-24  bg-new-blue text-white font-bold md:place-items-center   ">
        <div className="lg:w-1/6 flex items-center justify-start ">
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 md:mt-2 md:invisible "
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg> */}
          <Link to="/" element={HomePage}>
            <h1 className="lg:text-2xl cursor-pointer text-xl ml-2 md:mt-2 md:mr-36  ">
              Compify
            </h1>
          </Link>
        </div>
        <Search />

        <div className="col-start-3  mr-4 lg:mr-20 place-self-end  my-2 lg:grid  lg:place-items-center lg:mb-7  sm:my-0">
          <ul className="flex  text-basic lg:space-x-4 space-x-2  ">
            <div className="bg-dark-new-blue absolute invisible md:visible top-10  md:text-sm lg:text-base md:flex items-center   md:space-x-4 md:static md:bg-transparent left-0">
              <li>
                <Link to="/" element={<HomePage />}>
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <span>About</span>
              </li>
              <li>
                <section className="flex">
                  <span>Categories</span>
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mt-1 cursor-pointer  "
                      viewBox="0 0 20 20"
                      fill="white"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </section>
              </li>
            </div>

            {/* cart */}
            <li
              onClick={() => {
                navigate("/cart");
              }}
            >
              <svg
                className="h-6 w-6 lg:h-5 lg:w-5 mt-1 cursor-pointer fill-current hover:fill-black "
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
              </svg>
            </li>
            {authState.isAuthenticated === true &&
            authState.loading === false &&
            authState.user !== null ? (
              <li
                className="cursor-pointer"
                onClick={() => {
                  navigate(`/profile/personalInfo`);
                }}
              >
                <span>{authState.user.name.split(" ")[0]}</span>
              </li>
            ) : (
              <li
                onClick={() => {
                  navigate("/login");
                }}
              >
                <Button name="login" />
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Navbar);
