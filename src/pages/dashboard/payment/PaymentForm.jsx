import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import {  useNavigate, useParams } from "react-router";
import useAxios from "../../../hooks/useAxios";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";
import Swal from "sweetalert2";
import { transformation } from "leaflet";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxios();
  const { user } = useAuth();
  const navigate = useNavigate()
  const { parcelId } = useParams();
  const [error, setError] = useState("");
  const { data: parcel, isPending } = useQuery({
    queryKey: ["parcel", parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcel/${parcelId}`);
      return res.data;
    },
  });
  const amount = parcel?.cost;
  const amountInCents = amount * 100;

  if (isPending) {
    return <p>Loading...</p>;
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      setError(error.message);
    } else {
      setError("");
      console.log("paymentMethod", paymentMethod);
    }

    const res = await axiosSecure.post("/create-payment-intent", {
      amountInCents,
      parcelId,
    });
    const clientSecret = res?.data?.clientSecret;
    console.log(clientSecret);

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: user?.displayName,
          email: user?.email,
        },
      },
    });

    if (result.error) {
      setError(result.error.message);
    } else {
      setError("");
      if (result.paymentIntent.status === "succeeded") {
        console.log("payment success");
       const transactionId = result.paymentIntent.id

        // save payment history
        const newPayment = {
          email: user?.email,
          parcelId,
          amount,
          transactionId,
          paymentMethod: result.paymentIntent.payment_method_types,
        };

        const res = await axios.post(
          "http://localhost:3000/payments",
          newPayment
        );
        if (res.data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your payment successful",
            html: `<strong>Transaction ID: </strong> <code>${transformation}</code>`,
            showConfirmButton: false,
            timer: 1500,
          });
          navigate('/dashboard/myParcels')
        }
      }
    }
  };
  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="p-6 bg-white shadow-md rounded">
        <CardElement className="p-2 border" />
        <button
          className="mt-4 btn btn-primary text-black w-full"
          type="submit"
          disabled={!stripe}
        >
          Pay ${amount}
        </button>
        {error && <p className="text-red-500 text-center">{error}</p>}
      </form>
    </div>
  );
};

export default PaymentForm;
