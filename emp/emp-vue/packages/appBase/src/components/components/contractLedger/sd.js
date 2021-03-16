// 售电合同，用电计划，年度clausePlan
import bd from '@common/components/contractLedger/bd';

const sd = {
  mixins: [bd],
  data() {
    return {}
  },
  methods: {
    changeClause(clause){
      this.contractLedgerForm.clausePlan = clause;
    },
    setProceedInfo(sdTemplateName, state) {
      this.sdhtlx = sdTemplateName;
      this.state = state;
      for (let key in this.proceedInfo) {
        this.proceedInfo[key] = false;
      }

      switch (sdTemplateName) {
        case 'sdhtlx01':
          this.proceedInfo.LyydAzdl = true;
          this.proceedInfo.gdjj = true;
          this.proceedInfo.bgdj = true;
          this.proceedInfo.yearBilateElectric = true;
          this.proceedInfo.fixDeprice = true;
          console.log(this.getTplName(sdTemplateName))
          break;
        case 'sdhtlx02':
          // this.proceedInfo.isValueServicesText = true;//#4803添加增值服务条款显隐
          this.proceedInfo.LyydAzdl = true;
          this.proceedInfo.jjcf = true;
          this.proceedInfo.monthBidElectric = true;
          this.proceedInfo.customerProportion = true;
          //#4083 gaoaining 2020-05-27 控制增值服务条款
          console.log(this.getTplName(sdTemplateName))
          break;
        case 'sdhtlx03':
          this.proceedInfo.LyydAzdl = true;
          this.proceedInfo.bgdj = true;
          this.proceedInfo.jjbdfc = true;
          this.proceedInfo.monthBidElectric = true;
          this.proceedInfo.customerProportion = true;
          console.log(this.getTplName(sdTemplateName))
          break;
        case 'sdhtlx04':
          // 修改sdhtlx04类型 jjbdfc改为jjcf=true #2970 tengc 2019-12-02
          this.proceedInfo.LyydAzdl = true;
          this.proceedInfo.jjcf = true;
          this.proceedInfo.gdjj = true;
          this.proceedInfo.yearBilateElectric = true;
          this.proceedInfo.fixDeprice = true;
          this.proceedInfo.monthBidElectric = true;
          this.proceedInfo.customerProportion = true;
          console.log(this.getTplName(sdTemplateName))
          break;
        case 'sdhtlx05':
          this.proceedInfo.LyydAzdl = true;
          this.proceedInfo.jjbdfc = true;
          this.proceedInfo.gdjj = true;
          this.proceedInfo.yearBilateElectric = true;
          this.proceedInfo.fixDeprice = true;
          this.proceedInfo.monthBidElectric = true;
          this.proceedInfo.customerProportion = true;
          console.log(this.getTplName(sdTemplateName))
          break;
        case 'sdhtlx06':
          this.proceedInfo.LyydAzdl = true;
          this.proceedInfo.fwf = true;
          this.proceedInfo.yearBidElectric = true;
          this.proceedInfo.kwhCost = true;
          console.log(this.getTplName(sdTemplateName))
          break;
        case 'sdhtlx08':
          this.proceedInfo.isValueServicesText = true; //#4803添加增值服务条款显隐
          this.proceedInfo.LyydAzdl = true;
          this.proceedInfo.monthBidElectric = true;
          this.proceedInfo.yearLongtermElectric = true;
          this.proceedInfo.cxdl = true;
          this.proceedInfo.yjdl = true;
          this.proceedInfo.hezj = true;
          console.log(this.getTplName(sdTemplateName))
          break;
        case 'sdhtlx13':
          //服务合同含分成
          this.proceedInfo.LyydAzdl = true;
          this.proceedInfo.fwf = true;
          this.proceedInfo.fwhthfc = true;
          this.proceedInfo.yearBidElectric = true;
          this.proceedInfo.kwhCost = true;
          console.log(this.getTplName(sdTemplateName))
          break;
        case 'sdhtlx15':
          //增值服务合同
          this.proceedInfo.LyydAzdl = false;
          this.proceedInfo.htzj = true;
          this.proceedInfo.yearBidElectric = true;
          this.proceedInfo.kwhCost = true;
          console.log(this.getTplName(sdTemplateName))
          break;
        case 'sdhtlx16':
          //基准价服务合同
          this.proceedInfo.LyydAzdl = false;
          this.proceedInfo.ndjqdj = true;
          this.proceedInfo.yearBidElectric = true;
          this.proceedInfo.kwhCost = true;
          console.log(this.getTplName(sdTemplateName))
          break;
        case 'sdhtlx21':
          //固定服务费
          this.proceedInfo.LyydAzdl = false;
          this.proceedInfo.Gdfwf = true;
          console.log(this.getTplName(sdTemplateName))
          break;
        default:

          console.log("default:", this.getTplName(sdTemplateName))
          break;
      }

      if (!state) {
        if (this.proceedInfo.yearBidElectric) {
          this.yearBilateElectricState = true;
          this.electricityTradeState = false;
        } else if (this.proceedInfo.yearLongtermElectric) {
          this.yearBilateElectricState = false;
        } else {
          this.yearBilateElectricState =
            this.proceedInfo.yearBilateElectric ||
            this.proceedInfo.yearBidElectric
              ? false
              : true;
          this.electricityTradeState = this.proceedInfo.monthBidElectric
            ? false
            : true;
        }
      } else {
        this.yearBilateElectricState = state;
        this.electricityTradeState = state;
      }
    },

    setErHt(ht){
      this.$set(this.contractLedgerForm, "htContract", {
        ...this.contractLedgerForm.htContract,
        ...ht,
      })
    },
    setErClausePrice(ht){
      this.$set(this.contractLedgerForm, "clausePrice", {
        ...this.contractLedgerForm.clausePrice,
        ...ht,
      })
    },
    setErClausePlan(ht){
      console.log("setErClausePlan", ht, this.contractLedgerForm)
      this.$set(this.contractLedgerForm, "clausePlan", ht)
      console.log("setErClausePlan after", this.contractLedgerForm.clausePlan)
    },


  }
}

export default sd;
