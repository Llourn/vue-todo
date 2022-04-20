<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
  id: number;
  title: string;
  completed: boolean;
}>();

const isCompleted = ref(props.completed);
</script>

<template>
  <section class="todo-item">
    <div class="todo-item__checkbox">
      <input type="checkbox" v-model="isCompleted" @change="$emit('toggleComplete')"/>
    </div>
    <p
      class="todo-item__title"
      :class="{ 'todo-item__title--completed': isCompleted }"
    >
      {{ title }}
    </p>

    <div class="todo-item__delete">
      <div class="todo-item__delete-button" @click="$emit(`deleteTodo`)">
        <i class="fa-solid fa-trash fa-lg"></i>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.todo-item {
  display: flex;
  gap: 1rem;
  max-width: 60ch;
  padding-inline: 2ch;
  padding-block: 1ch;
  // >* {
  //   display: flex;
  //   align-items: center;
  // }
}

.todo-item__title {
  flex-grow: 2;
}

.todo-item__title--completed {
  text-decoration: line-through;
}

.todo-item__checkbox {
  accent-color: var(--color-text);
}

.todo-item__delete-button {
  cursor: pointer;
  &:hover {
    animation: bounce-hover 0.5s;
    color: #c12f81;
    transition: color 0.2s linear;
  }
}

@keyframes bounce-hover {
  0% {
    transform: scale(1);
  }
  25% {
    transform: scale(0.75);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
</style>
