import CartEvent from "../components/CartEvent";
import { useContext, useState } from "react";
import { AdminContext, ItemContext } from "../origin";
import { useLoaderData } from "react-router-dom";

const MyCart = () => {
  const [isAdmin, setAdmin] = useContext(AdminContext);
  const data = useLoaderData();
  const [get_item, set_get_item] = useContext(ItemContext);
  const user_item = get_item ? get_item["item"]["cart"] : null;
  // console.log(user_item);
  return (
    <div className="m-10 min-h-screen">
      {!isAdmin ? (
        user_item.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {user_item.map((item) => (
              // <EventContext2.Provider key={item.id} value={[event, setEvent]}>
              <CartEvent key={item.id} item_pack={[item, data]}></CartEvent>
              // </EventContext2.Provider>
            ))}
          </div>
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
