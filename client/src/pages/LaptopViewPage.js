import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { NavLink, useNavigate } from "react-router-dom";
import { getProduct } from "../actions/productAction";
import { ProductContext } from "../context/ProductsContext";
import { ReactComponent as Rupee } from "../assets/logo/rupee.svg";
import LaptopViewSkeleton from "../components/LaptopViewComponents/LaptopViewSkeleton";
import LaptopDetails from "../components/LaptopViewComponents/LaptopDetails";
import LaptopHeader from "../components/LaptopViewComponents/LaptopHeader";
import LaptopReview from "../components/LaptopViewComponents/LaptopReview";
import { addProductCart } from "../actions/cartAction";
import { orderedProduct, orderProduct } from "../actions/orderAction";
import { OrderContext } from "../context/OrderContext";
import { AuthContext } from "../context/AuthContext";

const LaptopViewPage = () => {
  const [state, dispatch] = useContext(ProductContext);
  const [{}, orderdispatch] = useContext(OrderContext);
  const [authState] = useContext(AuthContext);
  const [imageIndex, setImageIndex] = useState(0);
  const navigate = useNavigate();

  const { productId } = useParams();

  const { product, loading } = state;

  useEffect(() => {
    const abortCont = new AbortController();
    getProduct(dispatch, productId, abortCont);

    return () => abortCont.abort;
  }, [getProduct]);

  const handleProductCart = () => {
    authState.isAuthenticated && addProductCart(dispatch, product._id);
  };

  const handleOrderedProduct = (product) => {
    authState.isAuthenticated &&
      orderedProduct(orderdispatch, product) &&
      navigate("/buyProduct");
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
          // laptop image section
          <div className="w-10/12 h-10/12 md:w-full md:h-full lg:w-2/3 lg:h-10/12 grid justify-items-center relative md:grid-rows-2  ">
            <img
              className="w-full h-full  "
              src={product.productImage[imageIndex]}
              alt={product.productImage[imageIndex]}
            ></img>
            <div className="  hidden  lg:w-1/2 md:w-2/3  md:h-20 md:visible   md:grid md:grid-cols-3 md:gap-2 md:mb-0   ">
              {product.productImage
                .slice(0, product.productImage.length - 1)
                .map((image, index) => {
                  return (
                    <img
                      className="w-full h-full shadow-lg rounded-lg cursor-pointer "
                      src={image}
                      key={image}
                      onClick={() => indexImage(index)}
                    ></img>
                  );
                })}
            </div>
          </div>
        )}
      </div>

      {product === null || loading === true ? (
        // laptop info loading state
        <div className="mx-4 w-11/12 grid">
          <LaptopViewSkeleton />
        </div>
      ) : (
        // laptop info
        <div className="mx-4 w-11/12 grid">
          <LaptopHeader product={product} key={product._id} />

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
                onClick={handleProductCart}
              >
                Cart
              </button>

              <span>
                <button
                  className="md:w-48 md:h-8 lg:w-56 lg:h-10 h-10 w-80   bg-new-blue rounded-xl text-white "
                  onClick={() => {
                    handleOrderedProduct(product);
                    handleProductCart();
                  }}
                >
                  Buy
                </button>
              </span>
            </div>
          </div>

          {/* details */}
          <LaptopDetails product={product} key={`laptopdetail${product._id}`} />

          {/* Adding REview */}
          <LaptopReview product={product} key={`laptopreview${product._id}`} />
        </div>
      )}
    </div>
  );
};

export default LaptopViewPage;
