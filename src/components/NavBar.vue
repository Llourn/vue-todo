<template>
  <nav class="nav-bar">
    <div class="nav-bar__container container">
      <div class="brand">
        <i class="fa-solid fa-meteor fa-xl"></i>
        <span>TODO APP</span>
      </div>
      <div class="nav-links">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/todos">Todos</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<style scoped lang="scss">
.nav-bar {
  background: var(--c-test);
}

.nav-bar__container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav-links {
  display: flex;
  gap: 1rem;
}

.brand {
  display: flex;
  gap: 1rem;
}
</style>
