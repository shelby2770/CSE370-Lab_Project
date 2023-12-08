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
    <div className="mb-10 mx-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {reviews.map((item) => (
          <ReviewGrid key={item.id} item={item}></ReviewGrid>
        ))}
      </div>
    </div>
  );
};

export default ReviewSection;
