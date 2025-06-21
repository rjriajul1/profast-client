import React from "react";
import logo from "../../../assets/logo.png";
import { Link } from "react-router";
const Logo = () => {
  return (
    <div>
      <Link to="/">
        <div className="flex items-end ">
          <img src={logo} alt="" />
          <p className="-ml-3 font-extrabold text-3xl">Profase</p>
        </div>
      </Link>
    </div>
  );
};

export default Logo;
