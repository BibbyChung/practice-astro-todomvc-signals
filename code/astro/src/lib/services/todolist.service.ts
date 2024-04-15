import {
  combineLatest,
  from,
  map,
  of,
  shareReplay,
  switchMap,
  take,
  tap,
} from "rxjs";
import type { todoType } from "src/server/todos.router";
import { trpc } from "../common/trpc";
import { getBehaviorSubject, getUUID } from "../common/util";

export type todosFilterType = "all" | "active" | "completed";
const todosFilter$ = getBehaviorSubject<todosFilterType>("all");
export const setTodosFilter = (ff: todosFilterType) => todosFilter$.next(ff);
export const getTodosFilter = () => todosFilter$.asObservable();

const refetchTodos = () => setTodosFilter(todosFilter$.value);

const todosSSR$ = getBehaviorSubject<todoType[]>([]);
export const setTodosSSR = (v: todoType[]) => todosSSR$.next(v);
export const getTodosSSR = () => todosSSR$.asObservable();

const todosBrowser$ = getTodosFilter().pipe(
  switchMap((f) =>
    combineLatest([
      // this can't be called in server
      from(trpc.todos.getAll.query()),
      of(f),
    ])
  ),
  map(([todos, f]) => {
    switch (f) {
      case "active":
        return todos.filter((a) => !a.completed);
      case "completed":
        return todos.filter((a) => a.completed);
      default:
        return todos;
    }
  }),
  shareReplay(1)
);
export const getTodos = () => todosBrowser$;
export const addTodo = (title: string) => {
  const todo = {
    title,
    id: getUUID(),
    completed: false,
  };
  return from(trpc.todos.add.mutate(todo)).pipe(tap(() => refetchTodos()));
};
export const delTodo = (id: string) =>
  from(trpc.todos.del.mutate({ id })).pipe(tap(() => refetchTodos()));
export const updateTodo = (todo: todoType) =>
  from(trpc.todos.update.mutate(todo)).pipe(tap(() => refetchTodos()));

export const setAllTodosCompleted = (isCompleted: boolean) =>
  getTodos().pipe(
    take(1),
    switchMap((todos) => {
      const pArr = todos.map((a) => {
        a.completed = isCompleted;
        return from(trpc.todos.update.mutate(a));
      });
      return combineLatest(pArr);
    }),
    tap(() => refetchTodos())
  );
export const removeAllTodosCompleted = () =>
  getTodos().pipe(
    take(1),
    switchMap((todos) => {
      const newTodos = todos.filter((a) => a.completed);
      const pArr = newTodos.map((todo) =>
        from(trpc.todos.del.mutate({ id: todo.id }))
      );
      return combineLatest(pArr);
    }),
    tap(() => refetchTodos())
  );
