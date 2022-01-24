import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { deleteAddress, getAddresses } from "../actions/personalInfoAction";
import { PersonalInfoContext } from "../context/PersonalContext";

const Address = () => {
  const [state, dispatch] = useContext(PersonalInfoContext);
  const { addresses, loading } = state;

  useEffect(() => {
    getAddresses(dispatch);
  }, [getAddresses]);

  const deleteHandle = (id) => {
    deleteAddress(dispatch, id);
  };

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
    <div className="mt-20 md:mt-36 grid">
      <div
        className="h-12 w-screen text-base text-new-blue shadow flex border 
       px-8 font-bold cursor-pointer items-center "
        onClick={() => navigate("/address/addAddress")}
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
              <div className="shadow border px-8 py-2 grid gap-2 relative">
                <section className="flex gap-2 items-center">
                  <h1 className="text-lg">{address.name}</h1>
                  <h3 className="text-xs bg-gray-200 text-gray-500 rounded ">
                    {address.addressType}
                  </h3>
                </section>
                <section>
                  <section>
                    <h1 className="text-sm">{address.address}</h1>
                  </section>
                  <section>
                    <h1 className="text-sm">
                      {address.cityDistrictTown} {address.state} -{" "}
                      {address.pincode}
                    </h1>
                  </section>
                </section>
                <section>
                  <h1 className="text-sm">{address.mobileNumber}</h1>
                </section>
                <svg
                  class="w-4 h-4 absolute right-3 top-3 cursor-pointer"
                  fill="gray"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={() => {
                    deleteHandle(address._id);
                  }}
                >
                  <path
                    fill-rule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Address;
