<template>
  <div
    
    class="audio-recorder__container"
  >
    <div v-if="uploadStatus === 'uploading'">
      <p>Загрузка файла...</p>
    </div>
    <div 
      v-if="audioRecording && uploadStatus != 'uploading'" 
      class="audio-recorder__recording-container"
    >
      <span class="audio-recorder__recording-icon pi pi-circle-fill" />
      <button
        class="audio-recorder__button audio-recorder__button-record"
        @click="cancelAudioRecording"
      >
        <span class="pi pi-trash" />
      </button>
      <button
        class="audio-recorder__button audio-recorder__button-record"
        @click="stopAudioRecording"
      >
        <div class="audio-recorder__stop" />
      </button>
      <span class="audio-recorder__recording-time">
        {{ elapsedTime }}
      </span>
    </div>
    <button
      v-if="!audioRecording && uploadStatus != 'uploading' && !getMessage().isRecording"
      class="audio-recorder__button"
      :class="{'audio-recorder__button-disabled' : state == 'disabled' || getMessage().file}"
      @click="startAudioRecording"
    >
      <span class="pi pi-microphone" />
    </button>
    <teleport
      v-if="getMessage().file"
      :to="'#chat-input-file-line-'+chatAppId"
    >
      <FilePreview
        v-if="audioPreview"
        :file-info="audioPreview"
        @reset="resetRecordedAudio"
      />
    </teleport>
  </div>
</template>

<script setup lang="ts">
import { watch, ref, inject, computed } from 'vue';
import { useMessageDraft, uploadFile } from '@/hooks';
import { IFilePreview } from '@/types';
import {FilePreview} from '@/components';
// const emit = defineEmits(['send', 'typing']);

const chatAppId = inject('chatAppId')
const { getMessage, setMessageFile, resetMessageFile, setRecordingMessage } = useMessageDraft(chatAppId as string)

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
  return hours + ':' + minutes + ':' + seconds + ':' + milliseconds
})

const uploadStatus = ref("");
const audioRecording = ref(false)
const mediaRecorder = ref<MediaRecorder>()
const chunks = ref<Blob[]>([])
const audio = ref<string>()
const audioPreview = ref<IFilePreview>()

const props = defineProps({
  state:{
    type: String,
    default: 'active',
  },
  filebumpUrl: {
    type: String,
    default: null,
  },
})

const startAudioRecording = async () => {
  if (!getMessage().file && props.state == 'active'){
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
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
    setRecordingMessage(true)
    audioRecording.value = true
    mediaRecorder.value = new MediaRecorder(stream)
    mediaRecorder.value.start();
    mediaRecorder.value.ondataavailable = (event: BlobEvent) => {
      chunks.value.push(event.data);
    }
  }
}

const cancelAudioRecording = () => {
  clearTemp()
  audio.value = undefined
}

const stopAudioRecording = () => {
  if (mediaRecorder.value){
    mediaRecorder.value.stop();
    mediaRecorder.value.onstop = async () => {
      const file = new File(chunks.value,'voicemessage.mp3',{type: 'audio/*'});
      const url = URL.createObjectURL(file);
      audio.value = url;
      uploadStatus.value = 'uploading'
      await uploadFile(props.filebumpUrl, file)
      .then((data) => {
        uploadStatus.value = data.status
        if (data.status == 'success'){
          const previewContainer = document.getElementById('chat-input-file-line-'+chatAppId)
          if (previewContainer){
            previewContainer.style.display = 'inherit'
          }
          setMessageFile({
            url: data.url,
            name: data.name,
            size: data.size,
            type: data.type,
          })
          if (data.preview)
            audioPreview.value = ({
              previewUrl: data.preview.previewUrl,
              isImage: data.preview.isImage,
              isVideo: data.preview.isVideo,
              isAudio: data.preview.isAudio,
              fileName: data.name,
              fileSize: data.preview.fileSize,
            })
        }
      }) 
    }
  }
  clearTemp()
}

const clearTemp = () => {
  clearInterval(timer.value)
  ms.value = 0
  s.value = 0
  m.value = 0
  h.value = 0
  setRecordingMessage(false)
  audioRecording.value = false
  mediaRecorder.value = undefined
  chunks.value = []
}

const resetRecordedAudio = () => {
  const previewContainer = document.getElementById('chat-input-file-line-'+chatAppId)
  if (previewContainer){
    previewContainer.style.display = 'none'
  }
  resetMessageFile()
  audioPreview.value = undefined
}

watch(
  () => getMessage().file,
  () => {
    if (!getMessage().file) audioPreview.value = undefined
  }
);

</script>

<style
  scoped
  lang="scss"
>
@use './styles/AudioRecorder.scss';
</style>
