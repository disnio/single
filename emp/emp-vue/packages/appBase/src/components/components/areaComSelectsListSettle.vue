<template>
  <div class="app-container " style="display:inline-block;">
    <el-form :inline="true" :model="searchListQuery" label-width="73px">
      <!-- <el-form-item label="区域">
        <el-select
          :disabled="isDisabled.area"
          v-model="searchListQuery['area']"
          placeholder="区域"
          style="width:160px"
          :clearable="true"
          @change="changeArea"
          @clear="clearOrg('area')"
        >
          <el-option
            v-for="item in areaOptions"
            :key="item.propCode"
            :label="item.orgName"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item> -->
      <!-- 2019-11-04   #2524  秦侯珍 查询筛选条件“区域公司”“发售电公司”显示名称统一修改为公司简称 start-->
      <!-- <el-form-item label="区域公司">
        <el-select
          :disabled="isDisabled.areaCom"
          v-model="searchListQuery['areaCom']"
          placeholder="请选择区域公司"
          @change="changeAreaCom"
          :clearable="true"
          @clear="clearOrg('areaCom')"
          style="width:160px"
        >
          <el-option
            v-for="item in areaComOptions"
            :key="item.propCode"
            :label="item.orgSname"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item> -->
      <!-- 2019-11-04   #2524  秦侯珍 查询筛选条件“区域公司”“发售电公司”显示名称统一修改为公司简称 end-->
      <el-form-item label="组织名称">
        <el-select
          :disabled="isDisabled.orgPowerPlant"
          class="four-col left"
          :clearable="true"
          v-model="searchListQuery['orgPowerPlant']"
          @change="changeOrg"
          @clear="clearOrg('orgPowerPlant')"
          placeholder="请选择"
          style="width:160px"
        >
          <el-option
            v-for="item in powerPlantOptions"
            :key="item.propCode"
            :label="item.orgName"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getUserOrgInfo,getOrgIdByCode } from "@common/api/public/index";
import { getAllOrgByPorgId } from "@common/api/decisionSupport/customerRenew/index";
export default {
  name: "orgSelects",
  props: {
    attributeType: {
      type: String,
      default: "chart"
    },
    orgCode:{
      type: String,
    }
  },
  data() {
    return {
      orgIdCur:"",
      orgCodeCur:this.orgCode,
      selectedId: "",
      orgInfo:this.userOrgInfo,
      searchListQuery: {
        area: "",
        areaCom: "",
        orgPowerPlant: ""
      },
      isDisabled: {
        area: true,
        areaCom: true,
        orgPowerPlant: true
      },
       powerPlantOptions: [] //分公司
    };
  },
   watch: {
    userOrgInfo: {
      handler(newVal, oldVal) {
        this.orgInfo=newVal;
        this.getInfo(newVal);
      },
      immediate: true,
      deep: true
    },
    orgCode(val){
      this.orgCodeCur = val;
    }
  },
  computed: {
    ...mapGetters(["userOrgInfo"])
  },
  mounted() {},
  methods: {
    // #4329 gaoaining 2020-06-17
    getInfo(response) {
      //当有区域公司时就
      if(response.length >= 3){
        this.orgIdCur = response[response.length - 1].id
        this.initOrg(response[response.length - 1].id);
        if(response.length == 3){
          this.isDisabled.orgPowerPlant = false;
          this.getData(response[2].id)
        }else{
          this.isDisabled.orgPowerPlant = true;//组织名称置灰
          this.searchListQuery.orgPowerPlant = response[3].orgName;
        }
        
      }else{
        this.isDisabled.orgPowerPlant = false;//组织名称未置灰
        getOrgIdByCode(this.orgCodeCur).then(res=>{
          this.orgIdCur = res.data  
          this.initOrg(this.orgIdCur);
          this.getData(this.orgIdCur)
        })
      } 
    },

    getData(id){
      let parmes = {
        pOrgId: id,
        attributeTypeCode: "zzjgsx01"
      };
      getAllOrgByPorgId(parmes).then(res => {
        this.powerPlantOptions = res;
      });
    },
    
    //初始化组织传参
    initOrg(val) {
      this.$emit("initOrg", val);
    },
    // #4329 gaoaining 2020-06-17
    changeOrg(val) {
      this.$emit("select", val);
    },
    clearOrg(type) {
      if (type == "area") {
        this.$emit("select", "");
      } else if (type == "areaCom") {
        this.$emit("select", this.searchListQuery.area);
      } else if (type == "orgPowerPlant") {
        this.$emit("select", this.orgIdCur);
      }
    },
    
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
