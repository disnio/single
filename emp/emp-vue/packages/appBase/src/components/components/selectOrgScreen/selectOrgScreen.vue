<!--
 * @Author: zhangp
 * @Date: 2020-11-03 14:10:10
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-09 16:01:47
 * @Introduce: 搜索框组织组件(筛选数据)
   selectOrg: () => import("@common/components/selectOrgScreen"),
-->
<template>
  <div class="container">
    <el-form :inline="true" :model="searchListQuery">
      <el-form-item label="组织" :label-width="labelWidth">
        <el-cascader
          ref="selChange"
          v-model="searchListQuery.orgName"
          :options="treeData"
          :props="{ checkStrictly: true }"
          @change="changeOrgSelect"
          :show-all-levels="false"
          :filterable="true"
          :clearable="true"
          :disabled="isOrgDisabled"
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
import LoginVue from '../../../frames/dashboard/views/Login.vue';

export default {
  components: {},
  computed: {},
  data() {
    return {
      searchListQuery: {
        orgName: "",
        orgId: "",
      },
      isShowOrgType:this.isShowOrgType,
      isOrgDisabled:false,
      treeData: [],
      treeDataAll: [],
    };
  },
  created() {
    this.getUserOrgInfo();
    // this.getTreeList();
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
    isShowOrgType:{
      type: Boolean,
      default: true,
    }
  },
  destroyed() {},
  methods: {
    async getUserOrgInfo() {
      this.isOrgDisabled = false;
      await getUserOrgInfo().then((res) => {
            let orgName = res[res.length - 1].orgName;
            this.searchListQuery.orgId = res[res.length - 1].id;
            this.searchListQuery.orgName = res[res.length - 1].orgName;
      });
       this.$emit("on-load", this.isShowOrgType == true ? this.searchListQuery : {  orgName:"", orgId:""} );
      await this.getTreeList();
       this.searchListQuery.orgId =  this.isShowOrgType == true ? this.searchListQuery.orgId :  "";
       this.searchListQuery.orgName =  this.isShowOrgType == true ? this.searchListQuery.orgName :  "";
    },
    async getTreeList() {
      await fetchTree().then((data) => {
        this.treeData = this.reSetTree(data);
        this.setTreeDataAll(this.treeData);
      });
    },

    reSetTree(data) {
      let treeData = [];
      if(this.searchListQuery.orgId == '001'){
        data.forEach((item) => {
            let dataInfo = {};
            dataInfo.id = item.id;
            dataInfo.value = item.label;
            dataInfo.label = item.label;
            dataInfo.orgName = item.orgName;
            dataInfo.parentId = item.parentId;
            dataInfo.disabled = false;
            if (item.children.length > 0) {
              dataInfo.children = this.reSetTree(item.children);
            }
            treeData.push(dataInfo);
       });
      }else{
         treeData.push(this.nodataCL(data[0]));
         this.organizationHandle(treeData,data);
      }
      return treeData;
    },
    /**
     * @方法名称: organizationHandle  非集团组织数据处理
     * @param {String}: 
     * @param {Array}: 
     * @return {*}
     * @author: 阿朋
     * @Date: 2020-11-03 17:02:42
     * @param {*} treeData
     * @param {*} data
     */
    organizationHandle(treeData,data){
       data[0].children.forEach((item,index) => {
                if(item.id == this.searchListQuery.orgId){
                     treeData[0].children.push(this.dataCL(item))
                    if (item.children.length > 0) {
                          item.children.forEach((item2,index2) =>{
                             treeData[0].children[index].children.push(this.dataCL(item2))
                          })
                     }
                }else{
                     treeData[0].children.push(this.nodataCL(item))
                       if (item.children.length > 0) {
                          item.children.forEach((item3,index3) =>{
                            if(item3.id == this.searchListQuery.orgId){
                               treeData[0].children[index].children.push(this.dataCL(item3))
                            }else{
                               treeData[0].children[index].children.push(this.nodataCL(item3))
                            }
                          })
                     }
                }
         
       });
       return treeData;
    },
    dataCL(item){
          let dataInfo = {};
            dataInfo.id = item.id;
            dataInfo.value = item.label;
            dataInfo.label = item.label;
            dataInfo.orgName = item.orgName;
            dataInfo.parentId = item.parentId;
            if(item.children.length > 0){
                dataInfo.children = [];
            }
            dataInfo.disabled = false;
            return dataInfo
    },
     nodataCL(item){
          let dataInfo = {};
            dataInfo.id = item.id;
            dataInfo.value = item.label;
            dataInfo.label = item.label;
            dataInfo.orgName = item.orgName;
            dataInfo.parentId = item.parentId;
            if(item.children.length > 0){
                dataInfo.children = [];
            }
            dataInfo.disabled = true;
      return dataInfo
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
