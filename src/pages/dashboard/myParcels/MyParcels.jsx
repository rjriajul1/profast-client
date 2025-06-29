import React from "react";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import TableRow from "./TableRow";
import { ClipLoader } from "react-spinners";
import Swal from "sweetalert2";

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxios();
  const { data:parcels, refetch} = useQuery({
      queryKey: ["myParcels", user?.email],
      queryFn: async () => {
          const res = await axiosSecure.get(`/parcels/${user.email}`);
          return res.data;
        },
    });
    // console.log(data);
  
  

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/remove/${id}`)
          .then((res) => {
            if (res.data.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "Your parcel has been deleted.",
                icon: "success",
              });
             refetch()
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };
  return (
    <div className="w-11/12 mx-auto">
      <h1 className="text-2xl font-bold">My Parcels</h1>
      <p className="py-2 font-semibold">
        Track and manage your parcels securely — only you can see your
        deliveries.
      </p>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Type</th>
              <th>sender Info</th>
              <th>cost</th>
              <th>Payment</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {parcels?.map((parcel, index) => (
              <TableRow
                key={parcel._id}
                index={index}
                parcel={parcel}
                handleDelete={handleDelete}
              ></TableRow>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyParcels;
