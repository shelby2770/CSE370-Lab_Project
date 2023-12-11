import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import ReviewGrid from "./ReviewGrid";
import { useContext, useEffect } from "react";
import { ReviewContext } from "../origin";

const ReviewSection = () => {
  const [hasReview, setReview] = useContext(ReviewContext);

  return (
    <Swiper
      spaceBetween={20}
      slidesPerView={3}
      onSlideChange={() => console.log("slide change")}
      // onSwiper={(swiper) => console.log(swiper)}
    >
      {hasReview.map((item) => (
        <SwiperSlide key={item.id}>
          <ReviewGrid key={item.id} item={item}></ReviewGrid>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ReviewSection;
