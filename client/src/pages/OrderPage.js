import React, { useContext, useEffect } from "react";
import { OrderContext } from "../context/OrderContext";
import { getOrders } from "../actions/orderAction";
import { ReactComponent as Rupee } from "../assets/logo/rupee.svg";
import moment from "moment";
import Spinner from "../components/GlobalComponents/Spinner";

const OrderPage = () => {
  const [state, dispatch] = useContext(OrderContext);

  useEffect(() => {
    getOrders(dispatch);
  }, [getOrders]);

  const { order } = state;

  return (
    <div className="mt-20  grid md:mt-0 md:px-6 md:py-6 gap-6 md:p-0 relative">
      <h1 className="font-semibold text-lg">Your Orders</h1>
      {order.map((orderDetails) => {
        const { product, address, date } = orderDetails;
        return order.loading ? (
          <Spinner />
        ) : (
          <div
            className="shadow md:w-full md md:h-36 border flex place-self-center p-2 gap-4 justify-around "
            key={orderDetails._id}
          >
            <img
              src={product.productImage[0]}
              alt={product.productImage[0]}
              className="hidden md:block"
            ></img>
            <img
              src={product.productImage[0]}
              alt={product.productImage[0]}
              className="h-1/4 w-1/4 md:hidden"
            ></img>

            <section className="w-1/3 p-4">
              <h2 className="text-sm">{product.model}</h2>
              <h2 className="text-xs text-grey-500">
                {product.memorySize} Ram / {product.storageSize}{" "}
              </h2>
              <h2 className="text-xs text-grey-500 font-semibold flex gap-1">
                <Rupee />
                {product.productPrice}
              </h2>
            </section>
            <section className="grid justify-items-center text-sm">
              <h2 className="text-xs text-grey-500 font-semibold flex">
                Delivered On
              </h2>
              <h2 className="text-xs text-grey-500 font-semibold flex">
                {moment(date).format("MMM Do, YYYY ")}
              </h2>
            </section>
          </div>
        );
      })}
    </div>
  );
};

export default OrderPage;
