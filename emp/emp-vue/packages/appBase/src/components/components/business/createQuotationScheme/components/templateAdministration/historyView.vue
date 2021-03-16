<!--
 * @Author: fengzp
 * @Date: 2020-08-25 14:02:29
 * @LastEditors: fengzp
 * @LastEditTime: 2020-08-25 14:19:48
 * @Introduce: Do not edit
-->
<template>
  <div>
    <el-dialog
      custom-class="w1000"
      title="历史报价方案"
      :visible.sync="dialogVisible"
      :modal-append-to-body="true"
      :close-on-click-modal="false"
      v-drag
    >
      <!-- <historyPublic ref="historyPublic"  @listenToChildEvent="valueHanlder"  :btnStatus="btnStatus"></historyPublic> -->
    </el-dialog>
  </div>
</template>

<script>
// import historyPublic from "@/views/spot/configure/historicalQuotationScheme/index";
export default {
  name: "templateAdministration",
  components: {
    historyPublic
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
          this.$refs.historyPublic.getData(data);
      }, 1000)

    },
    valueHanlder(parame) {
      let parames = parame;
      parames.type = "history";
      this.$parent.childEvent(parames);
      this.dialogVisible = false;
    }
  }
};
</script>

<style scoped>
</style>
