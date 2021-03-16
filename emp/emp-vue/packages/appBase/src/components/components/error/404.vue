<!--
 * @文件用途说明: 404页面
 * @作者姓名: 阿彪
 * @Date: 2020-04-14 11:01:45
 -->
<template>
  <div style="margin-top: -20px;">  
    <!-- <div class="wscn-http404">
      <div class="pic-404" v-if="pic">
        <img class="pic-404__parent" :src="img_404" alt="404" />
        <img class="pic-404__child left" :src="img_404_cloud" alt="404" />
        <img class="pic-404__child mid" :src="img_404_cloud" alt="404" />
        <img class="pic-404__child right" :src="img_404_cloud" alt="404" />
      </div>

      <div class="pic-404"  v-if="!pic" style="padding:80px;width:100%;">
        <img class="pic-404__parent" :src="img_timg" alt="404" style="height:65vh"/>
      </div>

      <div class="bullshit"  v-if="pic">
        <div class="bullshit__headline">{{ message }}</div>
        <div class="bullshit__info"></div>
      </div>
    </div> -->
    <div class="wscn-http404" v-if="pic">
      <div class="pic-404" >
        <img class="pic-404__parent" :src="img_404" alt="404" />
        <img class="pic-404__child left" :src="img_404_cloud" alt="404" />
        <img class="pic-404__child mid" :src="img_404_cloud" alt="404" />
        <img class="pic-404__child right" :src="img_404_cloud" alt="404" />
      </div>

      <div class="pic-404"  v-if="!pic" style="padding:80px;width:100%;">
        <img class="pic-404__parent" :src="img_timg" alt="404" style="height:65vh"/>
      </div>

      <div class="bullshit"  v-if="pic">
        <div class="bullshit__headline">{{ message }}</div>
        <div class="bullshit__info"></div>
      </div>
    </div>

    <div class="" v-if="!pic">
      <div class=""   style="padding:80px;width:100%;">
        <img class="" :src="img_timg" alt="404" style="width:100%"/>
      </div>
    </div>


  </div>
</template>

<script>
import img_404 from "@/common/assets/404_images/404.png";
import img_404_cloud from "@/common/assets/404_images/404_cloud.png";
import img_timg from "@/common/assets/404_images/timg.jpg";

export default {
  data() {
    return {
      pic:true,
      img_404,
      img_404_cloud,
      img_timg,
      ModelCode: "",
      message: "当前页面未找到，请稍后访问......",
      ModelCodeNum: [
        { name: "customerRating" },
        { name: "investigation" },
        { name: "heatReport" },
        { name: "comprehensiveEnergy" },
        { name: "otherReport" },
        { name: "tradeOverview" },
        { name: "quotationManage" },
        { name: "transactionAnalysis" },
        { name: "marketAnalysis" },
        { name: "abilityAnalysc" },
        { name: "costAnalysis" },
        { name: "transactionOverview" },
        { name: "resultInfomation" },
        { name: "tanTrade" },
        { name: "blueTrade" },
        { name: "reproducibleTrade" },
        { name: "contractAnalysis" },
        { name: "settlementOverview" },
        { name: "estimationMan" },
        { name: "estimationApproval" },
        { name: "electricStatement" },
        { name: "hotStatement" },
        { name: "serviceStatement" },
        { name: "twoRules" },
        { name: "checkSettlement" },
        { name: "preparationScheme" },
        { name: "schemeApproval" },
        { name: "customerSettlement" },
        { name: "powersalesStatement" },
        { name: "brokerStatement" },
        { name: "generationSide" },
        { name: "deviationCheck" },
        { name: "tenderRecords" },
        { name: "agencyRelationship" },  
        { name: "addedServices" },
        { name: "contractApplication" },  
        { name: "approvalAgencyRela" },
        { name: "summaryInfo" },
        { name: "customerAnl" },
        { name: "fd-contractAnalysis" },
        { name: "sd-contractAnalysis" },
        { name: "dataEntry-fd" },
        { name: "dataEntry-actual" },
        { name: "dataEntry-sr" },

      ],
    };
  },
  created() {
    this.setMess();
  },
  mounted() {},
  computed: {
    // message() {
    //   return '当前页面未找到，请稍后访问......'
    // }
  },
  activated: function() {
    this.setMess()
  },
  watch:{
    $route:{
       handler(newVal, oldVal) {
        this.setMess();
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    setMess() {
      this.ModelCode = sessionStorage.getItem("modelCode");
      this.ModelCodeNum.forEach((element) => {
        if (element.name == this.ModelCode) {
          this.$nextTick(()=> {
             this.message = "该功能正在建设中....";
             this.pic = false;
          })
        }else {
          this.message = "当前页面未找到,请稍后访问......";
          this.pic = true;
        }
      });
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.wscn-http404 {
  position: relative;
  width: 1000px;
  margin: 20px auto;
  overflow: hidden;
  .pic-404 {
    position: relative;
    float: left;
    width: 600px;
    padding: 150px 0;
    overflow: hidden;
    &__parent {
      width: 100%;
    }
    &__child {
      position: absolute;
      &.left {
        width: 80px;
        top: 17px;
        left: 220px;
        opacity: 0;
        animation-name: cloudLeft;
        animation-duration: 2s;
        animation-timing-function: linear;
        animation-fill-mode: forwards;
        animation-delay: 1s;
      }
      &.mid {
        width: 46px;
        top: 10px;
        left: 420px;
        opacity: 0;
        animation-name: cloudMid;
        animation-duration: 2s;
        animation-timing-function: linear;
        animation-fill-mode: forwards;
        animation-delay: 1.2s;
      }
      &.right {
        width: 62px;
        top: 100px;
        left: 500px;
        opacity: 0;
        animation-name: cloudRight;
        animation-duration: 2s;
        animation-timing-function: linear;
        animation-fill-mode: forwards;
        animation-delay: 1s;
      }
      @keyframes cloudLeft {
        0% {
          top: 17px;
          left: 220px;
          opacity: 0;
        }
        20% {
          top: 33px;
          left: 188px;
          opacity: 1;
        }
        80% {
          top: 81px;
          left: 92px;
          opacity: 1;
        }
        100% {
          top: 97px;
          left: 60px;
          opacity: 0;
        }
      }
      @keyframes cloudMid {
        0% {
          top: 10px;
          left: 420px;
          opacity: 0;
        }
        20% {
          top: 40px;
          left: 360px;
          opacity: 1;
        }
        70% {
          top: 130px;
          left: 180px;
          opacity: 1;
        }
        100% {
          top: 160px;
          left: 120px;
          opacity: 0;
        }
      }
      @keyframes cloudRight {
        0% {
          top: 100px;
          left: 500px;
          opacity: 0;
        }
        20% {
          top: 120px;
          left: 460px;
          opacity: 1;
        }
        80% {
          top: 180px;
          left: 340px;
          opacity: 1;
        }
        100% {
          top: 200px;
          left: 300px;
          opacity: 0;
        }
      }
    }
  }
  .bullshit {
    position: relative;
    float: left;
    width: 300px;
    padding: 150px 0;
    overflow: hidden;
    &__oops {
      font-size: 32px;
      font-weight: bold;
      line-height: 40px;
      color: #1482f0;
      opacity: 0;
      margin-bottom: 20px;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-fill-mode: forwards;
    }
    &__headline {
      font-size: 20px;
      line-height: 24px;
      color: #1482f0;
      opacity: 0;
      margin-bottom: 10px;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-delay: 0.1s;
      animation-fill-mode: forwards;
    }
    &__info {
      font-size: 13px;
      line-height: 21px;
      color: grey;
      opacity: 0;
      margin-bottom: 30px;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-delay: 0.2s;
      animation-fill-mode: forwards;
    }
    &__return-home {
      display: block;
      float: left;
      width: 110px;
      height: 36px;
      background: #1482f0;
      border-radius: 100px;
      text-align: center;
      color: #ffffff;
      opacity: 0;
      font-size: 14px;
      line-height: 36px;
      cursor: pointer;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-delay: 0.3s;
      animation-fill-mode: forwards;
    }
    @keyframes slideUp {
      0% {
        transform: translateY(60px);
        opacity: 0;
      }
      100% {
        transform: translateY(0);
        opacity: 1;
      }
    }
  }
}
</style>
