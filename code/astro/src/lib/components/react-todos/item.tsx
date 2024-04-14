import { useEffect } from "react";
import { switchMap } from "rxjs";
import type { todoType } from "src/server/todos.router";
import { useSubject } from "~/lib/common/rxjs-interop-react";
import { delTodo, updateTodo } from "~/lib/services/todolist.service";

export default function Item(params: todoType) {
  const destroyBtn$ = useSubject<boolean>();
  const updateItemBtn$ = useSubject<boolean>();

  useEffect(() => {
    const destroySub = destroyBtn$
      .pipe(switchMap(() => delTodo(params.id)))
      .subscribe();

    const updateItemSub = updateItemBtn$
      .pipe(
        switchMap((isChecked) => {
          const newObj = JSON.parse(JSON.stringify(params)) as todoType;
          newObj.completed = isChecked;
          return updateTodo(newObj);
        })
      )
      .subscribe();

    return () => {
      destroySub.unsubscribe();
      updateItemSub.unsubscribe();
    };
  }, []);

  return (
    <li className={params.completed ? "completed" : ""}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={params.completed}
          onChange={(e) => {
            updateItemBtn$.next(e.target.checked);
          }}
        />
        <label>{params.title}</label>
        <button
          onClick={(e) => {
            destroyBtn$.next(true);
            e.preventDefault();
          }}
          className="destroy"></button>
      </div>
    </li>
  );
}
