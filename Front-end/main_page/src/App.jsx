import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MyMain from "./mypage/MyMain";
import Mainpage from "./mainpage/Mainpage";
import ErrorPage from "./mainpage/ErrorPage";

import SeatEdit from './component/SeatEdit/SeatEdit'
import SeatView from './component/Reservation/SeatView/SeatView'
import ReservationConfirmation from './component/Reservation/ReservationConfirmation/ReservationConfirmation'
import Payment from './component/Reservation/Payment/Payment'
import SeatInfo from './component/SeatEdit/SeatInfo'
import SeatGrade from './component/SeatEdit/SeatGrade'
import TestMap from "./component/Map/TestMap";

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
      {path: "/test", element: <TestMap/>},
    ]
  },
  {
    path: '/reservation',
    children: [
      {path: 'seatview/:performance_id', element: <SeatView/>},
      {path: 'reserve/:performance_id', element: <ReservationConfirmation />},
      {path: 'payment/:performance_id', element: <Payment/>},
    ]
  },
  {
    path: '/admin',
    children: [
      {path: 'seatedit/:hall_id', element: <SeatEdit />},
      {path: 'seatinfo/:hall_id', element: <SeatInfo />},
      {path: 'seatgrade/:performance_id', element: <SeatGrade />},
    ]
  },
]);

function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
