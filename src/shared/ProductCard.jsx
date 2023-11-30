import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hook/useAuth";
import useAxiosSecure from "../hook/useAxiosSecure";
import Swal from "sweetalert2";

const ProductCard = ({ product }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const productOwner = user?.email === product?.email;
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

  return (
    <div>
      <div className="card h-96 bg-base-100 shadow-xl">
        <figure>
          <img src={product.image} alt="Shoes" />
        </figure>
        <div className="card-body">
          <Link to={`/products/${product._id}`}>
            <h2 className="card-title">{product.name}</h2>
          </Link>

          <div className="card-actions my-2 ">
            {product.tags.map((tag, index) => (
              <div key={index} className="badge badge-secondary">
                {tag}
              </div>
            ))}
          </div>
          <button
            disabled={productOwner}
            onClick={() => handleUpvote(product._id)}
            className="btn btn-accent"
          >
            Upvote
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
