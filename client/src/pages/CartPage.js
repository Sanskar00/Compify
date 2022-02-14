import React, { useContext, useEffect } from "react";
import { getCart, removeProductCart } from "../actions/cartAction";
import ProductCard from "../components/GlobalComponents/ProductCard";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { cartIcon } from "../assets/logo/cartIcon";
import { NavLink } from "react-router-dom";
import Button from "../components/GlobalComponents/Button";
import { AlertContext } from "../context/AlertContext";
import Spinner from "../components/GlobalComponents/Spinner";
const CartPage = () => {
  const [cartState, dispatch] = useContext(CartContext);

  const [authState, authDispatch] = useContext(AuthContext);

  const [{}, alertDispatch] = useContext(AlertContext);

  const { plus, deleteIcon, minus } = cartIcon;

  const { cart, loading } = cartState;

  const dispatches = { dispatch, alertDispatch };

  useEffect(() => {
    getCart(dispatch);
  }, []);

  // const removeProduct = (id) => {
  //   removeProductCart(dispatch, id);
  // };

  return (
    <div className="mt-20 md:mt-36 w-screen grid ">
      <h1 className="text-2xl font-bold md:mx-20 lg:mx-48">Shopping Cart</h1>
      <div className="mt-4 mx-2 md:mx-32 lg:mx-60  md:w-2/3  grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {!loading ? (
          <Spinner />
        ) : cart.length === 0 ? (
          <h1>No product is added in cart!</h1>
        ) : (
          cart.map((product) => {
            return (
              <div className="grid gap-4 shadow mt-4 ">
                <ProductCard
                  product={product}
                  deleteButton={
                    <svg
                      class="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      ></path>
                    </svg>
                  }
                  shadow="shadow-none"
                />
                <div className="flex  ">
                  {/* <div className="flex gap-2 mx-4 mb-2 items-center">
                    deleteButton
                    {product.quantity === 1 ? (
                      <div
                        className="bg-new-blue px-2 rounded-l-lg grid justify-center cursor-pointer"
                        onClick={() => removeProductCart(dispatch, product._id)}
                      >
                        <button className="pointer-events-none">
                          {deleteIcon}
                        </button>
                      </div>
                    ) : (
                      <div className="bg-new-blue px-2 rounded-l-lg grid justify-center">
                        <button>{minus}</button>
                      </div>
                    )}

                    <h2 classname="text-sm">{product.quantity}</h2>
                    <div className="bg-new-blue px-2 rounded-r-lg grid justify-center">
                      <button>{plus}</button>
                    </div>
                  </div> */}
                  <div
                    className="mx-4 mb-4 "
                    onClick={() => removeProductCart(dispatches, product._id)}
                  >
                    <Button name="delete" />
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default CartPage;
