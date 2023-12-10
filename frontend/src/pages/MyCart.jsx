import { useLoaderData } from "react-router-dom";
import CartEvent from "../components/CartEvent";
import { get_item } from "../components/NavBar";

const MyCart = () => {
  const obj = get_item["cart"];
  // console.log(get_item);
  return (
    <div className="m-10 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {obj.map((item) => (
          <CartEvent key={item.id} item={item}></CartEvent>
        ))}
      </div>
    </div>
  );
};

export default MyCart;
