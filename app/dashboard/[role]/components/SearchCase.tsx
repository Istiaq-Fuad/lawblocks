"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

export default function SearchCase() {
  const [query, setQuery] = React.useState("");

  const router = useRouter();
  function updateQuery(query: string) {
    const params = new URLSearchParams();
    params.set("q", query);
    router.push(`?${params.toString()}`);
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        updateQuery(query);
      }}
      className="w-full flex gap-x-4 items-center"
    >
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="search by title"
        className="ring-zinc-300 bg-white dark:bg-inherit focus:dark:ring-zinc-700  focus:ring-zinc-300 h-10"
      />
      <Button variant="outline" type="submit" className="h-10">
        Search
      </Button>
    </form>
  );
}
