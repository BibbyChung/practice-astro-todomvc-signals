<script lang="ts">
  import { filter, switchMap } from "rxjs";
  import type { todoType } from "src/server/todos.router";
  import { onMount } from "svelte";
  import { getSubject } from "~/lib/common/util";
  import { delTodo, updateTodo } from "~/lib/services/todolist.service";

  export let params: todoType;
  let inputElem: HTMLInputElement;

  const updateItemBtn$ = getSubject<boolean>();
  const destroyBtn$ = getSubject<boolean>();

  const updateItemSub = updateItemBtn$
    .pipe(
      filter(() => !!inputElem),
      switchMap(() => {
        const newObj = JSON.parse(JSON.stringify(params)) as todoType;
        newObj.completed = inputElem.checked;
        return updateTodo(newObj);
      })
    )
    .subscribe();

  const destroySub = destroyBtn$
    .pipe(switchMap(() => delTodo(params.id)))
    .subscribe();

  onMount(() => {
    return () => {
      updateItemSub.unsubscribe();
      destroySub.unsubscribe();
    };
  });
</script>

<li class={params.completed ? "completed" : ""}>
  <div class="view">
    <input
      class="toggle"
      type="checkbox"
      checked={params.completed}
      on:change|preventDefault={() => updateItemBtn$.next(true)}
      bind:this={inputElem}
    />
    <!-- // eslint-disable-next-line svelte/valid-compile -->
    <label>{params.title}</label>
    <button
      on:click|preventDefault={() => destroyBtn$.next(true)}
      class="destroy"
    ></button>
  </div>
</li>
