import React from "react";


const ReviewCard = ({ review }) => {
  return (
   
    <div className="w-auto mx-auto bg-white shadow-md rounded-2xl p-6 space-y-4">
      {/* Empty Quotation Box */}
      <p className="text-4xl font-semibold text-gray-400"> ”</p>

      {/* Short Description */}
      <p className="text-sm text-gray-500">{review.review}</p>

      {/* Dashed Divider */}
      <div className="border-t border-dashed border-gray-300 my-2"></div>

      {/* Customer Info */}
      <div className="flex gap-6  items-center justify-between">
        {/* Left: Profile Image */}
        <img
          src={review.user_photoURL}
          alt="Customer"
          className="w-14 h-14 rounded-full object-cover"
        />

        {/* Right: Name and Profession */}
        <div className="text-center p-2">
          <h4 className="font-semibold text-gray-800">{review.userName}</h4>
          <p className="text-sm text-gray-500">{review.user_email}</p>
        </div>
      </div>
    </div>
    
  );
};

export default ReviewCard;
