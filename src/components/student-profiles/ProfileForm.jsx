import React from "react";
import FormField from "./FormField";

const ProfileForm = ({ user, setUser }) => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
    <div className="space-y-6">
      <div className="text-lg font-medium text-gray-700">Basic Information</div>
      {["first_name", "middle_name", "last_name", "email", "phone_number"].map(
        (field) => (
          <FormField
            key={field}
            label={field.replace("_", " ").toUpperCase()}
            name={field}
            value={user[field]}
            onChange={(e) => setUser({ ...user, [field]: e.target.value })}
          />
        )
      )}
    </div>

    <div className="space-y-6">
      <div className="text-lg font-medium text-gray-700">Address</div>
      {[
        "street",
        "barangay",
        "city_municipality",
        "province",
        "postal_code",
      ].map((field) => (
        <FormField
          key={field}
          label={field.replace("_", " ").toUpperCase()}
          name={field}
          value={user[field]}
          onChange={(e) => setUser({ ...user, [field]: e.target.value })}
        />
      ))}
      <FormField
        label="Gender"
        name="gender"
        value={user.gender}
        onChange={(e) => setUser({ ...user, gender: e.target.value })}
      />
    </div>
  </div>
);

export default ProfileForm;
