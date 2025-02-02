import Text from "../components/common/Text";

// Render Profile Header (For Self)
export const renderSelfProfileHeader = ({ authorizeRole, profile }) => {
  const renderFullName = () => {
    return (
      <h1 className="text-3xl font-semibold">
        {profile.first_name ?? ""} {profile.middle_name ?? ""}{" "}
        {profile.last_name ?? ""}
      </h1>
    );
  };

  switch (authorizeRole) {
    case "dean":
      return (
        <>
          {renderFullName()}
          <Text className="text-sm text-gray-600 font-bold">
            Dean of the {profile.college || "College of Science"}
          </Text>
        </>
      );
    case "chairperson":
      return (
        <>
          {renderFullName()}
          <Text className="text-sm text-gray-600 font-bold">
            Chairperson of the {profile.college || "College of Science"}
          </Text>
        </>
      );
    case "coordinator":
      return (
        <>
          {renderFullName()}
          <div className="flex flex-col">
            {/* College */}
            <Text className="text-sm text-gray-600 font-bold">
              {profile.college || "College of Science"}
            </Text>
            {/* Program */}
            <Text className="text-sm text-gray-600 font-bold">
              {profile.program || "No Program"}
            </Text>
          </div>
        </>
      );
    case "supervisor":
      return (
        <>
          {renderFullName()}
          <Text className="text-sm text-gray-600 font-bold">
            {profile.company || "Company of Science"}
          </Text>
        </>
      );
    case "student":
      return <>{renderFullName()}</>;
  }
};

// Render Profile Header (For Viewing)
export const renderProfileHeader = ({ viewingUser, profile }) => {
  switch (viewingUser) {
    case "company":
      return (
        <h1 className="text-xl font-semibold max-w-2xl">{profile.name}</h1>
      );
    case "dean":
      return (
        <>
          <h1 className="text-3xl font-semibold">
            {profile.first_name && `${profile.first_name} ${profile.last_name}`}
          </h1>
          <Text className="text-sm text-gray-600 font-bold">
            Dean of the {profile.college_name || "College of Science"}
          </Text>
        </>
      );
    case "chairperson":
      return (
        <>
          <h1 className="text-3xl font-semibold">
            {profile.first_name && `${profile.first_name} ${profile.last_name}`}
          </h1>
          <div className="flex flex-col">
            {/* Program */}
            <Text className="text-sm text-gray-600 font-bold">
              {profile.program || "No Program"}
            </Text>
          </div>
        </>
      );
    case "coordinator":
      return (
        <>
          <h1 className="text-3xl font-semibold">
            {profile.first_name && `${profile.first_name} ${profile.last_name}`}
          </h1>
          <div className="flex flex-col">
            {/* College */}
            <Text className="text-sm text-gray-600 font-bold">
              {profile.college_name || "College of Science"}
            </Text>
            {/* Program */}
            <Text className="text-sm text-gray-600 font-bold">
              {profile.program || "No Program"}
            </Text>
          </div>
        </>
      );
    case "student":
      return (
        <>
          <h1 className="text-3xl font-semibold">
            {`${profile.first_name} ${profile.middle_name} ${profile.last_name}`}
          </h1>
        </>
      );
    default:
      // Default fallback
      return <p>No profile information available for this user.</p>;
  }
};
