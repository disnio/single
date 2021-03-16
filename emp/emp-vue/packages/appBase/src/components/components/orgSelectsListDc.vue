<!--
 * @功能描述: 组织名称为电厂的用户
 * @版本: 
 * @作者: frj
 * @Date: 2019-12-20 14:08:00
 * @最新修改内容: 
 * @LastEditTime: 2020-04-07 16:32:34
 -->
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
          @change="changePowerPlant"
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
      orgInfo: this.userOrgInfo,
      searchListQuery: {
        area: "",
        areaCom: "",
        orgPowerPlant: ""
      },
      //组织下拉框
      areaOptions: [], //区域
      areaComOptions: [], //区域公司
      powerPlantOptions: [], //子公司
      attributeTypeCode: "",
      areacompanycode: ""
    };
  },
  watch: {
    userOrgInfo: {
      handler(newVal, oldVal) {
        this.orgInfo = newVal;
        //20191105 #2578 #2576 #2575 阿彪 如果在mounted去执行getInfo函数orgInfo有可能空值，导致页面获取列表时orgid参数为空获取所有数据，故在此处调用。
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
    setOptions(type, items, state, dataType) {
      let ids = [];

      items.forEach((item, index) => {
        //   ids.push(item.id)
        if (type === "areaOptions") {
          this.isDisabled.area = state;
          this.areaOptions.push(item);
          //   this.setOrgSelect("areaOptions", response[1]);
          if (index == 0) {
            let parame = {
              pOrgId: item.id
            };
            this.$set(this.searchListQuery, "area", item.id);
            this.getOrgData("areaComOptions", parame, false, dataType);
          }
        } else if (type === "areaComOptions") {
          this.isDisabled.areaCom = state;
          this.areaComOptions.push(item);
          if (index == 0) {
            let parame = {
              pOrgId: item.id,
              attributeTypeCode: "zzjgsx02"
            };

            if (dataType == "init") {
              this.attributeTypeCode = "zzjgsx03";
              this.initOrg(item.id);
            }
            this.areacompanycode = item.id;
            this.changeOrg(item.id); //解决问题：当选择区域后区域公司默认第一个，但是点击查询传给后台是区域的orgId并非区域公司的orgId; 阿彪 191022
            this.$set(this.searchListQuery, "areaCom", item.id);
            this.getOrgData("powerPlantOptions", parame, false, dataType);
          }
        } else {
        }
        if (type === "powerPlantOptions") {
          this.isDisabled.orgPowerPlant = state;
          this.powerPlantOptions.push(item);
          if (index == 0) {
            //20191227 阿彪 #3370 给组织名称赋第一个选项为默认值
            this.changeOrg(item.id);
            this.$set(this.searchListQuery, "orgPowerPlant", item.id);
          }
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
      this.areaOptions = [];
      this.areaComOptions = [];
      this.powerPlantOptions = [];
      if (response.length == 1) {
        this.isDisabled.area = false;
        this.isDisabled.areaCom = false;
        this.isDisabled.orgPowerPlant = false;
        let parame = {
          pOrgId: response[0].id,
          attributeTypeCode: "zzjgsx05"
        };
        this.attributeTypeCode = "zzjgsx05";
        this.getOrgData("areaOptions", parame, false, "init");
        //   this.initOrg("");
      } else if (response.length == 2) {
        this.isDisabled.area = true;
        this.isDisabled.areaCom = false;
        this.isDisabled.orgPowerPlant = true;
        this.setOrgSelect("areaOptions", response[1]);
        this.searchListQuery.area = response[1].id;
        this.initOrg(response[1].id, response[1].attributeTypeCode);
        let parame = {
          pOrgId: response[1].id,
          attributeTypeCode: "zzjgsx03"
        };
        this.attributeTypeCode = "zzjgsx03";
        this.getOrgData("areaComOptions", parame, false, "init");
      } else if (response.length == 3) {
        this.isDisabled.area = true;
        this.isDisabled.areaCom = true;
        this.isDisabled.orgPowerPlant = false;
        this.setOrgSelect("areaOptions", response[1]);
        this.setOrgSelect("areaComOptions", response[2]);
        this.initOrg(response[2].id, response[2].attributeTypeCode);
        this.searchListQuery.area = response[1].id;
        this.searchListQuery.areaCom = response[2].id;
        let parame = {
          pOrgId: response[2].id,
          attributeTypeCode: "zzjgsx02"
        };
        this.attributeTypeCode = "zzjgsx02";
        this.getOrgData("powerPlantOptions", parame, false, "init");
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
        this.initOrg(response[3].id, response[3].attributeTypeCode);
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
      this.areacompanycode = "";
      this.attributeTypeCode = "";
      if (val == "") return false;
      this.attributeTypeCode = "zzjgsx03";
      this.changeOrg(val);
      let parame = {
        pOrgId: val,
        attributeTypeCode: "zzjgsx03"
      };

      this.getOrgData("areaComOptions", parame, false, "change");
    },
    //点击区域公司获取电厂数据
    changeAreaCom(val) {
      this.searchListQuery.orgPowerPlant = "";
      this.powerPlantOptions = [];
      this.isDisabled.orgPowerPlant = false;
      this.areacompanycode = "";
      this.attributeTypeCode = "";
      if (val == "") return false;
      this.attributeTypeCode = "zzjgsx03";
      this.areacompanycode = val;
      this.changeOrg(val);
      let parame = {
        pOrgId: val,
        attributeTypeCode: "zzjgsx02"
      };
      this.getOrgData("powerPlantOptions", parame, false, "change");
    },
    //点击区域公司获取电厂数据
    changePowerPlant(val) {
      if (val == "") {
        this.attributeTypeCode = "zzjgsx03";
        return false;
      }
      this.attributeTypeCode = "zzjgsx02";
      this.changeOrg(val);
    },
    //获取org数据
    getOrgData(type, parame, state, dataType) {
      if (type == "powerPlantOptions") {
        this.areacompanycode = parame.pOrgId;
      }
      getAllOrgByPorgId(parame).then(res => {
        if (res.length > 0) {
          this.setOptions(type, res, state, dataType);
        }
      });
    },
    changeOrg(val) {
      // this.attributeTypeCode="zzjgsx05";
      this.$emit("select", val, this.attributeTypeCode, this.areacompanycode);
    },
    initOrg(val) {
      this.$emit("initOrg", val, this.attributeTypeCode);
    },
    clearOrg(type) {
      if (type == "area") {
        this.$emit("select", "", "", "");
      } else if (type == "areaCom") {
        this.$emit(
          "select",
          this.searchListQuery.area,
          this.attributeTypeCode,
          this.areacompanycode
        );
      } else if (type == "orgPowerPlant") {
        this.$emit(
          "select",
          this.searchListQuery.areaCom,
          this.attributeTypeCode,
          this.areacompanycode
        );
      }
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
