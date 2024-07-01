import React from "react";
import { useSelector } from "react-redux";
import { useCollection } from "../hooks/useCollection";

function Home() {
  let { user } = useSelector((state) => state.user);
  let { data } = useCollection("todos", ["uid", "==", user.uid]);
  return (
    <div className=" aligen-conten">
      <h1 className=" text-5xl font-bold my-5">Todos</h1>
      <div className="grid grid-cols-3 gap-20">
        {data &&
          data.map((todo, id) => {
            return (
              <div
                key={id}
                className={`card bg-base-100 w-96 shadow-xl bg-[url('https://thumbs.dreamstime.com/z/to-do-list-white-paper-pencils-background-template-56711188.jpg')] bg-bottom ${
                  todo.complet && "opacity-50"
                }`}
              >
                <div className="card-body">
                  <h2 className="card-title py-2">{todo.title}</h2>

                  <div className="card-actions justify-end">
                    {todo.complet ? (
                      <button disabled className="btn ">
                        Bajarilgan
                      </button>
                    ) : (
                      <button className="btn ">Bagarish kerak</button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        {!data && (
          <span className="loading loading-ring loading-lg size-36 absolute text-center left-[700px]"></span>
        )}
      </div>
    </div>
  );
}

export default Home;
