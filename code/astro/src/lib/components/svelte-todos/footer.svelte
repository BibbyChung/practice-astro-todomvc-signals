<script lang="ts">
  import { map, switchMap, tap } from "rxjs";
  import { onMount } from "svelte";
  import { getSubject } from "~/lib/common/util";
  import {
    getTodos,
    getTodosFilter,
    removeAllTodosCompleted,
    setTodosFilter,
    type todosFilterType
  } from "~/lib/services/todolist.service";

  const removeAllTodosBtn$ = getSubject<boolean>();
  const setTodosFilterBtn$ = getSubject<todosFilterType>();

  const isShowClearCompleted$ = getTodos().pipe(
    map((todos) => {
      const completedCount = todos.filter((a) => a.completed).length;
      return completedCount !== 0;
    })
  );

  const uncompletedCount$ = getTodos().pipe(
    map((todos) => todos.filter((a) => !a.completed).length)
  );

  const todoFilter$ = getTodosFilter();

  const setTodosFilterSub = setTodosFilterBtn$
    .pipe(tap((type) => setTodosFilter(type)))
    .subscribe();

  const removeAllTodosSub = removeAllTodosBtn$
    .pipe(switchMap(() => removeAllTodosCompleted()))
    .subscribe();

  onMount(() => {
    return () => {
      removeAllTodosSub.unsubscribe();
      setTodosFilterSub.unsubscribe();
    };
  });
</script>

<footer class="footer">
  <span class="todo-count">
    {$uncompletedCount$ === 1
      ? "1 item left"
      : `${$uncompletedCount$} items left`}
  </span>
  <ul class="filters">
    <li>
      <a
        on:click|preventDefault={() => setTodosFilterBtn$.next("all")}
        href="#/"
        class={$todoFilter$ === "all" ? "selected" : ""}>All</a
      >
    </li>
    <li>
      <a
        on:click|preventDefault={() => setTodosFilterBtn$.next("active")}
        href="#/"
        class={$todoFilter$ === "active" ? "selected" : ""}>Active</a
      >
    </li>
    <li>
      <a
        on:click|preventDefault={() => setTodosFilterBtn$.next("completed")}
        href="#/"
        class={$todoFilter$ === "completed" ? "selected" : ""}>Completed</a
      >
    </li>
  </ul>
  <div>
    {#if $isShowClearCompleted$}
      <button
        on:click|preventDefault={() => removeAllTodosBtn$.next(true)}
        class="clear-completed"
      >
        Clear completed
      </button>
    {/if}
  </div>
</footer>
