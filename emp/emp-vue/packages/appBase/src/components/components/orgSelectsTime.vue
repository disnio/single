<!--
 * @功能描述交易周期和交易期次筛选
 * @版本: 
 * @作者: 张朋
 * @Date: 2019-10-28 13:55:12
 * @最新修改内容: 
 * @LastEditTime: 2021-03-03 10:36:04
 -->

<template>
  <div class="app-container" style="display:inline-block;">  
    <el-form  :inline="true"  :model="listQuery">
         <slot name="top"></slot>
         <el-form-item  label="交易周期" label-width="100px" algin="right">
          <el-select
           v-if="selectWidth"
            class="four-col left"
            :clearable="true"
            v-model="listQuery['tradeCycleCode']"
            placeholder="请选择"
            @change="changeTradingCycle"
            style="width:160px"
          >
            <el-option
              v-for="item in periodOptions"
              :key="item.propCode"
              :label="item.propName"
              :value="item.propCode"
            ></el-option>
          </el-select>

           <el-select
            v-else
            class="four-col left"
            :clearable="true"
            v-model="listQuery['tradeCycleCode']"
            placeholder="请选择"
            @change="changeTradingCycle"
            style="width:160px"
          >
            <el-option
              v-for="item in periodOptions"
              :key="item.propCode"
              :label="item.propName"
              :value="item.propCode"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="交易期次" label-width="100px">
          <el-date-picker
            v-if="listQuery['tradeCycleCode'] != 'jyzq01'&&listQuery['tradeCycleCode'] != 'jyzq02'&&listQuery['tradeCycleCode'] != 'jyzq03'&&listQuery['tradeCycleCode'] != 'jyzq04'&&listQuery['tradeCycleCode'] != 'jyzq05' && listQuery['tradeCycleCode'] != 'jyzq06'"
            type="year"
            :clearable="true"
            placeholder="请先选择交易周期"
            style="width:160px"
            disabled
          ></el-date-picker>
          <el-date-picker
            v-if="listQuery['tradeCycleCode'] == 'jyzq01'|| listQuery['tradeCycleCode'] == 'jyzq02' "
            v-model="tradeIssureData.yearData"
            type="year"
            class="w180"
            placeholder="选择年"
            style="width:160px"
            :clearable="true"
            @change="setTradeIssure"
          ></el-date-picker>
          <el-date-picker
            @change="setTradeIssure"
            v-if="listQuery['tradeCycleCode'] == 'jyzq03'|| listQuery['tradeCycleCode'] == 'jyzq06'"
            v-model="tradeIssureData.monthData"
            type="month"
            placeholder="选择月"
            style="width:160px"
            :clearable="true"
            class="w180"
          ></el-date-picker>
          <el-date-picker
            @change="setTradeIssure"
            v-if="listQuery.tradeCycleCode == 'jyzq04'"
            v-model="tradeIssureData.tradeBeginMonth"
            type="month"
            placeholder="选择月"
            :clearable="true"
            style="width:130px;float:left;"
          ></el-date-picker>
          <div v-if="listQuery.tradeCycleCode == 'jyzq04'" style="width:5%;float:left;">至</div>
          <el-date-picker
            @change="setTradeIssureEnd"
            v-if="listQuery.tradeCycleCode == 'jyzq04'"
            v-model="tradeIssureData.tradeEndMonth"
            type="month"
            placeholder="选择月"
            :clearable="true"
            style="width:130px;float:left;"
          ></el-date-picker>
          <el-date-picker
            @change="setTradeIssure"
            v-if="listQuery.tradeCycleCode == 'jyzq05'"
            v-model="tradeIssureData.tradeBeginMonth"
            type="month"
            placeholder="选择月"
            :clearable="true"
            style="width:130px;float:left;"
          ></el-date-picker>
          <div v-if="listQuery.tradeCycleCode == 'jyzq05'" style="width:5%;float:left;">至</div>
          <el-date-picker
            @change="setTradeIssure"
            v-if="listQuery.tradeCycleCode == 'jyzq05'"
            v-model="tradeIssureData.tradeEndMonth"
            type="month"
            placeholder="选择月"
            :clearable="true"
            style="width:130px;float:left;"
          ></el-date-picker>
          <span v-if="listQuery['tradeCycleCode'] == 'jyzq02'" class="w160">
            <el-select
              style="width:90px;"
              popper-class="select"
              @change="setTradeIssure"
              :clearable="true"
              v-model="tradeIssureData.quarter"
              placeholder="季度"
              :disabled="quarterStyle"
            >
              <el-option
                v-for="item in quarterOptions"
                :key="item.propCode"
                :label="item.propName"
                :value="item.propCode"
              ></el-option>
            </el-select>
          </span>
          <span v-if="listQuery['tradeCycleCode'] == 'jyzq06'" class="w160">
            <el-select
              style="width:90px;"
              popper-class="select"
              @change="setTradeIssure"
              :clearable="true"
              v-model="tradeIssureData.week"
              placeholder="选择周"
              :disabled="quarterStyle"
            >
              <el-option
                v-for="item in weekOptions"
                :key="item.propCode"
                :label="item.propName"
                :value="item.propCode"
              ></el-option>
            </el-select>
          </span>
        </el-form-item>
        <slot name="bottom"></slot>
    </el-form>
  </div>
</template>

<script>
import { mapGetters,mapActions } from "vuex";
import { getUserOrgInfo } from "@common/api/public/index";
import { getSelectList } from "@common/api/base";
import { parseTime } from "@common/utils/index";
import { getAllOrgByPorgId } from "@common/api/decisionSupport/customerRenew/index";
export default {
  name: "selectsTime",
  props: {
    selectWidth: {
      type: Boolean,
    }
  },
  data() {
    return {
     tradeIssureData: {
        quarter: "",
        monthData: "",
        yearData: "",
        tradeBeginMonth: "",
        tradeEndMonth: "",
        week: ""
      },
      quarterStyle:false,
      //交易周期数组
      periodOptions:[],
      listQuery: {
        tradeCycleCode: "",
      },
      //2019-11-8 #2454 张朋 维度信息周数据
      weekOptions: [],
    };
  },

  computed: {
    ...mapGetters(["userOrgInfo"])
  },
  created() {    
    this.init();
  },
  methods: {
    ...mapActions(['getSelect']),
    init() {
      //交易周期
      this.getSelect({dim: "transaction_period"}).then(res => {
        this.periodOptions = res;
      });
      //交易季度
      this.getSelect({dim: "quarter"}).then(res => {
        this.quarterOptions = res;
      });
      //交易季度
      this.getSelect({dim: "Quotation_segment"}).then(res => {
        this.quotationSegmentOption = res;
      });
      //2019-11-8 #2454 张朋  获取维度基础信息的周数据 
      this.getSelect({dim: "week"}).then(res => {        
        this.weekOptions = res;
      });
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
        quarter: "",
        monthData: "",
        yearData: "",
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
   /**
      * @方法名称: setTradeIssure
      * @功能描述: 设置期次信息
      * @参数: val
      * @返回值: 
      * @作者: 
      * @Date: 2019-11-04 09:07:16
      * @最新修改内容: 
      * @LastEditTime: 
      */
     setTradeIssure(val) { 
       //参数不为空时触发            
      if (val != null && val != undefined) {
        //交易周期为年时
        if (this.listQuery.tradeCycleCode == "jyzq01") {
          this.listQuery.tradeIssure = parseTime(
            this.tradeIssureData.yearData,
            "{y}"
          );
          //周期为季度时
        } else if (this.listQuery.tradeCycleCode == "jyzq02") {
          //状态为false,放开对交易期次-季度下拉框放开
            this.quarterStyle = false;
             //当季度为空时，清空tradeIssure值             
            if(typeof this.tradeIssureData.yearData == "undefined" || this.tradeIssureData.yearData == "" ||  this.tradeIssureData.yearData == null){                
                 Vue.set(this.tradeIssureData,'quarter',"");         
            }else{
              if(this.tradeIssureData.quarter == ""){
                    this.listQuery.tradeIssure = parseTime(this.tradeIssureData.yearData, "{y}");
              }else{
              this.listQuery.tradeIssure =
              parseTime(this.tradeIssureData.yearData, "{y}") +
              "-" +
              this.tradeIssureData.quarter;
            }
          }
          //周期为月度时
        } else if (this.listQuery.tradeCycleCode == "jyzq03") {
          this.listQuery.tradeIssure = parseTime(
            this.tradeIssureData.monthData,
            "{y}-{m}"
          );
          //#2454 张朋  调整：当周期为半年时进行
        } else if (this.listQuery.tradeCycleCode == "jyzq04") {          
          let tradeEndMonth = parseTime(Date.parse(val)+6*31*24*3600*1000,"{y}-{m}");
          Vue.set(this.tradeIssureData,'tradeEndMonth',tradeEndMonth);         
          this.listQuery.tradeIssure = this.tradeIssureData.tradeBeginMonth = parseTime(
            this.tradeIssureData.tradeBeginMonth,
            "{y}-{m}"
          );
          //2019-10-29 #2454 张朋 当周期为不定期时进行
        } else if (this.listQuery.tradeCycleCode == "jyzq05") {          
           let beginTime = parseTime(this.tradeIssureData.tradeBeginMonth,"{y}-{m}");
           let endTime = parseTime(this.tradeIssureData.tradeEndMonth,"{y}-{m}");  
           if(this.tradeIssureData.tradeBeginMonth == "" && this.tradeIssureData.tradeEndMonth != ""){
                  this.$notify({
                  title: "错误提示",
                  message: "交易期次的结束时间不能小于开始时间",
                  type: "warning",
                  duration: 2000
                })
                 this.tradeIssureData.tradeEndMonth = "";
           }        
          if(beginTime >= endTime && endTime != "0-0"){
               this.tradeIssureData.tradeEndMonth = ""
               this.$notify({
                  title: "错误提示",
                  message: "交易期次的结束时间不能小于开始时间",
                  type: "warning",
                  duration: 2000
                })
             }else{
              this.listQuery.tradeIssure = parseTime(
                this.tradeIssureData.tradeBeginMonth,
                "{y}-{m}"
              );
           }
           //周期为周时进行
        } else if (this.listQuery.tradeCycleCode == "jyzq06") {  
             this.quarterStyle = false;             
             //当季度为空时，清空tradeIssure值
            if(typeof this.tradeIssureData.monthData == "undefined" || this.tradeIssureData.monthData == "" ||  this.tradeIssureData.monthData == null){
                    Vue.set(this.tradeIssureData,'week',"");         
            }else{
              if(this.tradeIssureData.week == ""){
                    this.listQuery.tradeIssure = parseTime(this.tradeIssureData.monthData, "{y}-{m}");
              }else{
                this.listQuery.tradeIssure =
                parseTime(this.tradeIssureData.monthData, "{y}-{m}") +
                "-" +
                this.tradeIssureData.week;
            }
          }
        }
        this.tradeIssure(this.listQuery.tradeIssure );
      } else {
        //当val为空时
        //如果周期为季度时执行以下操作
        if (this.listQuery.tradeCycleCode == "jyzq02") {             
            if(typeof this.tradeIssureData.yearData == "undefined" || this.tradeIssureData.yearData == null || this.tradeIssureData.yearData == ""){                 
                 this.quarterStyle = true;
                 Vue.set(this.tradeIssureData,'quarter',"");         
            }else{
                this.quarterStyle = false;
            }
        }
       if (this.listQuery.tradeCycleCode == "jyzq06") {                         
            if(typeof this.tradeIssureData.monthData == "undefined" || this.tradeIssureData.monthData == null || this.tradeIssureData.monthData == ""){                 
                 this.quarterStyle = true;
                 Vue.set(this.tradeIssureData,'week',"");         
            }else{
                this.quarterStyle = false;
            }
        }
        this.listQuery.tradeIssure = undefined;
        this.tradeIssure(this.listQuery.tradeIssure );
      }
    },
    /**
     * @方法名称: setTradeIssureEnd
     * @功能描述: 交易周期为半年结束时间的点击函数
     * @参数: val
     * @返回值: 
     * @作者: 
     * @Date: 2019-11-04 09:03:40
     * @最新修改内容: 
     * @LastEditTime: 
     */
    setTradeIssureEnd(val){ 
      //当结束时间为null时
       if(val == null){
            this.listQuery.tradeIssure = "";
        }else{
          //不为null为开始时间赋值，结束时间减6个月的时间为开始时间
          let tradeBeginMonth = parseTime(Date.parse(val)-5*31*24*3600*1000,"{y}-{m}");
          this.listQuery.tradeIssure =  Vue.set(this.tradeIssureData,'tradeBeginMonth',tradeBeginMonth); 
        }     
        //调用tradeIssure方法
          this.tradeIssure(this.listQuery.tradeIssure );
          
    },
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
