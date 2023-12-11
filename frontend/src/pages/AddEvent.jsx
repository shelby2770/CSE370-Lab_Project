import swal from "sweetalert";
import { useContext, useEffect } from "react";
import { AdminContext } from "../origin";

const AddEvent = () => {
  const [isAdmin, setAdmin] = useContext(AdminContext);
  useEffect(() => {
    if (!isAdmin) {
      const redirecting = async () => {
        swal("Attention!", "Admin logged out", "error");
        const timeout = (delay) => {
          return new Promise((res) => setTimeout(res, delay));
        };
        await timeout(1500);
        window.location.href = "/Login";
      };
      redirecting();
    }
  }, [isAdmin]);
  const handleAdd = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const Event = form.Event.value;
    const type = form.type.value;
    const price = form.price.value;
    const description = form.description.value;
    const image = form.image.value;
    if (isNaN(price)) {
      swal("Attention!", "Please input a valid price", "error");
      form.reset();
    } else {
      ("");

      // create_user(email, password)
      //   .then((res) => {
      //     res.user.displayName = name;
      //     res.user.photoURL = image;
      //     const obj = { name, image, email, password };
      //     fetch("http://localhost:3000/users", {
      //       method: "POST",
      //       headers: {
      //         "Content-Type": "application/json",
      //       },
      //       body: JSON.stringify(obj),
      //     }).then((res) => res.json);
      //     // .then((data) => //console.log(data));
      //     swal("Done", "Account has been created successfully!", "success");
      //     form.reset();
      //   })
      //   .catch((error) => {
      //     swal("", error.message, "warning");
      //   });
    }
  };
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col">
        <div className="text-center lg:text-left">
          <h1 className="text-3xl font-bold">
            Add Your <span className="text-secondary_clr">Event!!</span>
          </h1>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleAdd} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Event Name"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Location</span>
              </label>
              <input
                type="text"
                name="location"
                placeholder="Location"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Total Seats</span>
              </label>
              <input
                type="text"
                name="capacity"
                placeholder="Capacity"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Price</span>
              </label>
              <input
                type="text"
                name="price"
                placeholder="00.00 BDT"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <input
                type="text"
                name="description"
                placeholder="Write something"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Date</span>
              </label>
              <input
                type="text"
                name="date"
                placeholder="DD/MM/YY"
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Image</span>
              </label>
              <input
                type="text"
                name="image"
                placeholder="Image URL"
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control mt-6">
              <button className="btn btn-active bg-primary_clr">
                Add Event
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEvent;
