<template>
  <div>
    <el-col :span="12">
      <el-select
        class="four-col left"
        :filterable="true"
        v-model="provinceCode"
        :placeholder="disabled ? '' : '请选择'"
        @change="changeProvince"
        :disabled="disabled"
      >
        <el-option
          v-for="(item, index) in provinceOptions"
          :key="index"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-col>

    <el-col :span="12">
      <el-select
        class="four-col left"
        :filterable="true"
        v-model="areaCode"
        :placeholder="disabled ? '' : '请选择'"
        :disabled="disabled"
        @change="changeArea"
      >
        <el-option
          v-for="(item, index) in areaOptions"
          :key="index"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-col>

  </div>
</template>

<script>
/**
 * @file: province.vue
 * @description: 省市联动
 * @author: wsc
 * @date: 2020-11-04
 */
import {getSelectList} from "@common/api/base";
import {selectProvince} from "@common/api/customer/tMdataCustomer/index";

export default {
  name: "Province",
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    province: {
      type: String,
      default: ""
    },
    area: {
      type: String,
      default: ""
    },
    event: Object

  },
  data() {
    return {
      provinceCode: "",
      areaCode: "",
      areaOptions: [],
      provinceOptions: []
    }
  },
  watch: {
    values: {
      immediate: true,
      handler: function (n, o) {
        if (!_.isEqual(n, o)) {
          this.provinceCode = n[0];
          this.areaCode = n[1];
          this.changeProvince(n[0])
        }
      },
    },

  },
  created() {
    this.getSelectProvince();
  },
  methods: {
    /**
     * @功能描述: 查询省市
     */
    getSelectProvince() {
      //省市维度
      getSelectList("province").then(res => {
        this.provinceOptions = _.map(res, v => {
          return {
            label: v.propName,
            value: v.propCode
          }
        });
      });
    },

    /**
     * @功能描述: 根据省去查找市
     */
    changeProvince(val) {
      this.provinceCode = val;
      this.areaOptions = [];
      this.areaCode = "";
      this.$emit("update:province", val);
      selectProvince(this.provinceCode).then((res) => {
        this.areaOptions = _.map(res, v => {
          return {
            label: v.propName,
            value: v.propCode
          }
        });
      });
    },

    changeArea(val) {
      this.$emit("update:area", val);
    }
  }
}
</script>

<style scoped>

</style>
