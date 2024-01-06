<template>
  <header class="header">
    <h1>todos</h1>
    <form @submit.prevent="submitBtn$.next(true)">
      <input class="new-todo" placeholder="What needs to be done?" ref="inputRef" :autoFocus=true />
    </form>
  </header>
</template>


<script setup lang="ts">
import { tap } from "rxjs";
import { onUnmounted, ref } from "vue";
import { getSubject } from "../../common/util";
import { addTodo } from "../../services/todolist.service";

let inputRef = ref<HTMLInputElement>();

const submitBtn$ = getSubject<boolean>();

const submitSub = submitBtn$
  .pipe(
    tap(() => {
      const v = inputRef.value?.value ?? "";
      if (v !== "") {
        addTodo(v ?? "");
        inputRef.value!.value = "";
      }
    })
  )
  .subscribe();

onUnmounted(() => {
  submitSub.unsubscribe();
})
</script>
