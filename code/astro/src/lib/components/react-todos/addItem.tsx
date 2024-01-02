import { useEffect, useRef } from "react";
import { tap } from "rxjs";
import { useSubject } from "~/lib/common/rxjs-interop-react";
import { addTodo } from "~/lib/services/todolist.service";

export default function AddItem() {
  const inputRef = useRef<HTMLInputElement>(null);
  const formSubmitForm$ = useSubject<boolean>();

  useEffect(() => {
    const formSubmitSub = formSubmitForm$.pipe(
      tap(() => {
        const v = inputRef.current?.value ?? '';
        if (v !== '' && inputRef.current) {
          addTodo(v ?? '');
          inputRef.current.value = "";
        }
      })
    ).subscribe();

    return () => {
      formSubmitSub.unsubscribe();
    };
  }, []);

  return (
    <header className="header">
      <h1>todos</h1>
      <form
        onSubmit={(e) => {
          formSubmitForm$.next(true);
          e.preventDefault();
        }}
      >
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus={true}
          ref={inputRef}
        />
      </form>
    </header>
  );
}
