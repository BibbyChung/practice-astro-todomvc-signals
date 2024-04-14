<script lang="ts">
  import { switchMap, of } from "rxjs";
  import { onMount } from "svelte";
  import { getSubject } from "~/lib/common/util";
  import { addTodo } from "~/lib/services/todolist.service";

  let inputRef: HTMLInputElement;

  const submitBtn$ = getSubject<boolean>();

  const submitSub = submitBtn$
    .pipe(
      switchMap(() => {
        const v = inputRef?.value ?? "";
        if (v !== "") {
          inputRef.value = "";
          return addTodo(v ?? "");
        }
        return of(true);
      })
    )
    .subscribe();

  onMount(() => {
    return () => {
      submitSub.unsubscribe();
    };
  });
</script>

<header class="header">
  <h1>todos</h1>
  <form on:submit|preventDefault={() => submitBtn$.next(true)}>
    <input
      class="new-todo"
      placeholder="What needs to be done?"
      bind:this={inputRef}
      autoFocus={true}
    />
  </form>
</header>
