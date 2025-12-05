<template>
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    width="23px"
    height="23px"
    viewBox="42.67 42.67 170.66 170.66"
    overflow="visible"
  ><g
    fill="none"
    fill-rule="nonzero"
    stroke="none"
    stroke-width="1"
    stroke-linecap="butt"
    stroke-linejoin="miter"
    stroke-miterlimit="10"
    stroke-dasharray=""
    stroke-dashoffset="0"
    font-family="none"
    font-weight="none"
    font-size="none"
    text-anchor="none"
    style="mix-blend-mode: normal"
  ><g transform="scale(5.33333,5.33333)"><path
    d="M28.921,42.016l-14.366,-0.016c-4.717,0 -8.555,-3.838 -8.555,-8.556v-18.888c0,-4.718 3.838,-8.556 8.556,-8.556h18.889c4.717,0 8.555,3.838 8.555,8.556v14.554zM14.556,8c-3.615,0 -6.556,2.94 -6.556,6.556v18.889c0,3.615 2.941,6.555 6.556,6.555l13.546,0.016l11.898,-11.742v-13.718c0,-3.616 -2.941,-6.556 -6.556,-6.556z"
    :fill="fill"
  /><circle
    cx="16.047"
    cy="19.023"
    r="2"
    :fill="fill"
  /><circle
    cx="31.938"
    cy="19.023"
    r="2"
    :fill="fill"
  /><path
    d="M23.984,33.016c-3.042,0 -5.872,-1.326 -7.387,-3.461c-0.32,-0.451 -0.214,-1.075 0.237,-1.395c0.452,-0.32 1.074,-0.213 1.394,0.236c1.146,1.615 3.352,2.619 5.756,2.619c2.428,0 4.643,-1.018 5.781,-2.655c0.316,-0.453 0.939,-0.564 1.392,-0.25c0.454,0.315 0.565,0.938 0.25,1.393c-1.506,2.167 -4.35,3.513 -7.423,3.513z"
    :fill="fill"
  /><path
    d="M41.972,26.004h-6.839c-5.034,0 -9.13,4.111 -9.13,9.164l0.013,6.832h3.023l12.933,-12.867z"
    :fill="fill"
  /></g></g></svg>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  fill?: string;
}>(), {
  fill: '#5F5F5F'
});
</script>

