// Libraries
import React, { createContext, useState } from "react";

// Assets
import companyLogo from "../../assets/images/logo.svg";

// Icons
import {
  ChevronFirst,
  ChevronLast,
  LogOut,
  MoreVertical,
  UserCog,
} from "lucide-react";

/**
 * Components
 */
// Headless UI Components
import { Button } from "@headlessui/react";

import Text from "../common/Text";
import { useAuth } from "../../hooks/useAuth";
import { NavLink } from "react-router-dom";

// Create and Export Contexts
// * Purpose: To provide the current state of sidebar expansion to child components
export const SidebarContext = createContext();

/**
 * Sidebar Component
 *
 * A sidebar layout that includes a company logo, a toggle button to expand/collapse the sidebar,
 * and user profile information. The component uses context to share the expanded/collapsed state
 * of the sidebar with its child components.
 *
 * - `logo`: The logo image to be displayed at the top of the sidebar (default is the imported `companyLogo`).
 * - `children`: The content of the sidebar, typically a list of navigation items.
 *
 * The sidebar supports a collapsible feature, where the logo and user information are shown or hidden
 * based on the expansion state. It also includes a button to toggle the expansion state and an area for user details.
 *
 * @param {Object} props - The component props.
 * @param {string} [props.logo=companyLogo] - The logo image source.
 * @param {React.ReactNode} props.children - The sidebar items to be rendered.
 * @returns {JSX.Element} - The sidebar layout with a toggle feature and user information.
 */
export default function Sidebar({
  withLogo = true,
  logo = companyLogo,
  children,
  name = "no name",
  email = "no email",
  bgColor = "bg-gray-900",
}) {
  // Manage the sidebar's expanded/collapsed state
  const [expanded, setExpanded] = useState(true);

  // console.log(roles);

  // Auth logout
  const { logout, roles } = useAuth();

  return (
    <aside className="h-screen">
      <nav className={`h-full flex flex-col ${bgColor} border-r shadow-sm`}>
        <div
          className={`p-4 pb-2 flex items-center ${
            withLogo ? "justify-between" : "justify-end"
          }`}
        >
          {/* Allow Display Logo */}
          {withLogo && (
            <img
              src={logo}
              className={`overflow-hidden transition-all ${
                expanded ? "w-32" : "w-0"
              }`}
              alt="Company Logo"
            />
          )}

          <Button
            type="button"
            onClick={() => setExpanded((current) => !current)}
            className="p-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white "
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </Button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">
            {children}

            {roles.length > 1 && (
              <NavLink
                to={"/auth"}
                className={`mt-10 relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group hover:bg-blue-700 text-gray-50`}
              >
                <UserCog size={20} />

                <Text
                  className={`overflow-hidden transition-all ${
                    expanded ? "w-52 ml-3" : "w-0"
                  }`}
                >
                  Switch Role
                </Text>
              </NavLink>
            )}
          </ul>
        </SidebarContext.Provider>

        <div className="border-t flex p-3">
          <div className="rounded-sm h-full bg-blue-300 flex items-center justify-center px-2">
            <Text className="font-bold tracking-wider">JD</Text>
          </div>
          <div
            className={`flex justify-between items-center overflow-hidden transition-all ${
              expanded ? "w-52 ml-3" : "w-0"
            }`}
          >
            <div className="leading-4 text-gray-50">
              <h4 className="font-semibold">{name}</h4>
              <span className="text-xs">{email}</span>
            </div>

            <Button onClick={logout} className="" type="submit">
              <LogOut
                className="transition text-white cursor-pointer hover:text-blue-500"
                size={20}
              />
            </Button>
          </div>
        </div>
      </nav>
    </aside>
  );
}
