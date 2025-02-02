import React, { useEffect, useState } from "react";
import CertificatePresenter from "./CertificatePresenter";
import { fetchOrientationValidation } from "../../Api";
import { CertificateEventGenerator } from "../../../../_global/factories/certificates/CertificateEventGenerator";
import { pdf } from "@react-pdf/renderer";

const CertificateContainer = ({ student, certificates = [] }) => {
  /**
   *
   *
   * LOADING STATE
   *
   *
   */
  const [loading, setLoading] = useState(false);

  /**
   *
   *
   * CERTIFICATE OF ORIENTATION STATE
   *
   *
   */
  const [certificateOfOrientation, setCertificateOfOrientation] = useState({});

  /**
   *
   *
   * USE EFFECTS
   *
   *
   *
   */
  useEffect(() => {
    // Check if student's program has orientation involved
    if (student.program.has_orientation) {
      fetchCertificateOfOrientation();
    }
  }, []);

  /**
   *
   *
   * THIRD-PARTY API FUNCTION (WORKS ONLY FOR THOSE PROGRAM THAT HAS ORIENTATION)
   *
   *
   */
  const fetchCertificateOfOrientation = async () => {
    await fetchOrientationValidation({
      setLoading: setLoading,
      studentNumber: student.user_id,
      setCertificateOfOrientation: setCertificateOfOrientation,
    });
  };

  /**
   *
   *
   * OTHER FUNCTIONS
   *
   *
   */
  const viewCertificateOfOrientation = async () => {
    // console.log(certificateOfOrientation);
    try {
      const document = (
        <CertificateEventGenerator
          participantName={certificateOfOrientation.student_name}
          workshopName={certificateOfOrientation.event_name}
          date={certificateOfOrientation.date}
          address={certificateOfOrientation.address}
        />
      );
      const blob = await pdf(document).toBlob();

      const blobUrl = URL.createObjectURL(blob);

      window.open(blobUrl, "_blank");
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <CertificatePresenter
      certificates={certificates}
      /* That Has Orientation Only */
      certificateOfOrientation={certificateOfOrientation}
      viewCertificateOfOrientation={viewCertificateOfOrientation}
    />
  );
};

export default CertificateContainer;
