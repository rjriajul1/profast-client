import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { FaClock } from "react-icons/fa";
import { FaEye, FaCheck, FaTimes } from "react-icons/fa";
import useAxios from "../../../hooks/useAxios";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const PendingRider = () => {
  const [selectedRider, setSelectedRider] = useState(null);
  const axiosSecure = useAxios();

  const {
    data: riders = [],
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["pending-riders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/pending-rider");
      return res.data;
    },
  });

  const handleAccept = async (id,email) => {
    await axiosSecure
      .patch(`/riders/approve/${id}`,{email,status:'active'})
      .then((res) => {
        if (res.data.success) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "approved successful",
            showConfirmButton: false,
            timer: 1500,
          });
        }
        refetch();
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const handleReject = async(id) => {
     await axiosSecure
      .delete(`/riders/reject/${id}`)
      .then((res) => {
        if (res.data.success) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "reject successful",
            showConfirmButton: false,
            timer: 1500,
          });
        }
        refetch();
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  if (isPending) {
    return <p>loading...</p>;
  }
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <FaClock /> Pending Riders
      </h2>

      <div className="overflow-x-auto rounded shadow">
        <table className="table w-full table-zebra">
          <thead className="bg-base-200 text-base font-semibold">
            <tr>
              <th>#</th>
              <th>Name & Email</th>
              <th>Phone</th>
              <th>Region</th>
              <th>Applied</th>
              <th>Status</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {riders?.map((rider, index) => (
              <tr key={rider._id}>
                <td>{index + 1}</td>
                <td>
                  <p className="font-semibold">{rider.name}</p>
                  <p className="text-sm text-gray-500">{rider.email}</p>
                </td>
                <td>{rider.phone}</td>
                <td>
                  {rider.region}
                  <br />
                  <span className="text-sm text-gray-500">
                    {rider.district}
                  </span>
                </td>
                <td>{new Date(rider.createdAt).toLocaleDateString()}</td>
                <td>
                  <span className="badge badge-warning capitalize">
                    {rider.status}
                  </span>
                </td>
                <td className="flex flex-col md:flex-row gap-2 justify-center">
                  {/* Details */}
                  <button
                    className="btn btn-sm btn-info text-white"
                    onClick={() => setSelectedRider(rider)}
                  >
                    <FaEye />
                  </button>
                  {/* Accept */}
                  <button
                    className="btn btn-sm btn-success text-white"
                    onClick={() => handleAccept(rider._id,rider.email)}
                  >
                    <FaCheck />
                  </button>
                  {/* Reject */}
                  <button
                    className="btn btn-sm btn-error text-white"
                    onClick={() => handleReject(rider._id)}
                  >
                    <FaTimes />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedRider && (
        <dialog id="rider_modal" className="modal modal-open">
          <div className="modal-box max-w-2xl">
            <h3 className="font-bold text-xl mb-4">
              Rider Details - {selectedRider.name}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <strong>Email:</strong> <p>{selectedRider.email}</p>
              </div>
              <div>
                <strong>Phone:</strong> <p>{selectedRider.phone}</p>
              </div>
              <div>
                <strong>Age:</strong> <p>{selectedRider.age}</p>
              </div>
              <div>
                <strong>NID:</strong> <p>{selectedRider.nid}</p>
              </div>
              <div>
                <strong>Bike Brand:</strong> <p>{selectedRider.bikeBrand}</p>
              </div>
              <div>
                <strong>Bike Reg No:</strong>{" "}
                <p>{selectedRider.bikeRegNumber}</p>
              </div>
              <div>
                <strong>Region:</strong> <p>{selectedRider.region}</p>
              </div>
              <div>
                <strong>District:</strong> <p>{selectedRider.district}</p>
              </div>
              <div className="md:col-span-2">
                <strong>Motivation:</strong>
                <p className="text-sm text-gray-600">
                  {selectedRider.motivation}
                </p>
              </div>
            </div>

            <div className="modal-action mt-6">
              <form method="dialog">
                <button className="btn" onClick={() => setSelectedRider(null)}>
                  Close
                </button>
              </form>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default PendingRider;
