<template>
  <h1>Todos</h1>
  <form class="todo-form" @submit.prevent="handleAddTodo">
    <label>Todo name:</label>
    <div class="input-and-button">
      <div class="text-input">
        <input type="text" v-model="newTodoTitle" :maxlength="maxLength" data-test="Text Input"/>
        <div class="remaining-characters">
          {{ maxLength - newTodoTitle.length }}
        </div>
      </div>
      <button class="icon-button" data-test="Add Button" :disabled="newTodoTitle.length === 0">
        <i class="fa-solid fa-square-plus fa-xl"></i>
      </button>
    </div>
  </form>
  <div class="todos-container">
    <section v-if="todos" class="todos">
      <TodoItem
        v-for="todo in todos"
        :key="todo.id"
        :todo="todo"
        @deleteTodo="deleteTodo(todo.id)"
        @toggleComplete="updateTodo(todo.id)"
      />
    </section>
    <section v-else-if="fetchError">
      Error fetching todos: {{ fetchError }}
    </section>
    <section v-else>Loading...</section>
  </div>
</template>

<script setup lang="ts">
import type { Todo } from "@/types";
import { onMounted, ref } from "vue";
import TodoItem from "../components/TodoItem.vue";

const urlTodos = "http://localhost:1337/todos";
const todos = ref<Todo[] | null>(null);
const fetchError = ref(null);
const newTodoTitle = ref<string>("");
const maxLength = 35;

const getTodos = async () => {
  await fetch(urlTodos)
    .then((res) => res.json())
    .then((res) => {
      todos.value = res as Todo[];
    })
    .catch((err) => {
      fetchError.value = err.message;
    });
};

const updateTodo = async (id: number) => {
  const targetTodo = todos.value?.find((todo) => todo.id === id);
  if (targetTodo) {
    targetTodo.completed = !targetTodo.completed;
    await fetch(`${urlTodos}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(targetTodo),
    }).catch((err) => console.log(err));
  }
};

const addTodo = async () => {
  const freshTodo: Todo = {
    id: 0,
    title: newTodoTitle.value,
    completed: false,
  };

  await fetch(urlTodos, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(freshTodo),
  })
    .then(() => getTodos())
    .catch((err) => console.log(err));
  newTodoTitle.value = "";
};

const deleteTodo = async (id: number) => {
  await fetch(`${urlTodos}/${id}`, {
    method: "DELETE",
  })
    .then(() => getTodos())
    .catch((err) => console.log(err));
};

const handleAddTodo = () => {
  console.log("Add todo.");
  addTodo();
};

onMounted(() => {
  getTodos();
});
</script>

<style scoped lang="scss">
.text-input {
  display: flex;
  > * {
    outline: none;
    border-style: solid;
    border-width: 2px;
    border-color: var(--color-border);
    border-radius: 3px;
    &:first-child {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      transition: border-color 0.1s ease-out;
      &:focus {
        border-color: var(--c-accent);
      }
    }
    &:last-child {
      border-left: none;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }
}

.remaining-characters {
  padding-inline: 3px;
}
.todo-form,
.input-and-button {
  display: flex;
  column-gap: var(--content-padding);
  flex-wrap: wrap;
}

.todo-form,
.todos-container {
  padding-bottom: var(--content-padding);
}

.todos {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  gap: 1rem;
}
</style>
