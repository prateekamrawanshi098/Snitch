import React from "react";
import "../App/App.css";
import { RouterProvider } from "react-router";
import { routes } from "./app.router";

const App = () => {
  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
};

export default App;
