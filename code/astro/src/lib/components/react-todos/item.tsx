import { useEffect } from "react";
import { tap } from "rxjs";
import { useSubject } from "~/lib/common/rxjs-interop-react";
import { delTodo, updateTodo, type todoType } from "~/lib/services/todolist.service";

export default function Item(params: todoType) {
  const destroyBtn$ = useSubject<boolean>();
  const updateItemBtn$ = useSubject<boolean>();

  useEffect(() => {
    const destroySub = destroyBtn$
      .pipe(
        tap(() => delTodo(params.id))
      ).subscribe();

    const updateItemSub = updateItemBtn$.pipe(
      tap((isChecked) => {
        const newObj = JSON.parse(JSON.stringify(params)) as todoType;
        newObj.completed = isChecked;
        updateTodo(newObj);
      })
    ).subscribe();

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
          className="destroy"
        ></button>
      </div>
    </li>
  );
}
