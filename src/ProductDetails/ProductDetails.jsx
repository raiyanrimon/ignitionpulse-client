import { useLoaderData } from "react-router-dom";
import Reviews from "./Reviews";
import ReviewForm from "./ReviewForm";

const ProductDetails = () => {
  const { name, image, description, tags, link, vote, _id } = useLoaderData();

  return (
    <div className="text-justify space-y-2">
      <div className="text-center font-bold text-2xl">
        <h2>{name}</h2>
      </div>
      <div className="flex justify-center">
        <img src={image} alt="" />
      </div>
      <div className="flex justify-between">
        <button className="btn btn-outline">Upvote</button>
        <button className="btn btn-outline">Report</button>
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
