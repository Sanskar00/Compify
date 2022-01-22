import React, { useContext, useState } from "react";
import { addAddress } from "../actions/personalInfoAction";
import { PersonalInfoContext } from "../context/PersonalContext";

const AddAddress = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobileNumber: "",
    pincode: "",
    address: "",
    cityDistrictTown: "",
    addressType: "",
  });
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [state, dispatch] = useContext(PersonalInfoContext);

  const onSubmit = (e) => {
    e.preventDefault();
    addAddress(dispatch, formData);
  };

  console.log(formData);
  return (
    <div className="mt-24 md:mt-36 grid justify-items-stretch ">
      <h1 className="mx-4"> Add address</h1>
      <form
        className=" w-screen grid place-items-center gap-6 text-gray-500 mt-4 text-xs"
        onSubmit={onSubmit}
      >
        <input
          className="h-10 rounded-lg pl-2 border-gray-200 border w-10/12 "
          placeholder="Name"
          name="name"
          onChange={onChange}
          required
          type="text"
        ></input>
        <input
          className="h-10 rounded-lg pl-2 border-gray-200 border w-10/12 text-gray-500"
          placeholder="Mobile Number"
          name="mobileNumber"
          onChange={onChange}
          required
          type="numric-only"
        ></input>
        <input
          className="h-10 rounded-lg pl-2 border-gray-200 border w-10/12 text-gray-500"
          placeholder="Pincode"
          name="pincode"
          onChange={onChange}
          required
          type="numric-only"
        ></input>
        <input
          className="h-10 rounded-lg pl-2 border-gray-200 border w-10/12 text-gray-500"
          placeholder="Address"
          name="address"
          onChange={onChange}
          required
          type="text"
        ></input>
        <input
          className="h-10 rounded-lg pl-2 border-gray-200 border w-10/12 text-gray-500"
          placeholder="City/District/Town"
          name="cityDistrictTown"
          onChange={onChange}
          required
          type="text"
        ></input>
        <input
          className="h-10 rounded-lg pl-2 border-gray-200 border w-10/12 text-gray-500"
          placeholder="State"
          name="state"
          onChange={onChange}
          required
          type="text"
        ></input>
        <input
          className="h-10 rounded-lg pl-2 border-gray-200 border w-10/12 text-gray-500"
          placeholder="Landmark"
          name="landmark"
          onChange={onChange}
          type="text"
        ></input>
        <input
          className="h-10 rounded-lg pl-2 border-gray-200 border w-10/12 text-gray-500"
          placeholder="Alternate Mobile Number"
          name="alternatePhone"
          onChange={onChange}
          required
          type="numric-only"
        ></input>
        <h1 className="justify-self-start mx-8">Address Type</h1>
        <section className="flex justify-self-start ">
          <div className="flex justify-self-start items-center gap-1 mx-10">
            <input
              type="radio"
              id="html"
              name="addressType"
              value="home"
              className="h-3 w-3 text-flame-orange "
              onChange={onChange}
            />
            <label for="home" className="text-sm">
              Home
            </label>
          </div>
          <div className="flex justify-self-start items-center gap-1 mx-10">
            <input
              type="radio"
              id="html"
              name="addressType"
              value="office"
              onChange={onChange}
              className="h-3 w-3 text-flame-orange "
            />
            <label for="office" className="text-sm">
              Office
            </label>
          </div>
        </section>
        <input
          type="submit"
          className="w-10/12 h-10  cursor-pointer bg-flame-orange rounded-lg text-white"
          value="Save Adress"
        ></input>
      </form>
    </div>
  );
};

export default AddAddress;
