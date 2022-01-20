import React, { useContext, useEffect } from "react";
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
        <div className="mx-4 w-11/12 grid">
          <LaptopViewSkeleton />
        </div>
      ) : (
        <div className="mx-4 w-11/12 grid">
          <LaptopHeader product={product} />

          {/* price */}
          <div>
            <h1 className="font-bold text-lg flex items-center mt-4  ">
              {<Rupee />}
              {product.productPrice}
            </h1>
          </div>
          <div className="justify-self-center  gap-1 my-4">
            <span onClick={onClickProductCart}>
              <Button name="Cart" sw="w-72" />
            </span>
            <span>
              <Button
                name="Buy"
                color="bg-new-blue"
                sw="w-72"
                hoverColor="dark-new-blue"
              />
            </span>
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
