import { useSelector } from "react-redux";
import { useFirestore } from "../hooks/useFirestore";
import { useRef } from "react";

function ModalDialog() {
  const { selectedTodo } = useSelector((state) => state.todos);
  const { changeTitle, isPending } = useFirestore();
  const inputRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    changeTitle(selectedTodo.id, inputRef.current.value);
    document.getElementById("my_modal_1").close();
  };
  return (
    <dialog id="my_modal_1" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Hello!</h3>
        <p className="py-4">You can change your task in here.</p>
        <div className="modal-action">
          <form className="flex gap-5" onSubmit={handleSubmit} method="dialog">
            <input
              type="text"
              className="input input-secondary"
              defaultValue={selectedTodo?.title}
              ref={inputRef}
            />
            {/* if there is a button in form, it will close the modal */}
            {!isPending && (
              <button type="submit" className="btn btn-secondary">
                Submit
              </button>
            )}
            {isPending && (
              <button disabled className="btn btn-secondary">
                Loading...
              </button>
            )}
            <button type="button" className="btn">
              Close
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
}

export default ModalDialog;
