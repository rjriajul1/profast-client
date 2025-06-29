import React from "react";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxios();
  const { data: payments, isPending } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user?.email}`);
      return res.data;
    },
  });
  if (isPending) {
    return <p>loading....</p>;
  }

  return (
    <div className="overflow-x-auto shadow-lg rounded-xl">
      <table className="table w-full table-zebra">
        <thead className="bg-blue-100 text-blue-900">
          <tr>
            <th>#</th>
            <th>Email</th>
            <th>Transaction ID</th>
            <th>Amount</th>
            <th>Method</th>
            <th>Paid Date</th>
          </tr>
        </thead>
        <tbody>
          {payments?.map((payment, index) => (
            <tr key={payment._id}>
              <td>{index + 1}</td>
              <td>{payment.email}</td>
              <td className="text-sm break-all">{payment.transactionId}</td>
              <td>${payment.amount}</td>
              <td className="capitalize">{payment.paymentMethod?.[0]}</td>
              <td>{new Date(payment.paid_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentHistory;
