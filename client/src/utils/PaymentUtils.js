import { useContext } from "react";
import { OrderContext, OrderProvider } from "../context/OrderContext";
import { loadStripe } from "@stripe/stripe-js";
import { CardElement, useElements } from "@stripe/react-stripe-js";
import { CartContext } from "../context/CartContext";
import { PersonalInfoContext } from "../context/PersonalContext";
import { orderedProduct } from "../actions/orderAction";
import { AlertContext } from "../context/AlertContext";
import { setAlert } from "../actions/alertAction";

export var stripePromise = loadStripe(
  "pk_test_51K0RvbSHqep0AJHb7IwAhCnheAkNNpLRFZlW0zY8pQ6EyusidDfENz34bREGpFjiddQansVxhLIJvrzgA4W573X100Ay157MmG"
);

export const PaymentConfirmation = async (props) => {
  const { order, cart, personal, alertDispatch } = props;

  const { orderState, orderDispatch } = order;

  const { payment, cvc } = orderState;

  const address = personal.addresses.find(
    (address) => address.defaultAddress === true
  );

  const ids = {
    addressId: address._id,
    productId: cart.cart[0]._id,
  };

  if (orderState.continueButton === "cardContinue") {
    (await stripePromise)
      .confirmCardPayment(orderState.payment.client_secret, {
        payment_method: orderState.payment.payment_method,
        payment_method_options: {
          card: {
            cvc: orderState.cvc,
          },
        },
      })
      .then(function (result) {
        if (result.error) {
          setAlert(alertDispatch, result.error.message, "text-red-700");
        } else if (result.paymentIntent.status === "succeeded") {
          orderedProduct(orderDispatch, ids);
          setAlert(alertDispatch, "Your order is placed", "text-green-500");
        }
      });
  } else if (orderState.continueButton === "directContinue") {
    (await stripePromise)
      .confirmCardPayment(orderState.payment.client_secret, {
        payment_method: {
          card: orderState.elements.getElement(CardElement),
        },
      })
      .then(function (result) {
        if (result.error) {
          setAlert(alertDispatch, result.error.message, "text-red-700");
        } else if (result.paymentIntent.status === "succeeded") {
          orderedProduct(orderDispatch, ids);
          setAlert(alertDispatch, "Your order is placed", "text-green-500");
        }
      });
  }
};
