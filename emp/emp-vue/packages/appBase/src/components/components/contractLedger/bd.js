// 售电合同，用电计划，通用

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
import { getValueByOrgIdAndCode } from '@common/api/business/jyTransactionNotice/index';
const bd = {
  data() {
    return {
      shareYear: false,
      shareMonth: false
    }
  },
  methods: {
    changeShareYear(v) {
      this.shareYear = v;
    },
    changeShareMonth(v) {
      this.shareMonth = v;
    },
    setContractLedgerForm(dataInfo) {
      _.keys(dataInfo).forEach((v) => {
        if (v !== 'templatePowerList') {
          if (v === 'htContractLegal') {
            _.keys(this.contractLedgerForm['legal']).forEach((k) => {
              this.$set(
                this.contractLedgerForm['legal'],
                k,
                dataInfo['htContractLegal'][k]
              );
            });
          } else {
            _.keys(this.contractLedgerForm[v]).forEach((k) => {
              this.$set(this.contractLedgerForm[v], k, dataInfo[v][k]);
            });
          }
        } else {
          this.contractLedgerForm.templatePowerList =
            dataInfo.templatePowerList;
          // 实时监听表格变压器数据是否为空  为空返回false(合同总变压器容量可编辑) 否则返回true(合同总变压器容量不可编辑)
        }
      });
    },
    // 甲方
    setFirst(dataInfo, dialogInfo) {

      this.firstPartyList.push({
        customerId: dataInfo.htContract.customerCode,
        customerName: dataInfo.htContract.customerName,
      });

      this.$set(
        this.contractLedgerForm['htContract'],
        'customerId',
        dataInfo.htContract.customerCode
      );

      if (!dialogInfo.state) {
        this.getFirstPartyInfoSd(dataInfo.htContract.customerName);
      }
    },

    setTemplatePowerList() {
      this.isEditTotalTCapacity = false;
      if (this.contractLedgerForm.templatePowerList.length === 0) {
        this.isEditTotalTCapacity = false;
      }
      this.contractLedgerForm.templatePowerList.forEach((item, index) => {
        if (item.isselect == '1') {
          this.$nextTick(function () {
            this.$refs.multipleTable.toggleRowSelection(item, true);
          });
        }
      });
      // #3539 2020-01-08 张亮三 当变压器容量有数据则合同总变压器容量不可编辑 start
      this.contractLedgerForm.templatePowerList.some((item, index) => {
        if (item.transformerCapacity && item.transformerCapacity.length > 0) {
          this.isEditTotalTCapacity = true;
          return true;
        } else {
          this.isEditTotalTCapacity = false;
        }
      });
    },

    setNegDevRatio(dataInfo) {
      // 查看时负偏差考核统一显示为正数 s #2640 frj 2019-11-13 14:28:18
      // if (this.contractLedgerForm.clauseAssessment.negDevRatio != "") {
      //   this.contractLedgerForm.clauseAssessment.negDevRatio = Math.abs(
      //     this.contractLedgerForm.clauseAssessment.negDevRatio
      //   );
      // }
      // 查看时负偏差考核统一显示为正数 e #2640 frj 2019-11-13 14:28:18
      // #4025 阿彪 20200508 ‘1：否’为显示负数，‘0：是’为显示正数 start
      if (this.contractLedgerForm.clauseAssessment.negDevRatio) {
        let obj = {
          orgId: this.orgId,
          configurationId: 4,
          parameterCode: 1040006,
        };
        getValueByOrgIdAndCode(obj).then((res) => {
          let negDevRatio = this.contractLedgerForm.clauseAssessment
            .negDevRatio;
          if (res == '1') {
            this.contractLedgerForm.clauseAssessment.negDevRatio = -Math.abs(
              negDevRatio
            );
          } else {
            this.contractLedgerForm.clauseAssessment.negDevRatio = Math.abs(
              negDevRatio
            );
          }
        });
      }

      if (_.has(dataInfo, 'clauseDefault') && !_.isEmpty(dataInfo.clauseDefault)) {



        // #4025 阿彪 20200508 ‘0：否’为显示负数，‘1：是’为显示正数 end
        if (dataInfo.clauseDefault.secondPartCompensateWay == 'pcfs_01') {
          this.$set(
            this.contractLedgerForm.clauseDefault,
            'secondPartCompensateValue1',
            dataInfo.clauseDefault.secondPartCompensateValue
          );
        }
        if (dataInfo.clauseDefault.secondPartCompensateWay == 'pcfs_02') {
          this.$set(
            this.contractLedgerForm.clauseDefault,
            'secondPartCompensateValue2',
            dataInfo.clauseDefault.secondPartCompensateValue
          );
        }
        if (dataInfo.clauseDefault.secondPartCompensateWay == 'pcfs_03') {
          this.$set(
            this.contractLedgerForm.clauseDefault,
            'secondPartCompensateValue3',
            dataInfo.clauseDefault.secondPartCompensateValue
          );
        }
        if (dataInfo.clauseDefault.customerCompensateWay == 'pcfs_01') {
          this.$set(
            this.contractLedgerForm.clauseDefault,
            'customerCompensateValue2',
            dataInfo.clauseDefault.customerCompensateValue
          );
        }
        if (dataInfo.clauseDefault.customerCompensateWay == 'pcfs_02') {
          this.$set(
            this.contractLedgerForm.clauseDefault,
            'customerCompensateValue1',
            dataInfo.clauseDefault.customerCompensateValue
          );
        }
        if (dataInfo.clauseDefault.customerCompensateWay == 'pcfs_03') {
          this.$set(
            this.contractLedgerForm.clauseDefault,
            'customerCompensateValue3',
            dataInfo.clauseDefault.customerCompensateValue
          );
        }
      }
    },

    setClausePlan(dataInfo) {
      this.$set(this.contractLedgerForm, 'clausePlan', {
        ...dataInfo.clausePlan,
      });

      this.contractLedgerForm.htContract.totalElectricity =
        dataInfo.htContract.totalElectricity;

      console.log('form:', this.contractLedgerForm['clausePlan']);
    },
    //初始化用电计划
    initClausePlanData(data) {
      console.log('plan:', data, this.months);
      for (let i = 0; i < 12; i++) {
        this.$set(
          this.contractLedgerForm['clausePlan'],
          this.months[i] + 'YearBilateElectric',
          data[this.months[i] + 'YearBilateElectric']
        );
        this.$set(
          this.contractLedgerForm['clausePlan'],
          this.months[i] + 'YearBilateElecPrice',
          data[this.months[i] + 'YearBilateElecPrice']
        );
        this.$set(
          this.contractLedgerForm['clausePlan'],
          this.months[i] + 'ElectricityTrade',
          data[this.months[i] + 'ElectricityTrade']
          // febElectricityTrade
          // janElectricityTrade
        );
        this.$set(
          this.contractLedgerForm['clausePlan'],
          this.months[i] + 'ElectricityPrice',
          data[this.months[i] + 'ElectricityPrice']
        );
      }
    },
    //置空用电计划
    resetClausePlanData() {
      for (let i = 0; i < 12; i++) {
        this.$set(
          this.contractLedgerForm['clausePlan'],
          this.months[i] + 'YearBilateElectric',
          ''
        );
        this.$set(
          this.contractLedgerForm['clausePlan'],
          this.months[i] + 'YearBilateElecPrice',
          ''
        );
        this.$set(
          this.contractLedgerForm['clausePlan'],
          this.months[i] + 'ElectricityTrade',
          ''
        );
        this.$set(
          this.contractLedgerForm['clausePlan'],
          this.months[i] + 'ElectricityPrice',
          ''
        );
      }
    },
    //分摊
    share(type) {
      if (type == 'yearBilateElectric') {
        this.shareYear = true;
        if (this.proceedInfo.gdjjfcPlan) {
          // 对固定降价分成进行分摊
          let totalTemp = 0;
          let array = this.$refs.gdjjfc.tableData;
          let electricityTrade = parseFloat(
            this.contractLedgerForm.clausePrice.yearBilateElectric /
            array.length
          ).toFixed(4);
          for (let i = 0; i < array.length; i++) {
            // this.gdjjfcTableData[i].year_decompose_electricity = electricityTrade;
            this.$set(
              this.gdjjfcTableData[i],
              'year_decompose_electricity',
              electricityTrade
            );
            totalTemp += Number(array[i].year_decompose_electricity);
          }
          // 分摊时不能除进时最后一个月份的值为总和减去前几个月的和 start #2878 frj 2019-11-27 10:56:13
          if (
            totalTemp != this.contractLedgerForm.clausePrice.yearBilateElectric
          ) {
            let electricity = parseFloat(
              this.contractLedgerForm.clausePrice.yearBilateElectric -
              electricityTrade * (array.length - 1)
            ).toFixed(4);
            this.$set(
              this.gdjjfcTableData[array.length - 1],
              'year_decompose_electricity',
              electricity
            );
          } else {
            this.$set(
              this.gdjjfcTableData[array.length - 1],
              'year_decompose_electricity',
              electricityTrade
            );
          }
          // 分摊时不能除进时最后一个月份的值为总和减去前几个月的和 end #2878 frj 2019-11-27 10:56:13
        } else if (this.proceedInfo.gdjjnylxPlan) {
          // 对固定降价能源类型进行分摊
          let totalTemp = 0;
          let array = this.$refs.gdjjnylx.tableData;
          let electricityTrade = parseFloat(
            this.contractLedgerForm.clausePrice.yearBilateElectric /
            array.length
          ).toFixed(4);
          for (let i = 0; i < array.length; i++) {
            this.$set(
              this.gdjjnylxTableData[i],
              'year_trading_electricity',
              electricityTrade
            );
            totalTemp += Number(array[i].year_trading_electricity);
          }
          // 分摊时不能除进时最后一个月份的值为总和减去前几个月的和 start #2878 frj 2019-11-27 10:56:13
          if (
            totalTemp != this.contractLedgerForm.clausePrice.yearBilateElectric
          ) {
            let electricity = parseFloat(
              this.contractLedgerForm.clausePrice.yearBilateElectric -
              electricityTrade * (array.length - 1)
            ).toFixed(4);
            this.$set(
              this.gdjjnylxTableData[array.length - 1],
              'year_trading_electricity',
              electricity
            );
          } else {
            this.$set(
              this.gdjjnylxTableData[array.length - 1],
              'year_decompose_electricity',
              electricityTrade
            );
          }
          // 分摊时不能除进时最后一个月份的值为总和减去前几个月的和 end #2878 frj 2019-11-27 10:56:13
        }
      } else if (type == 'monthBidElectric') {
        this.shareMonth = true;
        // 对竞价分成含多年进行分摊
        let totalTemp = 0;
        let array = this.$refs.jjfcYdjh.tableData;
        let electricityTrade = parseFloat(
          this.contractLedgerForm.clausePrice.monthBidElectric / array.length
        ).toFixed(4);
        for (let i = 0; i < array.length; i++) {
          // this.jjfchdnTableData[i].month_bidding_electricity = electricityTrade;
          this.$set(
            this.jjfchdnTableData[i],
            'month_bidding_electricity',
            electricityTrade
          );
          totalTemp += Number(array[i].month_bidding_electricity);
        }
        // 分摊时不能除进时最后一个月份的值为总和减去前几个月的和 start #2878 frj 2019-11-27 10:56:13
        if (totalTemp != this.contractLedgerForm.clausePrice.monthBidElectric) {
          let electricity = parseFloat(
            this.contractLedgerForm.clausePrice.monthBidElectric -
            electricityTrade * (array.length - 1)
          ).toFixed(4);
          this.$set(
            this.jjfchdnTableData[array.length - 1],
            'month_bidding_electricity',
            electricity
          );
        } else {
          this.$set(
            this.jjfchdnTableData[array.length - 1],
            'month_bidding_electricity',
            electricityTrade
          );
        }
        // 分摊时不能除进时最后一个月份的值为总和减去前几个月的和 end #2878 frj 2019-11-27 10:56:13
      }
    },

    resetShare() {
      this.shareYear = false;
      this.shareMonth = false
    },

    resetElecFp() {

      this.clausePrice = {};
      this.elecFp = {
        yearLongTermElectricity: "",
        monthElectricityBidding: "",
        largeIndustrialPower: "",
        generalCommercialElectricity: "",
        singlePowerGeneration: "",
        twoPartPower: "",
        peakPower: "",
        peakLectricityPrice: "",
        horizontalElectricQuantity: "",
        horizontalElectricPrice: "",
        lowPower: "",
        lowPrice: "",
      };
      console.log("🚀 ~ file: bd.js ~ line 378 ~ resetElecFp ~ this.elecFp", this.elecFp)

    },

    resetBdFields() {
      this.resetShare();
      this.resetElecFp();

    }

  }
}

export default bd;
