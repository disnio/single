<template>
  <div class="app-container calendar-list-container">
   <div class="txt-right unit-info">单位：{{unitMap.electricityUnit}}、{{unitMap.amountUnit}}</div>
    <el-table
      :data="accountsInfors"
      border
      style="width: 100%"
      height="290px"
    >
      <el-table-column
        label="序号"
        align="center"
        type="index"
        width="50"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="settlementDate"
        label="结算日期"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="qyhzfaJsdjmsName"
        label="结算电价模式"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="actualElectricity"
        label='实际用电量'
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="sumTariff"
        label="电费合计"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="pcqkPcdl"
        label="偏差电量"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="pcqkKhdl"
        label="考核电量"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="pcqkKhfy"
        label="考核费用"
      >
      </el-table-column>
    </el-table>
    <div
      v-show="!listLoading"
      class="pagination-container"
    >
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="listPageInfo.page"
        :page-sizes="[10,20,30, 50,100,200,500,1000]"
        :page-size="listPageInfo.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      > </el-pagination>
    </div>
  </div>
</template>
<script>
import { getAccountsInfor } from "@common/api/customer/colligateQuery/index";
import { mapGetters } from "vuex";
import { getUnitMap } from "@common/utils/index";
export default {
  name: "accountsInfor",
  props: {
    customerId: {
      type: String
    }
  },
  data() {
    return {
      currentCusmerId: this.customerId,
      accountsInfors: [],
      total: 0,
      listLoading: false,
      listPageInfo: {
        limit: 10,
        page: 1
      },
      unitMap: {}
    };
  },
  watch: {
    customerId(val) {
      this.currentCusmerId = val;
      this.listPageInfo.customerId = this.currentCusmerId;
      this.getList(this.listPageInfo);
    }
  },
  created() {
    this.init();
    this.unitMap = getUnitMap(this.allSubMenus, this.unitMap);
  },
  computed: {
    ...mapGetters(["elements", "allSubMenus"])
  },
  methods: {
    init() {
      this.listPageInfo.customerId = this.customerId;
      this.getList(this.listPageInfo);
    },

    getList(customerId) {
      getAccountsInfor(customerId).then(response => {
        // console.log(customerId);
        // console.log(response)
        let items = response.data.rows.map((item, index) => {
          item.index =
            index + 1 + (this.listPageInfo.page - 1) * this.listPageInfo.limit;
          return item;
        });
        this.accountsInfors = response.data.rows;
        this.total = response.data.total;
        this.listLoading = false;
      });
    },
    //分页
    handleSizeChange(val) {
      this.listPageInfo.limit = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listPageInfo.page = val;
      this.getList();
    }
  }
};
</script>
