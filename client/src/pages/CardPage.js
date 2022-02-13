import React, { useContext, useEffect } from "react";
import { Navigate, useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import { addCard, deleteCards, getCards } from "../actions/personalInfoAction";
import CardComponent from "../components/GlobalComponents/CardComponent";
import { PersonalInfoContext } from "../context/PersonalContext";

const CardPage = () => {
  const [state, dispatch] = useContext(PersonalInfoContext);
  useEffect(() => {
    getCards(dispatch);
  }, []);

  const plus = (
    <svg
      className="  w-4 h-4 pointer-events-none stroke-current "
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke-linecap="round"
        className="pointer-events-none"
        stroke-linejoin="round"
        stroke-width="3"
        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
      ></path>
    </svg>
  );

  const handleClick = () => {
    const url = document.URL;
    addCard(dispatch, url);
  };

  if (!state.cardLoading && state.session !== null) {
    window.location.href = `${state.session.session_url}`;
  }

  return (
    <div className="mt-20  grid md:mt-0 md:px-6 md:py-6">
      <div
        className="h-12 w-screen text-base text-new-blue shadow flex border 
       px-8 font-bold cursor-pointer items-center  md:w-full "
        onClick={handleClick}
      >
        {plus} <h1>Add a card</h1>
      </div>
      <div className="w-screen grid place-items-center mt-8 gap-4 md:w-full   md:grid-cols-1 lg:grid-cols-3 ">
        {state.cardLoading ? (
          <h1 className=" lg:col-start-2">loading</h1>
        ) : state.cards.length === 0 ? (
          <h1 className="lg:col-start-2">No card added</h1>
        ) : (
          state.cards.map((card) => {
            return <CardComponent card={card} />;
          })
        )}
      </div>
    </div>
  );
};

export default CardPage;
