<script setup lang="ts"></script>

<template>
  <main>
    <section class="splash">
      <article class="splash__content">
        <h1>This is the beginning</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi
          adipisci velit voluptates libero autem et blanditiis, animi expedita
          earum possimus id aspernatur. Enim necessitatibus repellendus
          aspernatur voluptate accusantium odio obcaecati?
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi
          adipisci velit voluptates libero autem et blanditiis, animi expedita
          earum possimus id aspernatur. Enim necessitatibus repellendus
          aspernatur voluptate accusantium odio obcaecati?
        </p>
        <h2>The Plan:</h2>
        <ul>
          <li>
            Create a landing page.
            <ul>
              <li class="strike">Nav bar, viewable on all views.</li>
              <li class="strike">Big colorful image somewhere.</li>
              <li class="strike">Maybe a card with a description?</li>
              <li>Footer with some contact information and copyright info?</li>
            </ul>
          </li>
          <li>
            Create a todo list:
            <ul>
              <li class="strike">Use json database.</li>
              <li class="strike">Use reusable component for todo item.</li>
              <li>
                What can you do with todos:
                <ul>
                  <li class="strike">Create</li>
                  <li class="strike">Delete</li>
                  <li class="strike">Complete</li>
                  <li>Hide completed todos</li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </article>
    </section>
  </main>
</template>

<style lang="scss">
.splash {
  background-image: url("./splash.jpg");
  background-size: cover;
  background-position: center;
  min-height: 400px;
}

.splash__content {
  position: absolute;
  max-width: 500px;
  bottom: 0;
  right: 0;
  box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
  background-color: white;
  transform: translateY(65%);
  margin-block: 2rem;
  margin-right: 10vw;
  padding: 1rem;
  overflow: auto;
  border-radius: 10px;
  max-height: 90vh;
}

.strike {
  text-decoration: line-through;
}
</style>
