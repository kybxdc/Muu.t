import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MyMain from "./mypage/MyMain";
import Mainpage from "./mainpage/Mainpage";
import Detailpage from "./detailpage/Detailpage";
import ErrorPage from "./mainpage/ErrorPage";
import SeatEdit from './component/SeatEdit/SeatEdit'
import SeatView from './component/Reservation/SeatView/SeatView'
import ReservationConfirmation from './component/Reservation/ReservationConfirmation/ReservationConfirmation'
import Payment from './component/Reservation/Payment/Payment'
import SeatInfo from './component/SeatEdit/SeatInfo'
import SeatGrade from './component/SeatEdit/SeatGrade'
import SeatProvider from "./component/SeatEdit/seatContext";
import Reservation from "./component/Reservation/Reservation";
import AdminMain from "./adminpage/AdminMain";
import ReservationProvider from "./component/Reservation/reservationContext";
import "./App.css"; // 폰트만 적용중
import MyReservDetail from "./mypage/MyReserv/MyReservDetail";
import ProtectedRoute from "./mypage/ProtectedRoute";
import Test from "./Test";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Mainpage />},
      // login, join은 현재 modal 적용중
      // { path: "/login", element: <Login />, errorElement: <ErrorPage /> },
      // { path: "/join", element: <Join />, errorElement: <ErrorPage /> },
      { path: "/mypage", element: <ProtectedRoute><MyMain /></ProtectedRoute>, errorElement: <ErrorPage /> },
      // { path: "/mypage/myReserv", element: <MyMain />, errorElement: <ErrorPage /> },
      {path:"/mypage/myReservDetail/:reserv_id", element: <MyReservDetail />, errorElement: <ErrorPage /> },
      { path: "/detailpage", element: <Detailpage />, errorElement: <ErrorPage /> },
      {path:"/test",element: <Test/>}
    ]
  },
  {
    path: '/reservation/:performance_id',
    element: <ReservationProvider><Reservation /></ReservationProvider>,
    children: [
      {path: 'seatview', element: <SeatView/>},
      {path: 'reserve', element: <ReservationConfirmation />},
      {path: 'payment', element: <Payment/>},
    ]
  },
  {
    path: '/admin',
    children: [
      {path: 'seatedit/:hall_id', element: <SeatProvider><SeatEdit /></SeatProvider>},
      {path: 'main', element: <AdminMain />},
      {path: 'seatinfo/:hall_id', element: <SeatInfo />},
      {path: 'seatgrade/:musical_id', element: <SeatProvider><SeatGrade /></SeatProvider>},
    ]
  },
]);

function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
