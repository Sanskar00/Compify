import React, { useContext, useEffect } from "react";
import { OrderContext } from "../context/OrderContext";
import { getOrders } from "../actions/orderAction";

const OrderPage = () => {
  const [{}, dispatch] = useContext(OrderContext);
  useEffect(() => {
    getOrders(dispatch);
  }, [getOrders]);

  return <div></div>;
};

export default OrderPage;
