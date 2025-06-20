import React from "react";
import Marquee from "react-fast-marquee";
import brands1 from "../../../assets/brands/amazon.png";
import brands2 from "../../../assets/brands/amazon_vector.png";
import brands3 from "../../../assets/brands/casio.png";
import brands4 from "../../../assets/brands/moonstar.png";
import brands5 from "../../../assets/brands/randstad.png";
import brands6 from "../../../assets/brands/start.png";

const TrustedBy = () => {
  return (
    <div>
      <section className="py-16 overflow-hidden">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-[#03373D]">
            We've helped thousands of sales teams
          </h2>
        </div>

        {/* Marquee Section */}
        <div className="w-full overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap gap-10">
            <Marquee pauseOnHover speed={50} gradient={false}>
              <div className="flex gap-20">
                <img className="max-w-[96px] min-h-[28px]" src={brands1} alt="" />
                <img className="max-w-[96px] min-h-[28px]" src={brands2} alt="" />
                <img className="max-w-[96px] min-h-[28px]" src={brands3} alt="" />
                <img className="max-w-[96px] min-h-[28px]" src={brands4} alt="" />
                <img className="max-w-[96px] min-h-[28px]" src={brands5} alt="" />
                <img className="max-w-[96px] min-h-[28px]" src={brands6} alt="" />
               
              </div>
            </Marquee>
          </div>
        </div>
      </section>
        <p className="border mb-5 border-dashed"></p>
    </div>
  );
};

export default TrustedBy;
