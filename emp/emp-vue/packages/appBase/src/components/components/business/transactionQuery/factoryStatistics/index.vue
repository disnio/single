<template>
 <!-- #4297 gaoaining 添加类名filter-container 减少行与行的间距 修改input的宽 start-->
  <div class="filter-container">
    <spotSelectSearch @on-load="getQuery" @on-submit="getList" @on-change="getQueryChange">
      <slot>
        <!-- #4178 gaoaining 2020-06-04 修改多选可折叠 start-->
        <el-form-item label="发电公司" label-width="100px">
          <el-select
            v-model="orgCodes"
            multiple
            collapse-tags
            placeholder="选择发电公司"
            style="width: 168px;"
            :disabled="info.length == 4"
            @change="showExportChange"
          >
          <!-- #4178 gaoaining 2020-06-04 修改多选可折叠 end-->
            <el-option
              v-for="(val, index) in orgList"
              :key="index"
              :label="val.orgName"
              :value="val.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="按股权比合计" label-width="100px">
          <el-select v-model="listQuery.isOwnership" placeholder="请选择" style="width:168px"  @change="showExportChange">
            <el-option v-for="item in options" :key="item.val" :label="item.name" :value="item.val"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="周期" label-width="100px">
          <el-select v-model="period" @change="periodChange" placeholder="请选择" style="width:168px">
            <el-option
              v-for="item in weeKoptions"
              :key="item.val"
              :label="item.name"
              :value="item.val"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="期次" label-width="100px">
          <el-date-picker
            @change="showExportChange"
            style="width:168px"
            value-format="yyyy"
            v-model="listQuery.beginDate"
            v-if="period == 'jyzq01'"
            type="year"
            placeholder="选择期次"
          ></el-date-picker>
          <el-date-picker
            @change="showExportChange"
            style="width:336px"
            v-model="date"
            type="monthrange"
            value-format="yyyy-MM"
            v-else
            unlink-panels
            range-separator="至"
            start-placeholder="开始月份"
            end-placeholder="结束月份"
          ></el-date-picker>
        </el-form-item>
      </slot>
       <!-- #4297 gaoaining 添加类名filter-container 减少行与行的间距 修改input的宽 end-->
    </spotSelectSearch>
    <el-row style="margin-bottom: 10px;">
      <el-col :span="12">
        <el-button
          v-if="true"
          type="primary"
          icon="el-icon-upload"
          @click="handleExport"
          :disabled="!showExport"
        >导出</el-button>
      </el-col>
      <el-col :span="12">
        <div style="text-align: right; line-height: 28px;">
          <!-- Wang Qiang 统一单位 2019-12-16 start -->
          单位：{{ !unitMap.electricityUnit || unitMap.electricityUnit == '无' ? '' : unitMap.electricityUnit }}
          {{ !unitMap.amountUnit || unitMap.amountUnit == '无' ? '' : unitMap.amountUnit }}
          {{ !unitMap.priceUnit || unitMap.priceUnit == '无' ? '' : unitMap.priceUnit }}
          {{ !unitMap.capacityUnit || unitMap.capacityUnit == '无' ? '' : unitMap.capacityUnit }}
          <!-- Wang Qiang 统一单位 2019-12-16 end -->
        </div>
      </el-col>
    </el-row>
    <el-table :data="tableData" v-if="period == 'jyzq01'" v-loading="loading" style="width: 100%">
      <!-- #4178 gaoaining 2020-06-04 改变宽度和固定左侧 start-->
      <el-table-column prop="orgName" label="电厂名称" width="300" fixed>
      <!-- #4178 gaoaining 2020-06-04 改变宽度和固定左侧 end-->
        <template slot-scope="scope">
          <el-tooltip placement="top" :content="scope.row.orgName" :open-delay="500" effect="dark">
            <div>{{scope.row.orgName}}</div>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="issue" label="期次"></el-table-column>
      <el-table-column prop="useElecRate" label="厂用电率"></el-table-column>
      <el-table-column label="年度长协">
        <el-table-column prop="idx0GenerateElectricity" label="发电量"></el-table-column>
        <el-table-column prop="idx0DealElectricity" label="上网电量"></el-table-column>
        <el-table-column prop="idx0ActualPrice" label="实际成交价格"></el-table-column>
      </el-table-column>
    </el-table>
    <el-table
      :data="tableData"
      :span-method="objectSpanMethod"
      v-else
      v-loading="loading"
      style="width: 100%"
    >
    
      <!-- #4178 gaoaining 2020-06-04 改变宽度和固定左侧 start-->
      <el-table-column prop="orgName" label="电厂名称" width="300" fixed>
      <!-- #4178 gaoaining 2020-06-04 改变宽度和固定左侧 end-->
        <template slot-scope="scope">
          <el-tooltip placement="top" :content="scope.row.orgName" :open-delay="500" effect="dark">
            <div>{{scope.row.orgName}}</div>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="issue" label="期次" width="120"></el-table-column>
      <el-table-column prop="useElecRate" label="厂用电率" width="100"></el-table-column>
      <el-table-column label="月度竞价">
        <el-table-column prop="idx0GenerateElectricity" label="发电量" width="180"></el-table-column>
        <el-table-column prop="idx0DealElectricity" label="上网电量" width="180"></el-table-column>
        <el-table-column prop="idx0ActualPrice" label="实际成交价格" width="180"></el-table-column>
      </el-table-column>
      <el-table-column label="月内增量挂牌" width="180">
        <el-table-column prop="idx1GenerateElectricity" label="发电量" width="180"></el-table-column>
        <el-table-column prop="idx1DealElectricity" label="上网电量" width="180"></el-table-column>
        <el-table-column prop="idx1ActualPrice" label="实际成交价格" width="180"></el-table-column>
      </el-table-column>
      <el-table-column label="月内合同转让" width="180">
        <el-table-column prop="idx2GenerateElectricity" label="发电量" width="180"></el-table-column>
        <el-table-column prop="idx2DealElectricity" label="上网电量" width="180"></el-table-column>
        <el-table-column prop="idx2ActualPrice" label="实际成交价格" width="180"></el-table-column>
      </el-table-column>
      <el-table-column label="抽水蓄能" width="180">
        <el-table-column prop="idx3GenerateElectricity" label="发电量" width="180"></el-table-column>
        <el-table-column prop="idx3DealElectricity" label="上网电量" width="180"></el-table-column>
        <el-table-column prop="idx3ActualPrice" label="实际成交价格" width="180"></el-table-column>
      </el-table-column>
      <el-table-column label="被代替(跨区交易)合同转让" width="200">
        <el-table-column prop="idx4GenerateElectricity" label="发电量" width="180"></el-table-column>
        <el-table-column prop="idx4DealElectricity" label="上网电量" width="180"></el-table-column>
        <el-table-column prop="idx4ActualPrice" label="实际成交价格" width="200"></el-table-column>
      </el-table-column>
      <el-table-column label="合计" width="180">
        <el-table-column prop="idx5GenerateElectricity" label="发电量" width="180"></el-table-column>
        <el-table-column prop="idx5DealElectricity" label="上网电量" width="180"></el-table-column>
        <el-table-column prop="idx5ActualPrice" label="实际成交价格" width="200"></el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import spotSelectSearch from "@common/components/spot/components/spotSelectSearch";
import {
  byFactory,
  exportByFactory
} from "@common/api/business/transactionQuery/factoryStatistics";
import { mapGetters } from "vuex";
import { getUnitMap } from "@common/utils/index";
import { getUserOrgInfo } from "@common/api/public/index"; // 用户信息
import { getAllOrgByPorgId } from "@common/api/decisionSupport/customerRenew/index"; // 区域、区域公司、售电公司、发电公司
export default {
  name: "factoryStatistics",
  data() {
    return {
      showExport: false,
      tableData: [],
      listQuery: {
        orgId: "",
        isOwnership: 0,
        period: "jyzq01",
        beginDate: "",
        endDate: ""
      },
      loading: false,
      options: [
        { name: "是", val: 1 },
        { name: "否", val: 0 }
      ],
      period: "jyzq01",
      weeKoptions: [
        { name: "年度", val: "jyzq01" },
        { name: "月度", val: "jyzq03" }
      ],
      date: [],
      spanArr: [],
      position: 0,
      unitMap: {
        // electricityUnit:"万千瓦时", //电量
        // priceUnit:"元/MWh",   //电价
        // amountUnit:"万元",  //金额
        // capacityUnit:"4KVA" //容量
      },
      factoryStatistics_wq_btn_export: false,
      info: [],
      orgList: [],
      orgCodes: []
    };
  },
  watch: {
    date: {
      handler(newVal, oldVal) {
        if (newVal.length == 2) {
          this.listQuery.beginDate = newVal[0];
          this.listQuery.endDate = newVal[1];
        }
      },
      deep: true
    },
    orgCodes: {
      handler(newVal, oldVal) {
        if (newVal.length > 0) {
          this.listQuery.orgId = newVal.join(",");
        } else {
          this.listQuery.orgId = "";
        }
      },
      deep: true
    }
  },
  computed: {
    ...mapGetters(["elements", "allSubMenus"])
  },
  created() {
    this.factoryStatistics_wq_btn_export = this.elements[
      "factoryStatistics_wq_btn:btn_export"
    ];
  },
  mounted() {
    if (this.listQuery.period == "jyzq01") {
      this.listQuery.beginDate = new Date().getFullYear().toString();
      this.listQuery.endDate = "";
    } else {
      let a = new Date().getFullYear() + "-" + "01";
      let b =
        new Date().getFullYear() +
        "-" +
        (new Date().getMonth() + 1 < 10
          ? "0" + (new Date().getMonth() + 1)
          : new Date().getMonth() + 1);
      this.date = [];
      this.date.push(a, b);
    }
    this.unitMap = getUnitMap(this.allSubMenus, this.unitMap);
  },
  components: {
    spotSelectSearch
  },
  methods: {
    showExportChange(){
      this.showExport = false;
    },
    // 导出
    handleExport() {
      if (this.listQuery.orgId && this.listQuery.period&&this.listQuery.beginDate) {
        let params = Object.assign({}, this.listQuery);
        params.isOwnership = this.listQuery.isOwnership ? true : false;
        params.ModelCode = sessionStorage.getItem("modelCode");
        exportByFactory(params);
      } else {
        this.$notify({
          title: "提示",
          message: "请选择完整的查询条件",
          type: "warning",
          duration: 2000
        });
      }
    },
    periodChange(val) {
      this.listQuery.period = val;
      this.showExport = false;
      this.tableData = [];
      if (val == "jyzq01") {
        this.listQuery.beginDate = new Date().getFullYear().toString();
        this.listQuery.endDate = "";
      } else {
        let a = new Date().getFullYear() + "-" + "01";
        let b =
          new Date().getFullYear() +
          "-" +
          (new Date().getMonth() + 1 < 10
            ? "0" + (new Date().getMonth() + 1)
            : new Date().getMonth() + 1);
        this.date = [];
        this.date.push(a, b);
      } 
    },
    // 合并计算弹框
    rowspan() {
      this.spanArr = []; //在data里面定义
      this.position = 0; //在data里面定义
      this.tableData.forEach((item, index) => {
        if (index === 0) {
          this.spanArr.push(1);
          this.position = 0;
          //item.sequence = index + 1; //设置序号
        } else {
          if (
            this.tableData[index].orgName === this.tableData[index - 1].orgName
          ) {
            this.spanArr[this.position] += 1; //连续有几行名称相同
            this.spanArr.push(0); // 名称相同后往数组里面加一项0
            // 设置当前序号和前一个相同
            //this.tableData[index].sequence = this.tableData[index-1].sequence;
          } else {
            this.spanArr.push(1);
            this.position = index;
            // 将当前序号设置为前一个序号+1
            //this.okTableData[index].sequence = this.okTableData[index-1].sequence+1;
          }
        }
      });
    },
    // 合并行
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        // 列进行合并
        const _row = this.spanArr[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col
        };
      }
    },
    dateChange(val) {
      // console.log(val);
    },
    // 初始化获取检索组件的值
    async getQuery(obj) {
      // console.log(obj)
      // this.listQuery.areaCode = obj.areaCode;
      // this.listQuery.areaCompanyCode = obj.areaCompanyCode;
      // this.listQuery.orgId = obj.orgCode;
      this.info = await getUserOrgInfo();
      if (obj.areaCode && obj.areaCompanyCode) {
        this.orgList = await getAllOrgByPorgId({
          pOrgId: obj.areaCompanyCode,
          attributeTypeCode: "zzjgsx02" // zzjgsx01 售电公司  zzjgsx02 发电公司
        });
        if (this.info.length == 4) {
          this.orgCodes = [];
          this.orgCodes.push(this.info[3].id);
        }
      }
    },
    // 下拉框变化时重新赋值
    async getQueryChange(obj) {
      // this.listQuery.areaCode = obj.areaCode;
      // this.listQuery.areaCompanyCode = obj.areaCompanyCode;
      // this.listQuery.orgId = obj.orgCode;
      if (obj.areaCode && obj.areaCompanyCode) {
        this.orgList = await getAllOrgByPorgId({
          pOrgId: obj.areaCompanyCode,
          attributeTypeCode: "zzjgsx02" // zzjgsx01 售电公司  zzjgsx02 发电公司
        });
        if (this.info.length == 4) {
          this.orgCodes = [];
          this.orgCodes.push(this.info[3].id);
        }
      }
    },
    async getList() {
      if (this.listQuery.orgId && this.listQuery.period&&this.listQuery.beginDate) {
        let params = Object.assign({}, this.listQuery);
        params.isOwnership = this.listQuery.isOwnership ? true : false;
        this.loading = true;
        let res = await byFactory(params);
        if (res.rel) {
          this.tableData = res.data;
          if (this.period == "jyzq03") {
            this.rowspan();
          }
          if(this.tableData.length > 0){
            this.showExport = true
          }
          this.loading = false;
        } else {
          this.loading = false;
          this.$notify({
            title: "提示",
            message: res.msg,
            type: "warning",
            duration: 2000
          });
        }
      } else {
        this.$notify({
          title: "提示",
          message: "请选择完整的查询条件",
          type: "warning",
          duration: 2000
        });
      }
    },
    async handleFilter() {
      let res = await byFactory(this.listQuery);
    },
    selectOrg(val) {
      // console.log(val);
    },
    initOrg(val) {
      // console.log("111", val);
    }
  }
};
</script>

<style lang="scss" >
.ui-select-multiple.ui-select-bootstrap {
  height: auto;
  min-height: 34px;
  /* padding: 3px 3px 0 3px;*/
  padding: 4px 4px 3px 4px;
}

.ui-select-multiple.ui-select-bootstrap input.ui-select-search {
  background-color: transparent !important; /* To prevent double background when disabled */
  border: none;
  outline: none;
  height: 1.666666em;
  margin-bottom: 3px;
  position: absolute;
}
// .el-tag.el-tag--info{
//   max-width:120px;
// }
.el-tag.el-tag--info span{
  max-width: 86px;
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
}
.el-select .el-tag__close.el-icon-close{
  top:-6px;
}
</style>
