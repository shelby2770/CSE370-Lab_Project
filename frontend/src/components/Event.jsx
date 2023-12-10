import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineDateRange } from "react-icons/md";
import { BsFillCartCheckFill } from "react-icons/bs";
import swal from "sweetalert";
import { get_item } from "./NavBar";
import { useContext } from "react";
import { EventContext } from "../pages/Home";

const Event = ({ item }) => {
  const [obj, set_obj] = useContext(EventContext);
  const handleBook = async () => {
    const user_cart = await get_item;
    const isExist = user_cart
      ? get_item["cart"].some((i) => i._id === item._id)
      : null;
    if (user_cart == null) {
      console.log("hello");
      swal("Attention!", "Please login first to access this page", "error");
      const timeout = (delay) => {
        return new Promise((res) => setTimeout(res, delay));
      };
      await timeout(1000);
      window.location.href = "/login";
    } else if (isExist) {
      swal("Sorry!", "You have already booked this event", "error");
    } else if (item["capacity"] == "Not Available") {
      swal("Sorry!", "No tickets remaining right now", "error");
    } else {
      const willPurchase = await swal({
        title: "Are you sure?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      });

      if (willPurchase) {
        let updatedEvent = await [...user_cart["cart"], item];
        let updatedTicket = (parseInt(item["capacity"]) - 1).toString();
        if (updatedTicket == "0") updatedTicket = "Not Available";
        const updateUser = await fetch(
          `http://localhost:3000/users/${user_cart._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ updatedEvent }),
          }
        );

        const updateEvent = await fetch(
          `http://localhost:3000/events/${item._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ updatedTicket }),
          }
        );

        const getUpdateEvents = await fetch("http://localhost:3000/events");
        const getUpdateEvents_json = await getUpdateEvents.json();
        console.log(getUpdateEvents_json);
        const res = await set_obj(getUpdateEvents_json);
        swal("Event has been added to your cart!", {
          icon: "success",
        });
      } else {
        swal("Purchase cancelled!");
      }
    }
  };

  return (
    <div>
      <div className="card w-90 bg-base-100 shadow-xl border-[1px]">
        <figure>
          <img className="w-full h-[200px]" src={item.picture} alt="event" />
        </figure>
        <div className="p-4">
          <h2 className="card-title mb-2">{item.title}</h2>
          <p className="text-xs md:text-xm text-neutral-600 mb-4 h-20">
            {item.description}
          </p>
          <div className="flex flex-row justify-between mb-4">
            <div className="flex flex-row items-center gap-1">
              <FaLocationDot className="text-sm" /> {item.location}
            </div>
            <div className="flex flex-row items-center gap-1">
              <MdOutlineDateRange /> {item.date}
            </div>
          </div>
          <p>
            <span className="font-semibold">Ticket remaining: </span>
            {item.capacity != "Not Available" ? (
              item.capacity
            ) : (
              <span className="text-secondary_clr">{item.capacity}</span>
            )}
          </p>
          <p>
            <span className="font-semibold">Price: </span>৳{item.price}
          </p>
        </div>
        <button
          className="btn btn-active btn-primary text-xs mb-2 mx-2"
          onClick={handleBook}
        >
          <BsFillCartCheckFill />
          Book Now
        </button>
      </div>
    </div>
  );
};

export default Event;
