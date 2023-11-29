import { useQuery } from "@tanstack/react-query";
import useAxiosOpen from "../hook/useAxiosOpen";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

const Reviews = ({ _id }) => {
  const axiosOpen = useAxiosOpen();
  const { data: reviews = [] } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await axiosOpen.get("/reviews");
      const review = res.data.filter((re) => re.reviewId === _id);

      return review;
    },
  });

  return (
    <div>
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        {reviews.map((review) => (
          <SwiperSlide key={review._id}>
            <div className="m-16 flex flex-col space-y-2 items-center">
              <Rating
                style={{ maxWidth: 180 }}
                value={review?.rating}
                readOnly
              />
              <div className="avatar">
                <div className="w-24 rounded-full">
                  <img src={review?.user_img} />
                </div>
              </div>
              <p>{review?.comment}</p>
              <h3 className="text-2xl text-orange-400">{review.name}</h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Reviews;
