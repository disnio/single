<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <Count :step="1" />
  </div>
</template>

<script>
// @ is an alias to /src
import Count from '@/components/count.vue';

export default {
  name: 'Home',
  components: {
    Count,
  },
};
</script>
