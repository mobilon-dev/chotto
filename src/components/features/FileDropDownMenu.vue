<template>
  <div class="dropDownMenu" v-if="hovered && canUploadFile">
    <div class="label-container">
      <label class="label-row">
        <i class="pi pi-image" />
        <span class="label-title">Фото</span>
        <input
          style="display: none"
          accept="image/*"
          type="file"
          @change="handleFileChange"
        />
      </label>
      <label class="label-row">
        <i class="pi pi-video" />
        <span class="label-title">Видео</span>
        <input
          style="display: none"
          accept="video/*"
          type="file"
          @change="handleFileChange"
        />
      </label>
      <label class="label-row">
        <i class="pi pi-file" />
        <span class="label-title">Файл</span>
        <input style="display: none" type="file" @change="handleFileChange" />
      </label>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  canUploadFile: {
    type: Boolean,
    required: true,
    default: true,
  },
  hovered: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const emit = defineEmits(["fileSelected"]);

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    console.log("Selected file:", file);
    emit("fileSelected", file);
  }
};
</script>

<style scoped lang="scss">
.dropDownMenu {
  font-size: inherit;
  background: white;
  outline: none;
  border-radius: 4px;
  position: absolute;

  left: 0;
  right: 0;
  bottom: 60%;

  align-items: center;

  margin: 0;
  max-width: fit-content;
  max-height: fit-content;
  z-index: 2;

  border: 1px solid;
}

.label-container {
  margin-left: 10px;
  margin-right: 10px;
  display: flex;
  flex-direction: column;
}

.label-title {
  font-size: 18px;
  margin-left: 10px;
}

.label-row {
  cursor: pointer;
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
