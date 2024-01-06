<template>
  <section class="todoapp">
    <AddItem />
    <section class="main">
      <input id="toggle-all" class="toggle-all" type="checkbox" @change.prevent="checkSelectAllBtn$.next(true)"
        ref="checkboxToggleElemRef" />
      <label for="toggle-all">Mark all as complete</label>
      <ul class="todo-list">
        <Item v-for="(item, index) in todosRef ?? []" key="{{ index }}" :props=item />
      </ul>
    </section>

    <Footer />
  </section>
</template>

<script setup lang="ts">
import { filter, map, switchMap, tap } from "rxjs";
import { onUnmounted, ref } from "vue";
import { getSubject } from "../../../lib/common/util";
import {
  getTodos,
  setAllTodosCompleted
} from "../../../lib/services/todolist.service";
import { toRef } from '../../common/rxjs-interop-vue';
import AddItem from "./addItem.vue";
import Footer from "./footer.vue";
import Item from "./item.vue";

let checkboxToggleElemRef = ref<HTMLInputElement>();

const checkSelectAllBtn$ = getSubject<boolean>();

const todosRef = toRef(getTodos());

const checkSelectAllSub = checkSelectAllBtn$
  .pipe(
    filter(() => !!checkboxToggleElemRef.value),
    switchMap(() => setAllTodosCompleted(checkboxToggleElemRef?.value?.checked ?? false))
  )
  .subscribe();

const toggleCheckboxSub = getTodos()
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
      if (checkboxToggleElemRef.value) {
        checkboxToggleElemRef.value!.checked = isSelected;
      }
    })
  )
  .subscribe();

onUnmounted(() => {
  toggleCheckboxSub.unsubscribe();
  checkSelectAllSub.unsubscribe();
});
</script>