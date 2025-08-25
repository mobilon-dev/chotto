<template>
  <div v-if="show">
    <select @change="changeTheme($event)">
      <option
        v-for="(theme, index) in props.themes"
        :key="index"
        :value="theme.code"
        :selected="theme.default === true"
      >
        {{ theme.name }}
      </option>
    </select>
  </div>
</template>

<script setup>
  import { onMounted, inject } from 'vue'
  // import { ref } from 'vue';
  import { useTheme } from '../../../helpers'
  const props = defineProps({
    themes: {
      type: Array,
      default: () => [],
    },
    show: Boolean,
  })

  const emit = defineEmits(['selectedTheme'])

  const chatAppId = inject('chatAppId')

  const { getTheme } = useTheme(chatAppId)

  const getDefaultThemeCode = () => {
    const defaultTheme = props.themes.find((t) => t.default === true)
    if (!defaultTheme) {
      return props.themes[0].code
    }
    return defaultTheme.code
  }

  const changeTheme = (event) => {
    const themeCode = event.target.value
    setTheme(themeCode)
  }

  const setTheme = (themeCode) => {
    if (chatAppId) {
      document.getElementById(chatAppId).dataset.theme = themeCode
      getTheme().theme = themeCode
      emit('selectedTheme', themeCode)
    }
  }

  onMounted(() => {
    const code = getDefaultThemeCode()
    setTheme(code)
  })
</script>

<style scoped lang="scss">
  .theme-button {
    margin: 0 auto;

    &__switch {
      position: relative;
      display: inline-block;
      box-sizing: border-box;
      width: 56px;
      height: 28px;
      /* var*/
      border: 1px solid var(--neutral-400);
      border-radius: 25%/50%;
      /* var*/
      background: var(--neutral-50);
      transition: 0.15s;
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
        /* var*/
        background-color: var(--neutral-400);
        /* var*/
        color: var(--neutral-700);
        left: 1px;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        transition: 0.15s;
      }

      span.pi-moon {
        opacity: 0;
        /* var*/
        background-color: var(--neutral-400);
        /* var*/
        color: var(--neutral-700);
        width: 24px;
        height: 24px;
        border-radius: 50%;
        transition: 0.15s;
      }
    }
  }

  .theme-button input[type='checkbox'] {
    display: block;
    width: 0;
    height: 0;
    position: absolute;
    z-index: -1;
    opacity: 0;
  }

  .theme-button input[type='checkbox']:checked + .theme-button__switch {
    /* var*/
    background: var(--neutral-700);
    transition: 0.15s;
  }

  .theme-button input[type='checkbox']:checked + .theme-button__switch {
    span.pi-sun {
      transform: translateX(29px);
      opacity: 0;
      transition: all 0.15s;
    }

    span.pi-moon {
      transform: translateX(29px);
      opacity: 1;
      transition: all 0.15s;
    }
  }
</style>
