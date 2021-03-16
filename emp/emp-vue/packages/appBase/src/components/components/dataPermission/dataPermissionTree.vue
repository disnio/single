<!--
 * @功能描述: #2850 角色管理-功能优化-数据权限配置(权限弹出树)
 * @版本: 
 * @作者: wangc
 * @Date: 2019-11-26 09:53:54
 * @最新修改内容: 
 * @LastEditTime: 2019-12-13 14:23:44
 -->
<template >
  <div>
    <el-tree
      class="filter-tree"
      :data="treeData"
      check-strictly
      show-checkbox
      default-expand-all
      node-key="id"
      highlight-current
      :props="defaultProps"
      :filter-node-method="filterNode"
      ref="dataTree"
      @node-click="getNodeData"
    ></el-tree>
  </div>
</template>

<script>
import { getDimByPropCode } from "@common/api/basicData/electricOrgManager/index";
import {
  dataLimitTree,
  setDataLimitByIds,
  getDimsByElementId,
  selectedDataLimitTree,
  saveRoleResourceDimRelation,
  getDimsByRoleResource
} from "@common/api/admin/element/index";

export default {
  name: "dataPermissionTree",
  props: {
    dataPermissionId: {
      type: Number
    },
    data: {
      type: Object
    },
    type: {
      type: String
    }
  },
  data() {
    return {
      permissionId: this.dataPermissionId,
      treeData: [],
      defaultProps: {
        children: "children",
        label: "propName"
      }
    };
  },
  watch: {
    dataPermissionId(val) {
      this.permissionId = val;
      //this.getList();
    }
  },
  created() {
    this.init();
  },

  methods: {
    init() {
      this.getList(this.data, this.permissionId);
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    getList(dataobj,permissionId) {
      if (this.type == "groupAuthority") {
        selectedDataLimitTree({ resourceId: permissionId }).then(res => {
          this.treeData = res;
          getDimsByRoleResource(dataobj).then(res => {
            const result = [];
            res.data.data.forEach(element => {
              result.push(element.dimId);
            });
            this.$refs.dataTree.setCheckedKeys(result);
          });
        });
      } else if (this.type == "element") {
        dataLimitTree({ propCode: "dataPermission" }).then(res => {
          this.treeData = res;
          getDimsByElementId({ id: permissionId }).then(res => {
            const result = [];
            res.data.data.forEach(element => {
              result.push(element.dimId);
            });
            this.$refs.dataTree.setCheckedKeys(result);
          });
        });
      }
    },
    getNodeData(data) {
      // console.log(data);
    },
    save() {
      const nodes = this.$refs.dataTree.getCheckedNodes();
      const ids = [];
      for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].children.length == 0) {
          ids.push(nodes[i].id);
        }
      }
      if (this.type == "element") {
        setDataLimitByIds({
          id: this.permissionId,
          dataIds: ids.join()
        }).then(() => {
          this.$notify({
            title: "成功",
            message: "保存成功",
            type: "success",
            duration: 2000
          });
        });
      } else if (this.type == "groupAuthority") {
        let data = this.data;
        data.dataIds = ids.join();

        saveRoleResourceDimRelation(data).then(() => {
          this.$notify({
            title: "成功",
            message: "保存成功",
            type: "success",
            duration: 2000
          });
        });
      }
    }
  }
};
</script>

<style scoped>
</style>