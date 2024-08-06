import React from "react";

// Import images
import notFoundImage1 from "../assets/images/404-image-1.svg";
import notFoundImage2 from "../assets/images/404-image-2.svg";

// Import components
import Page from "../components/atoms/Page";
import Section from "../components/atoms/Section";

// Import React Router Dom
import { Link } from "react-router-dom";
import { Home } from "lucide-react";

// page for not found
export default function NotFound() {
  return (
    <>
      <Section className="flex items-center justify-center flex-col h-screen overflow-hidden">
        {/* 404 Image 2 */}
        <img src={notFoundImage1} alt="Not Found Image" />
        <div className="container text-center space-y-5">
          <h1 className="font-bold text-4xl">Looks Like you're Lost</h1>
          <p className="font-bold text-2xl">
            We can’t find the page you’re looking for.
          </p>
          {/* Return to Homepage */}
          <div className="flex justify-center">
            <Link
              to="/"
              className="bg-blue-900 hover:bg-blue-950 transition text-white rounded-md flex items-center gap-2 px-4 py-3"
            >
              <Home size={20} />
              Go back
            </Link>
          </div>
        </div>
        <img src={notFoundImage2} alt="Not Found Image" className="mx-auto" />
      </Section>
      {/* 404 Image 2 */}
    </>
  );
}
