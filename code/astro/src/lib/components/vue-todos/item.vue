<template>
  <li :class="{ 'completed': props.completed }">
    <div class="view">
      <input class="toggle" type="checkbox" v-model="props.completed" @change.prevent="updateItemBtn$.next(true)"
        ref="inputElemRef" />
      <label>{{ props.title }}</label>
      <button @click.prevent="destroyBtn$.next(true)" class="destroy"></button>
    </div>
  </li>
</template>

<script setup lang="ts">
import { filter, tap } from "rxjs";
import { onUnmounted, ref } from "vue";
import { getSubject } from "../../../lib/common/util";
import {
  delTodo,
  updateTodo,
  type todoType
} from "../../../lib/services/todolist.service";

const params = defineProps<{ props: todoType }>();

let inputElemRef = ref<HTMLInputElement>();

const updateItemBtn$ = getSubject<boolean>();
const destroyBtn$ = getSubject<boolean>();

const updateItemSub = updateItemBtn$
  .pipe(
    filter(() => !!inputElemRef.value),
    tap(() => {
      const newObj = JSON.parse(JSON.stringify(params)) as todoType;
      newObj.completed = inputElemRef.value?.checked ?? false;
      updateTodo(newObj);
    })
  )
  .subscribe();

const destroySub = destroyBtn$
  .pipe(tap(() => delTodo(params.props.id ?? 0)))
  .subscribe();

onUnmounted(() => {
  updateItemSub.unsubscribe();
  destroySub.unsubscribe();
});
</script>
