import { useQuery } from "@tanstack/react-query";
import useAxiosOpen from "../hook/useAxiosOpen";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

import "@smastrom/react-rating/style.css";

const Coupon = () => {
  const axiosOpen = useAxiosOpen();
  const { data: coupons = [] } = useQuery({
    queryKey: ["coupons"],
    queryFn: async () => {
      const res = await axiosOpen.get("/coupons");

      return res.data;
    },
  });

  return (
    <div>
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        {coupons.map((coupon) => (
          <SwiperSlide key={coupon._id}>
            <div className="m-16 flex flex-col space-y-2 items-center">
              <div className="card  bg-base-100 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title font-bold text-3xl justify-center text-green-500">
                    {coupon.coupon}
                  </h2>
                  <p className="text-lg font-semibold">{coupon.comment}</p>
                  <div className="card-actions ">
                    <p className="text-lg font-semibold">
                      Discount Amount: {coupon.amount}$
                    </p>
                    <p className="text-lg font-semibold">
                      Expiry Date: {coupon.expiry}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Coupon;
