"use client";

import { useContext } from "react";
import { CaseContext } from "./caseContext";

export default function useCaseContext() {
  const context = useContext(CaseContext);

  if (!context) {
    throw new Error("caseContext can only work on wrapped components");
  }

  return context;
}
