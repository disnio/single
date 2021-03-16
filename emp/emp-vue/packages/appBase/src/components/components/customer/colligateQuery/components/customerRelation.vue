<template>
  <div class="app-container calendar-list-container">
    <el-table
      :key="tableKey"
      :data="list"
      v-loading.body="listLoading"
      border
      fit
      highlight-current-row
      style="width: 100%"
      height="290px"
    >
      <el-table-column prop="index" label="序号" align="center" width="70px"></el-table-column>
      <el-table-column width="100px" align="center" label="组织名称">
        <template slot-scope="scope">
          <span>{{scope.row.orgName}}</span>
        </template>
      </el-table-column>
      <el-table-column width="100px" align="center" label="拜访客户">
        <template slot-scope="scope">
          <!-- <span>{{scope.row.customerName}}</span> -->
          <span>{{scope.row.tvCustomerName}}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px" align="center" label="拜访时间">
        <template slot-scope="scope">
          <span>{{scope.row.visitDate}}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px" align="center" label="拜访对象">
        <template slot-scope="scope">
          <span>{{scope.row.visitPople}}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px" align="center" label="拜访地点">
        <template slot-scope="scope">
          <span>{{scope.row.visitPlace}}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px" align="center" label="职务">
        <template slot-scope="scope">
          <span>{{scope.row.post}}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px" align="center" label="联系方式">
        <template slot-scope="scope">
          <span>{{scope.row.contactNumber}}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px" align="center" label="拜访人员">
        <template slot-scope="scope">
          <span>{{scope.row.visitSalesman}}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px" align="center" label="拜访目的" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{scope.row.visitObjectiveName}}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px" align="center" label="拜访情况" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{scope.row.visitSituation}}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px" align="center" label="反馈及对策" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{scope.row.strategy}}</span>
        </template>
      </el-table-column>
      <el-table-column width="100px" align="center" label="创建用户">
        <template slot-scope="scope">
          <span>{{scope.row.crtUserName}}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px" align="center" label="创建时间">
        <template slot-scope="scope">
          <span>{{scope.row.crtTime}}</span>
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
  </div>
</template>
<script>
import {
  getkhbfObj,
  getNamePageList
} from "@common/api/customer/colligateQuery/index";
import { mapGetters } from "vuex";
export default {
  name: "customerRelation",
  props: {
    customerId: {
      type: String
    },
    statec: {
      type: String
    },
    currentCusmerName: {
      type: String
    }
  },
  data() {
    return {
      tableKey: 0,
      listLoading: false,
      list: [],
      listQuery: {
        limit: 10,
        page: 1
      },
      total: null,
      currentCusmerId: this.customerId,
      gStatec: this.statec,
      cusmerName: this.currentCusmerName
    };
  },
  watch: {
    deep: true,
    immediate: true,
    customerId(newValueval,oldValue) {
      this.currentCusmerId = newValueval;
      this.getList();
    },
    statec(newValueval,oldValue) {
      this.gStatec = newValueval;
      this.getList();
    },
    currentCusmerName(newValueval,oldValue) {
      this.cusmerName = newValueval;
      this.getList();
    }
  },
  mounted() {
    this.getList();
  },
  computed: {
    ...mapGetters(["elements"])
  },
  methods: {
    getList() {
      this.listLoading = true;
      if (this.gStatec == "TVC-1") {
        this.listQuery.customerName = this.cusmerName;
        getNamePageList(this.listQuery).then(response => {
          let items = response.data.rows.map((item, index) => {
            item.index =
              index + 1 + (this.listQuery.page - 1) * this.listQuery.limit;
            return item;
          });
          this.list = response.data.rows;
          this.total = response.data.total;
          this.listLoading = false;
        });
      } else {
        this.listQuery.customerId = this.currentCusmerId;
        getkhbfObj(this.listQuery).then(response => {
          let items = response.data.rows.map((item, index) => {
            item.index =
              index + 1 + (this.listQuery.page - 1) * this.listQuery.limit;
            return item;
          });
          this.list = response.data.rows;
          this.total = response.data.total;
          this.listLoading = false;
        });
      }
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
