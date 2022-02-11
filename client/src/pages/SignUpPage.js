import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { setAlert } from "../actions/alertAction";
import { register } from "../actions/authAction";
import { AuthContext } from "../context/AuthContext";

const SignUpPage = () => {
  const navigate = useNavigate();

  const [state, dispatch] = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: "",
    mobileNumber: "",
    email: "",
    password: "",
    password2: "",
  });

  console.log(state);

  const { name, mobileNumber, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert(dispatch, "Passwords do not match", "danger");
    } else {
      register(dispatch, { name, mobileNumber, email, password });
    }
  };
  return (
    <div className="mt-20 w-screen h-screen  place-items-center relative">
      <div className="absolute top-12 w-full place-items-center grid">
        <h1 className="mb-12 text-2xl font-semibold  "> Create an account</h1>
        <div className="w-full ">
          <form
            className="w-full grid place-items-center gap-8"
            onSubmit={onSubmit}
          >
            <input
              className="w-2/3 h-12 pr-8 appearance-none  pl-2 rounded-lg border-gray-200 border leading-tight focus:outline-none focus:bg-white focus:border-new-blue md:w-2/6 lg:w-1/5"
              placeholder="Name"
              type="text"
              name="name"
              value={name}
              onChange={onChange}
            ></input>

            <input
              className="w-2/3 h-12 pr-8 appearance-none   pl-2 rounded-lg border-gray-200 border leading-tight focus:outline-none focus:bg-white focus:border-new-blue md:w-2/6 lg:w-1/5"
              placeholder="Mobile Number"
              type="numeric-only"
              name="mobileNumber"
              value={mobileNumber}
              onChange={onChange}
            ></input>

            <input
              className="w-2/3 h-12 pr-8 appearance-none  pl-2 rounded-lg border-gray-200 border leading-tight focus:outline-none focus:bg-white focus:border-new-blue md:w-2/6 lg:w-1/5"
              placeholder="Email"
              name="email"
              type="email"
              value={email}
              onChange={onChange}
            ></input>
            <input
              className="w-2/3 h-12 pr-8 appearance-none   pl-2 rounded-lg border-gray-200 border   leading-tight focus:outline-none focus:bg-white focus:border-new-blue md:w-2/6 lg:w-1/5"
              placeholder="Password"
              type="password"
              name="password"
              value={password}
              onChange={onChange}
            ></input>
            <input
              className="w-2/3 h-12 pr-8 appearance-none   pl-2 rounded-lg border-gray-200 border   leading-tight focus:outline-none focus:bg-white focus:border-new-blue md:w-2/6 lg:w-1/5"
              placeholder="Confirm Password"
              type="password"
              name="password2"
              value={password2}
              onChange={onChange}
            ></input>
            <input
              type="submit"
              className="w-2/3 h-12  cursor-pointer bg-new-blue rounded-lg text-white md:w-2/6 lg:w-1/5"
              value="Sign Up"
            ></input>
          </form>
        </div>
        <div className="flex gap-2 my-4">
          <h2 className="text-sm text-gray-500 "> Don't have account</h2>
          <div
            className="text-sm cursor-pointer text-new-blue"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
