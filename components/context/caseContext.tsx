"use client";

import { CaseType } from "@/lib/types";
import React, { createContext, useState } from "react";

type CaseContextType = {
  cases: CaseType[];
  setCases: React.Dispatch<React.SetStateAction<CaseType[]>>;
};

export const CaseContext = createContext<CaseContextType | null>(null);

export default function CaseContextProvider({
  children,
}: // caseData,
{
  children: React.ReactNode;
  // caseData: CaseType[];
}) {
  const [cases, setCases] = useState<CaseType[]>([]);

  return (
    <CaseContext.Provider
      value={{
        cases,
        setCases,
      }}
    >
      {children}
    </CaseContext.Provider>
  );
}
