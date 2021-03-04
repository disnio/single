<template>
  <div class="hello">
    <p>count:{{ count }}</p>
    <button @click="doCount">click</button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Count',
  props: {
    step: Number,
  },
  computed: {
    ...mapGetters(['count']),
  },
  methods: {
    doCount() {
      this.setCount(this.step);
    },
    ...mapActions(['setCount']),
  },
};
</script>

<style scoped></style>
