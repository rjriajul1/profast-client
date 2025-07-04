// src/hooks/useUserRole.js
import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios"; // your axiosSecure hook
import useAuth from "./useAuth";

const useUserRole = () => {
  const axiosSecure = useAxios();
  const {user} = useAuth()
  const email = user?.email;

  const {
    data: userData,
    isLoading,
    isError,
    error,
    refetch
  } = useQuery({
    queryKey: ["userRole", email],
    queryFn: async () => {
      if (!email) return null;
      const res = await axiosSecure.get(`/users/email?email=${email}`);
      return res.data;
    },
    enabled: !!email, // only run if email is provided
  });

  const role = userData?.role;
 
  return { role, user: userData, isLoading, isError, error,refetch };
};

export default useUserRole;
