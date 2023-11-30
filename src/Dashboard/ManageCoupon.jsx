import Swal from "sweetalert2";
import useAxiosSecure from "../hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import PageTitle from "../Helmet/PageTitle";
import { FaTrash } from "react-icons/fa";

const ManageCoupon = () => {
  const axiosSecure = useAxiosSecure();
  const { data: coupons = [], refetch } = useQuery({
    queryKey: ["coupons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/coupons");
      return res.data;
    },
  });
  const handleSubmit = (e) => {
    const form = e.target;
    const coupon = form.coupon.value;
    const expiry = form.expiry.value;
    const comment = form.comment.value;
    const amount = form.amount.value;
    const couponCode = {
      coupon,
      expiry,
      amount: parseInt(amount),
      comment,
    };
    console.log(couponCode);

    axiosSecure.post("/coupons", couponCode).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: `Coupon is Added`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
      refetch();
    });
  };

  const handleDelete = (coupon) => {
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
        axiosSecure.delete(`/coupons/${coupon._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Coupon has been deleted.",
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
      <PageTitle title="Coupons | IgnitionPulse" />
      <div className="hero-content flex-col">
        <div className="card flex-shrink-0 w-full max-w-sm  ">
          <form className="card-body" onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Coupon Code</span>
              </label>
              <input
                type="text"
                name="coupon"
                placeholder="coupon"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Expiry Date</span>
              </label>
              <input
                type="date"
                name="expiry"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Coupon code description</span>
              </label>
              <input
                type="text"
                name="comment"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Discount Amount</span>
              </label>
              <input
                type="text"
                name="amount"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-accent">Add Coupon</button>
            </div>
          </form>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Coupon Code</th>
              <th>Expiry Date</th>
              <th>Description</th>
              <th>Discount Amount</th>

              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((coupon, index) => (
              <tr key={coupon._id}>
                <th>{index + 1}</th>
                <td>{coupon.coupon}</td>
                <td>{coupon.expiry}</td>
                <td>{coupon.comment}</td>
                <td>{coupon.amount}</td>

                <td>
                  <FaTrash
                    onClick={() => handleDelete(coupon)}
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

export default ManageCoupon;
