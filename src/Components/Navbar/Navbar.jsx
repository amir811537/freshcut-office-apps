/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const navItems = [
    { path: "", label: "Home" },
    { path: "todayscall", label: "Due Persons" },
    { path: "attendance", label: "Attendance" },
    { path: "update", label: "Update" },
  ];

  return (
    <nav className="bg-green-400 border-gray-200 py-2.5 dark:bg-gray-900 fixed top-0 w-full z-50">
      <div className="flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto">
        <NavLink to="/" className="flex items-center">
          <img src="https://i.ibb.co.com/HT4zS4SM/logo-removebg-preview.png" className="h-6 mr-3 sm:h-9" alt="CMS logo" />
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            Fresh Cut
          </span>
        </NavLink>

        {/* Mobile Toggle Button */}
        <div className="flex items-center lg:order-2">
          <button
            onClick={toggleDrawer}
            type="button"
            className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="mobile-menu"
            aria-expanded={isDrawerOpen}
          >
            <span className="sr-only">Open main menu</span>
            {isDrawerOpen ? (
              <RiCloseLine className="w-6 h-6" />
            ) : (
              <RiMenu3Line className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Nav Links */}
        <div
          className={`${
            isDrawerOpen ? "block" : "hidden"
          } items-center justify-between w-full lg:flex lg:w-auto lg:order-1`}
          id="mobile-menu"
        >
          <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
            {navItems.map(({ path, label }) => (
              <li key={path}>
                <NavLink
                  to={`/${path}`}
                  className={({ isActive }) =>
                    `block py-2 pl-3 pr-4 border-b border-gray-100 lg:border-0 lg:p-0 ${
                      isActive
                        ? "text-white bg-purple-700 rounded lg:bg-transparent lg:text-purple-700 dark:text-white"
                        : "text-gray-700 hover:bg-gray-50 lg:hover:bg-transparent lg:hover:text-purple-700 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                    }`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
