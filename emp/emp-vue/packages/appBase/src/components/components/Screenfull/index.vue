<template>
  <svg @click='click' class="icon screenfull" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
    t="1497503607356" viewBox="0 0 1024 1024" version="1.1" p-id="4109"  :width="width" :height="height">
   <path d="M910.222 142.222v-28.444H625.778v56.889h227.555v227.555h56.89z m0 739.556v28.444H625.778v-56.889h227.555V625.778h56.89zM113.778 142.222v-28.444h284.444v56.889H170.667v227.555h-56.89z m0 739.556v28.444h284.444v-56.889H170.667V625.778h-56.89z" fill="#b8d9fc" p-id="3078"></path><path d="M568.889 417.166l281.6-281.6 40.22 40.278-281.6 281.6z m-153.998 35.67l-281.6-281.6 40.22-40.22 281.6 281.6z m194.218 113.777l281.6 281.6-40.22 40.164-281.6-281.6z m-153.998 44.829l-281.6 281.6-40.22-40.278 281.6-281.6z" fill="#b8d9fc" p-id="3079"></path>
  </svg>
</template>

<script>
  import screenfull from 'screenfull';
  export default {
    name: 'screenfullBtn',
    props: { 
      width: {
        type: Number,
        default: 24
      },
      height: {
        type: Number,
        default: 24
      },
      fill: {
        type: String,
        default: '#b8d9fc'
      }
    },
    data() {
      return {
        isFullscreen: false
      }
    },
    methods: {
      click() {
        if (!screenfull.enabled) {
          this.$message({
            message: 'you browser can not work',
            type: 'warning'
          });
          return false;
        }
        screenfull.toggle();
      }
    }
  }
</script>

<style scoped>
.screenfull {
  display: inline-block;
  cursor: pointer;
  vertical-align: -0.15em;
}
</style>
