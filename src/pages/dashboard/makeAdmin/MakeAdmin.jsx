import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaUserShield, FaUserSlash } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxios from "../../../hooks/useAxios";
import toast from "react-hot-toast";

const MakeAdmin = () => {
  const axiosSecure = useAxios();
  const [searchEmail, setSearchEmail] = useState("");
  const [triggerSearch, setTriggerSearch] = useState("");

  // Query to search users
  const {
    data: users = [],
    isLoading,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["searchUsers", triggerSearch],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/search?email=${triggerSearch}`);
      return res.data;
    },
    enabled: !!triggerSearch, // only runs when triggerSearch is not empty
  });

  //make to admin
  const makeAdmin = async (id) => {
    console.log(id);
    try {
      const res = await axiosSecure.patch(`/users/${id}/role`, {
        role: "admin",
      });
      if (res.data.result.modifiedCount) {
        Swal.fire("Success!", "User promoted to Admin.", "success");
        refetch();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  //   remove  admin
  const removeAdmin = async (id) => {
    try {
      const res = await axiosSecure.patch(`/users/${id}/role`, {
        role: "user",
      });
      if (res.data.result.modifiedCount) {
        Swal.fire("Removed!", "Admin role removed from user.", "success");
        refetch();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSearch = () => {
    if (searchEmail.trim() !== "") {
      setTriggerSearch(searchEmail.trim());
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Make Admin</h2>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Search user by email"
          className="input input-bordered w-full max-w-xs"
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
        />
        <button className="btn btn-primary text-black" onClick={handleSearch}>
          Search
        </button>
      </div>

      {isLoading || isFetching ? (
        <p>Loading...</p>
      ) : users.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Email</th>
                <th>Created At</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.email}</td>
                  <td>{new Date(user.created_at).toLocaleString()}</td>
                  <td>{user.role}</td>
                  <td>
                    {user.role !== "admin" ? (
                      <button
                        className="btn btn-sm btn-success flex items-center gap-1"
                        onClick={() => makeAdmin(user._id)}
                      >
                        <FaUserShield /> Make Admin
                      </button>
                    ) : (
                      <button
                        className="btn btn-sm btn-error flex items-center gap-1"
                        onClick={() => removeAdmin(user._id)}
                      >
                        <FaUserSlash /> Remove Admin
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : triggerSearch ? (
        <p className="text-gray-500">No users found for "{triggerSearch}"</p>
      ) : null}
    </div>
  );
};

export default MakeAdmin;
