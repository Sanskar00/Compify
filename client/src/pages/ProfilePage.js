import React, { useContext } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import SmallScreen from "../components/ProfilePageComponent/SmallScreen";
import MidLargeScreen from "../components/ProfilePageComponent/MidLargeScreen";

const ProfilePage = () => {
  const [authState] = useContext(AuthContext);

  if (!authState.isAuthenticated) {
    return <Navigate replace to="/" />;
  }

  return (
    <div className="h-full">
      <SmallScreen />
      <MidLargeScreen />
    </div>
  );
};

export default ProfilePage;
