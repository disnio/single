<template>
  <div class="main">
    <h3>Project App2</h3>
    <Content />
  </div>
</template>

<script>
import Content from './components/Content';
import { page } from '@base/common/api/auth/service/index';
export default {
  components: {
    Content,
  },
  mounted() {
    page({
      a: 1,
    })
      .then((res) => {
        console.log('common api page:', res);
      })
      .catch((e) => {
        console.error('err:', e);
      });
  },
};
</script>

<style scoped lang="scss">
.main {
  img {
    width: 200px;
  }

  h1 {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 60px;
  }
}
</style>
