import { NavLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import {
  AdminContext,
  AssetContext,
  ImageContext,
  NameContext,
} from "../origin";
import { AuthContext } from "../AuthProvider";
import swal from "sweetalert";
import { BsFillSunFill } from "react-icons/bs";
import { BsFillMoonFill } from "react-icons/bs";

const NavBar = () => {
  const [bg_clr, set_bg_clr] = useContext(AssetContext);
  const [get_name, set_get_name] = useContext(NameContext);
  const [get_image, set_get_image] = useContext(ImageContext);
  const [isAdmin, setAdmin] = useContext(AdminContext);
  const { user, log_out } = useContext(AuthContext);
  const handleLogOut = () => {
    log_out().then().catch();
  };

  const [isDarkMode, setDarkMode] = useState(false);

  // console.log(isAdmin);
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
            {isAdmin && (
              <NavLink
                to="/addevent"
                className={({ isActive, isPending }) =>
                  isPending
                    ? "pending"
                    : isActive
                    ? "text-secondary_clr font-semibold underline"
                    : ""
                }
              >
                Add Event
              </NavLink>
            )}
            {user && !isAdmin && (
              <NavLink
                to="/"
                onClick={() => {
                  swal(
                    "Attention!",
                    "You are not allowed to access this page",
                    "error"
                  );
                }}
              >
                Add Event
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
                Add Event
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
