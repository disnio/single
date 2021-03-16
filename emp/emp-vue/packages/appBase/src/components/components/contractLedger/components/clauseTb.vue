<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="4">
        <el-form-item>&nbsp;</el-form-item>
      </el-col>
      <el-col :span="20">
        <el-row :gutter="10">
          <el-col :span="6">
            <div class="txt-center">
                  <span>
                    年度{{types}}分解电量({{ unitMap.electricityUnit }})
                  </span>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="txt-center">
                              <span
                              >年度{{types}}分解电价({{ unitMap.priceUnit }})</span
                              >
            </div>
          </el-col>
          <el-col :span="6">
            <div class="txt-center">
                              <span>
                                月度竞价分解电量({{ unitMap.electricityUnit }})
                              </span>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="txt-center">
                              <span
                              >月度竞价分解电价({{ unitMap.priceUnit }})</span
                              >
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>

    <el-row :gutter="10" v-for="(m, mi) in months">
      <el-col :span="4">
        <el-form-item :label="`${mi+1}月：`"></el-form-item>
      </el-col>
      <el-col :span="20">
        <el-row :gutter="10">
          <el-col :span="6">
            <el-input
              type="number"
              step="“0.0001”"
              @mousewheel.native.prevent
              :disabled="yearBilateElectricState"
              v-model="clausePlan[`${m}Year${tk}Electric`]"
            ></el-input>
          </el-col>
          <el-col :span="6">
            <el-input
              type="number"
              step="“0.0001”"
              @mousewheel.native.prevent
              :disabled="yearBilateElectricState"
              v-model="clausePlan[`${m}Year${tk}ElecPrice`]"
            ></el-input>
          </el-col>
          <el-col :span="6">
            <el-input
              type="number"
              step="“0.0001”"
              @mousewheel.native.prevent
              :disabled="electricityTradeState"
              v-model="clausePlan[`${m}ElectricityTrade`]"
            ></el-input>
          </el-col>
          <el-col :span="6">
            <el-input
              type="number"
              step="“0.0001”"
              @mousewheel.native.prevent
              :disabled="electricityTradeState"
              v-model="clausePlan[`${m}ElectricityPrice`]"
            ></el-input>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>

</template>

<script>
export default {
  name: "clauseTb",
  props: {
    unitMap: Object,
    months: Array,
    clausePlanSource: Object,
    yearBilateElectricState: Boolean,
    electricityTradeState: Boolean,
    // true: 双边， false：长协
    type: Boolean
  },
  computed: {
    types(){
      return this.type ? "双边" : "长协"
    },
    tk(){
      return this.type ? "Bilate" : "Longterm"
    }
  },
  watch: {
    clausePlanSource: {
      immediate: true,
      handler(n, o) {
        if (!_.isEqual(n, this.clausePlan)) {
          console.log("tb clausePlanSource", n)
          this.clausePlan = {...n};
        }
      }
    },
    clausePlan: {
      deep: true,
      handler(n, o) {
          console.log("tb clausePlan", n)
          this.$emit("change:clause", n)
      }
    }
  },
  data() {
    return {
      clausePlan: {}
    }
  }
}
</script>

<style scoped>

</style>
