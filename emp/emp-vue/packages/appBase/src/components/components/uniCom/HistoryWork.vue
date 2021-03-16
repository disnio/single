<template>
  <el-dialog
    v-drag
    :close-on-click-modal="false"
    :title="title"
    :visible.sync="visible"
    custom-class="w1000"
    :lock-scroll="true"
    append-to-body
    @open="searchList"
    @close="closeHistoryDialog"
  >
    <div :style="{ paddingRight: '10px', height: height + 'px' }">
      <el-scrollbar>
        <sort-tc
          :tableData="historyList"
          :tableProp="tableProp"
          :columns="tableColumns"
          :event="tableEvent"
          :tableMethod="tableMethod"
          :tableCol="tbCol"
        ></sort-tc>
      </el-scrollbar>
    </div>
    <div slot="footer" class="dialog-footer" align="right">
      <el-button class="examine-btn" @click="closeHistoryDialog"
        >关闭
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
// 00572606 ..
import fetch from '@common/utils/fetch';

import { genColumns } from '@common/components/uniCom/sortTr';
import SortTc from '@common/components/uniCom/sortTc';

export default {
  name: 'HistoryWork',
  components: {
    'sort-tc': SortTc,
  },
  props: {
    title: {
      default: '审批历史',
      type: String,
    },
    businessKey: String,
    processKey: String,
    height: String,
    visible: Boolean,
    orgId: String,
    userName: String,
  },

  data() {
    return {
      // 表格数据
      historyList: [],
      // 查询参数
      hQuery: {
        page: 1,
        limit: 10,
        // username: this.userName,
        orgid: this.orgId,
        // form 查询
        businessKey: this.businessKey,
        //headers module code
        processKey: this.processKey,
      },
      // 表格属性
      tableProp: {
        height: 400,
      },
      tableColumns: [],
      // 表格事件
      tableEvent: {
        // 行选择
        'selection-change': this.selsChange,
        // 行排序
        'sort-change': this.searchList,
      },
      tableMethod: {
        index: this.mtIndex.bind(this),
      },
      // 表格选择的行
      selRows: [],
      tbCol: {
        exclude: [
          'id',
          'orgId',
          'orgName',
          'businessKey',
          'processKey',
          'username',
        ],
        order: ['createUser', 'createTime', 'result', 'message'],
        replace: {
          // orgId: 'orgName',
        },
      },

      colKeyValue: {
        id: '主键',
        username: '用户账号',
        // "orgId": "组织",
        processKey: '业务节点',
        businessKey: '数据主键',
        createUser: '审批人',
        createTime: '审批时间',
        result: '审批结果',
        message: '审批意见',
      },
    };
  },
  watch: {
    orgId: function(n) {
      this.hQuery.orgId = n;
    },
    userName: function(n) {
      this.hQuery.username = n;
    },

    businessKey: function(n) {
      this.hQuery.businessKey = n;
    },
    processKey: function(n) {
      this.hQuery.processKey = n;
    },
  },
  methods: {
    closeHistoryDialog() {
      this.$emit('closehistory');
    },

    mtIndex(index) {
      return index + 1 + (this.hQuery.page - 1) * this.hQuery.limit;
    },
    // 选择的类
    selsChange(arr) {
      this.selRows = arr;
    },
    // 获取审批历史
    async searchList() {
      this.dtLoading = true;
      try {
        const res = await fetch({
          url: '/api/admin/activiti/getApprovalHistory',
          method: 'get',
          params: { ...this.hQuery },
        });
        if (res) {
          this.historyList =
            res.data.rows.length > 0 &&
            res.data.rows.map((v) => {
              if (v.result === 'true') {
                v.result = '已通过';
              } else {
                v.result = '已驳回';
              }
              return v;
            });
          // 如果有 res.data.columns 直接用
          let cc = genColumns(this.historyList, this.colKeyValue);
          let len = cc.length;
          this.tableColumns = cc.map((v, i) => {
            if (i !== len - 1) {
              v.width = '230px';
            } else {
              v.width = '';
            }
            return v;
          });
          this.dtTotal = res.data.total;
          this.dtLoading = false;
        }
      } catch (e) {
        this.$message({
          message: '获取列表出错',
          type: 'warning',
        });
      }
    },
  },
};
</script>

<style scoped></style>
