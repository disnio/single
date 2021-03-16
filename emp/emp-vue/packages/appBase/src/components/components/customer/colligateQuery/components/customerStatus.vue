<template>
  <div class="app-container calendar-list-container">
    <el-table
      :data="listData"
      border
      style="width: 100%"
      height="260px"
      v-loading.body="listLoading"
    >
      <el-table-column
        label="序号"
        align="center"
        type="index"
        width="50"
      >
      </el-table-column>
        <el-table-column align="center" label="组织名称"> 
                  <template slot-scope="scope">
                    <span>{{scope.row.orgName}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="年度">
                  <template slot-scope="scope">
                    <span>{{scope.row.year}}</span>
                  </template> 
                </el-table-column>
                <el-table-column align="center" label="签约状态"> 
                  <template slot-scope="scope">
                    <span>{{scope.row.signingStatusName}}</span>
                  </template>
                </el-table-column>
    </el-table>
     <!-- page -->
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
import { getContractStatus } from "@common/api/customer/contractStatus";
import { mapGetters } from "vuex";
export default {
  name: "ContractStatus",
    props: {
    customerId: {
      type: String
    }
  },
  data() {
    return {
      listData: [],
      total:0,
       currentCustomerId: this.customerId,
      listLoading:false,
      listPageInfo:{
          limit:10,
          page:1
      }
    };
  },
    watch: {
    customerId(val) {
      this.currentCustomerId = val;
      //获取tableList
      this.getList();
    }
  },
  created() {
    this.getList();
  },
  computed: {
    ...mapGetters(["elements"])
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
    getList(){
      this.listPageInfo.customerId = this.currentCustomerId;
      getContractStatus(this.listPageInfo).then(response => {
        if(response.status=="200"){
          this.total = response.data.total;
          this.listData=[];
          if(response.data.total>0){
            let items = response.data.rows.map((item, index) => {
              item.index =
                index + 1 + (this.listPageInfo.page - 1) * this.listPageInfo.limit;
              return item;
            });
            this.listData = response.data.rows;
            this.total = response.data.total;
            this.listLoading = false;
          }
        }
        
      });
    }
  }
};
</script>
