import { Navigate, useLocation } from "react-router-dom";

import useAuth from "../hook/useAuth";
import useMod from "../hook/useMod";

const ModRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [isMod, isModLoading] = useMod();
  const location = useLocation();
  if (loading || isModLoading) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }
  if (user && isMod) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default ModRoute;
