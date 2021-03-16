<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>区域列表</span>
      </div>
      <!-- 新增滚动条 -->
      <div :style="'height:' + (scrollbarHeight - 5+250) + 'px'">
        <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
        <div class="tree">
          <el-scrollbar style="height:100%">
            <el-tree
              class="filter-tree"
              :data="treeData"
              node-key="id"
              highlight-current
              :props="defaultProps"
              :filter-node-method="filterNode"
              ref="menuTree"
              :render-content="renderContent"
              @node-click="getNodeData"
            ></el-tree>
          </el-scrollbar>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { fetchOrgTree } from "@common/api/admin/user/index";
export default {
  name: "Tree",
  props: {
    scrollbarHeight: Number,
    attributeType: {
      type: String
    }
  },
  data() {
    return {
      filterText: "",
      defaultProps: {
        children: "children",
        label: "label"
      },
      treeData: [],
      orgId: ""
    };
  },
  watch: {
    filterText(val) {
      this.$refs.menuTree.filter(val);
    }
  },
  created() {
    this.getTreeList();
  },
  methods: {
    getTreeList() {
      fetchOrgTree().then(data => {
        //获取左侧树
        this.treeData = data;
      });
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    getNodeData(data) {
      /*点击树 */
      if (data.icon == "icon1") {
        this.$emit("changeNode", data.id, data.orgName);
      } else {
        this.$emit("changeNode", "-1");
      }
    },

    renderContent(h, { node, data, store }) {
      if (data.icon == "icon1") {
        return (
          <span class="custom-tree-node">
            <i
              style="color:green"
              class="iconfont icon-fangxingxuanzhongfill"
            />
            <span style="margin-left:5px;">{node.label}</span>
          </span>
        );
      } else if (data.icon == "icon2") {
        return (
          <span class="custom-tree-node">
            <i class="iconfont icon-fangxingxuanzhongfill" />
            <span style="margin-left:5px;">{node.label}</span>
          </span>
        );
      } else if (data.icon == "icon3") {
        return (
          <span class="custom-tree-node">
            <i style="color:blue" class=" iconfont  icon-jianhao" />
            <span style="margin-left:5px;">{node.label}</span>
          </span>
        );
      }
    }
  }
};
</script>

<style lang="scss" scoped>
/* 20191030树横向滚动条样式 */
.el-tree {
  min-width: 100%;
  display: inline-block !important;
}
.tree {
  overflow-y: hidden;
  overflow-x: scroll;
  width: 300px;
  height: 550px;
}
</style>