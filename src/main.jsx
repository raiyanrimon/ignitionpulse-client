import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Layout/Root";
import ErrorPage from "./ErrorPage/ErrorPage";
import Home from "./Home/Home";
import Login from "./Login/Login";
import AuthProvider from "./Provider/AuthProvider";
import Register from "./Registration/Register";
import Dashboard from "./Layout/Dashboard";
import ProfilePage from "./Dashboard/ProfilePage";
import AddProduct from "./Dashboard/AddProduct";
import MyProducts from "./Dashboard/MyProducts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UpdateProduct from "./Dashboard/UpdateProduct";
import ProductDetails from "./ProductDetails/ProductDetails";
import Products from "./Products/Products";
import ProductReview from "./Dashboard/ProductReview";
import ReportedProduct from "./Dashboard/ReportedProduct";
import ManageUsers from "./Dashboard/ManageUsers";
import ManageCoupon from "./Dashboard/ManageCoupon";
import Statistics from "./Dashboard/Statistics";
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
      {
        path: "products",
        element: <Products></Products>,
      },
      {
        path: "update/:id",
        element: <UpdateProduct></UpdateProduct>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/products/${params.id}`),
      },
      {
        path: "products/:id",
        element: <ProductDetails></ProductDetails>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/products/${params.id}`),
      },
    ],
  },
  {
    path: "dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: "profile",
        element: <ProfilePage></ProfilePage>,
      },
      {
        path: "addProduct",
        element: <AddProduct></AddProduct>,
      },
      {
        path: "myProduct",
        element: <MyProducts></MyProducts>,
      },
      {
        path: "productReview",
        element: <ProductReview></ProductReview>,
      },
      {
        path: "reportedProduct",
        element: <ReportedProduct></ReportedProduct>,
      },
      {
        path: "manageUsers",
        element: <ManageUsers></ManageUsers>,
      },
      {
        path: "coupons",
        element: <ManageCoupon></ManageCoupon>,
      },
      {
        path: "stats",
        element: <Statistics></Statistics>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <div className="max-w-7xl mx-auto">
    <React.StrictMode>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </AuthProvider>
    </React.StrictMode>
  </div>
);
