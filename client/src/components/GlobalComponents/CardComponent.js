import React from "react";
import { useContext } from "react";
import { PersonalInfoContext } from "../../context/PersonalContext";
import { deleteCards } from "../../actions/personalInfoAction";

const CardComponent = ({ card, hidden }) => {
  const [{}, dispatch] = useContext(PersonalInfoContext);

  const handleDelete = (id) => {
    deleteCards(dispatch, id);
  };

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
          className={`w-4 h-4 absolute right-3 top-3 cursor-pointer ${hidden}`}
          fill="white"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => {
            handleDelete(card.id);
          }}
        >
          <path
            fillRule="evenodd"
            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
            clipRule="evenodd"
          ></path>
        </svg>
      </section>
    </div>
  );
};

CardComponent.defaultProps = {
  hidden: "",
};

export default CardComponent;
