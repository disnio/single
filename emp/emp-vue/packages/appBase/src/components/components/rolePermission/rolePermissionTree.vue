<!--
 * @文件用途说明: 角色管理组织树
 * @作者姓名: 阿彪
 * @制作日期 2020-03-23  
 * @用法如下
 *    <role-ermissionTree
 *        :type="type"
 *        :isNative="false"
 *        @callback="getNodeData"
 *     ></role-ermissionTree>
 -->

<template >
  <div>
      <el-card class="box-card">
        <div slot="header" class="clearfix" v-if="isSearch">
          <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
        </div>
        <div :style="'height:' + (tableHeight +70) + 'px'">
          <div class="tree">
            <el-scrollbar>
              <el-tree
                class="filter-tree"
                :data="treeData"
                node-key="id"
                highlight-current
                :props="defaultProps"
                :filter-node-method="filterNode"
                ref="groupTrees"
                @node-click="getNodeData"
                :render-content="isNative?null:renderContent"
              >
              </el-tree>
            </el-scrollbar>
          </div>
        </div>
      </el-card>
  </div>
</template>

<script>
import {
  fetchOrgTree
} from "@/common/api/admin/orgStruManage/index";
import { mapGetters } from "vuex";

export default {
  name: "rolePermissionTree",
  props: {
    isSearch: {//是否展示模糊查询框,展示：true，隐藏：false;
      default: true,
      type: Boolean
    },
    isNative:{//是否展示原生树样式,原生：true，自定义：false; 
      default: true,
      type: Boolean
    },
    type: {//tab切换类型，电力市场业务：1，系统管理：2，营销管控业务：6，现货交易：8;
      default: "1"
    }
  },
  data() {
    return {
      filterText: "",
      treeData: [],
      defaultProps: {
        children: "children",
        label: "label"
      },
      listQuery: {
        // groupType: this.type,
        // orgId: '003002',
        // userId: '1'
      }
    };
  },
  computed: {
    ...mapGetters(['tableHeight'])
  },
  watch: {
    filterText(val) {
      this.$refs.groupTrees.filter(val);
    }
  },
  created() {
    if (this.treeData.length == 0) {
      this.getList();
    }
  },

  methods: {
    /**
     * 根据用户输入关键字模糊匹配组织公司 
     * @param {String}: value用户输入内容
     * @param {Array}: data检索出的树节点数据
     * @return: 根据用户输入关键字匹配出的树节点数据
     * @author 阿彪 2020-03-23 15:49:08
     */
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    /**
     * 根据用户点击的树节点调用到父级对应函数并传该节点数据
     * @param {String}: 
     * @param {Array}: data用户所点击节点数据
     * @return: data用户所点击节点数据
     * @author 阿彪 2020-03-23 15:52:23
     */
    getNodeData(data) {
      this.$emit('callback',data);
    },
    /**
     * 自定义组织树样式
     * @param {String}:h： element tree组件固定参数
     * @param {Array}: { node, data, store } element tree组件固定参数
     * @return: 自定义标签
     * @author 阿彪 2020-03-23 15:54:46 
     */
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
    },
    /**
     * 获取组织树数据
     * @param {String}: 无
     * @param {Array}: 无
     * @return: 组织树数据
     * @author 阿彪 2020-03-23 16:00:14
     */
    getList() {
      fetchOrgTree(this.listQuery).then(data => {
        // if(!data.success)return;
        this.treeData = data;
      });
    },

  }
};
</script>

<style scoped>
</style>