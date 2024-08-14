"use server";

import { createSupbaseServerClient } from "@/lib/supabase";
import { redirect } from "next/navigation";

type memberType = {
  email: string;
  role: string;
};

export async function loginWithEmailAndPassword(data: {
  email: string;
  password: string;
}) {
  const response = await fetch("http://localhost:8000/members");
  const members: memberType[] = await response.json();
  //   console.log(members)

  const filteredMember = members.find((member) => member.email === data.email);

  if (filteredMember) {
    redirect(`/dashboard/${filteredMember.role}`);
  }
}

export async function logout() {
  redirect("/");
}
