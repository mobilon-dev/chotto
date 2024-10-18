<template>
  <!-- <label class="theme-button">
    <input
      type="checkbox"
      @click="toggleDarkMode"
    >
    <span class="theme-button__switch">
      <span class="pi pi-sun" />
      <span class="pi pi-moon" />
    </span>
  </label> -->

  <div>
    <button @click="changeTheme('light')">Light</button>
    <button @click="changeTheme('dark')">Dark</button>
    <button @click="changeTheme('green')">Green</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// const isDark = ref(false)
// const toggleDarkMode = () => {
//   isDark.value = !isDark.value;
//   document.documentElement.dataset.theme = isDark.value ? 'dark' : 'light';
// };


const currentTheme = ref('light'); // Начальная тема

const changeTheme = (newTheme) => {
  currentTheme.value = newTheme;
  document.documentElement.dataset.theme = newTheme;
};

</script>


<style
  scoped
  lang="scss"
>
.theme-button {
  margin: 0 auto;

  &__switch {
    position: relative;
    display: inline-block;
    box-sizing: border-box;
    width: 56px;
    height: 28px;
    border: 1px solid var(--neutral-400);
    border-radius: 25%/50%;
    background: var(--neutral-50);
    transition: .15s;
    cursor: pointer;


    span {
      position: absolute;
      top: 0;
      bottom: 0;
      margin: auto 0;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    span.pi-sun {
      background-color: var(--neutral-400);
      color: var(--neutral-700);
      left: 1px;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      transition: .15s;
    }

    span.pi-moon {
      opacity: 0;
      background-color: var(--neutral-400);
      color: var(--neutral-700);
      width: 24px;
      height: 24px;
      border-radius: 50%;
      transition: .15s;
    }
  }
}

.theme-button input[type=checkbox] {
  display: block;
  width: 0;
  height: 0;
  position: absolute;
  z-index: -1;
  opacity: 0;
}

.theme-button input[type=checkbox]:checked+.theme-button__switch {
  background: var(--neutral-700);
  transition: .15s;
}

.theme-button input[type=checkbox]:checked+.theme-button__switch {
  span.pi-sun {
    transform: translateX(29px);
    opacity: 0;
    transition: all .15s;
  }

  span.pi-moon {
    transform: translateX(29px);
    opacity: 1;
    transition: all .15s;
  }

}
</style>
