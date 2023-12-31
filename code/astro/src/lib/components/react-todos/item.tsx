import { delTodo, updateTodo, type todoType } from "~/lib/services/todolist.service";

export default function Item(params: todoType) {
  const destroy = (id: string) => {
    delTodo(id);
  };

  const updateItem = (isChecked: boolean) => {
    const newObj = JSON.parse(JSON.stringify(params)) as todoType;
    newObj.completed = isChecked;
    updateTodo(newObj);
  };

  return (
    <li className={params.completed ? "completed" : ""}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={params.completed}
          onChange={(e) => {
            updateItem(e.target.checked);
          }}
        />
        <label>{params.title}</label>
        <button
          onClick={(e) => {
            destroy(params.id);
            e.preventDefault();
          }}
          className="destroy"
        ></button>
      </div>
    </li>
  );
}
