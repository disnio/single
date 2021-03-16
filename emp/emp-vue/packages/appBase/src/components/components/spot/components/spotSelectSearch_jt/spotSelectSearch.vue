<!--
 * @功能描述: 现货竞报价系统-页面头部公共检索查询组件 #1155 集团账号进入赋默认值
 * @作者: 阿彪
 * @Date: 2020-06-13
 * @最新修改内容:
 * @LastEditTime: 2020-06-17 14:42:20
 *
 * @使用方法如下：
 * import spotSelectSearch from '@common/components/spot/components/spotSelectSearch'
 * components: { spotSelectSearch }
 * <spot-select-search></spot-select-search>
 -->
 <template>
  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline" label-width="100px">
      <el-form-item label="区域" v-if="areaCode">
        <el-select
          v-model="formInline.areaCode"
          @change="areaChange"
          placeholder="选择区域"
          :disabled="info.length == 3 || info.length == 2 || info.length == 4"
          style="width: 168px;"
        >
          <el-option
            v-for="(val, index) in areaList"
            :key="index"
            :label="val.orgName"
            :value="val.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="区域公司" v-if="areaCompanyCode">
        <el-select
          v-model="formInline.areaCompanyCode"
          @change="areaCompanyChange"
          placeholder="选择区域公司"
          :disabled="info.length == 3 || info.length == 4"
          style="width: 168px;"
        >
          <el-option
            v-for="(val, index) in areaCompanyList"
            :key="index"
            :label="val.orgSname"
            :value="val.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="交易中心" v-if="trandingCenter">
        <el-select
          v-model="formInline.tradingCenterCode"
          placeholder="选择交易中心"
          style="width: 168px;"
        >
          <el-option
            v-for="(val, index) in trandingCenterList"
            :key="index"
            :label="val.jyorgName"
            :value="val.jyorgId"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="发电公司" v-if="this.companyType && this.companyType === 'org'">
        <el-select
          v-model="formInline.orgCode"
          @change="orgChange"
          placeholder="选择发电公司"
          style="width: 168px;"
          :clearable="true"
          :disabled="info.length == 4"
        >
          <el-option
            v-for="(val, index) in orgList"
            :key="index"
            :label="val.orgName"
            :value="val.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="售电公司" v-if="this.companyType && this.companyType === 'supplier'">
        <el-select
          v-model="formInline.supplierCode"
          :disabled="info.length == 4"
          placeholder="请选择售电公司"
          style="width: 168px;"
          :clearable="true"
        >
          <el-option
            v-for="item in supplierList"
            :key="item.index"
            :label="item.orgName"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <!--20200528 #1100 zhangp 交易单元修改,发电公司为空时交易单元为禁用 -->
      <!-- #1188 交易单元设置可以被清空 -->
      <el-form-item label="交易单元" v-if="this.companyType && this.companyType === 'org' && unit">
        <el-select
          clearable
          v-model="formInline.unitCode"
          placeholder="选择交易单元"
          style="width: 168px;"
        >
          <el-option
            v-for="(val, index) in unitList"
            :key="index"
            :label="val.unitName"
            :value="val.unitId"
          ></el-option>
        </el-select>
      </el-form-item>
      <slot></slot>
      <el-form-item>
        <el-button
          type="primary"
          v-if="showBtn"
          :disabled="disabled"
          :loading="loading"
          @click="onSubmit"
        >查询</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getUserOrgInfo } from "@common/api/public/index"; // 用户信息
import { getAllOrgByPorgId } from "@common/api/decisionSupport/customerRenew/index"; // 区域、区域公司、售电公司、发电公司
import { getDataListByOrgId } from "@common/api/public/index"; // 交易中心
import { getJydyListByOrgId } from "@common/api/spot/configure/quotationParameters/index"; // 交易单元
import { getListAll } from "@common/api/spot/settl/electricityGenerationSettl/common/index"; // 交易单元
export default {
  name: "spotSelectSearch_jt",
  data() {
    return {
      formInline: {
        areaCode: "", // 区域值
        areaCompanyCode: "", // 区域公司值
        tradingCenterCode: "", // 交易中心值
        orgCode: "", // 发电公司值
        supplierCode: "", // 售电公司值
        unitCode: "" // 交易单元、机组值
      },
      areaList: [], // 区域list
      areaCompanyList: [], // 区域公司list
      trandingCenterList: [], // 交易中心list
      orgList: [], // 发电公司list
      supplierList: [], // 售电公司list
      unitList: [], // 交易单元、机组list
      info: {} // 用户信息
    };
  },
  props: {
    defaultValue: {
      type: Object,
      default: () => {
        return {
          areaCode: "001005", //南方区域
          areaCompanyCode: "001005001" //南方分公司
        };
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    areaCode: {
      type: Boolean,
      default: true
    },
    areaCompanyCode: {
      type: Boolean,
      default: true
    },
    companyType: {
      type: String,
      default: ""
    },
    trandingCenter: {
      type: Boolean,
      default: false
    },
    unit: {
      type: Boolean,
      default: false
    },
    showBtn: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    formInline: {
      handler(newValue, oldValue) {
        this.$emit("on-change", this.formInline);
      },
      deep: true
    }
  },
  created() {
    this.selectInit();
  },
  methods: {
    async selectInit() {
      let info = await getUserOrgInfo();
      this.info = info;
      let dataInfo = info[info.length - 1];
      switch (dataInfo.attributeTypeCode) {
        case "zzjgsx02":
          let obj = info.find(item => item.attributeTypeCode == "zzjgsx05");
          this.areaList = [{ id: obj.id, orgName: obj.orgName }];
          this.formInline.areaCode = this.areaList[0].id;
          let org = info.find(item => item.attributeTypeCode == "zzjgsx03");
          this.areaCompanyList = [{ id: org.id, orgSname: org.orgSname }];
          this.formInline.areaCompanyCode = this.areaCompanyList[0].id;
          if (this.trandingCenter) {
            this.trandingCenterList = await getDataListByOrgId({
              orgId: this.formInline.areaCompanyCode
            });
            this.formInline.tradingCenterCode = this.trandingCenterList[0].jyorgId;
          }
          this.orgList = [{ id: dataInfo.id, orgName: dataInfo.orgName }];
          this.formInline.orgCode = this.orgList[0].id;
          if (this.companyType && this.companyType === "org" && this.unit) {
            let unitData = await getListAll({
              porgId: this.formInline.orgCode
            });
            this.unitList = unitData.data;
            this.formInline.unitCode = this.unitList[0].unitId;
          }
          break;
        case "zzjgsx01":
          let arr = info.find(item => item.attributeTypeCode == "zzjgsx05");
          this.areaList = [{ id: arr.id, orgName: arr.orgName }];
          this.formInline.areaCode = this.areaList[0].id;
          let orgs = info.find(item => item.attributeTypeCode == "zzjgsx03");
          this.areaCompanyList = [{ id: orgs.id, orgSname: orgs.orgSname }];
          this.formInline.areaCompanyCode = this.areaCompanyList[0].id;
          if (this.trandingCenter) {
            this.trandingCenterList = await getDataListByOrgId({
              orgId: this.formInline.areaCompanyCode
            });
            this.formInline.tradingCenterCode = this.trandingCenterList[0].jyorgId;
          }
          this.supplierList = [{ id: dataInfo.id, orgName: dataInfo.orgName }];
          this.formInline.supplierCode = this.supplierList[0].id;
          break;
        case "zzjgsx03":
          let objs = info.find(item => item.attributeTypeCode == "zzjgsx05");
          this.areaList = [{ id: objs.id, orgName: objs.orgName }];
          this.formInline.areaCode = this.areaList[0].id;
          this.areaCompanyList = [
            { id: dataInfo.id, orgSname: dataInfo.orgSname }
          ];
          this.formInline.areaCompanyCode = this.areaCompanyList[0].id;
          if (this.trandingCenter) {
            this.trandingCenterList = await getDataListByOrgId({
              orgId: this.formInline.areaCompanyCode
            });
            this.formInline.tradingCenterCode = this.trandingCenterList[0].jyorgId;
          }
          if (this.companyType && this.companyType === "org") {
            this.orgList = await getAllOrgByPorgId({
              pOrgId: this.formInline.areaCompanyCode,
              attributeTypeCode: "zzjgsx02" // zzjgsx01 售电公司  zzjgsx02 发电公司
            });
            this.formInline.orgCode = this.orgList[0].id;
          }
          if (this.companyType && this.companyType === "supplier") {
            this.supplierList = await getAllOrgByPorgId({
              pOrgId: this.formInline.areaCompanyCode,
              attributeTypeCode: "zzjgsx01" // zzjgsx01 售电公司  zzjgsx02 发电公司
            });
            this.formInline.supplierCode = this.supplierList[0].id;
          }
          if (
            this.formInline.orgCode &&
            this.companyType &&
            this.companyType === "org" &&
            this.unit
          ) {
            let res = await getListAll({ porgId: this.formInline.orgCode });
            this.unitList = res.data;
            if (this.unitList.length > 0)
              this.formInline.unitCode = this.unitList[0].unitId;
          }
          break;
        case "zzjgsx05":
          this.areaList = [{ id: dataInfo.id, orgName: dataInfo.orgName }];
          this.formInline.areaCode = this.areaList[0].id;
          this.areaCompanyList = await getAllOrgByPorgId({
            pOrgId: this.areaList[0].id,
            attributeTypeCode: "zzjgsx03"
          });
          break;
        case "zzjgsx04":
          //20200613 阿彪 #1155  集团用户进入页面查询条件设置默认值南方区域 start
          this.areaList = await getAllOrgByPorgId({
            pOrgId: info[0].id,
            attributeTypeCode: "zzjgsx05"
          });
          this.formInline.areaCode = this.defaultValue.areaCode;
          this.areaCompanyList = await getAllOrgByPorgId({
            pOrgId: this.formInline.areaCode,
            attributeTypeCode: "zzjgsx03"
          });
          this.formInline.areaCompanyCode = this.defaultValue.areaCompanyCode;
          if (this.trandingCenter) {
            this.trandingCenterList = await getDataListByOrgId({
              orgId: this.formInline.areaCompanyCode
            });
            if (this.trandingCenterList.length > 0)
              this.formInline.tradingCenterCode = this.trandingCenterList[0].jyorgId;
          }
          if (this.companyType && this.companyType === "org") {
            this.orgList = await getAllOrgByPorgId({
              pOrgId: this.formInline.areaCompanyCode,
              attributeTypeCode: "zzjgsx02" // zzjgsx01 售电公司  zzjgsx02 发电公司
            });
            if (this.orgList.length > 0)
              this.formInline.orgCode = this.orgList[0].id;
          }
          if (this.companyType && this.companyType === "supplier") {
            this.supplierList = await getAllOrgByPorgId({
              pOrgId: this.formInline.areaCompanyCode,
              attributeTypeCode: "zzjgsx01" // zzjgsx01 售电公司  zzjgsx02 发电公司
            });
            if (this.supplierList.length > 0)
              this.formInline.supplierCode = this.supplierList[0].id;
          }
          if (
            this.formInline.orgCode &&
            this.companyType &&
            this.companyType === "org" &&
            this.unit
          ) {
            let res = await getListAll({ porgId: this.formInline.orgCode });
            this.unitList = res.data;
            if (this.unitList.length > 0)
              this.formInline.unitCode = this.unitList[0].unitId;
          }
          //20200613 阿彪 #1155  集团用户进入页面查询条件设置默认值南方区域 end
          break;
        default:
          this.formInline.areaCode = "";
          this.formInline.areaCompanyCode = "";
          this.formInline.tradingCenterCode = "";
          this.formInline.orgCode = "";
          this.formInline.supplierCode = "";
          this.formInline.unitCode = "";
          this.areaList = [];
          this.areaCompanyList = [];
          this.trandingCenterList = [];
          this.orgList = [];
          this.supplierList = [];
          this.unitList = [];
      }

      this.$emit("on-load", this.formInline);
    },
    // 区域切换
    async areaChange(id) {
      this.formInline.areaCompanyCode = "";
      this.areaCompanyList = [];

      this.formInline.tradingCenterCode = "";
      this.trandingCenterList = [];

      this.formInline.orgCode = "";
      this.orgList = [];

      this.formInline.supplierCode = "";
      this.supplierList = [];

      this.formInline.unitCode = "";
      this.unitList = [];

      this.areaCompanyList = await getAllOrgByPorgId({
        pOrgId: id,
        attributeTypeCode: "zzjgsx03"
      });
    },
    // 区域公司切换
    async areaCompanyChange(id) {
      this.formInline.tradingCenterCode = "";
      this.trandingCenterList = [];

      this.formInline.orgCode = "";
      this.supplierList = [];

      this.formInline.supplierCode = "";
      this.supplierList = [];

      this.formInline.unitCode = "";
      this.unitList = [];

      if (this.trandingCenter) {
        this.trandingCenterList = await getDataListByOrgId({ orgId: id });
        if (this.trandingCenterList.length > 0)
          this.formInline.tradingCenterCode = this.trandingCenterList[0].jyorgId;
      }

      if (this.companyType && this.companyType === "org") {
        this.orgList = await getAllOrgByPorgId({
          pOrgId: this.formInline.areaCompanyCode,
          attributeTypeCode: "zzjgsx02" // zzjgsx01 售电公司  zzjgsx02 发电公司
        });
        if (this.orgList.length > 0)
          this.formInline.orgCode = this.orgList[0].id;
        this.orgChange(this.formInline.orgCode);
      }
      if (this.companyType && this.companyType === "supplier") {
        this.supplierList = await getAllOrgByPorgId({
          pOrgId: this.formInline.areaCompanyCode,
          attributeTypeCode: "zzjgsx01" // zzjgsx01 售电公司  zzjgsx02 发电公司
        });
        if (this.supplierList.length > 0)
          this.formInline.supplierCode = this.supplierList[0].id;
      }
    },
    // 发电公司切换
    async orgChange(id) {
      this.formInline.unitCode = "";
      this.unitList = [];
      if (id != "" && typeof id != "undefined") {
        let res = await getListAll({ porgId: id });
        this.unitList = res.data;
        if (this.unitList.length > 0)
          this.formInline.unitCode = this.unitList[0].unitId;
      } else {
        this.unitList = [];
      }
    },
    // 点击查询 往外传值
    onSubmit() {
      this.$emit("on-submit", this.formInline);
    }
  }
};
</script>

<style lang="scss">
</style>
