/**
 * @file: fwmixin.js
 * @method
 * @description: 法务系统字段
 * @author: wsc
 * @date: 2020-10-10
 */
import { mapGetters, mapActions } from "vuex";
import fetch from "@common/utils/fetch";
import {
  getcustomerId,
  getAllocatedCustomerListByName,
  getCustomerContactsByOrgId
} from "@common/api/contractManage/contractLedger/index";
import { getSelectList } from "@common/api/base";
import _ from "lodash";

const fwmixin = {
  data() {
    return {
      hasStopReason: false,
      visibleStop: false,
      hts: [
        {
          type: 'monthlyPlan',
          key: 'sdhtlx09',
          value: '固定降价含分成',
        },
        {
          type: 'monthlyPlan',
          key: 'sdhtlx10',
          value: '固定降价含电压等级',
        },
        {
          type: 'monthlyPlan',
          key: 'sdhtlx11',
          value: '固定降价含能源类型',
        },

        {
          type: 'monthlyPlan',

          key: 'sdhtlx12',
          value: '竞价分成含多年',
        },

        {
          type: 'clausePlan',
          key: 'sdhtlx01',
          value: '标准固定降价',
        },
        {
          type: 'clausePlan',
          key: 'sdhtlx02',
          value: '标准竞价分成',
        },

        {
          type: 'clausePlan',
          key: 'sdhtlx03',
          value: '竞价保底分成',
        },
        {
          type: 'clausePlan',
          key: 'sdhtlx04',
          value: '固定降价+竞价分成',
        },
        {
          type: 'clausePlan',
          key: 'sdhtlx05',
          value: '固定降价+竞价保底分成',
        },
        {
          type: 'clausePlan',
          key: 'sdhtlx06',
          value: '标准服务合同',
        },
        {
          type: 'clausePlan',
          key: 'sdhtlx13',
          value: '服务合同含分成',
        },
        {
          type: 'clausePlan',
          key: 'sdhtlx08',
          value: '长协+竞价让利分成',
        },
        {
          type: 'no',
          key: 'sdhtlx07',
          value: '代理协议',
        },

        {
          type: 'no',
          key: 'sdhtlx15',
          value: '增值服务合同',
        },
        {
          type: 'no',
          key: 'sdhtlx16',
          value: '基准价服务合同',
        },
        {
          type: 'no',
          key: 'sdhtlx21',
          value: '固定服务费',
        },
      ],

      // 注意：后端接口 1 否， 0 是
      fwFlag: "1",
      legalFlag: "0",
      // todo wsc 法务系统必填字段
      // 类型：供应商、客户、两者皆是，三者分别对应字典数值为 0,1,2
      oppositeTypes: [],
      // 来源列表
      oppositeSourceTypes: [],
      // 国家列表
      oppositeCountryTypes: [],
      // 相对方性质列表
      oppositeEnterpriseTypes: {},
      // 合同类型编号
      oppositeContractTypes: {},
      // 收付方向
      payeeDirections: {},
      // 计价方式
      priceMethods: {},
      // 采购方式
      buyMethods: {},
      //资金来源
      fundSources: {},
      //合同币种
      contractCurrencyTypes: {},

      // 合同标的编码
      contractCodeTypes: [],
      // 适合语言
      useLanguages: {},
      // 开始日期，结束日期是否选择正确
      legalCheckFlag: false,
      //适用范本
      useModels: [],

      // 法务 end
      dimApi: '/api/admin/dim/getDimByPropCode?propCode='

    }
  },
  computed: {
    ...mapGetters(["dims"])
  },
  async created() {
    let dims = {
      //适用范本
      useModels: 'legal_interface17',
      //内部合同
      contractInsides: 'legal_interface16',
      //合同担保
      contractGuarantees: "legal_interface15",
      //重大合同
      greatContracts: "legal_interface14",
      //关联项目
      relateToProjects: "legal_interface13",
      //适用语言
      useLanguages: "legal_interface12",
      //涉外合同
      relateToOutsides: "legal_interface11",
      //合同币种
      contractCurrencyTypes: "legal_interface10",
      //资金来源
      fundSources: "legal_interface09",
      //采购方式
      buyMethods: "legal_interface08",
      //计价方式
      priceMethods: "legal_interface07",
      //收/付款方向
      payeeDirections: "legal_interface06",
      //相对方的合同类型
      oppositeContractTypes: "legal_interface05",
      //国家
      oppositeCountryTypes: "legal_interface04",
      //相对方性质
      oppositeEnterpriseTypes: "legal_interface03",
      //相对方来源
      oppositeSourceTypes: "legal_interface02",
      //相对方类型
      oppositeTypes: "legal_interface01",
      //合同标的
      contractCodeTypes: "legal_interface25",
    };

    _.keys(dims).forEach((k) => {
      this.getDims({ dim: dims[k] }).then((res) => {
        this[k] = res;
      });
    });


  },

  methods: {
    getTplName(sdTemplateName) {
      let tp = _.find(this.hts, v => v.key === sdTemplateName)
      return tp ? tp.value : ""
    },
    async getFawuIs() {
      try {
        const res = await fetch({
          url: '/api/admin/parameter/getValueByOrgIdAndCodeNoDefaultValue',
          method: 'get',
          params: {
            orgId: this.orgId,
            configurationId: "4",
            parameterCode: "1040009"
          }
        });

        if (res.rel) {
          this.fwFlag = res.data;
          console.log("fwflag:", this.fwFlag)
        } else {
          this.$notify({
            title: "提示",
            message: "法务状态获取失败",
            type: "warning",
            duration: 2000
          });
        }
      } catch (e) {
        this.$notify({
          title: "提示",
          message: e.msg,
          type: "warning",
          duration: 2000
        });
      }
    },
    intoFawu(set, type = "") {
      if (this.fwFlag === "0" && (type === "submit")) {
        this.$confirm("是否进入集团法务系统进行审批?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.contractLedgerForm.htContract.legalFlag = 1;

          if (this.contractLedgerForm.htContract.enclosure === '') {
            if (!this.isUpload) {
              this.submitForm(type);
            } else {
              set.uploadFileAdd.submit();
            }
          } else {
            if (!this.isUpload) {
              this.submitForm(type);
            } else {
              set.uploadFileAdd.submit();
            }
          }
        }).catch(() => {
          this.contractLedgerForm.htContract.legalFlag = 0;
          if (this.contractLedgerForm.htContract.enclosure === '') {
            if (!this.isUpload) {
              this.submitForm(type);
            } else {
              set.uploadFileAdd.submit();
            }
          } else {
            if (!this.isUpload) {
              this.submitForm(type);
            } else {
              set.uploadFileAdd.submit();
            }
          }
        });

      } else {
        this.contractLedgerForm.htContract.legalFlag = 0;
        if (this.contractLedgerForm.htContract.enclosure === '') {
          if (!this.isUpload) {
            this.submitForm(type);
          } else {
            set.uploadFileAdd.submit();
          }
        } else {
          if (!this.isUpload) {
            this.submitForm(type);
          } else {
            set.uploadFileAdd.submit();
          }
        }
      }
    },

    checkBaseTime() {
      var beginDate = new Date(
        this.contractLedgerForm.htContract.beginDate
      ).getTime();
      var endDate = new Date(
        this.contractLedgerForm.htContract.endDate
      ).getTime();
      if (beginDate > endDate) {
        this.$notify({
          title: "消息提醒",
          message: "失效日期必须大于生效日期!",
          type: "warning",
          duration: 2000
        });
      }
    },

    async getFirst(query, cusType) {
      this.firstPartyList = [];
      if (query !== "") {
        this.loading = true;

        let parme = {
          templateId: this.contractLedgerForm.htContract.templateId,
          cusType: cusType,
          custName: query,
          beginDate: this.contractLedgerForm.htContract.beginDate, //合同生效时间
          endDate: this.contractLedgerForm.htContract.endDate,   //合同截止时间
          contractType: this.contractLedgerForm.htContract.contractTypeCode,  //合同类型 only 售电合同
        };
        // tMdataCustomer/getCustomerByName
        try {
          const res = await fetch({
            url: '/api/customer/tMdataCustomer/getCustomerByName',
            method: 'get',
            params: parme,
          });
          if (res.rel) {
            this.loading = false;
            // contractLedgerForm.htContract.customerName
            if (res.data.customerInfo
              && res.data.customerInfo.length > 0) {
              this.firstPartyList = res.data.customerInfo;
            }
          }
        } catch (e) {
          this.$message({
            message: '获取客户列表出错',
            type: 'warning',
          });
        }

        // getAllocatedCustomerListByName(parme).then(res => {
        //
        // });

      } else {
        this.firstPartyList = [];
      }
    },

    // 售电
    getFirstPartyInfoSd(query) {
      this.getFirst(query, "")
    },

    // 模糊查询甲方信息 todo wsc getAllocatedCustomerListByName
    getFirstPartyInfo(query) {
      // 电力用户 khlb1
      this.getFirst(query, "khlb1")

    },

    //模糊查询选择甲方信息
    changeFirstPartyInfo(val) {
      console.log("change jj:", val)
      let cols = ["accountName", "addr", "affiliatedGroupId", "agentDate",
        "areaName", "areaCode", "crtTime", "crtUser", "customerCode", "customerId",
        "customerLevel", "customerName", "customerSname", "customerTypeCode",
        "depositBank", "depositBankAccount", "description", "enclosure", "fax",
        "groupIndustryType", "industrialPark", "industryCode", "isInternal",
        "legalPerson", "mainProduct", "orgId", "postCode", "powerGridCode",
        "powerScale", "provinceCode", "qygm", "qyxz", "registeredAddress",
        "registeringAddress", "registeringProperty", "sfcykqjy", "sfgfjy",
        "sfqdlkh", "sfyfdqybj", "signingStateCode", "socialCreditCode", "ssfdqy",
        "status", "tradingCenterRegistCode"];

      let customerCols = _.map(cols, v => _.upperFirst(v));
      if (val === undefined || val === null || val === "") {
        customerCols.forEach((k, i) => {
          this.contractLedgerForm.htContract[`customer${k}`] = ""
        });
        // todo wsc 2020-11-12
        this.contractLedgerForm.htContract.customerId = "";
        this.contractLedgerForm.htContract.customerName = "";

        return;
      }

      this.contractLedgerForm.mediatorAgencyCustomerList = [{
        customerName: "",
        customerId: "",
        industryCode: "",
        industryName: "",
        powerScale: ""
      }];

      let pp = _.find(this.firstPartyList, v => {
        return v.customerId.indexOf(val) !== -1
      });

      if (pp) {
        this.changeprovinceKh(pp.provinceCode);
        customerCols.forEach((k, i) => {
          this.contractLedgerForm.htContract[`customer${k}`] = pp[cols[i]]
        });
        // todo wsc 2020-11-12
        this.contractLedgerForm.htContract.customerId = pp.customerId;
        this.contractLedgerForm.htContract.customerName = pp.customerName;
        this.getPowerList(pp.customerId);
        this.getCustomerContacts(pp.customerId); //获取甲方联系人信息
      }

      console.log("change pp:", pp)
      if (_.has(this, "sdhtlx") && _.has(pp, 'yearPlan')) {
        let sdht = _.find(this.hts, v => v.key === this.sdhtlx);
        let yearPlan = pp.yearPlan;
        // todo ?? 是否要更改月度计划， 没有为 0？？
        // if(sdht.type === "monthlyPlan"){
        //   this.setPlan(yearPlan)
        // }

        if (sdht.type === "clausePlan") {
          this.contractLedgerForm.clausePlan = yearPlan;
        }
        // 这里只针对年度 sd， 没有年度计划就用合同原来的
        if (yearPlan && !_.isEmpty(yearPlan)) {
          this.contractLedgerForm.clausePrice.yearBilateElectric = yearPlan.yearBilateElectric;
          if (!isNaN(parseFloat(yearPlan.monthBidElectric))) {
            this.contractLedgerForm.clausePrice.monthBidElectric = yearPlan.monthBidElectric;
            this.contractLedgerForm.htContract.totalElectricity = yearPlan.yearBilateElectric + yearPlan.monthBidElectric;
            console.log("cfm1:", this.contractLedgerForm.htContract.totalElectricity)
          } else {
            this.contractLedgerForm.htContract.totalElectricity = yearPlan.yearBilateElectric;
            console.log("cfm2:", this.contractLedgerForm.htContract.totalElectricity)

          }
        }
      }

    },
    //获取甲方联系人信息
    getCustomerContacts(id) {
      let parame = {};
      parame.customerId = id;
      getCustomerContactsByOrgId(parame).then(res => {
        // #2648 增加res.data不为undefind判断
        if (res.data != undefined) {
          this.contractLedgerForm.htContract.customerContacts =
            res.data.contacts; //甲方联系人
          this.contractLedgerForm.htContract.customerMobilePhone =
            res.data.mobilePhone; //甲方电话
          this.contractLedgerForm.htContract.contactAddress =
            res.data.contactAddress; //甲方地址
        } else {
          this.contractLedgerForm.htContract.customerContacts = ""; //甲方联系人
          this.contractLedgerForm.htContract.customerMobilePhone = ""; //甲方电话
          this.contractLedgerForm.htContract.contactAddress = ""; //甲方地址
        }
      });
    },
    //-模糊查询乙方信息
    getSecondPartyInfo(query) {
      this.secondPartyList = [];
      let cusType = "khlb1";
      if (query !== "") {
        this.loading = true;

        let parme = { cusType: cusType, custName: query };
        getAllocatedCustomerListByName(parme).then(res => {
          // todo
          this.secondPartyList = res.data.customerInfo;
        });

      } else {
        this.secondPartyList = [];
      }
    },
    //模糊查询选择乙方信息
    changeSecondPartyInfo(val) {
      let cols = ["areaCode", "areaName", 'areaCode', "province",
        "tradeCenterRegistCode",
        "accountName", "addr",
        "affiliatedGroupId", "agentDate",
        "areaName", "crtTime", "crtUser",
        "customerCode", "customerId",
        "customerLevel", "customerName", "customerSname",
        "customerTypeCode", "depositBank",
        "depositBankAccount", "description",
        "enclosure", "fax", "groupIndustryType", "industrialPark",
        "industryCode", "isInternal", "legalPerson", "mainProduct", "orgId",
        "postCode", "powerGridCode", "powerScale", "provinceCode", "qygm", "qyxz",
        "registeredAddress", "registeringAddress", "registeringProperty", "sfcykqjy",
        "sfgfjy", "sfqdlkh", "sfyfdqybj", "signingStateCode", "socialCreditCode",
        "ssfdqy", "status", "tradingCenterRegistCode"];

      let customerCols = _.map(cols, v => _.upperFirst(v));

      if (val === undefined || val === null || val === "") {
        customerCols.forEach((k, i) => {
          this.contractLedgerForm.htContract[`sp${k}`] = ""
        });
        // todo wsc 2020-11-12
        this.contractLedgerForm.htContract.secondPartCode = "";
        this.contractLedgerForm.htContract.secondPartName = "";
        return;
      }
      this.secondPartyList.forEach(item => {
        if (item.customerId.indexOf(val) !== -1) {
          this.changeprovinceKhSp(item.provinceCode);
          customerCols.forEach((k, i) => {
            this.contractLedgerForm.htContract[`sp${k}`] = item[cols[i]]
          });
          this.contractLedgerForm.htContract.secondPartCode = item.customerId;
          this.contractLedgerForm.htContract.secondPartName = item.customerName;
          console.log("sp2:", this.contractLedgerForm.htContract)
        }
      });
    },
    // 重置法务字段
    resetLegal() {
      this.contractLedgerForm.legal = {
        // 计价方式
        priceMethod: "",
        // 是否内控审查节点
        internalReviewCode: "",
        // 审批人
        approvalNameCode: "",
        // 节点说明
        nodeDescription: "",
        // 顺序
        orderBy: "",
        // 层次
        levels: "",
        // 审批行ID
        approvalRowId: "",
        // 审批头ID
        approvalHeadId: "",
        // 收/付款计划
        payeePlan: "",
        // 提醒天数
        warnDays: "",
        // 收/付款比例
        payeePercent: 0,
        // 收/付款金额
        paymount: 0,
        // 履行时间
        lxDate: "",
        // 履行计划编号
        lxjhbh: "",
        // 合同收付款笔数
        payeeNumber: "",
        // 签订依据
        signBasis: "",
        // 合同简介
        contractContentBrief: "",
        //承办日期
        undertakeDate: "",
        //承办人员编码
        undertakePersonCode: "",
        // 使用范本
        useModel: "",
        // 内部合同
        contractInside: "",
        //合同担保
        contractGuarantee: "",
        // 重大合同
        greatContract: "",
        //关联项目
        relateToProject: "legal_interface1302",
        //涉外合同，没有列表
        relateToOutside: "legal_interface1102",
        // 适合语言
        useLanguage: "legal_interface1201",
        // 合同标的编码
        contractCodeType: "",
        // 合同金额/暂估金额
        contractpayee: "",
        //合同币种
        contractCurrencyType: "legal_interface1001",
        // 采购方式
        buyMethod: "",
        //资金来源
        fundSource: "legal_interface0901",
        // 收付方向
        payeeDirection: "legal_interface0602",
        // 开始日期，结束日期
        beginDate: "",
        endDate: "",
        // 相对方合同类型
        oppositeContractType: "legal_interface0501",
        // 签约主体编号
        contratSubjectCode: "",
        // 国家
        oppositeCountryType: "legal_interface0401",
        // 相对方性质
        oppositeEnterpriseType: "",
        // 相对方名称
        oppositeName: "",
        // 统一社会信用代码
        socialCreditCode: "",
        // 类型
        oppositeType: "",
        // 相对方来源
        oppositeSourceType: "legal_interface0203",
      }
    },
    //关闭
    close() {
      this.firstPartyList = [];
      this.fwFlag = "1";
      let nf = _.cloneDeep(this.contractLedgerForm);
      this.$emit("initList", {
        close: true,
        data: nf
      })
      this.resetFields(this.contractLedgerForm);
      if (_.has(this.contractLedgerForm, 'htContract')) {

        this.contractLedgerForm.htContract.legalFlag = 0;
      }

      this.addDialogVisible = false;
      this.resetLegal();
      if (_.has(this, 'resetBdFields')) {
        this.resetBdFields();
      }
    },
    resetFields(data) {
      for (let k in data) {
        if (data[k] instanceof Array) {
          data[k] = [];
        } else if (typeof data[k] == "object") {
          for (let l in data[k]) {
            data[k][l] = "";
          }
        }
      }
      return data;
    },
    // 采购方式
    get_buyMethod() {
      fetch({
        url: '/api/admin/dim/getDimByPropCode?propCode=legal_interface08',
        method: 'get',
      }).then((res) => {
        this.buyMethods = res;
      })
    },
    // 终止原因
    showReason() {
      this.visibleStop = true;
    },
    closeReason(flag) {
      this.visibleStop = false;
      this.hasStopReason = flag;
    },
    ...mapActions(["getDims"])
  },
}

export default fwmixin;
