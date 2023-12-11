import { FaLocationDot } from "react-icons/fa6";
import { MdDelete, MdOutlineDateRange } from "react-icons/md";
import { BsFillCartCheckFill } from "react-icons/bs";
import swal from "sweetalert";
import { useContext, useState } from "react";
import { EventContext } from "../pages/Home";
import { ItemContext } from "../origin";
import { AdminContext } from "../origin";
import { FaEdit } from "react-icons/fa";
import { TiTick } from "react-icons/ti";
import toast, { Toaster } from "react-hot-toast";

const Event = ({ item }) => {
  const [obj, set_obj] = useContext(EventContext);
  const [get_item, set_get_item] = useContext(ItemContext);
  const [isAdmin, setAdmin] = useContext(AdminContext);
  const handleBook = async () => {
    const user_cart = get_item["item"];
    // console.log(user_cart["cart"]);
    const isExist = user_cart["cart"].length
      ? get_item["item"]["cart"].some((i) => i._id === item._id)
      : null;
    if (!user_cart) {
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
        let updatedEvent = [...user_cart["cart"], item];
        // console.log(updatedEvent);
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
        const res1 = await updateUser.json();
        // console.log(res1);
        set_get_item({ item: res1 });

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
        // console.log(getUpdateEvents_json);
        const res = await set_obj(getUpdateEvents_json);
        swal("Event has been added to your cart!", {
          icon: "success",
        });
      } else {
        swal("Purchase cancelled!");
      }
    }
  };

  const handleEdit = async () => {
    if (isNaN(formData.price)) {
      toast.error("Please input a valid price");
    } else if (Number.isInteger(formData.capacity)) {
      toast.error("Please input valid seat number");
    } else {
      const updateEvent = await fetch(
        `http://localhost:3000/events_admin/${item._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const getUpdateEvents = await fetch("http://localhost:3000/events");
      const getUpdateEvents_json = await getUpdateEvents.json();
      // console.log(getUpdateEvents_json);
      const res = await set_obj(getUpdateEvents_json);
      toast.success("Event changed successfully!");
    }
  };

  const handleDelete = async () => {
    const willDelete = await swal({
      title: "Are you sure?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    });

    if (willDelete) {
      const deleteEvent = await fetch(
        `http://localhost:3000/events/${item._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const getUpdateEvents = await fetch("http://localhost:3000/events");
      const getUpdateEvents_json = await getUpdateEvents.json();
      // console.log(getUpdateEvents_json);
      const res = await set_obj(getUpdateEvents_json);
      swal("Event deleted successfully", {
        icon: "success",
      });
    }
    else{
        swal("Delete cancelled!");
    }
  };

  const [formData, setFormData] = useState(item);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  return (
    <div>
      <Toaster position="bottom-right" reverseOrder={false} />
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
        {isAdmin ? (
          <>
            <div className="flex flex-row justify-between">
              <button
                className="btn btn-active btn-secondary text-xs mb-2 mx-2"
                onClick={() =>
                  document.getElementById(`my_modal_${item._id}`).showModal()
                }
              >
                <FaEdit />
                Edit
              </button>
              <dialog id={`my_modal_${item._id}`} className="modal">
                <div className="modal-box">
                  <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                      ✕
                    </button>
                  </form>
                  <div className="hero min-h-screen bg-base-200">
                    <div className="hero-content flex-col">
                      <div className="text-center lg:text-left">
                        <h1 className="text-3xl font-bold">
                          Edit <span className="text-secondary_clr">Event</span>
                        </h1>
                      </div>
                      <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <div className="card-body">
                          <div className="">
                            <label className="label">
                              <span className="text-lg font-semibold">
                                Name
                              </span>
                            </label>
                            <input
                              type="text"
                              name="title"
                              value={formData.title}
                              onChange={handleInputChange}
                              className="input input-bordered"
                              required
                            />
                          </div>
                          <div className="">
                            <label className="label">
                              <span className="text-lg font-semibold">
                                Location
                              </span>
                            </label>
                            <input
                              type="text"
                              name="location"
                              value={formData.location}
                              onChange={handleInputChange}
                              className="input input-bordered"
                              required
                            />
                          </div>
                          <div className="">
                            <label className="label">
                              <span className="text-lg font-semibold">
                                Total Seats
                              </span>
                            </label>
                            <input
                              type="text"
                              name="capacity"
                              value={formData.capacity}
                              onChange={handleInputChange}
                              checked={true}
                              className="input input-bordered"
                              required
                            />
                          </div>
                          <div className="">
                            <label className="label">
                              <span className="text-lg font-semibold">
                                Price
                              </span>
                            </label>
                            <input
                              type="text"
                              name="price"
                              value={formData.price}
                              onChange={handleInputChange}
                              className="input input-bordered"
                              required
                            />
                          </div>
                          <div className="">
                            <label className="label">
                              <span className="text-lg font-semibold">
                                Description
                              </span>
                            </label>
                            {/* <input */}
                            <textarea
                              type="text"
                              name="description"
                              value={formData.description}
                              onChange={handleInputChange}
                              cols="10"
                              rows="10"
                              className="input input-bordered h-28 w-full"
                              required
                              // />
                            ></textarea>
                          </div>
                          <div className="">
                            <label className="label">
                              <span className="text-lg font-semibold">
                                Date
                              </span>
                            </label>
                            <input
                              type="text"
                              name="date"
                              value={formData.date}
                              onChange={handleInputChange}
                              className="input input-bordered"
                              required
                            />
                          </div>

                          <div className="">
                            <label className="label">
                              <span className="text-lg font-semibold">
                                Image
                              </span>
                            </label>
                            <input
                              type="text"
                              name="picture"
                              value={formData.picture}
                              onChange={handleInputChange}
                              className="input input-bordered"
                              required
                            />
                          </div>

                          <div className=" mt-6">
                            <button
                              className="btn btn-active bg-primary_clr text-3xl w-full"
                              onClick={handleEdit}
                            >
                              <TiTick />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </dialog>
              <button
                className="btn btn-active btn-accent text-xs mb-2 mx-2"
                onClick={handleDelete}
              >
                <MdDelete />
                Delete
              </button>
            </div>
          </>
        ) : (
          <button
            className="btn btn-active btn-primary text-xs mb-2 mx-2"
            onClick={handleBook}
          >
            <BsFillCartCheckFill />
            Book Now
          </button>
        )}
      </div>
    </div>
  );
};
export default Event;
