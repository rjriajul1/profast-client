import {
  FaClock,
  FaMapMarkedAlt,
  FaWarehouse,
  FaMoneyBillWave,
  FaBuilding,
  FaUndoAlt,
} from "react-icons/fa";

const services = [
  {
    icon: <FaClock className="text-4xl text-orange-500 mb-4" />,
    title: "Express & Standard Delivery",
    description:
      "We deliver parcels within 24–72 hours in major cities. Express delivery in Dhaka within 4–6 hours.",
  },
  {
    icon: <FaMapMarkedAlt className="text-4xl text-orange-500 mb-4" />,
    title: "Nationwide Delivery",
    description:
      "Parcels delivered to all districts within 48–72 hours with home delivery everywhere.",
  },
  {
    icon: <FaWarehouse className="text-4xl text-orange-500 mb-4" />,
    title: "Fulfillment Solution",
    description:
      "We offer inventory management, online order processing, packaging, and after-sales support.",
  },
  {
    icon: <FaMoneyBillWave className="text-4xl text-orange-500 mb-4" />,
    title: "Cash on Home Delivery",
    description:
      "100% cash on delivery anywhere in Bangladesh with guaranteed product safety.",
  },
  {
    icon: <FaBuilding className="text-4xl text-orange-500 mb-4" />,
    title: "Corporate Logistics Service",
    description:
      "Customized logistics services for companies, including warehousing and inventory management.",
  },
  {
    icon: <FaUndoAlt className="text-4xl text-orange-500 mb-4" />,
    title: "Parcel Return",
    description:
      "Our reverse logistics allows customers to return or exchange items easily with online merchants.",
  },
];

const OurServices = () => {
  return (
    <section className="py-16 bg-[#03373D] my-6 rounded-2xl px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-white mb-4">Our Service</h2>
        <p className="text-gray-300 max-w-2xl mx-auto mb-10">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.
        </p>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={index}
                className={`card bg-white p-6 rounded-xl shadow-md hover:bg-[#CAEB66] transition-colors duration-300
               flex flex-col items-center text-center`}
            >
              {service.icon}
              <h3 className="text-xl font-semibold text-neutral mb-2">{service.title}</h3>
              <p className="text-sm text-gray-700">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurServices;
