<template>
  <div class="app-container calendar-list-container">
    <span style="display:block;">客户标签</span>
    <div class="customer-tag-con pd10" style="margin:-17px auto" v-loading="listLoading">
    <el-tag  v-for="(item,index) in tags" :key="index"  :class="'customer-tag customer-tag-value'+item.labelType">{{item.labelName}}</el-tag>
  </div>
  </div>
</template>
<script>
import { getCustomerTagsByCustomerId } from "@common/api/customer/customerTag";
import { mapGetters } from "vuex";
export default {
  name: "customerTags",
    props: {
    customerId: {
      type: String
    }
  },
  data() {
    return {
      tags: [],
      currentCustomerId: this.customerId,
      listLoading:false,
      listPageInfo:{}
    };
  },
  watch: {
    customerId(val) {
      this.currentCustomerId = val;
      //获取tableList
      this.getList();
    }
  },
  created() {
     this.getList();
  },
  computed: {
    ...mapGetters(["elements"])
  },
  methods: {
    getList(){
      this.listPageInfo.customerId = this.currentCustomerId;
        getCustomerTagsByCustomerId(this.listPageInfo).then(res => {
        // console.log(res);
        this.listLoading = false;
        if(res){
          this.tags = res;

        }else{
           this.$notify({
                title: "失败",
                message: res.msg,
                type: "warning",
                duration: 2000
              });
        }
      });
    }
  }
};
</script>

<style scoped>

</style>
