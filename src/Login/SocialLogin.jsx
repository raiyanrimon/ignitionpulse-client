import { FaGoogle } from "react-icons/fa";

import useAuth from "../hook/useAuth";
import useAxiosOpen from "../hook/useAxiosOpen";
import { useNavigate } from "react-router-dom";

const SocialLogin = () => {
  const { googleSignIn } = useAuth();
  const axiosOpen = useAxiosOpen();
  const navigate = useNavigate();
  const handleGoogleSignIn = () => {
    googleSignIn().then((result) => {
      console.log(result.user);
      const userInfo = {
        email: result.user?.email,
        name: result.user?.displayName,
      };
      axiosOpen.post("/users", userInfo).then((res) => {
        console.log(res.data);
        navigate("/");
      });
    });
  };
  return (
    <div>
      <div>
        <button onClick={handleGoogleSignIn} className="btn w-full">
          <FaGoogle className="text-red-600"></FaGoogle>
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
