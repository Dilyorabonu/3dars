import { useFirestore } from "../hooks/useFirestore";
import { setSelectedTodo } from "../app/todosSlice";
import { useDispatch } from "react-redux";

import ModalDialog from "./ModalDialog";

function TodoList({ todos }) {
  const dispatch = useDispatch();
  const { deleteDocument, changeStatus } = useFirestore();

  // Function to handle changing the selected todo
  const handleChange = (todo) => {
    dispatch(setSelectedTodo(todo));
    document.getElementById("my_modal_1").showModal();
  };

  return (
    <div className="p-4 md:p-6 lg:p-8">
      {/* Modal for changing todo */}
      <ModalDialog />
      {todos &&
        todos.map((todo) => {
          return (
            <div
              className={`flex flex-col md:flex-row gap-2 items-center justify-between p-5 shadow-xl w-full ${
                todo.completed
                  ? "opacity-25 line-through"
                  : "opacity-100 no-underline"
              }`}
              key={todo.id}
            >
              <h3 className="text-xl md:text-2xl lg:text-3xl break-words flex-grow">
                {todo.title}
              </h3>
              <button
                className="btn btn-sm md:btn-md lg:btn-lg"
                onClick={() => handleChange(todo)}
              >
                Change modal
              </button>
              <div className="flex flex-col md:flex-row gap-2 items-center">
                <button
                  type="button"
                  onClick={() => changeStatus(todo.id, todo.completed)}
                  className="btn btn-secondary btn-sm md:btn-md lg:btn-lg"
                >
                  {todo.completed ? "Uncompleted" : "Completed"}
                </button>
                <input
                  onClick={() => changeStatus(todo.id, todo.completed)}
                  name={name}
                  type="checkbox"
                  className="checkbox checkbox-secondary"
                />
                <button
                  onClick={() => deleteDocument(todo.id)}
                  className="btn btn-secondary btn-sm md:btn-md lg:btn-lg"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default TodoList;
