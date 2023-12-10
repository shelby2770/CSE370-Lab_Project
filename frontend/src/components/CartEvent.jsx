import { useContext } from "react";
import { AiFillEye } from "react-icons/ai";
import { FaLocationDot } from "react-icons/fa6";
import { MdDelete, MdOutlineDateRange } from "react-icons/md";
import Swal from "sweetalert2";
import { ItemContext } from "../origin";

const CartEvent = ({ item_pack }) => {
  const [item, event, setEvent] = item_pack;
  console.log(event);
  const [get_item, set_get_item] = useContext(ItemContext);
  const handleDelete = async (id) => {
    console.log(id);
    const isConfirmed = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (isConfirmed) {
      get_item["item"]["cart"] = get_item["item"]["cart"].filter(
        (item) => item._id !== id
      );
      const updateUser = await fetch(
        `http://localhost:3000/users/${get_item["item"]._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ updatedEvent: get_item["item"]["cart"] }),
        }
      );
      const res1 = await updateUser.json();
      // console.log(res1);
      set_get_item({ item: res1 });

      // let newEvents= []
      event.map((item) => {
        if (item._id == id) {
          item.capacity = (parseInt(item["capacity"]) + 1).toString();
        }
      });
      console.log("after: ", event);
      setEvent(event);
      // let updatedTicket = (parseInt(item["capacity"]) + 1).toString();
      // if (updatedTicket == "0") updatedTicket = "Not Available";
    }
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     fetch(`http://localhost:5000/coffee/${_id}`, {
    //       method: "DELETE",
    //     })
    //       .then((res) => res.json())
    //       .then((data) => {
    //         console.log(data);
    //         if (data.deletedCount > 0) {
    //           Swal.fire("Deleted!", "Your Coffee has been deleted.", "success");
    //           const remaining = coffees.filter((cof) => cof._id !== _id);
    //           setCoffees(remaining);
    //         }
    //       });
    //   }
    // });
  };

  return (
    <div className="bg-gray-50 grid grid-cols-6 justify-between p-5 rounded-xl gap-14 h-full shadow-inner">
      <div className="col-span-2">
        <img className="h-full" src={item.picture} alt="" />
      </div>
      <div className="flex items-center col-span-3">
        <div>
          <h2 className="text-2xl font-bold mb-3">{item.title}</h2>
          <div className="flex flex-row items-center gap-1">
            <MdOutlineDateRange /> {item.date}
          </div>
          <div className="flex flex-row items-center gap-1">
            <FaLocationDot className="text-sm" /> {item.location}
          </div>
          <p className="text-base">৳ {item.price}</p>
        </div>
      </div>

      <div className="flex items-center col-span-1">
        <div className="btn-group btn-group-vertical space-y-4">
          <button
            className="btn text-2xl bg-yellow-600 text-white"
            onClick={() => document.getElementById("my_modal_3").showModal()}
          >
            <AiFillEye></AiFillEye>
          </button>
          <dialog id="my_modal_3" className="modal">
            <div className="modal-box">
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              </form>
              <div className="card w-90 bg-base-100 shadow-xl border-[1px]">
                <figure>
                  <img
                    className="w-full h-[200px]"
                    src={item.picture}
                    alt="event"
                  />
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
                    {item.capacity}
                  </p>
                  <p>
                    <span className="font-semibold">Price: </span>৳{item.price}
                  </p>
                </div>
              </div>
            </div>
          </dialog>
          <button
            onClick={() => handleDelete(item._id)}
            className="btn text-2xl bg-red-500 text-white"
          >
            <MdDelete></MdDelete>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartEvent;
