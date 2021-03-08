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
    ...mapState({
      count: (state) => {
        console.log('state:', state);
        return state.pa.count;
      },
    }),
  },
  methods: {
    doCount() {
      this.setCount(this.step);
    },
    ...mapActions({
      setCount: (dispatch, payload) => {
        dispatch('setCount', payload);
      },
    }),
  },
};
</script>

<style scoped></style>
