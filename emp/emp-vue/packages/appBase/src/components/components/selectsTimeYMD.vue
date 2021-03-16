<!--
 * @功能描述：年、月、日时间范围选择组件
 * @版本: v1.0
 * @作者: 李飞
 * @Date: 2019-12-25 23:55:12
 * @最新修改内容: 
 * @LastEditTime: 2019-12-25 23:55:12
 -->

<template>
  <div class="app-container" style="display:inline-block;">
    <el-form  :inline="true"  :model="listQuery" label-width="100px">
         <el-form-item  label="日期类别：" label-width="100px" algin="right">
           <el-select
            class="four-col left"
            :clearable="true"
            v-model="listQuery['tradeCycleCode']"
            placeholder="请选择"
            @change="changeTradingCycle"
            style="width:163px"
          >
            <el-option
              v-for="item in periodOptions"
              :key="item.propCode"
              :label="item.propName"
              :value="item.propCode"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="起止日期：" label-width="100px">
          <!--类型未选择前选择起止时间禁用--> 
          <el-date-picker
            v-if="listQuery['tradeCycleCode'] != 'D'&&listQuery['tradeCycleCode'] != 'M'&&listQuery['tradeCycleCode'] != 'Y'"
            type="year"
            :clearable="true"
            placeholder="请选择日期类别"
            style="width:163px"
            disabled
          ></el-date-picker>

          <!--日度-->
          <el-date-picker
            @change="setTradeIssure"
            v-if="listQuery.tradeCycleCode == 'D'"
            v-model="tradeIssureData.beginDate"
            placeholder="开始日期"
            :clearable="true"
            style="width:130px;float:left;"
          ></el-date-picker>
          <div v-if="listQuery.tradeCycleCode == 'D'" style="width:5%;float:left;"> 至 </div>
          <el-date-picker
            @change="setTradeIssureEnd"
            v-if="listQuery.tradeCycleCode == 'D'"
            v-model="tradeIssureData.endDate"
            placeholder="结束日期"
            :clearable="true"
            style="width:130px;float:left;"
          ></el-date-picker>

          <!--月度-->
          <el-date-picker
            @change="setTradeIssure"
            v-if="listQuery.tradeCycleCode == 'M'"
            v-model="tradeIssureData.beginDate"
            type="month"
            placeholder="选择月"
            :clearable="true"
            style="width:130px;float:left;"
          ></el-date-picker>
          <div v-if="listQuery.tradeCycleCode == 'M'" style="width:5%;float:left;">至</div>
          <el-date-picker
            @change="setTradeIssureEnd"
            v-if="listQuery.tradeCycleCode == 'M'"
            v-model="tradeIssureData.endDate"
            type="month"
            placeholder="选择月"
            :clearable="true"
            style="width:130px;float:left;"
          ></el-date-picker>
          
          <!--年度-->
          <el-date-picker
            @change="setTradeIssure"
            v-if="listQuery.tradeCycleCode == 'Y'"
            v-model="tradeIssureData.beginDate"
            type="year"
            placeholder="选择年"
            :clearable="true"
            style="width:130px;float:left;"
          ></el-date-picker>
          <div v-if="listQuery.tradeCycleCode == 'Y'" style="width:5%;float:left;">至</div>
          <el-date-picker
            @change="setTradeIssureEnd"
            v-if="listQuery.tradeCycleCode == 'Y'"
            v-model="tradeIssureData.endDate"
            type="year"
            placeholder="选择年"
            :clearable="true"
            style="width:130px;float:left;"
          ></el-date-picker>
        </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { parseTime } from "@common/utils/index";
export default {
  name: "selectsTimeYMD",
  data() {
    return {
      periodOptions: [{
        propCode: 'D',
        propName: '日度'
      }, {
        propCode: 'M',
        propName: '月度'
      }, {
        propCode: 'Y',
        propName: '年度'
      }],

     tradeIssureData: {
        beginDate: "",
        endDate: ""
      },
      quarterStyle:false,
      listQuery: {
        tradeCycleCode: "",
      }
    };
  },

  computed: {
    ...mapGetters(["userOrgInfo"])
  },
  created() {    
    this.init();
  },
  methods: {
    init() {
    },
    /**
     * @方法名称: changeTradingCycle
     * @功能描述: 选择交易周期
     * @参数: 
     * @返回值: 
     * @作者: 
     * @Date: 2019-11-04 09:19:54
     * @最新修改内容: 
     * @LastEditTime: 
     */
    changeTradingCycle() {
      //清空数据
     this.tradeIssureData={
        beginDate: "",
        endDate: ""
      }; 
      //调用配置期次信息方法     
      this.setTradeIssure();
      this.selectTime(this.listQuery.tradeCycleCode);
    },
   /**
      * @方法名称: selectTime
      * @功能描述: 向父组件传递交易周期信息
      * @参数: 
      * @返回值: 
      * @作者: 
      * @Date: 2019-11-03 16:26:04
      * @最新修改内容: 
      * @LastEditTime: 
      */
    selectTime(val) {
      this.$emit("selectTime", val);
    },
       /**
      * @方法名称: tradeIssure
      * @功能描述: 向父组件传递交易期次信息
      * @参数: 
      * @返回值: 
      * @作者: 
      * @Date: 2019-11-03 16:26:28
      * @最新修改内容: 
      * @LastEditTime: 
      */
   tradeIssure(val){     
      this.$emit("tradeIssure", val);
   },
   tradeIssureEnd(val){     
      this.$emit("tradeIssureEnd", val);
   },
   // 设置开始时间
     setTradeIssure(val) { 
       //参数不为空时触发            
      if (val != null && val != undefined) {
        // 日
        if (this.listQuery.tradeCycleCode == "D") {
          this.listQuery.tradeIssure = parseTime( this.tradeIssureData.beginDate,"{y}-{m}-{d}");
        }
        // 月
        else if (this.listQuery.tradeCycleCode == "M") {
          this.listQuery.tradeIssure = parseTime( this.tradeIssureData.beginDate,"{y}-{m}");
        }
        // 年
        else if (this.listQuery.tradeCycleCode == "Y") {
          this.listQuery.tradeIssure = parseTime( this.tradeIssureData.beginDate,"{y}");
        } 
        this.tradeIssure(this.listQuery.tradeIssure);
      }
    },
    // 设置结束时间
     setTradeIssureEnd(val) { 
       //参数不为空时触发            
      if (val != null && val != undefined) {
        // 日
        if (this.listQuery.tradeCycleCode == "D") {
          this.listQuery.tradeIssureEnd = parseTime( this.tradeIssureData.endDate,"{y}-{m}-{d}");
        }
        // 月
        else if (this.listQuery.tradeCycleCode == "M") {
          this.listQuery.tradeIssureEnd = parseTime( this.tradeIssureData.endDate,"{y}-{m}");
        }
        // 年
        else if (this.listQuery.tradeCycleCode == "Y") {
          this.listQuery.tradeIssureEnd = parseTime( this.tradeIssureData.endDate,"{y}");
        } 
        this.tradeIssureEnd(this.listQuery.tradeIssureEnd);
      }
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
