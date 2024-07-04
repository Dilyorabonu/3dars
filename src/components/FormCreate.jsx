import { FormInput, FormCheckbox } from "../components";
import { useFirestore } from "../hooks/useFirestore";
import { Form, useActionData } from "react-router-dom";
import { useEffect } from "react";

function FormCreate({ user }) {
  const { addNewDoc } = useFirestore();

  const userData = useActionData();

  useEffect(() => {
    if (userData) {
      const newDoc = {
        ...userData,
        uid: user.uid,
      };
      addNewDoc(newDoc);
    }
  }, [userData]);
  return (
    <Form
      method="post"
      className="flex flex-col items-center gap-4 card bg-base-100 w-96 shadow-xl p-5"
    >
      <h1 className="text-3xl font-semibold">Add new Todo</h1>
      <FormInput type="text" labelText="title" name="title" />
      <FormCheckbox name="completed" />
      <div className="w-full">
        <button className="btn btn-secondary btn-block">Add</button>
      </div>
    </Form>
  );
}

export default FormCreate;
