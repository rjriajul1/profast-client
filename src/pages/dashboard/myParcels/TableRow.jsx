import React from "react";

const TableRow = ({ index, parcel,handleDelete }) => {

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
          <button className="btn btn-xs ml-3">Edit</button>
        </div>
        <div>
          <button onClick={()=>handleDelete(parcel._id)} className="btn btn-xs ml-3">Delete</button>
        </div>
        </div>
      </td>
    </tr>
  );
};

export default TableRow;
