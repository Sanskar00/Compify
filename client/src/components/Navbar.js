import React from "react";
import PropTypes from "prop-types";

const Navbar = (props) => {
  return (
    <div className="aboslute w-full">
      <div className="grid grid-cols-3 gap-3 h-12 bg-new-blue text-white font-bold place-items-center ">
        <div className="w-1/6">
          <h1 className="text-xl cursor-pointer">Compify</h1>
        </div>

        <div className="flex flex-wrap content-center justify-start w-2/3">
          <input
            className="shadow appearance-none border rounded w-full h-5 my-4 pr-10 pl-2 py-2 text-gray-700 text-xs mb-3 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Search for laptops"
          ></input>
        </div>
        <div className="flex w-2/3 left-0">
          <ul className="flex  text-base space-x-6  ">
            <li>
              <a>
                <span>Home</span>
              </a>
            </li>
            <li>
              <a>
                <span>About</span>
              </a>
            </li>
            <li>
              <a className="flex">
                <span>Categories</span>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mt-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </span>
              </a>
            </li>
            <li>
              <div className="h-5 w-15 bg-light-flame-orange transition-colors duration-150 rounded-full hover:bg-flame-orange text-sm mt-1 cursor-pointer">
                <a>
                  <span className="p-2">login</span>
                </a>
              </div>
            </li>
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mt-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
              </svg>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

Navbar.propTypes = {};

export default Navbar;
