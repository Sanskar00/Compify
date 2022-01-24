import React, { useContext, useEffect } from "react";
import { Navigate, useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import { addCard, getAddresses, getCards } from "../actions/personalInfoAction";
import { PersonalInfoContext } from "../context/PersonalContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CardPage = () => {
  const [state, dispatch] = useContext(PersonalInfoContext);
  useEffect(() => {
    getCards(dispatch);
  }, [getCards]);

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

  console.log(state);

  const handleClick = () => {
    addCard(dispatch);
  };
  console.log(state);
  if (!state.cardLoading && state.session !== null) {
    window.location.href = `${state.session.session_url}`;
  }
  return (
    <div className="mt-20 md:mt-36 grid">
      <div
        className="h-12 w-screen text-base text-new-blue shadow flex border 
       px-8 font-bold cursor-pointer items-center "
        onClick={handleClick}
      >
        {plus} <h1>Add a card</h1>
      </div>
      <div className="w-screen grid place-items-center mt-8 gap-4 ">
        {state.cardLoading
          ? "loading"
          : state.cards.map((card) => {
              console.log(card);
              return (
                <div className="h-36 w-2/3 shadow rounded bg-gradient-to-b from-teal-100 via-teal-200 to-teal-500 grid px-8 relative text-white">
                  <h1 className="self-center absolute  font-bold left-8">
                    xxxx xxxx xxxx {card.card.last4}
                  </h1>
                  <section className="self-end w-full flex justify-between ">
                    <section className="">
                      <h1 className="text-xs  font-semibold">Expires</h1>
                      <h1 className="text-xs  font-semibold">
                        {card.card.exp_month}/{card.card.exp_year}
                      </h1>
                    </section>
                    <i
                      className={`fab text-2xl   fa-cc-${card.card.brand}`}
                    ></i>
                  </section>
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default CardPage;
