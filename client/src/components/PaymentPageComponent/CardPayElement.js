import React, { useContext } from "react";
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { getDirectPayment } from "../../actions/orderAction";
import { AlertContext } from "../../context/AlertContext";
import { OrderContext } from "../../context/OrderContext";

const CardPayElement = ({ amount }) => {
  const [{}, alertDispatch] = useContext(AlertContext);

  const [{}, orderdispatch] = useContext(OrderContext);

  const elements = useElements();

  const stripe = useStripe();

  const data = {
    elements: elements,
    amount: amount,
  };

  const dispatches = {
    alertDispatch,
    orderdispatch,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    getDirectPayment(dispatches, data);
  };
  return (
    <div className="p-8 grid gap-4  shadow w-11/12 place-self-center   border lg:w-2/3">
      <h1>Card/ Debit/ ATM Card</h1>
      <form className="grid gap-4" onSubmit={handleSubmit}>
        <CardElement />

        <button
          className="h-6 w-max bg-new-blue text-white rounded  grid place-items-center px-1 "
          type="submit"
        >
          Continue
        </button>
      </form>
    </div>
  );
};

export default CardPayElement;
