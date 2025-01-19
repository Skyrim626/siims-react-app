import React, { useState } from "react";
import Loader from "../components/common/Loader";
import { Button } from "@headlessui/react";
import Modal from "../components/modals/Modal";

const TestingPage = () => {
  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setOpen(!open)}>Open</Button>

      <Modal isOpen={open} setIsOpen={setOpen}>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatem,
          necessitatibus odio! Enim consectetur delectus deserunt autem quia?
          Sunt veniam at tempora sed eligendi, error voluptas ratione assumenda
          deleniti nam nihil!
        </p>
      </Modal>
    </div>
  );
};

export default TestingPage;
