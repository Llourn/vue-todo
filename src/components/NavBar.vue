<script setup lang="ts"></script>

<template>
  <nav>
    <div class="nav-bar">
      <div class="nav-bar__title">
        <i class="logo fa-solid fa-table-list fa-lg"></i>
        <span>TODO LIST APP</span>
      </div>
      <div class="nav-bar__links">
        <router-link to="/" class="link">
          <i class="fa-solid fa-table-list"></i>
          <span>Home</span>
        </router-link>
        <router-link to="/todos" class="link">
          <i class="fa-solid fa-table-list"></i>
          <span>Todos</span>
        </router-link>
        <router-link to="/about" class="link">
          <i class="fa-solid fa-table-list"></i>
          <span>About</span>
        </router-link>
      </div>
    </div>
  </nav>
</template>

<style lang="scss">
nav {
  background-color: whitesmoke;
  position: fixed;
  top: 0;
  z-index: 99;
  width: 100%;
}

.nav-bar {
  margin: auto;
  max-width: calc(100% - 2rem);
  height: var(--s-nav-bar-height);
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: space-between;
}

.nav-bar__title {
  span {
    padding-left: 1rem;
    font-weight: bolder;
  }
}

.nav-bar__links {
  display: flex;
  list-style: none;
  height: 100%;
  align-items: center;
  li {
    height: 100%;
    display: flex;
    align-items: center;
  }
}

.link {
  display: flex;
  align-items: center;
  gap: 3px;
  height: 100%;
  padding-inline: 10px;
  text-decoration: none;
  &:hover {
    background-color: rgba(0, 0, 0, 0.115);
  }
}
</style>
