import { useSignals } from "@preact/signals-react/runtime";
import { useEffect, useRef } from "react";
import { map, of, switchMap, take, tap } from "rxjs";
import { toSignal } from "~/lib/common/rxjs-interop-react";
import { getTodos, setAllTodosCompleted } from "~/lib/services/todolist.service";
import AddItem from "./addItem";
import Footer from "./footer";
import Item from "./item";

export default function TodoList() {
  useSignals();
  const checkboxToggle = useRef<HTMLInputElement>(null);
  const todosSig = toSignal(getTodos());

  useEffect(() => {
    // check checkbox of toggle status
    const toggleCheckboxSub = getTodos().pipe(
      map((todos) => {
        const total = todos.length;
        const selectedCount = todos.filter((a) => a.completed).length;
        if (total === 0) {
          return false;
        }
        return total === selectedCount;
      }),
      tap((isSelected) => {
        if (checkboxToggle.current) {
          checkboxToggle.current.checked = isSelected;
        }
      })
    ).subscribe();

    return () => {
      toggleCheckboxSub.unsubscribe();
    };
  }, []);

  const checkSelectAll = (isSelected: boolean) => {
    of(true).pipe(
      take(1),
      switchMap(() => setAllTodosCompleted(isSelected))
    ).subscribe();
  };

  return (
    <section className="todoapp">
      <AddItem />
      <section className="main">
        <input
          id="toggle-all"
          className="toggle-all"
          type="checkbox"
          onChange={(e) => {
            checkSelectAll(e.target.checked);
            // e.preventDefault();
          }}
          ref={checkboxToggle}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <ul className="todo-list">
          {todosSig.value?.map((item, i) => (
            <Item key={item.id} {...item} />
          ))}
        </ul>
      </section>

      <Footer />
      {/* {JSON.stringify(todosSig.value)} */}
    </section>
  );
}
