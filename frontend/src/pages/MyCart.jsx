import { useLoaderData } from "react-router-dom";
import CartEvent from "../components/CartEvent";

const MyCart = () => {
  const obj= useLoaderData()
  // console.log(obj)
  return (
    <div className="m-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {obj.map((item) => (
          <CartEvent key={item.id} item={item}></CartEvent>
        ))}
      </div>
    </div>
  );
};

export default MyCart;
