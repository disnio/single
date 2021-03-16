<!--
 * @Author: fengzp
 * @Date: 2020-11-19 10:02:37
 * @LastEditors: fengzp
 * @LastEditTime: 2020-11-24 14:05:55
 * @Introduce: Do not edit
-->

<template>
  <el-cascader
    ref="selOrgId"
    v-model="orgName"
    :options="treeData"
    :props="{ checkStrictly: true }"
    @change="changeOrgSelect"
    :show-all-levels="false"
    :filterable="true"
    style="line-height:28px;width:160px;"
    :disabled="disabled"
  ></el-cascader>
</template>

<script>
/**
 * @file: org.vue
 * @description: 组织封装
 * @author: wsc
 * @date: 2020-11-10
 */
import {fetchTree} from "@common/api/admin/orgStruManage/index";
import {getUserOrgInfo} from "@common/api/public/index";

export default {
  name: "org",
  data() {
    return {
      orgName: "",
      orgId: "",
      treeData: [],
      treeDataAll: [],
    };
  },

  created() {
    this.getTreeList();
    this.getUserOrg();
  },
  watch: {
    values: {
      immediate: true,
      handler(n) {
        this.orgId = n;
      },
    }
  },
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    values: {
      type: String
    }
  },
  methods: {
    getUserOrg() {
      getUserOrgInfo().then((res) => {
        let org = res[res.length - 1];
        this.orgName = org.orgName;
        this.orgId = org.id;
        this.$emit("update:orgId", this.orgId);
      });
    },
    getTreeList() {
      fetchTree().then((data) => {
        this.treeData = this.reSetTree(data);
        this.setTreeDataAll(this.treeData);
      });
    },

    reSetTree(data) {
      let treeData = [];
      data.forEach((item) => {
        let dataInfo = {};
        dataInfo.id = item.id;
        dataInfo.value = item.label;
        dataInfo.label = item.label;
        dataInfo.orgName = item.orgName;
        dataInfo.parentId = item.parentId;
        if (item.children.length > 0) {
          dataInfo.children = this.reSetTree(item.children);
        }
        treeData.push(dataInfo);
      });
      return treeData;
    },
    setTreeDataAll(data) {
      data.map((item) => {
        if (typeof item.children != "undefined") {
          this.setTreeDataAll(item.children);
        }
        this.treeDataAll.push({
          id: item.id,
          label: item.label,
          parentId: item.parentId,
          orgName: item.orgName,
          value: item.orgName,
        });
      });
    },

    getOrgId() {
      let orgName = this.orgName[this.orgName.length - 1];
      let orgInfo = this.treeDataAll.filter((v) => v.orgName === orgName);
      if (orgInfo[0].id !== undefined) {
        return orgInfo[0].id;
      }
    },

    changeOrgSelect(val) {
      if (val) {
        if (val.length === 0) {
          this.orgId = "";
        } else {
          if (this.treeData !== "") {
            this.orgId = this.getOrgId();
          }
        }
        if (this.$refs.selOrgId) {
          this.$refs.selOrgId.dropDownVisible = false;
          //监听值发生变化就关闭它
        }

        this.$emit("update:orgId", this.orgId);
      }
    },

  },
}
</script>
