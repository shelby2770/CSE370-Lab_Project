import { NavLink } from "react-router-dom";
import {  useContext, useState } from "react";
import { AssetContext } from "../origin";
import { AuthContext } from "../AuthProvider";
import swal from "sweetalert";
import { BsFillSunFill } from "react-icons/bs";
import { BsFillMoonFill } from "react-icons/bs";

export let get_name = null;
export let get_image = null;
const NavBar = ({ data }) => {
  const [bg_clr, set_bg_clr] = useContext(AssetContext);
  const { user, log_out } = useContext(AuthContext);


  if (user) {
    data.map((item) => {
      if (item.email == user.email) {
        //Email of a person is always unique
        get_name = item.name;
        get_image = item.image;
      }
    });
  }
  const handleLogOut = () => {
    log_out().then().catch();
  };

  const [isDarkMode, setDarkMode] = useState(false);
  const handleSetMode = () => {
    if (bg_clr == "bg-neutral-0") {
      set_bg_clr("bg-neutral-950");
      setDarkMode(true);
    } else {
      set_bg_clr("bg-neutral-0");
      setDarkMode(false);
    }
    //console.log(bg_clr);
  };
  return (
    <div className="navbar bg-primary_clr px-8 flex flex-col md:flex-row justify-between">
      <div className="order-2 md-order-1">
        <ul className="flex flex-col md:flex-row gap-2 md:gap-8 text-sm text-center items-center">
          <li>
            {isDarkMode && <BsFillMoonFill onClick={handleSetMode} size={20} />}
            {!isDarkMode && <BsFillSunFill onClick={handleSetMode} size={20} />}
          </li>
          <li>
            <NavLink
              to="/"
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? "text-secondary_clr font-semibold underline"
                  : ""
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            {user && (
              <NavLink
                to="/addproduct"
                className={({ isActive, isPending }) =>
                  isPending
                    ? "pending"
                    : isActive
                    ? "text-secondary_clr font-semibold underline"
                    : ""
                }
              >
                Add Product
              </NavLink>
            )}
            {!user && (
              <NavLink
                to="/Login"
                onClick={() => {
                  swal(
                    "Attention!",
                    "Please login first to access this page",
                    "error"
                  );
                }}
              >
                Add Product
              </NavLink>
            )}
          </li>
          <li>
            {user && (
              <NavLink
                to="/mycart"
                className={({ isActive, isPending }) =>
                  isPending
                    ? "pending"
                    : isActive
                    ? "text-secondary_clr font-semibold underline"
                    : ""
                }
              >
                My Cart
              </NavLink>
            )}
            {!user && (
              <NavLink
                to="/Login"
                onClick={() => {
                  swal(
                    "Attention!",
                    "Please login first to access this page",
                    "error"
                  );
                }}
              >
                My Cart
              </NavLink>
            )}
          </li>
        </ul>
      </div>
      <div className="flex flex-col md:flex-row order-1 md:order-2">
        <div>
          <img
            className="rounded-xl h-10"
            src="https://i.ibb.co/y8XSgzN/240-F-312454284-DBJPm-Ofskdr-ILVXpf8-Vuzpu-SNhk-Y3066.jpg"
            alt=""
          />
        </div>
        <a
          className="btn btn-ghost normal-case text-2xl"
          style={{
            fontFamily: "Indie Flower",
          }}
        >
          <p>
            Slyther<span className="text-secondary_clr">Tech</span>
          </p>
        </a>
      </div>
      <div className="order-3 md:order-3 mt-4 md:mt-0">
        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            {user ? (
              <img src={get_image} />
            ) : (
              <img src="https://i.ibb.co/ZHnvKCB/user.png" />
            )}
          </div>
        </label>
        {user ? <p className="mr-10 font-medium">{get_name}</p> : ""}
        {user ? (
          <button onClick={handleLogOut}>Logout</button>
        ) : (
          <ul className="flex md:flex-row gap-1 text-sm text-center">
            <NavLink
              to="/login"
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? "text-secondary_clr font-semibold underline"
                  : ""
              }
            >
              Login
            </NavLink>
            <p>/</p>
            <NavLink
              to="/register"
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? "text-secondary_clr font-semibold underline"
                  : ""
              }
            >
              Register
            </NavLink>
          </ul>
        )}
      </div>
    </div>
  );
};

export default NavBar;
