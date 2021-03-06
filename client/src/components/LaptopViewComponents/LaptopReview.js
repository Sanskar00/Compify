import React from "react";
import Button from "../GlobalComponents/Button";

const LaptopReview = ({ product }) => {
  const handleClick = () => {
    // console.log("add review");
  };
  return (
    <div className="my-2 lg:ml-64 md:ml-20">
      <h1 className="text-lg mt-8 font-bold  my-2">Add Review</h1>
      <div className="flex items-center border-b border-gray-400 ">
        <input
          className="appearance-none bg-transparent border-none w-full  text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
          type="text"
          placeholder="Your Review"
          aria-label="Full name"
        ></input>
        <div onClick={handleClick}>
          <Button name="Add" />
        </div>

        <button
          className="flex-shrink-0 border-transparent border-4 text-light-flame-orange hover:text-teal-800 text-sm py-1 px-2 rounded"
          type="button"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default LaptopReview;
