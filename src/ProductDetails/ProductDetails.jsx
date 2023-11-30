import { useLoaderData, useNavigate } from "react-router-dom";
import Reviews from "./Reviews";
import ReviewForm from "./ReviewForm";
import useAxiosSecure from "../hook/useAxiosSecure";
import useAuth from "../hook/useAuth";
import Swal from "sweetalert2";

const ProductDetails = () => {
  const { name, image, email, description, tags, link, vote, _id } =
    useLoaderData();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();
  const productOwner = user?.email === email;
  const handleUpvote = (id) => {
    if (!user) {
      return navigate("/login");
    }
    if (user) {
      axiosSecure.patch(`/products/upvote/${id}`).then((res) => {
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: `Product Upvoted SuccessFully`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
    }
  };

  const handleReport = (id) => {
    axiosSecure.patch(`/products/report/${id}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: `Product  is Reported`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  return (
    <div className="text-justify space-y-2">
      <div className="text-center font-bold text-2xl">
        <h2>{name}</h2>
      </div>
      <div className="flex justify-center">
        <img src={image} alt="" />
      </div>
      <div className="flex justify-between">
        <button
          disabled={productOwner}
          onClick={() => handleUpvote(_id)}
          className="btn btn-outline"
        >
          Upvote
        </button>
        <button onClick={() => handleReport(_id)} className="btn btn-outline">
          Report
        </button>
      </div>
      <div className="text-lg font-semibold space-y-2">
        <p>UpVote Count:{vote}</p>
        <p>{description}</p>
      </div>
      <div className="font-semibold">
        <a href={link}>Link</a>
      </div>
      <div>
        Tags:{" "}
        {tags.map((tag, index) => (
          <span key={index}>#{tag} </span>
        ))}
      </div>
      <Reviews _id={_id}></Reviews>
      <ReviewForm _id={_id}></ReviewForm>
    </div>
  );
};

export default ProductDetails;
