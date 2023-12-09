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

import ProductReview from "./Dashboard/ProductReview";
import ReportedProduct from "./Dashboard/ReportedProduct";
import ManageUsers from "./Dashboard/ManageUsers";
import ManageCoupon from "./Dashboard/ManageCoupon";
import Statistics from "./Dashboard/Statistics";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import ModRoute from "./PrivateRoute/ModRoute";
import AdminRoute from "./PrivateRoute/AdminRoute";
import Payment from "./Dashboard/Payment";
import AboutUs from "./AboutUs/AboutUs";
import Products from "./Products/Products";
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
        path: "aboutUs",
        element: <AboutUs></AboutUs>,
      },
      {
        path: "update/:id",
        element: (
          <PrivateRoute>
            <UpdateProduct></UpdateProduct>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(
            ` https://ignitionpulse-server.vercel.app/products/${params.id}`
          ),
      },
      {
        path: "products/:id",
        element: (
          <PrivateRoute>
            <ProductDetails></ProductDetails>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(
            ` https://ignitionpulse-server.vercel.app/products/${params.id}`
          ),
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <ProfilePage></ProfilePage>
          </PrivateRoute>
        ),
      },
      {
        path: "addProduct",
        element: (
          <PrivateRoute>
            <AddProduct></AddProduct>
          </PrivateRoute>
        ),
      },
      {
        path: "myProduct",
        element: (
          <PrivateRoute>
            <MyProducts></MyProducts>
          </PrivateRoute>
        ),
      },
      {
        path: "payment",
        element: <Payment></Payment>,
      },
      // moderator route
      {
        path: "productReview",
        element: (
          <ModRoute>
            <ProductReview></ProductReview>
          </ModRoute>
        ),
      },
      {
        path: "reportedProduct",
        element: (
          <ModRoute>
            <ReportedProduct></ReportedProduct>
          </ModRoute>
        ),
      },
      {
        path: "manageUsers",
        element: (
          <AdminRoute>
            <ManageUsers></ManageUsers>
          </AdminRoute>
        ),
      },
      {
        path: "coupons",
        element: (
          <AdminRoute>
            <ManageCoupon></ManageCoupon>
          </AdminRoute>
        ),
      },
      {
        path: "stats",
        element: (
          <AdminRoute>
            <Statistics></Statistics>
          </AdminRoute>
        ),
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
