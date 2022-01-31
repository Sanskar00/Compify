import React, { useContext, useEffect } from "react";
import { getCards, addCard } from "../actions/personalInfoAction";
import { PersonalInfoContext } from "../context/PersonalContext";
import CardComponent from "../components/GlobalComponents/CardComponent";
import { OrderContext } from "../context/OrderContext";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Navigate, useLocation } from "react-router-dom";

const PaymentPage = () => {
  const [personalState, personalDispatch] = useContext(PersonalInfoContext);

  const location = useLocation();

  const [orderState, orderdispatch] = useContext(OrderContext);

  const [authState] = useContext(AuthContext);

  console.log(orderState);

  const { product } = orderState;

  const navigate = useNavigate();

  useEffect(() => {
    getCards(personalDispatch);
  }, []);

  const handleClick = () => {
    const url = document.URL;
    addCard(personalDispatch, url);
  };

  if (!personalState.cardLoading && personalState.session !== null) {
    window.location.href = `${personalState.session.session_url}`;
  }

  return (
    !authState.loading && (
      <div className="mt-20 w-full grid gap-4">
        <section className="shadow grid place-items-center border gap-2">
          <h1 className="text-new-blue">Cards You Saved</h1>
          {personalState.cardLoading ? (
            <h1 className=" lg:col-start-2">loading</h1>
          ) : personalState.cards.length === 0 ? (
            <h1 className="lg:col-start-2">No card added</h1>
          ) : (
            personalState.cards.map((card) => {
              return (
                <div className="w-full relative grid place-items-center">
                  <input
                    type="radio"
                    name="addressType"
                    value={card._id}
                    className="h-3 w-3 text-flame-orange absolute right-16 top-1 z-10"
                    //   onChange={onChangeAddress}
                    key={`input${card._id}`}
                  />
                  <CardComponent card={card} hidden={"hidden"} key={card._id} />
                </div>
              );
            })
          )}
          <button
            className="mx-4 w-11/12  my-4 bg-new-blue text-white "
            onClick={handleClick}
          >
            Add Card
          </button>
        </section>
        <div className="shadow px-1 py-2 bg-white z-50  border flex justify-between w-screen fixed bottom-0 items-center">
          {/* <h1>{product.productPrice}</h1> */}
          <button
            className="bg-light-flame-orange text-white text-lg rounded px-6 py-1"
            onClick={() => {
              navigate("/payment");
            }}
          >
            Confirm Order
          </button>
        </div>
      </div>
    )
  );
};

export default PaymentPage;
