import { FaGoogle } from "react-icons/fa";

import useAuth from "../hook/useAuth";
import useAxiosOpen from "../hook/useAxiosOpen";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const SocialLogin = () => {
  const { googleSignIn } = useAuth();
  const axiosOpen = useAxiosOpen();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
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
      Swal.fire({
        title: "User Logged in Successfully",
        showClass: {
          popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `,
        },
        hideClass: {
          popup: `
            animate__animated
            animate__fadeOutDown
            animate__faster
          `,
        },
      });
      navigate(from, { replace: true });
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
