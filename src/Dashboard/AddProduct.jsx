import { useForm } from "react-hook-form";
import PageTitle from "../Helmet/PageTitle";
import useAxiosOpen from "../hook/useAxiosOpen";
import useAxiosSecure from "../hook/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "../hook/useAuth";
import { WithContext as ReactTags } from "react-tag-input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddProduct = () => {
  const { register, handleSubmit, reset } = useForm();
  const { user } = useAuth();
  const axiosOpen = useAxiosOpen();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [tags, setTags] = useState([]);
  const handleTagDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleTagAddition = (tag) => {
    setTags([...tags, tag]);
  };

  const onSubmit = async (data) => {
    console.log(data);
    // image upload to imgbb and then get an url
    const imageFile = { image: data.image[0] };
    const res = await axiosOpen.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    if (res.data.success) {
      // now send the menu item data to the server with the image url
      const productItem = {
        name: data.name,
        image: res.data.data.display_url,
        description: data.description,
        user_name: data.user,
        user_img: data.user_img,
        email: data.email,
        link: data.link,
        tags: tags.map((tag) => tag.text),
        status: "pending",
        time: new Date().toISOString(),
      };
      //
      const productRes = await axiosSecure.post("/products", productItem);
      console.log(productRes.data);
      if (productRes.data.insertedId) {
        // show success popup
        reset();
        setTags([]);
        Swal.fire({
          position: "center",
          icon: "success",
          title: `${data.name} is added to Product List.`,
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/dashboard/myProduct");
      }
    }
    console.log("with image url", res.data);
  };
  return (
    <div>
      <PageTitle title="Add Items | IgnitionPulse" />
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text">Product Name*</span>
            </label>
            <input
              type="text"
              placeholder="Product Name"
              {...register("name", { required: true })}
              required
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control w-full my-6">
            <input
              {...register("image", { required: true })}
              type="file"
              className="file-input w-full max-w-xs"
            />
          </div>

          {/* product description */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Product Description</span>
            </label>
            <textarea
              {...register("description")}
              className="textarea textarea-bordered h-24"
              placeholder="Product Description"
            ></textarea>
          </div>
          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text">Product Owner Name</span>
            </label>
            <input
              type="text"
              readOnly
              defaultValue={user?.displayName}
              {...register("user", { required: true })}
              required
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text">Product Owner Image</span>
            </label>
            <input
              type="text"
              readOnly
              defaultValue={user?.photoURL}
              {...register("user_img", { required: true })}
              required
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text">Product Owner Email</span>
            </label>
            <input
              type="text"
              readOnly
              defaultValue={user?.email}
              {...register("email", { required: true })}
              required
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text">External Links</span>
            </label>
            <input
              type="text"
              placeholder="External Links"
              {...register("link", { required: true })}
              required
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text">Tags</span>
            </label>
            <ReactTags
              tags={tags}
              handleDelete={handleTagDelete}
              handleAddition={handleTagAddition}
            />
          </div>

          <input
            className="btn text-center btn-info"
            type="submit"
            value="Add Product"
          />
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
