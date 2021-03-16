/*
 * @功能描述: #3996 交易结果-发电新增多交易序列结果导入功能优化
 * @detail: 导入解析 list MIXINS
 * @作者: 陈飞
 * @Date: 2020-4-24 11:14:17
 * @最新修改内容: 
 * @LastEditTime: 2020-4-24 11:14:17
 */
export default {
  data() {
    return {
      cfbtns: function (data) {

      },
      errorcolumns: [
        {
          align: 'center',
          width: 80,
          label: '序号',
          prop: 'index',
        },
        {
          align: 'center',
          width: 150,
          label: '区域负责人',
          prop: 'contacts'
        },
        {
          align: 'center',
          width: 150,
          label: '客户名称',
          prop: 'customerName'
        },
        {
          align: 'center',
          width: 150,
          label: '交易中心编码',
          prop: 'tradingCenterRegistCode'
        },
        {
          align: 'center',
          width: 150,
          label: '上上月申报电量',
          prop: 'beforeDeclarationElectricity'
        },
        {
          align: 'center',
          width: 150,
          label: '上上月实际电量',
          prop: 'beforeActualPowerUseAnalysis'
        },
        {
          align: 'center',
          width: 150,
          label: '上上月偏差',
          prop: 'beforeDeviationPower'
        },
        {
          align: 'center',
          width: 150,
          label: '上上月偏率差',
          prop: 'last2MonthDiffRate'
        },
        {
          align: 'center',
          width: 150,
          label: '上月申报电量',
          prop: 'lastMonthDeclarationElectricity'
        },
        {
          align: 'center',
          width: 150,
          label: '上月偏差预测',
          prop: 'lastMonthDeviationForecast'
        },
        {
          align: 'center',
          width: 150,
          label: '上月偏差率预测',
          prop: 'lastMonthDeviationRateForecast'
        },

        {
          align: 'center',
          width: 150,
          label: '近期偏差统计',
          prop: 'recentlyDeviation'
        },
        {
          align: 'center',
          width: 150,
          label: '历史同期用电量',
          prop: 'lastYearActualElectricity'
        },
        {
          align: 'center',
          width: 150,
          label: '本月合同电量',
          prop: 'thisPeriodContractElectricity'
        },
        {
          align: 'center',
          width: 150,
          label: '上年月度最大用电量',
          prop: 'lastYearMostUsedElectricity'
        },
        {
          align: 'center',
          width: 150,
          label: '本月申报电量',
          prop: 'declarationElectricity'
        },
        {
          align: 'center',
          width: 150,
          label: '申报建议调整',
          prop: 'recommendedAdjustElectricity'
        },
        {
          align: 'center',
          width: 150,
          label: '调整后申报电量',
          prop: 'adjustedElectricity'
        },
        {
          align: 'center',
          width: 150,
          label: '申报日期',
          prop: 'declarationDate'
        },
        {
          align: 'center',
          width: 150,
          label: '备注',
          prop: 'description'
        },
        {
          align: 'center',
          width: 150,
          label: '错误原因',
          prop: 'remark'
        }  
      ]
    }
  },
  methods:{
    setNewColumn(agoAgoMonth, agoMonth){
      this.column[4].label = agoAgoMonth + '申报电量'
      this.column[5].label = agoAgoMonth + '实际用电量'
      this.column[6].label = agoAgoMonth + '偏差'
      this.column[7].label = agoAgoMonth + '偏差率'

      this.column[8].label = agoMonth + '申报电量'
      this.column[9].label = agoMonth + '偏差预测'
      this.column[10].label = agoMonth + '偏差率预测'

      this.errorcolumns[4].label = agoAgoMonth + '申报电量'
      this.errorcolumns[5].label = agoAgoMonth + '实际用电量'
      this.errorcolumns[6].label = agoAgoMonth + '偏差'
      this.errorcolumns[7].label = agoAgoMonth + '偏差率'

      this.errorcolumns[8].label = agoMonth + '申报电量'
      this.errorcolumns[9].label = agoMonth + '偏差预测'
      this.errorcolumns[10].label = agoMonth + '偏差率预测'

      this.columns = this.column;
    }
  }
}
