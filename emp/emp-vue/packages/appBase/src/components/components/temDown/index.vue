<!--
 * @Author: fengzp
 * @Date: 2020-10-16 11:26:28
 * @LastEditors: fengzp
 * @LastEditTime: 2021-01-25 17:08:45
 * @Introduce: Do not edit
-->
<template>
  <el-button-group class="f-mb10">
    <slot name="header"></slot>
    <el-button
      class="filter-item"
      type="primary"
      icon="el-icon-download"
      @click="downLoadTemZero"
      :disabled="isdisabale"
      v-if="this.moreTem.length == 1"
      >{{temName}}</el-button
    >
    <el-dropdown
      size="small"
      trigger="click"
      placement="bottom-start"
      @command="downLoadTem"
      v-if="this.moreTem.length > 1"
    >
      <el-button type="primary">
        {{temName}}
        <i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>

      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item
          v-for="(item, index) in moreTem"
          :key="index"
          :command="item.propCode"
          >{{ item.propName }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <slot name="bottom"></slot>
  </el-button-group>
</template>

<script>
import { getToken } from "@common/utils/auth";
export default {
  components: {},
  computed: {},
  mounted() {},
  props: {
    moreTem: {
      type: Array,
      default: [],
    },
    temName:{
      type: String,
      default: '模板下载',
    }
  },
  destroyed() {},

  data() {
    return {};
  },
  watch: {},
  methods: {
    downLoadTemZero() {
      let fileUrl = this.moreTem[0].propCode + "?token=" + getToken();
      window.location.href = fileUrl + "&ModelCode=" + window.mdcode
    },
    downLoadTem(command) {
      let fileUrl = command + "?token=" + getToken();
      window.location.href = fileUrl + "&ModelCode=" + window.mdcode
    },
  },
};
</script>

<style lang='scss' scoped>
</style>
