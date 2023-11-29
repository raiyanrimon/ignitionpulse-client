import Swal from "sweetalert2";
import useAuth from "../hook/useAuth";
import useAxiosOpen from "../hook/useAxiosOpen";

const ReviewForm = ({ _id }) => {
  const { user } = useAuth();
  const axiosOpen = useAxiosOpen();
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const username = form.username.value;
    const user_img = form.user_img.value;
    const rating = parseInt(form.rating.value);
    const comment = form.comment.value;
    const review = {
      username,
      user_img,
      rating,
      comment,
      reviewId: _id,
    };
    console.log(review);
    axiosOpen.post("/reviews", review).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: `Reviews added Successfully.`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  return (
    <div>
      <div>
        <div className="hero-content flex-col">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Share Your Experience</h1>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm  ">
            <form className="card-body" onSubmit={handleSubmit}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Reviewer Name</span>
                </label>
                <input
                  type="text"
                  name="username"
                  defaultValue={user?.displayName}
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Reviewer Image</span>
                </label>
                <input
                  type="text"
                  name="user_img"
                  defaultValue={user?.photoURL}
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Rating</span>
                </label>
                <input
                  type="number"
                  name="rating"
                  min="0"
                  max="5"
                  step="1"
                  placeholder="your experience out of 5"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Comment</span>
                </label>
                <input
                  type="text"
                  name="comment"
                  placeholder="Your comment"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-accent">Submit Review</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewForm;
