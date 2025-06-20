import { FaMapMarkedAlt, FaShieldAlt, FaPhoneVolume } from "react-icons/fa";
import img1 from '../../../assets/live-tracking.png'
import img2 from '../../../assets/safe-delivery.png'
import img3 from '../../../assets/safe-delivery.png'
const features = [
  {
    icon: img1,
    title: "Live Parcel Tracking",
    description: "Track your parcel in real time from pick-up to delivery using our smart tracking system.",
  },
  {
    icon: img2,
    title: "Safe & Secure Delivery",
    description: "We ensure your packages are handled with the highest safety standards and insured delivery.",
  },
  {
    icon: img3,
    title: "24/7 Call Center Support",
    description: "Our dedicated support team is available any time to answer your questions and resolve issues quickly.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-16 px-4">
      <div className="max-w-[1600px] mx-auto">
        <h2 className="text-3xl font-bold text-center text-neutral mb-12">
          Why Choose ProFast?
        </h2>

        <div className="flex flex-col  gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="card w-full bg-white shadow-md p-6 flex flex-col md:flex-row md:items-center items-center  gap-6"
            >
              <div className="">
                <img src={feature.icon} alt="" />
              </div>
                <div className="divider text-red-3 md:divider-horizontal "></div>
              <div className="text-center md:text-left">
                <h3 className="text-xl font-semibold text-neutral mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-700 text-sm">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
