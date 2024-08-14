import React from "react";

function FormContainer({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <>
      {title && <h1 className="mx-auto w-full text-3xl max-w-fit mt-10">{title}</h1>}
      <div className="w-3/4 md:w-96 mx-auto my-10 flex flex-col items-center">
        {children}
      </div>
    </>
  );
}

export default FormContainer;
