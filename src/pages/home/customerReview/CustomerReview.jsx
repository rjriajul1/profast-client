import React from "react";
import { useLoaderData } from "react-router";
import customerLogo from "../../../assets/customer-top.png";
import ReviewCard from "./ReviewCard";
import Marquee from "react-fast-marquee";


const CustomerReview = () => {
  const reviews = useLoaderData();

  return (
    <div data-aos="flip-left">
      <div className="flex items-center flex-col">
        <div>
          <img src={customerLogo} alt="" />
        </div>
        <div className="py-6 text-center">
          <h1 className="text-4xl font-extrabold">
            What our customers are sayings
          </h1>
          <p className="py-3">
            Enhance posture, mobility, and well-being effortlessly with Posture
            Pro. Achieve proper alignment, reduce pain, and strengthen <br />{" "}
            your body with ease!
          </p>
        </div>
      </div>
      <Marquee speed={50} pauseOnHover>

      <div className="flex gap-8 my-6">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review}></ReviewCard>
        ))}
      </div>

      </Marquee>
    </div>
  );
};

export default CustomerReview;
