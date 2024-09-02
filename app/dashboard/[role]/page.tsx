import React from "react";
import CaseTable from "./components/CaseTable";
import SearchCase from "./components/SearchCase";
import CreateCase from "./components/create/CreateCase";
import ListOfCases from "./components/ListOfCases";
import { CaseType } from "@/lib/types";

type dashboardParams = {
  role: "police" | "court-clerk" | "judge" | "lawyer";
};

export default async function Members({ params }: { params: dashboardParams }) {
  return (
    <div className="space-y-5 w-full overflow-y-auto px-3">
      <h1 className="mb-2 font-semibold text-lg">
        {params.role.toUpperCase() + "'s Dashboard"}
      </h1>
      <div className="flex gap-2">
        <SearchCase />
        {params.role === "court-clerk" && <CreateCase />}
      </div>
      <CaseTable>
        <ListOfCases />
      </CaseTable>
    </div>
  );
}
