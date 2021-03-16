<template>
  <!--  2019-11-11 #2619 滕超 弹框高度自适应 start-->
  <div
    class="app-container calendar-list-container"
    :style="{paddingRight:'10px',height:dialogHeight+'px'}"
  >
    <el-scrollbar>
      <div :style="{paddingRight:'10px',height:dialogHeight*1.2+'px'}"> 
      <el-tabs
        
        v-model="activeName"
        type="border-card"
      >
        <!--  2019-11-11 #2619 滕超 弹框高度自适应 end-->
        <el-tab-pane v-if="this.statec=='TVC-2'" label="档案信息" name="first">
          <customer-file ref="DAXX" v-bind:customerId="currentCusmerId"></customer-file>
        </el-tab-pane>

        <el-tab-pane v-if="this.statec=='TVC-2'" label="签约状态" name="second">
          <customer-status v-bind:customerId="currentCusmerId"></customer-status>
        </el-tab-pane>

        <el-tab-pane v-if="this.statec=='TVC-2'" label="客户标签" name="third">
          <customer-tag v-bind:customerId="currentCusmerId"></customer-tag>
        </el-tab-pane>
        <el-tab-pane ref="KHGX" label="客户关系" name="fouth">
          <customer-relation
            :customerId="currentCusmerId"
            :statec="statec"
            :currentCusmerName="currentCusmerName"
          ></customer-relation>
        </el-tab-pane>
        <el-tab-pane v-if="this.statec=='TVC-2'" label="合同信息" name="fifth">
          <contract-infor :customerId="currentCusmerId"></contract-infor>
        </el-tab-pane>
        <el-tab-pane v-if="this.statec=='TVC-2'" label="申报电量" name="sixth">
          <declared-elec :customerId="currentCusmerId"></declared-elec>
        </el-tab-pane>
       <!-- gaoaining 2019-12-25 添加实际用电量 -->
        <el-tab-pane v-if="this.statec=='TVC-2'" label="历史用电量" name="sjydl">
          <actual-power :customerId="currentCusmerId"></actual-power>
        </el-tab-pane>
        <!-- #4327 gaoaining 2020-06-22 去掉结算信息标签 start -->
        <!-- <el-tab-pane v-if="this.statec=='TVC-2'" label="结算信息" name="seven">
          <accounts-infor :customerId="currentCusmerId"></accounts-infor>
        </el-tab-pane> -->
         <!-- #4327 gaoaining 2020-06-22 去掉结算信息标签 end -->
      </el-tabs>
      </div>
    </el-scrollbar>
  </div>
</template>
<script>
import { page } from "@common/api/customer/colligateQuery/index";
import { initDialogHeight } from "@common/utils/index";
import { mapGetters } from "vuex";
export default {
  name: "customerDetail",
  props: {
    customerId: {
      type: String
    },
    gPropCode: {
      type: String
    },
    gCustomerName: {
      type: String
    }
  },
  components: {
    "customer-file": () => import("./customerFile"),
    "customer-status": () => import("./customerStatus"),
    "customer-tag": () => import("./customerTag"),
    "customer-relation": () => import("./customerRelation"),
    "contract-infor": () => import("./contractInfor"),
    "declared-elec": () => import("./declaredElec"),
    "actual-power": () => import("./actualPower"),
      // <!-- #4327 gaoaining 2020-06-22 去掉结算信息标签 start -->
    // "accounts-infor": () => import("./accountsInfor")
    
  },
  data() {
    return {
      dialogHeight: "", //弹框高度
      activeName: "",
      currentCusmerId: this.customerId,
      currentCusmerName: this.gCustomerName,
      statec: this.gPropCode,
      statec2: ""
    };
  },
  watch: {
    deep: true,
    immediate: true,
    customerId(newValue, oldValue) {
      this.currentCusmerId = newValue;
      this.newOpen();
    },
    gPropCode(newValue, oldValue) {
      this.statec = newValue;
      this.newOpen();
    },
    gCustomerName(newValue, oldValue) {
      this.currentCusmerName = newValue;
      this.newOpen();
    }
  },
  mounted() {
    // if (this.gPropCode == "TVC-2") {
    //   this.activeName = "first";
    //   this.$refs.DAXX.getDetail();
    // } else {
    //   // this.statec=this.gPropCode;
    //   this.activeName = "fouth";
    //   // this.$refs.KHGX.getList();
    // }
    this.newOpen();
    /**
     * @功能描述: 获取自适应弹框高度
     * @参数:
     * @返回值:
     * @样式作用范围: 查看弹框
     * @作者: 滕超
     * @Date: 2019-11-11 15:39:50
     * @最新修改内容:
     * @LastEditTime:
     */
    this.dialogHeight = initDialogHeight();
  },
  computed: {
    ...mapGetters(["elements"])
  },
  methods: {
    handleClick(tab, event) {},
    newOpen() {
      // this.statec = row.propCode;
      // this.currentCusmerName = row.customerName;
      if (this.statec == "TVC-1") {
        this.activeName = "fouth";
        // this.$refs.DAXX.getDetail();
      } else {
        // console.log(123546);
        this.activeName = "first";
        // this.statec2 = "TVC-2"
        this.statec = "TVC-2";
      }
    },
    cancel(formName) {
      activeName: "first";
    }
  }
};
</script>
