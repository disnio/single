<!--
 * 所属调度组件
 * wxc
 *
 * 用法：
   <DispatchingDivision
    :key="form.id" 
    :curData="echoGridObj" // 回显数据
    :isDisabled="formDisabled" // 是否禁用
    @dispatchPowerGrid="dispatchPowerGrid" // 接收 组件传参
    @getOption="echoGrid" // 设置回显
    />

    // 调度电网
    dispatchPowerGrid(obj){
      this.form.gridCode = obj.propCode;
    },
    // 调度电网 回显
    echoGrid(allData){
      this.echoGridObj['propCode'] = this.form.gridCode || "";
      this.echoGridObj['propName'] = allData[this.form.gridCode] || "";
    },
-->
<template>
  <el-cascader
    ref="refPowerGrid"
    v-model="curData.propCode"
    :options="options"
    :disabled="isDisabled"
    :props="{
      checkStrictly: true,
      value: 'propCode',
      label: 'propName',
      children: 'children',
      disabled: 'disabled',
    }"
    :show-all-levels="false"
    :filterable="true"
    placeholder="请选择"
    @change="getNodeData"
    clearable
  />
</template>

<script>
import { dataLimitTree } from "@common/api/admin/element/index";

export default {
  props: {
    isDisabled: {
      type: Boolean,
      default: false,
    },
    curData: {
      type: Object,
      default: {
        propCode: "",
        propName: "",
      }
    }
  },
  data() {
    return {
      options: [],
    };
  },
  created() {
    let state = this.$store.state;
    if(typeof state.powerGridData == 'undefined'){
      this.init();
    }else{
      this.options = state.powerGridData.option;
      this.$emit('getOption', state.powerGridData.allData);
    }
  },
  methods: {
    init() {
      dataLimitTree({ propCode: "dispatching_division" }).then((res) => {
        let option = this.reSetTree(res);
        let allData = this.returnData(option);
        this.options = option;
        this.$store.state.powerGridData = { allData, option };
        this.$emit('getOption', allData);
      });
    },
    returnData(option){
      return fun(option, {});
      function fun(option, obj){
          option.forEach(item=>{
              obj[item.propCode] = item.propName;
              if(typeof item.children != "undefined" && item.children.length > 0){
                  fun(item.children, obj);
              }
              
          });
          return obj;
      };
    },
    reSetTree(data) {
      let options = [];
      data.forEach((item) => {
        let obj = {};
        obj.propName = item.propName;
        obj.propCode = item.propCode;
        if (typeof item.children != "undefined" && item.children.length > 0) {
          obj.children = this.reSetTree(item.children);
        }
        options.push(obj);
      });
      return options;
    },
    getNodeData(val) {
      if (val.length > 1) {
        this.curData.propCode = val[1];
      } else {
        this.curData.propCode = val[0];
      }
      if (val.length > 1) {
        this.$refs["refPowerGrid"].dropDownVisible = false;
      }
      this.$emit("dispatchPowerGrid", this.curData);
    },
  },
};
</script>

<style lang="css" scoped>
.el-cascader {
  line-height: 100% !important;
}
</style>