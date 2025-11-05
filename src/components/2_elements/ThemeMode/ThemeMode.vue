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
import { onMounted, inject } from 'vue';
// import { ref } from 'vue';
import { useTheme } from '@/hooks';
const props = defineProps({
  themes: {
    type: Array,
    default: () => [],
  },
  show: Boolean,
});

const emit = defineEmits(['selectedTheme'])

const chatAppId = inject('chatAppId')

const {getTheme} = useTheme(chatAppId)

const getDefaultThemeCode = () => {
  const defaultTheme = props.themes.find(t => t.default === true);
  if(!defaultTheme) {
    return props.themes[0].code;
  }
  return defaultTheme.code;
}

const changeTheme = (event) => {
  const themeCode = event.target.value;  
  setTheme(themeCode);
};

const setTheme = (themeCode) => {
  if (chatAppId){
    document.getElementById(chatAppId).dataset.theme = themeCode;
    getTheme().theme = themeCode
    emit('selectedTheme', themeCode)
  }
}

onMounted(() => {
  const code = getDefaultThemeCode();
  setTheme(code);
})

</script>

<style
  scoped
  lang="scss"
>
@use './styles/ThemeMode.scss';
</style>
