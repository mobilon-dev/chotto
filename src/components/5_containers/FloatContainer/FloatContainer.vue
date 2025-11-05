<template>
  <div
    :id="chatAppId"
    ref="element"
    class="float-window"
    :style="{
      left: floatWindowPosition.x + 'px',
      top: floatWindowPosition.y + 'px',
      userSelect: dragMode ? 'none' : 'auto',
      height: height,
      width: width,
      display: 'flex',
    }"
  >
    <div class="float-window__container">
      <div
        ref="container"
        class="float-window__controls"
        @mousedown="mouseDown"
        @mouseup="turnOffDragMode"
        @mouseleave="turnOffDragMode"
      >
        <img
          v-if="props.avatar"
          class="float-window__avatar"
          :src="props.avatar"
          :alt="props.title"
        >
        <p class="float-window__title">
          {{ props.title }}
        </p>
        <div style="margin-left: auto; display: flex;">
          <slot name="controls" />
          <button
            class="float-window__close-button"
            @click="$emit('close-window')"
          >
            <span class="pi pi-times" />
          </button>
        </div>
      </div>
      <div
        class="float-window__content"
        :style="{ height: contentHeight + 'px' }"
      >
        <slot name="default" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, useId, provide } from "vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
  height: {
    type: String,
    default: '100%'
  },
  width: {
    type: String,
    default: '100%'
  }
});
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const emit = defineEmits(["close-window", "get-size"]);

const floatWindowPosition = ref({ x: 0, y: 0 });
const element = ref(null);
const container = ref(null);
const dragMode = ref(false);
const initialX = ref(0);
const initialY = ref(0);
const contentHeight = ref(0);

const chatAppId = useId()
provide('chatAppId', chatAppId)

// const centerWindow = () => {
//   if (element.value) {
//     const windowWidth = window.innerWidth;
//     const windowHeight = window.innerHeight;
//     const elementWidth = element.value.offsetWidth;
//     const elementHeight = element.value.offsetHeight;

//     floatWindowPosition.value.x = (windowWidth - elementWidth) / 2;
//     floatWindowPosition.value.y = (windowHeight - elementHeight) / 2;
//   }
// };

const mouseDown = (e) => {
  dragMode.value = true;
  // Получение координат левого верхнего угла перемещаемого окна
  initialX.value = e.clientX - element.value.offsetLeft;
  initialY.value = e.clientY - element.value.offsetTop;
};

const turnOffDragMode = () => (dragMode.value = false);

const mouseMove = (e) => {
  if (dragMode.value) {
    // Вычисление позиции плавающего окна
    const positionX = e.clientX - initialX.value;
    const positionY = e.clientY - initialY.value;
    floatWindowPosition.value.x = positionX
    floatWindowPosition.value.y = positionY
  }
};

onMounted(() => {
  //Центрируем окно при монтировании
  //centerWindow();
  //окно монтируется в углу ближайшего блока с position отличным от static
  //позволяет более гибко позиционировать в пределах страницы
  document.addEventListener("mousemove", mouseMove);
  
  // Срабатывает, когда изменяется размер окна брузера, не дает выйти за границы плавающему окну. Перерасчет границ.
  window.addEventListener("resize", () => {
    if (element.value){
      floatWindowPosition.value.x = Math.max(
        0,
        Math.min(
          floatWindowPosition.value.x,
          window.innerWidth - element.value.offsetWidth
        )
      );
      floatWindowPosition.value.y = Math.max(
        0,
        Math.min(
          floatWindowPosition.value.y,
          window.innerHeight - element.value.offsetHeight
        )
      );
    }
  });

  contentHeight.value =
    element.value.offsetHeight - container.value.offsetHeight;
});
</script>

<style scoped lang="scss">
@use './styles/FloatContainer.scss';
</style>
