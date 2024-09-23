import React, { useEffect, useState } from "react";
import Page from "../../../components/common/Page";
import { Download, FileDown, FileUp, UserRoundPlus, X } from "lucide-react";
import Section from "../../../components/common/Section";
import Heading from "../../../components/common/Heading";
import Button from "../../../components/common/Button";
import { useLoaderData, useLocation } from "react-router-dom";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa"; // React Icons

import { AnimatePresence, motion } from "framer-motion";
import CompanyFormAdd from "../forms/CompanyFormAdd";
import Table from "../../../components/tables/Table";
import Modal from "../../../components/common/Modal";
import CompanyFormEdit from "../forms/CompanyFormEdit";
import findItemById from "../../../utils/findItem";
import AdminCompanyTable from "../../../components/tables/AdminCompanyTable";
import { getRequest } from "../../../api/apiHelpers";
import AdminDeanTable from "../../../components/tables/AdminDeanTable";
import AdminCompanyTableView from "../../../components/tables/AdminCompanyTableView";

// A page component for managing companies
const AdminManageCompaniesPage = () => {
  // States
  const [companies, setCompanies] = useState([]);

  // Create Company
  const [isOpen, setIsOpen] = useState(false);
  // Edit Company
  const [isOpenEdit, setIsOpenEdit] = useState(false);

  // Selected Data State
  const [selectedData, setSelectedData] = useState({});

  // Fetch companies data
  useEffect(() => {
    const fetchCompanies = async () => {
      const companyResponse = await getRequest({
        url: "/api/v1/admin/users/companies",
      });

      // Set Companies
      setCompanies(companyResponse);
    };

    // Call
    fetchCompanies();
  }, []);

  // Edit the Company
  /* const handleEdit = (id) => {
    // Opens the modal
    console.log(id);
    setSelectedData(findItemById(id, companies));
    setIsOpenEdit(!isOpenEdit);
  }; */

  return (
    <Section>
      <div className="flex justify-end items-center">
        <div className="button-group | flex gap-2">
          <Button className="transition text-sm px-3 py-1 font-bold flex items-center justify-center gap-2 border-2 rounded-lg border-blue-950 hover:bg-blue-950 hover:text-white">
            <FileUp size={15} />
            <p>Export</p>
          </Button>
          <Button className="transition text-sm px-3 py-1 font-bold flex items-center justify-center gap-2 border-2 rounded-lg border-blue-950 hover:bg-blue-950 hover:text-white">
            <FileDown size={15} />
            <p>Import</p>
          </Button>
          <Button
            onClick={() => setIsOpen(true)}
            className={`transition text-sm py-1 px-3 font-bold text-white flex items-center justify-center gap-2 border-2 rounded-md border-transparent ${
              isOpen ? "bg-blue-700" : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            <UserRoundPlus size={15} />
            <p>Add New Company</p>
          </Button>
        </div>
      </div>

      {/* {companies.length !== 0 && <AdminCompanyTableView data={companies} />} */}
      {companies.length !== 0 && <Table data={companies} />}

      {/* Modals */}
      <AnimatePresence>
        {isOpenEdit && (
          <Modal
            modalTitle="Edit Company"
            isOpen={isOpenEdit}
            setIsOpen={setIsOpenEdit}
          >
            <CompanyFormEdit
              selectedData={selectedData}
              isOpen={isOpenEdit}
              setIsOpen={setIsOpenEdit}
              companies={companies}
              setCompanies={setCompanies}
            />
          </Modal>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isOpen && (
          <Modal
            modalTitle="Create Company"
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          >
            <CompanyFormAdd
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              companies={companies}
              setCompanies={setCompanies}
            />
          </Modal>
        )}
      </AnimatePresence>
    </Section>
  );
};

export default AdminManageCompaniesPage;
