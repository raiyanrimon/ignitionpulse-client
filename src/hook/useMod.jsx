import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useMod = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: isMod, isPending: isModLoading } = useQuery({
    queryKey: [user?.email, "isMod"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/mod/${user.email}`);
      console.log(res.data);
      return res.data?.mod;
    },
  });
  return [isMod, isModLoading];
};

export default useMod;
