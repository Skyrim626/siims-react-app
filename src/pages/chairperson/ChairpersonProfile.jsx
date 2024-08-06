import React, { useState } from "react";

// Import Image
import coverImage from "../../assets/images/cover-image-default.svg";
import profileImage from "../../assets/images/profile-image.svg";

// Import Components
import Section from "../../components/atoms/Section";
import { MapPin, Pencil } from "lucide-react";
import Button from "../../components/atoms/Button";
import Page from "../../components/atoms/Page";

export default function ChairpersonProfile() {
  // States for Profile
  const [coverPhoto, setCoverPhoto] = useState(coverImage);
  const [profilePhoto, setProfilePhoto] = useState(profileImage);

  return (
    <>
      <Page className="px-0">
        {/* Cover Photo */}
        <img
          src={coverPhoto}
          alt="cover-photo"
          className="w-full rounded-br-lg"
        />
        <Section className="flex justify-between">
          <div className="flex items-center justify-start gap-3">
            <img src={profilePhoto} alt="profile-image" />
            <div className="flex flex-col items-start space-y-2">
              <p className="name | font-bold text-xl">John Doe</p>
              <div className="location | flex items-start justify-start gap-1 font-bold">
                <MapPin className="location__icon" size={20} />
                <p className="location__title">
                  432 Main Street, Central Office, Pampanga, 1234567
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3 flex-1 ">
            <Button className="bg-transparent border-2 py-2 px-3 rounded-md border-blue-800 text-blue-800 font-bold transition hover:bg-blue-900 hover:border-blue-900 hover:text-white">
              See Public View
            </Button>
            <Button
              isLink
              to="/chairperson/settings"
              className="font-bold flex items-center text-white py-2 px-3 border-2 border-transparent rounded-md gap-2 bg-blue-800 hover:bg-blue-900 transition"
            >
              <Pencil size={20} />
              Edit Profile
            </Button>
          </div>
        </Section>

        <Section className="mt-4 ml-4">
          <p>
            Email Us: <span className="font-bold">johndoe@email.com</span>
          </p>
          <p>
            Contact Us: <span className="font-bold">+0 987 654 3210</span>
          </p>
          <p>
            Gender: <span className="font-bold">Male</span>
          </p>
        </Section>
      </Page>
    </>
  );
}
