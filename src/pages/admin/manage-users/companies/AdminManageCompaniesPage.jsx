import React, { useEffect, useState } from "react";
import Page from "../../../../components/common/Page";
import { Download, FileDown, FileUp, UserRoundPlus, X } from "lucide-react";
import Section from "../../../../components/common/Section";
import Heading from "../../../../components/common/Heading";
import Button from "../../../../components/common/Button";
import { useLocation } from "react-router-dom";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa"; // React Icons

import {
  Description,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import CompanyForm from "../../forms/CompanyForm";
import TestTable from "../../../../components/test/TestTable";
import { getRequest } from "../../../../api/apiHelpers";

// A page component for managing companies
const AdminManageCompaniesPage = () => {
  // Open Location
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  // State
  const [data, setData] = useState([]);

  // Get all users
  useEffect(() => {
    const fetchCompanies = async () => {
      // Sends a request to fetch all companies in the serve
      const response = await getRequest({ url: "/api/v1/users" });
      setData(response);
    };

    fetchCompanies();
  }, []);

  return (
    <Page>
      <Section>
        <div className="flex justify-between items-center">
          <div>
            <Heading level={3} text={"Companies"} />
            <p className="text-blue-950">Use this module to add new company.</p>
          </div>
          <div className="button-group | flex gap-2">
            <Button className="transition px-3 py-2 font-bold flex items-center justify-center gap-2 border-2 rounded-lg border-blue-950 hover:bg-blue-950 hover:text-white">
              <FileUp size={20} />
              <p>Export</p>
            </Button>
            <Button className="transition px-3 py-2 font-bold flex items-center justify-center gap-2 border-2 rounded-lg border-blue-950 hover:bg-blue-950 hover:text-white">
              <FileDown size={20} />
              <p>Import</p>
            </Button>
            <Button
              onClick={() => setIsOpen(true)}
              className={`transition py-2 px-3 font-bold text-white flex items-center justify-center gap-2 border-2 rounded-md border-transparent ${
                isOpen ? "bg-blue-700" : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              <UserRoundPlus size={20} />
              <p>Add New Company</p>
            </Button>
          </div>
        </div>
        <hr className="my-3" />
      </Section>

      {data.length !== 0 && <TestTable data={data} />}

      <AnimatePresence>
        {isOpen && (
          <Dialog
            static
            open={isOpen}
            onClose={() => setIsOpen(false)}
            className="relative z-50"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30"
            />
            <div className="fixed inset-0 w-screen overflow-y-auto p-4">
              <div className="flex min-h-full items-center justify-center">
                <DialogPanel
                  as={motion.div}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="max-w-4xl space-y-4 bg-gray-100"
                >
                  <div className="px-8 py-5 bg-blue-800 flex items-center justify-between">
                    <DialogTitle className="text-md text-white font-bold">
                      Create Company
                    </DialogTitle>
                    <Button
                      className="text-blue-950 transition duration-100 hover:text-white"
                      onClick={() => setIsOpen(false)}
                    >
                      <X />
                    </Button>
                  </div>
                  <div className="px-8 pb-4">
                    <CompanyForm setIsOpen={setIsOpen} />
                  </div>
                </DialogPanel>
              </div>
            </div>
          </Dialog>
        )}
      </AnimatePresence>
    </Page>
  );
};

export default AdminManageCompaniesPage;
