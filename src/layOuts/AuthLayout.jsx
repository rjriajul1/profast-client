import React from "react";
import { Outlet } from "react-router";
import loginImg from '../assets/authImage.png'
import Logo from "../pages/shared/logo/Logo";
const AuthLayout = () => {
  return (
    <div className="max-w-[1600px] mx-auto px-4">
      <div className="bg-base-200 p-14 ">
        <div>
            <Logo></Logo>
        </div>
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="flex-1">
            <img
            src={loginImg}
            className="max-w-sm rounded-lg shadow-2xl"
          />
          </div>
          <div className="flex-1">
           <Outlet></Outlet>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
