import React, { useContext, useEffect } from "react";
import LPaymentPage from "./LPaymentPage";
import SPaymentPage from "./SPaymentPage";

const PaymentPage = () => {
  return (
    <div>
      <section className="w-screen">
        <LPaymentPage />
        <SPaymentPage />
      </section>
    </div>
  );
};

export default PaymentPage;
