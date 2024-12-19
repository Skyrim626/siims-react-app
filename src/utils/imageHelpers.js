// Assign default images only if there's no profile data
export const getCoverImage = (coverImageUrl) =>
  coverImageUrl || "https://via.placeholder.com/1500x500/cccccc/ffffff?text=Cover+Image";

export const getProfileImage = (profileImageUrl) =>
  profileImageUrl || "https://via.placeholder.com/150/cccccc/ffffff?text=Profile+Image";
