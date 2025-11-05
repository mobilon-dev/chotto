<template>
  <div class="video-recorder__header">
    <button
      class="video-recorder__button video-recorder__button-close"
      @click="emit('close')"
    >
      <span class="pi pi-times" />
    </button>
  </div>
  
  <div>
    <video 
      v-show="!videoURL"
      ref="refVideo" 
      class="video-recorder__view-area"
    />
    <video 
      v-show="videoURL"
      ref="refRecord" 
      class="video-recorder__view-area"
      controls
    />
    <div class="video-recorder__controls">
      <div 
        class="video-recorder__recording-container"
      >
        <button
          v-if="!videoRecording && !videoURL"
          class="video-recorder__button"
          @click="changeRecordSource"
        >
          <span 
            :class="{
              'pi pi-desktop': recordSource == 'camera',
              'pi pi-camera' : recordSource == 'screen'
            }"
          />
        </button>
        <button
          v-if="!videoURL"
          class="video-recorder__button"
          :class="{'video-recorder__recording-button' : videoRecording}"
          @click="startVideoRecording"
        >
          <span 
            class="pi"
            :class="{
              'pi-circle-fill video-recorder__recording-icon': videoRecording,
              'pi-video': !videoRecording
            }"
          />
        </button>
        
        <button
          v-if="!videoRecording && videoURL"
          class="video-recorder__button"
          @click="cancelVideoRecording"
        >
          <span class="pi pi-trash" />
        </button>
        <button
          v-if="videoRecording"
          class="video-recorder__button"
          @click="stopVideoRecording"
        >
          <!--span class="pi pi-stop" /-->
          <div class="video-recorder__stop" />
        </button>
        <span class="video-recorder__recording-time">
          {{ elapsedTime }}
        </span>
      </div>
      <button
        class="video-recorder__button"
        :class="{'video-recorder__button-disabled' : !videoURL}"
        @click="saveRecordedVideo"
      >
        <span 
          class="video-recorder__save-button"
        >
          Прикрепить видео
        </span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">

import { ref, computed, onMounted, unref, nextTick } from 'vue';

const timer = ref()
const ms = ref(0)
const s = ref(0)
const m = ref(0)
const h = ref(0)

const elapsedTime = computed(() => {
  let hours = h.value < 10 ? "0" + h.value : h.value;
  let minutes = m.value < 10 ? "0" + m.value : m.value;
  let seconds = s.value < 10 ? "0" + s.value : s.value;
  let milliseconds = ms.value < 10 ? "00" + ms.value : ms.value < 100 ? "0" + ms.value : ms.value;
  if (videoRecording.value) return hours + ':' + minutes + ':' + seconds + ':' + milliseconds
  else return ' '
})

const refVideo = ref<HTMLVideoElement>()
const refRecord = ref<HTMLVideoElement>()
const videoRecording = ref(false)
const mediaRecorder = ref<MediaRecorder>()
const stream = ref<MediaStream>()
const chunks = ref<Blob[]>([])
const videoURL = ref<string>()
const videoFile = ref<File>()

const recordSource = ref('camera') //camera | screen

const changeRecordSource = () => {
  if (recordSource.value == 'camera'){
    recordSource.value = 'screen'
    runIdleScreenVideo()
  }
  else if (recordSource.value == 'screen'){
    stopCapture()
    recordSource.value = 'camera'
    runIdleVideo()
  }
}

const startVideoRecording = async () => {
  if (!videoRecording.value && stream.value instanceof MediaStream){
    mediaRecorder.value = new MediaRecorder(stream.value)
    mediaRecorder.value.start();
    mediaRecorder.value.ondataavailable = (event: BlobEvent) => {
      chunks.value.push(event.data);
    }
    videoRecording.value = true

    timer.value = setInterval(() => {
      ms.value += 10;
      if(ms.value == 1000){
        ms.value = 0;
        s.value++;
        if(s.value == 60){
          s.value = 0;
          m.value++;
          if(m.value == 60){
            m.value = 0;
            h.value++;
          }
        }
      }
    }, 10)
  }
}

const cancelVideoRecording = async () => {
  clearTemp()
  stopCapture()
  if (videoURL.value){
    videoURL.value = undefined
    await runIdleVideo()
  }
}

const stopVideoRecording = () => {
  if (mediaRecorder.value){
    mediaRecorder.value.stop();
    mediaRecorder.value.onstop = async () => {
      videoFile.value = new File(chunks.value,'videomessage.mp4',{type: 'video/*'});
      const url = URL.createObjectURL(videoFile.value);
      videoURL.value = url
      nextTick(() => {
        if (refRecord.value) refRecord.value.src = url
      })
    }
  }
  clearTemp()
  stopCapture()
}

function stopCapture() {
  let tracks = stream.value?.getTracks()
  tracks?.forEach((track) => track.stop());
}


const clearTemp = () => {
  clearInterval(timer.value)
  ms.value = 0
  s.value = 0
  m.value = 0
  h.value = 0
  videoRecording.value = false
  mediaRecorder.value = undefined
  chunks.value = []
}

const emit = defineEmits(['change', 'submit', 'close']);

const saveRecordedVideo = () => {
  emit('change', {videoFile: videoFile.value});
  emit('submit')
}

const runIdleVideo = async () => {
  await navigator.mediaDevices
    .getUserMedia({ audio: true, video: true })
    .then((s) => {
      const v = unref(refVideo.value) as HTMLVideoElement
      stream.value = s;
      v.srcObject = s;
      v.addEventListener("loadedmetadata", () => {
        unref(refVideo.value)?.play()
      });
      v.muted = true;
    })
}

const runIdleScreenVideo = async () => {
  const displayMediaOptions = {
    video: {
      cursor: 'always',
    },
    audio: false,
  } as MediaStreamConstraints;

  await navigator.mediaDevices.getDisplayMedia(displayMediaOptions)
  .then((s) => {
    const v = unref(refVideo.value) as HTMLVideoElement
    stream.value = s;
    v.srcObject = s;
    v.addEventListener("loadedmetadata", () => {
      unref(refVideo.value)?.play()
    });
    v.muted = true;
  })
}

onMounted(async () => {
  await runIdleVideo()
})

</script>

<style scoped lang="scss">
@use './styles/ModalVideoRecorder.scss';
</style>
