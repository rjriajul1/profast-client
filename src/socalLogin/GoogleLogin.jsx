import React from "react";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";

const GoogleLogin = () => {
  const { loginWithGoogle } = useAuth();
  const location = useLocation()
  const navigate = useNavigate()
  const handleGoogle = () => {
    loginWithGoogle()
      .then(async(res) => {
        const user = res.user;
        if (res.user) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "You are login with google successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate(location.state || '/')
          // save to database
           const userInfo = {
            email:user?.email,
            role: "user", //default  user
            created_at:new Date().toISOString(),
            last_log_in: new Date().toISOString()
          }
              const res = await axios.post('http://localhost:3000/users',userInfo)
              console.log(res.data);
          if(res.data.insertedId){
            console.log(res.data);
          }
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  return (
    <div>
      <div className="divider">OR</div>
      <div className="flex justify-center ">
        <button onClick={handleGoogle} className="btn w-10/12 bg-white text-black border-[#e5e5e5]">
          <svg
            aria-label="Google logo"
            width="16"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <g>
              <path d="m0 0H512V512H0" fill="#fff"></path>
              <path
                fill="#34a853"
                d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
              ></path>
              <path
                fill="#4285f4"
                d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
              ></path>
              <path
                fill="#fbbc02"
                d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
              ></path>
              <path
                fill="#ea4335"
                d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
              ></path>
            </g>
          </svg>
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default GoogleLogin;
