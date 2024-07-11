import { FormInput, FormCheckbox } from "../components"; // Importing custom form input and checkbox components
import { useFirestore } from "../hooks/useFirestore"; // Importing Firestore hook for database operations
import { Form, useActionData } from "react-router-dom"; // Importing Form and useActionData from react-router-dom
import { useEffect } from "react"; // Importing useEffect hook from React

function FormCreate({ user }) {
  const { addNewDoc } = useFirestore(); // Destructuring addNewDoc function from Firestore hook

  const userData = useActionData(); // Fetching action data from react-router-dom

  useEffect(() => {
    // Using useEffect to handle side effects
    if (userData) {
      // Checking if userData exists
      const newDoc = {
        ...userData, // Spreading userData to create a new document object
        completed: userData.completed == "on" ? true : false, // Converting completed value to boolean
        uid: user.uid, // Adding user ID to the new document
      };
      addNewDoc(newDoc); // Adding the new document to Firestore
    }
  }, [userData]); // Dependency array to re-run useEffect when userData changes

  return (
    <Form
      method="post" // Setting the form method to POST
      className="flex flex-col items-center gap-4 card bg-base-100 w-full md:w-96 shadow-xl p-5"
    >
      <h1 className="text-3xl font-semibold">Add new Todo</h1>
      <FormInput type="text" labelText="Title" name="title" />{" "}
      {/* Custom text input component for the title */}
      <FormCheckbox name="completed" />{" "}
      {/* Custom checkbox component for completion status */}
      <div className="w-full">
        <button className="btn btn-secondary btn-block">Add</button>{" "}
        {/* Add button */}
      </div>
    </Form>
  );
}

export default FormCreate;
