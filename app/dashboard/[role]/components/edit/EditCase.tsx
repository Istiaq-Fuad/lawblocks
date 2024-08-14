"use client";

import React, { useEffect, useState, useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { DialogHeader } from "@/components/ui/dialog";
import { usePathname } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { CaseType } from "@/lib/types";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import useCaseContext from "@/components/context/usecaseContext";

export default function EditCase({ caseItem }: { caseItem: CaseType }) {
  const { id, description, status } = caseItem;

  const pathName = usePathname();

  const [isChecked, setIsChecked] = useState(
    status === "active" ? false : true
  );

  const [caseDetails, setCaseDetails] = useState("");
  const [caseDescription, setCaseDescription] = useState(description);
  const [isPending, startTransition] = useTransition();
  const { setCases, cases } = useCaseContext();
  const [isOpen, setIsOpen] = useState(false);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // send request to server to update case details
    startTransition(async () => {
      const response = await fetch(`http://localhost:8000/cases/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // ...caseItem
          description: caseDetails,
          status: isChecked ? "closed" : "active",
        }),
      });

      if (response.ok) {
        toast({ title: "Case updated successfully" });
        setCaseDescription(caseDetails);
        setCaseDetails("");
        const newCases: CaseType[] = cases.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              description: caseDetails,
              status: isChecked ? "closed" : "active",
            };
          }

          return item;
        });
        setCases(newCases);
        setIsOpen(false);
      } else {
        toast({ title: "Something went wrong", variant: "destructive" });
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex gap-x-2">
          <InfoCircledIcon />
          Info
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="space-y-5">
          <DialogTitle>Case details</DialogTitle>
          <DialogDescription>{caseDescription}</DialogDescription>
          {pathName.split("/").pop() === "court" && (
            <form
              onSubmit={(e) => handleFormSubmit(e)}
              className="flex flex-col gap-y-4"
            >
              <Textarea
                placeholder="Enter new case details"
                value={caseDetails}
                onChange={(e) => setCaseDetails(e.target.value)}
              />
              <div className="flex gap-x-3">
                <Checkbox
                  id="caseState"
                  checked={isChecked}
                  onClick={() => setIsChecked(!isChecked)}
                />
                <label
                  htmlFor="caseState"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Close this case
                </label>
              </div>
              <Button type="submit" className="self-end">
                <span className="mr-2">Update</span>
                <AiOutlineLoading3Quarters
                  className={cn("animate-spin ml-3", { hidden: !isPending })}
                />
              </Button>
            </form>
          )}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
// export default function EditCase() {
//   return (
//     <DailogForm
//       id="update-trigger"
//       title="Edit Case"
//       Trigger={
//         <Button variant="outline" className="flex gap-x-2">
//           <InfoCircledIcon />
//           Info
//         </Button>
//       }
//       form={<EditForm />}
//     />
//   );
// }
