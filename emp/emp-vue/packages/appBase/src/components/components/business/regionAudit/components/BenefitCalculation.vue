<template>
  <div class="app-container calendar-list-container">
    <!-- 宽度待调整 -->
    <el-dialog v-drag :close-on-click-modal="false"
      :width="layoutInfo.width + 'px'"
      custom-class="dialog-max"
      title="方案效益测算"
      :visible.sync="DialogVisible"
      :modal-append-to-body="false"
    >
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="发电侧" name="first">
          <fdbenefit-calculation
            :orgInfo="orgInfo"
            :fdtableList="this.fdtableList"
            ref="fdbenefitCalculation"
            :announcementInfo="announcementInfoData"
            :unitMap="unitMap"
          ></fdbenefit-calculation>
        </el-tab-pane>
        <el-tab-pane
          v-if="announcementInfoData.tradeWayCode != 'jyfs03'"
          label="售电侧"
          name="second"
        >
          <sdbenefit-calculation
            :orgInfo="orgInfo"
            :sdtableList="this.sdtableList"
            ref="sdbenefitCalculation"
            :announcementInfo="announcementInfoData"
            :unitMap="unitMap"
          ></sdbenefit-calculation>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { parseTime } from "@common/utils/index";
import { initLayoutInfo } from "@common/utils/init";

export default {
  name: "benefitCalculation",
  props: {
    // schemeInfo: { type: Object },
    announcementInfo: { type: Object },
    orgInfo: {
      type: Object
    },
    unitMap: { type: Object }
  },
  data() {
    return {
      fdtableList:[],
      sdtableList:[],
      schemeInfo:{},
      rowInfo:"",
      activeName: "first",
      DialogVisible: false,
      layoutInfo: {},
      announcementInfoData: this.announcementInfo,
      programmeTabsValue: ""
    };
  },
  watch: {
    announcementInfo(val) {
      this.announcementInfoData = val;
    }
  },
  components: {
    "sdbenefit-calculation": () => import("./sdBenefitCalculation"),
    "fdbenefit-calculation": () => import("./fdBenefitCalculation")
  },
  mounted() {
    const that = this;
    this.layoutInfo = initLayoutInfo();
    window.onresize = function temp() {
      that.layoutInfo = initLayoutInfo();
    };
  },
  computed: {
    ...mapGetters(["elements"])
  },
  created() {
    
  },
  methods: {
    //显示窗口
    showDialog(data, schemeNameCode,announcementInfoData) {
      this.rowInfo = announcementInfoData;
      
      this.DialogVisible = true;
      (this.schemeInfo = data), (this.programmeTabsValue = schemeNameCode);
      setTimeout(() => {
         this.$refs["fdbenefitCalculation"].showDialog(
          this.schemeInfo,
          this.programmeTabsValue,
        );
      }, 1000);
     
    },
      //设置表格数据
    fdsetList(data) {
      this.fdtableList = []
      this.fdtableList = data;
      
    },
    sdsetList(data) {
      this.sdtableList = []
      this.sdtableList = data;
      
    },
    close() {
      this.DialogVisible = false;
    },
    handleClick(tab, event) {
      if (tab.name == "first") {
        this.$refs["fdbenefitCalculation"].showDialog(
          this.schemeInfo,
          this.programmeTabsValue,
        );
      } else {
        this.$refs["sdbenefitCalculation"].showDialog(
          this.schemeInfo,
          this.programmeTabsValue,
        );
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.w-half {
  width: 80px !important;
}
.lm-title {
  height: 45px;
  //margin-bottom: 25px;
  line-height: 45px;
  background-color: #e9e8e8;
  color: #999999;
  font-weight: bold;
}

.statistics_thire {
  padding-left: 20%;
  margin-top: 5px;
  //text-align: center;
  color: red;
}
//边框
.border-style {
  border: 1px solid #d6d6d6;
}

//左侧统计数据信息样式
.statistics-left-name {
  height: 45px;
  padding-left: 20%;
  line-height: 45px;
  font-family: "Microsoft YaHei";
  color: #545454;
}

.statistics-left-data {
  padding-left: 20%;
  font-size: 30px;
  color: #999999;
}

.compared-data {
  font-size: 15px;
  color: #999999;
}

//下方4个样式
.title-1,
.title-2,
.title-3,
.title-4,
.title-5,
.title-6 {
  font-size: 20px;
  height: 45px;
  color: #fff;
  text-align: center;
  line-height: 45px;
  font-weight: bold;
}
.title-1 {
  background: #00cc99;
}

.title-2 {
  background: #17a4de;
}

.title-3 {
  background: #ff9900;
}
.title-4 {
  background: #1abc9c;
}
.title-5 {
  background: #9820ff;
}
.title-6 {
  background: #20a0ff;
}

//下方字体统一样式
.data-info {
  background: #f2f2f2;
  height: 45px;
  text-align: center;
  line-height: 45px;
  color: #666565;
}

//箭头颜色
.iconStyle-green {
  color: green;
  font-size: 20px;
}
.iconStyle-red {
  color: red;
  font-size: 20px;
}
.number-font-style {
  font-size: 20px;
  font-weight: 700;
}
.el-input-number {
  line-height: 26px;
}
</style>
