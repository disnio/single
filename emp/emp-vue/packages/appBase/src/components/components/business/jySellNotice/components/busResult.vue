
<!--
 * @功能描述: 
 * @版本: 
 * @作者: 李志佳
 * @Date: 2019-11-01 09:35:40
 * @最新修改内容: 
 * @LastEditTime: 2021-03-09 17:36:01
 -->
<template>
  <div class="app-container calendar-list-container">
    <!--2019-11-11 #2620 张朋 弹框自适应高度赋值 -->
    <div :style="{paddingRight:'10px',height:dialogHeight+'px'}">
      <el-scrollbar>
        <div class="f-ml10 form-inline-168">
          <el-form
            :inline="true"
            :model="listRowData"
            :rules="rules"
            ref="listQueryForm"
            class="demo-form-inline"
          >
            <el-row>
              <el-col :span="6">
                <el-form-item label="交易序列名称" prop algin="right">
                  <el-input disabled v-model="this.ResultsInfo.jyxlmc" placeholder></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="交易品种" prop label-width="75px">
                  <el-input disabled v-model="this.ResultsInfo.tradingVarietyName" placeholder></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="交易方式" prop label-width="75px">
                  <el-input disabled v-model="this.ResultsInfo.tradingWayName" placeholder></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="报价方式" prop label-width="75px">
                  <el-input disabled v-model="this.ResultsInfo.quotationMethodName" placeholder></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="交易周期" prop label-width="95px" algin="right">
                  <el-input disabled v-model="this.ResultsInfo.tradingCycleName" placeholder></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="交易期次" prop label-width="75px">
                  <el-input disabled v-model="this.ResultsInfo.tradingTime" placeholder></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item prop label="状态" label-width="75px">
                  <el-input disabled v-model="this.ResultsInfo.statusName" placeholder></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <el-button-group class="f-mb10 p-releactive">
          <el-button
            class="filter-item"
            type="primary"
            @click="addRow"
            icon="el-icon-plus"
            :disabled="isdisabale"
            v-if="btn.jySellNoticeManager_btn_add"
          >新增</el-button>
          <!-- 2019-11-06 #2456 康如涛 暂时隐藏导入按钮  start-->
          <input
            class="result-upload"
            ref="importInput"
            val
            type="file"
            id="imFile"
            style="display: none"
            @change="importfxx(this)"
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          />
          <el-button
            class="filter-item"
            type="primary"
            icon="el-icon-upload"
            :disabled="isdisabale"
            v-if="btn.jySellNoticeManager_btn_import"
            @click="onUploadClick"
          >导入</el-button>
          <!-- 2019-11-06 #2456 康如涛 暂时隐藏导入按钮  end-->
          <!-- #2606 2019-11-18 张亮三 解决查看时导出按钮禁用问题 -->
          <el-button
            class="filter-item"
            type="primary"
            icon="el-icon-download"
            @click="handleExportResult"
            v-if="btn.jySellNoticeManager_btn_export"
          >导出</el-button>
          <el-button
            class="filter-item"
            type="primary"
            icon="el-icon-view"
            @click="showImportResult"
            :disabled="isdisabale"
          >导入解析</el-button>
          <el-button
            class="filter-item"
            type="primary"
            icon="el-icon-download"
            @click="downloadTemplateFile"
            :disabled="isdisabale"
          >模板下载</el-button>
        </el-button-group>
        <span
          style="float:right;display: inline-block;margin-top: 10px;"
        >单位：{{unitMap.electricityUnit}}、{{unitMap.priceUnit}}</span>
        <!-- 交易品种为 jypz09  售电合同转让交易 -->
        <el-table
          v-if="this.ResultsInfo.tradingVariety != 'jypz09'"
          :key="tableKey"
          :data="listQuery.detailList"
          v-loading.body="listLoading"
          @cell-mouse-enter="cellClick"
          border
          fit
          highlight-current-row
          style="width: 100%;"
          :height="tabHeight"
        >
         <!-- #4376 去掉选择框 -->
          <!-- <el-table-column align="center" width="55" type="selection"></el-table-column> -->
          <el-table-column
            :disabled="isdisabale"
            prop="index"
            label="序号"
            align="center"
            width="55px"
          ></el-table-column>
          <el-table-column align="center" label="单位名称">
            <template slot-scope="scope">
              <el-input disabled v-model="scope.row.sdOrgName"></el-input>
            </template>
          </el-table-column>
          <!-- 2020-06-04 #4151  qinhz 交易结果-售电-交易品种为省内直接交易新增购电侧交易单元 start-->
          <el-table-column align="center" width="120px" v-if="this.ResultsInfo.tradingVariety == 'jypz01' && isShow" label="购电侧交易单元">
            <template slot-scope="scope">              
              <el-select
                style="width:100%;"
                v-model="scope.row.powerPurchaseUnitCode"
                @change="tradingUnit($event, scope.row)"
                :loading="loading"
                clearable
                :disabled="isdisabale"
              >
                <el-option
                  v-for="(item, index) in powerTestTransactionUnit"
                  :key="index"
                  :label="item.propName"
                  :value="item.propCode"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <!-- 2020-06-04 #4151  qinhz 交易结果-售电-交易管理-交易结果新增购电侧交易单元 end-->
          <el-table-column align="center" label="交易线路">
            <template slot-scope="scope">
              <el-input disabled v-model="scope.row.transactionLineName"></el-input>
            </template>
          </el-table-column>
          <!-- liz 发电公司改变应该改变标杆电价 进行计算 -->
          <el-table-column align="center" label="发电公司" width="200px">
            <template slot-scope="scope">
              <el-tooltip
                v-if="scope.row.fdOrgIdStatus == 'ipt-err-true'"
                class="item"
                effect="dark"
                :content="scope.row.fdOrgIdStatusMsg"
                placement="top"
              >
                <el-autocomplete
                  v-model="scope.row.fdOrgName"
                  :fetch-suggestions="querySearchAsync"
                  placeholder="请输入内容"
                  @select="handleSelect($event, scope.row)"
                  :disabled="isdisabale"
                ></el-autocomplete>
              </el-tooltip>
              <el-autocomplete
                v-else
                v-model="scope.row.fdOrgName"
                :fetch-suggestions="querySearchAsync"
                placeholder="请输入内容"
                @select="handleSelect($event, scope.row)"
                :disabled="isdisabale"
              ></el-autocomplete>
            </template>
          </el-table-column>

          <el-table-column align="center" label="交易单元" width="140px">
            <template slot-scope="scope">
              <el-tooltip
                v-if="scope.row.tradingUnitIdStatus == 'ipt-err-true'"
                class="item"
                effect="dark"
                :content="scope.row.tradingUnitIdStatusMsg"
                placement="top"
              >
                <!-- wangc 20191223 #3249 新增交易结果校验-->
                <el-autocomplete
                  v-model="scope.row.tradingUnitName"
                  :class="scope.row.tradingUnitIdStatus"
                  :fetch-suggestions="getTradingUnitByName"
                  placeholder="请输入内容"
                  @select="selectTradingUnit($event, scope.row)"
                  :disabled="isdisabale"
                ></el-autocomplete>
              </el-tooltip>
              <el-autocomplete
                v-else
                v-model="scope.row.tradingUnitName"
                :fetch-suggestions="getTradingUnitByName"
                placeholder="请输入内容"
                @select="selectTradingUnit($event, scope.row)"
                :disabled="isdisabale"
              ></el-autocomplete>
            </template>
          </el-table-column>
          <!-- #3602 gaoaining 2020-01-16去掉输入时最小值为0和不能输入负值 start -->
          <el-table-column align="center" label="成交电量" width="140px">
            <template slot-scope="scope">
              <el-tooltip
                v-if="scope.row.dealElectricityStatus == 'ipt-err-true'"
                class="item"
                effect="dark"
                :content="scope.row.dealElectricityStatusMsg"
                placement="top"
              >
                <el-input
                  :disabled="isdisabale"
                  :class="scope.row.dealElectricityStatus"
                  v-model="scope.row.dealElectricity"
                ></el-input>
              </el-tooltip>
              <el-input v-else :disabled="isdisabale" v-model="scope.row.dealElectricity"></el-input>
            </template>
          </el-table-column>
          <el-table-column v-if="electricityPriceStyle" align="center" label="成交电价" width="140px">
            <template slot-scope="scope">
              <el-tooltip
                v-if="scope.row.dealPriceStatus == 'ipt-err-true'"
                class="item"
                effect="dark"
                :content="scope.row.dealPriceStatusMsg"
                placement="top"
              >
                <el-input
                  :disabled="isdisabale"
                  type="number"
                  :min="0"
                  :class="scope.row.dealPriceStatus"
                  v-model="scope.row.dealPrice"
                  @input="dd('p',scope.row,'3')"
                  onkeyup="this.value= this.value.match(/\d+(\.\d{0,8})?/) ? this.value.match(/\d+(\.\d{0,8})?/)[0] : ''"
                ></el-input>
              </el-tooltip>
              <el-input
                :disabled="isdisabale"
                type="number"
                :min="0"
                v-else
                v-model="scope.row.dealPrice"
                @input="dd('p',scope.row,'3')"
                onkeyup="this.value= this.value.match(/\d+(\.\d{0,8})?/) ? this.value.match(/\d+(\.\d{0,8})?/)[0] : ''"
              ></el-input>
            </template>
          </el-table-column>
          <!--2019-11-5 #2556 张朋 成交电价的报价方式为绝对价展现效果 start-->
          <el-table-column v-else align="center" label="成交电价" width="140px">
            <template slot-scope="scope">
              <el-tooltip
                v-if="scope.row.dealPriceStatus == 'ipt-err-true'"
                class="item"
                effect="dark"
                :content="scope.row.dealPriceStatusMsg"
                placement="top"
              >
                <el-input
                  :disabled="isdisabale"
                  :min="-999999999"
                  type="number"
                  @input="dd('p',scope.row,'3')"
                  :class="scope.row.dealPriceStatus"
                  v-model="scope.row.dealPrice"
                ></el-input>
              </el-tooltip>
              <el-input
                v-else
                :disabled="isdisabale"
                :min="-999999999"
                type="number"
                @input="dd('p',scope.row,'3')"
                v-model="scope.row.dealPrice"
              ></el-input>
            </template>
          </el-table-column>
          <!--2019-11-5 #2556 张朋 成交电价的报价方式为绝对价展现效果 end-->
          <!--2019-12-3 #2933  张朋 增加‘降幅’、‘绝对价’、‘标杆电价’、‘批复电价’字段-->
          <el-table-column align="center" label="降幅" width="140px">
            <template slot-scope="scope">
              <el-input
                disabled
                type="number"
                :class="scope.row.decline"
                v-model="scope.row.decline"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column align="center" label="绝对价" width="140px">
            <template slot-scope="scope">
              <el-input
                disabled
                type="number"
                :class="scope.row.dealPrice"
                v-model="scope.row.absolutePrice"
              ></el-input>
            </template>
          </el-table-column>
           <!-- liz 标杆电价进行修改 -->
          <el-table-column align="center" label="标杆电价" width="140px">
            <template slot-scope="scope">
              <el-select
                style="width:100%;"
                :disabled="isdisabale"
                @click.native ="clickBGDJ($event,scope.row, '1')"
                :class="scope.row.benchmarkElectricityPrice"
                v-model="scope.row.benchmarkElectricityPrice"  
                @change="calculation($event,scope.row, '4')"
              >
                <el-option
                  v-for="item in benchmarkPriceVariableArray"
                  :key="item"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <!-- #2723 wangc 20191121 发电/售电 -月电量分解 start-->
          <el-table-column
            v-for="item in mounthList"
            :key="item.id"
            :label="item.month"
            align="center"
            width="100"
          >
            <template slot-scope="scope">
              <el-input
                type="number"
                :min="0"
                onkeyup="this.value= this.value.match(/\d+(\.\d{0,8})?/) ? this.value.match(/\d+(\.\d{0,8})?/)[0] : ''"
                :disabled="isdisabale"
                v-model="scope.row[item.month]"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column fixed="right" v-if="!isdisabale" align="center" label="操作" width="100">
            <template slot-scope="scope">
              <el-button
                size="small"
                type="text"
                @click="handleDelete(scope.row)"
                :disabled="isdisabale"
                v-if="btn.jySellNoticeManager_btn_del"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <!--2019-11-22 #2702 阿彪 当交易品种为售电合同转让交易 弹窗 -->
        <el-table
          v-else
          :key="tableKey"
          :data="listQuery.detailList"
          v-loading.body="listLoading"
          @cell-mouse-enter="cellClick"
          border
          fit
          highlight-current-row
          style="width: 100%;"
          :height="tabHeight"
        >
         <!-- #4376 去掉选择框 -->
          <!-- <el-table-column align="center" width="55" type="selection"></el-table-column> -->
          <el-table-column
            :disabled="isdisabale"
            prop="index"
            label="序号"
            align="center"
            width="55px"
          ></el-table-column>
          <!-- 增加‘合同名称’、‘合同编号’字段，且为非必填项  #3047  秦侯珍   2019-12-06  start-->
          <el-table-column width="120px" align="center" label="合同名称">
            <template slot-scope="scope">
              <el-input :disabled="isdisabale" v-model="scope.row.contractName"></el-input>
            </template>
          </el-table-column>
          <el-table-column width="120px" align="center" label="合同编号">
            <template slot-scope="scope">
              <el-input :disabled="isdisabale" v-model="scope.row.contractCode"></el-input>
            </template>
          </el-table-column>
          <!-- 增加‘合同名称’、‘合同编号’字段，且为非必填项  #3047  秦侯珍   2019-12-06  end-->
          <el-table-column :disabled="isdisabale" prop label="类型" align="center">
            <template slot-scope="scope">
              <el-tooltip
                v-if="scope.row.typeStatus == 'ipt-err-true'"
                class="item"
                effect="dark"
                :content="scope.row.typeStatusMsg"
                placement="top"
              >
                <el-select
                  style="width:100%;"
                  :disabled="isdisabale"
                  :class="scope.row.typeStatus"
                  v-model="scope.row.type"
                >
                  <el-option
                    v-for="(item, index) in AssignmentType"
                    :key="index"
                    :label="item.propName"
                    :value="item.propCode"
                  ></el-option>
                </el-select>
              </el-tooltip>
              <el-select v-else style="width:100%;" :disabled="isdisabale" v-model="scope.row.type">
                <el-option
                  v-for="(item, index) in AssignmentType"
                  :key="index"
                  :label="item.propName"
                  :value="item.propCode"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column width="140px" align="center" label="售电公司">
            <template slot-scope="scope">
              <el-select
                disabled
                style="width:100%;"
                :class="scope.row.sdOrgNameStatus"
                v-model="scope.row.sdOrgName"
                @change="selectOrg"
                :remote-method="getOrgByName"
                filterable
                remote
                :loading="loading"
              >
                <el-option
                  v-for="item in orgFilterData"
                  :key="item.id"
                  :label="item.orgName"
                  :value="item.id"
                ></el-option>
              </el-select>
              <!-- <el-input :disabled="isEdit" v-model="scope.row.fdOrgId"></el-input> -->
            </template>
          </el-table-column>
          <el-table-column
            :disabled="isdisabale"
            width="140px"
            prop
            label="出/受让售电企业"
            align="center"
          >
            <template slot-scope="scope">
              <el-tooltip
                v-if="scope.row.sellOrAssigneeSdOrgNameStatus == 'ipt-err-true'"
                class="item"
                effect="dark"
                :content="scope.row.sellOrAssigneeSdOrgNameStatusMsg"
                placement="top"
              >
                <div :class="scope.row.sellOrAssigneeSdOrgNameStatus">
                  <el-select
                    style="width:100%;"
                    :class="scope.row.sellOrAssigneeSdOrgNameStatus"
                    v-model="scope.row.sellOrAssigneeSdOrgName"
                    @change="getSellOrAssigneeFdOrgId($event, scope.row)"
                    :remote-method="getAllDataList"
                    filterable
                    remote
                    :loading="loading"
                    :disabled="isdisabale"
                  >
                    <el-option
                      v-for="(item, index) in AllOrg"
                      :key="index"
                      :label="item.customerName"
                      :value="item.customerId"
                    ></el-option>
                  </el-select>
                </div>
              </el-tooltip>
              <el-select
                v-else
                style="width:100%;"
                v-model="scope.row.sellOrAssigneeSdOrgName"
                @change="getSellOrAssigneeFdOrgId($event, scope.row)"
                :remote-method="getAllDataList"
                filterable
                remote
                :loading="loading"
                :disabled="isdisabale"
              >
                <el-option
                  v-for="(item, index) in AllOrg"
                  :key="index"
                  :label="item.customerName"
                  :value="item.customerId"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <!-- #3581 gaoaining 2020-01-13  交易结果-售电 - 优化 start -->
          <el-table-column width="140px" align="center" label="发电企业">
            <template slot-scope="scope">
              <el-tooltip
                v-if="scope.row.fdOrgNameStatus == 'ipt-err-true' && scope.row.type =='csrlx_01'"
                class="item"
                effect="dark"
                :content="scope.row.fdOrgNameStatusMsg"
                placement="top"
              >
                <el-select
                  :disabled="isdisabale"
                  style="width:100%;"
                  :class="scope.row.fdOrgNameStatus"
                  v-model="scope.row.fdOrgName"
                  @change="selectOrgQy($event, scope.row)"
                  :remote-method="getOrgByName"
                  filterable
                  remote
                  :loading="loading"
                >
                  <el-option
                    v-for="item in orgFilterData"
                    :key="item.id"
                    :label="item.orgName"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-tooltip>
              <el-select
                v-else
                :disabled="isdisabale"
                style="width:100%;"
                v-model="scope.row.fdOrgName"
                @change="selectOrgQy($event, scope.row)"
                :remote-method="getOrgByName"
                filterable
                remote
                :loading="loading"
              >
                <el-option
                  v-for="item in orgFilterData"
                  :key="item.id"
                  :label="item.orgName"
                  :value="item.id"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column align="center" label="交易单元" width="140px">
            <template slot-scope="scope">
              <el-tooltip
                v-if="scope.row.tradingUnitNameStatus == 'ipt-err-true' && scope.row.type =='csrlx_01'"
                class="item"
                effect="dark"
                :content="scope.row.tradingUnitNameStatusMsg"
                placement="top"
              >
                <!-- wangc 20191223 #3249 新增交易结果校验 -->
                <el-autocomplete
                  v-model="scope.row.tradingUnitName"
                  :class="scope.row.tradingUnitNameStatus"
                  :fetch-suggestions="getTradingUnitByName"
                  placeholder="请输入内容"
                  @select="selectTradingUnit($event, scope.row)"
                  :disabled="isdisabale"
                ></el-autocomplete>
              </el-tooltip>
              <el-autocomplete
                v-else
                v-model="scope.row.tradingUnitName"
                :fetch-suggestions="getTradingUnitByName"
                placeholder="请输入内容"
                @select="selectTradingUnit($event, scope.row)"
                :disabled="isdisabale"
              ></el-autocomplete>
            </template>
          </el-table-column>
          <!-- #3581 gaoaining 2020-01-13  交易结果-售电 - 优化 start -->
          <el-table-column align="center" label="成交电量" width="140px">
            <template slot-scope="scope">
              <el-tooltip
                v-if="scope.row.dealElectricityStatus == 'ipt-err-true'"
                class="item"
                effect="dark"
                :content="scope.row.dealElectricityStatusMsg"
                placement="top"
              >
                <el-input
                  :disabled="isdisabale"
                  :class="scope.row.dealElectricityStatus"
                  v-model="scope.row.dealElectricity"
                ></el-input>
              </el-tooltip>
              <el-input v-else :disabled="isdisabale" v-model="scope.row.dealElectricity"></el-input>
            </template>
          </el-table-column>
          <el-table-column v-if="electricityPriceStyle" align="center" label="成交电价" width="140px">
            <template slot-scope="scope">
              <el-tooltip
                v-if="scope.row.dealPriceStatus == 'ipt-err-true'"
                class="item"
                effect="dark"
                :content="scope.row.dealPriceStatusMsg"
                placement="top"
              >
                <el-input
                  :disabled="isdisabale"
                  type="number"
                  :min="0"
                  :class="scope.row.dealPriceStatus"
                  @input="dd('p',scope.row,'3')"
                  v-model="scope.row.dealPrice"
                  onkeyup="this.value= this.value.match(/\d+(\.\d{0,8})?/) ? this.value.match(/\d+(\.\d{0,8})?/)[0] : ''"
                ></el-input>
              </el-tooltip>
              <!--2019-12-11 #3111 zhangp 添加input事件 -->
              <el-input
                :disabled="isdisabale"
                type="number"
                :min="0"
                @input="dd('p',scope.row,'3')"
                v-else
                v-model="scope.row.dealPrice"
                onkeyup="this.value= this.value.match(/\d+(\.\d{0,8})?/) ? this.value.match(/\d+(\.\d{0,8})?/)[0] : ''"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column v-else align="center" label="成交电价">
            <template slot-scope="scope">
              <el-tooltip
                v-if="scope.row.dealPriceStatus == 'ipt-err-true'"
                class="item"
                effect="dark"
                :content="scope.row.dealPriceStatusMsg"
                placement="top"
              >
                <el-input
                  :disabled="isdisabale"
                  :min="-999999999"
                  type="number"
                  @input="dd('p',scope.row,'3')"
                  :class="scope.row.dealPriceStatus"
                  v-model="scope.row.dealPrice"
                ></el-input>
              </el-tooltip>
              <el-input
                :disabled="isdisabale"
                :min="-999999999"
                type="number"
                v-else
                @input="dd('p',scope.row,'3')"
                v-model="scope.row.dealPrice"
              ></el-input>
            </template>
          </el-table-column>
          <!--2019-12-11 #3111  张朋 增加‘降幅’、‘绝对价’、‘标杆电价’、‘批复电价’字段-->
          <el-table-column align="center" label="降幅" width="140px">
            <template slot-scope="scope">
              <el-input
                disabled
                type="number"
                :class="scope.row.decline"
                v-model="scope.row.decline"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column align="center" label="绝对价" width="140px">
            <template slot-scope="scope">
              <el-input
                disabled
                type="number"
                :class="scope.row.dealPrice"
                v-model="scope.row.absolutePrice"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column align="center" label="标杆电价" width="140px">
            <template slot-scope="scope">
              <el-select
                style="width:100%;"
                :disabled="isdisabale"
                @click.native="clickBGDJ($event,scope.row,'1')" 
                :class="scope.row.benchmarkElectricityPrice"
                v-model="scope.row.benchmarkElectricityPrice"
                @change="calculation($event,scope.row,'4')"
              >
                <el-option
                  v-for="item in benchmarkPriceVariableArray"
                  :key="item"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column
            v-for="item in mounthList"
            :key="item.id"
            :label="item.month"
            align="center"
          >
            <template slot-scope="scope">
              <el-input
                type="number"
                :min="0"
                onkeyup="this.value= this.value.match(/\d+(\.\d{0,8})?/) ? this.value.match(/\d+(\.\d{0,8})?/)[0] : ''"
                :disabled="isdisabale"
                v-model="scope.row[item.month]"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column fixed="right" v-if="!isdisabale" align="center" label="操作" width="100">
            <template slot-scope="scope">
              <el-button
                size="small"
                type="text"
                @click="handleDelete(scope.row)"
                :disabled="isdisabale"
                v-if="btn.jySellNoticeManager_btn_del"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div v-show="!listLoading" class="pagination-container">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="resultListQuery.page"
            :page-sizes="[10, 20, 30, 50]"
            :page-size="resultListQuery.limit"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
      </el-scrollbar>
    </div>

    
    <div slot="footer" class="dialog-footer f-mt10" align="right">
      <el-button
        v-if="dialogStatus=='revise'"
        style="float:left;margin-left:30px;"
        @click="handlechangesRevise()"
      >修改记录</el-button>
      <el-button
        v-if="btn.jySellNoticeManager_btn_save"
        class="save-btn"
        :disabled="isdisabaleBtn"
        :loading="saveLoading"
        @click="update('11')"
      >保 存</el-button>
      <el-button
        v-if="btn.jySellNoticeManager_btn_submit"
        class="submit-btn"
        :disabled="isdisabale"
        :loading="submitLoading"
        @click="update('3')"
      >提 交</el-button>
      <el-button class="cancel-btn" @click="cancel">取 消</el-button>
    </div>


    <!-- #2871 2019-11-27 秦侯珍 增加修改记录组件 start -->
    <modifyRecord ref="modifyRecord"></modifyRecord>
    <!-- #2871 2019-11-27 秦侯珍 增加修改记录组件 end -->


    <!-- #3260 2019-12-29 秦侯珍 交易管理 - 交易结果-售电 - 新增导入功能  start -->
    <!-- 导入数据弹窗-->
    <important-dialog
      ref="importantDialog"
      :resultId="this.jyTradingResultsId"
      :tradingVariety="this.ResultsInfo.tradingVariety"
      :tradingWay="this.ResultsInfo.tradingWay"
      :mounthList="this.mounthList"
      :isShow="this.isShow"
      v-on:initList="initList"
      @cancelImport="cancelImport"
      v-on:downinfo1="downinfo1"
    ></important-dialog>
    <!-- 导入数据弹窗 end  -->
    <!-- 导入数据模板类型选择-->
    <el-dialog
      v-drag
      :close-on-click-modal="false"
      :append-to-body="true"
      title="交易结果导入"
      :visible.sync="importTypeDialog"
      custom-class="w640"
    >
      <div style="height:200px;">
        <el-row>
          <el-col :span="16">
            <div style="margin-top:20px;">
              <el-upload
                :class="!state?'upload-demo':'upload-demo views'"
                ref="uploadFileAdd"
                action="/api/business/jyTradingResultsDetail/upload"
                :accept="accept"
                :show-file-list="true"
                :limit="limit_number"
                :multiple="true"
                :headers="uplaodHeaders"
                :auto-upload="false"
                :file-list="myFileList"
                :data="uploadImportForm"
                :before-upload="handleBefore"
                :on-change="handleChange"
                :on-success="uploadSuccess"
                :on-exceed="handleExceed"
                :on-error="uploadErr"
              >
                <el-button
                  v-loading="importantLoading"
                  slot="trigger"
                  size="small"
                  type="primary"
                >选取文件</el-button>
              </el-upload>
            </div>
          </el-col>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button class="ok-btn" :loading="uploading" @click="uploadImportTemp()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 导入数据模板类型选择 end-->
    <!-- #3260 2019-12-29 秦侯珍 交易管理 - 交易结果-售电 - 新增导入功能  end -->
  </div>
</template>
<script>
import {
  resultPage,
  update,
  resultList,
  waySelectObj,
  varietySelectObj,
  centerSelectObj,
  periodSelectObj,
  delResultObj,
  addObj,
  importExcel,
  delResultId,
  putObj,
  ResultExportObj,
  getOrgAll,
  getCustomerAll,
  getTradingUnitAll,
  getOrgByName, //替换掉
  getAllOrgListByProvince,
  getSdOrgName,
  getTransactionLine,
  getTradingUnitByName,
  getDetailsPageList,
  getFdOrgData,
  selectOneBenchmarkPriceSale,
  selectListBenchmarkPriceSale
} from "@common/api/business/jySellNotice/index";
// #2723 wangc 20191121 查询月份 查询企业参数

import {
  getMonths,
  getclassify,
  getAssignmentType,
  getAllDataList,
  getValueByOrgIdAndCode,
  getValueByOrgIdAndCode2,
  getPowerTestTransactionUnit,
  getBenchmarkPrice,
  getJyBenchmarkPriceSale,
  downloadImportTemplate,
  getTradingStatus //解析状态
} from "@common/api/business/jyTransactionNotice/index";
import { getToken } from "@common/utils/auth";
//#3010 2019-12-06 张亮三 引入请求首页计量单位方法getHomeUnit
import { getHomeUnit } from "@common/api/dashboard/index";
import { getUserOrgInfo } from "@common/api/public/index";
import { getAllLinList } from "@common/api/basicData/TMdataTieLin/index";
//2019-11-11 #2620 张朋 引用弹框自适应路径
import {
  parseTime,
  getUnitMap,
  getUnitMapByModelCode,
  initDialogHeight
} from "@common/utils/index";
import { mapGetters } from "vuex";
import { create, all } from "mathjs";
const math = create(all);
export default {
  name: "result",
  props: {
    jyTradingResultsId: {
      type: String
    },
    jyTradingResultsInfo: {
      type: Object
    },
    varietyOptions: {
      type: Array
    },
    btn: {
      type: Object
    },
    wayOptions: {
      type: Array
    },
    centerOptions: {
      type: Array
    },
    periodOptions: {
      type: Array
    },
    quarterOptions: {
      type: Array
    },
    dialogStatus: {
      type: String
    },
    isdisabaleBtn: {
      type: Boolean
    },
    isdisabale: {
      type: Boolean
    },
    //2019-11-4 #2556 张朋 成交电价类型参数
    electricityPriceStyle: {
      type: Boolean
    },
    transactionData: {
      type: Array
    },
     //#4359 gaoaining 2020-06-24 接受组件传参
    isWhzz:{
      type:Boolean
    },
  },
  data() {
    return {
      
      powerTestTransactionUnit: [], //购电侧交易单元
      isShow: false,
      bgdjCheck: false,
      // #2723 wangc 20191121 月份数组
      mounthList: [],
      isSelectOrg: false,
      ResultsInfo: this.jyTradingResultsInfo,
      XL: "",
      transactionLineOption: [],

      isVisiable: true,
      yearData: "",
      monthData: "",
      quarterData: {
        quarter: "",
        year: ""
      },
      isTradingCycle: true,
      cycleQuarter: false,
      cycleYear: true,
      cycleMonth: false,
      lineOptions: [], //交易路线
      sdOrgFilterData: [], //单位名称
      orgFilterData: [], //发电公司
      loading: false, //检索等待
      delIds: "",
      isEdit: false,
      orgAttribute: "", //#3010 2019-12-16 张亮三 用于获取是哪个公司
      dialogFormVisible: false,
      dialogResultStatus: "",
      textMap: {
        update: "编辑",
        create: "新增"
      },
      tableKey: 0,
      rowForm: {},
      resultList: [],
      total: null,
      listLoading: false,
      listQuery: {
        jyTradingResultsId: undefined,
        orgType: "sell",
        status: "",
        noticeDate: undefined, //发布日期
        tradingTime: undefined, //交易期次
        tradingCenterId: undefined, //交易中心
        tradingVariety: undefined, //交易品种
        tradingWay: undefined, //交易方式
        tradingCycle: undefined, //交易周期
        detailList: []
      },
      resultPageQuery: {
        jyTradingResultsId: undefined
      },
      resultListQuery: {
        page: 1,
        limit: 10,
        jyTradingResultsId: undefined
      },

      rules: {
        tradingCenterId: [
          {
            required: true,
            message: "请选择交易中心",
            trigger: "change"
          }
        ],
        tradingTime: [
          {
            required: true,
            message: "请输入交易期次",
            trigger: "blur"
          }
        ],
        noticeDate: [
          {
            required: true,
            message: "请选择结束日期",
            trigger: "change"
          }
        ],
        tradingVariety: [
          {
            required: true,
            message: "请选择交易品种",
            trigger: "change"
          }
        ],
        tradingWay: [
          {
            required: true,
            message: "请选择交易方式",
            trigger: "change"
          }
        ],
        tradingCycle: [
          {
            required: true,
            message: "请选择交易周期",
            trigger: "change"
          }
        ],
        fdOrgId: [
          {
            required: true,
            message: "请输入",
            trigger: "blur"
          }
        ]
      },
      rowData: {}, //行数据
      dialogHeight: "", //2019-11-11 #2620 张朋 弹框获取自适应高度数据
      noticeDate: undefined,
      changefdOrgId: "",
      fileList: [],
      tradingUnitAll: [],
      tradingUnitFilterData: [],
      tradingUnitCell: null,
      listRowData: {},
      getListRowData: {}, //2019-12-4 3031 张朋 添加行信息
      checkFormObj: {
        sdOrgName: "",
        fdOrgName: "",
        tradingUnitName: "",
        dealElectricity: "",
        dealPrice: "",
        contractName: "",
        contractCode: ""
      },
      benchmarkPriceVariable: "",
      benchmarkPriceVariableArray: [],
      LastId: "",
      LastName: "",
      errorMsgList: {},
      OrgId: "",
      tabHeight: 200,
      unitMap: {},
      clearShow: true,
      classify: [],
      AssignmentType: [],
      AllOrg: [],
      jylxclasses: [], //交易类型
      accept:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel",
      limit_number: 1,
      uplaodHeaders: {},
      myFileList: [],
      uploadImportForm: {
        description: "jySellNotice",
        resultId: ""
      },
      importTypeDialog: false,
      importantLoading: false,
      canUplaodImport: true,
      state: false,
      uploading: false,
      saveLoading: false,
      submitLoading: false
    };
  },
  watch: {
    jyTradingResultsInfo(val) {
      this.ResultsInfo = val;   
    },
    
  },
  created() {
    if (sessionStorage.getItem("modelCode") == "dashboard") {
      // this.unitMap = getUnitMapByModelCode(
      //   this.allSubMenus,
      //   this.unitMap,
      //   "jyjg-sd"
      // );
      // #3010 2019-12-06 张亮三 当modelCode未首页时获取首页的计量单位 start
      this.getHomeUnitData(this.orgId, "jyjg-sd");
      // #3010 2019-12-06 张亮三 当modelCode未首页时获取首页的计量单位 end
    } else {
      this.unitMap = getUnitMap(this.allSubMenus, this.unitMap);
    }
    this.init();
    this.getResultList(this.dialogStatus, this.ResultsInfo);
    this.getTradingUnitData();
    this.getclassify();
    this.getAssignmentType();
    this.uplaodHeaders = {
      Authorization: getToken(),
      ModelCode: sessionStorage.getItem("modelCode")
    };
    getUserOrgInfo().then(res => {
      this.LastName = res[res.length - 1].orgName;
      this.LastId = res[res.length - 1].id;
    });
    getAllLinList().then(res => {
      if (res.rel) {
        this.transactionLineOption = res.data;
      }
    });
  },
  //#2871 2019-11-27 秦侯珍 引入修改记录组件
  components: {
    modifyRecord: () => import("../../../modifyRecord"),
    ImportantDialog: () => import("./ImportantDialog")
  },
  computed: {
    ...mapGetters(["elements", "orgId", "allSubMenus"])
  },
  /**2019-11-11 #2620 张朋  弹框自适应高度 start */
  mounted() {
    const that = this;
    this.dialogHeight = initDialogHeight(); //2019-11-12 #2620 张朋 获取弹框高度
    window.onresize = function temp() {
      that.dialogHeight = initDialogHeight(); //2019-11-12 #2620 张朋  获取弹框高度(监控高度变化)
    };
  },
  /**2019-11-11 #2620 张朋  弹框自适应高度 start */
  methods: {

    async getValueByOrgIdAndCode() {
      let params = {};
      params.parameterCode = "1030016";
      params.configurationId = "3";
      let res = await getValueByOrgIdAndCode2(params);   
      if (res == "0") {
        // 交易报价方案和结果是否展示购电侧交易单元
        this.isShow = true;
      } else {
        this.isShow = false;
      }

    },
    /**
     * @方法名称: getHomeUnitData
     * @功能描述: 获取首页计量单位
     * @参数:
     * @返回值:
     * @作者: 张亮三
     * @Date: 2019-12-06 17:51:38
     * @最新修改内容:
     * @LastEditTime:
     */
    getHomeUnitData(id, mcode) {
      let parm = {
        orgId: id,
        modelCode: mcode
      };
      getHomeUnit(parm).then(res => {
        let unitMaps = {};
        if (res.data && res.data != "") {
          unitMaps["electricityUnit"] = res.data[1];
          unitMaps["priceUnit"] = res.data[2];
          unitMaps["amountUnit"] = res.data[3];
          unitMaps["capacityUnit"] = res.data[4];
          this.unitMap = unitMaps;
        }
      });
    },
    querySearchAsync(queryString, cb) {
      var list = [{}];
      //发电公司模糊查询
      this.loading = true;
      this.isSelectOrg = true;
      this.orgFilterData = [];
      let parameters = { orgName: queryString };

      getAllOrgListByProvince(parameters).then(res => {
        if (typeof res != "undefined") {
          if (res.length > 0) {
            res.forEach(item => {
              list.push({
                value: item.orgName,
                orgId: item.id
              });
            });
          }
        }
        cb(list);
      });
    },
    init() {
      // this.getPowerTestTransactionUnit();
      this.getValueByOrgIdAndCode();
      this.getTradingUnitData();
      this.getCustomerData();
      this.getOrgData();
      this.getTransactionLine();
      this.setLayoutHeight();
    },
    cancelImport() {
      this.listLoading = false;
    },
    //2019-11-22 #2702 阿彪 售电合同转让交易弹窗 start
    getAssignmentType() {
      getAssignmentType().then(res => {
        this.AssignmentType = res;
      });
    },
    getclassify() {
      getclassify().then(res => {
        this.classify = res;
      });
    },
    //出/受让售电企业做成可模糊查询的下拉框  #3047  秦侯珍   2019-12-06  start
    getAllDataList(query) {
      //按名称模糊查询
      this.AllOrg = [];
      this.loading = true;
      let cantantName = {
        orgId: this.orgId,
        customerName: query
      };
      getAllDataList(cantantName).then(res => {
        this.loading = false;
        this.AllOrg = res.data;
      });
    },
    //出/受让售电企业做成可模糊查询的下拉框  #3047  秦侯珍   2019-12-06  end
    getSellOrAssigneeFdOrgId(data, row) {
      this.listQuery.detailList[row.index - 1].sellOrAssigneeSdOrgId = data;
    },
    selectOrgQy(data, row) {
      this.listQuery.detailList[row.index - 1].fdOrgId = data;
    },
    //2019-11-22 #2702 阿彪 售电合同转让交易弹窗 end
    setLayoutHeight() {
      this.tabHeight = initDialogHeight() * 0.55 + "px"; //2019-11-12 #2620 张朋 修改计算的表格高度
    },
    //点击交易周期匹配对应的交易期次
    changeTradingCycle(val) {
      if (val) {
        this.monthData = "";
        this.yearData = "";
        this.quarterData = {
          quarter: "",
          year: ""
        };
        this.isTradingCycle = false;
        this.cycleYear = false;
        this.cycleQuarter = false;
        this.cycleMonth = false;
        if (val == "jyzq01") {
          this.cycleYear = true;
        } else if (val == "jyzq02") {
          this.cycleQuarter = true;
        } else if (val == "jyzq03") {
          this.cycleMonth = true;
        }
      } else {
        this.monthData = "";
        this.yearData = "";
        this.quarterData = {
          quarter: "",
          year: ""
        };
        this.isTradingCycle = true;
      }
    },
    //获取对应的交易期次
    //年度
    getYearData(val) {
      if (val) {
        this.yearData = parseTime(val, "{y}");
      }
      this.listQuery.tradingTime = this.yearData;
    },
    //月度
    getMonthData(val) {
      if (val) {
        this.monthData = parseTime(val, "{y}-{m}");
      }
      this.listQuery.tradingTime = this.monthData;
    },
    //季度
    getQuarterDataYear(val) {
      if (val) {
        this.quarterData.year = parseTime(val, "{y}");
        this.listQuery.tradingTime =
          this.quarterData.year + "-" + this.quarterData.quarter;
      }
    },
    getQuarter(val) {
      if (val) {
        this.quarterData.quarter = val;
        this.listQuery.tradingTime =
          this.quarterData.year + "-" + this.quarterData.quarter;
      }
    },
    getTradingUnitData() {
      //获取所有交易单元数据
      // getTradingUnitAll().then(res => {
      //   this.tradingUnitAll = res;
      // });
    },
    getCustomerData() {
      //获取所有客户数据
      getCustomerAll().then(res => {
        this.customerAll = res;
      });
    },
    getOrgData() {
      //获取所有发电公司数据
      getOrgAll().then(res => {
        this.orgAll = res;
      });
    },
    getTradingUnitData() {
      //获取交易单元数据
      // getTradingUnitAll().then(res => {
      //   this.tradingUnitAll = res;
      // });
    },
    // #2723 wangc 20191121 处理期次参数
    whatTradingCycleCode(val) {
      const tradingCycleCode = {
        年度: "jyzq01",
        半年: "jyzq04",
        季度: "jyzq02",
        月度: "jyzq03",
        周: "jyzq06",
        不定期: "jyzq05"
      };
      return tradingCycleCode[val];
    },
    getResultList(status, data, code) {
      // console.log( this.isWhzz,1391)
      //2019-12-13 #3140 zhangp 根据交易方式获取标杆电价
      this.rowData = data;
      let id = this.rowData.tradingCenterId;
      getPowerTestTransactionUnit(id).then(res => {
        if(res.rel) {
          this.powerTestTransactionUnit = res.data
        }
      })
      //2019-12-13 #3140 zhangp 根据交易方式获取标杆电价
      //当交易方式为双边协商时
      this.orgAttribute = data.orgAttribute;
      this.benchmarkElectricityPrice = ""; //清空标杆电价
      this.bgdjCheck = false;
      if (data.tradingWay == "jyfs01") {
        this.benchmarkPriceVariableArray = [];
      } else {
        let object = {}
        getFdOrgData(this.orgId).then(res => {
          if (res.rel) {
            object.isSupplyHeat = res.data.isThermoelectricity;
            object.powerTypeCode = res.data.powerTypeCode;
            object.provinceCode = res.data.provinceCode;
            //2020-1-13 #3528 zhangp 增加调度电网的判断条件
            object.gridCode = res.data.gridCode;
            //2020-1-14 #3528 zhangp 当发电类型为水电时
            // if (object.powerTypeCode == "102") {
            //遍历交易周期数据，获取code值
            this.transactionData.forEach(rowData => {
              if (rowData.propName == this.rowData.tradingCycleName) {
                object.tradingCycle = rowData.propCode;
              }
            });
            let param = {
              isSupplyHeat: object.isSupplyHeat, //是否热电联产
              generationCategory: object.powerTypeCode, //发电类型
              provenceCode: object.provinceCode, //省份
              noticeDate: this.rowData.tradingTime, //交易期次
              powerGrid: object.gridCode, //电网
              tradeCycleCode: object.tradingCycle, //交易周期
              tradingWay: this.ResultsInfo.tradingWay //交易方式
            };
            //2020-05-29  #4120  qinhz  交易管理-交易结果（售电）标杆电价取数逻辑优化,填写完发电公司、成交电价后，降幅、绝对价未计算修改
            getJyBenchmarkPriceSale(param).then(res => {
              if (res.rel) {
                this.benchmarkPriceVariableArray = res.data;
              } else {
                this.benchmarkPriceVariableArray = [];
                // row.benchmarkElectricityPrice = "";
              }             
            });
          } else {
            return false;
          }
        });
      }

      // #2723 wangc 20191121 获取企业参数配置方法
      let obj = {
        orgId: this.orgId,
        configurationId: 3,
        parameterCode: 1030005
      };
      getValueByOrgIdAndCode(obj).then(res => {
        if (res == "0") {
          let params = {};
          params.tradingCycleCode = this.whatTradingCycleCode(
            data.tradingCycleName
          );
          params.tradingTime = data.tradingTime;
          getMonths(params).then(res => {
            this.mounthList = res.data;
            this.resultListQuery.jyTradingResultsId = data.jyTradingResultsId;
            this.getResult(data.jyTradingResultsId);
          });
        } else {
          //2019-12-3 #2971 张朋 查询详情信息
          this.resultListQuery.jyTradingResultsId = data.jyTradingResultsId;
          this.getResult(data.jyTradingResultsId);
        }
      });

      if (true) {
        this.isTradingCycle = false;
        this.cycleYear = false;
        this.cycleQuarter = false;
        this.cycleMonth = false;
        if (data.tradingCycle == "jyzq01") {
          this.cycleYear = true;
          this.yearData = data.tradingTime;
        } else if (data.tradingCycle == "jyzq02") {
          this.cycleQuarter = true;
          this.quarterData.year = data.tradingTime.slice(0, 4);
          this.quarterData.quarter = data.tradingTime.slice(5);
        } else if (data.tradingCycle == "jyzq03") {
          this.cycleMonth = true;
          this.monthData = data.tradingTime;
        }
        this.isEdit = false;
        for (let key in this.listQuery) {
          if (key != "orgType" && key != "status" && key != "detailList") {
            this.listQuery[key] = data[key];
          }
        }
        this.XL = "";
        this.rowForm = {
          index: "",
          transactionLine: "", //线路
          fdOrgId: "", //发电公司
          sdOrgId: "", //售电公司
          powerPurchaseUnitCode: "", //购电侧交易单元
          //customerName: "noNull", //客户名称
          dealElectricity: "noNull", //成交电量
          dealPrice: "noNull", //成交电价
          tradingUnitId: "", //交易单元
          // tradingClassify:"", //交易分类
          type: "", //类型
          sellOrAssigneeSdOrgName: "", //出/受让售电企业
          fdOrgName: "" //发电企业
        };
        if (data.tradingVariety == "jypz09") {
          this.rowForm.type = "noNull";
          this.rowForm.sellOrAssigneeSdOrgName = "noNull";
          //this.rowForm.fdOrgName="noNull";
          // wangc 20191223 #3249 新增交易结果校验
          //this.rowForm.tradingUnitId = "noNull";
        } else {
          // this.rowForm.tradingClassify = "";
          this.rowForm.type = "";
          this.rowForm.sellOrAssigneeSdOrgName = "";
          this.rowForm.fdOrgName = "";
        }
        if (data.tradingVariety == "jypz01" && data.tradingWay == "jyfs01") {
          this.rowForm.transactionLine = "";
          this.rowForm.tradingUnitId = "";
        } else if (
          data.tradingVariety == "jypz01" &&
          data.tradingWay == "jyfs02"
        ) {
          this.rowForm.transactionLine = "";
          this.rowForm.fdOrgId = "";
        } else if (
          data.tradingVariety == "jypz01" &&
          data.tradingWay == "jyfs03"
        ) {
          this.rowForm.transactionLine = "";
        } else if (
          data.tradingVariety == "jypz02" &&
          data.tradingWay == "jyfs01"
        ) {
          this.XL = data.tieLineId;
        } else if (
          data.tradingVariety == "jypz02" &&
          data.tradingWay == "jyfs02"
        ) {
          this.rowForm.fdOrgId = "";
          this.XL = data.tieLineId;
        } else if (
          data.tradingVariety == "jypz02" &&
          data.tradingWay == "jyfs03"
        ) {
          this.XL = data.tieLineId;
        }
      }
      if (status == "create") {
        this.listLoading = false;
        this.isEdit = false;
      }
    },
    getResult(id) {
      //获取交易结果列表
      let params = {};
      params.jyTradingResultsId = id;
      //  #3010 2019-12-16 张亮三 在首页不传orgType
      if (
        sessionStorage.getItem("modelCode") == "dashboard" &&
        this.orgAttribute == "SD"
      ) {
        params.orgType = "sell";
      } else {
        params.orgType = "sell";
      }
      params.sdOrgId = this.orgId;
      params.limit = this.resultListQuery.limit;
      params.page = this.resultListQuery.page;
      params.orgAttribute = this.orgAttribute;
      getDetailsPageList(params).then(res => {
        let items = res.data.rows.map((item, index) => {
          item.index =
            index +
            1 +
            (this.resultListQuery.page - 1) * this.resultListQuery.limit;
          return item;
        });
        this.listQuery.detailList = items;
        // #2723 wangc 20191121 查询月份 处理查询数据
        this.listQuery.detailList.forEach(element => {
          element.detailVal = this.mounthList;
        });
        this.total = res.data.total;
        this.listLoading = false;
      });
    },
    //选取发电公司
    async handleSelect(data, row) {
      this.changefdOrgId = data.orgId;
      this.listQuery.detailList[row.index - 1].fdOrgId = data.orgId;
      //20191216 阿彪 #3143 选择发电公司、以及对应的交易单元之后，重新选择发电公司，交易单元变为空，然后重新选择对应的交易单元。
      this.listQuery.detailList[row.index - 1].tradingUnitName = "";
      if(this.ResultsInfo.tradingWay == "jyfs01") {
        await this.clickBGDJ(data, row, "2");
        this.getBilateralConsultationCount(row);
      }else {
        // this.getBilateralConsultationCount(row);
      }
    },
    //获取 计算标杆电价数组
    clickBGDJ(data, row, click){
      if(this.bgdjCheck || this.ResultsInfo.tradingWay != "jyfs01") {
        return false;
      } else {
      this.benchmarkPriceVariableArray = [];
      let object = {};
      if (row.fdOrgId == "" || row.fdOrgId == null || typeof row.fdOrgId == "undefined") {
          return false;
      } else {
        getFdOrgData(row.fdOrgId).then(res => {
          if (res.rel) {
            object.isSupplyHeat = res.data.isThermoelectricity;
            object.powerTypeCode = res.data.powerTypeCode;
            object.provinceCode = res.data.provinceCode;
            //2020-1-13 #3528 zhangp 增加调度电网的判断条件
            object.gridCode = res.data.gridCode;
            //2020-1-14 #3528 zhangp 当发电类型为水电时
            // if (object.powerTypeCode == "102") {
            //遍历交易周期数据，获取code值
            this.transactionData.forEach(rowData => {
              if (rowData.propName == this.rowData.tradingCycleName) {
                object.tradingCycle = rowData.propCode;
              }
            });
            let param = {
              isSupplyHeat: object.isSupplyHeat, //是否热电联产
              generationCategory: object.powerTypeCode, //发电类型
              provenceCode: object.provinceCode, //省份
              noticeDate: this.rowData.tradingTime, //交易期次
              powerGrid: object.gridCode, //电网
              tradeCycleCode: object.tradingCycle, //交易周期
              tradingWay: this.ResultsInfo.tradingWay //交易方式
            };
            //2020-05-29  #4120  qinhz  交易管理-交易结果（售电）标杆电价取数逻辑优化,填写完发电公司、成交电价后，降幅、绝对价未计算修改
            getJyBenchmarkPriceSale(param).then(res => {
              if (res.rel) {
                this.benchmarkPriceVariableArray = res.data;
                if(click == "2") {
                  if(res.data.length == 0) {
                    row.benchmarkElectricityPrice = ""
                  } else {
                    row.benchmarkElectricityPrice = res.data[0];
                    this.calculation(data,row)
                  }
                }
              } else {
                this.benchmarkPriceVariableArray = [];
                row.benchmarkElectricityPrice = "";
              }             
            });
          } else {
            return false;
          }
        });    
      }
      }
    },
    dd(data, row, click){   
      if(this.ResultsInfo.tradingWay != "jyfs01"){
        this.bgdjCheck = true
        if(row.benchmarkElectricityPrice == '') {
          this.$set(row,'benchmarkElectricityPrice',this.benchmarkPriceVariableArray[0])
          // row.benchmarkElectricityPrice = this.benchmarkPriceVariableArray[0]
        }
        // if(this.listQuery.detailList[row.index - 1].benchmarkElectricityPrice == '') {
        //   this.$set(this.listQuery.detailList[row.index - 1],'benchmarkElectricityPrice',this.benchmarkPriceVariableArray[0])   
        // }
        this.calculation(data,row)
      } else {
        this.calculation(data, row, click)
      }
    },
    /**
     * @功能描述: 计算
     * @作者: 李志佳
     * @Date: 2019-12-05 20:16:31
     */
    calculation(data, row, click){
      // 关于计算的业务判断
      if (this.ResultsInfo.tradingWay == "jyfs01") {
        this.getBilateralConsultationCount(row);
      }else{
        this.$set(this.listQuery.detailList[row.index - 1],'benchmarkElectricityPrice',row.benchmarkElectricityPrice)
        // this.listQuery.detailList[row.index - 1].benchmarkElectricityPrice = row.benchmarkElectricityPrice;
        //2020-05-29  #4120  qinhz  双边协商交易结果，填写完发电公司、成交电价后，降幅、绝对价未计算修改 
        if (row.benchmarkElectricityPrice == null || typeof row.benchmarkElectricityPrice == "undefined") {
          this.listQuery.detailList[row.index - 1].benchmarkElectricityPrice = "";         
        } 
        // #3403 2019-01-02 张亮三 解决绝对价不实时计算问题 start
        //当报价方式为价差时
        if (this.ResultsInfo.quotationMethod == "bjfs01") {
          if (row.dealPrice != "") {
            //降幅取成交电价的绝对值
            let decline = (this.listQuery.detailList[
              row.index - 1
            ].decline = Math.abs(Number(row.dealPrice)));
            //2019-12-10 #2933 zhangp 绝对价=批复电价-|降幅| 精确计算
            this.listQuery.detailList[
              row.index - 1
            ].absolutePrice = math.format(
              math
                .chain(
                  math.bignumber(
                    Number(
                      this.listQuery.detailList[row.index - 1]
                        .benchmarkElectricityPrice
                    )
                  )
                )
                .subtract(math.bignumber(Math.abs(decline)))
                .done()
            );
          } else {
            this.listQuery.detailList[row.index - 1].absolutePrice = "";
            this.listQuery.detailList[row.index - 1].decline = "";
          }
        } else {
          if (row.dealPrice != "") {
            //绝对价取成交电价
            let absolutePrice = (this.listQuery.detailList[
              row.index - 1
            ].absolutePrice = Number(row.dealPrice));
            //2019-12-10 #2933 zhangp 降幅取标标杆电价-绝对价的绝对值 精确计算
            this.listQuery.detailList[row.index - 1].decline = math.abs(
              math.format(
                math
                  .chain(
                    math.bignumber(
                      Number(
                        this.listQuery.detailList[row.index - 1]
                          .benchmarkElectricityPrice
                      )
                    )
                  )
                  .subtract(math.bignumber(absolutePrice))
                  .done()
              )
            );
          } else {
            this.listQuery.detailList[row.index - 1].absolutePrice = "";
            this.listQuery.detailList[row.index - 1].decline = "";
          }
        }
        // #3403 2019-01-02 张亮三 解决绝对价不实时计算问题 end
        // this.clickBGDJ(data, row, "3")
      }
    },
    //成交电价触发时双边协商计算方法
    getBilateralConsultationCount(row) {
      //2019-12-13 #3140 zhangp 标杆电价判断逻辑
      if (
        row.benchmarkElectricityPrice == null ||  
        row.benchmarkElectricityPrice == "" ||
        typeof row.benchmarkElectricityPrice == "undefined"
      ) {
        Vue.set(
          this.listQuery.detailList[row.index - 1],
          "benchmarkElectricityPrice",
          ""
        );
      }
      
      
      //当报价方式为价差时
      if (this.ResultsInfo.quotationMethod == "bjfs01") {
        if (row.dealPrice != "") {
          //降幅取成交电价的绝对值
          let decline = Vue.set(
            this.listQuery.detailList[row.index - 1],
            "decline",
            Math.abs(Number(row.dealPrice))
          );
          //2019-12-10 #2933 zhangp 绝对价=批复电价-|降幅| 精确计算

          Vue.set(
            this.listQuery.detailList[row.index - 1],
            "absolutePrice",
            math.format(
              math
                .chain(
                  math.bignumber(
                    Number(
                      this.listQuery.detailList[row.index - 1]
                        .benchmarkElectricityPrice
                    )
                  )
                )
                .subtract(math.bignumber(Math.abs(Number(decline))))
                .done()
            )
          );         
        } else {
          this.listQuery.detailList[row.index - 1].absolutePrice = "";
          this.listQuery.detailList[row.index - 1].decline = "";
        }
      } else {
        if (row.dealPrice != "") {
          //绝对价取成交电价
          let absolutePrice = (this.listQuery.detailList[
            row.index - 1
          ].absolutePrice = Number(row.dealPrice));
          //2019-12-10 #2933 zhangp 降幅取标标杆电价-绝对价的绝对值 精确计算
          // #3403 2019-01-02 张亮三 解决绝对价不实时计算问题 start
          Vue.set(
            this.listQuery.detailList[row.index - 1],
            "decline",
            math.abs(
              math.format(
                math
                  .chain(
                    math.bignumber(
                      Number(
                        this.listQuery.detailList[row.index - 1]
                          .benchmarkElectricityPrice
                      )
                    )
                  )
                  .subtract(math.bignumber(Number(absolutePrice)))
                  .done()
              )
            )
          );
          // #3403 2019-01-02 张亮三 解决绝对价不实时计算问题 end
        } else {
          this.listQuery.detailList[row.index - 1].absolutePrice = "";
          this.listQuery.detailList[row.index - 1].decline = "";
        }
      }
    },
    getResultPage() {
      //获取交易主表
      resultPage(this.resultPageQuery).then(response => {
        this.listQuery = response;
        this.listLoading = false;
      });
    },

    addRow() {
      this.dialogResultStatus = "create";
      this.isEdit = false;
      let list = {};
      // wangc 20191223 #3249 新增交易结果校验
      //  if(this.ResultsInfo.tradingVariety == "jypz09"){
      //     this.rowForm.tradingUnitId = "noNull";
      //   }
      for (let key in this.rowForm) {
        if (key != "index") {
          if (this.rowForm[key] == "noNull") {
            list[key] = "";
            list[key + "Status"] = "";
            list[key + "StatusMsg"] = "";
          } else {
            list[key] = "";
          }
        } else {
          list[key] = this.listQuery.detailList.length + 1;
        }
      }
      list.sdOrgName = this.LastName;
      list.sdOrgId = this.orgId;
      // list.transactionLine = this.XL;
      list.transactionLineName = this.ResultsInfo.tieLineName;
      list.transactionLine = this.ResultsInfo.tieLineId;
      list.tradingUnitName = ""; //20191217 阿彪 #3173 交易单元选不上，原因是新增时list中没有预定义tradingUnitName
      this.listQuery.detailList.push(list);
    },
    checkTab() {
      let data = {
        status: true,
        errIndex: []
      };
      let reg = /^\d+(\.\d+)?$/; //数字验证
      this.isErr = false;
      for (let i = 0, l = this.listQuery.detailList.length; i < l; i++) {
        for (let key in this.rowForm) {
          if (this.rowForm[key] == "noNull") {
            let a = key;
            let b = key + "Status";
            let c = key + "StatusMsg";
            //2019-11-4 #2556 张朋 初始化不标红
            Vue.set(this.listQuery.detailList[i], b, "");
            Vue.set(this.listQuery.detailList[i], c, "");
            if (
              // 2019年11月1日09:40:01 #2540  李志佳 交易管理-交易结果-售电-优化
              this.listQuery.detailList[i][a] === "" ||
              typeof this.listQuery.detailList[i][a] == "undefined"
            ) {
              if (data.status != false) {
                data.status = false;
              }
              Vue.set(this.listQuery.detailList[i], b, "ipt-err-true");
              Vue.set(this.listQuery.detailList[i], c, "不能为空值");
              this.isErr = true;
            } else {
              //当electricityPriceStyle为false时，报价方式为价差
              /**2019-11-4  #2556 张朋 验证成交电价类型  start*/
              //2019-11-6  #2556 张朋 当报价方式为价差时电价判断条件调整
              //#4369 gaoaining 2020-06-28 交易品种：省内直接交易  交易方式：集中竞价  当前组织所属的区域公司上述企业参数值为“是”时， “成交电价”可以维护正数；start
                if(!this.isWhzz){
                  if (this.electricityPriceStyle == false && key == "dealPrice") {
                      //2019-11-7 #2556 张朋  成交电价为价差方式是小于等于0
                      if (this.listQuery.detailList[i].dealPrice > 0) {
                        Vue.set(this.listQuery.detailList[i], b, "ipt-err-true");
                        //成交电价错误提示
                        Vue.set(this.listQuery.detailList[i], c, "成交电价应为负数");
                        if (data.status != false) {
                          data.status = false;
                        }
                      } else if (
                        this.listQuery.detailList[i].dealPrice.length -
                          (String(this.listQuery.detailList[i].dealPrice).indexOf(
                            "."
                          ) +
                            1) >
                        8
                      ) {
                        Vue.set(this.listQuery.detailList[i], b, "ipt-err-true");
                        Vue.set(this.listQuery.detailList[i], c, "只限制8位小数");
                        data.status = false;
                      }
                      /**2019-11-4  #2556 张朋 验证成交电价类型  end*/
                    } else {
                      if (data.status != false) {
                        data.status = true;
                      }
                    }

                }
              //#4369 gaoaining 2020-06-28 交易品种：省内直接交易  交易方式：集中竞价  当前组织所属的区域公司上述企业参数值为“是”时， “成交电价”可以维护正数；end

              // #3279 2019-12-25 张亮三 判断成交电量是负值还是正值 start
              if (
                this.listQuery.detailList[i].type == "csrlx_01" &&
                key == "dealElectricity"
              ) {
                if (this.listQuery.detailList[i].dealElectricity > 0) {
                  Vue.set(this.listQuery.detailList[i], b, "ipt-err-true");
                  //成交电量错误提示
                  Vue.set(this.listQuery.detailList[i], c, "成交电量应为负数");
                  if (data.status != false) {
                    data.status = false;
                  }
                }
              } else if (
                this.listQuery.detailList[i].type == "csrlx_02" &&
                key == "dealElectricity"
              ) {
                if (this.listQuery.detailList[i].dealElectricity < 0) {
                  Vue.set(this.listQuery.detailList[i], b, "ipt-err-true");
                  //成交电量错误提示
                  Vue.set(this.listQuery.detailList[i], c, "成交电量应为正数");
                  if (data.status != false) {
                    data.status = false;
                  }
                }
              }
              // #3279 2019-12-25 张亮三 判断成交电量是负值还是正值 end
            }
          }
        }
        //#3581 gaoaining 2020-01-13  交易结果-售电 - 优化 start
        if (this.listQuery.detailList[i]["type"] == "csrlx_01") {
          if (
            this.listQuery.detailList[i]["tradingUnitName"] == "" ||
            typeof this.listQuery.detailList[i]["tradingUnitName"] ==
              "undefined"
          ) {
            this.rowForm.tradingUnitName = "noNull";
            Vue.set(
              this.listQuery.detailList[i],
              "tradingUnitNameStatus",
              "ipt-err-true"
            );
            Vue.set(
              this.listQuery.detailList[i],
              "tradingUnitNameStatusMsg",
              "不能为空值"
            );
            data.status = false;
          } else {
            this.rowForm.tradingUnitName = "";
            Vue.set(this.listQuery.detailList[i], "tradingUnitNameStatus", "");
            Vue.set(
              this.listQuery.detailList[i],
              "tradingUnitNameStatusMsg",
              ""
            );
          }

          if (
            this.listQuery.detailList[i]["fdOrgName"] == "" ||
            typeof this.listQuery.detailList[i]["fdOrgName"] == "undefined"
          ) {
            this.rowForm.fdOrgName = "noNull";
            Vue.set(
              this.listQuery.detailList[i],
              "fdOrgNameStatus",
              "ipt-err-true"
            );
            Vue.set(
              this.listQuery.detailList[i],
              "fdOrgNameStatusMsg",
              "不能为空值"
            );
            data.status = false;
          } else {
            this.rowForm.fdOrgName = "";
            Vue.set(this.listQuery.detailList[i], "fdOrgNameStatus", "");
            Vue.set(this.listQuery.detailList[i], "fdOrgNameStatusMsg", "");
          }
          //#3581 gaoaining 2020-01-13  交易结果-售电 - 优化 end
        }
      }
      // ##
      return data;
    },

    //导入标红
    checkerrorMsgList() {
      let detailList = Object.assign([], this.listQuery.detailList);
      let errorMsgList = this.errorMsgList;
      if (errorMsgList.length > 0) {
        errorMsgList.forEach((item, index) => {
          this.isEdit = false;
          for (var key in item) {
            if (key != "index") {
              detailList[item.index][item[key] + "Status"] = true;
            }
            if (key == "fdOrgId") {
              detailList[item.index].fdOrgId = item[key];
            }
          }
        });
        this.listQuery.detailList = [];
        this.listQuery.detailList = detailList;
      }
    },

    //新增方法
    create(state) {
      let data = this.checkTab();
      if (!data.status) {
        return false;
      }
      if (
        !this.listQuery.noticeDate ||
        !this.listQuery.tradingTime ||
        !this.listQuery.tradingCenterId ||
        !this.listQuery.tradingVariety ||
        !this.listQuery.tradingWay ||
        !this.listQuery.tradingCycle
      ) {
        this.$notify({
          title: "提示",
          message: "主表信息不全",
          type: "warning",
          duration: 2000
        });
      } else {
        if (
          this.listQuery.tradingCycle == "jyzq02" &&
          this.listQuery.tradingTime.length < 6
        ) {
          this.$notify({
            title: "提示",
            message: "交易期次信息不全",
            type: "warning",
            duration: 2000
          });
        } else {
          let data = this.checkTab();
          if (!data.status) {
            this.$notify({
              title: "提示",
              message: "表格数据未填完整",
              type: "warning",
              duration: 2000
            });
            return false;
          }
          this.listQuery.status = state;
          this.listQuery.noticeDate = this.noticeDate;
          addObj(this.listQuery).then(res => {
            if (res.rel) {
              this.$notify({
                title: "成功",
                message: "新增成功",
                type: "success",
                duration: 2000
              });
              this.$emit("closeResultDialog");
              this.resetTemp();
              this.$emit("callList");
            } else {
              this.errorMsgList = res.data;
              this.checkerrorMsgList();
            }
          });
        }
      }
    },
    putObjCom(data) {
      let params = {};
      params = this.ResultsInfo;
      params.orgType = "sell";
      this.listQuery.detailList.forEach(element => {
        // #3340 2019-12-26 张亮三  解决交易单元删除后 重现问题 start
        if (
          element.tradingUnitName == "" ||
          element.tradingUnitName == "undefined"
        ) {
          element.tradingUnitId = "";
        }
        // #3340 2019-12-26 张亮三  解决交易单元删除后重现问题 end
        element.status = data;
        element.orgType = "sell";
      });
      params.detailList = this.listQuery.detailList;
      params.detailList.forEach((element, count) => {
        //2019-11-9 #2556 张朋 当交易报价为绝对值时成交电价不进行切分
        if (this.electricityPriceStyle == true) {
          //判断成交成电价不为空时
          if (
            element.dealPrice != null ||
            element.dealPrice != "" ||
            typeof element.dealPrice != undefined
          ) {
            let dealPrice = element.dealPrice + "";
            //2019-11-5 #2556 张朋 如果没有小数点不进行切分
            if (dealPrice.indexOf(".") != -1) {
              let point = dealPrice.indexOf(".");
              params.detailList[count].dealPrice = dealPrice.slice(
                0,
                point + 9
              );
              //2019-10-29 #2473 截取字符串取第一个数为'-'
              if (params.detailList[count].dealPrice.substring(0, 1) == "-") {
                params.detailList[count].dealPrice = dealPrice.slice(
                  1,
                  params.detailList[count].dealPrice.length
                );
              }
            }
          }
        }
        //判断电量值不为空时
        if (
          element.dealElectricity != null ||
          element.dealElectricity != "" ||
          typeof element.dealElectricity != undefined
        ) {
          let dealElectricity = element.dealElectricity + "";
          //2019-11-5 #2556 张朋 如果没有小数点不进行切分
          if (dealElectricity.indexOf(".") != -1) {
            let point = dealElectricity.indexOf(".");
            params.detailList[count].dealElectricity = dealElectricity.slice(
              0,
              point + 9
            );
            //#3602 gaoaining 2020-01-16 修改不能输入负数的bug
            //2019-10-29 #2473 截取字符串取第一个数为'-'
            // if (
            //   params.detailList[count].dealElectricity.substring(0, 1) == "-"
            // ) {
            //   params.detailList[count].dealElectricity = dealElectricity.slice(
            //     1,
            //     params.detailList[count].dealElectricity.length
            //   );
            // }
          }
        }
        element.sdOrgId = this.LastId;
      });
      // #2723 wangc 20191121 处理数据
      let array = [];
      params.detailList.forEach((element1, index) => {
        for (var i in element1) {
          this.mounthList.forEach((element, index1) => {
            if (element.month == i) {
              let object = {};
              object.month = i;
              object.val = element1[i];
              object.index = index;
              array.push(object);
              // console.log(i);
              // console.log(index);
              // console.log(element1[i]);
              //params.detailList[index].detailVal[index1].val = element1[i];
            }
          });
        }
      });
      params.detailList.forEach(element => {
        element.detailVal = [];
      });

      array.forEach(element => {
        let mounthObj = {};
        mounthObj.month = element.month;
        mounthObj.val = element.val;

        params.detailList[element.index].detailVal.push(mounthObj);
      });
      // #3932 保存提交按钮不可重复点击 fengzp 2020-0423
      if (data == "11") {
        this.saveLoading = true;
      } else {
        this.submitLoading = true;
      }
      update(params).then(res => {
        if (res.rel) {
          this.saveLoading = false;
          this.submitLoading = false;
          if (data == "11") {
            this.$notify({
              title: "成功",
              message: "修改成功",
              type: "success",
              duration: 2000
            });
          } else {
            this.$notify({
              title: "成功",
              message: "提交成功",
              type: "success",
              duration: 2000
            });
          }
          this.$emit("closeResultDialog");
          this.resetTemp();
          this.$emit("callList");
        } else {
          this.errorMsgList = res.data;
          // this.checkerrorMsgList();
          this.saveLoading = false;
          this.submitLoading = false;

          this.$notify({
            title: "失败!",
            message: res.msg,
            type: "warning",
            duration: 2000
          });
        }
      });
    },

    //编辑
    update(state) {
      //2019-11-21 #2702 阿彪 当出清方式如果选择统一出清时成交电价应该全部相等 start
      if (this.ResultsInfo.clearModeCode == "cqfs02") {
        let flag = false;
        this.listQuery.detailList.forEach(element => {
          if (this.listQuery.detailList[0].dealPrice != element.dealPrice)
            flag = true;
        });
        if (flag) {
          this.$notify({
            title: "提示",
            message: "当出清方式为统一出清时成交电价应全部相等",
            type: "warning",
            duration: 2000
          });
          return;
        }
      }
      //2019-11-21 #2702 阿彪 当出清方式如果选择统一出清时成交电价应该全部相等 end
      if (this.listQuery.detailList.length < 1) {
        let msg = state == "3" ? "无可提交数据" : "无可保存数据";

        this.$notify({
          title: "提示",
          message: msg,
          type: "warning",
          duration: 2000
        });
        return false;
      } else {
        let data = this.checkTab();
        if (!data.status) {
          return false;
        }
      }

      if (this.delIds) {
        this.listQuery.deleteDetailIDs = this.delIds;
        // this.delIds = this.listQuery.deleteDetailIDs;
        delResultId(this.delIds).then(res => {
          if (res.rel) {
            this.listQuery.status = state;
            this.putObjCom(state);
          } else {
            this.$notify({
              title: "提示",
              message: "提交失败",
              type: "warning",
              duration: 2000
            });
          }
        });
      } else {
        this.listQuery.status = state;
        this.putObjCom(state);
      }
    },
    resetTemp() {
      this.total = null;
      this.dialogStatus == "";
      const set = this.$refs;
      set.listQueryForm.resetFields();
      this.isEdit = false;
      (this.listQuery = {
        jyTradingResultsId: undefined,
        orgType: "sell",
        status: "",
        noticeDate: undefined, //发布日期
        tradingTime: undefined, //交易期次
        tradingCenterId: undefined, //交易中心
        tradingVariety: undefined, //交易品种
        tradingWay: undefined, //交易方式
        tradingCycle: undefined, //交易周期
        detailList: []
      }),
        (this.isTradingCycle = true);
      this.cycleQuarter = false;
      this.cycleYear = true;
      this.cycleMonth = false;
      this.yearData = "";
      this.monthData = "";
      this.quarterData = {
        quarter: "",
        year: ""
      };
    },

    handleSizeChange(val) {
      this.resultListQuery.limit = val;
      this.getResult(this.resultListQuery.jyTradingResultsId);
    },
    handleCurrentChange(val) {
      this.resultListQuery.page = val;
      this.getResult(this.resultListQuery.jyTradingResultsId);
    },
    getnoticeDate(val) {
      this.noticeDate = val;
    },
    cancel(formName) {
      this.resetTemp();
      this.$emit("callList");
      this.$emit("closeResultDialog");
    },
    handleDelete(row) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        //this.getResult();
        if (row.detailId) {
          delResultId(row.detailId).then(res => {});
          this.listQuery.detailList.splice(row.index - 1, 1);
          let items = this.listQuery.detailList.map((item, index) => {
            item.index =
              index +
              1 +
              (this.resultListQuery.page - 1) * this.resultListQuery.limit;
            return item;
          });
          Vue.set(this.listQuery, "detailLis", items);

          this.listQuery.detailList = items;
          this.total = this.listQuery.detailList.length;
          if (this.delIds == "") {
            this.delIds += row.detailId;
          } else {
            this.delIds += "," + row.detailId;
          }
        } else {
          this.listQuery.detailList.splice(row.index - 1, 1);
          let items = this.listQuery.detailList.map((item, index) => {
            item.index =
              index +
              1 +
              (this.resultListQuery.page - 1) * this.resultListQuery.limit;
            return item;
          });
          this.listQuery.detailList = items;
          this.total = this.listQuery.detailList.length;
        }
      });
    },
    handleUpdate() {
      this.isEdit = false;
    },
    // handleChange(file, fileList) {
    //   this.fileList = fileList.slice(-3);
    // },
    importfxx(obj) {
      let _this = this;
      let inputDOM = this.$refs.inputer;
      let jylxclasses = this.jylxclasses; //交易类型
      // 通过DOM取文件数据
      this.file = event.currentTarget.files[0];
      var rABS = false; //是否将文件读取为二进制字符串
      var f = this.file;
      var reader = new FileReader();
      this.clearShow = false; //2019-11-06  解决不清空上一次上传的内容问题
      FileReader.prototype.readAsBinaryString = function(f) {
        var binary = "";
        var rABS = false; //是否将文件读取为二进制字符串
        var pt = this;
        var wb; //读取完成的数据
        var outdata;
        var reader = new FileReader();
        reader.onload = function(e) {
          var bytes = new Uint8Array(reader.result);
          var length = bytes.byteLength;
          for (var i = 0; i < length; i++) {
            binary += String.fromCharCode(bytes[i]);
          }
          var XLSX = require("xlsx");
          if (rABS) {
            wb = XLSX.read(btoa(fixdata(binary)), {
              //手动转化
              type: "base64"
            });
          } else {
            wb = XLSX.read(binary, {
              type: "binary"
            });
          }
          outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]); //outdata就是你想要的东西
          // _this.clearShow = true; //2019-11-06 解决不清空上一次上传的内容问题
          // if(tradingVariety == "jypz09") {
          //   outdata.forEach(element => {
          //     if(!element["*类型"]) {
          //       _this.$notify({
          //         title: "提示",
          //         message: "导入失败！交易类型",
          //         type: "warning",
          //         duration: 2000
          //       });
          //       console.log("88",jyflclasses.indexOf(element["*交易分类"]))
          //     } else if(jylxclasses.indexOf(element["*类型"])<=-1){
          //       _this.$notify({
          //         title: "提示",
          //         message: "导入失败！维度中无该交易分类or交易产品or交易类型",
          //         type: "warning",
          //         duration: 2000
          //       });
          //     } else {
          //       resultObj = {};
          //       outdata.forEach(element => {
          //         resultObj = {};
          //         resultObj.sdOrgName = element["单位名称"];
          //         resultObj.transactionLineName = element["交易路线"];
          //         resultObj.fdOrgName = element["发电公司"];
          //         resultObj.tradingUnitName = element["交易单元"];
          //         resultObj.dealPrice =
          //           element["成交电价（" + _this.unitMap.priceUnit + "）"];
          //         resultObj.dealElectricity =
          //           element["成交电量（" + _this.unitMap.electricityUnit + "）"];
          //         _this.listQuery.detailList.push(resultObj);

          //         let items = _this.listQuery.detailList.map((item, index) => {
          //           item.index =
          //             index +
          //             1 +
          //             (_this.resultListQuery.page - 1) * _this.resultListQuery.limit;
          //           return item;
          //         });
          //         _this.listQuery.detailList = items;
          //         _this.total = _this.listQuery.detailList.length;
          //       });
          //     }
          //   })
          // }
          let resultObj = {};
          // outdata.forEach(element => {
          //   resultObj = {};
          //   resultObj.sdOrgName = element["单位名称"];
          //   resultObj.transactionLineName = element["交易路线"];
          //   resultObj.fdOrgName = element["发电公司"];
          //   resultObj.tradingUnitName = element["交易单元"];
          //   resultObj.dealPrice =
          //     element["成交电价（" + _this.unitMap.priceUnit + "）"];
          //   resultObj.dealElectricity =
          //     element["成交电量（" + _this.unitMap.electricityUnit + "）"];
          //   _this.listQuery.detailList.push(resultObj);

          //   let items = _this.listQuery.detailList.map((item, index) => {
          //     item.index =
          //       index +
          //       1 +
          //       (_this.resultListQuery.page - 1) * _this.resultListQuery.limit;
          //     return item;
          //   });
          //   _this.listQuery.detailList = items;
          //   _this.total = _this.listQuery.detailList.length;
          // });
        };
        reader.readAsArrayBuffer(f);
      };
      if (rABS) {
        reader.readAsArrayBuffer(f);
      } else {
        reader.readAsBinaryString(f);
      }
    },
    // 处理导入的数据
    dealFile(data) {
      // console.log("0909", data);
      if (this.imFile) {
        this.imFile.value = "";
      }
      if (data.length <= 0) {
      } else {
        this.importTypeDialog = false;
        this.$refs.importantDialog.initImportData(
          this.importContractForm,
          data
        );
      }
    },
    handleExportResult() {
      //导出excel
      // 2019-11-06 #2456 康如涛 增加导出空数据判断
      // #2606 2019-11-18 张亮三 解决当数据只有一条时无法导出数据问题
      if (this.listQuery.detailList.length > 0) {
        if (typeof this.listQuery.detailList[0].detailId != "undefined") {
          if (this.listQuery.detailList[0].detailId != "") {
            ResultExportObj(this.jyTradingResultsId);
          } else {
            this.$notify({
              title: "提示",
              message: "无可导出数据",
              type: "warning",
              duration: 2000
            });
          }
        } else {
          this.$notify({
            title: "提示",
            message: "无可导出数据",
            type: "warning",
            duration: 2000
          });
        }
      } else {
        this.$notify({
          title: "提示",
          message: "无可导出数据",
          type: "warning",
          duration: 2000
        });
      }
    },
    selectOption() {
      varietySelectObj().then(res => {
        this.varietyOptions = res;
      });
      waySelectObj().then(res => {
        this.wayOptions = res;
      });

      centerSelectObj().then(res => {
        this.centerOptions = res;
      });
      periodSelectObj().then(res => {
        this.periodOptions = res;
      });
    },

    checkNo(value) {
      let reg = /^\d\.{0,1}\d{0,1}$/;
      if (value) {
        if (value > 999999 || new RegExp(reg).test(value) == false) {
          setTimeout(() => {
            this.searchForm.msel.mselTotalConsumTimes = "";
          }, 500);
        }
      }
    },
    cellClick(row, column, cell, event) {
      if (!this.isSelectOrg) {
        this.listRowData = row;
      }
      //获取行元素
      this.getListRowData = row;
    },
    //按单位名称模糊查询
    getSdOrgByName(query) {
      this.loading = true;
      this.sdOrgFilterData = [];
      let parameters = { orgName: query };
      getSdOrgName(parameters).then(res => {
        this.loading = false;
        this.sdOrgFilterData = res;
      });
    },
    selectSdOrg(data) {
      //this.reSetList();
    },
    //获取交易路线
    getTransactionLine() {
      getTransactionLine().then(res => {
        this.lineOptions = res;
      });
    },
    getOrgByName(query) {
      //发电公司模糊查询
      this.loading = true;
      this.isSelectOrg = true;
      this.orgFilterData = [];
      let parameters = { orgName: query };
      getAllOrgListByProvince(parameters).then(res => {
        this.loading = false;
        // this.orgFilterData = res;
        this.$set(this, "orgFilterData", res);
      });
    },
    //发电公司change事件
    selectOrg(value) {},

    getTradingUnitByName(query, cb) {
      // 2019-12-3 #2986  张朋 根据行元素信息获取发电公司编码
      if (
        typeof this.getListRowData.fdOrgId != undefined &&
        this.getListRowData.fdOrgId != ""
      ) {
        this.changefdOrgId = this.getListRowData.fdOrgId;
      }
      //按名称模糊查询交易单元
      var list2 = [{}];
      if (this.changefdOrgId != undefined && this.changefdOrgId != "") {
        this.loading = true;
        let parameters = {
          tradingUnitName: query,
          orgId: this.changefdOrgId
        };
        getTradingUnitByName(parameters).then(res => {
          // this.loading = false;
          // this.tradingUnitFilterData = res;
          if (typeof res != "undefined") {
            if (res.length > 0) {
              res.forEach(item => {
                list2.push({
                  value: item.tradingUnitName,
                  orgId: item.tradingUnitId
                });
              });
            }
          }
          cb(list2);
        });
      } else {
        this.$notify({
          title: "提示",
          message: "请先检索公司",
          type: "warning",
          duration: 2000
        });
      }
    },

    checkTradingUnitByName(name) {
      //检测导入信息中的交易单元是否存在
      //return 存在返回ture  存在返回false
      // let res = this.tradingUnitAll.filter(
      //   item => item.tradingUnitName == name
      // );
      // if (res.length > 0) {
      //   return "false";
      // } else {
      //   return "true";
      // }
    },
    selectTradingUnit(data, row) {
      this.listQuery.detailList[row.index - 1].tradingUnitId = data.orgId;
    },
    //获取焦点时
    tradingUnitNameFocus() {
      let rowData = Object.assign(
        {},
        this.listQuery.detailList[this.listRowData.index]
      );
      let detailList = Object.assign([], this.listQuery.detailList);
      rowData.tradingUnitNameStatus = false;
      detailList[this.listRowData.index - 1].tradingUnitNameStatus = false;
      this.listQuery.detailList = [];
      this.listQuery.detailList = detailList;
    },
    fdOrgNameFocus() {
      let rowData = Object.assign(
        {},
        this.listQuery.detailList[this.listRowData.index]
      );
      let detailList = Object.assign([], this.listQuery.detailList);
      rowData.fdOrgNameStatus = false;
      detailList[this.listRowData.index - 1].fdOrgNameStatus = false;
      this.listQuery.detailList = [];
      this.listQuery.detailList = detailList;
    },
    sdOrgNameFocus() {
      let rowData = Object.assign(
        {},
        this.listQuery.detailList[this.listRowData.index]
      );
      let detailList = Object.assign([], this.listQuery.detailList);
      rowData.sdOrgNameStatus = false;
      detailList[this.listRowData.index - 1].sdOrgNameStatus = false;
      this.listQuery.detailList = [];
      this.listQuery.detailList = detailList;
    },
    dealElectricityFocus() {
      let rowData = Object.assign(
        {},
        this.listQuery.detailList[this.listRowData.index]
      );
      let detailList = Object.assign([], this.listQuery.detailList);
      rowData.dealElectricityStatus = false;
      detailList[this.listRowData.index - 1].dealElectricityStatus = false;
      this.listQuery.detailList = [];
      this.listQuery.detailList = detailList;
    },
    dealPriceFocus() {
      let rowData = Object.assign(
        {},
        this.listQuery.detailList[this.listRowData.index]
      );
      let detailList = Object.assign([], this.listQuery.detailList);
      rowData.dealPriceStatus = false;
      detailList[this.listRowData.index - 1].dealPriceStatus = false;
      this.listQuery.detailList = [];
      this.listQuery.detailList = detailList;
    },
    cancelImport() {
      this.listLoading = false;
    },
    downinfo1(parme, m) {
      this.sumList = [];
      // this.listLoading = true;
      // getDeatilPageById(this.pageList).then(res => {
      //   this.tableShow = true;
      //   let items = res.data.rows.map((item, index) => {
      //     item.index1 =
      //       index + 1 + (this.pageList.page - 1) * this.pageList.limit;
      //     return item;
      //   });

      //   // let dataIndex = (this.pageList.page - 1) * this.pageList.limit + 1;
      //   // // this.sumList[m-dataIndex]=items[m-dataIndex];
      //   // this.$set(this.sumList, m - dataIndex, items[m - dataIndex]);
      //   this.sumList = items;
      //   let flag = 0;
      //   this.sumList.forEach(element => {
      //     if (element.stateCode == "6") {
      //       flag += 1;
      //     }
      //   });
      //   if (this.sumList.length == flag) {
      //     this.masterState_btn1 = true;
      //   }
      //   this.total1 = res.data.total;
      //   this.listLoading1 = false;
      // });
    },
    //查看导入结果
    showImportResult() {
      this.uploadImportForm.resultId = this.jyTradingResultsId;
      getTradingStatus(this.uploadImportForm).then(res => {
        if (res.rel) {
          this.$refs.importantDialog.initImportData(this.jyTradingResultsId);
        } else {
          this.$notify({
            title: "提示",
            message: res.msg,
            type: "warning",
            duration: 2000
          });
        }
      });
    },
    // 下部分分页
    downinfo1(parme, m) {
      this.sumList = [];
      // this.listLoading = true;
      // getDeatilPageById(this.pageList).then(res => {
      //   this.tableShow = true;
      //   let items = res.data.rows.map((item, index) => {
      //     item.index1 =
      //       index + 1 + (this.pageList.page - 1) * this.pageList.limit;
      //     return item;
      //   });

      //   // let dataIndex = (this.pageList.page - 1) * this.pageList.limit + 1;
      //   // // this.sumList[m-dataIndex]=items[m-dataIndex];
      //   // this.$set(this.sumList, m - dataIndex, items[m - dataIndex]);
      //   this.sumList = items;
      //   let flag = 0;
      //   this.sumList.forEach(element => {
      //     if (element.stateCode == "6") {
      //       flag += 1;
      //     }
      //   });
      //   if (this.sumList.length == flag) {
      //     this.masterState_btn1 = true;
      //   }
      //   this.total1 = res.data.total;
      //   this.listLoading1 = false;
      // });
    },
    initList() {
      // this.listQuery.page = 1;
      // this.$set(this.listQuery,'status','')
      // this.$set(this.listQuery,'contractName','')
      // this.$set(this.listQuery,'contractTypeCode','')
      this.getResultList(this.dialogStatus, this.ResultsInfo);
    },
    //显示上传选择窗口
    onUploadClick() {
      if (this.$refs.uploadFileAdd === undefined) {
      } else {
        this.$refs.uploadFileAdd.clearFiles();
      }
      this.uploadImportForm.resultId = this.jyTradingResultsId;
      this.importTypeDialog = true;
    },
    handleBefore(file) {},
    //文件状态改变
    handleChange(file, fileList) {
      this.canUplaodImport = this.checkImportFileName(file.name);
    },
    checkImportFileName() {
      return true;
    },
    uploadImportFile() {
      this.$refs.importInput.click();
    },
    uploadSuccess(response, file, fileList) {
      this.importantLoading = false;
      this.importTypeDialog = false;
      this.$notify({
        title: "导入提示",
        message: "文件导入成功，正在处理，请稍后查看！",
        type: "success",
        duration: 2000
      });
      //  this.submitForm();
    },
    handleExceed() {
      this.$notify({
        title: "导入提示",
        message: "导入最多上传1个",
        type: "warning",
        duration: 2000
      });
    },
    uploadErr(response, file, fileList) {
      this.importantLoading = false;
      this.$notify({
        title: "导入提示",
        message: "导入失败",
        type: "warning",
        duration: 2000
      });
    },
    //上传导入模板文件
    uploadImportTemp() {
      this.uploading = true;
      if (this.canUplaodImport) {
        this.$refs.uploadFileAdd.submit();
        this.uploading = false;
      } else {
        this.$alert(
          `所选板为"${this.importContractForm.saleContractTypeName}",与文件不匹配，请修改后上传！`,
          "提示信息",
          {
            confirmButtonText: "确定",
            callback: action => {}
          }
        );
        this.uploading = false;
      }
    },
    //模板下载
    downloadTemplateFile() {
      let parm = {
        tradingVariety: this.ResultsInfo.tradingVariety,
        description: "jySellNotice"
      };
      downloadImportTemplate(parm);
    },
    /**
     * @方法名称: handlechangesRevise()
     * @功能描述: 查看修改记录
     * @参数:
     * @返回值:
     * @作者:
     * @Date: 2019-11-27 13:58:52
     * @最新修改内容:
     * @LastEditTime:
     */

    handlechangesRevise() {
      this.$refs.modifyRecord.openadjustmentReviseDialog({
        jyTradingResultsId: this.jyTradingResultsId
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.upload-demo {
  float: left;
}
.p-releactive {
  position: relative;
}
.result-upload {
  position: absolute;
  cursor: pointer;
  z-index: 999;
  left: 70px;
  color: #fff;
  background-color: #20a0ff;
  border-color: #20a0ff;
  padding: 2px 0 1px !important;
  width: 65px;
  opacity: 0;
}
.ipt-err-true {
  border: 1px solid red;
}
.calendar-list-container .el-autocomplete {
  width: 100%;
}
</style>

