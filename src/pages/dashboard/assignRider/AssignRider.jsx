import { useQuery } from "@tanstack/react-query";
import { FaUserPlus } from "react-icons/fa";
import useAxios from "../../../hooks/useAxios";
import { useState } from "react";

const AssignRider = () => {
  const axiosSecure = useAxios();
  const [selectedParcel, setSelectedParcel] = useState(null);
  const [riders, setRiders] = useState([]);
  const {
    data: parcels = [],
    isLoading,
  } = useQuery({
    queryKey: ["assignableParcels"],
    queryFn: async () => {
      const res = await axiosSecure.get("/assignable");
      // Filter only paid & not_collected
      return res.data.filter(
        (parcel) =>
          parcel.payment_status === "paid" &&
          parcel.delivery_status === "not_collected"
      );
    },
  });

  const openAssignModal = async (parcel) => {
    setSelectedParcel(parcel);
    const res = await axiosSecure.get(
      `/riders?district=${parcel.senderServiceCenter}`
    );
    setRiders(res.data || []);
    document.getElementById("assign_modal").showModal();
  };

  return (
    <div className="p-4 overflow-x-auto">
      <h2 className="text-2xl font-semibold mb-4">Assign Rider to Parcels</h2>

      {isLoading ? (
        <div className="text-center text-lg">Loading...</div>
      ) : parcels.length === 0 ? (
        <p className="text-gray-500">No parcels pending rider assignment.</p>
      ) : (
        <table className="table w-full border rounded-lg">
          <thead>
            <tr className="bg-gray-100">
              <th>Parcel</th>
              <th>From</th>
              <th>To</th>
              <th>Cost</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel) => (
              <tr key={parcel._id}>
                <td>{parcel.parcelName}</td>
                <td>{parcel.senderRegion}</td>
                <td>{parcel.receiverRegion}</td>
                <td>{parcel.cost} ৳</td>
                <td>
                  <span className="badge badge-success">
                    {parcel.payment_status}
                  </span>
                </td>
                <td>
                  <span className="badge badge-warning">
                    {parcel.delivery_status}
                  </span>
                </td>
                <td>
                  <button
                    onClick={() => openAssignModal(parcel)}
                    className="btn btn-sm btn-primary text-black flex items-center gap-1"
                  >
                    <FaUserPlus /> Assign Rider
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {/* Modal for Rider Selection */}
      <dialog id="assign_modal" className="modal">
        <div className="modal-box max-w-3xl">
          <h3 className="font-bold text-xl mb-2">Available Riders</h3>
          <p className="text-sm mb-4">
            Matching District:{" "}
            <span className="font-semibold">
              {selectedParcel?.senderServiceCenter}
            </span>
          </p>

          {riders.length === 0 ? (
            <p className="text-red-500">
              No available riders found in this district.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Contact</th>
                    <th>District</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {riders.map((rider) => (
                    <tr key={rider._id}>
                      <td>{rider.name}</td>
                      <td>{rider.phone || rider.email}</td>
                      <td>{rider.district}</td>
                      <td>
                        <button
                          className="btn btn-sm text-black btn-outline btn-success"
                          onClick={() =>
                            console.log("Selected Rider:", rider._id)
                          }
                        >
                          Assign
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-sm">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AssignRider;
