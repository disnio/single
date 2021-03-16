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
          width: 120,
          label: '交易序列名称',
          prop: 'jyxlmc'
        },
        {
          align: 'center',
          width: 120,
          label: '发电公司',
          prop: 'fdOrgName'
        },
        {
          align: 'center',
          width: 120,
          label: '交易单元',
          prop: 'tradingUnitName'
        },
        {
          align: 'center',
          width: 120,
          label: '线路',
          prop: 'tradingLineName'
        },
        {
          align: 'center',
          width: 120,
          label: '客户名称',
          prop: 'customerName'
        },
        {
          align: 'center',
          width: 120,
          label: '成交电量',
          prop: 'dealElectricity'
        },
        {
          align: 'center',
          width: 120,
          label: '成交电价',
          prop: 'dealPrice'
        },
        {
          align: 'center',
          label: '年份',
          prop: 'year'
        },
        {
          align: 'center',
          label: '1月',
          prop: 'month1'
        },
        {
          align: 'center',
          label: '2月',
          prop: 'month2'
        },

        {
          align: 'center',
          label: '3月',
          prop: 'month3'
        },
        {
          align: 'center',
          label: '4月',
          prop: 'month4'
        },
        {
          align: 'center',
          label: '5月',
          prop: 'month5'
        },
        {
          align: 'center',
          label: '6月',
          prop: 'month6'
        },
        {
          align: 'center',
          label: '7月',
          prop: 'month7'
        },
        {
          align: 'center',
          label: '8月',
          prop: 'month8'
        },
        {
          align: 'center',
          label: '9月',
          prop: 'month9'
        },
        {
          align: 'center',
          label: '10月',
          prop: 'month10'
        },
        {
          align: 'center',
          label: '11月',
          prop: 'month11'
        },
        {
          align: 'center',
          label: '12月',
          prop: 'month12'
        },
        {
          align: 'center',
          label: '备注',
          prop: 'remark'
        }
      ]
    }
  }
}
