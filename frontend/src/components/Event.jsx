import { Link } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineDateRange } from "react-icons/md";
import { BsFillCartCheckFill } from "react-icons/bs";
import swal from "sweetalert";

const Event = ({ item }) => {
  // console.log(item)
  const handleBook = () => {
    swal({
      title: "Are you sure?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willPurchase) => {
      if (willPurchase) {
        swal("Event has been added to your cart!", {
          icon: "success",
        });
        
      } else {
        swal("Purchase cancelled!");
      }
    });
  };

  return (
    <div>
      {/* <Link to={`/${item.name}`}> */}
      <div className="card w-90 bg-base-100 shadow-xl border-[1px]">
        <figure>
          <img className="w-full h-[200px]" src={item.picture} alt="event" />
        </figure>
        <div className="p-4">
          <h2 className="card-title mb-2">{item.name}</h2>
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
        <button
          className="btn btn-active btn-primary text-xs mb-2 mx-2"
          onClick={handleBook}
        >
          <BsFillCartCheckFill />
          Book Now
        </button>
      </div>
      {/* </Link> */}
    </div>
  );
};

export default Event;
