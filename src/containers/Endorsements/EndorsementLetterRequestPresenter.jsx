import React from "react";
import Page from "../../components/common/Page";
import { Button } from "@headlessui/react";
import { MoveLeft } from "lucide-react";

const EndorsementLetterRequestPresenter = ({
  name,
  student_id,
  letter_status_name,
  students,
  company_address,
  company_name,
  recipient_name,
  recipient_position,
  endorse_students_count,

  go_back,
}) => {
  return (
    <Page>
      <div className="mt-3">
        <Button
          onClick={() => go_back()}
          className="text-blue-600 hover:text-blue-700 font-semibold hover:underline flex items-center gap-1"
        >
          <MoveLeft size={15} />
          Back
        </Button>
      </div>

      <div className="max-w-6xl mx-auto p-8 bg-white shadow-md rounded-lg mt-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 border-b pb-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Endorsement Request Details
          </h1>
        </div>

        {/* Request Information */}
        <div className="space-y-6">
          {/* General Information */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800">
              General Information
            </h2>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Name</h3>
                <p className="text-gray-700">{name}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Student ID
                </h3>
                <p className="text-gray-700">{student_id}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Letter Status
                </h3>
                <p className="text-gray-700">{letter_status_name}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Endorsed Students Count
                </h3>
                <p className="text-gray-700">{endorse_students_count}</p>
              </div>
            </div>
          </section>

          {/* Students Section */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800">
              Other Endorsed Students
            </h2>
            <div className="mt-4">
              {students &&
                students.length > 0 &&
                students.map((student, index) => (
                  <div
                    key={student.student_id}
                    className="border rounded-lg p-4 mb-4 bg-gray-50"
                  >
                    <h3 className="text-lg font-semibold text-gray-900">
                      {index + 1}. {student.student.user.first_name}{" "}
                      {student.student.user.last_name}
                    </h3>
                    <p className="text-gray-600">
                      Email: {student.student.user.email}
                    </p>
                    <p className="text-gray-600">
                      Phone: {student.student.user.phone_number}
                    </p>
                    <p className="text-gray-600">
                      Address: {student.student.user.street},{" "}
                      {student.student.user.barangay},{" "}
                      {student.student.user.city_municipality},{" "}
                      {student.student.user.province},{" "}
                      {student.student.user.postal_code}
                    </p>
                  </div>
                ))}
            </div>
          </section>

          {/* Company Section */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800">
              Company Details
            </h2>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Company Name
                </h3>
                <p className="text-gray-700">{company_name}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Company Address
                </h3>
                <p className="text-gray-700">{company_address}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Recipient Name
                </h3>
                <p className="text-gray-700">{recipient_name}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Recipient Position
                </h3>
                <p className="text-gray-700">{recipient_position}</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Page>
  );
};

export default EndorsementLetterRequestPresenter;
