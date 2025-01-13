import React, { useEffect, useState } from "react";
import { getRequest } from "../../../api/apiHelpers";
import StudentSideProfileInfo from "../../../components/profiles/StudentSideProfileInfo";
import Loader from "../../../components/common/Loader";
import ProfileSidebar from "../../../components/dashboards/ProfileSidebar";
import JobListsSection from "../../../components/workPosts/JobListsSection";
import TestJobListsSection from "../../../components/workPosts/TestJobListsSection";
import CurrentApplication from "../../../components/applications/CurrentApplication";
import EmptyState from "../../../components/common/EmptyState";
import { useLocation, useNavigate } from "react-router-dom";
import ReportsSection from "../../../components/workPosts/ReportsSection";

const TestingHomePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // Loading State
  const [loading, setLoading] = useState(false);

  // Container State
  const [profile, setProfile] = useState({});

  // State
  const [studentStatusID, setStudentStatusID] = useState(0);
  const [latestApplication, setLatestApplication] = useState({});

  // Fetch State
  useEffect(() => {
    // Fetch Profile
    const fetchStudentProfile = async () => {
      // Set Loading State
      setLoading(true);

      try {
        const response = await getRequest({
          url: "/api/v1/homes/student",
        });

        if (response) {
          // console.log(response);
          setProfile(response);
          setStudentStatusID(response.student_status_id);
          setLatestApplication(response.latest_application);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    // Fetch Job Posts

    // * Call method
    fetchStudentProfile();
  }, []);

  /**
   * Fetch Job Posts
   *
   * Displays only if the student status ID is 1 (Not Yet Applied)
   */
  const displayJobs = ({ studentStatusID, coordinatorID }) => {
    return studentStatusID && studentStatusID === 1 && coordinatorID ? (
      <TestJobListsSection />
    ) : null;
  };

  // Navigate to Daily Time Record
  const navigateToDtr = () => {
    const to = `${location.pathname}/${latestApplication.id}/daily-time-records`;

    navigate(to);
  };

  // Navigate to Weekly Accomplishment Reports
  const navigateToWeekly = () => {
    const to = `${location.pathname}/${latestApplication.id}/weekly-accomplishment-reports`;

    navigate(to);
  };

  // Navigate to Personal Insights
  const navigateToInsights = () => {
    const to = `${location.pathname}/${latestApplication.id}/personal-insight`;

    navigate(to);
  };

  // Loading Condition
  if (loading) {
    return <Loader loading={loading} />;
  }

  return (
    <div>
      <div className="min-h-screen overflow-y-auto">
        <div className="flex flex-col lg:flex-row space-y-10 lg:space-y-0 lg:space-x-10">
          {/* Profile Sidebar */}
          <ProfileSidebar profile={profile} />

          {/* If the student has no coordinator yet. Display Empty State */}
          {!profile.coordinator_id && (
            <EmptyState
              title="No jobs available at the moment"
              message="Once you have a coordinator, jobs will appear here."
            />
          )}

          {/* If student is not yet applied . Display Job Posts */}
          {/* Job Listings and Filters (Scrollable Middle) */}
          {displayJobs({
            studentStatusID: studentStatusID,
            coordinatorID: profile.coordinator_id,
          })}

          {studentStatusID &&
            (studentStatusID === 2 ||
              studentStatusID === 3 ||
              studentStatusID === 4) && (
              <CurrentApplication studentStatusID={studentStatusID} />
            )}

          {/* Reports Section */}
          {latestApplication &&
            (studentStatusID === 5 || studentStatusID === 6) && (
              <ReportsSection
                navigateToDtr={navigateToDtr}
                navigateToWeekly={navigateToWeekly}
                navigateToInsights={navigateToInsights}
              />
            )}
        </div>
      </div>
    </div>
  );
};

export default TestingHomePage;
