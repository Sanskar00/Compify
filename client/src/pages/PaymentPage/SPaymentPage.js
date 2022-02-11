import React, { useContext, useEffect } from "react";
import {
  getCards,
  addCard,
  getAddresses,
} from "../../actions/personalInfoAction";
import { PersonalInfoContext } from "../../context/PersonalContext";
import CardComponent from "../../components/GlobalComponents/CardComponent";
import { OrderContext } from "../../context/OrderContext";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, Navigate, useLocation } from "react-router-dom";
import { getCart } from "../../actions/cartAction";
import { CartContext } from "../../context/CartContext";
import "./PaymentPage.css";
import { useState } from "react/cjs/react.development";
import Button from "../../components/GlobalComponents/Button";
import { getClientSecret } from "../../actions/orderAction";
import CardLayout from "../../components/PaymentPageComponent/CardLayout";
import { PaymentConfirmation } from "../../utils/PaymentUtils";
import { loadStripe } from "@stripe/stripe-js";
import { CardElement } from "@stripe/react-stripe-js";
import CardPayElement from "../../components/PaymentPageComponent/CardPayElement";

const SPaymentPage = () => {
  const [personalState, personalDispatch] = useContext(PersonalInfoContext);

  const [cartState, cartDispatch] = useContext(CartContext);

  const [orderState, orderDispatch] = useContext(OrderContext);

  const location = useLocation();

  const [authState] = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    getCards(personalDispatch);
    getAddresses(personalDispatch);
  }, []);

  useEffect(() => {
    getCart(cartDispatch);
  }, []);

  const handleClick = () => {
    const url = document.URL;
    addCard(personalDispatch, url);
  };

  if (!personalState.cardLoading && personalState.session !== null) {
    window.location.href = `${personalState.session.session_url}`;
  }

  const cart = cartState.cart;

  const product = cart[0];

  const information = (
    <svg
      class="w-4 h-4"
      fill="#FF4D00"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
        clip-rule="evenodd"
      ></path>
    </svg>
  );

  const paymentProps = {
    order: {
      orderState,
      orderDispatch,
    },
    cart: cartState,
    personal: personalState,
  };

  return (
    !authState.loading &&
    !cartState.loading && (
      <div className="mt-20  grid gap-4 md:mt-2   ">
        <section className=" grid place-items-center  gap-2 md:place-self-center md:w-11/12 lg:w-2/3  ">
          <h1 className="text-new-blue">Cards You Saved</h1>
          <h2 className="flex text-sm text-flame-orange items-center gap-1 md:hidden">
            {information} Tap on card to fill cvv
          </h2>
          {personalState.cardLoading ? (
            <h1 className=" lg:col-start-2">loading</h1>
          ) : personalState.cards.length === 0 ? (
            <h1 className="lg:col-start-2">No card added</h1>
          ) : (
            <>
              <div className="md:grid md:place-self-start md:grid-cols-3 md:gap-4   hidden ">
                {personalState.cards.map((card) => {
                  return <CardLayout card={card} />;
                })}
              </div>
              <div className="w-11/12 md:hidden">
                {personalState.cards.map((card) => {
                  return <CardLayout card={card} />;
                })}
              </div>
            </>
          )}
        </section>

        <CardPayElement amount={product.productPrice} />

        <div className="shadow px-1 py-2 bg-white z-50  border flex justify-between w-screen fixed bottom-0 items-center md:w-11/12 md:place-self-center md:relative lg:w-2/3">
          <h1>{product.productPrice}</h1>
          <button
            className="bg-light-flame-orange text-white text-lg rounded px-6 py-1"
            onClick={() => {
              PaymentConfirmation(paymentProps);
            }}
          >
            Confirm Order
          </button>
        </div>
      </div>
    )
  );
};

export default SPaymentPage;
