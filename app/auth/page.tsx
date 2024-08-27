import React, { Suspense } from "react";
import AuthForm from "./components/AuthForm";

export default async function page() {
  return (
    <div className="flex items-center justify-center h-screen">
      <AuthForm />
    </div>
  );
}
