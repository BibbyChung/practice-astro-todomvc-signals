<template>
  <footer class="footer">
    <span class="todo-count">
      <template v-if="uncompletedCountRef === 1">
        1 uncompleted item left
      </template>
      <template v-else>
        {{ uncompletedCountRef }} uncompleted items left
      </template>
    </span>
    <ul class="filters">
      <li>
        <a @click.prevent="setTodosFilterBtn$.next('all')" :class="{ 'selected': todoFilterRef === 'all' }"
          href="#/">All</a>
      </li>
      <li>
        <a @click.prevent="setTodosFilterBtn$.next('active')" :class="{ 'selected': todoFilterRef === 'active' }"
          href="#/">Active</a>
      </li>
      <li>
        <a @click.prevent="setTodosFilterBtn$.next('completed')" :class="{ 'selected': todoFilterRef === 'completed' }"
          href="#/">Completed</a>
      </li>
    </ul>
    <div>
      <button v-if="isShowClearCompletedRef" @click.prevent="removeAllTodosBtn$.next(true)"
        class="clear-completed">Clear
        completed
      </button>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { map, switchMap, tap } from "rxjs";
import { onUnmounted } from "vue";
import { getSubject } from "../../../lib/common/util";
import {
  getTodos,
  getTodosFilter,
  removeAllTodosCompleted,
  setTodosFilter,
  type todosFilterType
} from "../../../lib/services/todolist.service";
import { toRef } from '../../common/rxjs-interop-vue';

const removeAllTodosBtn$ = getSubject<boolean>();
const setTodosFilterBtn$ = getSubject<todosFilterType>();

const isShowClearCompletedRef = toRef(getTodos()
  .pipe(
    map((todos) => {
      const completedCount = todos.filter((a) => a.completed).length;
      return completedCount !== 0;
    })
  ));

const uncompletedCountRef = toRef(getTodos()
  .pipe(
    map((todos) => todos.filter((a) => !a.completed).length)
  ));

const todoFilterRef = toRef(getTodosFilter());

const setTodosFilterSub = setTodosFilterBtn$
  .pipe(tap((type) => setTodosFilter(type)))
  .subscribe();

const removeAllTodosSub = removeAllTodosBtn$
  .pipe(switchMap(() => removeAllTodosCompleted()))
  .subscribe();

onUnmounted(() => {
  removeAllTodosSub.unsubscribe();
  setTodosFilterSub.unsubscribe();
});
</script>
