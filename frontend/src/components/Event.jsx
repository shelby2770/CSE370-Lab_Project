import { Link } from "react-router-dom";

const Event = ({ item }) => {
  return (
    <div>
      <Link to={`/${item.name}`}>
        <div className="card w-90 bg-base-100 shadow-xl border-[1px]">
          <figure>
            <img className="w-full h-[200px]" src={item.image} alt="event" />
          </figure>
          <div className="text-center py-4">
            <h2 className="text-xl font-medium">{item.name}</h2>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Event;
