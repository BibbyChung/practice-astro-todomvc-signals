import { useSignals } from "@preact/signals-react/runtime";
import { map, of, switchMap, take } from "rxjs";
import { toSignal } from "~/lib/common/rxjs-interop-react";
import { getTodos, getTodosFilter, removeAllTodosCompleted, setTodosFilter } from "~/lib/services/todolist.service";

export default function Footer() {
  useSignals();

  const isShowClearCompletedSig = toSignal(getTodos().pipe(
    map((todos) => {
      const completedCount = todos.filter((a) => a.completed).length;
      return completedCount !== 0;
    })
  ));

  const uncompletedCountSig = toSignal(
    getTodos().pipe(map((todos) => todos.filter((a) => !a.completed).length))
  );

  const todoFilterSig = toSignal(getTodosFilter());

  const removeAllTodos = () => {
    of(true).pipe(
      take(1),
      switchMap(() => removeAllTodosCompleted())
    ).subscribe();
  };

  return (
    <footer className="footer">
      <span>
        {uncompletedCountSig.value === 1
          ? "1 item left"
          : `${uncompletedCountSig.value} items left`}
      </span>
      <ul className="filters">
        <li>
          <a
            onClick={(e) => {
              e.preventDefault();
              setTodosFilter("all");
            }}
            href="#/"
            className={todoFilterSig.value === "all" ? "selected" : ""}
          >All</a>
        </li>
        <li>
          <a
            onClick={(e) => {
              e.preventDefault();
              setTodosFilter("active");
            }}
            href="#/"
            className={todoFilterSig.value === "active" ? "selected" : ""}
          >Active</a>
        </li>
        <li>
          <a
            onClick={(e) => {
              e.preventDefault();
              setTodosFilter("completed");
            }}
            href="#/"
            className={todoFilterSig.value === "completed" ? "selected" : ""}
          >Completed</a>
        </li>
      </ul>
      <div>
      {isShowClearCompletedSig.value
        ? (
          <button
            onClick={(e) => {
              removeAllTodos();
              e.preventDefault();
            }}
            className="clear-completed"
          >
            Clear completed
          </button>
          )
        : (
            ""
          )}
      </div>
    </footer>
  );
}
