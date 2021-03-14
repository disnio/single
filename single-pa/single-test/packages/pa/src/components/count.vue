<template>
  <div class="hello">
    <p>count:{{ count }}</p>
    <button @click="doCount">click</button>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'Count',
  props: {
    step: Number,
  },
  computed: {
    ...mapState(['count']),
  },
  methods: {
    doCount() {
      console.log('this:', this);
      this.setCount({ count: this.step });
    },
    ...mapActions(['setCount']),
  },
};
</script>

<style scoped></style>
