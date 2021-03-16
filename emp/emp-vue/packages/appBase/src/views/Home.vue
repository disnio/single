<template>
  <div class="home">
    <h3>counter in base</h3>
    <Content />

    <Counter :step="1" :count="count" :setCount="changeCount" />
  </div>
</template>

<script>
// @ is an alias to /src
import Counter from '@app1/Counter';
import Content from '@app2/Content';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Home',
  components: {
    Counter,
    Content,
  },
  computed: {
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
