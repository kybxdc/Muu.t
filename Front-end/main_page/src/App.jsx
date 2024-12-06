import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Join from "./login/Join";
import Login from "./login/Login";
import MyMain from "./mypage/MyMain";
import Mainpage from "./mainpage/mainpage";
import ErrorPage from "./mainpage/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Mainpage />},
      // { path: "/login", element: <Login />, errorElement: <ErrorPage /> },
      { path: "/join", element: <Join />, errorElement: <ErrorPage /> },
    ]
  },
]);

function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
