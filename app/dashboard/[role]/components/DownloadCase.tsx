"use client";

import { Button } from "@/components/ui/button";
import { DownloadIcon } from "@radix-ui/react-icons";
import { getZipFileData } from "../actions";

function DownloadCase({
  caseFile,
  buttonText,
}: {
  caseFile: string;
  buttonText?: string;
}) {
  const handleDownload = async () => {
    if (!caseFile) return;

    try {
      const fileData = await getZipFileData(caseFile);
      const blob = new Blob([fileData], { type: "application/zip" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = caseFile;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      alert("Error downloading file: " + (error as Error).message);
    }
  };

  return (
    <Button variant="outline" onClick={handleDownload}>
      <DownloadIcon />{" "}
      {buttonText && <span className="ml-4">{buttonText}</span>}
    </Button>
  );
}

export default DownloadCase;
