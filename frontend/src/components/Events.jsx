import { useContext, useState } from "react";
import Event from "./Event";
import { EventContext } from "../pages/Home";
const Events = () => {
  const [obj, set_obj] = useContext(EventContext);
  const [inputValue, setInputValue] = useState("");
  const [data, setData] = useState([]);
  const handleChange = async (event) => {
    setInputValue(event.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(inputValue);
    const getUpdateEvents = await fetch("http://localhost:3000/events");
    const getUpdateEvents_json = await getUpdateEvents.json();
    // console.log(getUpdateEvents_json);
    const res = await set_obj(getUpdateEvents_json);

    const newObj = getUpdateEvents_json.filter((item) =>
      item.title.toLowerCase().includes(inputValue.toLocaleLowerCase())
    );
    set_obj(newObj);
  };
  return (
    <div className="mb-10 flex flex-col gap-4 items-center">
      <div className="">
        <form onSubmit={handleSubmit} className="flex flex-center join">
          <input
            className=" input input-bordered rounded-md join-item"
            type="text"
            value={inputValue}
            onChange={handleChange}
            placeholder="Enter title"
          />
          <button
            className="btn join-item rounded-r-md  bg-secondary_clr text-neutral-100"
            type="submit"
          >
            Search
          </button>
        </form>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {obj.map((item) => (
          <Event key={item._id} item={item}></Event>
        ))}
      </div>
    </div>
  );
};

export default Events;
