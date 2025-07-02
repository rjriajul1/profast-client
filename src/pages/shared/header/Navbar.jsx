import React from "react";
import { NavLink } from "react-router";
import Logo from "../logo/Logo";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-toastify";
import profile from '../../../assets/profiel.png'
const Navbar = () => {
  const {user,userSignOut} = useAuth()
  const handleSignOut = () => {
    userSignOut()
    .then(res=> {
      console.log(res);
    })
    .catch(error=> {
      toast.error(error.message)
    })
  }
  const links = (
    <>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive ? "text-blue-500 underline" : "btn-primary"
          }
          to="/"
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive ? "text-blue-500 underline" : "btn-primary"
          }
          to="/coverage"
        >
          Coverage
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive ? "text-blue-500 underline" : "btn-primary"
          }
          to="/sendParcel"
        >
          Send a parcel
        </NavLink>
      </li>
      {
        user && <li>
        <NavLink
          className={({ isActive }) =>
            isActive ? "text-blue-500 underline" : ""
          }
          to="/dashboard"
        >
          Dashboard
        </NavLink>
      </li>
      }
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive ? "text-blue-500 underline" : ""
          }
          to="/about"
        >
          About Us
        </NavLink>
      </li>
    </>
  );
  return (
    <div className="navbar w-full bg-base-100 shadow-sm mt-2">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <div className="btn btn-ghost text-xl">
          <Logo></Logo>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end flex gap-4">
       {user ? <img className="rounded-full w-14 h-14" src={user?.photoURL}/>: <img className="rounded-full w-14 h-14" src={profile}/>}
      {
        user ? <button onClick={handleSignOut} className="btn btn-primary text-black">Signout</button> :
         <>
         <button className="btn"> <NavLink
          className={({ isActive }) =>
            isActive ? "text-blue-500 underline" : ""
          }
          to="/login"
        >
          Login
        </NavLink></button>
       <button className="btn"> <NavLink
          className={({ isActive }) =>
            isActive ? "text-blue-500 underline" : ""
          }
          to="/register"
        >
          Register
        </NavLink></button></>
      }
      </div>
    </div>
  );
};

export default Navbar;
