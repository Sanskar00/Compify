import React from "react";
import Button from "../GlobalComponents/Button";
import { ReactComponent as Star } from "../../assets/logo/star.svg";

const LaptopViewSkeleton = () => {
  return (
    <div className="mx-4 w-11/12 grid">
      <div className="flex  w-full items-center justify-between ">
        <div className="bg-gray-200 animate-pulse h-8 w-24"></div>
        <div className="grid place-items-center  animate-pulse bg-gray-200 h-8 w-24"></div>
      </div>
      {/* price */}
      <div>
        <h1 className="flex items-center mt-4  w-12 bg-gray-500 animate-pulse"></h1>
      </div>
      <div className="justify-self-center  gap-1 my-4">
        <Button name="Cart" sw="w-72" />
        <Button name="Buy" color="bg-new-blue" sw="w-72" />
      </div>

      {/* details */}
      <h1 className="text-lg mt-8 font-bold  my-2">Details</h1>
      <div className="my-2 h-36 w-56 bg-gray-200 animate-pulse"></div>

      {/* Adding REview */}
      <div className="my-2 ">
        <h1 className="text-lg mt-8 font-bold  my-2">Add Review</h1>
        <div className="flex items-center border-b border-gray-200 ">
          <input
            class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="Your Review"
            aria-label="Full name"
          ></input>
          <Button name="Add" />
          <button
            class="flex-shrink-0 border-transparent border-4 text-light-flame-orange hover:text-teal-800 text-sm py-1 px-2 rounded"
            type="button"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default LaptopViewSkeleton;
