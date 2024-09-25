import React, { useEffect, useState } from "react";
import { getRequest } from "../../../../api/apiHelpers";
import Section from "../../../../components/common/Section";
import Button from "../../../../components/common/Button";
import { FileDown, FileUp, UserRoundPlus } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import Modal from "../../../../components/common/Modal";
import CompanyFormEdit from "../../forms/CompanyFormEdit";
import AdminManageHeader from "../../../../components/users/admin/AdminManageUserHeader";
import Table from "../../../../components/tables/TableTests";
import ChairpersonFormAdd from "../../forms/ChairpersonFormAdd";

const AdminManageChairpersonsPage = () => {
  // States
  const [chairpersons, setChairpersons] = useState([]);

  // Create Chairperson
  const [isOpen, setIsOpen] = useState(false);
  // Edit Chairperson
  const [isOpenEdit, setIsOpenEdit] = useState(false);

  // Selected Data State
  const [selectedData, setSelectedData] = useState({});

  // Fetch chairpersons data
  useEffect(() => {
    const fetchChairpersons = async () => {
      const chairpersonResponse = await getRequest({
        url: "/api/v1/admin/users/chairpersons",
      });

      // Set chairperson
      setChairpersons(chairpersonResponse);
    };

    fetchChairpersons();
  }, []);

  return (
    <Section>
      <AdminManageHeader
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        addPlaceholder="Add New Chairperson"
      />

      {/* {companies.length !== 0 && <AdminCompanyTableView data={companies} />} */}
      {/* {companies.length !== 0 && <Table data={companies} />} */}
      {chairpersons.length !== 0 && <Table data={chairpersons} />}

      {/* Modals */}
      {/* <AnimatePresence>
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
      </AnimatePresence> */}
      <AnimatePresence>
        {isOpen && (
          <Modal
            modalTitle="Create Chairperson"
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          >
            <ChairpersonFormAdd
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              companies={chairpersons}
              setCompanies={setChairpersons}
            />
          </Modal>
        )}
      </AnimatePresence>
    </Section>
  );
};

export default AdminManageChairpersonsPage;
