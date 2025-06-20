import {
  FaMapMarkedAlt,
  FaBoxOpen,
  FaTruckMoving,
  FaThumbsUp,
} from "react-icons/fa";

const steps = [
  {
    icon: <FaMapMarkedAlt className="text-4xl text-orange-500" />,
    title: "Booking Pick & Drop",
    description:
      "Choose your pickup and drop location to book your delivery instantly.",
  },
  {
    icon: <FaBoxOpen className="text-4xl text-orange-500" />,
    title: "Package Handling",
    description: "Our team ensures safe and secure handling of your items.",
  },
  {
    icon: <FaTruckMoving className="text-4xl text-orange-500" />,
    title: "Fast Delivery",
    description: "Experience ultra-fast delivery with real-time tracking.",
  },
  {
    icon: <FaThumbsUp className="text-4xl text-orange-500" />,
    title: "Delivered with Care",
    description: "We deliver on time with extra care and full satisfaction.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-16 text-center px-4">
      <h2 className="text-4xl font-bold mb-12 text-neutral">How It Works</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {steps.map((step, index) => (
          <div
            key={index}
            className="card shadow-lg bg-white p-6 rounded-xl hover:shadow-xl transition"
          >
            <div className="mb-4 flex justify-center">{step.icon}</div>
            <h3 className="text-xl font-semibold text-neutral mb-2">
              {step.title}
            </h3>
            <p className="text-sm text-gray-600">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
