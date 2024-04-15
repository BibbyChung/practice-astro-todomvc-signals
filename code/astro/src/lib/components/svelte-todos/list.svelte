<script lang="ts">
  import { filter, map, merge, switchMap, tap } from "rxjs";
  import { onMount } from "svelte";
  import { getSubject } from "~/lib/common/util";
  import {
    getTodos,
    getTodosSSR,
    setAllTodosCompleted,
  } from "~/lib/services/todolist.service";
  import AddItem from "./addItem.svelte";
  import Footer from "./footer.svelte";
  import Item from "./item.svelte";

  const isReady$ = getSubject<boolean>();

  let checkboxToggleElem: HTMLInputElement;

  const checkSelectAllBtn$ = getSubject<boolean>();

  const todos$ = merge(
    getTodosSSR(),
    isReady$.pipe(switchMap(() => getTodos()))
  );

  const checkSelectAllSub = checkSelectAllBtn$
    .pipe(
      filter(() => !!checkboxToggleElem),
      switchMap(() => setAllTodosCompleted(checkboxToggleElem.checked))
    )
    .subscribe();

  const toggleCheckboxSub = todos$
    .pipe(
      map((todos) => {
        const total = todos.length;
        const selectedCount = todos.filter((a) => a.completed).length;
        if (total === 0) {
          return false;
        }
        return total === selectedCount;
      }),
      tap((isSelected) => {
        if (checkboxToggleElem) {
          checkboxToggleElem.checked = isSelected;
        }
      })
    )
    .subscribe();

  onMount(() => {
    isReady$.next(true);
    return () => {
      toggleCheckboxSub.unsubscribe();
      checkSelectAllSub.unsubscribe();
    };
  });
</script>

<section class="todoapp">
  <AddItem />
  <section class="main">
    <input
      id="toggle-all"
      class="toggle-all"
      type="checkbox"
      on:change|preventDefault={(e) => checkSelectAllBtn$.next(true)}
      bind:this={checkboxToggleElem}
    />
    <label for="toggle-all">Mark all as complete</label>
    <!-- {JSON.stringify($todos$)} -->
    <ul class="todo-list">
      {#each $todos$ as item}
        <!-- {JSON.stringify(item)} -->
        <Item params={item} />
      {/each}
    </ul>
  </section>

  <Footer />
</section>
