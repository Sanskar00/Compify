import React, { useContext, useEffect } from "react";
import { Navigate, useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import { addCard, deleteCards, getCards } from "../actions/personalInfoAction";
import { PersonalInfoContext } from "../context/PersonalContext";

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
    const url = document.URL;
    addCard(dispatch, url);
  };

  const handleDelete = (id) => {
    deleteCards(dispatch, id);
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
            console.log(card.id);
            return (
              <div className="h-36 w-2/3   shadow rounded bg-gradient-to-b from-teal-100 via-teal-200 to-teal-500 grid px-8 relative text-white md:w-60">
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
                  <i className={`fab text-2xl   fa-cc-${card.card.brand}`}></i>
                </section>
                <section className="absolute right-0">
                  <svg
                    class="w-4 h-4 absolute right-3 top-3 cursor-pointer"
                    fill="white"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={() => {
                      handleDelete(card.id);
                    }}
                  >
                    <path
                      fill-rule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </section>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default CardPage;
