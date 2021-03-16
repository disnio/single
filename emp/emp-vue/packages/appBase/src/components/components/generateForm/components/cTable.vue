<!--
 * @Author: fengzp
 * @Date: 2021-01-29 16:12:52
 * @LastEditors: fengzp
 * @LastEditTime: 2021-02-01 14:37:46
 * @Introduce: Do not edit
-->
<template>
  <div>
    <div class="cftable_container">
      <el-table
        ref="multipleTable"
        :data="tableData"
        :selectDefault="selectDefault"
        :cell-style="finalCellStyle"
        :span-method="objectSpanMethod"
        border
        style="width: 100%"
        :stripe="stripe"
        @selection-change="handleSelectionChange"
        :row-class-name="itableRowClassName"
        :height="tabHeight"
        key="1"
      >
        <template v-for="(item, index) in columns">
          <el-table-column
            v-if="item.type && item.type === 'selection'"
            :key="index"
            :prop="item.prop"
            :label="item.label"
            :align="item.align"
            :width="item.width"
            :type="item.type"
            :selectable="selectable"
          >
          </el-table-column>

          <el-table-column
            v-else-if="item.type && item.type === 'index'"
            :key="index"
            :label="item.label"
            :align="item.align"
            :width="item.width"
            :index="indexMethod"
            :fixed="item.fixed"
          >
          </el-table-column>

          <el-table-column
            v-else-if="item.type && item.type === 'input'"
            :key="index"
            :prop="item.prop"
            :label="item.label"
            :align="item.align"
            :width="item.width"
            :fixed="item.fixed"
          >
            <template slot-scope="scope">
              <el-input
                v-if="status != 'view'"
                :disabled="endState"
                onmousewheel="return false;"
                type="number"
                v-model="scope.row[scope.column.property]"
                @input="
                  changeInput(
                    $event,
                    scope.$index,
                    scope.row,
                    scope.row[scope.column.property]
                  )
                "
              >
              </el-input>
              <span v-else>
                {{scope.row[scope.column.property]}}
              </span>
            </template>
          </el-table-column>

          <el-table-column
            v-else-if="item.type && item.type === 'batch'"
            :key="index"
            :prop="item.prop"
            :label="item.label"
            :align="item.align"
            :width="item.width"
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                class="btn-link"
                :disabled="endState"
                @click="uploadFile(scope.row, scope.$index)"
                v-if="scope.$index > 0"
              >
                上传附件
              </el-button>
            </template>
          </el-table-column>

          <el-table-column
            v-else
            :key="index"
            :prop="item.prop"
            :label="item.label"
            :align="item.align"
            :width="item.width"
            show-overflow-tooltip
            :fixed="item.fixed"
            :min-width="item.minWidth"
            header-align="center"
          >
            <template v-for="(items, indexs) in item.children">
              <el-table-column
                :prop="items.prop"
                :label="items.label"
                :align="items.align"
                :width="items.width"
                :fixed="items.fixed"
                :key="indexs"
                v-if="item.children"
              >
                <template v-for="(item3, index3) in items.children">
                  <el-table-column
                    :prop="item3.prop"
                    :label="item3.label"
                    :align="item3.align"
                    :width="item3.width"
                    :key="index3"
                    v-if="items.children"
                  >
                    <template v-for="(item4, index4) in item3.children">
                      <el-table-column
                        :prop="item4.prop"
                        :label="item4.label"
                        :align="item4.align"
                        :width="item4.width"
                        show-overflow-tooltip
                        :key="index4"
                        v-if="item3.children"
                      >
                      </el-table-column>
                    </template>
                  </el-table-column>
                </template>
              </el-table-column>
            </template>
          </el-table-column>
        </template>

        <el-table-column
          v-if="showBtn"
          label="操作"
          align="center"
          :width="btnHeaderWidth"
        >
          <template slot-scope="scope">
            <div>
              <template v-for="(item, index) in cfbtns(scope.row)">
                <el-button
                  v-if="item.label"
                  :type="item.type"
                  size="small"
                  :key="index"
                  @click.native.prevent="
                    handleAction(item.action, scope.row, scope.$index)
                  "
                >
                  {{ item.label }}
                </el-button>

                <div
                  v-else
                  class="iconStyle"
                  :title="item.title ? item.title : ''"
                  :key="index"
                  @click="handleAction(item.action, scope.row, scope.$index)"
                >
                  <i :class="[item.class ? item.class : '']"></i>
                </div>
              </template>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-row
      v-if="showPage"
      class="cfpagination_container"
      style="text-align: right; margin-top: 12px"
    >
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="curPageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-row>

    <!-- 上传附件弹框 -->
    <el-dialog
      v-drag
      :close-on-click-modal="false"
      custom-class="w480"
      title="上传附件"
      :visible.sync="fileVisable"
      v-if="fileVisable"
      append-to-body
      @before-close="close"
      :lock-scroll="true"
      @close="close"
    >
      <div
        :style="{ height: dialogHeight - 100 + 'px' }"
        class="app-container calendar-list-container"
      >
        <el-scrollbar>
          <file-upload
            @on-setInfo="getInfo"
            @on-del="delFile"
            ref="fileInfos"
            :limitNumber="1"
            :uplaodHeaders="uplaodHeaders"
            :myFileList="myFileListFile"
            :key="yyzzFile"
            :fileText="fileTexts"
            :batchParent="batch"
            :isDis="fileBtn"
          ></file-upload>
        </el-scrollbar>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button class="ok-btn" @click="close()">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { initDialogHeight } from "@common/utils/index";
import {
  getPageList,
  exportDetail,
  del,
  loaded,
  deleteById,
} from "@common/api/fileUpload/index.js";
import { inputChange } from "@puzzles/customer_ui/api/customer/demandDeclaration/otherReport/index";
import { getFileByBatch } from "@common/api/fileUpload/index.js";

import { getToken } from "@common/utils/auth";

export default {
  name: "tableList",
  components: {
    fileUpload: () => import("@common/components/fileUpload"),
  },
  props: {
    /* Table 相关 */
    tableData: {
      type: Array,
      default: () => [],
    },
    columns: {
      type: Array,
      default: () => [],
    },
    tabHeight: {
      type: String,
    },
    cfbtns: {
      type: [Array, Function],
      default: () => [],
    },
    // select 默认选中的项 的index 数组
    selectDefault: {
      type: Array,
      default: () => [],
    },
    // 合并单元格的 method
    objectSpanMethod: {
      type: Function,
      default: function () {},
    },
    // 动态修改具体单元格style的 method
    finalCellStyle: {
      type: Function,
      default: function () {},
    },
    //指定 Table 组件的 row-class-name 属性来为 Table 中的某一行添加 class，表明该行处于某种状态
    itableRowClassName: {
      type: Function,
      default: function () {},
    },
    stripe: {
      type: Boolean,
      default: true,
    },
    showBtn: {
      type: Boolean,
      default: true,
    },
    showIndex: {
      type: Boolean,
      default: true,
    },
    btnHeaderWidth: {
      type: String,
      default: "150",
    },

    /* Pagination 相关 */
    showPage: {
      type: Boolean,
      default: true,
    },
    total: {
      type: Number,
      default: 0,
    },
    curPageSize: {
      type: Number,
      default: 10,
    },
    currentPage: {
      type: Number,
      default: 1,
    },
    statusInput: {
      type: String,
      default: "canInput",
    },
    status: {
      type: String,
    },
  },
  data() {
    return {
      /* currentPage1:this.currentPage,
       this.$refs.configurationTable.$el.style.width = '99.99%'
        curPageSize1:this.curPageSize*/
      myFileList: [],
      fileTexts: "附件上传",
      batch: "",
      accept: ".doc,.docx,.pdf,.txt", // 上传类型
      limit_number: 1, // 最大允许的上传个数
      uplaodHeaders: {}, // 上传的请求头
      fileVisable: false,
      show_file_name: false, // 是否显示上传列表
      fileData: { batch: "" },
      rowUpload: {},
      myFileListFile: [],
      fileBtn: false,
    };
  },
  watch: {
    tableData: {
      handler(val, oldVal) {
        this.$nextTick(() => {
          this.$refs.multipleTable.doLayout();
          // this.$refs.multipleTable.$el.style.width = '98%'
        });
      },
      immediate: true,
      deep: true,
    },
    total: {
      handler(val, oldVal) {
        this.total = val;
      },
      immediate: true,
      deep: true,
    },
  },
  mounted() {
    const that = this;
    this.dialogHeight = initDialogHeight();
    window.onresize = function temp() {
      that.dialogHeight = initDialogHeight();
    };
  },
  created() {
    this.uplaodHeaders = {
      Authorization: getToken(),
    };
  },
  methods: {
    /* Table 相关 */
    indexMethod(index) {
      return index * 1;
    },
    handleSelectionChange(val) {
      this.$emit("handleSelectionChange", val);
    },
    handleAction(type, data, $index) {
      data.$cf_Index = $index;
      this.$emit(type, data);
    },

    /* Pagination 相关*/
    handleSizeChange(val) {
      this.$emit("fetchData", { page: this.currentPage, curPageSize: val });
    },
    handleCurrentChange(val) {
      this.$emit("fetchData", { page: val, curPageSize: this.curPageSize });
    },
    selectable(row, index) {
      if (index === 0) {
        return false;
      } else {
        return true;
      }
    },
    checkInput(val) {
      if (
        val === "" ||
        val == null ||
        typeof val == undefined ||
        val == 0 ||
        Number.isNaN(val)
      ) {
        return "";
      } else {
        return Number(val);
      }
    },

    mathRound(num, max) {
      var result = parseFloat(num);
      var s_x = 0;
      if (Number.isNaN(result)|| num == "") {
        s_x = "";
      } else {
        result = Math.round(num * 1000000) / 1000000;
        var s_x = result.toString();
        var pos_decimal = s_x.indexOf(".");
        if (pos_decimal < 0) {
          pos_decimal = s_x.length;
          s_x += ".";
        }
        if (s_x.length > max) {
          s_x = parseFloat(s_x).toFixed(max);
        }
        s_x = parseFloat(s_x);
        // while (s_x.length <= pos_decimal + 2) {
        //   s_x += "0";
        // }
      }
      return s_x;
    },

    // 输入框变化时计算
    changeInput(e, index, data, colValue) {
      this.$emit("sendTable", this.tableData);
    },
    // 上传附件框
    uploadFile(row, index) {
      if (this.status == "view") {
        this.fileBtn = true;
      } else {
        if (row.status == "dlsb3") {
          this.fileBtn = true;
        } else {
          this.fileBtn = false;
        }
      }

      if (row.hasOwnProperty("enclosure")) {
        this.getFile(row.enclosure);
      }
      this.rowUpload = row;
      this.batchIndex = index;
      this.fileVisable = true;
    },
    close() {
      this.myFileListFile = [];
      this.fileVisable = false;
    },
    getInfo(val) {
      this.tableData[this.batchIndex].enclosure = val.res.data.batch;
      inputChange(this.rowUpload, this.rowUpload.id).then((res) => {
        if (res.rel) {
          this.$emit("line-change");
        }
      });
      this.fileVisable = false;
    },
    delFile(val) {
      this.myFileListFile = val;
      if (this.myFileListFile.length > 0) {
        this.fileHeight = this.myFileListFile.length * 40;
      } else {
        this.fileHeight = "25";
      }
    },

    // 根据批次号获取文件信息
    getFile(val) {
      if (val != "") {
        let param = {
          batch: val,
        };
        getFileByBatch(param).then((res) => {
          if (res.rel) {
            let fileArr = res.data;
            let myFileList2 = [];
            fileArr.forEach((item) => {
              myFileList2.push({
                id: item.id,
                name: item.filename,
                downloadURl: item.downloadURl,
              });
            });
            this.myFileListFile = myFileList2;
            if (this.myFileListFile.length > 0) {
              this.fileHeight = this.myFileListFile.length * 40;
            } else {
              this.fileHeight = "25";
            }
          }
        });
      }
    },
  },
};
</script>

<style scoped>
.iconStyle {
  cursor: pointer;
  width: 20px;
  height: 20px;
  display: inline-block;
  margin: 0 5px;
  font-size: 16px;
  color: cornflowerblue;
}
.textInfo {
  margin-top: 10px;
  font-size: 15px;
  /* display: flex;
  justify-content: space-between; */
}
</style>
