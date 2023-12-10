import { useLoaderData } from "react-router-dom";
import Banner from "../components/Banner";
import Events from "../components/Events";
import ReviewSection from "../components/ReviewSection";
import Thoughts from "../components/Thoughts";

const Home = () => {
  const obj = useLoaderData();
  return (
    <div>
      <Banner></Banner>
      <h2 className="text-4xl text-center font-semibold my-4">
        Our<span className="text-secondary_clr"> Events</span>
      </h2>
      <div className="px-10">
        <Events obj={obj}></Events>
      </div>
      <h2 className="text-4xl text-center font-semibold my-4">
        Review<span className="text-secondary_clr"> Section</span>
      </h2>
      <div className="px-10">
        <ReviewSection></ReviewSection>
      </div>
      <h2 className="text-4xl text-center font-semibold my-4">
      Share Your<span className="text-secondary_clr"> Thoughts</span>
      </h2>
      <div>
        <Thoughts></Thoughts>
      </div>
    </div>
  );
};

export default Home;
