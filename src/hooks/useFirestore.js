import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import toast from "react-hot-toast";

export const useFirestore = () => {
  //delete
  const deleteDoc = (id) => {};
  //add
  const addNewDoc = async (doc) => {
    await addDoc(collection(db, "todos"), {
      ...doc,
      createdAt: serverTimestamp(),
    });
    toast.success("New doc Added");
  };

  return { deleteDoc, addNewDoc };
};
