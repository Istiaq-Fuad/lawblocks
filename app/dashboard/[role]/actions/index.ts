"use server";

import { writeFile, readFile } from "fs/promises";
import { join } from "path";
import { nanoid } from "nanoid";
import { CaseType } from "@/lib/types";

export async function saveCase(data: FormData) {
  const file: File | null = data.get("file") as unknown as File;
  const id = nanoid(10);
  const fileName: string = id + ".zip";

  if (!file) {
    throw new Error("No file uploaded");
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const path = join(process.cwd(), "uploads", fileName);
  await writeFile(path, buffer as unknown as Uint8Array);

  const newCase: CaseType = {
    id: id,
    title: data.get("title") as string,
    chiefJudge: data.get("chiefJudge") as string,
    chiefInvestigator: data.get("chiefInvestigator") as string,
    createdAt: new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    status: "active",
    description: data.get("description") as string,
  };

  const response = await fetch("http://localhost:8000/cases", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newCase),
  });

  return { success: response.ok, id, path, newCase } as const;
}

export async function getZipFileData(fileName: string): Promise<Buffer> {
  const filePath = join(process.cwd(), "uploads", fileName);
  const fileBuffer = await readFile(filePath);
  return fileBuffer;
}
