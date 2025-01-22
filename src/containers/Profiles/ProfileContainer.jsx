import React, { useEffect, useRef, useState } from "react";

import { useReactToPrint } from "react-to-print";
import { getProfile } from "./Api";
import NotFoundPage from "../../pages/NotFoundPage";
import Loader from "../../components/common/Loader";
import SelfProfilePresenter from "./SelfProfilePresenter";
import { useLocation } from "react-router-dom";

const ProfileContainer = ({ authorizeRole, method }) => {
  /**
   *
   *
   * LOCATION
   *
   *
   */
  const location = useLocation();

  /**
   *
   *
   *
   * FOR PRINTING PURPOSES
   *
   *
   */
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    documentTitle: `${authorizeRole} Profile`,
    contentRef: componentRef,
  });

  /**
   *
   *
   * LOADING STATIE
   *
   *
   */
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({});

  /**
   *
   *
   * FETCHING
   *
   *
   *
   */

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    // Set Loading State
    setLoading(true);

    try {
      const response = await getProfile({
        authorizeRole: authorizeRole,
        status: method,
      });

      console.log(response);
      setProfile(response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Check Loading
  if (loading) {
    return <Loader loading={loading} />;
  }

  // For Self
  if (method === "self") {
    return (
      <SelfProfilePresenter
        authorizeRole={authorizeRole}
        cover_image_url={profile.cover_image_url}
        first_name={profile.first_name}
        middle_name={profile.middle_name}
        last_name={profile.last_name}
        profile_image_url={profile.profile_image_url}
        location={location}
      />
    );
  }

  return <NotFoundPage />;
};

export default ProfileContainer;
