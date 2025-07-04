import { createBrowserRouter } from "react-router";
import RootLayout from "../layOuts/RootLayout";
import Home from "../pages/home/Home";
import AuthLayout from "../layOuts/AuthLayout";
import Login from "../pages/authcation/login/Login";
import Register from "../pages/authcation/register/Register";
import Coverage from "../pages/coverage/Coverage";
import PrivateRoute from "../routes/PrivateRoute";
import SendParcel from "../pages/sendParcel/SendParcel";
import DashboardLayout from "../layOuts/DashboardLayout";
import MyParcels from "../pages/dashboard/myParcels/MyParcels";
import Payment from "../pages/dashboard/payment/Payment";
import PaymentHistory from "../pages/dashboard/paymentHistory/PaymentHistory";
import TrackParcel from "../pages/dashboard/trackParcel/TrackParcel";
import BeARider from "../pages/beARider/BeARider";
import PendingRider from "../pages/dashboard/pendingRider/PendingRider";
import ActiveRider from "../pages/dashboard/activeRider/ActiveRider";
import MakeAdmin from "../pages/dashboard/makeAdmin/MakeAdmin";
import Forbidden from "../pages/forbidden/Forbidden";
import AdminRoute from "../routes/AdminRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
        loader: ()=> fetch('/reviews.json')
      },
      {
        path:'coverage',
        Component: Coverage,
        loader: ()=> fetch('/serviceCenter.json')
      },
      {
        path:'forbidden',
        Component:Forbidden
      },
      {
        path: 'beARider',
        element:<PrivateRoute><BeARider></BeARider></PrivateRoute>
      },
      {
        path:'sendParcel',
        element:<PrivateRoute><SendParcel></SendParcel></PrivateRoute>
      },
    ],
  },
  {
    path:'/',
    Component: AuthLayout,
    children: [
      {
        path:'login',
        Component: Login
      },
      {
        path:'register',
        Component: Register
      }
    ]
  },
  {
    path:'/dashboard',
    element:<PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
    children: [
      {
        path:'myParcels',
        Component:MyParcels
      },
      {
        path:'payment/:parcelId',
        Component:Payment
      },
      {
        path:'paymentHistory',
        Component:PaymentHistory
      },
      {
        path:'pendingRider',
        element:<AdminRoute><PendingRider></PendingRider></AdminRoute>
      },
      {
        path:'activeRider',
        element:<AdminRoute><ActiveRider></ActiveRider></AdminRoute>
      },
      {
        path:'makeAdmin',
        element:<AdminRoute><MakeAdmin></MakeAdmin></AdminRoute>
      },
      {
        path:'track',
        Component:TrackParcel
      },
    ]
  }
]);
