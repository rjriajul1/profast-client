import React from "react";
import location from "../../../assets/location-merchant.png";
import backImg from '../../../assets/be-a-merchant-bg.png'
const Merchant = () => {
  return (
    <div data-aos="flip-left"
     data-aos-easing="ease-out-cubic"
     data-aos-duration="1000"  style={{backgroundImage:`url(${backImg})`}} className="flex gap-6 rounded-2xl my-6 flex-col lg:flex-row bg-[#03373D] lg:p-20  bg-no-repeat ">
      <div className="card-body">
        <h2 className="card-title text-white font-extrabold text-4xl">
          Merchant and Customer Satisfaction <br /> is Our First Priority
        </h2>
        <p className="text-gray-300 my-4">
          We offer the lowest delivery charge with the highest value along with
          100% safety of your product. Pathao courier delivers your parcels in
          every corner of Bangladesh right on time.
        </p>
        <div className="card-actions ">
          <button className="btn btn-primary rounded-full text-black">
            Become a Merchant
          </button>
          <button className="outline rounded-full hover:text-primary p-2 font-semibold">
            Earn with Profast Courier
          </button>
        </div>
      </div>
      <div className="max-w-[531px] min-h-[300px] lg:w-5xl p-2">
        <figure>
          <img className="" src={location} alt="Movie" />
        </figure>
      </div>
    </div>
  );
};

export default Merchant;
