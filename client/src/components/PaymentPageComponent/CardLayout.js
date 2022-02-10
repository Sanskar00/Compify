import React, { useState, useEffect, useContext } from "react";
import { getClientSecret } from "../../actions/orderAction";
import CardComponent from "../GlobalComponents/CardComponent";
import { OrderContext } from "../../context/OrderContext";
import { CartContext } from "../../context/CartContext";
import { setAlert } from "../../actions/alertAction";
import { AlertContext } from "../../context/AlertContext";

const CardLayout = ({ card }) => {
  const [cvvInput, setCVVInput] = useState("");

  const [orderState, orderdispatch] = useContext(OrderContext);

  const [{}, alertDispatch] = useContext(AlertContext);

  const [cartState] = useContext(CartContext);

  const { cart } = cartState;

  const handleCVVChange = (e) => {
    setCVVInput(e.target.value);
  };

  const [paymentData, setPaymentData] = useState({
    customer_id: "",
    payment_intent_id: "",
    cvv: cvvInput,
    amount: cart[0].productPrice,
  });

  const dispatches = {
    alertDispatch,
    orderdispatch,
  };

  useEffect(() => {
    if (paymentData.payment_intent_id !== "") {
      getClientSecret(dispatches, paymentData);
    }
  }, [paymentData]);

  return (
    <div className="w-full relative mb-2 " key={card._id}>
      <div className="card">
        <div className="front absolute">
          <CardComponent card={card} hidden={"hidden"} key={card._id} />
        </div>
        <div className="back absoute">
          <div className=" h-36 w-2/3 shadow rounded bg-gradient-to-b from-teal-100 via-teal-200 to-teal-500 grid px-8 relative text-white md:w-60 ">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-semibold">cvv</h2>
              <input
                className="w-12 grid  place-items-center apearance-none border-b border-white bg-transparent border-nonetext-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                onChange={handleCVVChange}
              ></input>
            </div>
            <div className="grid place-items-center bottom-2 relative">
              <button
                className="bg-white bg-opacity-25  h-6  rounded  text-sm"
                onClick={() => {
                  setPaymentData({
                    ...paymentData,
                    customer_id: card.customer,
                    payment_intent_id: card.id,
                    cvv: cvvInput,
                  });
                }}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardLayout;
