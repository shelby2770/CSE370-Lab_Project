import { useContext, useState } from "react";
import { AuthContext } from "../AuthProvider";
import swal from "sweetalert";
import { FaStar } from "react-icons/fa";

import {
  AdminContext,
  ImageContext,
  NameContext,
  ReviewContext,
} from "../origin";
// import { get_image, get_name } from "./NavBar";

const Thoughts = () => {
  const [isAdmin, setAdmin] = useContext(AdminContext);
  const [get_name, set_get_name] = useContext(NameContext);
  const [get_image, set_get_image] = useContext(ImageContext);
  const [hasReview, setReview] = useContext(ReviewContext);
  const { user } = useContext(AuthContext);

  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const stars = Array(5).fill(0);

  const handleClick = (value) => {
    setCurrentValue(value);
  };

  const handleMouseOver = (newHoverValue) => {
    setHoverValue(newHoverValue);
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };

  const handleReview = async (e) => {
    e.preventDefault();
    const form = e.target;
    if (isAdmin) {
      swal("Attention!", "Admins can't send review", "error");
    } else if (user) {
      const name = get_name;
      const image = get_image;
      const review = form.review.value;
      const star_rating = currentValue;
      const obj = { name, image, review, star_rating };
      if (review == "") {
        swal("", "Please write something...", "error");
      } else if (currentValue == 0) {
        swal("", "Please give your rating", "error");
      } else {
        const res1 = await fetch("http://localhost:3000/reviews", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(obj),
        });

        const res2 = await fetch("http://localhost:3000/reviews");
        const updatedReviews = await res2.json();
        setReview(updatedReviews);
        // .then((data) => //console.log(data));
        swal("Done", "We have received your review!", "success");
        form.reset();
        handleClick(0);
      }
    } else {
      swal("Attention!", "First login your account please", "error");
    }
    form.reset();
  };

  const colors = {
    orange: "#FFBA5A",
    grey: "#a9a9a9",
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex flex-row">
        {stars.map((_, index) => {
          return (
            <FaStar
              key={index}
              size={24}
              onClick={() => handleClick(index + 1)}
              onMouseOver={() => handleMouseOver(index + 1)}
              onMouseLeave={handleMouseLeave}
              color={
                (hoverValue || currentValue) > index
                  ? colors.orange
                  : colors.grey
              }
              style={{
                marginRight: 10,
                cursor: "pointer",
              }}
            />
          );
        })}
      </div>
      <div className="flex flex-col items-center">
        <form
          onSubmit={handleReview}
          className="flex flex-col items-center justify-center"
        >
          <div>
            <textarea
              name="review"
              id=""
              cols=""
              rows="10"
              maxLength={250}
              className="w-[90vw]
          border p-2 mx-8 rounded-md"
            ></textarea>
          </div>
          <div className="mb-4">
            <button className="btn btn-active btn-outline btn-primary">
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Thoughts;
