import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { deleteAddress, getAddresses } from "../actions/personalInfoAction";
import { PersonalInfoContext } from "../context/PersonalContext";
import AddressComponent from "../components/GlobalComponents/Address";

const Address = () => {
  const [state, dispatch] = useContext(PersonalInfoContext);
  const { addresses, loading } = state;

  useEffect(() => {
    return getAddresses(dispatch);
  }, [state.addresses]);

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
  const navigate = useNavigate();
  return (
    <div className="mt-20 grid md:mt-0 md:px-6 md:py-6">
      <div
        className="h-12 w-screen text-base text-new-blue shadow flex border 
       px-8 font-bold cursor-pointer items-center md:w-full "
        onClick={() => {
          navigate("/address/addAddress", {
            state: window.location.pathname,
          });
        }}
      >
        {plus} <h1>Add a new address</h1>
      </div>
      {loading ? (
        <h1 className="text-base">No address</h1>
      ) : (
        <div className="mt-4 w-full">
          <h2 className="text-xs text-gray-500 mx-6 mb-2">
            {addresses.length <= 1
              ? `${addresses.length} SAVED ADDRESS`
              : `${addresses.length} SAVED ADDRESSES`}
          </h2>
          {addresses.map((address) => {
            return (
              <div>
                <form>
                  <AddressComponent address={address} />
                </form>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Address;
