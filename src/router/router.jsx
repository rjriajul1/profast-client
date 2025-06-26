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
      }
    ]
  }
]);
