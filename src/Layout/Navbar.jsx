import { Link, NavLink } from "react-router-dom";
import useAuth from "../hook/useAuth";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error));
  };
  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/products">Products</NavLink>
      </li>

      <li>
        <NavLink to="/about">About Us</NavLink>
      </li>
      <li>
        <NavLink to="/contact">Contact Us</NavLink>
      </li>
    </>
  );
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {links}
          </ul>
        </div>
        <p className="font-bold text-green-500" id="logo">
          Ignition<span className="text-red-500">Pulse</span>
        </p>
      </div>
      <div className="navbar-center hidden lg:flex ml-16">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <>
            <button onClick={handleLogOut} className="btn btn-outline">
              LogOut
            </button>
          </>
        ) : (
          <Link to="/login">
            <button className="btn btn-outline">Login / Register</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
