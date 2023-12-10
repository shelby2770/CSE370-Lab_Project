import { useContext } from "react";
import { AuthContext } from "../AuthProvider";
import swal from "sweetalert";
import { Link, useLoaderData, useNavigate } from "react-router-dom";

const Login = () => {
  const data = useLoaderData();
  const { sign_in_user, sign_in_google } = useContext(AuthContext);
  const handleGoogleSignIn = async () => {
    try {
      const res1 = await sign_in_google();
      const obj = {
        name: res1.user.displayName,
        image: res1.user.photoURL,
        email: res1.user.email,
        password: "",
      };
      let check_duplicate = false;
      data.map((item) => {
        if (item.email == obj.email) check_duplicate = true;
      });

      if (!check_duplicate) {
        try {
          const res2 = await fetch("http://localhost:3000/users", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(obj),
          });
        } catch (error) {
          console.log(error);
        }
      }

      swal("Done", "Logged in successfully!", "success");
      const timeout = (delay) => {
        return new Promise((res) => setTimeout(res, delay));
      };
      await timeout(2000);
      window.location.href = "/";
    } catch (error) {
      console.log(error);
    }
  };
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    //console.log(email, password);
    sign_in_user(email, password)
      .then((res) => {
        //console.log(res.user);
        form.reset();
        swal("Done", "Logged in successfully!", "success");
        navigate("/");
      })
      .catch((error) => {
        swal("Attention!", error.message, "error");
        form.reset();
      });
  };
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col">
        <div className="text-center lg:text-left">
          <h1 className="text-3xl font-bold">Login Here!!</h1>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleLogin} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="email"
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
                placeholder="password"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-active bg-primary_clr">lOGIN</button>
            </div>
            <p className="mt-1 text-sm">
              Don't have an account?
              <Link to="/register">
                <span className="ml-1 underline text-[#0000FF]">Register</span>
              </Link>
            </p>
            <p>
              Login using{" "}
              <span>
                <button className="btn btn-ghost" onClick={handleGoogleSignIn}>
                  Google
                </button>
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
