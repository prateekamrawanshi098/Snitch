import React, { useEffect } from "react";
import "../App/App.css";
import { RouterProvider } from "react-router";
import { routes } from "./app.router";
import { useSelector } from "react-redux";
import { useAuth } from "../features/auth/hook/useAuth";


const App = () => {
  const { handlegetme } = useAuth()
  const user = useSelector((state) => state.auth.user);
  useEffect(() => {
    handlegetme()
  },[])
  console.log(user);
  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
};

export default App;
