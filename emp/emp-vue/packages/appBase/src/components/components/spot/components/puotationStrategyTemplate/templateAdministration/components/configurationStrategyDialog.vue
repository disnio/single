<template>
  <div>
    <el-dialog v-drag title="配置策略查看" :visible.sync="configureDialog" custom-class="w1000" append-to-body :close-on-click-modal="false">
      <div>
        <el-table
          @selection-change="getSelectionIds"
          :key="tableKey"
          :data="tableDataList"
          v-loading.body="listLoading"
          border
          fit
          highlight-current-row
          style="width: 100%"
          height="450"
        >
          <el-table-column
            v-if="this.bjcnmbpzDelQuery.isCheckStatus"
            type="selection"
            align="center"
            width="55"
          ></el-table-column>
          <el-table-column type="index" label="序号" align="center" width="70px"></el-table-column>
          <el-table-column align="center" label="报价时点">
            <template slot-scope="scope">
              <div>{{scope.row.tranTime}}</div>
            </template>
          </el-table-column>
          <el-table-column align="center" label="段号">
            <template slot-scope="scope">
              <div>{{scope.row.bandCode}}</div>
            </template>
          </el-table-column>

          <el-table-column align="center" label="负荷/容量">
            <template slot-scope="scope">
              <!-- <div v-if="scope.row.capacityFormula">{{scope.row.capacityFormula}}</div> -->
              <div>{{scope.row.capacityFormula}}</div>
            </template>
          </el-table-column>
          <el-table-column align="center" label="报价">
            <template slot-scope="scope">
              <div>{{scope.row.priceFormula}}</div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getDetailAll } from "@common/api/spot/configure/puotationStrategyTemplate/templateAdministration/index";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      configureDialog: false,
      // ======================
      tableKey: 1,
      listLoading: false,
      tableDataList: []
    };
  },
  computed: {
    ...mapGetters(["elements", "bjcnmbpzDelQuery"])
  },
  mounted() {},
  created() {},
  methods: {
    init(data) {
      this.listLoading = true;
      this.configureDialog = true;
      let parame = {
        templateid: data.templateid
      };
      getDetailAll(parame).then(response => {
        this.listLoading = false;
        this.tableDataList = response.data;
      });
    },

    getSelectionIds(val) {
      // console.log(val);
      if (val) {
        let id = [];
        val.forEach(element => {
          id.push(element.templateDetailId + "");
        });
        this.delIds = id;
      }
    }
  }
};
</script>

<style scoped>
.calculationStyle {
  height: 180px;
}
.calculation {
  height: 30px;
  line-height: 30px;
}
.calculation:hover {
  background-color: #d1dcf1;
}
.iconStyle:hover {
  color: blue;
}
</style>
