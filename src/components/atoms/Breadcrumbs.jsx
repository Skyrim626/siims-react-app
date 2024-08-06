import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Breadcrumbs({ breadcrumbs = [] }) {
  const location = useLocation();

  // /admin/users/add --> /admin | /users | /add

  let currentLink = "";

  const crumbs = location.pathname
    .split("/")
    .filter((crumb) => crumb !== "")
    .map((crumb, index) => {
      currentLink += `/${crumb}`;

      console.log(currentLink);

      return (
        <div key={index} className="crumb">
          <Link to={currentLink}>{crumb}</Link>
        </div>
      );
    });

  console.log(currentLink);
  return <></>;
}
