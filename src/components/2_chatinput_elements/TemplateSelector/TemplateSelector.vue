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
          <div
            class="template-selector__preview-container"
            :style="{ backgroundImage: `url(${defaultBackground})` }"
          >
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
import { useMessageDraft } from '@/hooks';

import chatBackgroundRaw from '../../3_compounds/Feed/assets/chat-background.svg?raw';

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
  },
  chatBackground: {
    type: String,
    default: undefined
  }
})

const chatAppId = inject('chatAppId')
const { setMessageText } = useMessageDraft(chatAppId)

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

const defaultBackground = computed(() => {
  return props.chatBackground ?? `data:image/svg+xml;charset=utf-8,${encodeURIComponent(chatBackgroundRaw)}`;
});

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
  container.style.setProperty('--chotto-template-first-col-display','grid')
  container.style.setProperty('--chotto-template-second-col-display','none')
  updateShowValues()
}

const setThirdColVisible = () => {
  const container = document.getElementById('template-selector-container-' + chatAppId)
  container.style.setProperty('--chotto-template-third-col-display','grid')
  container.style.setProperty('--chotto-template-second-col-display','none')
  updateShowValues()
}

const setSecondColVisible = () => {
  const container = document.getElementById('template-selector-container-' + chatAppId)
  container.style.setProperty('--chotto-template-second-col-display','grid')
  container.style.setProperty('--chotto-template-first-col-display','none')
  container.style.setProperty('--chotto-template-third-col-display','none')
  updateShowValues()
}

const updateShowValues = () => {
  const container = document.getElementById('template-selector-container-' + chatAppId)
  const style = window.getComputedStyle(container)
  showFirstCol.value =  style.getPropertyValue('--chotto-template-first-col-display')
  showSecondCol.value =  style.getPropertyValue('--chotto-template-second-col-display')
  showThirdCol.value =  style.getPropertyValue('--chotto-template-third-col-display')

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

<style scoped lang="scss">
@use './styles/TemplateSelector.scss';
</style>
