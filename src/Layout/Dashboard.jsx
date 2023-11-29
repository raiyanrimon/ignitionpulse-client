import {
  FaAd,
  FaGrinStars,
  FaHome,
  FaNewspaper,
  FaProductHunt,
  FaSatelliteDish,
  FaUser,
  FaUsers,
} from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
      <div className="flex">
        <div className="w-64 min-h-full bg-green-300">
          <ul className="menu p-4">
            <>
              <li>
                <NavLink to="/dashboard/stats">
                  <FaSatelliteDish></FaSatelliteDish> Statistics
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manageUsers">
                  <FaUsers></FaUsers> Manage Users
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/coupons">
                  <FaGrinStars></FaGrinStars> Manage Coupon
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/productReview">
                  <FaProductHunt></FaProductHunt> Product Review
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/reportedProduct">
                  <FaNewspaper></FaNewspaper> Reported Products
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/profile">
                  <FaUser></FaUser> My Profile
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/addProduct">
                  <FaAd></FaAd>Add Product
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/myProduct">
                  <FaProductHunt></FaProductHunt>My Products
                </NavLink>
              </li>
            </>
            <div className="divider"></div>
            <li>
              <NavLink to="/">
                <FaHome></FaHome> Home
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="flex-1 p-8">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
