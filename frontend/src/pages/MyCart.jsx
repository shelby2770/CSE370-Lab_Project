import CartEvent from "../components/CartEvent";
import { useContext, useState } from "react";
import { AdminContext, ItemContext } from "../origin";
import { useLoaderData } from "react-router-dom";
import { MdAddShoppingCart } from "react-icons/md";

const MyCart = () => {
  const [isAdmin, setAdmin] = useContext(AdminContext);
  const data = useLoaderData();
  const [get_item, set_get_item] = useContext(ItemContext);
  const user_item = get_item
    ? get_item["item"]
      ? get_item["item"]["cart"]
      : null
    : null;
  // console.log(user_item);
  const handlePayment = async () => {
    const id = get_item["item"]["_id"];
    const name = get_item["item"]["name"];
    const email = get_item["item"]["email"];
    let total_amount = 0;
    user_item.map((item) => {
      total_amount += parseInt(item.price);
    });
    console.log(total_amount);
    const obj = { id, name, email, total_amount, user_item };
    const res = await fetch("http://localhost:3000/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });
    const res_json = await res.json();
    window.location.replace(res_json.url);
    console.log(res_json);
  };
  return (
    <div className="m-10 min-h-screen">
      {!isAdmin ? (
        user_item && user_item.length ? (
          <>
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {user_item.map((item) => (
                  // <EventContext2.Provider key={item.id} value={[event, setEvent]}>
                  <CartEvent key={item.id} item_pack={[item, data]}></CartEvent>
                  // </EventContext2.Provider>
                ))}
              </div>
              <div className="self-center">
                <button
                  className="btn btn-active btn-outline btn-primary"
                  onClick={handlePayment}
                >
                  <MdAddShoppingCart size={15} />
                  Purchase Now
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col justify-center items-center h-screen">
            <h1 className="text-7xl font-semibold">No data exists</h1>
          </div>
        )
      ) : (
        <div className="flex flex-col justify-center items-center h-screen">
          <h1 className="text-7xl font-semibold">Admins don't have cart</h1>
        </div>
      )}
    </div>
  );
};

export default MyCart;
