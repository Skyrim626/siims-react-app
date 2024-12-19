import { MapPin } from "lucide-react";
import React from "react";
import { getFullAddress } from "../../utils/formatAddress";
import Text from "../common/Text";

const AddressItem = ({ profile }) => {
  return (
    <div className="flex items-center gap-4 text-gray-700 mb-3">
      <MapPin size={20} className="text-blue-600" />
      <Text>
        {getFullAddress({
          street: profile.street,
          barangay: profile.barangay,
          city: profile.city_municipality,
          province: profile.province,
          postalCode: profile.postal_code,
        })}
      </Text>
    </div>
  );
};

export default AddressItem;
