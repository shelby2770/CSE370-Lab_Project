import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Origin from "./origin";
import ShowError from "./ShowError";
import AddProduct from "./pages/AddProduct";
import MyCart from "./pages/MyCart";
import Register from "./pages/Register";
import AuthProvider from "./AuthProvider";
import LogIn from "./pages/LogIn";
import ProductContainer from "./components/ProductContainer";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Origin></Origin>,
    loader: () => fetch("http://localhost:3000/users"),
    errorElement: <ShowError></ShowError>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
        loader: () => fetch("fake_data.json"),
      },
      {
        path: "/addproduct",
        element: <AddProduct></AddProduct>,
      },
      {
        path: "/mycart",
        element: <MyCart></MyCart>,
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
      {
        path: "/:id",
        element: <ProductContainer></ProductContainer>,
        loader: () => fetch("/fake_data_service.json"),
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
