import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, json, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Origin from "./origin";
import ShowError from "./ShowError";
import AddProduct from "./pages/AddProduct";
import MyCart from "./pages/MyCart";
import Register from "./pages/Register";
import AuthProvider from "./AuthProvider";
import LogIn from "./pages/LogIn";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Origin></Origin>,
    loader: async () => {
      const [get_user, get_event] = await Promise.all([
        fetch("http://localhost:3000/users").then((res) => res.json()),
        fetch("http://localhost:3000/events").then((res) => res.json()),
      ]);

      return { get_user, get_event };
    },
    errorElement: <ShowError></ShowError>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
        loader: () => fetch("http://localhost:3000/events"),
      },
      {
        path: "/addproduct",
        element: <AddProduct></AddProduct>,
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
