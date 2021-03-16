<!--
 * @功能描述: 等待进度
 * @版本: 
 * @作者: 康如涛
 * @Date: 2020-04-26 11:26:54
 * @最新修改内容: 
 * @LastEditTime: 2020-05-15 15:20:44
 -->
<template>
  <div>
    <!-- 进度弹窗 start  -->
    <el-dialog
      :title="textStr"
      :visible.sync="progressDialogVisible"
      width="480px"
      :before-close="handleProgressClose"
      custom-class="default-dialog"
        :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <div style="text-align:center;">
        <el-progress
          v-if="nowProgressVal<100"
          type="circle"
          :percentage="nowProgressVal"
         
        ></el-progress>
        <el-progress v-else type="circle" :percentage="nowProgressVal" :status="status"></el-progress>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleProgressClose" type="primary">关 闭</el-button>
        <!-- <el-button type="primary" @click="progressDialogVisible = false">确 定</el-button> -->
      </span>
    </el-dialog>
    <!-- 进度弹窗 end  -->
  </div>
</template>

<script>
import {closeProgress,setProgressState} from "@common/utils/waitingProgress";
export default {
  name: "WaitingProgress",
  props: {
    waitingTime: {
      type: Number,
      default: 5000
    },
    startTime: {
      type: String,
      default: ""
    },
    isWaiting: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: "1"
    },
    progressVal: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      msg: "",
      msgDialogVisible: false,
      progressDialogVisible: this.isWaiting,
      progressType: this.type,
      nowProgressVal: this.progressVal,
      textStr: "",
      status: "",
      timer:null,
    };
  },
  watch: {
    // layoutInfo: {
    //   deep: true,
    //   handler: function(newVal, oldVal) {
    //     this.scrollbarHeight = newVal.height;
    //   }
    // }
    progressVal(val) {
      this.nowProgressVal = val;
      if (val == 100) {
        this.status = "success";
      }
       this.getProgress();
    },
    isWaiting(val) {
      if(val){
        this.progressDialogVisible = val;
      }else{
        if(this.nowProgressVal!=100){
          window.setTimeout(()=>{
              window.clearInterval(this.timer);
              this.timer=null;
              this.progressDialogVisible=false;
              this.handleProgressClose();
           },3000)
        }
         
      }
      
    }
  },
  methods: {
    /*
     * @功能描述: 获取进度
     * @param
     * @作者: 康如涛
     * @Date: 2020-04-26
     */
    getProgress() {
      if(this.nowProgressVal<100&&!this.requesting){
          this.$emit("getProgressState");
         }else{
          //  this.nowProgressVal=100;
           
           window.setTimeout(()=>{
              this.progressDialogVisible=false;
              window.clearInterval(this.timer);
              this.timer=null;
              this.$message({
                showClose: true,
                message: '计算完成',
                type: 'success',
                duration: 3 * 1000
              });
              this.handleProgressClose();
              //  this.$emit("initData");
           },3000)  
         }
     
    },
    /*
     * @功能描述: 显示进度提示信息
     * @param
     * @作者: 康如涛
     * @Date: 2020-04-26
     */
    showMsg() {
      //   if(this.type == 1){
      //  this.msg="系统将重新计算现有数据，预计耗时1-2分钟，请确认是否计算！";
      //  }
      // this.msgDialogVisible = true;
      this.$confirm('系统将重新计算现有数据，预计耗时1-2分钟，请确认是否计算！', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           this.$emit("startCalculate");
        }).catch(() => {       
        });
    },
    /*
     * @功能描述: 关闭msg窗口
     * @作者: 康如涛
     * @Date: 2020-04-26
     */
    handleClose() {
      this.msgDialogVisible = false;
    },
    /*
     * @功能描述: 关闭进度窗口
     * @作者: 康如涛
     * @Date: 2020-04-26
     */
    handleProgressClose() {
      // closeProgress();
      this.$emit("closeProgress");
       window.clearInterval(this.timer);
    },
    /*
     * @功能描述: 关闭进度窗口
     * @作者: 康如涛
     * @Date: 2020-04-26
     */
    initProgress() {
      if(this.type == 1){
         this.textStr= "系统计算中";
        this.timer=  window.setInterval(this.getProgress,this.waitingTime);
      }else{
         this.textStr= "文件上传中";
      }
      
    },
    /*
     * @功能描述: 确认计算
     * @作者: 康如涛
     * @Date: 2020-04-26
     */
    confirm() {
     this.msgDialogVisible = false;
     this.$emit("startCalculate");
    }
  },
  mounted() {  
  }
};
</script>

<style scoped>

</style>
