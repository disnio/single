<template>
  <sort-tr
    :ref="sref"
    v-bind:table="table"
    v-bind:columns="ctColumns"
    v-bind:data="dtTableData"
    v-bind:event="tableEvent"
  ></sort-tr>
</template>

<script>
import {
  getFileByBatch,
  getPageList,
  exportDetail,
  del,
  loaded,
  deleteById,
} from "@common/api/fileUpload/index.js";
import {sortTr} from "./sortTr";

export default {
  name: "sortTb",
  components: {
    "sort-tr": sortTr
  },
  props: {
    // 引用
    sref: {
      type: String,
      default: "sort_tb"
    },
    // 数据列
    columns: {
      type: Array,
      default: []
    },
    // 表格属性
    tableProp: {
      type: Object,
      default: {}
    },
    // 渲染的数据
    tableData: {
      type: Array,
      default: []
    },
    // 事件
    tableEvent: {
      type: Object,
      default: {}
    },
    // 表格内部需要调用的方法
    tableMethod: {
      type: Object,
      default: {}
    },
    // 最后一列的操作
    lastColOptions: {
      type: Array,
      default: []
    },
    // 排除的列字段
    colExclude: {
      type: Array,
      default: []
    },
    // 前端自定义的列顺序
    colOrder: {
      type: Array,
      default: []
    },

    // 自定义的列内部操作，输入、上传
    // {disabled, 是否禁用
    // type, 表单项的类型
    // renderTpl, 自定义渲染方法，里面要包含触发处理
    // prop, 要做input 的列属性
    // key:触发blur 比较的行内键 id
    // }
    // line-change: blur等后需要发送的事件
    /**
     * @参数 {type} argName - description
     * @参数 {type} argName - description
     * @返回值 {type} argName - description
     * @描述: 自定义的列内部操作，输入、上传
     */
    colAction: {
      type: Array,
      default: []
    },

    // 最后实现
    noRenderRow: {
      type: Array,
      default: []
    },
    // 上传的配置，附件
    upload: {
      type: Object,
      default: {
        accept: ".doc,.docx,.pdf,.txt,.xls,.xlsx",
        headers: {},
        limitNumber: 1,
        // 行数据上传文件的批次号
        prop: "enclosure",
        // 批量号的名字
        batch: "batch",
        // 用于确定行数据的关键字段
        key: "id",
        api: "/api/admin/fdfsfile/upload",
        multiple: true,
        disabled: false,
        // 删除
        deleteAction: deleteById,
        // 获取批次号
        getBatch: getFileByBatch,
        // 下载
        downloadAction: exportDetail

      }
    },
    // 不渲染的行 key, prop
    noRender: {
      type: Object,
    }

  },
  data() {
    return {
      // 第一列选择控制
      selTpl: {
        prop: 'selection',
        width: '55',
        fixed: true,
        align: "center",
        selectable: this.mtColSel
      },
      // 序号列
      indexTpl: {
        prop: 'index',
        label: "序号",
        width: '70',
        fixed: true,
        align: "center",
        index: this.mtColIndex.bind(this)
      },
      // 默认的表格属性
      table: {
        ref: "sr_table",
        // 高度需要自定义
        height: "290",
        border: true,
        "highlight-current-row": true,
        fit: true,
        defaultSort: {
          prop: 'index',
          order: 'ascending',
        },
        ...this.tableProp
      },

    }
  },
  computed: {
    dtTableData() {
      return [...this.tableData];
    },
    ctColumns() {
      let cols = [...this.columns];
      // 排除
      if (this.colExclude.length > 0 && this.columns.length > 0) {
        cols = _.filter(cols, (v) => {
          return !_.includes(this.colExclude, v.prop);
        })
      }
      // 列排序
      if (this.colOrder.length > 0 && cols.length > 0) {
        cols = this.mtColSort(this.colOrder, cols);
      }

      // 列操作 { prop:"input"|"upload"|"select", type:text|number }
      // {adjustElectricity: input, type: number}
      if (this.colAction.length > 0) {
        cols = _.map(cols, v => {
          let index = _.findIndex(this.colAction, {prop: v.prop})
          if (index !== -1) {
            switch (this.colAction[index].type) {
              case "upload":
                v.renderTpl = (h, scope, item) => {
                  return this.colAction[index].renderTpl ?
                    this.colAction[index].renderTpl : this.mtUpload(h, scope, item);
                }
                break;
              case "select":
                return ""
              default:
                v.renderTpl = (h, scope, item) => {
                  return this.colAction.renderTpl ?
                    this.colAction.renderTpl : this.mtColFormInput(h, scope, item, this.colAction);
                }
            }
          }
          return v;
        }) // end cols map
      }

      return [this.indexTpl, ...cols];
    }
  },
  methods: {

    // 不渲染的行条件
    noRenderRow(scope) {
      if (!_.isEmpty(this.noRender)) {
        return scope.row[this.noRender.prop] === this.noRender.key;
      }
    },
    // 列选择控制
    mtColSel(row, index) {
      if (_.has(this.tableMethod, "tbColSel")) {
        return this.tableMethod.tbColSel(row, index)
      } else {
        return true;
      }
    },
    // 列索引
    mtColIndex(index) {
      console.log("mtColIndex:", index);
      if (_.has(this.tableMethod, 'index')) {
        this.tableMethod.index(index);
      } else {
        return index;
      }
    },
    // 列排序
    mtColSort(sortArr, columns) {
      let cArr = columns.map(v => v.prop);
      let restArr = _.difference(cArr, sortArr);
      let arr = _.concat(sortArr, restArr);
      return _.map(arr, v => {
        return _.find(columns, {prop: v});
      })
    },

    // 渲染表格内部的输入框 id
    mtColFormInput(h, scope, item, colAct) {
      // 不渲染过滤放这里
      if (this.noRenderRow(scope)) return;
      const br = (e) => {
        this.mtInputBlur(e, scope.row, item, colAct)
      }

      const ch = (val) => {
        this.mtInputChange(val, scope.row, item, colAct)
      }

      let type = colAct.type ? colAct.type : "text";

      return (
        <el-input
          type={type}
          value={scope.row[item.prop]}
          vOn:blur={br}
          vOn:input={ch}
          disabled={colAct.disabled}
        >

        </el-input>
      )
    },
    // 输入更新
    mtInputChange(val, row, item, colAct) {
      let index = _.findIndex(this.dtTableData, (v) => {
        return v[colAct.key] === row[colAct.key];
      });
      if (index !== -1) {
        this.$set(this.dtTableData[index], item.prop, val);
      }
    },
    // 失去焦点发送更新的行数据，父组件监听 line-change 事件
    mtInputBlur(e, row, item, colAct) {
      let index = _.findIndex(this.dtTableData, (v) => {
        return v[colAct.key] === row[colAct.key];
      });
      this.$emit("line-change", this.dtTableData[index]);
    },

    // 上传组件渲染
    mtUpload(h, scope, item) {
      console.log("upload", scope, item)

      let bt = {batch: this.hasFiles(scope.row[item.prop]) ? scope.row[item.prop] : ""};
      let eventProps = {
        props: {
          "on-success": (res) => {
            this.uploadSuccess(res, scope)
          },
          "on-remove": (file, fileList) => this.uploadDelete(file, fileList, scope),
          "on-exceed": this.uploadExceed,
          "on-preview": (file) => this.uploadPreview(file, scope)
        }
      }
      return (
        <el-upload
          class="upload-demofzp"
          action={this.upload.api}
          accept={this.upload.accept}
          limit={this.upload.limitNumber}
          multiple={this.upload.multiple}

          headers={this.upload.headers}
          auto-upload="false"

          file-list={this.hasFiles(scope.row[item.prop])
            ? scope.row.files : []}
          data={bt}
          disabled={this.upload.disabled}
          {...eventProps}

        >
          <el-button slot="trigger"
                     size="small"
                     type="primary"

          >附件上传
          </el-button>
        </el-upload>
      )
    },

    // 文件上传操作
    hasFiles(en) {
      let r = !_.isEmpty(en)
        && !_.isUndefined(en)
        && !_.isNull(en)
        && en !== 'null'
      return r;
    },
    //文件超出个数限制
    uploadExceed() {
      this.$notify({
        title: "导入提示",
        message: `导入最多上传${this.upload.limitNumber}个`,
        type: "warning",
        duration: 2000,
      });
    },
    //文件状态改变 todo submit
    uploadChange(file, fileList, scope) {
      if (fileList.length < 2) {
        scope.row[this.upload.prop] = "";
      } else {
        scope.row[this.upload.prop] = scope.row[this.upload.batch];
      }
      const isLt20M = file.size / 1024 / 1024 < 20;
      if (!isLt20M) {
        this.$message.error("上传文件不能超过 20MB!");
        fileList.pop();
      } else {
        // this.$refs.uploadFileAdd.submit();
      }
    },
    // 上传成功
    uploadSuccess(res, scope) {
      console.log("su", res, scope)
      if (res.rel
        && res.data[this.upload.batch] != ""
        && typeof res.data[this.upload.batch] != undefined
      ) {

        let index = _.findIndex(this.dtTableData, (v) => {
          return v[this.upload.key] === scope.row[this.upload.key];
        });

        if (index !== -1) {
          this.$set(this.dtTableData[index], this.upload.prop, res.data[this.upload.batch]);
          this.$set(this.dtTableData[index], this.upload.batch, res.data[this.upload.key]);
          this.$emit("line-change", this.dtTableData[index]);
        }
      }
    },
    // 文件移除 根据 file.id
    uploadDelete(file, fileList, scope) {
      scope.row.files = fileList;
      this.upload.deleteAction(file.id).then((res) => {
        if (res.rel) {
          this.$notify({
            title: "提示",
            message: "文件删除成功",
            type: "success",
            duration: 2000,
          });
        }
      });
    },
    // 文件预览
    uploadPreview(file, scope) {
      if (file.status == "success") {
        this.upload.downloadAction({
          id: file.id,
        });
      } else {
        this.$notify({
          title: "提示",
          message: "该附件未上传成功",
          type: "warning",
          duration: 2000,
        });
      }
    },
    // 文件上传操作 end
  }
}
</script>
