import DownloadCase from "@/app/dashboard/[role]/components/DownloadCase";
import { CaseType } from "@/lib/types";

async function CaseDetails({ params }: { params: { id: string } }) {
  const { id } = params;

  const response = await fetch(`http://localhost:8000/cases/${id}`, {
    cache: "no-store",
  });

  const caseItem: CaseType | null = await response.json();

  if (!caseItem) {
    return (
      <div className="h-screen flex justify-center items-center font-semibold">
        Case not found
      </div>
    );
  }
  return (
    <div className="min-h-screen flex flex-col items-center mt-14 w-3/4 mx-auto gap-y-8">
      <p className="text-xl">
        {caseItem.id}
        {"  -  "}
        {caseItem.title}
        <span className="text-sm block text-center mt-4">
          {caseItem.status}
          {"  -  "}
          {caseItem.createdAt}
        </span>
      </p>

      <DownloadCase
        caseFile={caseItem.id + ".zip"}
        buttonText="Download case details"
      />

      <p className="text-lg text-center">{caseItem.description}</p>
    </div>
  );
}

export default CaseDetails;
