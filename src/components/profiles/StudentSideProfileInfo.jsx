import { GraduationCap, Phone, UserCircle2 } from "lucide-react";
import React from "react";
import Text from "../common/Text";
import { getFullAddress } from "../../utils/formatAddress";

const StudentSideProfileInfo = ({ profile }) => {
  return (
    <div>
      <div className="grid grid-cols-9 gap-5">
        <div className="col-span-3">
          <div className="flex items-center gap-3">
            <GraduationCap size={25} />
            <Text className="text-lg font-semibold">Current Education</Text>
          </div>

          {/* Current Educations */}
          <div className="flex flex-col gap-2 mt-2">
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

        <div className="col-span-3">
          <div className="flex items-center gap-3">
            <Phone size={25} />
            <Text className="text-lg font-semibold">Contact</Text>
          </div>

          {/* Current Educations */}
          <div className="flex flex-col gap-2 mt-2">
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
          </div>
        </div>

        <div className="col-span-3">
          <div className="flex items-center gap-3">
            <UserCircle2 size={25} />
            <Text className="text-lg font-semibold">Coordinator</Text>
          </div>

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

      {/*  Border Line */}
      <div className="border-b-2 border-b-gray-900 w-full h-1 my-3"></div>
    </div>
  );
};

export default StudentSideProfileInfo;
