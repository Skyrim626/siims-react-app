import { Link} from "react-router-dom";

const CompanyManageApplicantsPage = () => {


  const endorsementLetters = [
    {
      id: 1,
      program: "BS in Computer Science",
      chairperson: "Dr. Emily Clark",
      endorsementLetter: "/docs/endorsement_letter_1.pdf",
      dateIssued: "2024-11-20",
    },
    {
      id: 2,
      program: "BS in Information Technology",
      chairperson: "Dr. Emily Clark",
      endorsementLetter: "/docs/endorsement_letter_2.pdf",
      dateIssued: "2024-11-21",
    },
    {
      id: 3,
      program: "BS in Electronics Engineering",
      chairperson: "Dr. Emily Clark",
      endorsementLetter: "/docs/endorsement_letter_3.pdf",
      dateIssued: "2024-11-22",
    },
  ];

  const applicants = [
    {
      id: 1,
      name: "John Doe",
      program: "BS in Computer Science",
      jobTitle: "Software Developer Intern",
      documents: {
        resume: "/docs/john_doe_resume.pdf",
        applicationLetter: "/docs/john_doe_application_letter.pdf",
        endorsementLetter: "/docs/john_doe_endorsement_letter.pdf",
      },
      dateApplied: "2024-11-20",
    },
    {
      id: 2,
      name: "Jane Smith",
      program: "BS in Information Technology",
      jobTitle: "Data Analyst Intern",
      documents: {
        resume: "/docs/jane_smith_resume.pdf",
        applicationLetter: "/docs/jane_smith_application_letter.pdf",
        endorsementLetter: "/docs/jane_smith_endorsement_letter.pdf",
      },
      dateApplied: "2024-11-21",
    },
    {
      id: 3,
      name: "Michael Lee",
      program: "BS in Electronics Engineering",
      jobTitle: "Hardware Engineer Intern",
      documents: {
        resume: "/docs/michael_lee_resume.pdf",
        applicationLetter: "/docs/michael_lee_application_letter.pdf",
        endorsementLetter: "/docs/michael_lee_endorsement_letter.pdf",
      },
      dateApplied: "2024-11-22",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-600 text-white py-4 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold">Manage Applicants and Endorsements</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 space-y-12">
        {/* Endorsement Letters Section */}
        <section>
          <div className="bg-white shadow rounded-md p-6">
            <h2 className="text-xl font-semibold mb-4">Endorsement Letters from Chairperson</h2>
            <table className="min-w-full text-left text-sm border-t">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="px-6 py-3 font-semibold">#</th>
                  <th className="px-6 py-3 font-semibold">Program/Course</th>
                  <th className="px-6 py-3 font-semibold">Chairperson</th>
                  <th className="px-6 py-3 font-semibold">Date Issued</th>
                  <th className="px-6 py-3 font-semibold">Endorsement Letter</th>
                </tr>
              </thead>
              <tbody>
                {endorsementLetters.map((letter, index) => (
                  <tr key={letter.id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4">{letter.program}</td>
                    <td className="px-6 py-4">{letter.chairperson}</td>
                    <td className="px-6 py-4">{letter.dateIssued}</td>
                    <td className="px-6 py-4">
                      <a
                        href={letter.endorsementLetter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline hover:text-blue-800"
                      >
                        View Letter
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Generate Acceptance Letter Button */}
            <div className="mt-6">
              <Link
                to="generate-acceptance"
                className="inline-block bg-blue-500 text-white px-6 py-3 rounded-md text-center font-semibold hover:bg-blue-600"
              >
                Generate Acceptance Letter
              </Link>
            </div>
          </div>
        </section>

        {/* Applicants List Section */}
        <section>
          <div className="bg-white shadow rounded-md p-6">
            <h2 className="text-xl font-semibold mb-4">Applicants List</h2>
            <table className="min-w-full text-left text-sm border-t">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="px-6 py-3 font-semibold">#</th>
                  <th className="px-6 py-3 font-semibold">Name</th>
                  <th className="px-6 py-3 font-semibold">Program/Course</th>
                  <th className="px-6 py-3 font-semibold">Job Post Title</th>
                  <th className="px-6 py-3 font-semibold">Documents</th>
                  <th className="px-6 py-3 font-semibold">Date Applied</th>
                </tr>
              </thead>
              <tbody>
                {applicants.map((applicant, index) => (
                  <tr key={applicant.id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4">{applicant.name}</td>
                    <td className="px-6 py-4">{applicant.program}</td>
                    <td className="px-6 py-4">{applicant.jobTitle}</td>
                    <td className="px-6 py-4 space-y-2">
                      <a
                        href={applicant.documents.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline hover:text-blue-800"
                      >
                        Resume
                      </a>
                      <br />
                      <a
                        href={applicant.documents.applicationLetter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline hover:text-blue-800"
                      >
                        Application Letter
                      </a>
                      <br />
                      <a
                        href={applicant.documents.endorsementLetter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline hover:text-blue-800"
                      >
                        Endorsement Letter
                      </a>
                    </td>
                    <td className="px-6 py-4">{applicant.dateApplied}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default CompanyManageApplicantsPage;
