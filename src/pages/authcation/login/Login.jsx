import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import useAuth from "../../../hooks/useAuth";
import GoogleLogin from "../../../socalLogin/GoogleLogin";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router";
const Login = () => {
  const { signInUser, resetPassword } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    signInUser(data?.email, data?.password)
      .then((res) => {
        
        if (!res?.user?.emailVerified) {
          return alert("verification email sent !!");
        }

        if (res.user) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "You are login successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate(location.state || "/");
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const handleResetPass = () => {
    const email = getValues("email");
    console.log(email);
    if (!email) {
      toast.warn("please write your correct email");
    }
    resetPassword(email)
      .then(() => {
        toast.success("Reset email sent!!");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  return (
    <div className="card bg-base-100 w-full shrink-0 shadow-2xl">
      <div className="card-body">
        <h1 className="text-3xl text-center font-bold">Login now!</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* email */}
          <label className="label">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="input w-full"
            placeholder="Email"
          />

          {errors.email?.type === "required" && (
            <p className="text-red-500 text-[18px]">Email is Required</p>
          )}
          {/* password */}
          <div className="relative">
            <label className="label">Password</label>
            <input
              type={show ? "text" : "password"}
              {...register("password", { required: true, minLength: 6 })}
              className="input w-full font-bold text-[18px] "
              placeholder="Password"
            />
            <div
              onClick={() => setShow(!show)}
              className="absolute top-7 z-20 right-3"
            >
              {show ? <FaEyeSlash size={24} /> : <IoEyeSharp size={24} />}
            </div>
          </div>

          {errors.password?.type === "required" && (
            <p className="text-red-500 text-[18px]">password is Required</p>
          )}

          {errors.password?.type === "minLength" && (
            <p className="text-red-500 text-[18px]">
              password must be 6 character or longer{" "}
            </p>
          )}

          <div>
            <a onClick={handleResetPass} className="link link-hover">
              Forgot password?
            </a>
          </div>
          <button className="btn btn-primary text-black mt-4 w-full">
            Login
          </button>
        </form>
        <GoogleLogin></GoogleLogin>
        <p className="text-[18px] text-center">
          Don't have an account ? please{" "}
          <Link className="hover:underline text-blue-500" to="/register">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
