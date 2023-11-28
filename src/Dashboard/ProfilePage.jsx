import { useState } from "react";
import PageTitle from "../Helmet/PageTitle";
import useAuth from "../hook/useAuth";
import { MdVerified } from "react-icons/md";

const ProfilePage = () => {
  const { user } = useAuth();
  const [isSubscribed, setIsSubscribed] = useState(false);
  return (
    <div className="text-justify space-y-3">
      <PageTitle title="Profile | IgnitionPulse" />
      <h2 className="text-xl  font-semibold ">Welcome {user?.displayName}</h2>

      <img src={user?.photoURL} alt={user?.displayName} />

      <p>User Name: {user?.displayName}</p>

      <p>User Email: {user?.email}</p>

      {isSubscribed ? (
        <>
          <p>
            Subscription Status:{" "}
            <span className=" font-semibold flex">
              Verified <MdVerified className="text-blue-500 text-lg" />
            </span>
          </p>
        </>
      ) : (
        <>
          <button className="btn btn-accent">Subscribe $10/month</button>
        </>
      )}
    </div>
  );
};

export default ProfilePage;
