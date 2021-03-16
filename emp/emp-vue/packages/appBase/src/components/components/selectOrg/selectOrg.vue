<!--
 * @Author: fengzp
 * @Date: 2020-09-21 14:10:10
 * @LastEditors: fengzp
 * @LastEditTime: 2021-01-12 09:20:51
 * @Introduce: 搜索框组织组件
   selectOrg: () => import("@common/components/selectOrg"),
-->
<template>
  <div class="container">
    <el-form :inline="true" :model="searchListQuery">
      <el-form-item :label="labelName" :label-width="labelWidth">
        <el-cascader
          ref="selChange"
          v-model="searchListQuery.orgName"
          :options="treeData"
          :props="{ checkStrictly: true }"
          @change="changeOrgSelect"
          :show-all-levels="false"
          :filterable="true"
          :clearable="false"
          style="line-height:28px;width:160px;"
        ></el-cascader>
      </el-form-item>
      <slot></slot>
      <el-form-item>
        <el-button type="primary" v-if="showBtn" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { fetchTree } from "@common/api/admin/orgStruManage/index";
import { getUserOrgInfo } from "@common/api/public/index";

export default {
  components: {},
  computed: {},
  data() {
    return {
      searchListQuery: {
        orgName: "",
        orgId: "",
      },
      treeData: [],
      treeDataAll: [],
    };
  },
  created() {
    this.getTreeList();
    this.getUserOrgInfo();
  },
  watch: {
    searchListQuery: {
      handler(newValue, oldValue) {
        this.$emit('on-change', this.searchListQuery)
      },
      deep: true
    }
  },
  mounted() {},
  props: {
    showBtn: {
      type: Boolean,
      default: true,
    },
    labelWidth: {
      type: String,
      default: "100px",
    },
    labelName: {
      type: String,
      default: "组织"
    }
  },
  destroyed() {},
  methods: {
    async getUserOrgInfo() {
      await getUserOrgInfo().then((res) => {
        let orgName = res[res.length - 1].orgName;
        this.searchListQuery.orgName = res[res.length - 1].orgName;
        this.searchListQuery.orgId = res[res.length - 1].id;
      });
        this.$emit("on-load", this.searchListQuery);
    },
    async getTreeList() {
      await fetchTree().then((data) => {
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
      let orgName = this.searchListQuery.orgName[
        this.searchListQuery.orgName.length - 1
      ];
      let orgInfo = this.treeDataAll.filter((item) => item.orgName == orgName);
      if (orgInfo[0].id != undefined) {
        return orgInfo[0].id;
      }
    },

    changeOrgSelect(val) {
      if (val.length == 0) {
        this.searchListQuery.orgId = "";
      } else {
        if (this.searchListQuery.treeData != "") {
          let myTreeData = this.getOrgId();
          this.searchListQuery.orgId = myTreeData;
        }
      }
      if (this.$refs.selChange) {
        this.$refs.selChange.dropDownVisible = false; //监听值发生变化就关闭它
      }
      this.$emit("on-change", this.searchListQuery);
    },
    // 点击查询 往外传值
    onSubmit() {
      this.$emit("on-submit", this.searchListQuery);
    },
  },
};
</script>

<style lang='scss' scoped>
</style>
