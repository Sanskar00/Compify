import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { getProduct } from "../actions/productAction";
import Caroursel_Next_Pre from "../components/HomeComponents/Carousel/Carousel_Next_Pre";
import { ProductContext } from "../context/ProductsContext";
import { ReactComponent as Star } from "../assets/logo/star.svg";
import { ReactComponent as Rupee } from "../assets/logo/rupee.svg";
import Button from "../components/GlobalComponents/Button";
import LaptopViewSkeleton from "../components/LaptopViewComponents/LaptopViewSkeleton";
import LaptopDetails from "../components/LaptopViewComponents/LaptopDetails";
import LaptopHeader from "../components/LaptopViewComponents/LaptopHeader";
import LaptopReview from "../components/LaptopViewComponents/LaptopReview";
import { addProductCart } from "../actions/cartAction";
const LaptopViewPage = () => {
  const [state, dispatch] = useContext(ProductContext);
  const [imageIndex, setImageIndex] = useState(0);

  const { productId } = useParams();

  const { product } = state;
  const { loading } = state;

  console.log(product);

  useEffect(() => {
    const abortCont = new AbortController();
    getProduct(dispatch, productId, abortCont);

    return () => abortCont.abort;
  }, []);

  const onClickProductCart = () => {
    addProductCart(dispatch, product._id);
  };

  const indexImage = (i) => {
    setImageIndex(i);
  };

  return (
    <div className="h-full mt-20 md:mt-28 w-screen grid md:flex md:flex-row-reverse overflow-hidden ">
      <div className="w-full h-96  relative grid place-items-center  place-self-center md:place-self-start   ">
        {product === null || loading === true ? (
          <div className="w-2/3 h-2/3  md:w-10/12 md:h-10/12 lg:w-1/2 lg:h-full  lg:mt-48 grid place-items-center bg-gray-200 pulse animate-pulse "></div>
        ) : (
          <div className="w-10/12 h-10/12 md:w-full md:h-full lg:w-2/3 lg:h-10/12 grid justify-items-center relative md:grid-rows-2  ">
            <img
              className="w-full h-full  "
              src={product.productImage[imageIndex]}
            ></img>
            <div className="  hidden  lg:w-1/2 md:w-2/3  md:h-20 md:visible   md:grid md:grid-cols-3 md:gap-2 md:mb-0   ">
              {product.productImage
                .slice(0, product.productImage.length - 1)
                .map((image, index) => {
                  return (
                    <img
                      className="w-full h-full shadow-lg rounded-lg cursor-pointer "
                      src={image}
                      onClick={() => indexImage(index)}
                    ></img>
                  );
                })}
            </div>
          </div>
        )}
      </div>

      {product === null || loading === true ? (
        <div className="mx-4 w-11/12 grid">
          <LaptopViewSkeleton />
        </div>
      ) : (
        <div className="mx-4 w-11/12 grid">
          <LaptopHeader product={product} />

          {/* price */}
          <div className="grid lg:ml-64 md:ml-20">
            <div className="w-full">
              <h1 className="font-bold text-lg flex items-center mt-4  md:w-full  ">
                {<Rupee />}
                {product.productPrice}
              </h1>
            </div>
            <div className="grid justify-center  gap-1 my-4 md:flex-none md:justify-start cursor-pointer ">
              <button
                className="md:w-48 md:h-8 lg:w-56 lg:h-10 h-10 w-80 bg-light-flame-orange hover:bg-flame-orange rounded-xl text-white "
                onClick={onClickProductCart}
              >
                Cart
              </button>

              <span>
                <button className="md:w-48 md:h-8 lg:w-56 lg:h-10 h-10 w-80   bg-new-blue rounded-xl text-white ">
                  Buy
                </button>
              </span>
            </div>
          </div>

          {/* details */}
          <LaptopDetails product={product} />

          {/* Adding REview */}
          <LaptopReview product={product} />
        </div>
      )}
    </div>
  );
};

export default LaptopViewPage;
