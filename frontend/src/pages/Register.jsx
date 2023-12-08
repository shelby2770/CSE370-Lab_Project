import { useContext, useState } from "react";
import { AuthContext } from "../AuthProvider";
import swal from "sweetalert";
import { Link } from "react-router-dom";

const Register = () => {
  const { create_user } = useContext(AuthContext);
  const [selectedImage, setSelectedImage] = useState(null);

  const convertToBase64 = async (e) => {
    let reader = new FileReader();
    await reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setSelectedImage(reader.result);
    };
    reader.onerror = (error) => console.log("Error: ", error);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.first_name.value + " " + form.last_name.value;
    const image = selectedImage;
    const email = form.email.value;
    const password = form.password.value;
    const specialChars = /[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/;
    if (password.length < 6) {
      swal(
        "Attention!",
        "Password must contains at least 6 characters",
        "error"
      );
      form.reset();
    } else if (!password.replace(/[^A-Z]/g, "").length) {
      swal(
        "Attention!",
        "Password must contains at least one capital letter",
        "error"
      );
      form.reset();
    } else if (!specialChars.test(password)) {
      swal(
        "Attention!",
        "Password must contains at least one special character",
        "error"
      );
      form.reset();
    } else if (!selectedImage) {
      swal("Attention!", "No image selected", "error");
    } else {
      try {
        const res1 = await create_user(email, password);
        res1.user.displayName = name;
        res1.user.photoURL = image;
        const obj = { name, image, email, password };

        const res2 = await fetch("http://localhost:3000/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(obj),
        });
        // const result = await res2.json();
        // console.log(result);

        form.reset();
        swal("Done", "Account has been created successfully!", "success");
        const timeout = (delay) => {
          return new Promise((res) => setTimeout(res, delay));
        };
        await timeout(2000);
        window.location.href = "/";
      } catch (error) {
        form.reset();
        swal("", error.message, "warning");
      }
    }
  };
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col">
        <div className="text-center lg:text-left">
          <h1 className="text-3xl font-bold">Register Now!!</h1>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleRegister} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">First Name</span>
              </label>
              <input
                type="text"
                name="first_name"
                placeholder="Your First Name"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Last Name</span>
              </label>
              <input
                type="text"
                name="last_name"
                placeholder="Your Last Name"
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Image</span>
              </label>
              <div className="text-xs">
                <input type="file" name="image" onChange={convertToBase64} />
                {selectedImage && (
                  <img
                    src={selectedImage}
                    alt="Selected"
                    style={{ maxWidth: "300px", marginTop: "20px" }}
                  />
                )}
              </div>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-active bg-primary_clr">
                Register
              </button>
            </div>
            <p className="mt-1 text-sm">
              Already have an account?
              <Link to="/login">
                <span className="ml-1 underline text-[#0000FF]">Login</span>
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
