export type CaseType = {
  id: string;
  title: string;
  chiefJudge: string;
  chiefInvestigator: string;
  createdAt: string;
  status: "active" | "closed";
  description: string;
};
