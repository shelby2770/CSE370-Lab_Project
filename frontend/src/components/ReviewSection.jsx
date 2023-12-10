import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import { useState } from "react";
import ReviewGrid from "./ReviewGrid";

const ReviewSection = () => {
  const [reviews, setReviews] = useState([]);
  const req = fetch("http://localhost:3000/reviews")
    .then((res) => res.json())
    .then((data) => {
      if (reviews.length != data.length) setReviews(data);
    });
  return (
    <Swiper
      spaceBetween={20}
      slidesPerView={3}
      onSlideChange={() => console.log("slide change")}
      // onSwiper={(swiper) => console.log(swiper)}
    >
      {reviews.map((item) => (
        <SwiperSlide key={item.id}>
          <ReviewGrid key={item.id} item={item}></ReviewGrid>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ReviewSection;
