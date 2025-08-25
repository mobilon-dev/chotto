<template>
  <div class="user-avatar">
    <img v-if="props.avatar" :src="props.avatar" />

    <svg
      v-else
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_4773_389)">
        <path
          d="M35.2817 18.75C35.2817 21.2364 34.2959 23.621 32.5412 25.3791C30.7865 27.1373 28.4067 28.125 25.9251 28.125C23.4436 28.125 21.0638 27.1373 19.3091 25.3791C17.5544 23.621 16.5686 21.2364 16.5686 18.75C16.5686 16.2636 17.5544 13.879 19.3091 12.1209C21.0638 10.3627 23.4436 9.375 25.9251 9.375C28.4067 9.375 30.7865 10.3627 32.5412 12.1209C34.2959 13.879 35.2817 16.2636 35.2817 18.75Z"
          fill="var(--chotto-chat-user-avatar-color)"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M0.974365 25C0.974365 18.3696 3.6031 12.0107 8.28228 7.32233C12.9615 2.63392 19.3078 0 25.9252 0C32.5425 0 38.8888 2.63392 43.568 7.32233C48.2472 12.0107 50.8759 18.3696 50.8759 25C50.8759 31.6304 48.2472 37.9893 43.568 42.6777C38.8888 47.3661 32.5425 50 25.9252 50C19.3078 50 12.9615 47.3661 8.28228 42.6777C3.6031 37.9893 0.974365 31.6304 0.974365 25ZM25.9252 3.125C21.8138 3.12522 17.7861 4.28863 14.3056 6.48134C10.8251 8.67404 8.0332 11.8069 6.25134 15.5194C4.46949 19.2318 3.77006 23.3729 4.23356 27.4661C4.69705 31.5593 6.30464 35.4382 8.87129 38.6562C11.0857 35.0812 15.9604 31.25 25.9252 31.25C35.8899 31.25 40.7615 35.0781 42.979 38.6562C45.5457 35.4382 47.1532 31.5593 47.6167 27.4661C48.0802 23.3729 47.3808 19.2318 45.599 15.5194C43.8171 11.8069 41.0252 8.67404 37.5447 6.48134C34.0642 4.28863 30.0365 3.12522 25.9252 3.125Z"
          fill="var(--chotto-chat-user-avatar-color)"
        />
      </g>
      <defs>
        <clipPath id="clip0_4773_389">
          <rect width="50" height="50" fill="white" transform="translate(0)" />
        </clipPath>
      </defs>
    </svg>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{ avatar: string }>();
</script>

<style>
:root {
  --chotto-chat-user-avatar-color: #dcdcdc;
}

.user-avatar {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  overflow: hidden;
}

.user-avatar svg {
  width: 100%;
  height: 100%;
}

.user-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
