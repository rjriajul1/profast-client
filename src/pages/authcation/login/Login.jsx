import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import useAuth from "../../../hooks/useAuth";
import GoogleLogin from "../../../socalLogin/GoogleLogin";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const Login = () => {
  const { signInUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    signInUser(data?.email, data?.password)
    .then(res=> {
      if (res.user) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "You are login successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    })
    .catch(error=> {
      toast.error(error.message)
    })
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
          <label className="label">Password</label>
          <input
            type="password"
            {...register("password", { required: true, minLength: 6 })}
            className="input w-full"
            placeholder="Password"
          />

          {errors.password?.type === "required" && (
            <p className="text-red-500 text-[18px]">password is Required</p>
          )}

          {errors.password?.type === "minLength" && (
            <p className="text-red-500 text-[18px]">
              password must be 6 character or longer{" "}
            </p>
          )}

          <div>
            <a className="link link-hover">Forgot password?</a>
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
