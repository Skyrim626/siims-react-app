import React from "react";
import Page from "../../components/common/Page";
import Section from "../../components/common/Section";
import Heading from "../../components/common/Heading";
import Text from "../../components/common/Text";
import SearchableDropdown from "./components/SearchableDropdown";
import { Button } from "@headlessui/react";
import { Plus } from "lucide-react";
import Modal from "../../components/modals/Modal";
import SectionForm from "./forms/SectionForm";

const SectionPresenter = ({
  /** Authorize prop */
  authorizeRole,

  /** Section Props */
  sections = [],
  selectedSection,
  setSelectedSection,
  isSectionOpen,
  setIsSectionOpen,
  searchSection,
  setSearchSection,
  fetchSections,
  isOpenSection,
  setIsOpenSection,
}) => {
  return (
    <Page>
      {/* Modals */}
      <Modal
        isOpen={isOpenSection}
        setIsOpen={setIsOpenSection}
        modalTitle="Create new section"
      >
        <SectionForm authorizeRole={authorizeRole} />
      </Modal>

      <Section>
        <Heading level={3} text="Manage Sections" />
        <Text className="text-md text-blue-950">
          This is where you manage the sections.
        </Text>
        <hr className="my-3" />
      </Section>

      <div className="flex items-center justify-between">
        <div>
          <SearchableDropdown
            items={sections}
            selectedItem={selectedSection}
            setSelectedItem={setSelectedSection}
            isOpen={isSectionOpen}
            setIsOpen={setIsSectionOpen}
            searchTerm={searchSection}
            setSearchTerm={setSearchSection}
            placeholder="Search section..."
            onSearchSubmit={fetchSections}
          />
        </div>

        <div>
          <Button
            className="flex gap-1 items-center text-sm px-2 py-2 bg-blue-500 hover:bg-blue-600 rounded-sm text-white font-semibold transition"
            onClick={() => setIsOpenSection(!isOpenSection)}
          >
            <Plus size={15} />
            Add New Section
          </Button>
        </div>
      </div>
    </Page>
  );
};

export default SectionPresenter;
