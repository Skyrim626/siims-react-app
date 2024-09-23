import React, { useState } from "react";
import Page from "../../components/common/Page";
import Section from "../../components/common/Section";
import Heading from "../../components/common/Heading";
import Text from "../../components/common/Text";
import coverPhoto from "../../assets/images/dean/dean-cover-photo.jpg";
import profilePhoto from "../../assets/images/dean/dean-profile-photo.jpg";
import { MapPin } from "lucide-react";

const DeanProfilePage = () => {
  const [user, setUser] = useState();

  return (
    <>
      <Page>
        <Section>
          <Heading level={3} text={"Profile"} />
          <Text className="text-sm text-blue-950">
            This is where you manage your profile.
          </Text>
          <hr className="my-3" />
        </Section>

        <Section>
          <div className="w-full h-[320px]">
            <img
              src={coverPhoto}
              alt="Cover Photo"
              className="object-cover w-full h-full rounded-t-md"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div>
                <div>
                  <img
                    src={profilePhoto}
                    alt="Company Profile Photo"
                    className="w-[180px] h-[150px] border-white object-cover rounded-b-md"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                {/* <Text className="text-xl font-bold">
                  {company.company_name}
                </Text> */}

                <div className="flex items-center text-sm">
                  <MapPin />
                  {/*  <Text className="font-bold">{fullAddress}</Text> */}
                </div>
              </div>
            </div>
          </div>
        </Section>
      </Page>
    </>
  );
};

export default DeanProfilePage;
