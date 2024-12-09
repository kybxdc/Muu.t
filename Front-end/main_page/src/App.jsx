import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MyMain from "./mypage/MyMain";
import Mainpage from "./mainpage/Mainpage";
import ErrorPage from "./mainpage/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Mainpage />},
      // login, join은 현재 modal 적용중
      // { path: "/login", element: <Login />, errorElement: <ErrorPage /> },
      // { path: "/join", element: <Join />, errorElement: <ErrorPage /> },
      { path: "/mypage", element: <MyMain />, errorElement: <ErrorPage /> },
    ]
  },
]);

function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
