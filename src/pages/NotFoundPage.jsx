// Libraries
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

// Icons
import { ArrowLeft, Home } from "lucide-react";

// Assets
import notFoundImage1 from "../assets/images/404-image-1.svg";
import notFoundImage2 from "../assets/images/404-image-2.svg";

// Components
import Section from "../components/common/Section";
import { Button } from "@headlessui/react";

// NotFoundPage Component
export default function NotFoundPage() {
  const navigate = useNavigate();
  const location = useLocation();

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
          <div className="flex justify-center space-x-5">
            {/* Go Back to Previous Page */}
            <Button
              onClick={() => navigate(-1)} // Navigate back to the previous page
              className="bg-gray-700 hover:bg-gray-800 transition text-white rounded-md flex items-center gap-2 px-4 py-3"
            >
              <ArrowLeft size={20} />
              Go Back
            </Button>
            {/* Return to Homepage */}
            <Link
              to="/"
              className="bg-blue-900 hover:bg-blue-950 transition text-white rounded-md flex items-center gap-2 px-4 py-3"
            >
              <Home size={20} />
              Go Home
            </Link>
          </div>
        </div>
        <img src={notFoundImage2} alt="Not Found Image" className="mx-auto" />
      </Section>
      {/* 404 Image 2 */}
    </>
  );
}
