import React from "react";
import Page from "../../components/common/Page";
import Header from "./components/Header";
import ProfileImagePresenter from "./components/ProfileImagePresenter";
import { Download, Edit, Plus } from "lucide-react";
import { Button } from "@headlessui/react";
import { Link } from "react-router-dom";
import Text from "../../components/common/Text";
import RoleBasedView from "../../components/common/RoleBasedView";
import MainContainer from "./components/MainContainer";
import { useSelector } from "react-redux";

import "../../css/print.css";

const SelfProfilePresenter = ({
  /** Role Authorize */
  authorizeRole,

  /** use ref props */
  componentRef,

  location,
  handlePrint,

  profile = {},
}) => {
  // console.log(profile);

  return (
    <Page className="bg-gray-100">
      {/* Header Section */}
      <Header cover_image_url={profile.cover_image_url} />

      {/* Profile Information Section */}
      <div ref={componentRef}>
        <div className="flex items-center justify-between w-full bg-white shadow-lg">
          <ProfileImagePresenter
            first_name={profile.first_name ?? ""}
            middle_name={profile.middle_name ?? ""}
            last_name={profile.last_name ?? ""}
            profile_image_url={profile.profile_image_url}
            authorizeRole={authorizeRole}
          />

          <div className="flex gap-2 justify-end px-3">
            <Link
              to={`${location.pathname}/edit`}
              state={{
                id: profile.id,
                profile: profile,
              }}
            >
              <Button className="download-profile-section | whitespace-nowrap  flex items-center gap-2 px-4 py-2 border rounded-sm text-gray-700 border-gray-300 hover:bg-gray-100">
                <Edit size={20} />
                <Text>Edit Profile</Text>
              </Button>
            </Link>

            {/* For Company and Admin Only */}
            <RoleBasedView
              authorizeRole={authorizeRole}
              roles={["company", "admin"]}
            >
              <Link to="/auth/company/offices/add">
                <Button className="whitespace-nowrap flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-sm hover:bg-blue-700">
                  <Plus size={20} />
                  <Text>Add Office</Text>
                </Button>
              </Link>
            </RoleBasedView>

            {/* Action Buttons (Export Profile): EVERYONE */}
            <div className="flex gap-2 justify-end px-3">
              <Button
                onClick={() => handlePrint()}
                className="download-profile-section | whitespace-nowrap  flex items-center gap-2 px-4 py-2 border rounded-sm text-gray-700 border-gray-300 hover:bg-gray-100"
              >
                <Download size={20} />
                <Text>Download Profile</Text>
              </Button>
            </div>
          </div>
        </div>

        {/* Main Information Section */}
        <MainContainer authorizeRole={authorizeRole} profile={profile} />
      </div>
    </Page>
  );
};

export default SelfProfilePresenter;
