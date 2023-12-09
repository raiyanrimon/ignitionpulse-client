import { Link } from "react-router-dom";
import PageTitle from "../Helmet/PageTitle";
import useAuth from "../hook/useAuth";

const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <div className="text-justify space-y-3">
      <PageTitle title="Profile | IgnitionPulse" />

      <div className="avatar">
        <div className="w-24 rounded-full">
          <img src={user?.photoURL} />
        </div>
      </div>

      <p>User Name: {user?.displayName}</p>

      <p>User Email: {user?.email}</p>

      {/* <>
        <p>
          Subscription Status:{" "}
          <span className=" font-semibold flex">
            Verified <MdVerified className="text-blue-500 text-lg" />
          </span>
        </p>
      </> */}

      <>
        <Link to="/dashboard/payment">
          <button className="btn btn-accent">Subscribe $10/month</button>
        </Link>
      </>
    </div>
  );
};

export default ProfilePage;
