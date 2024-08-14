import { Button } from "@/components/ui/button";
import React from "react";
import DailogForm from "../DialogForm";
import CreateForm from "./CreateForm";

export default function CreateCase() {
  return (
    <DailogForm
      id="create-trigger"
      title="Initialize a case"
      Trigger={
        <Button variant="outline" className="h-10">
          Create+
        </Button>
      }
      form={<CreateForm />}
    />
  );
}
