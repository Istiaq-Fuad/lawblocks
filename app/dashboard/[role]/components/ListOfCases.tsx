"use client";

import React, { cache } from "react";
import EditCase from "./edit/EditCase";
import { cn } from "@/lib/utils";
import DownloadCase from "./DownloadCase";
import { CaseType } from "@/lib/types";
import { useSearchParams } from "next/navigation";
import useCaseContext from "@/components/context/usecaseContext";

export default function ListOfCases() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");

  const { cases } = useCaseContext();

  let filteredCases = [...cases];

  if (query) {
    const singleCase = cases.find((caseItem) => caseItem.id === query);
    if (singleCase) {
      filteredCases = [singleCase];
    } else {
      filteredCases = cases.filter((caseItem) => {
        return caseItem.title.toLowerCase().includes(query.toLowerCase());
      });
    }
  }

  // sort filteredCases by createdAt
  filteredCases.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <div className="dark:bg-inherit bg-white mx-2 rounded-sm">
      {filteredCases.map((caseItem, index) => {
        return (
          <div
            className=" grid grid-cols-5  rounded-sm  p-3 align-middle font-normal"
            key={index}
          >
            <h1>{caseItem.id}</h1>
            <h1>{caseItem.title}</h1>
            <h1>{caseItem.createdAt}</h1>

            <div>
              <span
                className={cn(
                  " dark:bg-zinc-800 px-2 py-1 rounded-full  capitalize text-sm border-zinc-300  border",
                  {
                    "text-green-600 px-4 dark:border-green-400 bg-green-200":
                      caseItem.status === "active",
                    "text-red-500 px-4 bg-red-100 dark:text-red-300 dark:border-red-400":
                      caseItem.status === "closed",
                  }
                )}
              >
                {caseItem.status}
              </span>
            </div>

            <div className="flex gap-4 items-center">
              <DownloadCase caseFile={caseItem.id + ".zip"} />
              <EditCase caseItem={caseItem} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
