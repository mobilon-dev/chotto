<template>
  <div class="template-selector">
    <div 
      :id="'waba-template-selector-container-' + chatAppId"
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
            @click="closeTemplateWindow"
          />
        </button>
      </div>

      <div class="template-selector__layout">
        <div class="template-selector__first-col">
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

        <div class="template-selector__second-col">
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
        <div class="template-selector__third-col">
          <div
            ref="previewContainer"
            class="template-selector__preview-container"
            :style="{ backgroundImage: `url(${defaultBackground})` }"
          >
            <div
              v-if="templateParts.length > 0"
              class="template-selector__preview"
            >
              <div class="template-selector__preview-wrapper">
                <WABAAttachmentSection
                  v-if="selectedTemplate.type != 'TEXT'"
                  :type="selectedTemplate.type"
                  :template-id="selectedTemplate.templateId"
                  @file-selected="handleFileSelected"
                />
                <div class="template-selector__preview-text-container">
                  <template
                    v-for="(item, index) in templateParts"
                    :key="index"
                  >
                    <span v-if="typeof item === 'string'">{{ item }}</span>
                    <PlaceholderComponent
                      v-else-if="typeof item === 'object'"
                      :index="item.index"
                      :value="wabaValues[item.index] || 'Заполнить'"
                      :is-filled="!!wabaValues[item.index]"
                      @click="selectedIndex = item.index"
                      @edit="updateWabaValue"
                    />
                  </template>
                </div>
                <p class="template-selector__preview-time">
                  22:22
                </p>
                <WABAQuickReplyButtons
                  v-if="selectedTemplate.buttons"
                  :buttons="selectedTemplate.buttons"
                  @select-all-variants="selectAllVariants"
                />
              </div>
            </div>
            <p
              v-else
              class="template-selector__plug"
            >
              Предпросмотр шаблона
            </p>
            <div
              v-if="allVariantsShow"
              class="template-selector__reply-buttons"
            >
              <div
                class="template-selector__semitransparent-overlay"
                @click="selectAllVariants"
              />
              <WABASeparatedQuickButtons
                :buttons="selectedTemplate.buttons"
                @select-all-variants="selectAllVariants"
              />
            </div>
          </div>

          <button
            class="template-selector__button-paste"
            :disabled="allFieldsUnFilled"
            @click="handlePutMessage"
          >
            Отправить
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, reactive, onMounted, inject, unref } from 'vue'
// import { watch, nextTick } from 'vue'
import chatBackgroundRaw from '../../3_compounds/Feed/assets/chat-background.svg?raw';

import { 
  PlaceholderComponent,
  WABAAttachmentSection, 
  WABAQuickReplyButtons, 
  WABASeparatedQuickButtons 
} from '@/components';
const props = defineProps({
  wabaTemplates: {
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

const emit = defineEmits(['closeTemplateWindow', 'sendWabaValues'])

const closeTemplateWindow = () => {
  emit('closeTemplateWindow')
  resetValues()
}

const handlePutMessage = () => {
  emit('closeTemplateWindow')
  const template = {
    text: '',
    templateId: '',
    values: [],
    file: null,
    buttons: null,
  }
  if (selectedFile.value) {
    template.text = fullText.value
    template.templateId = selectedTemplate.value.templateId
    template.values = enteredValues.value
    template.file = selectedFile.value
  }
  else {
    template.text = fullText.value
    template.templateId = selectedTemplate.value.templateId
    template.values = enteredValues.value
  }
  if (selectedTemplate.value.buttons) {
    template.buttons = selectedTemplate.value.buttons
  }
  emit('sendWabaValues', template)
  resetValues()
}

const handleFileSelected = (file) => {
  selectedFile.value = file
}


const previewContainer = ref(null)
const selectedGroup = ref(null)
const selectedTemplate = ref(null);
const selectedFile = ref(null)
const searchQuery = ref('');
const allVariantsShow = ref(false)

const selectAllVariants = () => {

  allVariantsShow.value = !allVariantsShow.value
  if (allVariantsShow.value) {
    previewContainer.value.scrollTop = 0
    previewContainer.value.style['overflow-y'] = 'hidden'
  }
  else previewContainer.value.style['overflow-y'] = 'scroll'
}

const selectTemplate = (item) => {
  Object.keys(wabaValues).forEach(key => {
    wabaValues[key] = '';
  });
  selectedFile.value = null
  props.wabaTemplates.forEach(с => с.isSelected = false);
  item.isSelected = true;
  selectedTemplate.value = item;
  allVariantsShow.value = false;
  
  setThirdColVisible()
};

const clearSelectedTemplate = () => {
  setSecondColVisible()
  props.wabaTemplates.forEach(template => template.isSelected = false);
};

const defaultBackground = computed(() => {
  return props.chatBackground ?? `data:image/svg+xml;charset=utf-8,${encodeURIComponent(chatBackgroundRaw)}`;
});

const filteredTemplates = computed(() => {
  if (!selectedGroup.value) {
    return props.wabaTemplates
  }
  return props.wabaTemplates.filter(item => item.groupId === selectedGroup.value.groupId)
})

const searchedTemplate = computed(() => {
  const lowerQuery = searchQuery.value.trim().toLowerCase();
  return filteredTemplates.value.filter((item) => {

    return item.title.toLowerCase().includes(lowerQuery) || item.template.toLowerCase().includes(lowerQuery);
  });
});

// код для подмены переменных

const wabaValues = reactive({});
const selectedIndex = ref(null);

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
  
  const container = document.getElementById('waba-template-selector-container-' + chatAppId)
  container.style.setProperty('--chotto-waba-template-first-col-display','grid')
  container.style.setProperty('--chotto-waba-template-second-col-display','none')
  console.log(container, window.getComputedStyle(container).getPropertyValue('--waba-template-first-col-display'))
  updateShowValues()
}

const setThirdColVisible = () => {
  const container = document.getElementById('waba-template-selector-container-' + chatAppId)
  container.style.setProperty('--chotto-waba-template-third-col-display','grid')
  container.style.setProperty('--chotto-waba-template-second-col-display','none')
  updateShowValues()
}

const setSecondColVisible = () => {
  const container = document.getElementById('waba-template-selector-container-' + chatAppId)
  container.style.setProperty('--chotto-waba-template-second-col-display','grid')
  container.style.setProperty('--chotto-waba-template-first-col-display','none')
  container.style.setProperty('--chotto-waba-template-third-col-display','none')
  updateShowValues()
}

const updateShowValues = () => {
  const container = document.getElementById('waba-template-selector-container-' + chatAppId)
  const style = window.getComputedStyle(container)
  showFirstCol.value =  style.getPropertyValue('--chotto-waba-template-first-col-display')
  showSecondCol.value =  style.getPropertyValue('--chotto-waba-template-second-col-display')
  showThirdCol.value =  style.getPropertyValue('--chotto-waba-template-third-col-display')

}

const updateWabaValue = (value) => {
  wabaValues[value[1]] = value[0];
};


const templateParts = computed(() => {
  const template = selectedTemplate.value?.template;
  if (!template) return [];

  const matches = [...template.matchAll(/{{\d+}}/g)];
  const parts = [];
  let lastIndex = 0;

  matches.forEach(match => {
    if (match.index > lastIndex) {
      parts.push(template.substring(lastIndex, match.index));
    }
    parts.push({ index: parseInt(match[0].slice(2, -2)) });
    lastIndex = match.index + match[0].length;
  });

  if (lastIndex < template.length) {
    parts.push(template.substring(lastIndex));
  }

  return parts;
});

// Проверяем что все поля заполнены.
// Сравниваем длину объекта, в котором хранятся значения и количество исходных переменных в шаблоне
const allFieldsUnFilled = computed(() => {
  if (!selectedTemplate.value)
    return true
  if (!selectedTemplate.value?.template.match(/{{\d+}}/gi))
    return false
  const containsVariables = Object.keys(wabaValues).length !== selectedTemplate.value?.template.match(/{{\d+}}/gi).length
  if (selectedTemplate.value.type === 'TEXT')
    return containsVariables
  else if (selectedTemplate.value.type !== 'TEXT')
    return containsVariables || !selectedFile.value
  return false
});

// Сброс значений
const resetValues = () => {
  Object.keys(wabaValues).forEach(key => {
    wabaValues[key] = '';
  });
  selectedFile.value = null
  selectedTemplate.value = null
  props.wabaTemplates.forEach(template => template.isSelected = false);
}

// Свойство получения всего текста
const fullText = computed(() => {
  console.log(templateParts.value, selectedTemplate.value.buttons)
  let templateText = templateParts.value.map(item => {
    if (typeof item === 'string') {
      return item;
    } else {
      return wabaValues[item.index];
    }
  }).join('');
  let buttonsText = ''
  if (selectedTemplate.value.buttons) {
    buttonsText = selectedTemplate.value.buttons.map(b => {
      return '\n| [' + b.text + ']'
    }).join('');
  }
  return templateText.concat(buttonsText)
});

// Свойство получения введенных значений
const enteredValues = computed(() => {
  const values = [];
  for (const key in wabaValues) {
    if (wabaValues[key] !== '' && wabaValues[key] !== 'Заполнить') {
      values.push(wabaValues[key]);
    }
  }
  return values;
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
@use './styles/WABATemplateSelector.scss';
</style>
