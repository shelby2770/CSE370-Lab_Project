import { Link, useLoaderData, useParams } from "react-router-dom";

const PaymentSuccess = () => {
  const id = useParams();
  const user_data = useLoaderData();
    console.log(id);
  const get_order = async () => {
    const res = await fetch(`http://localhost:3000/orders/${id["tran_id"]}`);
    const res_json = await res.json();
    // console.log(res_json);

    // const ansyncFunc= async () => {
    user_data.map(async (item) => {
      if (item._id == res_json["Order"]["user_id"]) {
        console.log(res_json["Order"]["user_id"]);
        item["cart"] = [];
        item["purchase_info"] =  [
          ...item["purchase_info"],
          [res_json["Order"]["event_list"], res_json["Order"]["transactionId"]],
        ];
        const updatePurchase = await item["purchase_info"];
        console.log(updatePurchase)
        const res = await fetch(`http://localhost:3000/users2/${item._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ updatePurchase }),
        });
        const res_json2 = await res.json();
        console.log(res_json2);
      }
    });
    // }
  };
  get_order();

  const handleHome = async () => {
    window.location.href = "/";
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen gap-4">
      <h1 className="text-7xl font-semibold">Payment Successful!</h1>
      <button className="btn btn-active bg-primary_clr" onClick={handleHome}>
        Go Back To Home
      </button>
    </div>
  );
};

export default PaymentSuccess;
