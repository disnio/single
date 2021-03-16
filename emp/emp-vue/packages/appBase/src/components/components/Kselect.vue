<template>
  <div>
              <el-select class="four-col left" v-model="selected" placeholder="请选择"  @change="changeSelect" >
                    <el-option 
                    v-for="item in items" 
                    :key="item.propCode"  
                    :label="item.propName" 
                    :value="item.propCode"   
                    >
                    </el-option>
                </el-select></div>
</template>

<script>
import {getSelectList} from '@common/api/base';
export default {
  props:{
     propCode:{type:String},
  },
  data() {
    return {
      items: [],
      selected:""
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
       getSelectList(this.propCode).then(res => {
            let firstList={
              propName:"--请选择--",
            }
            res.unshift(firstList);
            this.items = res;
     });
    },
    changeSelect(){
          this.$emit('setSelected',selected,this.propCode);
    },
   
  }
};
</script>

<style scoped>
</style>