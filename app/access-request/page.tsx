import FormContainer from "@/components/formContainer";
import RequestForm from "./components/requestForm";

function AccessRequest() {
  return (
    // <>
    //   <h1 className="mx-auto w-full text-3xl max-w-fit mt-10">Submit request to become a user</h1>
    //   <div className="w-3/4 md:w-96 mx-auto my-10 flex flex-col items-center">
    //     <RequestForm />
    //   </div>
    // </>
    <FormContainer title="Submit request to become a user">
      <RequestForm />
    </FormContainer>
  );
}

export default AccessRequest;
