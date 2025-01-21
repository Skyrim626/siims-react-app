import React, { useState } from "react";
import NotFoundPage from "../../../pages/NotFoundPage";
import ManualCreateEndorsementLetterContainer from "../ManualCreateEndorsementLetterContainer";
import EndorsementLetterGenerator from "../letters/EndorsementLetterGenerator";
import { pdf } from "@react-pdf/renderer";

const GenerateEndorsementLetterRemote = ({ type }) => {
  /**
   *
   * Function that calls the endorsement Letter
   *
   */
  const callEndorsementLetter = (formData) => {
    return <EndorsementLetterGenerator formData={formData} />;
  };

  /**
   * Function that view the PDF
   */
  const viewPdf = async (formData) => {
    try {
      const document = callEndorsementLetter(formData);
      const blob = await pdf(document).toBlob();

      const blobUrl = URL.createObjectURL(blob);

      window.open(blobUrl, "_blank");
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  // Automatic
  if (type === "automatic") {
  }

  // Manual
  else if (type === "manual") {
    return (
      <ManualCreateEndorsementLetterContainer
        callEndorsementLetter={callEndorsementLetter}
        viewPdf={viewPdf}
      />
    );
  }

  return <NotFoundPage />;
};

export default GenerateEndorsementLetterRemote;
