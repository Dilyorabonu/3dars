import { useSelector } from "react-redux";
import { useCollection } from "../hooks/useCollection";
import { FormInput, FormCheckbox } from "../components";
import { Form, useActionData } from "react-router-dom";
import { useEffect } from "react";

import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import toast from "react-hot-toast";

import { useFirestore } from "../hooks/useFirestore";

export const action = async ({ request }) => {
  let formData = await request.formData();
  let title = formData.get("title");
  let completed = formData.get("completed");

  return { title, completed };
};

function Home() {
  const { user } = useSelector((state) => state.user);
  const { addNewDoc } = useFirestore();
  const { data: todos } = useCollection(
    "todos",
    ["uid", "==", user.uid],
    ["createdAt"]
  );
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

  const deleteDocument = (id) => {
    deleteDoc(doc(db, "todos", id)).then(() => {
      toast.success("Deleted");
    });
  };
  return (
    <div className="site-container">
      <div className="grid grid-cols-2">
        <div className="pt-10">
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
        </div>
        <div>
          {todos &&
            todos.map((todo) => {
              return (
                <div
                  className="flex gap-4 items-center w-96 justify-between p-5 shadow-xl"
                  key={todo.id}
                >
                  <h3 className="text-3xl">{todo.title}</h3>
                  <button
                    onClick={() => deleteDocument(todo.id)}
                    className="btn btn-secondary btn-sm"
                  >
                    Delete
                  </button>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Home;
