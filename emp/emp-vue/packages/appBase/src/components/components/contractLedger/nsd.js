// 售电合同，用电计划2 月度MonthlyPlan

import {
  getContractTypeCode,
  getStateCode,
  getContractType,
  page,
  addObj,
  delObj,
  exportObj,
  getcompensation,
  getconditions,
  getWaysOfCompensation,
  getObj,
  editObj,
  viewShow,
  download,
  getSupplierCode,
  updateStatus,
  confirm,
  reject,
  toCustomerConfirmation,
  getHtRecords,
  getDimsByParentCodeAndValue,
  getPropList,
} from '@common/api/contractManage/contractLedger/index';
import {
  parseTime,
  getUnitMap,
  initDialogHeight,
  countData,
  traverse,
} from '@common/utils/index';
import bd from '@common/components/contractLedger/bd';

const nsd = {
  mixins: [bd],
  data() {
    return {

    }
  },
  methods: {
    setMonthlyPlan(dataInfo) {
      // 需要加类型判断
      if (this.proceedInfo.jjfcdnPlan) {
        for (let i = 0; i < dataInfo.monthlyPlan.length - 1; i++) {
          this.jjfchdnTableData.push(dataInfo.monthlyPlan[i]);
        }
      }
      if (this.proceedInfo.gdjjdydjPlan) {
        for (let i = 0; i < dataInfo.monthlyPlan.length - 1; i++) {
          this.gdjjdydjTableData.push(dataInfo.monthlyPlan[i]);
        }
      }
      //能源类型
      if (this.proceedInfo.gdjjnylxPlan) {
        if (typeof dataInfo.monthlyPlanFY.hdcglist != 'undefined') {
          for (let i = 0; i < dataInfo.monthlyPlanFY.hdcglist.length - 1; i++) {
            this.gdjjnylxTableData.push(dataInfo.monthlyPlanFY.hdcglist[i]);
          }
        }
        if (typeof dataInfo.monthlyPlanFY.fydllist != 'undefined') {
          for (let i = 0; i < dataInfo.monthlyPlanFY.fydllist.length - 1; i++) {
            this.gdjjnylxTableData1.push(dataInfo.monthlyPlanFY.fydllist[i]);
          }
        }
      }
      if (this.proceedInfo.gdjjfcPlan) {
        for (let i = 0; i < dataInfo.monthlyPlan.length - 1; i++) {
          this.gdjjfcTableData.push(dataInfo.monthlyPlan[i]);
        }
      }
    },

    setProceedInfo(sdTemplateName, state) {
      this.sdhtlx = sdTemplateName;
      this.state = state;
      for (let key in this.proceedInfo) {
        this.proceedInfo[key] = false;
      }

      switch (sdTemplateName) {
        // 年度
        case 'sdhtlx01':
          this.proceedInfo.gdjj = true;

          this.proceedInfo.yearBilateElectric = true;
          this.proceedInfo.fixDeprice = true;
          console.log(this.getTplName(sdTemplateName))
          break;
        case 'sdhtlx02':
          this.proceedInfo.jjcf = true;

          this.proceedInfo.monthBidElectric = true;
          this.proceedInfo.customerProportion = true;
          console.log(this.getTplName(sdTemplateName))
          break;
        case 'sdhtlx03':
          this.proceedInfo.jjbdfc = true;

          this.proceedInfo.monthBidElectric = true;
          this.proceedInfo.customerProportion = true;
          console.log(this.getTplName(sdTemplateName))
          break;
        case 'sdhtlx04':
          // 固定降价+竞价分成
          this.proceedInfo.jjcf = true;
          this.proceedInfo.gdjj = true;

          this.proceedInfo.yearBilateElectric = true;
          this.proceedInfo.fixDeprice = true;

          this.proceedInfo.monthBidElectric = true;
          this.proceedInfo.customerProportion = true;
          console.log(this.getTplName(sdTemplateName))
          break;
        case 'sdhtlx05':
          // 固定降价+竞价保底分成
          this.proceedInfo.jjbdfc = true;
          this.proceedInfo.gdjj = true;

          this.proceedInfo.yearBilateElectric = true;
          this.proceedInfo.fixDeprice = true;

          this.proceedInfo.monthBidElectric = true;
          this.proceedInfo.customerProportion = true;
          console.log(this.getTplName(sdTemplateName))
          break;
        case 'sdhtlx06':
          //标准服务合同
          this.proceedInfo.fwf = true;
          this.proceedInfo.yearBidElectric = true;
          this.proceedInfo.kwhCost = true;
          console.log(this.getTplName(sdTemplateName))
          break;
        case 'sdhtlx08':
          // 长协+竞价让利分成
          this.proceedInfo.monthBidElectric = true;
          this.proceedInfo.yearLongtermElectric = true;
          this.proceedInfo.cxdl = true;
          this.proceedInfo.yjdl = true;
          this.proceedInfo.hezj = true;
          console.log(this.getTplName(sdTemplateName))
          break;
        case 'sdhtlx13':
          //服务合同含分成
          this.proceedInfo.fwf = true;
          this.proceedInfo.fwhthfc = true;
          this.proceedInfo.yearBidElectric = true;
          this.proceedInfo.kwhCost = true;
          console.log(this.getTplName(sdTemplateName))
          break;
        // 月度
        case 'sdhtlx09':
          //固定降价含分成
          this.proceedInfo.isValueServicesText = true; //#4803添加增值服务条款显隐
          this.proceedInfo.gdjjhfc = true;
          this.proceedInfo.gdjj = true;
          this.proceedInfo.gdjjfcPlan = true;
          this.proceedInfo.yearBilateElectric = true;
          this.proceedInfo.fixDeprice = true;
          let param_sdhtlx09 = {
            parentCode: 'contract_common_prop',
            parentValue: '合同管理用电计划公用维度',
          };
          getDimsByParentCodeAndValue(param_sdhtlx09).then((res) => {
            this.tableHeadData = res;
          });
          console.log(this.getTplName(sdTemplateName))
          break;
        case 'sdhtlx10':
          //固定降价含电压等级
          this.proceedInfo.gdjjhfc = true;
          this.proceedInfo.gdjj = true;
          this.proceedInfo.gdjjdydjPlan = true;
          this.proceedInfo.yearBilateElectric = true;
          this.proceedInfo.fixDeprice = true;
          getPropList('voltage_class').then((res) => {
            this.tableHeadData = res;
          });
          console.log(this.getTplName(sdTemplateName))
          break;
        case 'sdhtlx11':
          //固定降价含能源类型
          this.proceedInfo.gdjjhfc = true;
          this.proceedInfo.gdjj = true;
          this.proceedInfo.gdjjnylxPlan = true;
          this.proceedInfo.yearBilateElectric = true;
          this.proceedInfo.fixDeprice = true;
          this.proceedInfo.fydl = true;
          let param_sdhtlx11 = {
            parentCode: 'new_energy_type',
            parentValue: '售电合同类型 - 固定降价 - 新能源类型',
          };
          getDimsByParentCodeAndValue(param_sdhtlx11).then((res) => {
            this.tableHeadData = res;
          });
          console.log(this.getTplName(sdTemplateName))
          break;
        case 'sdhtlx12':
          //竞价分成含多年
          this.proceedInfo.jjcf = true;
          this.proceedInfo.jjfcdnPlan = true;

          this.proceedInfo.monthBidElectric = true;
          this.proceedInfo.customerProportion = true;
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
    // 用电计划数据
    resetPlanData() {
      this.jjfchdnTableData = []; //清空用电计划历史数据
      this.gdjjdydjTableData = [];
      this.gdjjnylxTableData = [];
      this.gdjjnylxTableData1 = [];
      this.gdjjfcTableData = [];
    },

    // 月度，两个无用函数
    changePlan(plan) {
      let mp = [];
      if (plan) {
        let months = [
          'jan',
          'feb',
          'mar',
          'apr',
          'may',
          'jun',
          'jul',
          'aug',
          'sep',
          'oct',
          'nov',
          'dec',
        ];
        let pks = _.keys(plan);
        mp = _.map(months, (m, i) => {
          let key = _.find(pks, k => {
            return _.startsWith(k, m)
          });
          if (key) {
            return {
              key: (i + 1).toString(),
              value: plan[key]
            }
          }
        });
      }
      return mp;

    },
    setPlan(plan) {
      let mv = this.changePlan(plan);

      let beginDate = new Date(
        this.contractLedgerForm.htContract.beginDate
      ).getTime();
      let endDate = new Date(
        this.contractLedgerForm.htContract.endDate
      ).getTime();

      if (beginDate < endDate && mv.length > 0) {
        let p = /^(\d+)年(\d+)月$/;
        let data = countData(beginDate, endDate);
        let TableData = traverse(beginDate, endDate);
        console.log("mv:", mv, this.proceedInfo)
        if (data !== false) {
          //12 m 竞价分成含多年
          if (this.proceedInfo.jjfcdnPlan) {
            this.jjfchdnTableData = [];
            TableData.forEach((item) => {
              let m = item.match(p)[2];
              let mp = _.find(mv, v => v.key === m);
              this.jjfchdnTableData.push({
                month: item,
                year_decompose_electricity: mp.value || '',
                year_decompose_price: '',
                month_bidding_electricity: "",
                month_bidding_price: '',
              });
            });
          }
          // 10 m 固定降价含电压等级
          if (this.proceedInfo.gdjjdydjPlan) {
            this.gdjjdydjTableData = [];
            TableData.forEach((item) => {
              let m = item.match(p)[2];
              let mp = _.find(mv, v => v.key === m);
              this.gdjjdydjTableData.push({
                month: item,
                year_decompose_electricity: mp.value || '',
                year_decompose_price: '',
                month_bidding_electricity: "",
                month_bidding_price: '',
              });
            });
            if (typeof this.$refs.gdjjdydj != 'undefined') {
              this.$refs.gdjjdydj.initInt(this.gdjjdydjTableData);
            }
          }
          // 11 m 固定降价含能源类型
          if (this.proceedInfo.gdjjnylxPlan) {
            this.gdjjnylxTableData = [];
            TableData.forEach((item) => {
              let m = item.match(p)[2];
              let mp = _.find(mv, v => v.key === m);
              this.gdjjnylxTableData.push({
                month: item,
                year_decompose_electricity: mp.value || '',
                year_decompose_price: '',
                month_bidding_electricity: "",
                month_bidding_price: '',
              });
            });
            this.gdjjnylxTableData1 = [];
            TableData.forEach((item) => {
              let m = item.match(p)[2];
              let mp = _.find(mv, v => v.key === m);
              this.gdjjnylxTableData1.push({
                month: item,
                year_decompose_electricity: mp.value || '',
                year_decompose_price: '',
                month_bidding_electricity: "",
                month_bidding_price: '',
              });
            });
          }
          // 9 m 固定降价含分成
          if (this.proceedInfo.gdjjfcPlan) {
            this.gdjjfcTableData = [];
            TableData.forEach((item) => {
              let m = item.match(p)[2];
              let mp = _.find(mv, v => v.key === m);
              console.log("m:", m, mv[m])
              this.gdjjfcTableData.push({
                month: item,
                year_decompose_electricity: mp.value || '',
                year_decompose_price: '',
                month_bidding_electricity: "",
                month_bidding_price: '',
              });
            });
          }

        }
      }
    },


  }
}

export default nsd;
