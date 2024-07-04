import { useFirestore } from "../hooks/useFirestore";

import ModalDialog from "./ModalDialog";

function TodoList({ todos }) {
  const { deleteDocument, changeStatus } = useFirestore();
  return (
    <div>
      <ModalDialog />
      {todos &&
        todos.map((todo) => {
          return (
            <div
              className={`flex gap-4 items-center w-96 justify-between p-5 shadow-xl ${
                todo.completed ? "opacity-25" : "opacity-100"
              }`}
              key={todo.id}
            >
              <h3 className="text-3xl">{todo.title}</h3>
              <button
                className="btn btn-sm"
                onClick={() =>
                  document.getElementById("my_modal_1").showModal()
                }
              >
                Change modal
              </button>

              <div className="flex gap-4">
                <button
                  onClick={() => changeStatus(todo.id, todo.completed)}
                  className="btn btn-secondary btn-sm"
                >
                  {todo.completed ? "Uncompleted" : "Completed"}
                </button>
                <button
                  onClick={() => deleteDocument(todo.id)}
                  className="btn btn-secondary btn-sm"
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
