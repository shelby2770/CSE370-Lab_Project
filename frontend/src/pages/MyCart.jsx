import { useLoaderData } from "react-router-dom";
import CartEvent from "../components/CartEvent";
import { get_item, get_name } from "../components/NavBar";
import { useState } from "react";

const MyCart = () => {
  // const [user_item, set_user_item] = useState(null);
  // const hasItem = async () => {
  //   const user_cart = await get_item;
  //   set_user_item(user_cart);
  // };

  // {
  //   () => hasItem;
  // }
  const user_item = get_item;
  console.log(get_name);
  return (
    <div className="m-10 min-h-screen">
      {user_item["cart"] ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {user_item["cart"].map((item) => (
            <CartEvent key={item.id} item={item}></CartEvent>
          ))}
        </div>
      ) : (
        <>
          <div className="flex flex-col justify-center items-center h-screen">
            <h1 className="font-7xl">No data exists</h1>
          </div>
        </>
      )}
    </div>
  );
};

export default MyCart;
