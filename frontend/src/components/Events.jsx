import Event from "./Event";
const Events = ({ obj }) => {
  return (
    <div className="mb-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {obj.map((item) => (
          <Event key={item._id} item={item}></Event>
        ))}
      </div>
    </div>
  );
};

export default Events;
