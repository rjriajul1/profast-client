import React from "react";
import { NavLink, Outlet } from "react-router";
import Logo from "../pages/shared/logo/Logo";
import {
  FaBoxOpen,
  FaMoneyCheckAlt,
  FaSearchLocation,
  FaUserEdit,
  FaUserClock,
  FaMotorcycle,
  FaUserShield,
  FaUserPlus,
} from "react-icons/fa";
import useUserRole from "../hooks/useUserRole";

const DashboardLayout = () => {
  const { role, isLoading } = useUserRole();

  return (
    <div
      data-aos="fade-right"
      className="drawer lg:drawer-open max-w-[1600px] mx-auto lg:px-4"
    >
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="navbar bg-base-300 w-full lg:hidden">
          <div className="flex-none  lg:hidden">
            <label
              htmlFor="my-drawer-2"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
        </div>
        <div className="px-3 py-4">
          <Outlet></Outlet>
        </div>
      </div>

      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          {/* Sidebar content here */}
          <div>
            <Logo></Logo>
          </div>
          <div className="mt-6 ">
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-500 underline text-xl font-semibold flex items-center gap-2"
                    : "text-xl font-semibold flex items-center gap-2"
                }
                to="/dashboard/myParcels"
              >
                <FaBoxOpen /> My Parcels
              </NavLink>
            </li>

            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-500 underline text-xl font-semibold flex items-center gap-2"
                    : "text-xl font-semibold flex items-center gap-2"
                }
                to="/dashboard/paymentHistory"
              >
                <FaMoneyCheckAlt /> Payment History
              </NavLink>
            </li>

            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-500 underline text-xl font-semibold flex items-center gap-2"
                    : "text-xl font-semibold flex items-center gap-2"
                }
                to="/dashboard/track"
              >
                <FaSearchLocation /> Track a Parcel
              </NavLink>
            </li>

            {/* rider link  */}
            {!isLoading && role === "admin" && (
              <>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "text-blue-500 underline text-xl font-semibold flex items-center gap-2"
                        : "text-xl font-semibold flex items-center gap-2"
                    }
                    to="/dashboard/assignRider"
                  >
                     <FaUserPlus /> Assign Rider
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "text-blue-500 underline text-xl font-semibold flex items-center gap-2"
                        : "text-xl font-semibold flex items-center gap-2"
                    }
                    to="/dashboard/pendingRider"
                  >
                    <FaUserClock /> Pending Rider
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "text-blue-500 underline text-xl font-semibold flex items-center gap-2"
                        : "text-xl font-semibold flex items-center gap-2"
                    }
                    to="/dashboard/activeRider"
                  >
                    <FaMotorcycle /> Active Rider
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "text-blue-500 underline text-xl font-semibold flex items-center gap-2"
                        : "text-xl font-semibold flex items-center gap-2"
                    }
                    to="/dashboard/makeAdmin"
                  >
                    <FaUserShield /> Make Admin
                  </NavLink>
                </li>
              </>
            )}

            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-500 underline text-xl font-semibold flex items-center gap-2"
                    : "text-xl font-semibold flex items-center gap-2"
                }
                to="/dashboard/profile"
              >
                <FaUserEdit /> Update Profile
              </NavLink>
            </li>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
