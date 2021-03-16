<template>
  <!-- //liz -->
  <div class="app-container calendar-list-container">
    <!-- 弹窗 -->
    <el-dialog
      custom-class="w1000"
      title="报价方案编辑"
      :before-close="handleClose"
      :visible.sync="dialogVisible"
      :modal-append-to-body="false"
      :close-on-click-modal="false"
      v-drag
    >
      <el-form :inline="true" :model="listQuery">
        <el-row>
          <el-form-item label="区域">
            <el-select
              style="width:150px"
              disabled
              v-model="listQuery['areaCode']"
              placeholder="区域"
            >
              <el-option
                v-for="item in orgAreaOptions"
                :key="item.propCode"
                :label="item.orgName"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="区域公司">
            <el-select
              disabled
              style="width:150px"
              v-model="listQuery['areaCompanyCode']"
              placeholder="请选择区域公司"
            >
              <el-option
                v-for="item in orgAreaComOptions"
                :key="item.propCode"
                :label="item.orgSname"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="交易中心">
            <el-select
              disabled
              :clearable="true"
              style="width:150px"
              v-model="listQuery['tradingCenterCode']"
              placeholder="请选择"
            >
              <el-option
                v-for="item in tradingCenterOptions"
                :key="item.propCode"
                :label="item.jyorgName"
                :value="item.jyorgId"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="标的">
            <el-select
              disabled
              :clearable="true"
              style="width:150px"
              v-model="listQuery['tranObjectCode']"
              placeholder="请选择"
            >
              <el-option
                v-for="item in targetOptions"
                :key="item.propCode"
                :label="item.propName"
                :value="item.propCode"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发电公司">
            <el-select
              disabled
              :clearable="true"
              style="width:150px"
              v-model="listQuery['orgCode']"
              placeholder="请选择"
            >
              <el-option
                v-for="item in orgPowerPlantOptions"
                :key="item.propCode"
                :label="item.orgName"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="交易单元">
            <el-select
              disabled
              :clearable="true"
              style="width:150px"
              v-model="listQuery['tradingUnitName']"
              placeholder="请选择"
            >
              <el-option
                v-for="item in powerPlantOptions"
                :key="item.propCode"
                :label="item.unitSname"
                :value="item.unitId"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-row>
      </el-form>
      <div class="filter-container">
        <el-button-group class="f-mb10">
          <el-button  :loading="saveBtnLoading" type="primary" @click="detailsSave">保存</el-button>
        </el-button-group>
        <!-- Wang Qiang 统一单位 2019-12-16 start -->
        <div class="txt-right unit-info">单位：{{ unitMap.capacityUnit }}、{{ unitMap.priceUnit }}</div>
        <!-- Wang Qiang 统一单位 2019-12-16 end -->
        <el-table
          ref="multipleTable"
          :data="programmeDetailsData"
          tooltip-effect="dark"
          style="width: 100%"
          height="200px"
          border
        >
          <el-table-column prop="index" align="center" label="序号" width="70px"></el-table-column>
          <el-table-column align="center" label="时点" width="150">
            <template slot-scope="scope">{{ scope.row.timeName }}</template>
          </el-table-column>
          <el-table-column align="center" label="段号" width="150">
            <template slot-scope="scope">{{scope.row.bnadName}}</template>
          </el-table-column>
          <!-- @date: 2019-1104 @作者: Wang Qiang @desc: 第一段起始出力改为可编辑 -->
          <el-table-column align="center" label="起始出力">
            <template slot-scope="scope">
              <el-input v-model="scope.row.capacityStart" :disabled="scope.row.disabled" style="width: 100%">
                <i v-if="scope.row.capacityStart ? !(/^(-)?\d{0,12}(?:\.\d{1,8})?$/.test(scope.row.capacityStart)) : false" slot="suffix" class="el-input__icon el-icon-circle-close" style="color: red"></i>
              </el-input>
            </template>
          </el-table-column>
          <el-table-column align="center" label="终止出力">
            <template slot-scope="scope">
              <el-input v-model="scope.row.capacityEnd" style="width: 100%" @change="blurInput(scope.row, scope.$index)">
                <i v-if="scope.row.capacityEnd ? !(/^(-)?\d{0,12}(?:\.\d{1,8})?$/.test(scope.row.capacityEnd)) : false" slot="suffix" class="el-input__icon el-icon-circle-close" style="color: red"></i>
              </el-input>
            </template>
          </el-table-column>
          <el-table-column align="center" label="申报容量">
            <template slot-scope="scope">
              <el-input v-model="scope.row.declareCapacity" :disabled="true" style="width: 100%"></el-input>
            </template>
          </el-table-column>
          <el-table-column align="center" label="申报电价">
            <template slot-scope="scope">
               <el-tooltip
                v-if="scope.row.declarePriceStatus=='ipt-err-true'"
                class="item"
                effect="dark"
                :content="scope.row.declarePriceStatusMsg"
                placement="top"
              >
                  <el-input
                    style="width:90%"
                    :class="scope.row.declarePriceStatus"
                    v-model="scope.row.declarePrice"
                  ></el-input>
               </el-tooltip>
                  <el-input
                    v-else
                    style="width:90%"
                    v-model="scope.row.declarePrice"
                  ></el-input>
            </template>
          </el-table-column>
        </el-table>
        <!-- <div v-show="!listLoading" class="pagination-container">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="listQuery.page"
            :page-sizes="[10, 20, 30, 50, 100, 200, 500, 1000]"
            :page-size="listQuery.limit"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div> -->
      </div>
      <div>
        <el-collapse class="fdgsAccordion" v-model="activeNames">
          <el-collapse-item title="申报信息批量调整" name="1" class>
            <div>
              <el-form
                :inline="true"
                :rules="rules"
                :model="BatchAdjustment"
                ref="BatchAdjustment"
              >
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="报价段号:" prop="bnadId">
                      <el-select v-model="BatchAdjustment.bnadId" style="width:168px">
                        <el-option
                          v-for="item in DetailsData"
                          :key="item.propCode"
                          :label="item.bnadName"
                          :value="item.bnadId"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="调整时点:" prop="timeId">
                      <el-select v-model="BatchAdjustment.timeId" style="width:168px">
                        <el-option
                          v-for="item in fulltimePointOptions"
                          :key="item.timeId"
                          :label="item.propName"
                          :value="item.propCode"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item prop="capacityAdjustmentValue">
                      <el-checkbox v-model="checkedCapacity" style="margin-right: 12px;">容量调整值:</el-checkbox>
                      <el-input
                        v-model="BatchAdjustment.capacityAdjustmentValue"
                        style="width:168px"
                      ></el-input> MW
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item prop="electricityPriceValue">
                      <el-checkbox v-model="checkedPrice" style="margin-right: 12px;">电价调整值:</el-checkbox>
                      <el-input v-model="BatchAdjustment.electricityPriceValue" style="width:168px"></el-input> 元/千千瓦时
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
            <div style="float:right">
              <el-button class="save-btn" @click="createSave('BatchAdjustment')">确定调整</el-button>
              <el-button class="cancel-btn" @click="dialogVisible = false">取消调整</el-button>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </el-dialog>
  </div>
</template>
<script>
// import { create, all } from 'mathjs'
// const math = create(all)
import { parseTime } from "@common/utils/index";
import {
  getDetailPage,
  adjustmentObj,
  updateObj,
  selectTheDefaultPowerValue
} from "@common/api/spot/tran/quotationSchemeManage/createQuotationScheme/index";
import { getCrewInforList } from "@common/api/spot/settl/electricityGenerationSettl/common/index";
import { validatorNumber } from "@common/utils/validate";
import { getSelectList } from "@common/api/base";
import { mapGetters } from "vuex";

export default {
  props: {
    orgAreaOptions: { type: Array },
    orgAreaComOptions: { type: Array },
    orgPowerPlantOptions: { type: Array },
    tradingCenterOptions: { type: Array },
    targetOptions: { type: Array }
  },

  data() {
    return {
      checkedCapacity: false,
      checkedPrice: false,
      listQuery: {
        page: 1,
        limit: 10000,
        areaCode: "",
        areaCompanyCode: "",
        tradingCenterCode: "",
        tranObjectCode: "",
        orgCode: "",
        tradingUnitCode: ""
      },
      saveBtnLoading:false,
      powerPlantOptions: [],
      activeNames: ["1"],
      isErr: false,
      BatchAdjustment: {
        bnadId: "",
        timeId: "",
        capacityAdjustmentValue: "",
        electricityPriceValue: ""
      },
      DetailsData: [],
      //整点时点数据
      fulltimePointOptions: [],
      programmeDetailsData: [],
      //必选
      rules: {
        declarePrice: [{ validator: validatorNumber, trigger: "blur" }],
        declareCapacity: [{ validator: validatorNumber, trigger: "blur" }],
        capacityAdjustmentValue: [
          { validator: validatorNumber, trigger: "blur" }
        ],
        electricityPriceValue: [
          { validator: validatorNumber, trigger: "blur" }
        ],
        bnadId: [
          {
            required: true,
            message: "* 为必填项",
            trigger: "change"
          }
        ],
        timeId: [
          {
            required: true,
            message: "* 为必填项",
            trigger: "change"
          }
        ]
      },
      dialogVisible: false,
      listLoading: false,
      pid: "",
      total: 0,
      ratedNum: '', // 额定出力
      unitMap: {}
    };
  },
  computed: {
    ...mapGetters(["elements", "orgId", "allSubMenus"])
  },
  created() {
    this.init();
  },
  mounted () {
    this.initUnitMap()
  },
  methods: {
    // 初始化页面计量单位
    initUnitMap () {
      this.allSubMenus.forEach(menu => {
        if (menu.code == sessionStorage.getItem('modelCode')) {
          this.unitMap['electricityUnit'] = menu.unitMap[1]
          this.unitMap['priceUnit'] = menu.unitMap[2]
          this.unitMap['chargeUnit'] = menu.unitMap[3]
          this.unitMap['capacityUnit'] = menu.unitMap[4]
        }
      });
    },
    blurInput (row, index) {
      let arr = this.programmeDetailsData
      let arrNum = arr.length
      let newVal = row.capacityEnd
      let reg = /^(-)?\d{0,12}(?:\.\d{1,8})?$/
      let _this = this
      if (index < arrNum - 1) {
        if (arr[index].timeName == arr[index + 1].timeName) {
          if (reg.test(newVal)) {
            if (!arr[index].capacityStart.toString() || arr[index].capacityStart >= newVal*1 || newVal*1 > this.ratedNum*1) {
              this.$notify({
                title: "提示信息",
                message: "终止出力必须大于起初出力并且小于等于额定出力！",
                type: "warning",
                duration: 2000
              });
              this.programmeDetailsData[index].capacityEnd = ''
            } else if (arr[index].capacityEnd*1 == this.ratedNum) {
              let a = _this.programmeDetailsData[index]
              a.declareCapacity = this.addNum(newVal*1, row.capacityStart*1)
              //_this.programmeDetailsData[index].declareCapacity = newVal*1 - row.capacityStart*1
              _this.$set(_this.programmeDetailsData, index, a)
            } else {
              this.programmeDetailsData[index].declareCapacity = this.addNum(newVal*1, row.capacityStart*1)
              this.programmeDetailsData[index + 1].capacityStart = newVal*1
            }
          } else {
            this.$notify({
              title: "提示信息",
              message: "终止出力必须为数字！",
              type: "warning",
              duration: 2000
            });
          }
        } else {
          if (reg.test(newVal)) {
            if (!arr[index].capacityStart.toString() || arr[index].capacityStart*1 >= newVal*1 || newVal*1 > this.ratedNum*1) {
              this.$notify({
                title: "提示信息",
                message: "终止出力必须大于起初出力并且小于等于额定出力!！",
                type: "warning",
                duration: 2000
              });
              this.programmeDetailsData[index].capacityEnd = ''
            } else {
              let a = _this.programmeDetailsData[index]
              a.declareCapacity = this.addNum(newVal*1, row.capacityStart*1)
              //_this.programmeDetailsData[index].declareCapacity = newVal*1 - row.capacityStart*1
              _this.$set(_this.programmeDetailsData, index, a)
            }
          } else {
            this.$notify({
              title: "提示信息",
              message: "终止出力必须为数字！",
              type: "warning",
              duration: 2000
            });
          }
        }
      } else if (index == arrNum - 1) {
        if (reg.test(newVal)) {
          if (!arr[index].capacityStart.toString() || arr[index].capacityStart*1 >= newVal*1 || newVal > this.ratedNum*1) {
            this.$notify({
              title: "提示信息",
              message: "终止出力必须大于起初出力并且小于等于额定出力!!！",
              type: "warning",
              duration: 2000
            });
            this.programmeDetailsData[index].capacityEnd = ''
          } else {
            let a = _this.programmeDetailsData[index]
            a.declareCapacity = this.addNum(newVal*1, row.capacityStart*1)
            //_this.programmeDetailsData[index].declareCapacity = newVal*1 - row.capacityStart*1
            _this.$set(_this.programmeDetailsData, index, a)
          }
        } else {
          this.$notify({
            title: "提示信息",
            message: "终止出力必须为数字！",
            type: "warning",
            duration: 2000
          });
        }
      }
    },
    //初始化
    init() {
      getSelectList("pvtimeType").then(res => {
        this.fulltimePointOptions = res;
      });
    },
    async initUpdateDialog(data) {
      this.emptyForm();
      this.pid = data.schemeId;
      this.listQuery.areaCode = data.areaCode
      this.listQuery.areaCompanyCode = data.areaCompanyCode
      this.listQuery.tradingCenterCode = data.tradingCenterCode
      this.listQuery.tranObjectCode = data.tranObjectCode
      this.listQuery.orgCode = data.orgCode
      this.listQuery.tradingUnitName = data.tradingUnitName
      this.checkedCapacity = false;
      this.checkedPrice = false;
      this.dialogVisible = true;
      this.getList(this.listQuery);
      // 获取额定出力
      let res = await selectTheDefaultPowerValue({
        areaCode: data.areaCode,
        areaCompanyCode: data.areaCompanyCode,
        transactionDate: data.transactionDate,
        orgId: data.orgCode,
        unitId: data.tradingUnitCode
      })
      if (res.rel) {
        this.ratedNum = res.data
      } else {
        this.$notify({
          title: '提示',
          message: '此机组的额定出力未维护，请进行维护后在操作！',
          type: "warning",
          duration: 2000
        });
      }
    },
    //列表展示
    getList() {
      let Parameters = {
        page: this.listQuery.page,
        limit: this.listQuery.limit,
        mainId: this.pid
      };
      //根据报价方案主表id获取详情信息
      getDetailPage(Parameters).then(response => {
        let items = response.data.rows.map((item, index) => {
          item.index =
            index + 1 + (this.listQuery.page - 1) * this.listQuery.limit;
          return item;
        });
        items.forEach(val => {
          if (!(val.capacityStart >= 0)) val.capacityStart = ''
          if (!(val.capacityEnd >=0)) val.capacityEnd = ''
          if (val.bnadName == '第一段' || val.bnadName == '第1段') val.disabled = false
          else val.disabled = true
        })
        this.programmeDetailsData = items;
        this.total = response.data.total;
        var map = {};
        var DetailsData = [];
        for (var i = 0; i < this.programmeDetailsData.length; i++) {
            var ai = this.programmeDetailsData[i],
             key = ai.bnadId;
          if (!map[key]) {
            DetailsData.push(ai);
            map[key] = ai;
          }
        }
        this.DetailsData = DetailsData;
      });
    },
    //清空数据
    emptyForm() {
      this.BatchAdjustment = {
        bnadId: "",
        timeId: "",
        capacityAdjustmentValue: "",
        electricityPriceValue: ""
      };
      this.programmeDetailsData = [];
       if (typeof this.$refs.BatchAdjustment != "undefined") {
        this.$refs.BatchAdjustment.resetFields(); //移除校验结果并重置字段值
      }
    },
    //保存
    detailsSave() {
       let parameInfo = this.setParameList();


        if (parameInfo.isErr) {
            this.$notify({
              title: "提示",
              message: "保存失败，列表数据有误！",
              type: "warning",
              duration: 2000
            });
            return false;
        }else{
          this.saveBtnLoading = true
          updateObj(this.programmeDetailsData).then(res => {
            this.saveBtnLoading = false
            if (res.rel) {
              this.$notify({
                title: res.msg,
                message: res.msg,
                type: "success",
                duration: 2000
              });
              this.dialogVisible = false;
              this.ratedNum = ""
            this.$parent.getList();
            } else {
              this.$notify({
                title: res.msg,
                message: res.msg,
                type: "warning",
                duration: 2000
              });
            }
          });
        }
      //}
      //  else {
      //   this.$notify({
      //     title: "提示",
      //     message: "数据为空无法修改！",
      //     type: "warning",
      //     duration: 2000
      //   });
      // }
    },
    checkVal(key,data,i,msg){
      let state=false;
       // let reg = /^\d+(\.\d+)?$/;
      let reg =/(^[\-0-9][0-9]*(.[0-9]+)?)$/
      if (data== "" || typeof(data) == 'undefined' ) {
        state=false;
      }else{
        if(!(new RegExp(reg).test(data)) ){
          Vue.set(this.programmeDetailsData[i], key+"Status","ipt-err-true")
          this.programmeDetailsData[i][key+'StatusMsg'] =msg+"为数值";
          state = true;
        }else if((data>1000000000000||data.length)-(String(data).indexOf('.') + 1)>8){
          Vue.set(this.programmeDetailsData[i],  key+"Status","ipt-err-true")
          this.programmeDetailsData[i][key+'StatusMsg'] =msg+"最多为12位整数及8位小数";
          state = true;
        }
      }
      if(!state){
          Vue.set(this.programmeDetailsData[i], key+"Status","")
      }
      return state
   },
    //检测表格数据
    setParameList(){
      let parameInfo = {};
      parameInfo.isErr = false;
      let err=[];
      for (let i = 0, l = this.programmeDetailsData.length; i < l; i++) {
        // if(this.programmeDetailsData[i].declareCapacity <= 0){
        //   Vue.set(this.programmeDetailsData[i],"declareCapacityStatus","ipt-err-true")
        //   this.programmeDetailsData[i]['declareCapacityStatusMsg'] ="申报容量为正数";
        //   err.push("err");
        // }else{
          if(this.checkVal('declareCapacity',this.programmeDetailsData[i].declareCapacity,i,"申报容量")){
            err.push("err");
          }
        // }
        if(this.checkVal('declarePrice',this.programmeDetailsData[i].declarePrice,i,"申报电价")){
          err.push("err");
        }
      }
      if(err.length>0){
        parameInfo.isErr = true;
      }
      return parameInfo;
    },
    //批量调整
    createSave(formName) {
      if (this.checkedCapacity == false && this.checkedPrice == false) {
        this.$notify({
          title: "提示信息",
          message: "请选择要调整的数据！",
          type: "warning",
          duration: 2000
        });
      } else if(this.checkedCapacity == true && this.checkedPrice == true) {
          this.adjustmentSave(1,formName);
      } else if(this.checkedCapacity == false && this.checkedPrice == true){
          this.adjustmentSave(2,formName);
      }else if(this.checkedCapacity == true && this.checkedPrice == false){
          this.adjustmentSave(3,formName);
      }
    },
    adjustmentSave(data,formName){
      const set = this.$refs;
      set[formName].validate(valid => {
            if (valid) {
                let Parameters = {
                  areaCode: this.listQuery.areaCode,
                  areaCompanyCode: this.listQuery.areaCompanyCode,
                  schemeId: this.pid,
                  bandId: this.BatchAdjustment.bnadId,
                  timeType: this.BatchAdjustment.timeId,
                  tradingCenterCode: this.listQuery.tradingCenterCode

                }
              if(data == 1){
                Parameters.declareCapacity =  this.BatchAdjustment.capacityAdjustmentValue
                Parameters.declarePrice = this.BatchAdjustment.electricityPriceValue
              }else if(data == 2){
                 Parameters.declarePrice = this.BatchAdjustment.electricityPriceValue
              }else if(data == 3){
                Parameters.declareCapacity =  this.BatchAdjustment.capacityAdjustmentValue
              }
              adjustmentObj(Parameters).then(res => {
                if (res.rel) {
                  this.$notify({
                    title: res.msg,
                    message: res.msg,
                    type: "success",
                    duration: 2000
                  });
                  this.listQuery.schemeId = this.pid;
                  this.initUpdateDialog(this.listQuery);
                }
              });

            } else {
              return false;
            }
          });
    },
    //列表分页变更条数
    handleSizeChange(val) {
      this.listQuery.limit = val;
      this.getList();
    },
    //列表分页切换
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getList();
    },
    /**
    * 解决浮点数计算
    * @date 2019-10-30
    * @author chenf
    */
    addNum(arg1,arg2){    
        var r1,r2,m,n;    
        try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}    
        try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}    
        m=Math.pow(10,Math.max(r1,r2));    
        //动态控制精度长度    
        n=(r1>=r2)?r1:r2;    
        return parseFloat(((arg1*m-arg2*m)/m).toFixed(n));      
    },
    handleClose() {
      this.dialogVisible = false
      this.ratedNum = ""
    }
  }
};
</script>

<style>
.checkedFlot {
  position: relative;
  left: 40px;
}
.labelFlot {
  position: relative;
  right: 17px;
}
.zz {
  position: relative;
  right: 25px;
}
</style>
