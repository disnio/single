<!--
 * @功能描述: 市场签约情况统计表
 * @版本: 
 * @作者: 张朋
 * @Date: 2019-11-27 12:33:23
 * @最新修改内容: 
 * @LastEditTime : 2020-01-17 20:53:12
 -->

<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-form class="form-inline-168" :inline="true" :model="listQuery">
        <el-form-item label="期次" label-width="70px" algin="right">
          <el-date-picker
            v-model="listQuery.issue"
            type="month"
            format="yyyy-MM"
            value-format="yyyy-MM"
            placeholder="选择日期"
          ></el-date-picker>
        </el-form-item>
        <el-button
          class="filter-item"
          type="primary"
          v-waves
          icon="el-icon-search"
          @click="handleFilter"
        >查询</el-button>
      </el-form>
    </div>
    <el-button-group class="f-mb10">
      <el-button v-if="marketSigningSituationManager_btn_add" class="filter-item" type="primary" icon="el-icon-plus" @click="handleCreate">新增</el-button>
    </el-button-group>
    <el-table
      :key="tableKey"
      :data="list"
      v-loading.body="listLoading"
      border
      fit
      highlight-current-row
      style="width: 100%"
      :height="tabHeight"
    >
      <!-- <el-table-column type="selection" align="center" width="55"></el-table-column> -->
      <el-table-column type="index" label="序号" align="center" width="70px"></el-table-column> 
      <el-table-column align="center" label="期次">
        <template slot-scope="scope">
          <span class="txt-left">{{scope.row.issue}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="状态">
        <template slot-scope="scope">
          <span>{{scope.row.statusName}}</span>
        </template>
      </el-table-column>

      <el-table-column fixed="right" align="center" label="操作" width="250">
        <template slot-scope="scope">
          <el-button v-if="marketSigningSituationManager_btn_check" size="small" type="text" @click="handleCheck(scope.row,'view')">查看</el-button>
          <el-button
            v-if="scope.row.status == '11' && marketSigningSituationManager_btn_edit"
            size="small"
            type="text"
            @click="handleCheck(scope.row,'update')"
          >编辑</el-button>
          <el-button
            v-if="scope.row.status == '3' && marketSigningSituationManager_btn_update"
            size="small"
            type="text"
            @click="handleCheck(scope.row,'modify')"
          >修改</el-button>
          <!-- <el-button size="small" type="text" @click="handleDelete(scope.row)">删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <div v-show="!listLoading" class="pagination-container">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="listQuery.page"
        :page-sizes="[10,20,30, 50,100,200,500,1000]"
        :page-size="listQuery.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <el-dialog
      v-drag
      :close-on-click-modal="false"
      title="新增"
      :visible.sync="dialogPeriod"
      @close="closeDialog"
      custom-class="w480"
    >
      <el-form :model="periodFrom" :inline="true" class="demo-form-inline" align="center">
        <el-form-item label="选择期次">
          <el-date-picker
            style="width:150px"
            v-model="periodFrom.issue"
            type="month"
            :clearable="true"
            format="yyyy-MM"
            value-format="yyyy-MM"
            placeholder="选择日期"
          ></el-date-picker>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button class="save-btn" :loading="determineLoading" @click="addPeriod('periodFrom')">确 认</el-button>
        <el-button class="cancel-btn" @click="closeDialog()">取 消</el-button>
      </div>
    </el-dialog>
    <el-dialog
      v-drag
      :close-on-click-modal="false"
      :title="dialogInfo.title"
      custom-class="w1000"
      :visible.sync="dialogVisible"
      :modal-append-to-body="false"
    >
      <el-form :model="form" ref="form" :rules="rules" label-width="100px">
        <div v-if="signingOptions.length>0">
          <div v-for="(item,index) in signingOptions" :key="index">
            <div class="headerFont">
              <span>{{item.groupIndustryName}}</span>
            </div>
            <el-row>
              <el-col :span="8">
                <el-form-item v-if="item.groupIndustryName == '合计' " label="签约量" algin="right">
                  <el-input
                    v-model="item['conVolume']"
                    style="width:60%"
                    disabled
                  ></el-input>
                  <span>{{unitMap.electricityUnit}}</span>
                </el-form-item>
                 <el-form-item v-else label="签约量" algin="right">
                  <el-input
                    v-model="item['conVolume']"
                    style="width:60%"
                    type="number"
                    @input="conVolumeChange()"
                    onKeypress="return(/[\d\.]/.test(String.fromCharCode(event.keyCode)))"
                    :disabled="isDisabled"
                  ></el-input>
                  <span>{{unitMap.electricityUnit}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                  <el-form-item v-if="item.groupIndustryName == '合计' "  label="电价" algin="right">
                  <el-input
                    v-model="item['elePrice']"
                    style="width:60%"
                    disabled
                  ></el-input>
                  <span>{{unitMap.priceUnit}}</span>
                </el-form-item>
                <el-form-item v-else label="电价" algin="right">
                  <el-input
                    v-model="item['elePrice']"
                    type="number"
                    style="width:60%"
                    @input="elePriceChange()"
                    onKeypress="return(/[\d\.]/.test(String.fromCharCode(event.keyCode)))"
                    :disabled="isDisabled"
                  ></el-input>
                  <span>{{unitMap.priceUnit}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item v-if="item.groupIndustryName == '合计' "  label="降幅" algin="right">
                  <el-input
                    v-model="item['decline']"
                    style="width:60%"
                    disabled
                  ></el-input>
                  <span>{{unitMap.priceUnit}}</span>
                </el-form-item>
                <el-form-item v-else label="降幅" algin="right">
                  <el-input
                    v-model="item['decline']"
                    type="number"
                    style="width:60%"
                    @input="declineChange()"
                    onKeypress="return(/[\d\.]/.test(String.fromCharCode(event.keyCode)))"
                   :disabled="isDisabled"
                  ></el-input>
                  <span>{{unitMap.priceUnit}}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          class="save-btn"
          :loading="saveLoding"
          v-if="dialogInfo.btnSave&&!dialogInfo.notEdit"
          @click="save('form','11')"
        >保存</el-button>
        <el-button
          class="submit-btn"
          :loading="saveLoding"
          v-if="dialogInfo.btnSubmit&&!dialogInfo.notEdit"
          @click="save('form','3')"
        >提交</el-button>

        <el-button class="cancel-btn" @click="closeDialogVisible()">关 闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getPageList,
  insertOrUpdateBenchmark,
  onlyPeriod,
  getDetailList,
  updateData,
  selectBenchmarkByOrgIdAndIssue
} from "@common/api/business/transactionQuery/dcSigningSituation/index";
import { validateNumberPositive, validatorNumber } from "@common/utils/validate";
import { getSelectList } from "@common/api/base";
import { parseTime } from "@common/utils/index";
import { mapGetters } from "vuex";
//单位引用
import { getUnitMap } from "@common/utils/index"; 
import { initLayout } from "@common/utils/init";
//引用精确计算js
import { create, all } from 'mathjs'
const math = create(all)
export default {
  name: "enchmarkPriceManagement",
  data() {
    return {
      saveLoding: false,
      isDisabled: false,
      provinceOptions: [],
      form: {
        contractVolume: "", //签约量
        signingOptions: []
      },
      listQuery: {
        page: 1,
        limit: 10,
        issue: "" //日期
      },
      //表单验证
      periodFrom: {
        issue: null
      },
      unitMap: {}, //单位
      benchmarkingPrice: "10",
      status: "",
      rules: {},
      listLoading: false,
      tableKey: 0,
      list: [],
      tabHeight: "",
      initData: [], //初始化数据
      total: null,
      dialogInfo: {},
      benchmarkPrice:"", //标杆电价
      dialogPeriod: false, //新增选择期次窗口状态
      determineLoading: true, //确定按钮加载状态
      dialogVisible: false,
      marketSigningSituationManager_btn_check: false,
      marketSigningSituationManager_btn_edit: false,
      marketSigningSituationManager_btn_add: false,
      marketSigningSituationManager_btn_update: false,
      signingOptions: [], //集团行业类型
      schemeInfo: {}
    };
  },
  created() {
    this.init();
    this.getList();
    this.marketSigningSituationManager_btn_edit = this.elements[
      "marketSigningSituationManager:btn_edit"
    ];
    this.marketSigningSituationManager_btn_check = this.elements[
      "marketSigningSituationManager:btn_check"
    ];
    this.marketSigningSituationManager_btn_add = this.elements[
      "marketSigningSituationManager:btn_add"
    ];
    this.marketSigningSituationManager_btn_update = this.elements[
      "marketSigningSituationManager:btn_update"
    ];
    //2019-12-16 #2820  zhangp 单位转换
    this.unitMap = getUnitMap(this.allSubMenus, this.unitMap); 

  },
  computed: {
    ...mapGetters(["elements", "orgId","allSubMenus"])
  },
  methods: {
    init() {
      this.initIssue();
      this.setLayoutHeight();
      this.getSelect();
    },
    //初始化页面期次信息 //20191223 阿彪 #3277 报表期次统一调整
    initIssue() {
      let nowTime = new Date();
      let d=nowTime.getDate();
      let ym='';
      if (d > 5) {
        nowTime.setMonth(nowTime.getMonth()-1);
        ym=nowTime.getFullYear()+'-'+(nowTime.getMonth()+1);
      } else {
        nowTime.setMonth(nowTime.getMonth()-2);
        ym=nowTime.getFullYear()+'-'+(nowTime.getMonth()+1);
      }
      this.listQuery.issue = ym;
    },
    getSelect() {
      //集团行业类型
      getSelectList("Group_industry").then(res => {
        //2019-12-5 #2820 张朋 添加头数据
        res.unshift(
          {propName:"合计",propCode:"total"}
        )        
        res.forEach((item, index) => {
          if (item.propCode != "jthyfl05") {
            this.signingOptions.push({
              groupIndustry: item.propCode,
              groupIndustryName: item.propName,
              valState: "",
              conVolume: "",
              elePrice: "",
              decline: ""
            });
          }
        });
       //  this.initData = this.signingOptions;
         this.initData = Object.assign([],this.signingOptions)
         //this.initData =  JSON.parse(JSON.stringify(this.signingOptions))
      });
  
    },
    // closeData(){
    //   this.signingOptions.forEach(res=>{
           
    //   })
    // },
    //设置提交返回信息
    setRequestInfo(res) {
      this.saveLoading = false;
      if (res.rel) {
        this.dialogVisible = false;
        this.$notify({
          title: res.msg,
          message: res.msg,
          type: "success",
          duration: 2000
        });
        // this.$emit("initList");
        this.getList();
      } else {
        this.$notify({
          title: res.msg,
          message: res.msg,
          type: "warning",
          duration: 2000
        });
        this.saveLoding = false;
      }
    },
    //修改信息
    operation(parame) {
      this.dialogVisible = false;
      if (this.status == "") {
        insertOrUpdateBenchmark(parame)
          .then(res => {
            this.setRequestInfo(res);
          })
          .catch(function(error) {
            console.log("发生错误！", error);
          });
      } else if (this.status == "11" || this.status == "3") {
        updateData(parame)
          .then(res => {
            this.setRequestInfo(res);
          })
          .catch(function(error) {
            console.log("发生错误！", error);
          });
      }
    },
    //提交保存
    save(formName, state) {
      this.saveLoding = true;
      let parame = {};
      parame.status = state;
      parame.signingOptions = this.signingOptions;
      parame.issue = this.periodFrom.issue;
      parame.orgId = this.orgId;
      this.operation(parame);
    },
    /**
     * @功能描述: 新增
     * @参数: 
     * @返回值: 
     * @作者: 张朋
     * @Date: 2019-12-03 01:27:42
     * @最新修改内容: 
     * @LastEditTime: 
     */
    handleCreate() {   
      // this.signingOptions = this.initData;
        //   this.signingOptions = Object.assign([],this.initData)  
      this.periodFrom.issue = "";
      this.dialogPeriod = true;
      this.determineLoading = false;        },
    
    //添加期次按钮
    addPeriod(form) {
      this.saveLoding = false;
      if (
        this.periodFrom.issue == "" ||
        this.periodFrom.issue == null ||
        typeof this.periodFrom.issue == undefined
      ) {
        this.$notify({
          title: "提示",
          message: "期次信息不能为空",
          type: "warning",
          duration: 2000
        });
      } else {
        //重新清空数组内多余数据
        this.resetEmpty();
        //验证期次唯一性
        let parame = {
          issue: this.periodFrom.issue,
          orgId: this.orgId
        };
        //获取标杆电价
        selectBenchmarkByOrgIdAndIssue(parame).then(res=>{
              this.benchmarkPrice  = res;  
        })
        onlyPeriod(parame).then(res => {
          if (res.data) {
            this.dialogPeriod = false;
            this.dialogInfo = {
              btnSave: true,
              btnSubmit: true,
              status: "add",
              title: "市场签约情况新增"
            };
            //新增时期次清空
            this.status = "";
            this.dialogVisible = true;
            this.isDisabled = false;
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
    },
    /**
     * @功能描述: 编辑、修改、查看按钮触发方法
     * @参数:
     * @返回值:
     * @作者: 张朋
     * @Date: 2019-11-28 22:10:04
     * @最新修改内容:
     * @LastEditTime:
     */
    handleCheck(row, type) {      
      this.saveLoding = false;
      this.status = row.status;
      //时间转换
      this.periodFrom.issue = parseTime(row.issue, "{y}-{m}");
      //初始化数据
      // this.signingOptions = this.initData;    
      // this.signingOptions = Object.assign([],this.initData)  
      let parame = {
        issue: this.periodFrom.issue,
        orgId: this.orgId
      };
       //获取标杆电价
      selectBenchmarkByOrgIdAndIssue(parame).then(res=>{
             this.benchmarkPrice  = res;  
      })
      //获取电厂签约详情信息
      getDetailList(parame).then(res => {
        this.signingOptions = res.data;
      });
      if (type == "update") {
        this.dialogInfo = {
          btnSave: true,
          btnSubmit: true,
          status: "update",
          title: "市场签约情况编辑"
        };
        this.dialogVisible = true;
        this.isDisabled = false;
      } else if (type == "modify") {
        this.$confirm("此条信息包含已上报系统的重要数据，请谨慎修改", "提示", {
          confirmButtonText: "确认修改",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.dialogInfo = {
            btnSave: false,
            btnSubmit: true,
            status: "update",
            title: "市场签约情况修改"
          };
          this.dialogVisible = true;
          this.isDisabled = false;
        });
      } else {
        this.dialogInfo = {
          btnSave: false,
          btnSubmit: false,
          status: "view",
          title: "市场签约情况查看"
        };

        this.dialogVisible = true;
        this.isDisabled = true;
      }
    },

     /**
     * @功能描述: 签约量合计计算
     * @参数: 
     * @返回值: 
     * @作者: 张朋
     * @工单号:#2820
     * @Date: 2019-12-05 21:59:01
     * @最新修改内容: 
     * @LastEditTime: 
     */
    conVolumeChange(){      
        let conVolume = 0;
        let elePrice = 0;
        let decline = 0;
        this.signingOptions.forEach((item,index)=>{
             if(index > 0){
                 conVolume = conVolume + Number(item.conVolume)
                 if(item.conVolume != ""){
                    elePrice =  elePrice + Number(item.conVolume) * Number(item.elePrice)
                 }
                 if(item.decline != ""){
                     decline =  decline + Number(item.conVolume) * Number(item.decline)
                 }
             }
        })
        this.signingOptions[0].conVolume = conVolume;
        //this.signingOptions[0].elePrice = elePrice/this.signingOptions[0].conVolume
        this.signingOptions[0].elePrice = math.abs(math.format(math.chain(math.bignumber(elePrice)).divide(math.bignumber(this.signingOptions[0].conVolume)).done()));
        //this.signingOptions[0].decline = decline/this.signingOptions[0].conVolume;
        this.signingOptions[0].decline = math.abs(math.format(math.chain(math.bignumber(decline)).divide(math.bignumber(this.signingOptions[0].conVolume)).done()));

    },
    /**
     * @功能描述: 电价合计计算
     * @参数: 
     * @返回值: 
     * @作者: 张朋
     * @工单号:#2820
     * @Date: 2019-12-05 21:59:01
     * @最新修改内容: 
     * @LastEditTime: 
     */
    elePriceChange(){
         let elePrice = 0;
         this.signingOptions.forEach((item,index)=>{
             if(index > 0){
                elePrice =  elePrice + Number(item.conVolume) * Number(item.elePrice)
             }
        })
        
        //this.signingOptions[0].elePrice = elePrice/this.signingOptions[0].conVolume;
         //2019-12-16 #2820 zhangp  获取降幅合计精确计算
        if(elePrice == 0 ){
          this.signingOptions[0].decline = "";
        }else{
           this.signingOptions[0].elePrice = math.abs(math.format(math.chain(math.bignumber(elePrice)).divide(math.bignumber(this.signingOptions[0].conVolume)).done()));
        }
    },
    /**
     * @功能描述: 降幅合计计算
     * @参数: 
     * @返回值: 
     * @工单号:#2820
     * @Date: 2019-12-05 21:59:01
     * @最新修改内容: 
     * @LastEditTime: 
     */
    declineChange(){
       let decline = 0;
         this.signingOptions.forEach((item,index)=>{
             if(index > 0){
                decline =  decline + Number(item.conVolume) * Number(item.decline)
             }
        })
        //2019-12-16 #2820 zhangp  获取降幅合计精确计算
        if(decline == 0 ){
          this.signingOptions[0].decline = "";
        }else{           
           this.signingOptions[0].decline = math.abs(math.format(math.chain(math.bignumber(decline)).divide(math.bignumber(this.signingOptions[0].conVolume)).done()));
        }
    },
    //查询
    handleFilter() {
      this.listQuery.page = 1;
      this.getList();
    },
    getList() {
      this.listLoading = true;
      let params = {};
      params.page = this.listQuery.page;
      params.limit = this.listQuery.limit;
      params.orgId = this.orgId;
      if (this.listQuery.issue != "") {
        params.issue = this.listQuery.issue;
      }
      getPageList(params).then(response => {
        let items = response.data.rows.map((item, index) => {
          item.index =
            index + 1 + (this.listQuery.page - 1) * this.listQuery.limit;
          return item;
        });
        this.list = items;
        this.list = response.data.rows;
        this.total = response.data.total;
        this.listLoading = false;
      });
    },
    //对数据遗留问题进行处理
    resetEmpty(){
      if (this.$refs.form !== undefined) {
            this.$refs.form.resetFields();
        }
        this.signingOptions.forEach(item=>{
          item.decline="";
          item.conVolume="";
          item.elePrice="";
          item.issue = "";
          item.signingId = ""
        })        
    },
    //关闭期次回话
    closeDialog() {
      this.resetEmpty();
      this.dialogPeriod = false;
    },
    //关闭详情回话
     closeDialogVisible(){
       this.dialogVisible = false;
    },
    setLayoutHeight() {
      this.tabHeight = initLayout() - 210;
    },
    handleSizeChange(val) {
      this.listQuery.limit = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getList();
    }
  }
};
</script>

<style scoped>
.headerFont {
  margin-left: 50px;
  font-weight: 500;
}
</style>