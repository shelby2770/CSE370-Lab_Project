import { useLoaderData } from "react-router-dom";
import Banner from "../components/Banner";
import Events from "../components/Events";
import ReviewSection from "../components/ReviewSection";
import Thoughts from "../components/Thoughts";
import { createContext, useEffect, useState } from "react";

export const EventContext = createContext();
const Home = () => {
  const [obj, set_obj] = useState(useLoaderData());
  useEffect(() => {
    set_obj(obj);
  }, [obj]);

  return (
    <div>
      <Banner></Banner>
      <h2 className="text-4xl text-center font-semibold my-4">
        Our<span className="text-secondary_clr"> Events</span>
      </h2>
      <div className="px-10">
        <EventContext.Provider value={[obj, set_obj]}>
          <Events></Events>
        </EventContext.Provider>
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
