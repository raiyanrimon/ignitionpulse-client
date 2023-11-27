import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import login from "../assets/login.png";

import PageTitle from "../Helmet/PageTitle";
import useAuth from "../hook/useAuth";
import SocialLogin from "./SocialLogin";
const Login = () => {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
    signIn(email, password).then((result) => {
      const user = result.user;
      console.log(user);
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
    <div className="hero min-h-screen bg-base-200">
      <img src={login} alt="" />
      <PageTitle title="Login | IgnitionPulse"></PageTitle>
      <div className="hero-content flex-col ">
        <div className="text-center ">
          <h1 className="text-5xl font-bold">Login now!</h1>
        </div>
        <div className="card flex-shrink-0  max-w-sm ">
          <form onSubmit={handleLogin} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>

            <div className="form-control mt-5">
              <input className="btn btn-outline" type="submit" value="Login" />
            </div>
          </form>
          <div className="text-center -mt-5">
            <div>
              <SocialLogin></SocialLogin>
            </div>
            <p className="my-2 font-semibold">
              New Here?{" "}
              <span className="text-lg text-primary font-bold">
                <Link to="/register">Register Now</Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
