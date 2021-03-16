<template>
  <div class="app-container calendar-list-container">
    <el-form
      :inline="true"
      :model="listPageInfo"
      class="demo-form-inline "
    >
        <el-form-item label="年份">
          <el-date-picker
            v-model="listPageInfo.year"
            type="year"
            style="line-height:28px;width:170px;"
            placeholder="选择年"
            @change="getYearData"
          ></el-date-picker>
        </el-form-item>

    </el-form>
   <div class="txt-right unit-info">单位：{{unitMap.electricityUnit}}</div>
    <el-table
      :data="powerInfors"
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
        prop="issue"
        label="期次"
      >
      </el-table-column>
    
      <el-table-column
        align="center"
        prop="electricQuantity"
        label='实际用电量'
      >
      </el-table-column>
    </el-table>
    <!-- <div
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
    </div> -->
  </div>
</template>
<script>
import {getHistoryPower}  from "@common/api/customer/colligateQuery/index";
import { mapGetters } from "vuex";
import { getUnitMap,parseTime } from "@common/utils/index";
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
      powerInfors: [],
      total: 0,
      listLoading: false,
      listPageInfo: {
        year:"2019"
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
    // let nowDate = new Date();
    //   this.listPageInfo.year=nowDate;
    //   console.log(this.listPageInfo.year);
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
// #3296 gaoaining 2020-01-05 添加分页
    getList(obj) {
      obj.year=this.listPageInfo.year;
      getHistoryPower(obj).then(response => {
        //  console.log(response)
         if(response){
            this.powerInfors = response;
         }
        
        // if(response){
        //   this.historyPowerData = response.data.rows;
        //   let items = response.data.rows.map((item, index) => {
        //     item.index =
        //       index + 1 + (this.listPageInfo.page - 1) * this.listPageInfo.limit;
        //     return item;
        //   });
        //   this.powerInfors = items;
        //   this.total = response.data.total;
        // }
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
    },
    // #3296 gaoaining 2020-01-08 获取当前年份
    getNowYear(){
       
    },
    // #3296 gaoaining 2020-01-08 获取年份
    getYearData(val){
      if (val) {
      this.yearData = parseTime(val, "{y}");
      }
      this.listPageInfo.year = this.yearData;
      this.getList(this.listPageInfo);
    }
  }
};
</script>
