<script setup lang="ts">
import { RouterView } from "vue-router";
import NavBar from "./components/NavBar.vue";
import Footer from "./components/Footer.vue";
</script>

<template>
  <header>
    <div class="wrapper">
      <NavBar />
    </div>
  </header>

  <main class="container">
    <RouterView />
  </main>

  <Footer />
</template>

<style lang="scss">
@use "@/styles/base.scss";
@use "@/styles/general.scss";
</style>
