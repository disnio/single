<template>
  <div>
    <div class="v2box">{{ title }}</div>
    <div class="v2box">Prop: {{ dataProps }}</div>
    <Button textVal="base content" />
  </div>
</template>

<script>
import Button from './Button.vue';
export default {
  components: {
    Button,
  },
  data() {
    return {
      title: 'BASE',
    };
  },
  props: {
    dataProps: { type: Number, required: false },
    methodProps: { type: Function, required: false },
  },
  methods: {},
  mounted: function() {
    this.methodProps && this.methodProps();
    // console.log(this.$props)
    // console.log(this.$attrs)
    // console.log(this.$listeners)
  },
};
</script>

<style>
.v2box {
  font-size: 38px;
  color: green;
  font-weight: bold;
}
.button {
  width: 200px;
  padding: 20px 0;
}
</style>
