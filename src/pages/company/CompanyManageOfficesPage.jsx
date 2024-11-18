import React, { useEffect, useState } from "react";
import Page from "../../components/common/Page";
import Section from "../../components/common/Section";
import Heading from "../../components/common/Heading";
import Text from "../../components/common/Text";
import { Button, Input } from "@headlessui/react";
import { Link, useLoaderData, useLocation } from "react-router-dom";
import { Phone, Plus } from "lucide-react";
import { getRequest } from "../../api/apiHelpers";
import CompanyOffice from "../../components/users/company/CompanyOffice";
import ContentLoader from "../../components/atoms/ContentLoader";

const CompanyManageOfficesPage = () => {
  // Fetch offices
  const initial_offices = useLoaderData();

  // Use Location
  const location = useLocation();

  return (
    <>
      <Page>
        <Section>
          <Heading level={3} text={"Offices"} />
          <Text className="text-sm text-blue-950">
            This is where you view your offices.
          </Text>
          <hr className="my-3" />
        </Section>

        <Section>
          <div className="flex items-center gap-2">
            <Input
              type="text"
              className="text-sm w-full p-3 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
              placeholder="Filter offices..."
            />

            <Link
              to={`${location.pathname}/add`}
              className="flex items-center gap-1 text-sm whitespace-nowrap text-white font-semibold bg-blue-500 hover:bg-blue-600 px-2 py-3 rounded-sm shadow-sm transition duration-200 ease-in-out focus:ring focus:ring-blue-200"
            >
              <Plus size={20} />
              Add Office
            </Link>
          </div>
        </Section>

        <Section>
          <div className="container-xl lg:container m-auto">
            <h2 className="text-2xl font-bold text-blue-500 mb-6 text-center">
              Browse Offices
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {initial_offices.map((office) => (
                <CompanyOffice key={office.id} office={office} />
              ))}
            </div>
          </div>
        </Section>
      </Page>
    </>
  );
};

export default CompanyManageOfficesPage;
