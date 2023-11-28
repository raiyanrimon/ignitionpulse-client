import useAuth from "../hook/useAuth";

const ProfilePage = () => {
  const { user } = useAuth();
  return (
    <div className="text-justify space-y-3">
      <h2 className="text-xl  font-semibold ">Welcome {user?.displayName}</h2>

      <img src={user?.photoURL} alt={user?.displayName} />

      <p>User Name: {user?.displayName}</p>

      <p>User Email: {user?.email}</p>
    </div>
  );
};

export default ProfilePage;
