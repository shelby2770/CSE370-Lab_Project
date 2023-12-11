import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, json, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Origin from "./origin";
import ShowError from "./ShowError";
import AddEvent from "./pages/AddEvent";
import MyCart from "./pages/MyCart";
import Register from "./pages/Register";
import AuthProvider from "./AuthProvider";
import LogIn from "./pages/LogIn";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Origin></Origin>,
    loader: async () => {
      const [get_user, get_admins, get_reviews] = await Promise.all([
        fetch("http://localhost:3000/users").then((res) => res.json()),
        fetch("http://localhost:3000/admins").then((res) => res.json()),
        fetch("http://localhost:3000/reviews").then((res) => res.json()),
      ]);

      return { get_user, get_admins, get_reviews };
    },
    errorElement: <ShowError></ShowError>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
        loader: () => fetch("http://localhost:3000/events"),
      },
      {
        path: "/addevent",
        element: <AddEvent></AddEvent>,
        loader: () => fetch("http://localhost:3000/events"),
      },
      {
        path: "/mycart",
        element: <MyCart></MyCart>,
        loader: () => fetch("http://localhost:3000/events"),
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/login",
        element: <LogIn></LogIn>,
        loader: () => fetch("http://localhost:3000/users"),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
