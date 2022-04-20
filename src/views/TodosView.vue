<script setup lang="ts">
import { ref, onMounted } from "vue";
import TodoItem from "../components/TodoItem.vue";
import type { Todo } from "../types";

const todos = ref<Todo[] | null>(null);
const inputError = ref<string | null>(null);
const getTodosError = ref<any>(null);

const newTodo = ref("");

function getTodos() {
  fetch("http://localhost:3004/todos")
    .then((res) => res.json())
    .then((json) => (todos.value = json))
    .catch((err) => (getTodosError.value = err));
}

function addNewTodo() {
  if (!newTodo.value) {
    inputError.value =
      "Todo name cannot be left blank. Enter a name and try again.";
  } else {
    const freshTodo = {
      id: getRandomId(),
      title: newTodo.value,
      completed: false,
    };
    if (todos.value && todos.value.length > 0) todos.value.push(freshTodo);

    fetch("http://localhost:3004/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(freshTodo),
    }).catch((error) => console.log(error));
    newTodo.value = "";
  }
}

function removeTask(id: number) {
  console.log("delete task: ", id);
  fetch(`http://localhost:3004/todos/${id}`, {
    method: "DELETE",
  })
    .then(() => getTodos())
    .catch((error) => console.log(error));
}

function toggleComplete(id: number) {
  const todoToUpdate = todos.value?.filter((todo) => {
    return todo.id === id;
  })[0];
  if (todoToUpdate) {
    todoToUpdate.completed = !todoToUpdate.completed;
    fetch(`http://localhost:3004/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todoToUpdate),
    }).catch((error) => console.log(error));
  }
}

function getRandomId() {
  return Math.floor(Math.random() * 10000000000);
}

function clearError() {
  inputError.value = null;
}

onMounted(() => {
  getTodos();
});
</script>

<template>
  <div class="container">
    <h1>Todo List</h1>
    <form @submit.prevent="addNewTodo">
      <input
        @input="clearError"
        v-model="newTodo"
        placeholder="Enter name of Todo"
      />
      <button class="todo-button">
        <i class="fa-solid fa-plus fa-xl"></i>
      </button>
    </form>
    <Transition name="input-error">
      <p v-if="inputError" >{{ inputError }}</p>
    </Transition>
    <div v-if="getTodosError">
      Error encountered: {{ getTodosError.message }}
    </div>
    <div class="todo-container" v-else-if="todos">
      <TodoItem
        v-for="todo in todos"
        :key="todo.id"
        :id="todo.id"
        :title="todo.title"
        :completed="todo.completed"
        @deleteTodo="removeTask(todo.id)"
        @toggle-complete="toggleComplete(todo.id)"
      />
    </div>
    <div v-else>Loading...</div>
  </div>
</template>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.todo-container {
  margin: 1rem;
  > :nth-child(2n + 1) {
    background-color: rgba(0, 0, 0, 0.1);
  }
}

.todo-button {
  border: none;
  background-color: transparent;
  cursor: pointer;
  > * {
    &:hover {
      animation: bounce-hover 0.5s;
      color: #c12f81;
      transition: color 0.2s linear;
    }
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

.input-error-enter-active,
.input-error-leave-active {
  transition: opacity 0.5s ease;
}

.input-error-enter-from,
.input-error-leave-to {
  opacity: 0;
}
</style>
