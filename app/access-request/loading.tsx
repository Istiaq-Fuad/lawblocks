import React from "react";
import { AiOutlineLoading } from "react-icons/ai";

function Loading() {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <AiOutlineLoading height={40} width={40} />
    </div>
  );
}

export default Loading;
