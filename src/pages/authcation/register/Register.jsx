import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import axios from "axios";

const Register = () => {
  const { userCreate, emailVerification, userSignOut,userProfileUpdate } = useAuth();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [profilePic,setProfilePic] = useState('')


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    userCreate(data?.email, data?.password)
      .then((res) => {
        if (res.user) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "You are create an account successfully",
            showConfirmButton: false,
            timer: 1500,
          });

          const profileInfo = {
            displayName:data?.name,
            photoURL:profilePic
          }
          // profile update 
          userProfileUpdate(profileInfo)
          .then(res=>{
            console.log(res);
          })
          .catch(error=>{
            console.log(error)
          })

          // email verification
          emailVerification()
            .then((res) => {
              console.log(res);
              alert("verification email sent !!");
            })
            .catch((error) => {
              console.log(error);
            });
          userSignOut();
          navigate("/login");
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const handlePhoto = async (e) => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("image", image);
    const res = await axios.post(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGEBB_KEY}`,
      formData
    );
    setProfilePic(res.data.data.display_url);
  };

  return (
    <div className="card bg-base-100 w-full  shrink-0 shadow-2xl">
      <div className="card-body">
        <h1 className="text-3xl text-center font-bold">
          Create an new account!
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="fieldset">
          {/* name */}
          <label className="label">Name</label>
          <input
            type="text"
            {...register("name")}
            className="input w-full"
            placeholder="Name"
          />
          {/* profile */}
          <label className="label">Your Photo</label>
          <input
            onChange={handlePhoto}
            type="file"
            className="input w-full"
            placeholder="Your Photo"
          />
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
              className="input w-full text-[18px] font-bold"
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
            <a className="link link-hover">Forgot password?</a>
          </div>
          <button className="btn btn-primary text-black mt-4">Register</button>
        </form>
        <p className="text-[18px]">
          Already have an account ? please{" "}
          <Link className="hover:underline text-blue-500" to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
