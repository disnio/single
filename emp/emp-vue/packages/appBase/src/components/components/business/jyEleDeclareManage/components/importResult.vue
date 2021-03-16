<template>
  <div>
    <el-dialog
      title="申报电量数据"
      :visible.sync="dialogFormVisible"
      custom-class="w1200"
      :close-on-click-modal="false"
      @close="closedialog"
      @open="opendialog"
      v-drag
    >
      <!----------------- TABS 选项卡 ----------  start   --------->
      <el-tabs class="allotTabs" v-model="activeName" type="border-card" @tab-click="handleClick">
        <template v-for="(item, index) in tabsData">
          <el-tab-pane :label="item.tabsLabel" :name="item.tabsName" :key="index">
            <el-button-group class="f-mb10">
              <el-button
                v-if="activeName == 'waitData'"
                class="filter-item"
                type="primary"
                icon="el-icon-upload"
                @click="handleUpload"
              >确认入库</el-button>
              <el-button v-else type="primary" icon="el-icon-upload" @click="handleExport">导出数据</el-button>
              
            </el-button-group>
            <div class="txt-right" style="margin-top: -20px; text-align:right">单位：{{unitMap["electricityUnit"]}}</div>

            <div v-loading="ctableLoading">
              <table-pagination
                :maxHeight="maxheight"
                :columns="columns"
                :tableData="tableData"
                :showBtn="false"
                :total="total"
                :currentPage="formInline.page"
                :curPageSize="formInline.limit"
                @fetchData="fetchData"
              />
            </div>
          </el-tab-pane>
        </template>
      </el-tabs>
      <!----------------- TABS 选项卡 ----------  end   ----------->
      <div slot="footer" class="dialog-footer">
        <el-button class="cancel-btn" @click="closeBtn('ruleForm')">关 闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getToken } from "@common/utils/auth";
import { mapGetters } from "vuex";
import {
  getExceptpage, exportDataErrData, importjyEleDeclareManage
} from "@common/api/business/jyEleDeclareManage/index";
import {
  parseTime,
  reverse,
  isNumber,
  excelDateToJSDate,
  getUnitMap
} from "@common/utils/index";
import mixin1 from "../mixins/importResolutionMixins";
import mixin2 from "../mixins/errorImportMixins";
export default {
  name: "importResult",
  components: {
    tablePagination: () => import("@common/components/spot/components/cTablePagination")
  },
  mixins: [mixin1, mixin2],
  props: {
    linedata: {
      type: Object,
      default: {}
    },
    agoAgoMonth: {
      type: String,
      default: ""
    },
    agoMonth: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      // import dialog 参数
      dialogFormVisible: false,
      ctableLoading: false,
      formInline: {
        page: 1,
        limit: 10,
        fileType: "jyEleDeclareManage",
        declarationId: "",
        iscorrect: 1
      },
      total: 0,
      unitMap: {},
      columns: [],
      handleClickSaveLoad: false, //保存loading
      tableData: [],
      maxheight: "350",
      activeName: "waitData",
      tabsData: [
        { tabsLabel: "待入库数据", tabsName: "waitData" },
        { tabsLabel: "异常数据", tabsName: "abnormalData" }
      ],
      fileId: ""
    };
  },
  watch: {},
  created() {
    this.unitMap = getUnitMap(this.allSubMenus, this.unitMap);
  },
  computed: {
    ...mapGetters(["elements", "allSubMenus"])
  },
  methods: {
    init() {
      this.dialogFormVisible = true;
    },
    // 开启弹窗
    opendialog() {
      
      this.setNewColumn(this.agoAgoMonth, this.agoMonth)
      this.formInline.declarationId = this.linedata.declarationId
      this.fetchData();
    },
    // table组件配套查找方法
    fetchData(pageInfo) {
      if (pageInfo && pageInfo.page) {
        this.formInline.page = pageInfo.page;
        this.formInline.limit = pageInfo.curPageSize;
      }
      if (this.activeName == "waitData") {
        this.formInline.iscorrect = 1;
      } else {
        this.formInline.iscorrect = 0;
      }
      let param = this.formInline;
      //开启查询loading
      //this.searchLoading = true;
      this.ctableLoading = true;
      getExceptpage(param).then(res => {
        // 关闭查询loading
        //this.searchLoading = false;
        // 渲染结束 关闭table loading
        this.ctableLoading = false;
        if (res.rel) {
          let items = res.data.rows;
          items.forEach((item, index) => {
            item.index =
              index + 1 + (this.formInline.page - 1) * this.formInline.limit;
              if(item.declarationDate){
                item.declarationDate = item.declarationDate.slice(0,10)  
              }          
          });
          this.tableData = items;
          this.total = res.data.total;
        } else {
          this.$notify({
            title: "提示",
            message: res.message,
            type: "warning",
            duration: 2000
          });
        }
      });
    },
    //保存
    async handleClickSave() {
      this.$refs.uploadFileAdd.submit();
    },
    // dialog 关闭
    closedialog() {
      this.dialogFormVisible = false;
      this.handleClickSaveLoad = false;
      this.activeName = "waitData";
      this.formInline.iscorrect = 1;
    },
    // 关闭按钮
    closeBtn() {
      this.dialogFormVisible = false;
    },
    handleClick() {
      if (this.activeName == "waitData") {
        this.columns = this.column;
      } else {
        this.columns = this.errorcolumns;
      }
      this.fetchData();
    },
    async handleUpload() {
      let param = {};
      param.type = "jyEleDeclareManage";
      param.declarationId = this.formInline.declarationId
      let res = await importjyEleDeclareManage(param);
      this.dialogFormVisible = false
      if (res.rel) {
        this.$notify({
          title: "提示",
          message: res.msg,
          type: "success",
          duration: 2000
        });
        this.$parent.searchList()
      } else {
        this.$notify({
          title: "提示",
          message: res.msg,
          type: "warning",
          duration: 2000
        });
      }
    },
    handleExport() {
      exportDataErrData("jyEleDeclareManage", this.formInline.declarationId,"customerPage");
    }
  }
};
</script>

<style>
</style>