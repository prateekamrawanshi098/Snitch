import { createBrowserRouter } from "react-router";
import Register from "../features/auth/Pages/Register";
import Login from "../features/auth/Pages/Login";
import CreateProduct from "../features/products/pages/CreateProduct";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <h1>Hello World</h1>,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/create-product",
    element: <CreateProduct />,
  },
]);
