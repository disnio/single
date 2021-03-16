/**
 * @file: htb.js
 * @return {type} argName - description
 * @description: 所有的初始混入
 * @author: wsc
 * @date: 2020-10-23
 */
import {mapGetters} from "vuex";
import {initLayout, initLayoutInfo} from "@common/utils/init";
import sortTb from "../sortTb";
import {getUnitMap, initDialogHeight} from "@common/utils/index";
const htb = {
  components: {
    "sort-tb": sortTb
  },
  data() {
    return {
      unitMap:{},
      // el-scrollbar 外的高度
      scrollbarHeight:0,
      tabHeight: 0,
      dialogHeight: 0,
      layoutInfo: {},
      tabWidth: 100
    }
  },
  created() {
    this.setLayoutHeight();

    this.scrollbarHeight = initLayout() - 120;
    window.onresize = function temp() {
      this.scrollbarHeight = initLayout() - 120;
    };
  },
  mounted() {
    const that = this;
    this.dialogHeight = initDialogHeight();
    this.layoutInfo = initLayoutInfo();
    this.setTabWidth();
    window.onresize = function temp() {
      that.dialogHeight = initDialogHeight();
      that.layoutInfo = initLayoutInfo();
      that.setTabWidth();
    };
  },
  computed: {
    ...mapGetters(["userName", "orgId", "elements", "allSubMenus",])
  },
  methods: {
    setLayoutHeight() {
      if (typeof this.tabHeight == "undefined") {
        this.tabHeight = 280;
      } else {
        if (this.tabHeight < 300) {
          this.tabHeight = 280;
        }
      }
    },
    //设置列表文件名列宽
    setTabWidth() {
      if (this.layoutInfo.width < 1069) {
        this.tabWidth = 100;
      } else if (this.layoutInfo.width < 1229
        && this.layoutInfo.width > 1069) {
        this.tabWidth = 160;
      } else if (this.layoutInfo.width < 1479
        && this.layoutInfo.width > 1229) {
        this.tabWidth = 300;
      } else if (this.layoutInfo.width > 1479) {
        this.tabWidth = 420;
      }
    },
  }

}

export default htb;
