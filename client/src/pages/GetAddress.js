import React, { useContext, useEffect, useState } from "react";
import { getAddresses } from "../actions/personalInfoAction";
import { PersonalInfoContext } from "../context/PersonalContext";
import { OrderContext } from "../context/OrderContext";
import AddressComponent from "../components/GlobalComponents/Address";

const GetAddress = () => {
  const [personalState, personalDispatch] = useContext(PersonalInfoContext);
  const [orderState, orderdispatch] = useContext(OrderContext);

  const [showAddress, setShowaddress] = useState(false);

  const [address, setAddress] = useState("");

  const onChangeAddress = (e) => {
    setAddress(e.target.value);
  };

  useEffect(() => {
    getAddresses(personalDispatch);
  }, [getAddresses]);

  const showMoreAddress = () => {
    setShowaddress(!showAddress);
  };

  const getAddress = () => {
    getAddress(personalDispatch, address);
  };

  console.log(showAddress);

  console.log(orderState);

  const { addresses } = personalState;

  return (
    <div className="mt-20 w-full">
      <div className="w-screen shadow border grid place-items-center">
        <h1 className="cursor-pointer text-new-blue" onClick={showMoreAddress}>
          Show Saved Address
        </h1>
        <div className="mt-2">
          {showAddress ? (
            addresses.map((address) => {
              return (
                <div className="relative my-4">
                  <input
                    type="radio"
                    name="addressType"
                    value={address._id}
                    className="h-3 w-3 text-flame-orange absolute right-2 top-1 z-10"
                    onChange={onChangeAddress}
                  />
                  <AddressComponent address={address} hidden={"hidden"} />
                </div>
              );
            })
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GetAddress;
