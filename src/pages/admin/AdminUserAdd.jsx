import React from "react";
import Page from "../../components/atoms/Page";
import Section from "../../components/atoms/Section";
import Heading from "../../components/atoms/Heading";
import Button from "../../components/atoms/Button";
import { X } from "lucide-react";
import TextFormField from "../../components/molecules/TextFormField";
import Grid from "../../components/organisms/Grid";
import Form from "../../components/organisms/Form";

export default function AdminUserAdd() {
  return (
    <>
      <Section>
        <div className="flex justify-between items-center">
          <div>
            <Heading level={2} text={"Users"} />
            <p className="text-blue-950">Add different types of users</p>
          </div>
          <Button
            isLink
            to="/admin/users"
            className="transition p-2 font-bold text-white flex items-center justify-center gap-2 border-2 rounded-md border-transparent bg-red-500 hover:bg-red-600"
          >
            <X size={25} />
          </Button>
        </div>
        <hr className="my-3" />
      </Section>

      <Section>
        <Form className="f">
          <div className="flex items-center"></div>
        </Form>
      </Section>
    </>
  );
}
