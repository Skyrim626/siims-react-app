import { useState } from "react";
import { useLocation, NavLink } from "react-router-dom";
import { LogOut } from "lucide-react"; // Add LogOut icon import
import logo from "../../assets/images/logo.svg";

/**
 * Components
 */
// Headless UI Components
import { Button } from "@headlessui/react";
import { useAuth } from "../../hooks/useAuth";

const Navbar = ({ links }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Auth logout
  const { logout } = useAuth();

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center sticky top-0 z-50">
      <div className="flex items-center gap-3">
        {/* Left section: Logo */}
        <div>
          <img src={logo} alt="LinkedIn Logo" width={120} />
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

        {/* Logout button */}
        <button
          onClick={logout}
          aria-label="Logout"
          className="flex flex-col items-center text-gray-600 hover:text-red-600 cursor-pointer"
        >
          <LogOut size={20} />
          <span className="text-xs">Logout</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
