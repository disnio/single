<!--
 * @Author: fengzp
 * @Date: 2020-08-25 14:02:29
 * @LastEditors: fengzp
 * @LastEditTime: 2020-08-25 14:20:23
 * @Introduce: Do not edit
-->
<template>
  <div>
    <el-dialog
      custom-class="w1000"
      title="策略配置"
      :visible.sync="dialogVisible"
      :modal-append-to-body="true"
      :close-on-click-modal="false"
      v-drag
    >
        <!-- <configurePublic ref="configurePublic" @listenToChildEvent="valueHanlder" :btnStatus="btnStatus"></configurePublic> -->
    </el-dialog>
  </div>
</template>

<script>
// import configurePublic from "@/views/spot/configure/puotationStrategyTemplate/templateAdministration/index";
export default {
  name: "templateAdministration",
  components: {
    configurePublic
    // configurePublic: () => {
    //   import("@/views/spot/configure/puotationStrategyTemplate/templateAdministration/index");
    //   // configurePublic: () => import("../../components/configurePublic")
    // }
  },
  data() {
    return {
      dialogVisible: false,
      btnStatus: true
    };
  },
  methods: {
    //初始化
    initUpdateDialog(data) {
      this.dialogVisible = true;
      setTimeout(() => {
        this.$refs.configurePublic.getData(data);
     }, 1000)
    },
    valueHanlder(parame) {
      //  this.$emit("childEvent", parame);
      this.$parent.childEvent(parame);
      this.dialogVisible = false;
    }
  }
};
</script>

<style scoped>
</style>
