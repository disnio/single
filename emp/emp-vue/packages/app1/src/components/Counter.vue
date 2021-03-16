<template>
  <div class="hello">
    <p>count:{{ count }}</p>
    <button @click="doCount">click</button>
  </div>
</template>

<script>
export default {
  name: 'Counter',
  props: {
    count: Number,
    step: Number,
    setCount: Function,
  },

  methods: {
    doCount() {
      let c = this.count + this.step;
      console.log('c:', c);
      this.setCount(parseFloat(c, 10));
    },
  },
};
</script>

<style scoped></style>
