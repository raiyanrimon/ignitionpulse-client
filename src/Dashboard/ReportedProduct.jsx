import { useQuery } from "@tanstack/react-query";
import PageTitle from "../Helmet/PageTitle";
import useAxiosOpen from "../hook/useAxiosOpen";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../hook/useAxiosSecure";

const ReportedProduct = () => {
  const axiosOpen = useAxiosOpen();
  const axiosSecure = useAxiosSecure();
  const { data: products = [], refetch } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axiosOpen.get("/products");
      const reported = res.data.filter((re) => re.isReported === "reported");
      return reported;
    },
  });
  const handleDelete = (product) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/products/${product._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Product has been deleted.",
              icon: "success",
            });
            refetch();
          }
        });
      }
    });
  };

  return (
    <div>
      <PageTitle title="Reported Product | IgnitionPulse" />
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>View Details</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product._id}>
                <th>{index + 1}</th>
                <td>{product?.name}</td>
                <td>
                  <Link to={`/products/${product._id}`}>Details</Link>
                </td>
                <td>
                  {" "}
                  <FaTrash
                    onClick={() => handleDelete(product)}
                    className="text-red-500"
                  ></FaTrash>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportedProduct;
