<template>
  <div class="app-container" style="display:inline-block;">
    <el-form :inline="true" :model="searchListQuery" label-width="80px">
      <el-form-item label="区    域">
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
      </el-form-item>
      <!-- 2019-11-04   #2524  秦侯珍 查询筛选条件“区域公司”“发售电公司”显示名称统一修改为公司简称 start-->
      <el-form-item label="区域公司">
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
      </el-form-item>
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
            :label="item.orgSname"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- 2019-11-04   #2524  秦侯珍 查询筛选条件“区域公司”“发售电公司”显示名称统一修改为公司简称 end-->
    </el-form>
  </div>
</template>

<script>
import {
 getValueByOrgIdAndCodeNoDefaultValue
} from "@common/api/balance/index";
import { mapGetters } from "vuex";
import { getUserOrgInfo } from "@common/api/public/index";
import { getAllOrgByPorgId } from "@common/api/decisionSupport/customerRenew/index";
export default {
  name: "orgSelects",
  props: {
    attributeType: {
      type: String,
      default: "chart"
    }
  },
  data() {
    return {
      selectedId: "",
      isDisabled: {
        area: true,
        areaCom: true,
        orgPowerPlant: true
      },
      orgInfo:this.userOrgInfo,
      searchListQuery: {
        area: "",
        areaCom: "",
        orgPowerPlant: ""
      },
      //组织下拉框
      areaOptions: [], //区域
      areaComOptions: [], //区域公司
      powerPlantOptions: [] //子公司
    };
  },
   watch: {
    userOrgInfo: {
      handler(newVal, oldVal) {
        this.orgInfo=newVal;
        //  this.getInfo(newVal);
      },
      immediate: true,
      deep: true
    }
  },
  computed: {
    ...mapGetters(["userOrgInfo", "orgId"])
  },
  mounted() {
    this.init();
  },
  methods: {
   getCycle(){
      let params={
        orgId:this.orgId,
        configurationId:"5",
        parameterCode:"1005002"
      }
      getValueByOrgIdAndCodeNoDefaultValue(params).then(res => {
        if(res.rel){
          this.initCycle(res.data);
        }
      })
    },
    setOptions(type, items, state) {
      items.forEach(item => {
        if (type === "areaOptions") {
          this.isDisabled.area = state;
          this.areaOptions.push(item);
        } else if (type === "areaComOptions") {
          this.isDisabled.areaCom = state;
          this.areaComOptions.push(item);
        } else {
        }
        if (type === "powerPlantOptions") {
          this.isDisabled.orgPowerPlant = state;
          this.powerPlantOptions.push(item);
        }
      });
    },
    init() {
        this.getInfo(this.orgInfo);
     
    },
    //设置已知组织
    setOrgSelect(type, data) {
      if (type === "areaOptions") {
        this.areaOptions.push(data);
      } else if (type === "areaComOptions") {
        this.areaComOptions.push(data);
      } else {
      }
      if (type === "powerPlantOptions") {
        this.powerPlantOptions.push(data);
      }
    },
    
    //获取区域select数据
    getInfo(response) {
          this.areaOptions = [];
          this.areaComOptions = [];
          this.powerPlantOptions = [];
          // console.log(response);
          
        if (response.length == 1) {
          this.isDisabled.area = false;
          this.isDisabled.areaCom = true;
          this.isDisabled.orgPowerPlant = true;
          let parame = {
            pOrgId: response[0].id,
            attributeTypeCode: "zzjgsx05"
          };
          
          this.getOrgData("areaOptions", parame, false);
          this.initOrg("");
        } else if (response.length == 2) {
          this.isDisabled.area = true;
          this.isDisabled.areaCom = false;
          this.isDisabled.orgPowerPlant = true;
          this.setOrgSelect("areaOptions", response[1]);
          this.searchListQuery.area = response[1].id;
          this.initOrg(response[1].id);
          let parame = {
            pOrgId: response[1].id,
            attributeTypeCode: "zzjgsx03"
          };

          this.getOrgData("areaComOptions", parame, false);
        } else if (response.length == 3) {
          this.isDisabled.area = true;
          this.isDisabled.areaCom = true;
          this.isDisabled.orgPowerPlant = false;
          this.setOrgSelect("areaOptions", response[1]);
          this.setOrgSelect("areaComOptions", response[2]);
          this.initOrg(response[2].id);
          this.searchListQuery.area = response[1].id;
          this.searchListQuery.areaCom = response[2].id;
          let parame = {
            pOrgId: response[2].id,
            // #4253 gaoaining  2020-06-13添加传参
            attributeTypeCode: "zzjgsx01"
          };
          
          this.getOrgData("powerPlantOptions", parame, false);
        } else if (response.length == 4) {
          this.isDisabled.area = true;
          this.isDisabled.areaCom = true;
          this.isDisabled.orgPowerPlant = true;
          this.setOrgSelect("areaOptions", response[1]);
          this.setOrgSelect("areaComOptions", response[2]);
          this.setOrgSelect("powerPlantOptions", response[3]);
          this.searchListQuery.area = response[1].id;
          this.searchListQuery.areaCom = response[2].id;
          this.searchListQuery.orgPowerPlant = response[3].id;
          this.initOrg(response[3].id);
        }
           this.getCycle();
    },
    //点击区域获取区域公司数据
    changeArea(val) {
      this.powerPlantOptions = [];
      this.areaComOptions = [];
      this.searchListQuery.orgPowerPlant = "";
      this.searchListQuery.areaCom = "";
      this.isDisabled.areaCom = true;
      this.isDisabled.orgPowerPlant = true;
      if (val == "") return false;
      this.changeOrg(val);
      let parame = {
        pOrgId: val,
        attributeTypeCode: "zzjgsx03"
      };
      this.getOrgData("areaComOptions", parame, false);
    },
    //点击区域公司获取电厂数据
    changeAreaCom(val) {
      this.searchListQuery.orgPowerPlant = "";
      this.powerPlantOptions = [];
      this.isDisabled.orgPowerPlant = true;
      if (val == "") return false;
      this.changeOrg(val);
      let parame = {
        pOrgId: val,
        // #4253 gaoaining  2020-06-14添加传参
        attributeTypeCode: "zzjgsx01"
      };
      this.getOrgData("powerPlantOptions", parame, false);
    },
    //获取org数据
    getOrgData(type, parame, state) {
      getAllOrgByPorgId(parame).then(res => {
        if (res.length > 0) {
          this.setOptions(type, res, state);
        }
      });
    },
    changeOrg(val) {
      this.$emit("select", val);
    },
    initOrg(val) {
      this.$emit("initOrg", val);
    },
    initCycle(val) {
      this.$emit("initCycle", val);
    },
    clearOrg(type) {
      if (type == "area") {
        this.$emit("select", "");
      } else if (type == "areaCom") {
        this.$emit("select", this.searchListQuery.area);
      } else if (type == "orgPowerPlant") {
        this.$emit("select", this.searchListQuery.areaCom);
      }
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
