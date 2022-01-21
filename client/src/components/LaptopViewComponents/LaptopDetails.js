import React from "react";

const LaptopDetails = ({ product }) => {
  return (
    <div className="my-2 lg:justify-self-center lg:ml-64 md:ml-20">
      <h1 className="text-lg mt-8 font-bold  my-2">Details</h1>
      <div className="lg:grid lg:grid-cols-3 lg:gap-4">
        <div className="flex gap-4 text-sm lg:grid lg:gap-1">
          <h2 className=" font-semibold ">Model</h2>
          <h2>{product.model}</h2>
        </div>
        <div className="flex gap-4 text-sm lg:grid lg:gap-1">
          <h2 className=" font-semibold">Dispaly</h2>
          <h2>{product.display}</h2>
        </div>
        <div className="flex gap-4 text-sm lg:grid lg:gap-1">
          <h2 className=" font-semibold">Memory Size</h2>
          <h2>{product.memorySize}</h2>
        </div>
        <div className="flex gap-4 text-sm lg:grid lg:gap-1">
          <h2 className=" font-semibold">Storage</h2>
          <h2>{product.storageSize}</h2>
        </div>
        <div className="flex gap-4 text-sm lg:grid lg:gap-1">
          <h2 className=" font-semibold">OS</h2>
          <h2>{product.operatingSystem}</h2>
        </div>
        <div className="flex gap-4 text-sm lg:grid lg:gap-1">
          <h2 className=" font-semibold">Cpu Type</h2>
          <h2>{product.cpuType}</h2>
        </div>
        <div className="flex gap-4 text-sm lg:grid lg:gap-1">
          <h2 className=" font-semibold">Battery</h2>
          <h2>{product.battery}</h2>
        </div>
      </div>
    </div>
    // <div className="my-2">
    //   <h1 className="text-lg mt-8 font-bold  my-2">Details</h1>
    //   <div className="flex gap-4 text-sm">
    //     <h2 className=" font-semibold ">Model</h2>
    //     <h2>{product.model}</h2>
    //   </div>
    //   <div className="flex gap-4 text-sm">
    //     <h2 className=" font-semibold">Dispaly</h2>
    //     <h2>{product.display}</h2>
    //   </div>
    //   <div className="flex gap-4 text-sm">
    //     <h2 className=" font-semibold">Memory Size</h2>
    //     <h2>{product.memorySize}</h2>
    //   </div>
    //   <div className="flex gap-4 text-sm">
    //     <h2 className=" font-semibold">Storage</h2>
    //     <h2>{product.storageSize}</h2>
    //   </div>
    //   <div className="flex gap-4 text-sm">
    //     <h2 className=" font-semibold">OS</h2>
    //     <h2>{product.operatingSystem}</h2>
    //   </div>
    //   <div className="flex gap-4 text-sm">
    //     <h2 className=" font-semibold">Cpu Type</h2>
    //     <h2>{product.cpuType}</h2>
    //   </div>
    //   <div className="flex gap-4 text-sm">
    //     <h2 className=" font-semibold">Battery</h2>
    //     <h2>{product.battery}</h2>
    //   </div>
    // </div>
  );
};

export default LaptopDetails;
