import { useContext } from "react";
import { AdminContext, ItemContext } from "../origin";
import PurchaseItems from "../components/PurchaseItems";

const PurchaseEvents = () => {
  const [isAdmin, setAdmin] = useContext(AdminContext);
  const [get_item, set_get_item] = useContext(ItemContext);
  const user_event = get_item ? get_item["item"]["purchase_info"] : null;
  const unique_items= []
  for (let i=0; i<user_event.length; i+=2){
    unique_items.push(user_event[i])
  }
//   console.log(unique_items)
  return (
    <div className="m-10 min-h-screen">
      {!isAdmin ? (
        user_event.length ? (
          <>
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {unique_items.map((item,idx) => (
                  // <EventContext2.Provider key={item.id} value={[event, setEvent]}>
                  <PurchaseItems key={idx} item={item}></PurchaseItems>
                  // </EventContext2.Provider>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col justify-center items-center h-screen">
            <h1 className="text-7xl font-semibold">
              No Purchase History Found
            </h1>
          </div>
        )
      ) : (
        <div className="flex flex-col justify-center items-center h-screen">
          <h1 className="text-7xl font-semibold">Admins can't purchase</h1>
        </div>
      )}
    </div>
  );
};

export default PurchaseEvents;
