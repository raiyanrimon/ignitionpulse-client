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
import useAdmin from "../hook/useAdmin";
import useMod from "../hook/useMod";
import useAuth from "../hook/useAuth";

const Dashboard = () => {
  const [isAdmin] = useAdmin();
  const [isMod] = useMod();
  const { user } = useAuth();
  return (
    <div>
      <div className="flex">
        <div className="w-64 min-h-full bg-green-300">
          <ul className="menu p-4">
            <>
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
            {isAdmin && (
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
              </>
            )}
            {isMod && (
              <>
                {" "}
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
              </>
            )}

            <div className="divider"></div>
            <li>
              <NavLink to="/">
                <FaHome></FaHome> Home
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="flex-1 p-8">
          <p className="text-2xl font-semibold">
            Welcome Mr.{" "}
            <span className="font-bold text-green-400s">
              {user?.displayName}
            </span>
          </p>
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
