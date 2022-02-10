import React, { useContext, useEffect, useState } from "react";
import { getAddresses, loadingState } from "../actions/personalInfoAction";
import { PersonalInfoContext } from "../context/PersonalContext";
import { OrderContext } from "../context/OrderContext";
import AddressComponent from "../components/GlobalComponents/Address";
import { useNavigate, Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { changeDefaultAddress } from "../actions/personalInfoAction";
import { CartContext } from "../context/CartContext";
import { getCart } from "../actions/cartAction";
import { setAlert } from "../actions/alertAction";
import { AlertContext } from "../context/AlertContext";

const GetAddress = () => {
  useEffect(() => {
    getCart(cartDispatch);
  }, []);

  const [personalState, personalDispatch] = useContext(PersonalInfoContext);

  const [cartState, cartDispatch] = useContext(CartContext);

  const [authState] = useContext(AuthContext);

  const [{}, alertDispatch] = useContext(AlertContext);

  const [showAddress, setShowaddress] = useState(false);

  const [urlLocation, setUrlLocation] = useState("");

  const [address, setAddress] = useState("");

  const cart = cartState.cart;

  const product = cart[0];

  useEffect(() => {
    console.log(cartState);
    console.log(product);
  }, []);

  const onChangeAddress = (e) => {
    setAddress(e.target.value);
  };

  useEffect(() => {
    return getAddresses(personalDispatch);
  }, [personalState]);

  const showMoreAddress = () => {
    setShowaddress(!showAddress);
  };

  const handleDefaultAddress = (e) => {
    changeDefaultAddress(personalDispatch, e.target.value);
  };

  const navigate = useNavigate();

  return (
    !personalState.loading &&
    !cartState.loading &&
    !authState.loading && (
      <div className="mt-20 w-screen grid gap-4 md:mt-24  md:w-screen md:place-items-center ">
        <div className="w-screen shadow border grid realtive z-10 md:w-11/12 lg:w-2/3">
          <h1
            className="cursor-pointer  text-new-blue place-self-center "
            onClick={showMoreAddress}
          >
            Show Saved Address
          </h1>

          {/* Address */}
          <div className="mt-2 relative grid gap-2 ">
            {showAddress ? (
              <div>
                {personalState.addresses.map((address) => (
                  <div className="relative grid" key={address._id}>
                    <input
                      type="radio"
                      name="addressType"
                      value={address._id}
                      className="h-3 w-3 text-flame-orange absolute right-2 top-1 z-10"
                      onChange={onChangeAddress}
                      onClick={handleDefaultAddress}
                      key={address._id}
                    />
                    <AddressComponent address={address} hidden={"hidden"} />
                  </div>
                ))}
                <button
                  className="mx-4 w-11/12 bg-new-blue text-white "
                  onClick={() => {
                    navigate("/address/addAddress", {
                      state: window.location.pathname,
                    });
                  }}
                >
                  Add Address
                </button>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
        {Array.isArray(product) ? (
          <div></div>
        ) : cartState.loading ? (
          <div></div>
        ) : (
          <div className="grid gap-2 md:w-11/12 lg:w-2/3">
            <div className="shadow px-8 py-2 border flex justify-around md:justify-between ">
              <section className="grid gap-1">
                <h1 className="text-base">{product.model}</h1>
                <h2 className="text-xs text-gray-500">
                  ({product.memorySize} Ram / {product.storageSize})
                </h2>
                <h1 className="font-bold text-base">{product.productPrice}</h1>
              </section>
              <div className="w-4/12 md:w-full md:h-56  grid grid-row-2 place-items-center md:place-items-end">
                <img
                  className="md:w-56 md:h-56 "
                  key={product._id}
                  src={product.productImage[3]}
                ></img>
              </div>
            </div>
            {/* pridceDetails */}
            <div className="shadow px-1 py-2 bg-white z-50  border flex justify-between w-screen fixed bottom-0 items-center md:hidden ">
              <h1>{product.productPrice}</h1>
              <button
                className="bg-light-flame-orange text-white text-lg rounded px-6 py-1"
                onClick={() => {
                  !address
                    ? setAlert(
                        alertDispatch,
                        "Please select address to proceed",
                        "text-red-900"
                      )
                    : navigate("/payment", { state: address });
                }}
              >
                Continue
              </button>
            </div>
          </div>
        )}
        {/* Order Summary */}
        {/* products which is order */}
      </div>
    )
  );
};

export default GetAddress;
