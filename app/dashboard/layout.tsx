"use client";

import React, { ReactNode, useEffect } from "react";
import SignOut from "./components/SignOut";
import Link from "next/link";
import CaseContextProvider from "@/components/context/caseContext";
import { CaseType } from "@/lib/types";
import useCaseContext from "@/components/context/useCaseContext";

export default function Layout({ children }: { children: ReactNode }) {
  const { setCases } = useCaseContext();
  useEffect(() => {
    // fetch cases from server
    const fetchCases = async () => {
      const response = await fetch("http://localhost:8000/cases", {
        cache: "no-store",
      });

      let cases: CaseType[] = await response.json();
      setCases(cases);
    };

    fetchCases();
  }, [setCases]);

  return (
    <div className="w-full flex flex-col">
      <div className="flex justify-between items-center p-5 sm:px-10 bg-gray-100 dark:bg-inherit">
        <Link href="/">
          <h1 className="text-2xl md:text-4xl font-bold font-mono italic ml-2">
            LawBlocks
          </h1>
        </Link>
        <SignOut />
      </div>

      <div className="w-full sm:flex-1 p-5 sm:px-10 sm:py-5 space-y-5 bg-gray-100 dark:bg-inherit">
        {/* <CaseContextProvider caseData={cases}>{children}</CaseContextProvider> */}
        {children}
      </div>
    </div>
  );
}
