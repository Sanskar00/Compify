import React, { useState, useContext } from "react";
import { editProfile } from "../../actions/authAction";
import { AlertContext } from "../../context/AlertContext";
import { AuthContext } from "../../context/AuthContext";

const PersonalInfoPage = () => {
  const [display, setDisplay] = useState("hidden");

  const [disable, setDisable] = useState("disable");

  const [cursorPointer, setCursorPointer] = useState("cursor-not-allowed");

  const [authState, dispatch] = useContext(AuthContext);
  const [{}, alertDispatch] = useContext(AlertContext);

  const { user } = authState;

  const { name, mobileNumber, email } = user;

  const [formData, setFormData] = useState({
    name,
    mobileNumber,
    email,
  });

  const dispatches = {
    dispatch,
    alertDispatch,
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEdit = () => {
    setDisplay("");
    setDisable("");
    setCursorPointer("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editProfile(dispatches, formData);
  };

  return (
    <div className="mt-20  grid md:mt-0 md:px-6 md:py-6 gap-6 md:p-0 ">
      <section className="flex gap-4 items-center">
        <h1 className="font-semibold text-lg">Personal Information</h1>
        <h2
          className="text-sm text-new-blue font-semibold cursor-pointer"
          onClick={handleEdit}
        >
          Edit
        </h2>
      </section>
      <form
        onSubmit={handleSubmit}
        className="grid place-self-center w-full   gap-6"
      >
        <section className="flex gap-2">
          <input
            className={`w-2/3 h-8 pr-8 appearance-none  pl-2 rounded-lg border-gray-200 border leading-tight focus:outline-none focus:bg-white focus:border-new-blue md:w-1/2 lg:w-1/4 ${cursorPointer} text-sm`}
            defaultValue={user.name}
            type="text"
            name="name"
            disabled={`${disable}`}
            onChange={handleChange}
          ></input>
        </section>
        <section>
          <h1 className="text-lg font-semibold">Email Address</h1>
          <input
            className={`w-2/3 h-8 pr-8 appearance-none  pl-2 rounded-lg border-gray-200 border leading-tight focus:outline-none focus:bg-white focus:border-new-blue md:w-1/2 lg:w-1/4 ${cursorPointer} text-sm`}
            defaultValue={user.email}
            type="text"
            name="email"
            disabled={`${disable}`}
            onChange={handleChange}
          ></input>
        </section>
        <section>
          <h1 className="text-lg font-semibold">Phone Number</h1>
          <input
            className={`w-2/3 h-8 pr-8 appearance-none  pl-2 rounded-lg border-gray-200 border leading-tight focus:outline-none focus:bg-white focus:border-new-blue md:w-1/2 lg:w-1/4 ${cursorPointer} text-sm`}
            defaultValue={user.mobileNumber}
            type="text"
            name="email"
            disabled={`${disable}`}
            onChange={handleChange}
          ></input>
        </section>
        <button
          className={`w-2/3  md:w-1/2 h-8 bg-new-blue text-white rounded-sm lg:w-1/4 ${display} text-sm`}
          type="submit"
          // onClick={() => {
          //   logout(dispatch);
          //   navigate("/");
          // }}
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default PersonalInfoPage;
