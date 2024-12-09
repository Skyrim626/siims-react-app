import React, { useState } from "react";

import SignatureCapture from "./SignatureCanvas";
import { PDFDownloadLink } from "@react-pdf/renderer";
import GenerateEndorsementLetter from "./GenerateEndorsementLetter";

const PDFFile = () => {
  const [signatureImage, setSignatureImage] = useState(null);

  return (
    <>
      <SignatureCapture setSignatureImage={setSignatureImage} />
      {/* You can now pass the signature image to the PDF */}
      <PDFDownloadLink
        document={<GenerateEndorsementLetter signatureImage={signatureImage} />}
        fileName="signed-document.pdf"
      >
        {({ loading }) =>
          loading ? (
            <button>Loading Document...</button>
          ) : (
            <button>Download Signed Document</button>
          )
        }
      </PDFDownloadLink>
    </>
  );
};

export default PDFFile;
