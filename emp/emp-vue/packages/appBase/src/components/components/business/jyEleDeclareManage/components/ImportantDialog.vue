<template>
  <div class="app-container calendar-list-container">
    <!-- 客户签约状态弹窗 -->
    <el-dialog v-drag :close-on-click-modal="false"
      width="90%"
      title="导入申报电量数据"
      :visible.sync="dialogImport"
      :modal-append-to-body="false"
      :before-close="beforeClose"
    >
      <div style="padding-right:10px;">
        <el-tabs v-model="activeName" type="border-card" @tab-click="handleTabsClick">
          <el-tab-pane label="待入库数据" name="dataSuccess">
            <important-table
              data-type="success"
              :mainContractForm="contractForm"
              :declarationId="this.declarationId"
              v-on:initList="initIndexList"
              ref="importantTableSuccess"
            ></important-table>
          </el-tab-pane>
          <el-tab-pane label="异常数据" name="dataErr">
            <important-table
              data-type="err"
              :mainContractForm="contractForm"
               :declarationId="this.declarationId"
              v-on:initList="initIndexList"
              ref="importantTableErr"
            ></important-table>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button class="cancel-btn" @click="cancelImport">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template> 
<script>
import { importContract } from "@common/api/contractManage/contractLedger/index";
import { mapGetters } from "vuex";
import { parseTime, reverse, isNumber, excelDateToJSDate } from "@common/utils/index";
export default {
  name: "ImportantDialog",
  components: {
    ImportantTable: () => import("./ImportantTable")
  },
  props: {
    secondPartCompensateWay: {
      type: String
    },
    
  },
  data() {
    return {
      isDlsbGD: false, // 申报电量是否广东模式
      templatePowerList: [],
      //20191125 #2767 wangc  有无户表号状态
      declarationType:"",
      isYearBilateElectric: false, //显示年度双边电量
      isYearLongtermElectric: false, //显示年度双边电量
      isMonthBidElectric: false, //显示月度竞价电量
      isFixDeprice: false, //显示固定降价/保底电价
      isCustomerProportion: false, //显示甲方分成比例
      isBottomElectricPrice: false, //显示保底降价/电价
      isFixDeprice2: false, //长协电量+竞价降价/电价
      isKwhCost: false, //度电费用
      importList: [],
      importTotal: 0,
      importTableKey: 1,
      declarationId:"",
            importTabList: [],
      importTableHeight: 0,
      importLoading: false,
      importListQuery: {
        page: 1,
        limit: 20
      },
      contractForm: {},
      dialogImport: false,
      activeName: "dataSuccess"
    };
  },
  watch: {
    checkedAdd(val) {
      this.isAdd = val;
    }
  },
  created() {},
  computed: {
    ...mapGetters(["elements"])
  },
  methods: {
    //切换tabs
    handleTabsClick(tab, event) {
      if (this.activeName == "dataSuccess") {
        //20191125 #2767 wangc  传入有无户表号状态
        this.$refs.importantTableSuccess.initList("1","", this.declarationId,this.isDlsbGD,this.declarationType);
      } else {
        //20191125 #2767 wangc  传入有无户表号状态
        this.$refs.importantTableErr.initList("0", true, this.declarationId,this.isDlsbGD,this.declarationType);
      }
    },
    //初始化导入窗口 
    initImportData(declarationId,isDlsbGD,declarationType) {
      //20191125 #2767 wangc  传入有无户表号状态
      this.declarationType = declarationType;
      this.declarationId = declarationId;
      this.isDlsbGD = isDlsbGD;
      this.isImport = false;
      this.activeName = "dataSuccess";
      // for(let key in this.contractForm){
      //    this.contractForm[key]=typeof importInfo[key]!="undefined"?importInfo[key]:"";
      // }

      this.dialogImport = true;
      setTimeout(() => {
        //20191125 #2767 wangc  传入有无户表号状态
        this.$refs.importantTableSuccess.initList("1", "",this.declarationId,this.isDlsbGD,declarationType);
      }, 500)
      // if (typeof this.$refs.importantTableSuccess != "undefined") {
      //   this.$refs.importantTableSuccess.initList("1", "",this.declarationId,this.isDlsbGD);
      // }
    },
    cancelImport() {
      this.checkImported();
    },
    beforeClose() {
      this.checkImported();
    },
    checkImported() {
      this.importList = this.$refs.importantTableSuccess.importTabList;

      if (!this.isImport && this.importList.length > 0) {
        if (this.importList[0].isverify == "1") {
          this.dialogImport = false;
                       this.$emit("downinfo1");

        } else {
          this.$confirm("已解析的正确数据是否入库?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              this.$refs.importantTableSuccess.createImport("1");
            })
            .catch(() => {
              this.dialogImport = false;
             this.$emit("downinfo1");
            });
        }
      } else {
        this.dialogImport = false;
                     this.$emit("downinfo1");

      }
    },
    initIndexList() {
      this.$emit("initList");
    }
  }
};
</script>
