import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { CubeIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";
import { AiOutlineBlock } from "react-icons/ai";

export default function Home() {
  return (
    
    <div className="h-screen p-10 text-center">
      <div className="flex justify-center">
        <CubeIcon height={45} width={45} />
        <h1 className="text-5xl font-bold font-mono italic ml-2">LawBlocks</h1>
      </div>
      <div className="flex flex-col items-center justify-center gap-7 h-3/4 my-auto">
        <Link href="/access-request" className="text-2xl border p-5">
          Request access to the network
        </Link>
        <p className="text-lg opacity-50 italic">or,</p>
        <Link href="/auth" className="text-2xl border p-5">
          Login using your credentials
        </Link>
      </div>
    </div>
  );
}
