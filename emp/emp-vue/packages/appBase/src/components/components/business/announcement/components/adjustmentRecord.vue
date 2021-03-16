<!--
 * @功能描述: 交易公告修改记录页面
 * @版本: 
 * @作者: 张朋
 * @Date: 2019-11-05 20:42:20
 * @最新修改内容: 
 * @LastEditTime: 2019-11-13 14:45:27
 -->
<template>
  <div class="app-container calendar-list-container">
    <!-- 弹窗 -->
    <el-dialog v-drag :close-on-click-modal="false"
      title="修改记录"
      custom-class="w1000"
      :visible.sync="adjustmentRecordDialogVisible"
    >
      <!-- <el-row>
        <el-col :span="24">
          <div class="txt-right unit-info">单位：万千瓦时、厘/千瓦时、元</div>
        </el-col>
      </el-row> -->
      <!-- :span-method="objectSpanMethod" -->
      <el-table
        :key="tableKey"
        :data="tableList"
        v-loading.body="listLoading"
        border
        fit
        highlight-current-row
        style="width: 100%;"
        height="350"
      >
         <el-table-column align="center" label="序号" type="index"></el-table-column>

        <el-table-column align="center" label="操作人">
          <template slot-scope="scope">
            <div class="txt-left">{{ scope.row.crtUser }}</div>
          </template>
        </el-table-column>

          <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <div class="txt-left">{{ scope.row.operation }}</div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作时间">
          <template slot-scope="scope">
            <div class="txt-left">{{ scope.row.crtTime }}</div>
          </template>
        </el-table-column>

        <el-table-column align="center" label="页签">
          <template slot-scope="scope">
            <div class="txt-left">{{ scope.row.label }}</div>
          </template>
        </el-table-column>

        <el-table-column align="center" label="操作字段">
          <template slot-scope="scope">
            <div class="txt-left">{{ scope.row.modifyField }}</div>
          </template>
        </el-table-column>

        <el-table-column align="center" label="操作前内容">
          <template slot-scope="scope">
            <div>{{ scope.row.oldValue }}</div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作后内容">
          <template slot-scope="scope">
            <span>{{ scope.row.newValue }}</span>
          </template>
        </el-table-column>
      </el-table>
      <div
        v-show="!listLoading"
        class="pagination-container"
      >
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="listQuery.page"
          :page-sizes="[10,20,30, 50,100,200,500,1000]"
          :page-size="listQuery.limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </el-dialog>

  </div>
</template>
<script>
import {getPageList} from "@common/api/business/announcement/index";
import { getadjustmentRecord } from "@common/api/settlement/customerPlannedSettlement/index";
import { mapGetters } from "vuex";
export default {
  name: "result",
  data() {
    return {
      mainIndex: [],
      mainIndexPos: "",
      listQuery: {
        page: 1,
        limit: 10,
        businessId:"" //2019-11-13 #2490 张朋 添加交易公告id字段
      },
      total: 0,
      adjustmentRecordDialogVisible: false,
      tableKey: 3,
      tableList: [],
      listLoading: false
    };
  },
  mounted() {},
  created() {},
  computed: {
    ...mapGetters(["elements", "orgId"])
  },
  methods: {
    /**
     * @方法名称: openadjustmentRecordDialog
     * @功能描述: 根据参数id获取修改记录信息列表
     * @参数: 交易公告id
     * @返回值: 
     * @作者: 张朋
     * @Date: 2019-11-07 11:33:33
     * @工单号：#2490
     * @最新修改内容: 
     * @LastEditTime: 
     */
    openadjustmentRecordDialog(id) {
      this.adjustmentRecordDialogVisible = true;
      /**2019-11-13 #2490 张朋 赋值  start*/
      this.listQuery.businessId = id;
      this.listQuery.page = 1;
      this.listQuery.limit = 10;
      /**2019-11-13 #2490 张朋 赋值  end*/
      this.getList();
    },
    /**
     * @方法名称: getList
     * @功能描述: 列表查询
     * @参数: 
     * @返回值: 
     * @作者: 张朋
     * @工单号：#2490
     * @Date: 2019-11-13 10:14:30
     * @最新修改内容: 
     * @LastEditTime: 
     */
    getList(){
      getPageList(this.listQuery).then(res => {
        this.tableList = res.data.rows;
        // this.setViewsList();
        this.total = res.data.total;
      });
    },
    /**
     * @方法名称: handleSizeChange
     * @功能描述: 分页
     * @参数: 
     * @返回值: 
     * @作者: 张朋
     * @工单号：#2490
     * @Date: 2019-11-07 12:50:12
     * @最新修改内容: 
     * @LastEditTime: 
     */
    handleSizeChange(val) {
      this.listQuery.limit = val;
      //2019-11-13 #2490 张朋 调取查询方法
      this.getList();
    },
    /**
     * @方法名称: handleCurrentChange
     * @功能描述: 分页
     * @参数: 
     * @返回值: 
     * @作者: 张朋
     * @工单号：#2490
     * @Date: 2019-11-07 12:50:12
     * @最新修改内容: 
     * @LastEditTime: 
     */
    handleCurrentChange(val) {
      this.listQuery.page = val;
      //2019-11-13 #2490 张朋 调取查询方法
      this.getList();
    }
  }
};
</script>
<style lang="scss" scoped>
</style>





