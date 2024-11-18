import React from "react";
import { Link, useLocation } from "react-router-dom";
import Text from "../../common/Text";
import { Phone, MapPin, Calendar } from "lucide-react";

const CompanyOffice = ({ office }) => {
  // Open Location
  const location = useLocation();

  // console.log(office);

  return (
    <>
      <div className="bg-white rounded-md shadow-md h-full flex flex-col justify-between">
        {/* Header Section */}
        <div className="p-6 border-b">
          <div className="flex flex-col gap-2">
            <Text className="text-gray-500 text-sm uppercase">
              {office.office_type}
            </Text>
            <Text className="text-2xl font-semibold text-gray-900 overflow-hidden text-ellipsis whitespace-nowrap max-w-full">
              {office.name}
            </Text>
            <Text
              className={`text-sm uppercase ${
                office.supervisor_name ? "bg-green-500" : "bg-red-500"
              } text-white w-fit p-1 rounded-md`}
            >
              {office.supervisor_name
                ? office.supervisor_name
                : "No supervisor"}
            </Text>
            <div className="flex items-center gap-2 text-blue-600 mt-3">
              <Phone size={18} />
              <Text className="text-lg font-medium">{office.phone_number}</Text>
            </div>
          </div>
        </div>

        {/* Office Information Table */}
        <div className="p-6 flex-grow">
          <table className="w-full text-left text-gray-700">
            <tbody>
              {/* Created and Updated At */}
              <tr className="border-b">
                <td className="py-4 font-medium text-sm w-1/3">
                  <Calendar size={16} className="inline mr-2" />
                  Created:
                </td>
                <td className="py-4 text-sm">{office.created_at}</td>
              </tr>
              <tr className="border-b">
                <td className="py-4 font-medium text-sm w-1/3">
                  <Calendar size={16} className="inline mr-2" />
                  Updated:
                </td>
                <td className="py-4 text-sm">{office.updated_at}</td>
              </tr>
              {/* Full Address */}
              <tr className="border-b">
                <td className="py-4 font-medium text-sm w-1/3">
                  <MapPin size={16} className="inline mr-2" />
                  Full Address:
                </td>
                <td className="py-4 text-sm">{office.full_address}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Footer: View Office Link */}
        <div className="bg-gray-50 p-4 text-center">
          <Link
            to={`${location.pathname}/${office.id}`}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-md text-center text-sm font-semibold inline-block transition-all duration-200 w-full"
          >
            View Office Details
          </Link>
        </div>
      </div>
    </>
  );
};

export default CompanyOffice;
