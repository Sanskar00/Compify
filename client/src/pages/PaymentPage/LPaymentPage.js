import React, { useContext, useEffect } from "react";
import { PersonalInfoContext } from "../../context/PersonalContext";
import { CartContext } from "../../context/CartContext";
import { OrderContext } from "../../context/OrderContext";
import { AuthContext } from "../../context/AuthContext";
import { getCards } from "../../actions/personalInfoAction";
import { getCart } from "../../actions/cartAction";
import { getAddresses } from "../../actions/personalInfoAction";
import { addCard } from "../../actions/personalInfoAction";
import CardLayout from "../../components/PaymentPageComponent/CardLayout";
import CardPayElement from "../../components/PaymentPageComponent/CardPayElement";
import { PaymentConfirmation } from "../../utils/PaymentUtils";
import GetAddress from "../GetAddress";
import SPaymentPage from "./SPaymentPage";
import { useNavigate } from "react-router-dom";
import { getAddress } from "../../actions/orderAction";

const LPaymentPage = () => {
  return (
    <div className="hidden md:grid">
      <GetAddress />
    </div>
  );
};

export default LPaymentPage;
