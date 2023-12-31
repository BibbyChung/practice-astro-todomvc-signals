import { useRef } from "react";
import { addTodo } from "~/lib/services/todolist.service";

export default function AddItem() {
  const inputRef = useRef<HTMLInputElement>(null);

  const formSubmit = () => {
    const v = inputRef.current?.value ?? '';
    if (v !== '' && inputRef.current) {
      addTodo(v ?? '');
      inputRef.current.value = "";
    }
  };

  return (
    <header className="header">
      <h1>todos</h1>
      <form
        onSubmit={(e) => {
          formSubmit();
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
