import { Button } from "@/components/ui/button";
import React from "react";
import ListOfCases from "./ListOfCases";
import Table from "@/components/ui/Table";
import { useRouter } from "next/navigation";

export default function CaseTable({ children }: { children: React.ReactNode }) {
  const tableHeader = ["Case ID", "title", "Create At", "Status"];

  return <Table headers={tableHeader}>{children}</Table>;
}
