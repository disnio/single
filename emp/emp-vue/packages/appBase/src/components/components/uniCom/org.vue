<template>
  <el-cascader
    ref="selOrgId"
    v-model="orgName"
    :options="treeData"
    :props="{ checkStrictly: true }"
    @change="changeOrgSelect"
    :show-all-levels="false"
    :filterable="true"
    :clearable="clear"
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
import {fetchTree} from '@common/api/admin/orgStruManage/index';
import {getUserOrgInfo} from '@common/api/public/index';
import {mapGetters} from "vuex";
import { arrayToTree } from 'performant-array-to-tree'

export default {
  name: 'org',
  data() {
    return {
      orgName: '',
      orgId: '',
      treeData: [],
      treeDataAll: [],
    };
  },
  computed: {
    // ...mapGetters(['orgId']),
  },

  mounted() {
    setTimeout(() => {
      this.getTreeList();
      this.getUserOrg();
    }, 100)

  },
  watch: {
    values: {
      immediate: true,
      handler(n) {
        this.orgId = n;
      },
    },
  },
  props: {
    only: false,
    disabled: {
      type: Boolean,
      default: false,
    },
    clear: {
      type: Boolean,
      default: true,
    },
    values: {
      type: String,
    },
  },
  methods: {
    getUserOrg() {
      getUserOrgInfo().then((res) => {
        let org = res[res.length - 1];
        this.orgName = org.orgName;
        this.orgId = org.id;
      });
    },
    selTr(tr, id){
      let res;
      let tt = _.filter(tr, v=>{
        return _.includes(v.id, id)
      });

      let p = _.find(tt, v=>v.id === id);
      p.parentId = null;
      res = arrayToTree(tt, { dataField: null, childrenField:"children" })

      return res;
    },

    getTreeList() {
      fetchTree().then((data) => {
        this.treeData = this.reSetTree(data);
        this.setTreeDataAll(this.treeData);

        if(this.only){
          let ee = this.selTr(this.treeDataAll, this.values);
          this.treeData = ee ? ee: [];
        }
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
        if (typeof item.children != 'undefined') {
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
          this.orgId = '';
        } else {
          if (this.treeData !== '') {
            this.orgId = this.getOrgId();
          }
        }
        if (this.$refs.selOrgId) {
          this.$refs.selOrgId.dropDownVisible = false;
          //监听值发生变化就关闭它
        }

        this.$emit('update:orgId', this.orgId);
      }
    },
  },
};
</script>
