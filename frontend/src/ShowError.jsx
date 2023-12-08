import { Link } from "react-router-dom";
const ShowError = () => {
  return (
    <div className="flex flex-col items-center gap-4">
      <Link to="/">
        <button className="btn btn-active bg-primary_clr">
          Go Back To Home
        </button>
      </Link>
      <img src={"https://i.ibb.co/7Gdk8Qv/error-2.webp"} alt="" />
    </div>
  );
};

export default ShowError;
