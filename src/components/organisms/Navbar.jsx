import { useState } from "react";
import { useLocation, NavLink } from "react-router-dom";
import { Search, Bell } from "lucide-react";
import logo from "../../assets/images/logo.svg";

const Navbar = ({ links }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center sticky top-0 z-50">
      <div className="flex items-center gap-3">
        {/* Left section: Logo */}
        <div>
          <img src={logo} alt="LinkedIn Logo" width={120} />
        </div>

        {/* Middle section: Search bar */}
        <div className="flex items-center bg-gray-200 p-2 rounded-md">
          <Search className="w-5 h-5 text-gray-600" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent outline-none pl-2 text-gray-700"
          />
        </div>
      </div>

      {/* Right section: Navigation icons */}
      <div className="flex items-center space-x-6 text-gray-600">
        {links.map(
          ({ icon, text, path, ariaLabel, display, hidden }, index) => {
            // Only for student
            if (hidden && hidden()) {
              return null;
            }

            return (
              <NavLink
                key={index}
                to={path}
                aria-label={ariaLabel}
                className={`flex flex-col items-center hover:text-blue-600 cursor-pointer ${
                  location.pathname === path ? "text-blue-600" : ""
                }`}
              >
                {icon}
                <span className="text-xs">{text}</span>
              </NavLink>
            );
          }
        )}

        {/* Profile section with dropdown */}
        <div className="relative flex items-center space-x-2">
          <img
            src="/profile-pic.jpg"
            alt="Profile"
            className="w-8 h-8 rounded-full cursor-pointer"
            onClick={toggleDropdown}
          />
          <span
            className="hidden md:block text-sm font-semibold cursor-pointer"
            onClick={toggleDropdown}
          >
            Me
          </span>

          {/* Dropdown */}
          {dropdownOpen && (
            <div className="absolute top-8 right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10">
              <ul className="py-1">
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Profile
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Settings & Privacy
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Sign Out
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
