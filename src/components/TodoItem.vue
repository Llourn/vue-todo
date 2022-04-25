<template>
  <div class="todo-item">
    <input type="checkbox" v-model="completed" @change="onCheckboxChange" data-test="Todo Checkbox" />
    <p :class="{'finished-todo': completed}">
      <div v-show="completed" :class="{'cross-out': completed}"></div>
      {{ todo.title }}
    </p>
    <div>
      <button v-if="!exploded" class="icon-button" @click="handleDelete"><i class="fa-solid fa-bomb fa-lg"></i></button>
      <i v-else-if="exploded" class="explosion fa-solid fa-burst"></i>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Todo } from "@/types";
import { ref } from "vue";

const props = defineProps<{ todo: Todo }>();
const emit = defineEmits<{
  (event: "deleteTodo"): void;
  (event: "toggleComplete"): void;
}>();

const completed = ref(props.todo.completed);
const exploded = ref(false);

const onCheckboxChange = () => {
  emit("toggleComplete");
};

const handleDelete = () => {
  exploded.value = true;

  setTimeout(() => {
    emit("deleteTodo");
  }, 300);
}
</script>

<style scoped lang="scss">
.todo-item {
  display: flex;
  gap: var(--content-padding);
  align-items: center;
}

.finished-todo {
  transition: color .2s ease-out;
  color: grey;
}

.cross-out {
  position: absolute;
  top: 54%;
  height: 2px;
  background-color: var(--color-text);
  animation: crossOut .2s ease-out;
  animation-fill-mode: forwards;
}

.explosion {
  color: red;
  animation: boom .3s linear;
  animation-fill-mode: forwards;
}

@keyframes crossOut {
  0% {
    width: 0%;
  }
  100% {
    width: 100%;
  }
}

@keyframes boom {
  0% {
    transform: scale(.5) rotate(0);
    color: yellow;
  }
  75% {
    transform: scale(1.5) rotate(45deg);
    color: orange;
  }
  100% {
    transform: scale(0) rotate(90deg);
    color: red;
  }
}
</style>
