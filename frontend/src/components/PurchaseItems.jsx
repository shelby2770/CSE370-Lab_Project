import { CiShoppingTag } from "react-icons/ci";

const PurchaseItems = ({ item }) => {
  let sum = 0;
  item[0].map((item2) => {
    sum += parseInt(item2.price);
  });

  return (
    <div className="bg-gray-50 justify-between p-5 rounded-xl gap-14 h-full border-[1px]">
      <div className="col-span-1">
        <CiShoppingTag className="h-full" />
      </div>
      <div>
        <p>
          Total Purchase Amount:{" "}
          <span className="text-secondary_clr"> ৳{sum}</span>
        </p>
        <p>
          Total Purchase Event:{" "}
          <span className="text-secondary_clr">{item[0].length}</span>
        </p>
        <p>
          Transaction Id: <span className="text-secondary_clr">{item[1]}</span>
        </p>
      </div>
    </div>
  );
};

export default PurchaseItems;
