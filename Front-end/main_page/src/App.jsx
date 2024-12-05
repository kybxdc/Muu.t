// import { useEffect, useState } from "react";
import React from "react";
// import axios from "axios";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import { Link } from "react-router-dom";
// import "./App.css";

// import Product_grid from "./mainpage/Product_grid";
// import TopBanner from "./mainpage/TopBanner";
import Join from "./login/Join";
import Login from "./login/Login";
// import ErrorPage from "./mainpage/ErrorPage";
// import MyMain from "./mypage/MyMain";
import Mainpage from "./mainpage/mainpage";
import ErrorPage from "./mainpage/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Mainpage />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/login", element: <Login />, errorElement: <ErrorPage /> },
      { path: "/join", element: <Join />, errorElement: <ErrorPage /> },
    ],
  },
]);

function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
