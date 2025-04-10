<template>
  <div class="template-selector">
    <div 
      :id="'template-selector-container-' + chatAppId"
      ref="refContainer"
      :class="{
        'template-selector__container-inline' : !elevatedWindow,
        'template-selector__container-elevated' : elevatedWindow
      }"
    >
      <div style="display: flex;">
        <div style="display: flex;">
          <button 
            v-if="allowTurnLeft"
            class="template-selector__button-close"
          >
            <span 
              class="pi pi-arrow-left"
              @click="turnLeft"
            />
          </button>
          <button 
            v-if="allowTurnRight"
            class="template-selector__button-close"
          >
            <span 
              class="pi pi-arrow-right"
              @click="turnRight"
            />
          </button>
        </div>
        
        <button class="template-selector__button-close">
          <span
            class="pi pi-times"
            @click="$emit('closeTemplateWindow')"
          />
        </button>
      </div>
      
      <div class="template-selector__layout">
        <div 
          :id="'template-selector-first-col-' + chatAppId"
          class="template-selector__first-col"
        >
          <ul class="template-selector__list-groups">
            <li
              v-for="(item, index) in groupTemplates"
              :key="index"
              class="template-selector__item-group"
              :class="{ 'template-selector__item-selected': selectedGroup === item }"
              @click="clearSelectedTemplate"
            >
              <label class="template-selector__label-group">
                <img
                  v-if="item.iconUrl"
                  class="template-selector__item-group-icon"
                  :src="item.iconUrl"
                  :alt="item.title"
                >
                <input
                  :id="index"
                  v-model="selectedGroup"
                  :value="item"
                  class="template-selector__input-group"
                  type="radio"
                >
                <span>{{ item.title }}</span>
              </label>
            </li>
          </ul>
        </div>
        
        <div
          :id="'template-selector-second-col-' + chatAppId"
          class="template-selector__second-col"
        >
          <div class="template-selector__searching-container">
            <input
              v-model="searchQuery"
              class="template-selector__searching-input"
              type="text"
              placeholder="Поиск шаблона"
            >
          </div>

          <div class="template-selector__templates">
            <ul
              v-if="searchedTemplate.length !== 0"
              class="template-selector__list-templates"
            >
              <li
                v-for="(item, index) in searchedTemplate"
                :key="index"
                class="template-selector__item-template"
                :class="{ 'template-selector__item-selected': item.isSelected }"
                @click="selectTemplate(item)"
              >
                <div class="template-selector__item-template-info">
                  <p class="template-selector__item-title">
                    {{ item.title }}
                  </p>
                  <p class="template-selector__item-text">
                    {{ item.template }}
                  </p>
                </div>
              </li>
            </ul>

            <p
              v-else
              class="template-selector__plug"
            >
              Шаблоны отсутствуют
            </p>
          </div>
        </div>
        

        <div 
          :id="'template-selector-third-col-' + chatAppId"
          class="template-selector__third-col"
        >
          <div class="template-selector__preview-container">
            <div
              v-if="selectedTemplate"
              class="template-selector__preview"
            >
              <div class="template-selector__preview-wrapper">
                <p class="template-selector__preview-text">
                  {{ selectedTemplate.template }}
                </p>
                <p class="template-selector__preview-time">
                  22:22
                </p>
              </div>
            </div>

            <p
              v-else
              class="template-selector__plug"
            >
              Предпросмотр шаблона
            </p>
          </div>

          <button
            class="template-selector__button-paste"
            @click="handlePutMessage"
          >
            Вставить
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

import { computed, ref, onMounted, inject, unref } from 'vue'
import { useMessage } from '../../helpers/useMessage';
const props = defineProps({
  templates: {
    type: Array,
    required: false,
    default: () => { return [] }
  },
  groupTemplates: {
    type: Array,
    required: false,
    default: () => { return [] }
  },
  elevatedWindow: {
    type: Boolean,
    required: false,
    default: false,
  }
})

const chatAppId = inject('chatAppId')
const { setMessageText } = useMessage(chatAppId)

const handlePutMessage = () => {
  emit('closeTemplateWindow')
  setMessageText(selectedTemplate.value.template)
}

const emit = defineEmits(['closeTemplateWindow', 'pasteTemplate'])

const selectedGroup = ref(null)
const selectedTemplate = ref(null);
const searchQuery = ref('');

const refContainer = ref()
const showFirstCol = ref('')
const showSecondCol = ref('')
const showThirdCol = ref('')

const isOneCol = ref(false)

const allowTurnLeft = computed(() => {
  if (isOneCol.value){
    if ( showThirdCol.value == 'grid' && showSecondCol.value == 'none') return true
    if (showSecondCol.value == 'grid' && showFirstCol.value == 'none') return true
  }
  return false
})

const allowTurnRight = computed(() => {
  if (isOneCol.value){
    if (showFirstCol.value == 'grid' && showSecondCol.value == 'none') return true
    if (showSecondCol.value == 'grid' && showThirdCol.value == 'none') return true
  }
  return false
})

const turnLeft = () => {
  if (isOneCol.value) {
    if (showSecondCol.value == 'grid') setFirstColVisible()
    else if (showThirdCol.value == 'grid') setSecondColVisible()
  }
}

const turnRight = () => {
  if (isOneCol.value) {
    if (showSecondCol.value == 'grid') setThirdColVisible()
    else if (showFirstCol.value == 'grid') setSecondColVisible()
  }
}

const setFirstColVisible = () => {
  const container = document.getElementById('template-selector-container-' + chatAppId)
  container.style.setProperty('--template-first-col-display','grid')
  container.style.setProperty('--template-second-col-display','none')
  updateShowValues()
}

const setThirdColVisible = () => {
  const container = document.getElementById('template-selector-container-' + chatAppId)
  container.style.setProperty('--template-third-col-display','grid')
  container.style.setProperty('--template-second-col-display','none')
  updateShowValues()
}

const setSecondColVisible = () => {
  const container = document.getElementById('template-selector-container-' + chatAppId)
  container.style.setProperty('--template-second-col-display','grid')
  container.style.setProperty('--template-first-col-display','none')
  container.style.setProperty('--template-third-col-display','none')
  updateShowValues()
}

const updateShowValues = () => {
  const container = document.getElementById('template-selector-container-' + chatAppId)
  const style = window.getComputedStyle(container)
  showFirstCol.value =  style.getPropertyValue('--template-first-col-display')
  showSecondCol.value =  style.getPropertyValue('--template-second-col-display')
  showThirdCol.value =  style.getPropertyValue('--template-third-col-display')

}

const selectTemplate = (item) => {
  props.templates.forEach(с => с.isSelected = false);
  item.isSelected = true;
  selectedTemplate.value = item;
  setThirdColVisible()
};

const clearSelectedTemplate = () => {
  setSecondColVisible()
  props.templates.forEach(template => template.isSelected = false);
};

const filteredTemplates = computed(() => {
  if (!selectedGroup.value) {
    return props.templates
  }
  return props.templates.filter(item => item.groupId === selectedGroup.value.groupId)
})

const searchedTemplate = computed(() => {
  const lowerQuery = searchQuery.value.trim().toLowerCase();
  return filteredTemplates.value.filter((item) => {
    return item.title.toLowerCase().includes(lowerQuery) || item.template.toLowerCase().includes(lowerQuery);
  });
});

const resizeObserver = new ResizeObserver((entries) => {
  const containerWidth = entries[0].target.clientWidth
  if (containerWidth > 700){
    isOneCol.value = false
  }
  if (containerWidth < 700){
    isOneCol.value = true
  }
});

onMounted(() => {
  updateShowValues()
  if (unref(refContainer)){
    resizeObserver.observe(unref(refContainer))
  }
})

</script>

<style
  scoped
  lang="scss"
>
.template-selector {
  --template-first-col-display: none;
  
  --template-second-col-display: grid;

  --template-third-col-display: none;

  position: absolute;
  bottom: 100%;
  left: 0;
  right: 0;
  z-index: 100;
  container: templates / inline-size;

  &__container-inline {
    
    max-height: 500px;
    padding: 16px 5px 5px 5px;
    background-color: var(--template-selector-bg);
    border-top: var(--template-selector-border);
    border-bottom: var(--template-selector-border);
    box-sizing: border-box;
    min-width: 478px;
  }

  &__container-elevated{
    position: absolute;
    max-height: 500px;
    padding: 16px 5px 5px 5px;
    background-color: var(--template-selector-bg);
    border: var(--template-selector-border);
    min-width: 478px;
    box-shadow: 5px 5px 29px -15px var(--template-selector-shadow-color);
    bottom: 20px; right: 20px;
  }

  &__layout{
    max-height: 400px;
    display: grid;
    box-sizing: border-box;
    grid-template-columns: 0.5fr 1.3fr 1fr;
    grid-template-rows: min-content min-content 1fr min-content;
    column-gap: 5px;
  }

  &__first-col{
    display: grid;
    grid-column: 1;
    grid-row: 2 / 5;
    grid-template-rows: min-content auto;
  }

  &__second-col{
    display: grid;
    grid-column: 2;
    grid-row: 2 / 5;
    grid-template-rows: min-content min-content auto;
  }

  &__third-col{
    display: grid;
    grid-column: 3;
    grid-row: 2 / 5;
    grid-template-rows: min-content auto min-content;
  }

  &__button-close {
    grid-row: 1;
    align-self: flex-start;
    display: block;
    background-color: transparent;
    border: none;
    width: fit-content;
    cursor: pointer;
    margin: 0 16px 20px auto;

    span {
      font-size: var(--template-selector-button-close-font-size);
      color: var(--template-selector-button-close-color);
    }
  }

  
  &__list-groups {
    
    grid-row: 2;
    overflow-y: auto;
    border: var(--template-selector-border);
    padding: 0;
    margin: 0;

    &::-webkit-scrollbar {
      width: 6px;
      background-color: var(--scrollbar-bg);
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background-color: var(--scrollbar-thumb-bg);
    }

    &::-webkit-scrollbar-track {
      border-radius: 10px;
    }
  }

  &__list-templates{
    padding: 0;
    margin: 0;
  }

  &__templates {
    grid-row: 3;
    border: var(--template-selector-border);
    overflow-y: auto;

    &::-webkit-scrollbar {
      width: 6px;
      background-color: var(--scrollbar-bg);
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background-color: var(--scrollbar-thumb-bg);
    }

    &::-webkit-scrollbar-track {
      border-radius: 10px;
    }
  }

  &__item-template,
  &__item-group {
    transition: 0.2s;

    &:hover {
      background-color: var(--template-selector-item-hover);
    }

    &:not(:last-child) {
      border-bottom: var(--template-selector-border);
    }
  }

  &__item-group {
    display: flex;
    align-items: center;
  }

  &__item-selected {
    background-color: var(--template-selector-item-selected);

    &:hover {
      background-color: var(--template-selector-item-selected);
    }
  }

  &__item-template {
    cursor: pointer;
    padding: 10px 12px;
  }

  &__label-group {
    padding: 10px 12px;
    display: flex;
    align-items: center;
    column-gap: 10px;
    width: 100%;
    height: 100%;
    cursor: pointer;

    img {
      width: 30px;
      height: 30px;
    }

    input {
      display: none;
    }

    span {
      line-height: 1;
    }
  }

  &__item-title {
    margin-bottom: 8px;
    font-weight: var(--template-selector-item-title-font-weight);
    font-size: var(--template-selector-item-title-font-size);
  }

  &__item-text {
    font-size: var(--template-selector-item-text-font-size);
    font-weight: var(--template-selector-item-text-font-weight);
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    -webkit-box-orient: vertical;
  }

  &__searching-container {
    grid-row: 2;
    width: 100%;
    margin-bottom: 16px;
    margin-right: 10px;
  }

  &__searching-input {
    background-color: transparent;
    width: var(--input-width);
    padding: var(--input-padding);
    border-radius: var(--input-border-radius);
    font-size: var(--input-font-size);
    color: var(--input-color);
    border: var(--input-border);
    transition: border-color var(--input-transition-duration);
    box-sizing: border-box;

    &::placeholder {
      color: var(--input-placeholder-color);
    }

    &:hover {
      border-color: var(--input-hover-border-color);
    }

    &:focus-visible {
      border-color: var(--input-focus-border-color);
      outline: none;
    }
  }

  &__preview-container {
    grid-row: 2;
    border: var(--template-selector-border);
    max-height: 375px;
    overflow-y: auto;
    background-color: var(--template-selector-preview-bg);
    background-image: url('../../../public/chat-background.svg');

    &::-webkit-scrollbar {
      width: 6px;
      background-color: var(--scrollbar-bg);
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background-color: var(--scrollbar-thumb-bg);
    }

    &::-webkit-scrollbar-track {
      border-radius: 10px;
    }
  }

  &__preview {
    height: 100%;
    box-sizing: border-box;
    padding: 5px;
  }

  &__preview-wrapper {
    padding: 10px 10px 4px 16px;
    background-color: var(--base-message-left-bg);
    border-radius: 14px;
    max-width: 90%;
    margin-bottom: 15px;
  }

  &__plug {
    width: 100%;
    height: 100%;
    font-size: var(--template-selector-plug-font-size);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    margin: 0;
    line-height: 20;
  }

  &__preview-text {
    font-size: var(--template-selector-preview-text-font-size);
    word-break: break-word;
    white-space: pre-line;
  }

  &__preview-time {
    width: fit-content;
    font-size: var(--template-selector-preview-time-font-size);
    color: var(--base-message-color-time);
    margin-left: auto;
  }

  &__button-paste {
    grid-row: 3;
    display: block;
    width: fit-content;
    justify-self: flex-end;
    margin: 16px 0 0 0;
    font-size: var(--template-selector-button-paste-font-size);
    background-color: var(--template-selector-button-paste-bg);
    color: var(--template-selector-button-paste-color);
    border: none;
    padding: 8px 16px;
    border-radius: 10px;
    cursor: pointer;
  }

  
}


@container templates (width < 700px) {
  .template-selector {
    &__layout{
      grid-template-columns: 1fr;
    }
    &__first-col{
      display: var(--template-first-col-display);
      grid-column: 1;
    }
    &__second-col{
      display: var(--template-second-col-display);
      grid-column: 1;
    }
    &__third-col{
      display: var(--template-third-col-display);
      grid-column: 1;
    }
  }
}

</style>
