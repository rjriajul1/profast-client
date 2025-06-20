import React from "react";
import { FaArrowRight } from "react-icons/fa";

const FrequentlyAsk = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="space-y-5 my-12">
        <h1 className="text-4xl font-extrabold text-center">
          Frequently Asked Question (FAQ)
        </h1>
        <p className="text-gray-500 text-center">
          Enhance posture, mobility, and well-being effortlessly with Posture
          Pro. Achieve proper alignment, reduce pain, and strengthen your body
          with ease!
        </p>
      </div>
      <div className="collapse collapse-arrow bg-base-100 border border-base-300 mb-3">
        <input type="radio" name="my-accordion-2" defaultChecked />
        <div className="collapse-title font-semibold">
          How does this posture corrector work?
        <p className="border border-gray-300 mt-2"></p>
        </div>
        <div className="collapse-content text-sm">
        A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day. Here’s how it typically functions: A posture corrector works by providing support and gentle alignment to your shoulders.
        </div>
      </div>
      <div className="collapse collapse-arrow bg-base-100 border border-base-300 mb-3">
        <input type="radio" name="my-accordion-2" defaultChecked />
        <div className="collapse-title font-semibold">
          How does this posture corrector work?
        <p className="border border-gray-300 mt-2"></p>
        </div>
        <div className="collapse-content text-sm">
        A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day. Here’s how it typically functions: A posture corrector works by providing support and gentle alignment to your shoulders.
        </div>
      </div>
      <div className="collapse collapse-arrow bg-base-100 border border-base-300 mb-3">
        <input type="radio" name="my-accordion-2" defaultChecked />
        <div className="collapse-title font-semibold">
          How does this posture corrector work?
        <p className="border border-gray-300 mt-2"></p>
        </div>
        <div className="collapse-content text-sm">
        A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day. Here’s how it typically functions: A posture corrector works by providing support and gentle alignment to your shoulders.
        </div>
      </div>
      <div className="collapse collapse-arrow bg-base-100 border border-base-300 mb-3">
        <input type="radio" name="my-accordion-2" defaultChecked />
        <div className="collapse-title font-semibold">
          How does this posture corrector work?
        <p className="border border-gray-300 mt-2"></p>
        </div>
        <div className="collapse-content text-sm">
        A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day. Here’s how it typically functions: A posture corrector works by providing support and gentle alignment to your shoulders.
        </div>
      </div>
      <div className="flex justify-center my-8">
        <button className="btn btn-primary text-black font-semibold ">See More Frequent question <FaArrowRight className="-rotate-45 bg-black rounded-full" color="gray" size={22}/></button>
      </div>
   
    </div>
  );
};

export default FrequentlyAsk;
