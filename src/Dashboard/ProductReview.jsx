import { useQuery } from "@tanstack/react-query";
import PageTitle from "../Helmet/PageTitle";
import useAxiosOpen from "../hook/useAxiosOpen";
import { Link } from "react-router-dom";
import { FaArrowDown, FaArrowUp, FaFileSignature } from "react-icons/fa";
import useAxiosSecure from "../hook/useAxiosSecure";
import Swal from "sweetalert2";

const ProductReview = () => {
  const axiosOpen = useAxiosOpen();
  const axiosSecure = useAxiosSecure();
  const { data: products = [], refetch } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axiosOpen.get("/products");
      console.log(res.data);
      return res.data;
    },
  });
  const sortedProducts = [...products].sort((a, b) => {
    if (a.status === "pending" && b.status !== "pending") return -1;
    if (b.status === "pending" && a.status !== "pending") return 1;
    return 0;
  });
  const handleAccept = (product) => {
    axiosSecure.patch(`/products/accept/${product._id}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: `Product  is accepted`,
          showConfirmButton: false,
          timer: 1500,
        });
        refetch();
      }
    });
  };
  const handleReject = (product) => {
    axiosSecure.patch(`/products/reject/${product._id}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: `Product  is Rejected`,
          showConfirmButton: false,
          timer: 1500,
        });
        refetch();
      }
    });
  };
  const handleFeature = (product) => {
    axiosSecure.patch(`/products/feature/${product._id}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: `Product  is added to Featured`,
          showConfirmButton: false,
          timer: 1500,
        });
        refetch();
      }
    });
  };
  return (
    <div>
      <PageTitle title="Product Review | IgnitionPulse" />
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>View Details</th>
              <th>status</th>
              <th>Make Featured</th>
              <th>Accept</th>
              <th>Reject</th>
            </tr>
          </thead>
          <tbody>
            {sortedProducts.map((product, index) => (
              <tr key={product._id}>
                <th>{index + 1}</th>
                <td>{product?.name}</td>
                <td>
                  <Link to={`/products/${product._id}`}>Details</Link>
                </td>
                <td>{product.status}</td>
                <td>
                  {product.isFeatured === "featured" ? (
                    "Featured"
                  ) : (
                    <FaFileSignature
                      onClick={() => handleFeature(product)}
                      className="text-xl"
                    ></FaFileSignature>
                  )}
                </td>
                <td>
                  {product.status === "accepted" ? (
                    "Accepted"
                  ) : (
                    <button onClick={() => handleAccept(product)}>
                      <FaArrowUp></FaArrowUp>
                    </button>
                  )}
                </td>
                <td>
                  {product.status === "rejected" ? (
                    "Rejected"
                  ) : (
                    <button onClick={() => handleReject(product)}>
                      <FaArrowDown></FaArrowDown>
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductReview;
