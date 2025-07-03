import React, { useState } from "react";
import { FaMotorcycle, FaPowerOff, FaSearch } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import Swal from "sweetalert2";

const ActiveRider = () => {
  const axiosSecure = useAxios();
  const [search, setSearch] = useState("");
  const [proccesing, setProccesing] = useState(false);

  // ✅ Fetch active riders
  const {
    data: riders = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["activeRiders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders/active");
      return res.data;
    },
  });

  // ❌ Deactivate rider
  const handleDeactivate = (id) => {
    setProccesing(true);
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to deactivate this rider.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, deactivate!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.patch(`/riders/deactivate/${id}`);
          if (res.data.modifiedCount > 0) {
            Swal.fire("Deactivated!", "Rider has been deactivated.", "success");
          }
        } catch (error) {
          Swal.fire("Error", "Deactivation failed.", "error", error.message);
        } finally {
          setProccesing(false);
          refetch();
        }
      }
    });
  };

  // 🔍 Filtered riders by search query
  const filteredRiders = riders.filter((rider) =>
    rider.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <FaMotorcycle /> Active Riders ({filteredRiders.length})
      </h2>

      {/* 🔍 Search Box */}
      <div className="mb-4 flex items-center gap-2">
        <FaSearch className="text-gray-500" />
        <input
          type="text"
          placeholder="Search by name..."
          className="input input-bordered w-full max-w-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {isLoading ? (
        <p className="text-center">Loading...</p>
      ) : isError ? (
        <p className="text-center text-red-500">Failed to load riders</p>
      ) : (
        <div className="overflow-x-auto rounded shadow">
          <table className="table w-full table-zebra">
            <thead className="bg-base-200 text-base font-semibold">
              <tr>
                <th>#</th>
                <th>Name & Email</th>
                <th>Phone</th>
                <th>Bike</th>
                <th>Region</th>
                <th>Status</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredRiders.map((rider, index) => (
                <tr key={rider._id}>
                  <td>{index + 1}</td>
                  <td>
                    <p className="font-semibold">{rider.name}</p>
                    <p className="text-sm text-gray-500">{rider.email}</p>
                  </td>
                  <td>{rider.phone}</td>
                  <td>
                    {rider.bikeBrand}
                    <br />
                    <span className="text-sm text-gray-500">
                      Reg: {rider.bikeRegNumber}
                    </span>
                  </td>
                  <td>
                    {rider.region}
                    <br />
                    <span className="text-sm text-gray-500">
                      {rider.district}
                    </span>
                  </td>
                  <td>
                    <span className="badge badge-success capitalize">
                      {rider.status}
                    </span>
                  </td>
                  <td className="text-center">
                    <button
                      className="btn btn-sm btn-error text-white"
                      onClick={() => handleDeactivate(rider._id)}
                    >
                      <FaPowerOff className="mr-1" />
                      {proccesing ? "deactivating...." : "deactivate"}
                    </button>
                  </td>
                </tr>
              ))}
              {filteredRiders.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center text-gray-500 py-8">
                    No rider found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ActiveRider;
