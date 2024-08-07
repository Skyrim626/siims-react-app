import React, { useState } from "react";

// Import Image
import coverImage from "../../assets/images/cover-image-default.svg";
import profileImage from "../../assets/images/profile-image.svg";

// Import Components
import Section from "../../components/atoms/Section";
import Heading from "../../components/atoms/Heading";
import Button from "../../components/atoms/Button";
import { Pencil } from "lucide-react";
import Input from "../../components/atoms/Input";
import TextFormField from "../../components/molecules/TextFormField";
import Select from "../../components/atoms/Select";

export default function ChairpersonSettings() {
  // States for Profile
  const [coverPhoto, setCoverPhoto] = useState(coverImage);
  const [profilePhoto, setProfilePhoto] = useState(profileImage);

  const [selectedOption, setSelectedOption] = useState("");

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };
  return (
    <>
      <div className="px-4">
        <Section>
          <Heading level={2} text={"Settings"} />
          <p>Edit your details here</p>
        </Section>

        <Section>
          {/* Cover Photo */}
          <img src={coverPhoto} alt="cover-photo" className="w-screen" />
        </Section>
        <Section className="mt-4 flex gap-3">
          <img src={profilePhoto} alt="profile-photo" />
          <div className="flex flex-col items-start justify-center gap-3">
            <Button
              isLink
              to="/chairperson/settings"
              className="font-bold flex items-center text-white py-2 px-3 border-2 border-transparent rounded-md gap-2 bg-blue-800 hover:bg-blue-900 transition"
            >
              <Pencil size={20} />
              Change Cover
            </Button>
            <Button
              isLink
              to="/chairperson/settings"
              className="font-bold flex items-center text-white py-2 px-3 border-2 border-transparent rounded-md gap-2 bg-blue-800 hover:bg-blue-900 transition"
            >
              <Pencil size={20} />
              Change Profile
            </Button>
          </div>
        </Section>

        <Section className="flex flex-col gap-3">
          <div className="input-group | grid grid-cols-3 gap-2">
            <TextFormField
              label={"First Name"}
              placeholder="Enter new first name"
              value={"John"}
              labelColor="text-gray-700"
            />
            <TextFormField
              label={"Middle Name"}
              placeholder="Enter new middle name"
              value={"Gabriel"}
              labelColor="text-gray-700"
            />
            <TextFormField
              label={"Last Name"}
              placeholder="Enter new last name"
              value={"Doe"}
              labelColor="text-gray-700"
            />
          </div>
          <div className="input-group | grid grid-cols-3 gap-2">
            <TextFormField
              label={"ID Number"}
              placeholder=""
              value={"2021301502"}
              labelColor="text-gray-700"
              readOnly
            />
            <TextFormField
              label={"Contact Email"}
              placeholder=""
              value={"johnDoe@email.com"}
              labelColor="text-gray-700"
              readOnly
            />
            <TextFormField
              label={"Phone Number"}
              placeholder="Enter new phone number"
              value={"+0 987 654 3210"}
              labelColor="text-gray-700"
            />
          </div>
          <div className="input-group | grid grid-cols-2 gap-2">
            <TextFormField
              label={"Department"}
              placeholder=""
              value={"College of Information Technology and Computing"}
              labelColor="text-gray-700"
              readOnly
            />

            {/* <Select
              options={[
                { value: "male", label: "Male" },
                { value: "female", label: "Female" },
                { value: "other", label: "Other" },
              ]}
              label="Gender"
              name="genderSelect"
              value={selectedOption}
              onChange={handleSelectChange}
            /> */}
          </div>
        </Section>

        <Section className="my-4 flex items-center justify-end gap-3">
          <Button className="bg-blue-800 hover:bg-blue-900 transition py-3 px-4 rounded-md text-white font-bold">
            Save Changes
          </Button>
        </Section>
      </div>
    </>
  );
}
