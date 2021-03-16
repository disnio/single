<!--
 * @功能描述: #3262 交易管理 - 交易结果-发电 - 新增导入功能
 * @版本: 
 * @作者: qinhz
 * @Date: 2019-12-29 16:44:11
 * @最新修改内容: 
 * @LastEditTime: 2020-08-25 14:28:02
 -->
<template>
  <div class="app-container calendar-list-container">
    <!-- 交易结果发电状态弹窗 -->
    <el-dialog v-drag :close-on-click-modal="false"
      width="90%"
      title="导入交易结果发电数据"
      :visible.sync="dialogImport"
      :modal-append-to-body="false"
      :append-to-body="true"
    >
      <div style="padding-right:10px;">
        <el-tabs v-model="activeName" type="border-card" @tab-click="handleTabsClick">
          <el-tab-pane label="待入库数据" name="dataSuccess">
            <important-table
              data-type="success"
              :mainContractForm="contractForm"
              :resultId="this.resultId"
              :tradingVariety="this.tradingVariety"
              :tradingWay="this.tradingWay"
              :isShow="this.isShow"
              :mounthList="this.mounthList"
              v-on:initList="initIndexList"
              v-on:setImportState="setImportState"
              ref="importantTableSuccess"
            ></important-table>
          </el-tab-pane>
          <el-tab-pane label="异常数据" name="dataErr">
            <important-table
              data-type="err"
              :mainContractForm="contractForm"
              :tradingVariety="this.tradingVariety"
              :tradingWay="this.tradingWay"
              :isShow="this.isShow"
              :mounthList="this.mounthList"
              :resultId="this.resultId"
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
import {getInfo} from '@common/api/login';
import { getToken } from "@common/utils/auth";
export default {
  name: "ImportantDialog",
  components: {
    ImportantTable: () => import("./ImportantTable")
  },
  props: {
    secondPartCompensateWay: {
      type: String
    },
    resultId: {
      type: String
    },
    tradingVariety: {
      type: String
    },
    tradingWay: {
      type: String
    },
    mounthList: {
      type: Array
    },
    isShow: {
      type: Boolean
    },
    
  },
  data() {
    return {
      templatePowerList: [],
      declarationType:"",
      importList: [],
      importTotal: 0,
      importTableKey: 1,
      importTabList: [],
      importTableHeight: 0,
      importLoading: false,
      importListQuery: {
        page: 1,
        limit: 20
      },
      contractForm: {},
      dialogImport: false,
      // num: 0,
      activeName: "dataSuccess"
    };
  },
  watch: {
    checkedAdd(val) {
      this.isAdd = val;
    }
  },
  created() {
  },
  computed: {
    ...mapGetters(["elements"])
  },
  methods: {
    //切换tabs
    handleTabsClick(tab, event) {
      if (this.activeName == "dataSuccess") {
        // this.num++
        this.$refs.importantTableSuccess.initList("1","",this.resultId,this.declarationType);
      } else {
        // this.num++
        this.$refs.importantTableErr.initList("0", true, this.resultId,this.declarationType);
      }
    },
    //初始化导入窗口 
    initImportData() {
      this.isImport = false;
      this.activeName = "dataSuccess";
      this.dialogImport = true;
      setTimeout(() => {
        this.$refs.importantTableSuccess.initList("1", "",this.resultId);        
      }, 500);
    },
    cancelImport() {
      // this.num = 0;
      // this.dialogImport = false;
      this.checkImported();
      this.$refs.importantTableSuccess.removeList();
    },
    // beforeClose() {
    //   this.checkImported();
    // },
    checkImported() {
      // this.num = 0;
      this.importList = this.$refs.importantTableSuccess.importTabList;

      if (!this.isImport && this.importList.length > 0) {
        if (this.importList[0].isverify == "1") {
          this.dialogImport = false;
          this.$refs.importantTableSuccess.removeList();
          // this.$emit("downinfo1");

        } else {
          this.$confirm("已解析的正确数据是否入库?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              this.dialogImport = false;
              this.$refs.importantTableSuccess.createImport("1");
              this.$refs.importantTableSuccess.removeList();
            })
            .catch(() => {
              this.dialogImport = false;
              this.$refs.importantTableSuccess.removeList();
            //  this.$emit("downinfo1");
            });
        }
      } else {
        this.dialogImport = false;
        this.$refs.importantTableSuccess.removeList();
        // this.$emit("downinfo1");

      }
    },
    initIndexList() {
      this.$emit("initList");
    },
    setImportState(type){     
      if(type==="0"){       
        this.isImport=true;
        this.dialogImport = false;
        this.$emit("initList"); 
      }else{
        this.dialogImport = false;
        this.$emit("initList");
      }
    },
  }
};
</script>
