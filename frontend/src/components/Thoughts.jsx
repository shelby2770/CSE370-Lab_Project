import { useContext } from "react";
import { AuthContext } from "../AuthProvider";
import swal from "sweetalert";
import { get_image, get_name } from "./NavBar";

const Thoughts = () => {
  const { user } = useContext(AuthContext);
  const handleReview = async (e) => {
    e.preventDefault();
    const form = e.target;
    if (user) {
      const name = get_name;
      const image = get_image;
      const review = form.review.value;
      const obj = { name, image, review };
      //console.log(obj);
      fetch("http://localhost:3000/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      }).then((res) => res.json);
      // .then((data) => //console.log(data));
      swal("Done", "We have received your review!", "success");
      form.reset();
    } else {
      swal("Attention!", "First login your account please", "error");
    }
    form.reset();
  };

  return (
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
            className="w-[60vw]
          border p-2 mx-8 rounded-md"
          ></textarea>
        </div>
        <div className="mb-4">
          <button className="btn btn-active bg-primary_clr">Send</button>
        </div>
      </form>
    </div>
  );
};

export default Thoughts;
