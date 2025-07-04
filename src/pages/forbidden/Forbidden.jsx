import { Link } from "react-router";
import { FaLock } from "react-icons/fa";

const Forbidden = () => {
  return (
    <div className="flex flex-col items-center justify-center  bg-gray-100 px-4 text-center mt-10">
      <FaLock className="text-red-500 text-6xl mb-4" />
      <h1 className="text-5xl font-bold text-gray-800 mb-2">403</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Access Forbidden</h2>
      <p className="text-gray-600 mb-6">
        You don’t have permission to view this page.
      </p>
      <Link
        to="/"
        className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default Forbidden;
