import React from "react";
import { useNavigate } from "react-router";

const TableRow = ({ index, parcel, handleDelete }) => {
  const navigate = useNavigate();
  const handlePay = (id) => {
    navigate(`/dashboard/payment/${id}`);
  };
  return (
    <tr>
      <th>{index + 1}</th>
      <td>
        <div className="flex items-center gap-3">
          <div>
            <div className="font-bold">{parcel?.type}</div>
          </div>
        </div>
      </td>
      <td className="flex flex-col items-center">
        {parcel.senderName}
        <br />
        <span className="badge badge-ghost badge-sm">{parcel.created_by}</span>
      </td>
      <td>{parcel.cost}৳</td>
      <td>{parcel.payment_status}</td>
      <td>
        <div className="flex relative -left-8">
          <div>
            <button className="btn btn-xs ml-3">View</button>
          </div>
          <div>
            <button
              onClick={() => handlePay(parcel._id)}
              className={`btn btn-primary text-black btn-xs ml-3 ${
                parcel.payment_status === "paid" && "hidden"
              }`}
            >
              pay
            </button>
          </div>
          <div>
            <button
              onClick={() => handleDelete(parcel._id)}
              className="btn btn-xs ml-3"
            >
              Delete
            </button>
          </div>
        </div>
      </td>
    </tr>
  );
};

export default TableRow;
