<script setup lang="ts">
import NavBar from "./components/NavBar.vue";
import { RouterView } from "vue-router";
</script>

<template>
  <NavBar />
  <div class="views">
    <RouterView />
  </div>
</template>

<style lang="scss">
@import "./assets/base.css";

.views {
  margin-top: var(--s-nav-bar-height);
}
</style>
