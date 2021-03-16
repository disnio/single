<!--
 * @功能描述: 查询条件
 * @版本: 1.0.0
 * @作者: 李志佳
 * @Date: 2020-01-21 10:26:56
 * @最新修改内容: 
 * @LastEditTime: 2020-08-25 14:31:53
 -->
<template>
  <div class="filter-container" style="display:inline">
    <!--  #4168 #4170 #4167  gaoaining 2020-06-02 修改文字 start -->
    <el-form :inline="true" :model="searchListQuery" label-width="80px" style="display:inline;">
      <el-form-item label="发布地区">
        <el-select
          v-model="searchListQuery['publishProCode']"
          placeholder="请选择发布地区"
          style="width:160px"
          :clearable="true"
          @change="changeQuery($event,'publishProCode')"
          @clear="clearQuery('publishProCode')"
        >
          <el-option
            v-for="(item,key) in publishPros"
            :key="key"
            :label="item.propName"
            :value="item.propCode"
          ></el-option>
        </el-select>
      </el-form-item>
<!-- #4168 #4170 #4167 gaoaining 2020-06-02 修改文字 end -->
      <el-form-item label="发文机构">
        <el-select
          v-model="searchListQuery['publishMech']"
          placeholder="请选择发布机构"
          style="width:160px"
          :clearable="true"
          @change="changeQuery($event,'publishMech')"
          @clear="clearQuery('publishMech')"
        >
          <el-option
            v-for="(item,key) in publishMechs"
            :key="key"
            :label="item.propName"
            :value="item.propCode"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="发布时间">
        <el-date-picker
          style="width:160px"
          type="date"
          placeholder="日期选择"
          v-model="searchListQuery['publishTime']"
          @change="changeQuery($event,'publishTime')"
          @clear="clearQuery('publishTime')"
        ></el-date-picker>
      </el-form-item>

      <el-form-item label="文件类型">
        <el-select
          v-model="searchListQuery['fileSort']"
          placeholder="请选择文件类型"
          style="width:160px"
          :clearable="true"
          @change="changeQuery($event,'fileSort')"
          @clear="clearQuery('fileSort')"
        >
          <el-option
            v-for="item in sortOptions"
            :key="item.propCode"
            :label="item.propName"
            :value="item.propCode"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="发文年度">
         <el-date-picker
          style="width:160px"
          type="year"
          placeholder="日期选择"
          v-model="searchListQuery['publishYear']"
          @change="changeQuery($event,'publishYear')"
          @clear="clearQuery('publishYear')"
        ></el-date-picker>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
import { getSelectList } from "@common/api/base";
import { parseTime } from "@common/utils/index";

export default {
  name: "queryCriteria",
  props: {
    attributeType: {
      type: String,
      default: "chart"
    }
  },
  data() {
    return {
      searchListQuery: {
        publishProCode: "",
        publishMech: "",
        fileSort:"",
        publishTime:"",
        publishYear:"",
      },
      publishPros: [],
      publishMechs: [],
      sortOptions: [],
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      getSelectList("province").then(res => {
        this.publishPros = res;
      });
      getSelectList("publish_mech").then(res => {
        this.publishMechs = res;
      });
      getSelectList("file_sort").then(res => {
        this.sortOptions = res;
      });
      this.$emit("init");
    },
    changeQuery(val,name) {
      let queryVal = '';
      if(name == 'publishTime'){
        if(val){
          queryVal = parseTime(val, "{y}-{m}-{d}");
        }
      }else if(name == 'publishYear'){
        if(val){
          queryVal = parseTime(val, "{y}");
        }
      }else{
        queryVal = val;
      }
      this.$emit('select', name, queryVal);
    },
    clearQuery(type) {
      this.$emit("select", type, "");
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>





