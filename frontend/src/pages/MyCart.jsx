import { useLoaderData } from "react-router-dom";
import CartEvent from "../components/CartEvent";
import { useContext, useState } from "react";
import { ItemContext } from "../origin";

const MyCart = () => {
  const [get_item, set_get_item] = useContext(ItemContext);
  const user_item = get_item ? get_item["item"]["cart"] : null;
  console.log(user_item);
  return (
    <div className="m-10 min-h-screen">
      {user_item ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {user_item.map((item) => (
            <CartEvent key={item.id} item={item}></CartEvent>
          ))}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center h-screen">
          <h1 className="text-7xl font-semibold">No data exists</h1>
        </div>
      )}
    </div>
  );
};

export default MyCart;
