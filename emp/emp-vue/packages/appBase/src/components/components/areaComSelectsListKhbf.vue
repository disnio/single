<template>
  <div class="app-container " style="display:inline-block;">
    <el-form :inline="true" :model="searchListQuery" label-width="73px">
      <el-form-item label="区域">
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
      <!-- 2019-11-04   #2524  秦侯珍 查询筛选条件“区域公司”“发售电公司”显示名称统一修改为公司简称 end-->
      <!-- <el-form-item label="组织名称">
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
      </el-form-item> -->
    </el-form>
  </div>
</template>

<script>
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
        //20191105 #2578 #2576  #2575 阿彪 如果在mounted去执行getInfo函数orgInfo有可能空值，导致页面获取列表时orgid参数为空获取所有数据，故在此处调用。 
        this.getInfo(newVal);
      },
      immediate: true,
      deep: true
    }
  },
  computed: {
    ...mapGetters(["userOrgInfo"])
  },
  mounted() {},
  methods: {
    setOptions(type, items, state,dataType) {
      let ids=[];
    
      items.forEach((item,index) => {
        //   ids.push(item.id)
        if (type === "areaOptions") {
          this.isDisabled.area = state;
          this.areaOptions.push(item);
        //   this.setOrgSelect("areaOptions", response[1]);
          if(index==0){
              let parame = {
            pOrgId: item.id
      };
      // #3475 集团账号登陆系统，查询区域条件应为空
              // this.$set(this.searchListQuery,'area',item.id);
              // this.getOrgData("areaComOptions", parame, false,dataType);
          }
        } else if (type === "areaComOptions") {
          this.isDisabled.areaCom = state;
          this.areaComOptions.push(item);
           if(index==0){
                    let parame = {
        pOrgId: item.id
      };
            if(dataType=="init"){
            this.initOrg(item.id);
      }
              this.changeOrg(item.id);//解决问题：当选择区域后区域公司默认第一个，但是点击查询传给后台是区域的orgId并非区域公司的orgId; 阿彪 191022
              this.$set(this.searchListQuery,'areaCom',item.id);
              this.getOrgData("powerPlantOptions", parame, false,dataType);
          }
        } else {
        }
        if (type === "powerPlantOptions") {
          this.isDisabled.orgPowerPlant = state;
          this.powerPlantOptions.push(item);
        }
      });
    //     if(dataType=="init"){
    //         this.initOrg(ids.join(","));
    //   }else{
    //         this.changeOrg(ids.join(","));
    //   }
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
      // console.log(response.length,171);
      
          this.areaOptions = [];
          this.areaComOptions = [];
        if (response.length == 1) {
          this.isDisabled.area = false;
          this.isDisabled.areaCom = false;
          let parame = {
            pOrgId: response[0].id,
            attributeTypeCode: "zzjgsx05"
          }; 
          this.getOrgData("areaOptions", parame, false,'init');
        //   this.initOrg("");
        } else if (response.length == 2) {
          this.isDisabled.area = true;
          this.isDisabled.areaCom = false;
          this.setOrgSelect("areaOptions", response[1]);
          this.searchListQuery.area = response[1].id;
          this.initOrg(response[1].id);
          let parame = {
            pOrgId: response[1].id,
            attributeTypeCode: "zzjgsx03"
          };

          this.getOrgData("areaComOptions", parame, false,'init');
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
          };
          
          this.getOrgData("powerPlantOptions", parame, false,'init');
        } else if (response.length == 4) {
          this.isDisabled.area = true;
          this.isDisabled.areaCom = true;
          this.isDisabled.orgPowerPlant = true;
          this.setOrgSelect("areaOptions", response[1]);
          this.setOrgSelect("areaComOptions", response[2]);
          this.searchListQuery.area = response[1].id;
          this.searchListQuery.areaCom = response[2].id;
        //   this.searchListQuery.orgPowerPlant = response[3].id;
          this.initOrg(response[2].id);
        }
    },
    //点击区域获取区域公司数据
    changeArea(val) {
      this.powerPlantOptions = [];
      this.areaComOptions = [];
      this.searchListQuery.orgPowerPlant = "";
      this.searchListQuery.areaCom = "";
      this.isDisabled.areaCom = false;
      this.isDisabled.orgPowerPlant = false;
      if (val == "") return false;
       this.changeOrg(val);
      let parame = {
        pOrgId: val,
        attributeTypeCode: "zzjgsx03"
      };
      this.getOrgData("areaComOptions", parame, false,'change');
    },
    //点击区域公司获取电厂数据
    changeAreaCom(val) {
      this.searchListQuery.orgPowerPlant = "";
      this.powerPlantOptions = [];
      this.isDisabled.orgPowerPlant = false;
      if (val == "") return false;
      this.changeOrg(val);
      let parame = {
        pOrgId: val
      };
      this.getOrgData("powerPlantOptions", parame, false,'change');
    },
    //获取org数据
    getOrgData(type, parame, state,dataType) {
      getAllOrgByPorgId(parame).then(res => {
        if (res.length > 0) {
          this.setOptions(type, res, state,dataType);
        }
      });
    },
    changeOrg(val) {
      this.$emit("select", val);
    },
    initOrg(val) {
      this.$emit("initOrg", val);
    },
    clearOrg(type) {
        // console.log(type,266);
        
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
