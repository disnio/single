<template>
  <div class="fileInfo">
    <div class="fileinfo-item">
      <div class="fileinfo-label">文件路径:</div>
      <div class="fileinfo-content">{{documentInfo.filePath}}</div>
    </div>
    <div class="fileinfo-item">
      <div class="fileinfo-label">系统编号:</div>
      <div class="fileinfo-content">{{documentInfo.code}}</div>
    </div>
    <div class="fileinfo-item">
      <div class="fileinfo-label">文件名称:</div>
      <div class="fileinfo-content">{{documentInfo.name}}</div>
    </div>
    <!-- #3683 gaoaining 2020-01-19添加“政策解读” start -->
    <div class="fileinfo-item">
      <div class="fileinfo-label">政策解读</div>
      <!-- <div class="fileinfo-content">{{documentInfo.remark}}</div> -->  
      <show-more  :showHeight="showHeight" :content="documentInfo.remark"></show-more>
    </div>
    <!-- #3683 gaoaining 2020-01-19添加“政策解读” end -->
    <div class="fileinfo-item">
      <div class="fileinfo-label">发布机构:</div>
      <div class="fileinfo-content">{{documentInfo.publishMechName}}</div>
    </div>
    <!--  #4168 #4170 #4167 gaoaining 2020-06-02 修改文字 start -->
    <div class="fileinfo-item">
      <div class="fileinfo-label">发布地区:</div>
      <div class="fileinfo-content">{{documentInfo.publishProName}}</div>
    </div>
    <!--  #4168 #4170 #4167  gaoaining 2020-06-02 修改文字 end -->
    <div class="fileinfo-item">
      <div class="fileinfo-label">文件大小:</div>
      <div class="fileinfo-content">{{documentInfo.size}}</div>
    </div>
    <div class="fileinfo-item">
      <div class="fileinfo-label">上传单位:</div>
      <div class="fileinfo-content">{{documentInfo.orgName}}</div>
    </div>
    <div class="fileinfo-item">
      <div class="fileinfo-label">发文号:</div>
      <div class="fileinfo-content">{{documentInfo.publishDocumentCode}}</div>
    </div>
    <div class="fileinfo-item">
      <div class="fileinfo-label">创 建 人:</div>
      <div class="fileinfo-content">{{documentInfo.userName}}</div>
    </div>
    <div class="fileinfo-item">
      <div class="fileinfo-label">创建时间:</div>
      <div class="fileinfo-content">{{documentInfo.createTime}}</div>
    </div>
    <!-- <div class="fileinfo-item">
      <div class="fileinfo-label">审批状态</div>
      <div class="fileinfo-content"><span class='fileSate'>{{documentInfo.examState}}</span></div>
    </div>
    <div class="fileinfo-item">
      <div class="fileinfo-label">审 批 人:</div>
      <div class="fileinfo-content">{{documentInfo.examName}}</div>
    </div>
    <el-row>
      <el-col
        :xl="24"
        class="fileinfo-label"
      > 文件解读:</el-col>
      <el-col :xl="24">
        <div class="fileRemark">
          <el-scrollbar>
            <div class="fileRemark-info">
              {{documentInfo.remark}}
            </div>
          </el-scrollbar>
        </div>
      </el-col>
    </el-row> -->
  </div>
</template>

<script>
import { initLayout } from "@common/utils/init";
export default {
  name: "md-contract",
  components: {
    ShowMore: () => import("./ShowMore"),
  },
  props: {
    docInfo: { type: Object },
   
  },
  
  data() {
    return {
      showHeight:32,
      scrollbarHeight: "",
      documentInfo: {
        orgId: "",
        orgName: "",
        code: "",
        filePath: "", //文件路径    //例子：电力市场-->政策文件
        name: "", //文件名称
        publishMechCode: "", //发布机构编码
        publishMechName: "", //发布机构名称
        publishProCode: "", //发布省份编码
        publishProName: "", //发布省份名称
        size: "", // 文件大小
        userCode: "", // 用户code
        userName: "", //用户名称
        createTime: "", //发布时间
        examState: "", //审核状态 未审批 1 已审批 2 驳回 3'
        examName: "", // 审核人
        storagePath: "", //存储路径
        remark: "", //政策解读
        publishDocumentCode:"",//发文号
        readScope: "", // 阅读范围
        fileType: "" //文件类型
      }
    };
  },
  created() {
    this.init();
  },
  watch: {
    queryDim: {
      deep: true,
      docInfo: (newVal, oldVal) => {
        this.docInfo = newVal;
      }
    }
  },
  methods: {
    init() {
      this.scrollbarHeight = initLayout();
      this.showDoc(this.docInfo);
    },
    showDoc(data) {
      //  let data=this.docInfo;
      let size="";
      let m = 1024 * 1014;
      let k = 1024;
      
      
      if (typeof data.size != "undefined") {
            size = data.size;
        }
        for (let key in this.documentInfo) {
          if (key != "size" && key != "examState") {
            this.documentInfo[key] = data[key];
          }
        }
        //#3846 gaoaining 2020-03-05 修改所属路径
        this.documentInfo.filePath = this.docInfo.filePath;
        if(typeof size=="number"){
          if (size > m) {
          this.documentInfo.size = parseFloat(size / m).toFixed(2) + "MB";
        } else {
          this.documentInfo.size = parseFloat(size / k).toFixed(2) + "KB";
        }
        }else{
          this.documentInfo.size="未知";
        }
        
        if (data.examState == "1") {
          this.documentInfo.examState = "未审核";
        } else if (data.examState == "3") {
          this.documentInfo.examState = "审核驳回";
        } else if (data.examState == "2") {
          this.documentInfo.examState = "审核通过";
        }
      
    }
  }
};
</script>
<style scoped>
.fileRemark-info {
  min-height: 148px;
  word-wrap: break-word;
}
.fileRemark {
  height: 200px;
  overflow: hidden;
}
</style>
