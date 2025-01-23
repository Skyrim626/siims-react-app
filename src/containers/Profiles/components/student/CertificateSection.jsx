import React from "react";
import { formatDateOnly } from "../../../../utils/formatDate";
import { Eye } from "lucide-react";
import Text from "../../../../components/common/Text";

const CertificateSection = ({ certificates = [] }) => {
  return (
    <section className="border-b-2 border-b-gray-900 pb-5">
      <div className="flex gap-3 items-center">
        {/* Blank BG Space */}
        <div className="h-10 w-3/12 bg-gray-900"></div>
        <Text className="text-xl font-bold">Certificates</Text>
      </div>

      <div className="mt-5 flex flex-col gap-5">
        <div className="mt-5 flex flex-col gap-5">
          {certificates.map((certificate, index) => (
            <div key={index} className="flex items-start gap-5">
              {/* Dates */}
              <div className="flex-shrink-0 w-[17rem] text-sm text-gray-700 whitespace-nowrap font-bold">
                {formatDateOnly(certificate.issued_date)}
              </div>

              {/* Work Experience Content */}
              <a
                className="flex items-center gap-3 font-bold text-blue-500 border-b border-b-transparent hover:border-b-blue-500"
                href={certificate.file_path}
                target="_blank"
              >
                {certificate.name}
                <Eye size={18} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificateSection;
