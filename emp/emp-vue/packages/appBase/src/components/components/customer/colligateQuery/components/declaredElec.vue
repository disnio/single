<template>
  <div class="app-container calendar-list-container">
    <div class="txt-right">单位：{{unitMap.electricityUnit }}</div>
    <el-table :data="declaredElecs" border style="width: 100%" height="290px">
      <el-table-column label="序号" align="center" type="index" width="50"></el-table-column>
      <el-table-column align="center" prop="declarationTime" label="期次" width="100"></el-table-column>
      <el-table-column align="center" prop="declarationDate" label="申报日期" width="100"></el-table-column>
      <el-table-column align="center" prop="lastYearActualElectricity" label="上年同期实际用电量" width="140">
        <template slot-scope="scope">
          <span
            v-if="scope.row.lastYearActualElectricity !=''&&typeof scope.row.lastYearActualElectricity!='undefined'&&scope.row.lastYearActualElectricity!='null'"
          >{{scope.row.lastYearActualElectricity}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="thisPeriodContractElectricity" label="本期合同电量" width="100">
        <template slot-scope="scope">
          <span
            v-if="scope.row.thisPeriodContractElectricity !=''&&typeof scope.row.thisPeriodContractElectricity!='undefined'&&scope.row.thisPeriodContractElectricity!='null'"
          >{{scope.row.thisPeriodContractElectricity}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="declarationElectricity" label="本月申报电量" width="100">
        <template slot-scope="scope">
          <span
            v-if="scope.row.declarationElectricity !=''&&typeof scope.row.declarationElectricity!='undefined'&&scope.row.declarationElectricity!='null'"
          >{{scope.row.declarationElectricity}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="yearDecomposeElectricity" label="年度双边分解电量" width="120">
        <template slot-scope="scope">
          <span
            v-if="scope.row.yearDecomposeElectricity !=''&&typeof scope.row.yearDecomposeElectricity!='undefined'&&scope.row.yearDecomposeElectricity!='null'"
          >{{scope.row.yearDecomposeElectricity}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="monthDecrement" label="月度减缩电量" width="100">
        <template slot-scope="scope">
          <span
            v-if="scope.row.monthDecrement !=''&&typeof scope.row.monthDecrement!='undefined'&&scope.row.monthDecrement!='null'"
          >{{scope.row.monthDecrement}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" prop="monthBilateralPower" label="月度双边电量" width="100">
        <template slot-scope="scope">
          <span
            v-if="scope.row.monthBilateralPower !=''&&typeof scope.row.monthBilateralPower!='undefined'&&scope.row.monthBilateralPower!='null'"
          >{{scope.row.monthBilateralPower}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" prop="monthBiddingVolume" label="月度竞价电量" width="100">
        <template slot-scope="scope">
          <span
            v-if="scope.row.monthBiddingVolume !=''&&typeof scope.row.monthBiddingVolume!='undefined'&&scope.row.monthBiddingVolume!='null'"
          >{{scope.row.monthBiddingVolume}}</span>
        </template>
      </el-table-column>
      <!-- #4327 2020-06-22 gaoaining 在月度竞价电量列后增加月前申报、月内申报、申报合同电量三列 start -->
       <el-table-column align="center" prop="declarationElectricity" label="月前申报" width="100">
        <template slot-scope="scope">
          <span>{{scope.row.declarationElectricity}}</span>
        </template>
      </el-table-column>
       <el-table-column align="center" prop="monthDeclaredPower" label="月内申报" width="100">
        <template slot-scope="scope">
          <span>{{scope.row.monthDeclaredPower}}</span>
        </template>
      </el-table-column>
       <el-table-column align="center" prop="contractDeclaredPower" label="申报合同电量" width="100">
        <template slot-scope="scope">
          <span>{{scope.row.contractDeclaredPower}}</span>
        </template>
      </el-table-column>
       <!-- #4327 2020-06-22 gaoaining 在月度竞价电量列后增加月前申报、月内申报、申报合同电量三列 end -->
      <el-table-column align="center" prop="adjustElectricity" label="调整电量" width="80">
        <template slot-scope="scope">
          <span
            v-if="scope.row.adjustElectricity !=''&&typeof scope.row.adjustElectricity!='undefined'&&scope.row.adjustElectricity!='null'"
          >{{scope.row.adjustElectricity}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="adjustCause" label="调整说明">
        <template slot-scope="scope">
          <span>{{scope.row.adjustCause}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="remark" label="备注">
        <template slot-scope="scope">
          <span>{{scope.row.remark}}</span>
        </template>
      </el-table-column>
    </el-table>
    <div v-show="!listLoading" class="pagination-container">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="listPageInfo.page"
        :page-sizes="[10,20,30, 50,100,200,500,1000]"
        :page-size="listPageInfo.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import { getDeclaredElecs } from "@common/api/customer/colligateQuery/index";
import { mapGetters } from "vuex";
import {getUnitMap} from "@common/utils/index";
export default {
  name: "declaredElec",
  props: {
    customerId: {
      type: String
    }
  },
  data() {
    return {
      unitMap:{},
      curCustomerId: this.customerId,
      declaredElecs: [],
      total: 0,
      listLoading: false,
      listPageInfo: {
        limit: 10,
        page: 1
      }
    };
  },
  watch: {
    customerId(val) {
      this.curCustomerId = val;
      this.getList();
    }
  },
  created() {
    this.getList();
    this.unitMap=getUnitMap(this.allSubMenus,this.unitMap);
  },
  computed: {
    ...mapGetters(["elements","allSubMenus"])
  },
  methods: {
    //分页
    handleSizeChange(val) {
      this.listPageInfo.limit = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listPageInfo.page = val;
      this.getList();
    },
    getList() {
      this.listPageInfo.customerId = this.curCustomerId;
      // console.log(this.listPageInfo);
      getDeclaredElecs(this.listPageInfo).then(response => {
        let items = response.data.rows.map((item, index) => {
          item.index =
            index + 1 + (this.listPageInfo.page - 1) * this.listPageInfo.limit;
          return item;
        });
        this.declaredElecs = response.data.rows;
        this.total = response.data.total;
        this.listLoading = false;
      });
    }
  }
};
</script>
