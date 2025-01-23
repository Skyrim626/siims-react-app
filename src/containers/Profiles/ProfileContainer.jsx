import React, { useEffect, useRef, useState } from "react";

import { useReactToPrint } from "react-to-print";
import { getProfile } from "./Api";
import NotFoundPage from "../../pages/NotFoundPage";
import Loader from "../../components/common/Loader";
import SelfProfilePresenter from "./SelfProfilePresenter";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setProfileValues } from "./_redux/profileSlice";

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

  /**
   *
   *
   *
   * REDUX
   *
   *
   */
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);
  // const [profile, setProfile] = useState({});

  /**
   *
   *
   * FETCHING
   *
   *
   *
   */

  const fetchProfile = async () => {
    // Set Loading State
    setLoading(true);

    try {
      const response = await getProfile({
        authorizeRole: authorizeRole,
        status: method,
      });

      if (response) {
        setLoading(false);
        console.log(response);
        dispatch(setProfileValues(response));
        // setProfile(response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // Check Loading
  if (loading || !profile) {
    return <Loader loading={loading} />;
  }

  // console.log(profile);

  // For Self
  if (method === "self") {
    return (
      <SelfProfilePresenter
        authorizeRole={authorizeRole}
        location={location}
        handlePrint={handlePrint}
        profile={profile}
        componentRef={componentRef}
      />
    );
  }

  return <NotFoundPage />;
};

export default ProfileContainer;
