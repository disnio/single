<!--
 * @功能描述: 
 * @版本: 
 * @作者: 康如涛
 * @Date: 2020-01-15 21:55:18
 * @最新修改内容: 
 * @LastEditTime: 2020-04-30 13:57:36
 -->
<!--
  警告： 公共组件 严禁修改！！！！！！！！！！！！！！
  功能：现货 统一单位
  作者：chenfei
  时间：2019年10月15日 15:15:04
  版本：Pre-Alpha -> Alpaha 
  警告： 公共组件 严禁修改！！！！！！！！！！！！！！
-->
<template>
  <div>
    <span style="float: right; margin:-20px 15px 0 0">
      单位：{{this.unitMap.electricityUnit | formatUnity}}、
      {{this.unitMap.priceUnit | formatUnity}}、
      {{this.unitMap.amountUnit | formatUnity}}、
      {{this.unitMap.capacityUnit | formatUnity}}
    </span>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getUnitMap } from "@common/utils/index"; // 统一单位的接口
export default {
  name: "spotUnifiedUnit",
  data() {
    return {
      //计量单位初始化
      unitMap: {
        // electricityUnit: "万千瓦时", //电量
        // priceUnit: "元/千瓦时", //电价
        // amountUnit: "万元", //金额
        // capacityUnit: "千千瓦" //容量
      }
    };
  },
  created() {
    this.unitMap = getUnitMap(this.allSubMenus, this.unitMap);
  },
  computed: {
    ...mapGetters(["elements", "orgId", "allSubMenus", "userOrgInfo"])
  },
  watch: {
    // currentPage(val, oldVal) {
    //   console.log(this.currentPage);
    // },
    // deep: true,
    // immediate: true
  },
  mounted() {},
  methods: {},
  filters: {
    formatUnity: function(value) {
      if (!value) return "";
      if (value == "无") {
        return "";
      } else {
        return value;
      }
    }
  }
};
</script>

<style scoped>
</style>
