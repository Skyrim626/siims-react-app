import { GraduationCap, Phone } from "lucide-react";
import React from "react";
import Text from "../common/Text";
import { getFullAddress } from "../../utils/formatAddress";

const StudentSideProfileInfo = ({ profile }) => {
  return (
    <div>
      <div className="flex items-start justify-start gap-1">
        <div>
          <GraduationCap size={25} />
        </div>

        <div className="flex flex-col items-start text-gray-900">
          <Text className="text-md font-semibold">Current Education</Text>

          {/* Current Educations */}
          <div className="flex flex-col gap-2 mt-2">
            {/* College */}
            <div className="flex flex-col">
              <Text className="text-sm font-bold">College</Text>

              <Text className="text-sm">
                {profile.college || "College of Science"}
              </Text>
            </div>
            {/* Program */}
            <div className="flex flex-col">
              <Text className="text-sm font-bold">Program</Text>

              <Text className="text-sm">{profile.program || "No Program"}</Text>
            </div>
          </div>
        </div>
      </div>

      {/*  Border Line */}
      <div className="border-b-2 border-b-gray-900 w-full h-1 my-3"></div>

      <div className="flex items-start justify-start gap-1">
        <div>
          <Phone size={25} />
        </div>

        <div className="flex flex-col items-start text-gray-900">
          <Text className="text-md font-semibold">Contact</Text>

          {/* Contact */}
          <div className="flex flex-col gap-2 mt-2">
            {/* Email */}
            <div className="flex flex-col">
              <Text className="text-sm font-bold">Email</Text>

              <Text className="text-sm">
                {profile.email ? (
                  <a
                    href={`mailto:${profile.email}`}
                    className="text-blue-500 hover:underline"
                  >
                    {profile.email}
                  </a>
                ) : (
                  "No email"
                )}
              </Text>
            </div>

            {/* Phone Number */}
            <div className="flex flex-col">
              <Text className="text-sm font-bold">Contact no.</Text>

              <Text className="text-sm">
                {profile.phone_number || "No Phone Number"}
              </Text>
            </div>

            {/* Address */}
            <div className="flex flex-col">
              <Text className="text-sm font-bold">Address</Text>

              <Text className="text-sm">
                {getFullAddress({
                  street: profile.street,
                  barangay: profile.barangay,
                  city: profile.city_municipality,
                  province: profile.province,
                  postalCode: profile.postal_code,
                })}
              </Text>
            </div>

            {/* Coordinator Info */}
            <div>
              <Text className="text-md font-bold mt-5">Coordinator Info</Text>

              {/* Coordinator Name */}
              <div className="flex flex-col">
                <Text className="text-sm font-bold">Name</Text>

                <Text className="text-sm">
                  {profile.coordinator_name || "No Coordinator"}
                </Text>
              </div>

              {/* Coordinator Email */}
              {profile.coordinator_email && (
                <div className="flex flex-col">
                  <Text className="text-sm font-bold">Email</Text>

                  <Text className="text-sm">
                    <a
                      href={`mailto:${profile.coordinator_email}`}
                      className="text-blue-500 hover:underline"
                    >
                      {profile.coordinator_email}
                    </a>
                  </Text>
                </div>
              )}

              {/* Coordinator Phone Number */}
              {profile.coordinator_phone_number && (
                <div className="flex flex-col">
                  <Text className="text-sm font-bold">Contact No.</Text>

                  <Text className="text-sm">
                    {profile.coordinator_phone_number}
                  </Text>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/*  Border Line */}
      <div className="border-b-2 border-b-gray-900 w-full h-1 my-3"></div>
    </div>
  );
};

export default StudentSideProfileInfo;
