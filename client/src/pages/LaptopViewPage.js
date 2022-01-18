import React, { useContext, useEffect } from "react";
import { useParams } from "react-router";
import { getProduct } from "../actions/productAction";
import Caroursel_Next_Pre from "../components/HomeComponents/Carousel/Carousel_Next_Pre";
import { ProductContext } from "../context/ProductsContext";
import { ReactComponent as Star } from "../assets/logo/star.svg";
import { ReactComponent as Rupee } from "../assets/logo/rupee.svg";
import Button from "../components/GlobalComponents/Button";
const LaptopViewPage = () => {
  const [state, dispatch] = useContext(ProductContext);

  const { productId } = useParams();

  const { product } = state;
  const { loading } = state;

  console.log(product);

  useEffect(() => {
    const abortCont = new AbortController();
    getProduct(dispatch, productId, abortCont);

    return () => abortCont.abort;
  }, []);

  return (
    <div className="h-full mt-20 md:mt-36 w-screen grid  ">
      <div className="w-full h-96  relative grid place-items-center  place-self-center ">
        {product === null || loading === true ? (
          <div className="w-2/3 h-2/3 grid place-items-center bg-gray-200 pulse animate-pulse "></div>
        ) : (
          <div className="w-2/3 h-2/3 grid place-items-center ">
            <img className="w-full h-full " src={product.productImage[0]}></img>
          </div>
        )}
      </div>

      {product === null || loading === true ? (
        "loading..."
      ) : (
        <div className="mx-4 w-11/12 grid">
          <div className="flex  w-full items-center justify-between ">
            <div>
              <h1 className="font-bold text-lg  ">{product.model}</h1>
              <h2 className="text-xs text-gray-500">{`${product.memorySize} Ram  ${product.storageSize}`}</h2>
            </div>
            <div className="grid place-items-center ">
              <div className="flex">
                <Star></Star>
                <Star></Star>
                <Star></Star>
                <Star></Star>
                <Star></Star>
              </div>
              <div className="text-sm text-gray-500">{`(${product.customerReviews.length} Reviews)`}</div>
            </div>
          </div>
          {/* price */}
          <div>
            <h1 className="font-bold text-lg flex items-center mt-4  ">
              {<Rupee />}
              {product.productPrice}
            </h1>
          </div>
          <div className="justify-self-center flex gap-1">
            <Button name="Cart" />
            <Button name="Buy" color="bg-new-blue" />
          </div>

          {/* details */}
          <div className="my-2">
            <h1 className="text-lg mt-8 font-bold  my-2">Details</h1>
            <div className="flex gap-4 text-sm">
              <h2 className=" font-semibold ">Model</h2>
              <h2>{product.model}</h2>
            </div>
            <div className="flex gap-4 text-sm">
              <h2 className=" font-semibold">Dispaly</h2>
              <h2>{product.display}</h2>
            </div>
          </div>
          <div className="flex gap-4 text-sm">
            <h2 className=" font-semibold">Memory Size</h2>
            <h2>{product.memorySize}</h2>
          </div>
          <div className="flex gap-4 text-sm">
            <h2 className=" font-semibold">Storage</h2>
            <h2>{product.storageSize}</h2>
          </div>
          <div className="flex gap-4 text-sm">
            <h2 className=" font-semibold">OS</h2>
            <h2>{product.operatingSystem}</h2>
          </div>
          <div className="flex gap-4 text-sm">
            <h2 className=" font-semibold">Cpu Type</h2>
            <h2>{product.cpuType}</h2>
          </div>
          <div className="flex gap-4 text-sm">
            <h2 className=" font-semibold">Battery</h2>
            <h2>{product.battery}</h2>
          </div>
          <div className="my-2 ">
            <h1 className="text-lg mt-8 font-bold  my-2">Add Review</h1>
            <div className="flex items-center border-b border-gray-400 ">
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
      )}
    </div>
  );
};

export default LaptopViewPage;
