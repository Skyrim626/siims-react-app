import React from "react";
import { getProfileImage } from "../../../utils/imageHelpers";
import Text from "../../../components/common/Text";
import RoleBasedView from "../../../components/common/RoleBasedView";

const ProfileImagePresenter = ({
  first_name = "",
  middle_name = "",
  last_name = "",
  profile_image_url = "",
  authorizeRole,
}) => {
  close;
  return (
    <div className="flex items-center gap-6 bg-opacity-80 px-6 py-4 rounded-lg">
      <div className="flex items-center gap-6 bg-opacity-80 px-6 py-4 rounded-lg">
        <img
          src={getProfileImage(profile_image_url)} // Use external default profile image URL
          alt={`${authorizeRole} Profile`}
          className="w-32 h-32 object-cover rounded-full border-4 border-white shadow-md"
        />
        <div className="text-gray-900">
          <h1 className="text-3xl font-semibold">
            {`${first_name} ${middle_name} ${last_name}`}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default ProfileImagePresenter;
