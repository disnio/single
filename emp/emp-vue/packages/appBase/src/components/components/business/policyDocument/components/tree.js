/*
 * @功能描述: 
 * @版本: 
 * @作者: 康如涛
 * @Date: 2019-08-27 13:48:51
 * @最新修改内容: 
 * @LastEditTime : 2020-01-20 16:43:13
 */
let initTree = {};
initTree.data = [
  {
    "id": "001",
    "parentId": "-1",
    "value": "电力市场信息",
    "label": "电力市场信息",
    "children": [
      {
        "id": "0011",
        "value": "集团发文",
        "parentId": "001",
        "label": '集团发文',

      },
      {
        "id": "0012",
        "value": "政策法规",
        "label": '政策法规',
        "parentId": "001",
        "children": [
          {
            "id": "001201",
            "value": "发展规划",
            "parentId": "0012",
            "label": '发展规划',

          },
          {
            "id": "001202",
            "value": "市场建设",
            "parentId": "0012",
            "label": '市场建设',
            "children": [{
              "id": "00120201",
              "value": "中长期交易",
              "parentId": "001202",
              "label": '中长期交易',

            }, {
              "id": "00120202",
              "value": "现货交易",
              "parentId": "001202",
              "label": '现货交易',

            }, {
              "id": "00120203",
              "value": "售电侧改革",
              "parentId": "001202",
              "label": '售电侧改革',

            }, {
              "id": "00120204",
              "value": "辅助服务",
              "parentId": "001202",
              "label": '辅助服务',

            }, {
              "id": "00120205",
              "value": "信用体系",
              "parentId": "001202",
              "label": '信用体系',

            }, {
              "id": "00120206",
              "value": "碳排放",
              "parentId": "001202",
              "label": '碳排放',

            },],
          },
          {
            "id": "001203",
            "value": "电价",
            "parentId": "0012",
            "label": '电价',
            "children": [{
              "id": "00120301",
              "value": "上网电价",
              "parentId": "001203",
              "label": '上网电价',

            }, {
              "id": "00120302",
              "value": "输配电价",
              "parentId": "001203",
              "label": '输配电价',

            },
            {
              "id": "00120303",
              "value": "销售电价",
              "parentId": "001203",
              "label": '销售电价',

            }],
          },
          {
            "id": "001204",
            "value": "可再生能源",
            "parentId": "0012",
            "label": '可再生能源',

          },
          {
            "id": "001205",
            "value": "供热",
            "parentId": "0012",
            "label": '供热',

          },
          {
            "id": "001206",
            "value": "其他",
            "parentId": "0012",
            "label": '其他',
          },
        ],
      },
      {
        "id": "0013",
        "value": "交易信息",
        "parentId": "001",
        "label": '交易信息',
        "children": [
          {
            "id": "00131",
            "value": "交易公告",
            "parentId": "0013",
            "label": '交易公告'
          },
          {
            "id": "00132",
            "value": "交易结果",
            "parentId": "0013",
            "label": '交易结果'
          }

        ],
      },
      {
        "id": "0014",
        "value": "电改专题",
        "parentId": "001",
        "label": '电改专题'
      },
      {
        "id": "0015",
        "value": "电网信息",
        "parentId": "001",
        "label": '电网信息'
      },
      {
        "id": "0016",
        "value": "其他文件",
        "parentId": "001",
        "label": '其他文件'
      }

    ],
  },
  {
    "id": "002",
    "value": "通知公告",
    "parentId": "-1",
    "label": "通知公告",
    "children": [
      {
        "id": "0021",
        "value": "通知公告",
        "parentId": "002",
        "label": '通知公告'
      },
      {
        "id": "0022",
        "value": "新闻资讯",
        "parentId": "002",
        "label": '新闻资讯'
      }

    ],
  }
];
export default initTree;