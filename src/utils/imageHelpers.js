// Import images
import emptyCoverImage from "../assets/images/profiles/empty-cover-image.png";
import emptyProfileImage from "../assets/images/profiles/empty-profile-image.png";
import emptyCompanyLogoImage from "../assets/images/profiles/empty-company-logo-image.png";

// Assign default images only if there's no profile data
export const getCoverImage = (coverImageUrl) =>
  coverImageUrl || emptyCoverImage;

export const getProfileImage = (profileImageUrl) =>
  profileImageUrl || emptyProfileImage;

export const getLogoImage = (logoImageUrl) =>
  logoImageUrl || emptyCompanyLogoImage;
