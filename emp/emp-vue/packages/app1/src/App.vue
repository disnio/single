<template>
  <div>
    <h3>Project App1 has counter</h3>
    <Counter :step="2" :count="count" :setCount="changeCount" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

// import remoteStore from '@appBase/store';
// console.log('xx:', remoteStore.store);
// let store = remoteStore.store;

export default {
  components: {
    Counter: () => import('./components/Counter'),
  },

  computed: {
    // count: () => store.state.count,
    ...mapGetters(['count']),
  },
  methods: {
    changeCount(count) {
      console.log('change:', count);
      this.setCount(count);
    },
    ...mapActions(['setCount']),
  },
};
</script>

<style scoped>
img {
  width: 200px;
}

h1 {
  font-family: Arial, Helvetica, sans-serif;
}
</style>
