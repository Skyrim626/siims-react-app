import React from "react";
import SectionCard from "./SectionCard";
import Text from "../common/Text";
import { getFullAddress } from "../../utils/formatAddress";

const ContactInformationSection = ({ title = "Contact Information", user }) => {
  return (
    <SectionCard title={title}>
      <div className="flex flex-col">
        <Text>
          <strong>Email:</strong> {user.email}
        </Text>
        <Text>
          <strong>Phone:</strong> {user.phone_number}
        </Text>
        <Text>
          <strong>Address:</strong>{" "}
          {getFullAddress({
            street: user.street,
            barangay: user.barangay,
            province: user.province,
            city: user.city_municipality,
            postalCode: user.postal_code,
          })}
        </Text>
      </div>
    </SectionCard>
  );
};

export default ContactInformationSection;
