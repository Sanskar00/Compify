import React, { useContext } from "react";
import { PersonalInfoContext } from "../../context/PersonalContext";
import { deleteAddress } from "../../actions/personalInfoAction";

const AddressComponent = ({ address, hidden }) => {
  const [state, dispatch] = useContext(PersonalInfoContext);
  const deleteHandle = (id) => {
    deleteAddress(dispatch, id);
  };
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
            {address.cityDistrictTown} {address.state} - {address.pincode}
          </h1>
        </section>
      </section>
      <section>
        <h1 className="text-sm">{address.mobileNumber}</h1>
      </section>
      <svg
        className={`w-4 h-4 absolute right-3 top-3 cursor-pointer ${hidden}`}
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
};

AddressComponent.defaultProps = {
  hidden: "",
};

export default AddressComponent;
