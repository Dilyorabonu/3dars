import {
  addDoc,
  collection,
  serverTimestamp,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import toast from "react-hot-toast";

export const useFirestore = () => {
  //delete
  const deleteDocument = async (id) => {
    await deleteDoc(doc(db, "todos", id));
    toast.success("Deleted");
  };
  //add
  const addNewDoc = async (doc) => {
    await addDoc(collection(db, "todos"), {
      ...doc,
      createdAt: serverTimestamp(),
    });
    toast.success("New doc Added");
  };
  //change
  const changeStatus = async (id, status) => {
    const selectedDoc = doc(db, "todos", id);

    await updateDoc(selectedDoc, {
      completed: !status,
    });

    toast.success("Status changed");
  };

  return { deleteDocument, addNewDoc, changeStatus };
};
