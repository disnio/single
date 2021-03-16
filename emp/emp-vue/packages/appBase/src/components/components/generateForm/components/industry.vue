<template>
  <el-cascader
    ref="cascade"
    :props="{ checkStrictly: true }"
    v-model="codeArr"
    :placeholder="disabled ? '' : '请选择'"
    :options="list"
    @change="changeForm"
    :show-all-levels="false"
    :filterable="true"
    :clearable="true"
    style="line-height: 28px; width: 100%"
    :disabled="disabled"
  ></el-cascader>
</template>

<script>
import {customerIndustryObj} from "@common/api/customer/tMdataCustomer/index";

export default {
  name: "Industry",
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    values: {
      type: Array,
      default: []
    }
  },

  watch: {
    values: {
      immediate: true,
      handler: function (n, o) {
        if (n !== o) {
          this.codeArr = n;
        }
      },
    },
  },
  data() {
    return {
      codeArr: "",
      list: [],
      listAll: []
    }
  },
  created() {
    this.getTreeList();
  },
  methods: {
    changeForm(val) {
      // 选中所属行业时关闭下拉框
      if (this.$refs.cascade) {
        //监听值发生变化就关闭它
        this.$refs.cascade.dropDownVisible = false;
      }

      this.$emit("update:industry", val);
    },
    //所属行业
    setIndustry(data) {
      return data.map(v => {
        if (v.children.length > 0) {
          v.children = this.setIndustry(v.children);
        }
        return v
      });
    },
    //所有行业的多有数据
    setLists(data) {
      this.listAll = data.map(v => {
        if (typeof v.children != "undefined") {
          this.setLists(v.children);
        }
        return {
          id: v.id,
          label: v.label,
          parentId: v.parentId,
          propName: v.propName,
          propCode: v.propCode,
          value: v.propName,
        }
      });
    },
    //获取所属行业数据
    getTreeList() {
      customerIndustryObj().then((data) => {
        this.list = this.setIndustry(data);
        this.setLists(this.list);
      });
    },

  }
}
</script>

<style scoped>

</style>
