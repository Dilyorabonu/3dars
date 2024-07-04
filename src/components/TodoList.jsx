import { useFirestore } from "../hooks/useFirestore";

function TodoList({ todos }) {
  const { deleteDocument } = useFirestore();
  return (
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
  );
}

export default TodoList;
