<!--
 * @功能描述: 
 * @版本: 
 * @作者: 阿彪
 * @Date: 2019-11-01 09:35:40
 * @最新修改内容: #2700 交易管理-交易结果发电页面优化
 * @LastEditTime: 2021-03-09 17:38:53
 -->
<template>
  <div class="app-container calendar-list-container">
    <!--2019-11-11 #2620 张朋 弹框自适应高度赋值 -->
    <div :style="{paddingRight:'10px',height:(dialogHeight+40)+'px'}">
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
              <!--2019-12-3 #2933 张朋 展示报价方式-->
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
            v-if="btn.jyTransactionNoticeManager_btn_add"
            type="primary"
            @click="addRow"
            icon="el-icon-plus"
            :disabled="isdisabale"
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
            v-if="btn.jyTransactionNoticeManager_btn_import"
            class="filter-item"
            type="primary"
            icon="el-icon-upload"
            :disabled="isdisabale"
            @click="onUploadClick"
          >导入</el-button>
          <!-- 2019-11-06 #2456 康如涛 暂时隐藏导入按钮 end-->
          <!-- #2606 2019-11-18 张亮三 查看时不禁用导出按钮 -->
          <el-button
            v-if="btn.jyTransactionNoticeManager_btn_export"
            class="filter-item"
            type="primary"
            icon="el-icon-download"
            @click="handleExportResult"
          >导出</el-button>
          <!-- <el-button
            class="filter-item"  
            type="primary"
            icon="el-icon-upload"
            @click="onUploadClick"
          >导入</el-button> -->
          <el-button
            class="filter-item"
            type="primary"
            icon="el-icon-view"
            :disabled="isdisabale"
            @click="showImportResult"
          >导入解析</el-button>
          <el-button
            class="filter-item"
            type="primary"
            icon="el-icon-download"
            :disabled="isdisabale"
            @click="downloadTemplateFile"
          >模板下载</el-button>
        </el-button-group>
        <!--2019-11-24 #2807  张朋 添加容量单位 -->
        <!--右上角去掉容量单位：万千瓦 #3206 frj 2019-12-19 16:55:19  -->
        <span
          style="float:right;display: inline-block;margin-top: 10px;"
        >单位：{{unitMap.electricityUnit}}、{{unitMap.priceUnit}}</span>
        <!-- <el-form :model="listQuery" class="demo-form-inline"> -->
        <el-table
          v-if="this.ResultsInfo.tradingVariety != 'jypz03'"
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
          <!-- 2019-11-04   #2524  秦侯珍 查询筛选条件“区域公司”“发售电公司”显示名称统一修改为公司简称 start-->

          <el-table-column align="center" label="发电公司">
            <template slot-scope="scope">
              <el-select
                style="width:100%;"
                :class="scope.row.fdOrgNameStatus"
                v-model="scope.row.fdOrgName"
                @change="selectOrg"
                :remote-method="getOrgByName"
                filterable
                remote
                :loading="loading"
                disabled
              >
                <el-option
                  v-for="item in orgFilterData"
                  :key="item.id"
                  :label="item.orgSname"
                  :value="item.orgName"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <!-- 2019-11-04   #2524  秦侯珍 查询筛选条件“区域公司”“发售电公司”显示名称统一修改为公司简称 end-->
          <!-- 2019-11-07  #2456  康如涛 修改查看时交易单元显示 start-->
          <el-table-column v-if="isdisabale" align="center" label="交易单元">
            <template slot-scope="scope">
              <el-input :disabled="isdisabale" v-model="scope.row.tradingUnitName"></el-input>
            </template>
          </el-table-column>
          <!-- 2019-11-07 #2456  康如涛 修改查看时交易单元显示 end-->
          <el-table-column v-else align="center" label="交易单元">
            <template slot-scope="scope">
              <el-tooltip
                v-if="scope.row.tradingUnitIdStatus == 'ipt-err-true'"
                class="item"
                effect="dark"
                :content="scope.row.tradingUnitIdStatusMsg"
                placement="top"
              >
                <div :class="scope.row.tradingUnitIdStatus">
                  <el-select
                    style="width:100%;"
                    v-model="scope.row.tradingUnitId"
                    @change="selectTradingUnit($event, scope.row)"
                    :loading="loading"
                    :disabled="isdisabale"
                  >
                    <el-option
                      v-for="(item, index) in tradingUnitFilterData"
                      :key="index"
                      :label="item.tradingUnitName"
                      :value="item.tradingUnitId"
                    ></el-option>
                  </el-select>
                </div>
              </el-tooltip>
              <el-select
                v-else
                style="width:100%;"
                v-model="scope.row.tradingUnitId"
                @change="selectTradingUnit($event, scope.row)"
                :loading="loading"
                :disabled="isdisabale"
              >
                <el-option
                  v-for="(item, index) in tradingUnitFilterData"
                  :key="index"
                  :label="item.tradingUnitName"
                  :value="item.tradingUnitId"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column align="center" width="120px" label="线路">
            <template slot-scope="scope">
              <el-input disabled v-model="scope.row.transactionLineName"></el-input>
              <!-- <el-tooltip
            v-if="scope.row.tieLineNameStatus == 'ipt-err-true'"
            class="item"
            effect="dark"
            :content="scope.row.tieLineNameStatusMsg"
            placement="top"
          >
            <el-select
              style="width:100%;"
              disabled
              :class="scope.row.tieLineNameStatus"
              v-model="scope.row.tieLineName"
            >
              <el-option
                v-for="(item, index) in tieLineNameOption"
                :key="index"
                :label="item.tieLineName"
                :value="item.tieLineId"
              ></el-option>
            </el-select>
          </el-tooltip>
          <el-select v-else style="width:100%;" disabled v-model="scope.row.tieLineName">
            <el-option
              v-for="(item, index) in tieLineNameOption"
              :key="index"
              :label="item.tieLineName"
              :value="item.tieLineId"
            ></el-option>
              </el-select>-->
            </template>
          </el-table-column>
          <el-table-column align="center" label="客户名称">
            <template slot-scope="scope">
              <el-tooltip
                v-if="scope.row.customerNameStatus == 'ipt-err-true'"
                class="item"
                effect="dark"
                :content="scope.row.customerNameStatusMsg"
                placement="top"
              >
                <el-select
                  style="width:100%;"
                  v-model="scope.row.customerName"
                  @change="selectcustomerId($event, scope.row)"
                  :remote-method="getCustomerInfoByName"
                  filterable
                  clearable
                  remote
                  :loading="loading"
                  :class="scope.row.customerNameStatus"
                  :disabled="isdisabale"
                >
                  <el-option
                    v-for="(item, index) in customerFilterData"
                    :key="index"
                    :label="item.customerName"
                    :value="item.customerName"
                  ></el-option>
                </el-select>
              </el-tooltip>
              <el-select
                v-else
                style="width:100%;"
                v-model="scope.row.customerName"
                @change="selectcustomerId($event, scope.row)"
                :remote-method="getCustomerInfoByName"
                filterable
                clearable
                remote
                :loading="loading"
                :disabled="isdisabale"
              >
                <el-option
                  v-for="(item, index) in customerFilterData"
                  :key="index"
                  :label="item.customerName"
                  :value="item.customerName"
                ></el-option>
              </el-select>

              <!-- <el-input :disabled="isEdit" v-model="scope.row.tieLineName"></el-input> -->
            </template>
          </el-table-column>
          <!-- 2020-06-04 #4151  qinhz 交易结果-发电-交易品种为省内直接交易新增购电侧交易单元 start-->
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
          <!-- 2020-06-04 #4151  qinhz 交易结果-发电-交易管理-交易结果新增购电侧交易单元 end-->
           <!-- #3602 gaoaining 2020-01-16去掉输入时最小值为0和不能输入负值 start -->
          <el-table-column align="center" label="成交电量">
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
                  type="number"
                  :class="scope.row.dealElectricityStatus"
                  v-model="scope.row.dealElectricity"
                 
                >></el-input>
              </el-tooltip>
              <el-input
                v-else
                :disabled="isdisabale"
                type="number"
                v-model="scope.row.dealElectricity"
               
              >></el-input>
               <!-- onkeyup="this.value= this.value.match(/\d+(\.\d{0,8})?/) ? this.value.match(/\d+(\.\d{0,8})?/)[0] : ''" -->
              <!-- onkeyup="this.value= this.value.match(/\d+(\.\d{0,8})?/) ? this.value.match(/\d+(\.\d{0,8})?/)[0] : ''" -->
               <!-- #3602 gaoaining 2020-01-16去掉输入时最小值为0和不能输入负值 end -->
              <!-- <span>{{scope.row.dealElectricity}}</span> -->
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
                <!--2019-12-7 #2933 zhangp 添加触发事件 -->
                <el-input
                  :disabled="isdisabale"
                  type="number"
                  :min="0"
                  @input="dealPriceStatusChange($event,scope.row)"
                  :class="scope.row.dealPriceStatus"
                  v-model="scope.row.dealPrice"
                  onkeyup="this.value= this.value.match(/\d+(\.\d{0,8})?/) ? this.value.match(/\d+(\.\d{0,8})?/)[0] : ''"
                >></el-input>
              </el-tooltip>
              <el-input
                :disabled="isdisabale"
                type="number"
                :min="0"
                @input="dealPriceStatusChange($event,scope.row)"
                v-else
                v-model="scope.row.dealPrice"
                onkeyup="this.value= this.value.match(/\d+(\.\d{0,8})?/) ? this.value.match(/\d+(\.\d{0,8})?/)[0] : ''"
              >></el-input>
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
                  type="number"
                  :min="-999999999"
                  :class="scope.row.dealPriceStatus"
                  @input="dealPriceStatusChange($event,scope.row)"
                  v-model="scope.row.dealPrice"
                ></el-input>
              </el-tooltip>
              <el-input
                :disabled="isdisabale"
                type="number"
                :min="-999999999"
                @input="dealPriceStatusChange($event,scope.row)"
                v-else
                v-model="scope.row.dealPrice"
              ></el-input>
            </template>
          </el-table-column>
          <!--2019-12-3 #2933  张朋 增加‘降幅’、‘绝对价’、‘标杆电价’、‘批复电价’字段 start -->
          <el-table-column align="center" label="降幅">
            <template slot-scope="scope">
              <el-input
                disabled
                type="number"
                :class="scope.row.decline"
                v-model="scope.row.decline"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column align="center" label="绝对价">
            <template slot-scope="scope">
              <el-input
                disabled
                type="number"
                :class="scope.row.dealPrice"
                v-model="scope.row.absolutePrice"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column align="center" label="标杆电价">
            <template slot-scope="scope">
              <el-input
                disabled
                type="number"
                :class="scope.row.benchmarkElectricityPrice"
                v-model="scope.row.benchmarkElectricityPrice"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column align="center" label="批复电价">
            <template slot-scope="scope">
              <el-input
                disabled
                type="number"
                :class="scope.row.authorizedTariff"
                v-model="scope.row.authorizedTariff"
              ></el-input>
            </template>
          </el-table-column>
          <!--2019-12-3 #2933  张朋 增加‘降幅’、‘绝对价’、‘标杆电价’、‘批复电价’字段 end -->
          <!-- #2723 wangc 20191121 发电/售电 -月电量分解 start-->
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
          <!-- #2723 wangc 20191121 发电/售电 -月电量分解  end -->
          <el-table-column fixed="right" v-if="!isdisabale" align="center" label="操作" width="150">
            <template slot-scope="scope">
              <!-- <el-button  size="small" type="text" @click="handleUpdate(scope.row)">编辑 -->
              <!-- v-if="jyTransactionNoticeManager_btn_edit" -->
              <!-- </el-button> -->
              <el-button
                :disabled="isdisabale"
                size="small"
                type="text"
                v-if="btn.jyTransactionNoticeManager_btn_del"
                @click="handleDelete(scope.row)"
              >
                删除
                <!-- v-if="jyTransactionNoticeManager_btn_del" -->
              </el-button>
            </template>
          </el-table-column>
        </el-table>
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
            width="70px"
          ></el-table-column>
          <el-table-column :disabled="isdisabale" prop label="交易分类" align="center">
            <template slot-scope="scope">
              <el-tooltip
                v-if="scope.row.tradingClassifyStatus == 'ipt-err-true'"
                class="item"
                effect="dark"
                :content="scope.row.tradingClassifyStatusMsg"
                placement="top"
              >
                <el-select
                  style="width:100%;"
                  :disabled="isdisabale"
                  :class="scope.row.tradingClassifyStatus"
                  v-model="scope.row.tradingClassify"
                >
                  <el-option
                    v-for="(item, index) in classify"
                    :key="index"
                    :label="item.propName"
                    :value="item.propCode"
                  ></el-option>
                </el-select>
              </el-tooltip>
              <el-select
                v-else
                style="width:100%;"
                :disabled="isdisabale"
                v-model="scope.row.tradingClassify"
              >
                <el-option
                  v-for="(item, index) in classify"
                  :key="index"
                  :label="item.propName"
                  :value="item.propCode"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
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
              <el-select v-else style="width:100%;"  :disabled="isdisabale" v-model="scope.row.type">
                <el-option
                  v-for="(item, index) in AssignmentType"
                  :key="index"
                  :label="item.propName"
                  :value="item.propCode"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column width="140px" align="center" label="发电企业">
            <template slot-scope="scope">
              <el-select
                disabled
                style="width:100%;"
                :class="scope.row.fdOrgNameStatus"
                v-model="scope.row.fdOrgName"
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
          <el-table-column :disabled="isdisabale" prop label="机组" align="center">
            <template slot-scope="scope">
              <el-tooltip
                v-if="scope.row.fdOrgJzStatus == 'ipt-err-true'"
                class="item"
                effect="dark"
                :content="scope.row.fdOrgJzStatusMsg"
                placement="top"
              >
                <!-- 2019年11月22日19:20:36 李志佳 获取交易机组 start -->
                <!-- 添加通过机组ID获取批复电价的事件，机组就是交易单元 2020/3/6 -->
                <el-select
                  :disabled="isdisabale"
                  v-model="scope.row.fdOrgJzId"
                  @change="selectTradingUnit($event, scope.row)"
                  :class="scope.row.fdOrgJzStatus"
                  style="width:100%;"
                >
                  <el-option
                    v-for="(item,index) in unitList"
                    :key="index"
                    :label="item.tradingUnitName"
                    :value="item.tradingUnitId"
                  ></el-option>
                </el-select>
              </el-tooltip>
              <el-select
                v-else
                :disabled="isdisabale"
                v-model="scope.row.fdOrgJzId"
                @change="selectTradingUnit($event, scope.row)"
                :class="scope.row.fdOrgJzStatus"
                style="width:100%;"
              >
                <el-option
                  v-for="(item,index) in unitList"
                  :key="index"
                  :label="item.tradingUnitName"
                  :value="item.tradingUnitId"
                ></el-option>
              </el-select>
              <!-- 2019年11月22日19:20:36 李志佳 获取交易机组 end -->
            </template>
          </el-table-column>
          <el-table-column :disabled="isdisabale" prop label="产品" align="center">
            <template slot-scope="scope">
              <el-tooltip
                v-if="scope.row.productStatus == 'ipt-err-true'"
                class="item"
                effect="dark"
                :content="scope.row.productStatusMsg"
                placement="top"
              >
                <el-select
                  style="width:100%;"
                  :disabled="isdisabale"
                  :class="scope.row.productStatus"
                  v-model="scope.row.product"
                >
                  <el-option
                    v-for="(item, index) in Products"
                    :key="index"
                    :label="item.propName"
                    :value="item.propCode"
                  ></el-option>
                </el-select>
              </el-tooltip>
              <el-select
                v-else
                style="width:100%;"
                :disabled="isdisabale"
                v-model="scope.row.product"
              >
                <el-option
                  v-for="(item, index) in Products"
                  :key="index"
                  :label="item.propName"
                  :value="item.propCode"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column :disabled="isdisabale" prop label="出/受让发电企业" align="center">
            <template slot-scope="scope">
              <el-tooltip
                v-if="scope.row.sellOrAssigneeFdOrgIdStatus == 'ipt-err-true'"
                class="item"
                effect="dark"
                :content="scope.row.sellOrAssigneeFdOrgIdStatusMsg"
                placement="top"
              >
                <div :class="scope.row.sellOrAssigneeFdOrgIdStatus">
                <!--  #3250 wangc 20191223 交易品种为发电权转让，交易方式为集中撮合，交易分类、类型、机组、产品、出/受让发电企业、出/ 受让机组，设为必填项-->
                  <el-select
                    style="width:100%;"
                    v-model="scope.row.sellOrAssigneeFdOrgName"
                    @change="getSellOrAssigneeFdOrgId($event, scope.row)"
                    class="scope.row.sellOrAssigneeFdOrgIdStatus"
                    :remote-method="getAllOrgByAttribute"
                    filterable
                    remote
                    :loading="loading"
                    :disabled="isdisabale"
                  >
                    <el-option
                      v-for="(item, index) in AllOrg"
                      :key="index"
                      :label="item.orgName"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </div>
              </el-tooltip>
              <el-select
                v-else
                style="width:100%;"
                v-model="scope.row.sellOrAssigneeFdOrgName"
                @change="getSellOrAssigneeFdOrgId($event, scope.row)"
                :remote-method="getAllOrgByAttribute"
                filterable
                remote
                :loading="loading"
                :disabled="isdisabale"
              >
                <!-- @focus="tradingUnitNameFocus" -->

                <el-option
                  v-for="(item, index) in AllOrg"
                  :key="index"
                  :label="item.orgName"
                  :value="item.id"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column  :disabled="isdisabale" prop label="出/受让机组" align="center">
            <template slot-scope="scope">
              <el-tooltip
                v-if="scope.row.sellOrAssigneeJzStatus == 'ipt-err-true'"
                class="item"
                effect="dark"
                :content="scope.row.sellOrAssigneeJzStatusMsg"
                placement="top"
              >
                <!-- 2019年11月25日09:21:14 李志佳 机组下拉框 start -->
                <el-select
                  :disabled="isdisabale"
                  :class="scope.row.sellOrAssigneeJzStatus"
                  style="width:100%;"
                  v-model="scope.row.sellOrAssigneeJz"
                >
                  <el-option
                    v-for="(item,index) in csunitList"
                    :key="index"
                    :label="item.tradingUnitName"
                    :value="item.tradingUnitName"
                  ></el-option>
                </el-select>
              </el-tooltip>
              <el-select
                v-else
                :disabled="isdisabale"
                :class="scope.row.sellOrAssigneeJzStatus"
                style="width:100%;"
                v-model="scope.row.sellOrAssigneeJz"
              >
                <el-option
                  v-for="(item,index) in csunitList"
                  :key="index"
                  :label="item.tradingUnitName"
                  :value="item.tradingUnitName"
                ></el-option>
              </el-select>
              <!-- 2019年11月25日09:21:14 李志佳 机组下拉框 end -->
            </template>
          </el-table-column>
          

          <el-table-column :disabled="isdisabale" prop label="用电企业" align="center">
            <template slot-scope="scope">
              <el-select
                v-if='!isJc'
                style="width:100%;"
                clearable
                v-model="scope.row.eleEnterpriseName"
                :remote-method="getAlleleEnterprise"
                @change="tradingUnitNameFocus1(scope.$index,scope.row)"
                filterable
                remote
                :loading="loading"
                :disabled="isdisabale"
              >
                <!-- @focus="tradingUnitNameFocus" -->
                <!-- #3914 gaoaining 2020-04-22 添加用电企业显示是否为简称的判断显示 start -->
                <el-option 
                  v-for="(item, index) in eleEnterpriseList"
                  :key="index"
                  :label="item.customerName"
                  :value="item.customerName"
                ></el-option>
                
                 <!-- #3914 gaoaining 2020-04-22 添加用电企业显示是否为简称的判断显示 end -->
              </el-select>
              <el-select
                 v-else
                style="width:100%;"
                clearable
                v-model="scope.row.eleEnterpriseName"
                :remote-method="getAlleleEnterprise"
                @change="tradingUnitNameFocus1(scope.$index,scope.row)"
                filterable
                remote
                :loading="loading"
                :disabled="isdisabale"
              >
                <!-- @focus="tradingUnitNameFocus" -->
                <!-- #3914 gaoaining 2020-04-22 添加用电企业显示是否为简称的判断显示 start -->
                <el-option 
                  v-for="(item, index) in eleEnterpriseList"
                  :key="index"
                  :label="item.customerSname"
                  :value="item.customerSname"
                ></el-option>
                
                 <!-- #3914 gaoaining 2020-04-22 添加用电企业显示是否为简称的判断显示 end -->
              </el-select>
            </template>
          </el-table-column>
          <el-table-column width="200px" align="center" label="成交电量">
            <template slot-scope="scope">
              <el-tooltip
                v-if="scope.row.dealElectricityStatus == 'ipt-err-true'"
                class="item"
                effect="dark"
                :content="scope.row.dealElectricityStatusMsg"
                placement="top"
              >
                <!-- #3602 gaoaining 2020-01-16去掉输入时最小值为0 start -->
                <el-input
                  type="number"
                  :disabled="isdisabale"
                  :class="scope.row.dealElectricityStatus"
                  v-model="scope.row.dealElectricity"
                ></el-input>
              </el-tooltip>
              <el-input
                v-else
                type="number"   
                :disabled="isdisabale"
                v-model="scope.row.dealElectricity"
              ></el-input>
              <!-- :min="0" -->
               <!-- #3602 gaoaining 2020-01-16去掉输入时最小值为0 end-->
            </template>
          </el-table-column>
          <el-table-column width="200px" align="center" label="成交电价">
            <template slot-scope="scope">
              <el-tooltip
                v-if="scope.row.dealPriceStatus == 'ipt-err-true'"
                class="item"
                effect="dark"
                :content="scope.row.dealPriceStatusMsg"
                placement="top"
              >
                <el-input
                  type="number"
                  :min="-999999999"
                  :disabled="isdisabale"
                  :class="scope.row.dealPriceStatus"
                  @input="dealPriceStatusChange($event,scope.row)"
                  v-model="scope.row.dealPrice"
                ></el-input>
                <!-- @change="checkNo(scope.row.dealPrice)"
              onkeypress="return event.keyCode>=48&&event.keyCode<=57" 
                @focus="dealPriceFocus"-->
              </el-tooltip>
              <el-input
                :disabled="isdisabale"
                type="number"
                :min="-999999999"
                v-else
                @input="dealPriceStatusChange($event,scope.row)"
                v-model="scope.row.dealPrice"
              ></el-input>
              <!-- @focus="dealPriceFocus"
            onkeypress="return event.keyCode>=48&&event.keyCode<=57"
              @change="checkNo(scope.row.dealPrice)"-->
            </template>
          </el-table-column>
          <!--2019-12-11 #3111  张朋 增加‘降幅’、‘绝对价’、‘标杆电价’、‘批复电价’字段 start -->
          <el-table-column align="center" label="降幅">
            <template slot-scope="scope">
              <el-input
                disabled
                type="number"
                :class="scope.row.decline"
                v-model="scope.row.decline"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column align="center" label="绝对价">
            <template slot-scope="scope">
              <el-input
                disabled
                type="number"
                :class="scope.row.dealPrice"
                v-model="scope.row.absolutePrice"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column align="center" label="标杆电价">
            <template slot-scope="scope">
              <el-input
                disabled
                type="number"
                :class="scope.row.benchmarkElectricityPrice"
                v-model="scope.row.benchmarkElectricityPrice"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column align="center" label="批复电价">
            <template slot-scope="scope">
              <el-input
                disabled
                type="number"
                :class="scope.row.authorizedTariff"
                v-model="scope.row.authorizedTariff"
              ></el-input>
            </template>
          </el-table-column>
          <!--2019-12-11 #3111  张朋 增加‘降幅’、‘绝对价’、‘标杆电价’、‘批复电价’字段 end -->
          <!-- #2723 wangc 20191121 发电/售电 -月电量分解 start-->
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
          <!-- #2723 wangc 20191121 发电/售电 -月电量分解 end-->
          <el-table-column fixed="right" align="center" v-if="!isdisabale" label="操作" width="150">
            <template slot-scope="scope">
              <!-- <el-button  size="small" type="text" @click="handleUpdate(scope.row)">编辑 -->
              <!-- v-if="jyTransactionNoticeManager_btn_edit" -->
              <!-- </el-button> -->
              <el-button
                v-if="btn.jyTransactionNoticeManager_btn_del"
                size="small"
                type="text"
                @click="handleDelete(scope.row)"
              >
                删除
                <!-- v-if="jyTransactionNoticeManager_btn_del" -->
              </el-button>
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
        <!--2019-11-26 #2805 张朋 参与装机、厂用电率、减扣基数电量字段项字段展示 start -->
        <el-form
          :model="announcementForm"
          :rules="rules"
          ref="announcementForm"
          label-width="120px"
        >
          <el-row>
            <!-- 2019-12-09 郑文杰 #3083 交易管理 - 交易结果-发电 前端不展示参与装机字段。 -->
            <!-- 2019-11-26 #2807 张朋 添加参与装机验证
              <el-col :span="6">
                <el-form-item label="参与装机" prop="cyzj">
                    <el-input
                    class="inline-input"
                    v-model="announcementForm.cyzj"
                    :disabled="isdisabale"
                    placeholder="请输入参与装机"
                  ></el-input>
                </el-form-item>
            </el-col>-->
            <el-col :span="6">
              <!-- 厂用电率缺少单位，后面需要添加：（%） #3206 frj 2019-12-19 16:54:25 -->
              <el-form-item label="厂用电率(%)" prop="useElecRate">
                <el-input
                  class="inline-input"
                  v-model="announcementForm.useElecRate"
                  :disabled="isdisabale"
                  placeholder="请输入厂用电率"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="减扣基数电量" prop="jkjsdl">
                <el-input
                  class="inline-input"
                  v-model="announcementForm.jkjsdl"
                  :disabled="isdisabale"
                  placeholder="请输入减扣基数电量"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <!--2019-11-24 #2805 张朋 参与装机、厂用电率、减扣基数电量字段项字段展示 end -->
        <!-- </el-form> -->
      </el-scrollbar>
    </div>

    <div slot="footer" class="dialog-footer f-mt10" align="right">
      <!-- #2871 2019-11-27 秦侯珍 增加修改记录按钮 start -->
      <el-button
        v-if="dialogStatus=='revise'"
        style="float:left;margin-left:30px;"
        @click="handlechangesRevise()"
      >修改记录</el-button>
      <!-- #2871 2019-11-27 秦侯珍 增加修改记录按钮 start -->
      <el-button
        v-if="btn.jyTransactionNoticeManager_btn_save"
        class="save-btn"
        :disabled="isdisabaleBtn"
        :loading="saveLoading"
        @click="update('11')"
      >保 存</el-button>
      <!-- <el-button class="save-btn" v-if="dialogStatus=='create'"  @click="create('0')">保 存</el-button> -->
      <el-button
        v-if="btn.jyTransactionNoticeManager_btn_submit"
        class="submit-btn"
        :disabled="isdisabale"
        :loading="submitLoading"
        @click="update('3')"
      >提 交</el-button>
      <!-- <el-button class="submit-btn" v-if="dialogStatus=='create'" @click="create('1')">提 交</el-button>   -->
      <el-button class="cancel-btn" @click="cancel">取 消</el-button>
    </div>
    <!-- #3262 2019-12-29 秦侯珍 交易管理 - 交易结果-发电 - 新增导入功能  start -->
    <!-- 导入数据弹窗-->
    <important-dialog
      ref="importantDialog"
      :resultId="this.resultId"
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
        <el-button class="ok-btn" @click="uploadImportTemp()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 导入数据模板类型选择 end-->
    <!-- #3262 2019-12-29 秦侯珍 交易管理 - 交易结果-发电 - 新增导入功能  end -->

    <!-- #2871 2019-11-27 秦侯珍 增加修改记录组件 start -->
    <modifyRecord ref="modifyRecord"></modifyRecord>
    <!-- #2871 2019-11-27 秦侯珍 增加修改记录组件 end -->
  </div>
</template>
<script>
import {
  resultPage,
  getAssignmentType,
  getclassify,
  getProducts,
  update,
  getDetailsPageList,
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
  getOrgByName,
  getSdOrgName,
  getTransactionLine,
  getTradingUnitByName,
  getCustomerByName,
  getAllOrgByAttribute,
  getAlleleEnterprise,//张亮三 用电企业模糊查询
  // #2723 wangc 20191121 查询月
  getMonths,
  // #2723 wangc 20191121 查询企业参数
  getValueByOrgIdAndCode,
  getValueByOrgIdAndCode2,
  getPowerTestTransactionUnit,
  //#2807 张朋 20191126 查询参数装机、厂用电率和减扣基数电量数据
  getResultBaseData,
  getBenchmarkPrice,
  getReplyPrice, //2019-12-4 #2933 张朋 获取批复电价
  downloadImportTemplate, //模板下载
  getTradingStatus, //解析状态
} from "@common/api/business/jyTransactionNotice/index";
//获取维度信息
import { getSelectList } from "@common/api/base";
import { getToken } from "@common/utils/auth";
import { getAllLinList } from "@common/api/basicData/TMdataTieLin/index";
//2019-12-4 #2933 张朋 获取交易单元数据
import { jydyPage } from "@common/api/basicData/electricOrgManager/index";
import { getUserOrgInfo } from "@common/api/public/index";
//2019-11-11 #2620 张朋 引用弹框自适应路径
import {
  parseTime,
  getUnitMapByModelCode,
  getUnitMap,
  initDialogHeight
} from "@common/utils/index";
//#3010 2019-12-06 张亮三 引入请求首页计量单位方法getHomeUnit
import { getHomeUnit } from "@common/api/dashboard/index";
import { getTradingUnitbyOrgId } from "@common/api/business/bilateralNegotiation/index";
//2019-11-24 #2805 张朋 验证数字引用
import { validateNumberPositive } from "@common/utils/validate";
import { mapGetters } from "vuex";
//2019-12-11 #3111 zhangp 添加精确计算引用
import { create, all } from "mathjs";
const math = create(all);
export default {
  name: "result",
  props: {
    btn: {
      type: Object
    },
    jyTradingResultsId: {
      type: String
    },
    jyTradingResultsInfo: {
      type: Object
    },
    varietyOptions: {
      type: Array
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
    isdisabale: {
      type: Boolean
    },
    isdisabaleBtn: {
      type: Boolean
    },
    resultId: {
      type: String
    },
    //2019-11-4 #2556 张朋 成交电价类型参数
    electricityPriceStyle: {
      type: Boolean
    },
    //交易周期
    transactionData:{
       type: Array
    },
    //#4188 gaoaining 2020-06-22
    isBfms:{
      type: Boolean
    },
      //#4359 gaoaining 2020-06-24 接受组件传参
    isWhzz:{
      type:Boolean
    },
  },
  data() {
    //2019-11-26 #2805 张朋 厂用电率验证
    const useElecRate = (rule, value, callback) => {
      let reg = /^\d+[\d\.]*$/;
      if (value == "" || value == null) {
        callback();
      } else {
        if (
          reg.exec(value) == null ||
          value == "" ||
          (value.match(/\./g) && value.match(/\./g).length > 1)
        ) {
          return callback(new Error("厂用电率为数字"));
        } else {
          if (value < 0 || value > 100) {
            return callback(new Error("厂用电率在0-100之间"));
          } else {
            callback();
          }
        }
      }
    };
    return {
      //isBfms:false,//#4188 gaoaining 2020-06-15添加是否为北方模式
      powerTestTransactionUnit: [], //购电侧交易单元
      isShow: false,
      //#3914 gaoaining 2020-04-22 添加用电企业显示是否为简称的判断参数
      isJc:false,
      isjcjy:'0',
      // // #2723 wangc 20191121 月份数组
      unitList: [], //交易机组
      csunitList: [], //出/受让机组
      mounthList: [],
      AllOrg: [],
      LastName: "",
      jyflclasses: [], //交易分类
      jycpclasses: [], //交易产品
      jylxclasses: [], //交易类型
      eleEnterpriseList:[],//用电企业
      XL: "",
      QJ: false,
      LastId: "",
      isSelectOrg: false,
      ResultsInfo: this.jyTradingResultsInfo,
      isView: false,
      isVisiable: true,
      yearData: "",
      orgAttribute: "", //#3010 2019-12-16 张亮三 用于获取是哪个公司
      monthData: "",
      quarterData: {
        quarter: "",
        year: ""
      },
      unitMap: {},
      isTradingCycle: true,
      cycleQuarter: false,
      cycleYear: true,
      cycleMonth: false,
      lineOptions: [], //交易路线
      sdOrgFilterData: [], //单位名称
      orgFilterData: [], //发电公司
      loading: false, //检索等待
      delIds: "",
      isEdit: true,
      dialogFormVisible: false,
      dialogResultStatus: "",
      textMap: {
        update: "编辑",
        create: "新增"
      },
      tableKey: 0,
      resultList: [],
      total: null,
      listLoading: false,
      listQuery: {
        orgType: "buy",
        status: "",
        noticeDate: "", //发布日期
        tradingTime: "", //交易期次
        tradingCenterId: "", //交易中心
        tradingVariety: "", //交易品种
        tradingWay: "", //交易方式
        tradingCycle: "", //交易周期
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
      dropReferenceOpent: false, //降幅参照对象变量值
      AssignmentType: [],
      classify: [],
      Products: [],
      tieLineNameOption: [],
      rules: {},
      noticeDate: undefined,
      fileList: [],
      tradingUnitAll: [],
      tradingUnitMap: {},
      tradingUnitFilterData: [],
      customerFilterData: [], //客户模糊查询数据
      tradingUnitCell: null,
      listRowData: {},
      checkFormObj: {
        customerName: "",
        fdOrgName: "",
        dealElectricity: "",
        dealPrice: "",
        tradingUnitName: ""
      },
      rowData: {}, //行数据
      replyPriceVariable: "", //2019-12-3 #2933 张朋  批复电价变量
      benchmarkPriceVariable: "", //标杆电价变量
      //2019-11-26 #2805 张朋 新增字段
      announcementForm: {
        // cyzj:"", //参与装机
        useElecRate: "", //厂用电率
        jkjsdl: "" //减扣基数电量
      },
      //表单验证
      rules: {
        useElecRate: [
          {
            validator: useElecRate,
            trigger: "blur"
          }
        ],
        jkjsdl: [{ validator: validateNumberPositive, trigger: "blur" }]
        //2019-11-26 #2807 张朋 参与装机
        //  cyzj:[
        //      { validator: validateNumberPositive, trigger: "blur" }
        //  ]
      },
      dialogHeight: "", //2019-11-11 #2620 张朋 弹框获取自适应高度数据
      rowForm: {},
      errorMsgList: {},
      customerNames: "",
      tabHeight: 200,
      isJzjj: false,
      clearShow: true,
      accept:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel",
      limit_number: 1,
      uplaodHeaders: {},
      myFileList: [],
      uploadImportForm: {
        description: "jyTransactionNotice",
        resultId: ""
      },
      importTypeDialog: false,
      importantLoading: false,
      canUplaodImport: true,
      state: false,
      saveLoading:false,
      submitLoading:false,
    };
  },
  watch: {
    jyTradingResultsInfo(val) {
      this.ResultsInfo = val;
    }
  },
  created() {
    if (sessionStorage.getItem("modelCode") == "dashboard") {
      // this.unitMap = getUnitMapByModelCode(
      //   this.allSubMenus,
      //   this.unitMap,
      //   "jyjg-fd"
      // );
      // #3010 2019-12-06 张亮三 当modelCode未首页时获取首页的计量单位 start
      this.getHomeUnitData(this.orgId, "jyjg-fd");
      // #3010 2019-12-06 张亮三 当modelCode未首页时获取首页的计量单位 end
    } else {
      this.unitMap = getUnitMap(this.allSubMenus, this.unitMap);
    }

    getUserOrgInfo().then(res => {
      this.LastName = res[res.length - 1].orgName;
      this.LastId = res[res.length - 1].id;
    });
    this.uplaodHeaders = {
      Authorization: getToken(),
      ModelCode: sessionStorage.getItem("modelCode")
    };
    this.init();
    this.getResultList(this.dialogStatus, this.ResultsInfo);
    this.getProducts();
    this.getclassify();
    this.getAssignmentType();
    this.initgetTradingUnitByName();
  },
  computed: {
    ...mapGetters(["elements", "orgId", "allSubMenus"])
  },
  //#2871 2019-11-27 秦侯珍 引入修改记录组件
  components: {
    modifyRecord: () => import("../../../modifyRecord"),
    ImportantDialog: () => import("./ImportantDialog"),
  },
  /**2019-11-11 #2620 张朋  弹框自适应高度 start */
  mounted() {
    const that = this;
    this.dialogHeight = initDialogHeight();
    window.onresize = function temp() {
      that.dialogHeight = initDialogHeight();
    };
  },
  /**2019-11-11 #2620 张朋  弹框自适应高度 start */
  methods: {
    tradingUnit() {

    },
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
    /**
     *
     * @功能描述: 成交电价监听
     * @参数:
     * @返回值:
     * @作者: 张朋
     * @工单号：#2933
     * @Date: 2019-12-04 01:15:14
     * @最新修改内容:
     * @LastEditTime:
     */
    dealPriceStatusChange(data, row) {
      //let row =  this.listRowData; //获取行信息
      //当为true时为批复电价
      if (this.dropReferenceOpent) {
        //根据交易单元获取批复电价
        // 在 发电权转让 交易中，交易单元就是机组
        let tradingUnitFlag, isFdq
        isFdq = this.listQuery.tradingVariety === 'jypz03'
        if (isFdq) {
          tradingUnitFlag = typeof row.fdOrgJzId === "undefined" ||
            row.fdOrgJzId === "" ||
            row.fdOrgJzId === null
        } else {
          tradingUnitFlag = typeof row.tradingUnitId === "undefined" ||
            row.tradingUnitId === "" ||
            row.tradingUnitId === null
        }

        if (tradingUnitFlag) {
          Vue.set(this.listQuery.detailList[row.index - 1], "authorizedTariff", "");
        } else {
          // trading unit id
          // 通过判断是不是发电权转让交易来设置交易单元ID，并获取批复电价
          let tuid = isFdq ? row.fdOrgJzId : row.tradingUnitId
          getReplyPrice(tuid).then(res => {
            Vue.set(
              this.listQuery.detailList[row.index - 1],
              "authorizedTariff",
              res.data.authorizedTariff
            );

            //当报价方式为价差时
            if (this.ResultsInfo.quotationMethod == "bjfs01") {
              if (data != "") {
                //降幅取成交电价的绝对值
                Vue.set(
                  this.listQuery.detailList[row.index - 1],
                  "decline",
                  Math.abs(Number(data))
                );
                let decline = this.listQuery.detailList[row.index - 1].decline;
                //2019-12-10 #2933 zhangp 绝对价=批复电价-|降幅| 精确计算
                Vue.set(
                  this.listQuery.detailList[row.index - 1],
                  "absolutePrice",
                  //this.listQuery.detailList[row.index - 1].authorizedTariff - decline);
                  math.format(
                    math
                      .chain(
                        math.bignumber(
                          Number(
                            this.listQuery.detailList[row.index - 1].authorizedTariff
                          )
                        )
                      )
                      .subtract(math.bignumber(Math.abs(decline)))
                      .done()
                  )
                );
              } else {
                this.listQuery.detailList[row.index - 1].absolutePrice = "";
                this.listQuery.detailList[row.index - 1].decline = "";
              }
            } else {
              if (data != "") {
                //绝对价取成交电价
                let absolutePrice = (this.listQuery.detailList[
                  row.index - 1
                ].absolutePrice = Number(data));
                Vue.set(
                  this.listQuery.detailList[row.index - 1],
                  "decline",
                  // Math.abs(this.listQuery.detailList[row.index - 1].replyPrice -absolutePrice)
                  Math.abs(
                    math.format(
                      math
                        .chain(
                          math.bignumber(
                            Number(
                              this.listQuery.detailList[row.index - 1]
                                .authorizedTariff
                            )
                          )
                        )
                        .subtract(math.bignumber(Number(absolutePrice))).done()
                    )
                  )
                );
              } else {
                this.listQuery.detailList[row.index - 1].absolutePrice = "";
                this.listQuery.detailList[row.index - 1].decline = "";
              }
            }
          });
        }
      } else {
        //2019-12-8 #2933 zhangp  判断标杆电价是否有值,如果有值进行计算否则标杆电价为空并不计算
        if (
          this.benchmarkPriceVariable == "" ||
          this.benchmarkPriceVariable == null ||
          typeof this.benchmarkPriceVariable == "undefined"
        ) {
          this.listQuery.detailList[row.index - 1].benchmarkElectricityPrice =
            "";
        } else {
          this.listQuery.detailList[
            row.index - 1
          ].benchmarkElectricityPrice = this.benchmarkPriceVariable; //为标杆电价赋值
          //当报价方式为价差时
          if (this.ResultsInfo.quotationMethod == "bjfs01") {
            if (data != "") {
              //降幅取成交电价的绝对值
              Vue.set(
                this.listQuery.detailList[row.index - 1],
                "decline",
                Math.abs(Number(data))
              );
              //2019-12-10 #2933 zhangp 绝对价=标杆电价-|降幅| 精确计算
              let absolutePriceData = math.format(
                math
                  .chain(
                    math.bignumber(
                      Number(
                        this.listQuery.detailList[row.index - 1]
                          .benchmarkElectricityPrice
                      )
                    )
                  )
                  .subtract(
                    math.bignumber(
                      Math.abs(
                        Number(this.listQuery.detailList[row.index - 1].decline)
                      )
                    )
                  )
                  .done()
              );
              // let absolutePriceData =Number(this.listQuery.detailList[row.index - 1].benchmarkElectricityPrice) - Number(this.listQuery.detailList[row.index - 1].decline);
              Vue.set(
                this.listQuery.detailList[row.index - 1],
                "absolutePrice",
                absolutePriceData
              );
            } else {
              this.listQuery.detailList[row.index - 1].decline = "";
              this.listQuery.detailList[row.index - 1].absolutePrice = "";
            }
          } else {
            if (data != "") {
              //绝对价取成交电价
              let absolutePrice = (this.listQuery.detailList[
                row.index - 1
              ].absolutePrice = Number(data));

              //2019-12-10 #2933 zhangp  降幅取标标杆电价-绝对价的绝对值 精确计算
              this.listQuery.detailList[row.index - 1].decline = Math.abs(
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
              this.listQuery.detailList[row.index - 1].decline = "";
              this.listQuery.detailList[row.index - 1].absolutePrice = "";
            }
          }
        }
      }
    },
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
    getProducts() {
      getProducts().then(res => {
        this.Products = res;
      });
    },
    init() {
      this.getValueByOrgIdAndCode();
      // this.getPowerTestTransactionUnit();
      getAllLinList().then(res => {
        if (res.rel) {
          this.tieLineNameOption = res.data;
        }
      });

      this.getTradingUnitData();
      this.getCustomerData();
      this.getOrgData();
      this.getTransactionLine();
      this.setLayoutHeight();
      //2019年11月22日19:20:36 李志佳 获取交易机组
      getTradingUnitbyOrgId(this.orgId).then(res => {
        this.unitList = res.data.rows;
      });
    },
    setLayoutHeight() {
      this.tabHeight = initDialogHeight() * 0.55 + "px"; //2019-11-12 #2620 张朋 修改计算的表格高度
    },
    cancelImport() {
      this.listLoading = false;
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
    // 注释掉重复的方法定义
    // getTradingUnitData() {
    //   console.log(1)
    //   //获取所有交易单元数据
    //   getTradingUnitAll().then(res => {
    //     this.tradingUnitAll = res;
    //     this.tradingUnitAll.forEach(item => {
    //       this.tradingUnitMap[item.tradingUnitId] = item.tradingUnitName
    //     })
    //   });
    // },
    //获取所有客户数据
    getCustomerData() {
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
      //   let unitMap = this.tradingUnitMap
      //   res.forEach(item => {
      //     unitMap[item.tradingUnitId] = item.tradingUnitName
      //   })
      // });
    },
    // // #2723 wangc 20191121 处理传参方法
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
    getResultList(status, data) {
      log( this.isBfms)
      //2019-12-13 #3140 zhangp 根据交易方式获取标杆电价 
      this.rowData = data;
      let id = this.rowData.tradingCenterId;
      getPowerTestTransactionUnit(id).then(res => {
        if(res.rel) {
          this.powerTestTransactionUnit = res.data
        }
      })
      this.orgAttribute = data.orgAttribute;
      // // #2723 wangc 20191121 获取企业参数配置
      let obj = {
        orgId: this.orgId,
        configurationId: 3,
        parameterCode: 1030013
      };
      //#3914 gaoaining 2020-04-22 添加用电企业显示是否为简称的判断 start 
      getValueByOrgIdAndCode(obj).then(res => {
        this.isjcjy = res;
        if (res == "0") {
          this.isJc = true;
        }else{
          this.isJc = false;
        }
      });
      //#3914 gaoaining 2020-04-22 添加用电企业显示是否为简称的判断 end 

      //#4188 gaoaining 2020-04-22 添加发电权转让交易结果北方模式的判断 start 
      // let bfmsObj={
      //   orgId: this.orgId,
      //   configurationId: 3,
      //   parameterCode: 1030018
      // }
      // getValueByOrgIdAndCode(bfmsObj).then(res => {
      //   if (res == "0") {
      //     this.isBfms = true;
      //   }else{
      //     this.isBfms = false;
      //   }
      // });
      //#4188 gaoaining 2020-04-22 添加发电权转让交易结果北方模式的判断 end 

       let obj1 = {
        orgId: this.orgId,
        configurationId: 3,
        parameterCode: 1030005
      };
      getValueByOrgIdAndCode(obj1).then(res => {
        if (res == "0") {
          let params1 = {};
          params1.tradingCycleCode = this.whatTradingCycleCode(
            data.tradingCycleName
          );
          params1.tradingTime = data.tradingTime;
          // log('发电tradingTime',params)
          getMonths(params1).then(res => {
            this.mounthList = res.data;
          });
        }
      });

      this.XL = data.tieLineId;
      this.resultListQuery.jyTradingResultsId = data.jyTradingResultsId;
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
      // this.isEdit = false;
      for (let key in this.listQuery) {
        if (key != "orgType" && key != "status" && key != "detailList") {
          this.listQuery[key] = data[key];
        }
      }
      this.rowForm = {
        index: "",
        tieLineName: "", //线路
        fdOrgName: "", //发电公司
        powerPurchaseUnitCode: "", //购电侧交易单元
        customerId: "noNull", //客户名称 
        customerName: "noNull", //客户名称 
        dealElectricity: "noNull", //成交电量
        tradingUnitId: "noNull", //交易单元 
        dealPrice: "noNull" //成交电价
      };
      //2019-11-26  #2805 张朋 清空表单
      this.announcementForm = {
        jkjsdl: "",
        useElecRate: ""
        // cyzj:""
      };
      /**2019-11-26 #2805 张朋 获取参与装机、厂用电率、减扣基数电量数据 start*/
      let params = {
        jyTradingResultsId: data.jyTradingResultsId
      };
      // #3010 2019-12-17 张亮三 给后端传递orgAttribute 用于判断是发电/售电，区域公司
       params.orgAttribute = this.orgAttribute;
      getResultBaseData(params).then(res => {
        if (res.falg) {
          if (res.data) {
            this.announcementForm.jkjsdl = res.data.jkjsdl;
            this.announcementForm.useElecRate = res.data.useElecRate;
            // this.announcementForm.cyzj = res.data.cyzj
          } else {
            this.announcementForm.jkjsdl = "";
            this.announcementForm.useElecRate = "";
            // this.announcementForm.cyzj = ""
          }
        }
      });

      /**2019-11-26 #2805 张朋 赋值 end*/
      this.XL = "";
      this.QJ = false;
      if (
        (data.tradingVariety == "jypz01" && data.tradingWay == "jyfs01") ||
        (data.tradingVariety == "jypz01" && data.tradingWay == "jyfs03")
      ) {
        this.rowForm.tieLineName = "";
      } else if (
        data.tradingVariety == "jypz01" &&
        data.tradingWay == "jyfs02"
      ) {
        this.QJ = true;

        this.rowForm.customerName = "";
        // delete this.rowForm.dealPrice;
      } else if (
        data.tradingVariety == "jypz02" &&
        data.tradingWay == "jyfs01"
      ) {
        // delete this.rowForm .dealPrice;
      } else if (
        data.tradingVariety == "jypz02" &&
        data.tradingWay == "jyfs02"
      ) {
        this.QJ = true;

        this.XL = data.tieLineId;
        this.rowForm.customerName = "";
        // delete this.rowForm.dealPrice;
      } else if (
        data.tradingVariety == "jypz02" &&
        data.tradingWay == "jyfs03"
      ) {
        this.XL = data.tieLineId;
        // delete this.rowForm .dealPrice;
      } else if (
        (data.tradingVariety == "jypz03" && data.tradingWay == "jyfs01") ||
        (data.tradingVariety == "jypz03" && data.tradingWay == "jyfs02") ||
        (data.tradingVariety == "jypz03" && data.tradingWay == "jyfs03")
      ) {
        // 发电权
         // #4188 gaoaining 2020-06-15 当发电权转让交易结果北方模式参数哦维护为“是”时 出/受让发电企业”和“出/受让机组非必填 start
        if(this.isBfms){
          log(1992)
          this.rowForm = {
            index: "",
            product: "noNull",
            dealElectricity: "noNull",
            dealPrice: "noNull",
            tradingClassify: "noNull",
            fdOrgJz: "noNull",
            fdOrgName: "noNull",
            type: "noNull"
          };
        }else{
          log(2004)
          this.rowForm = {
            index: "",
            product: "noNull",
            sellOrAssigneeJz: "noNull",
            dealElectricity: "noNull",
            dealPrice: "noNull",
            sellOrAssigneeFdOrgId: "noNull",
            tradingClassify: "noNull",
            fdOrgJz: "noNull",
            fdOrgName: "noNull",
            type: "noNull"
          };
        }
         // #4188 gaoaining 2020-06-15 当发电权转让交易结果北方模式参数哦维护为“是”时 出/受让发电企业”和“出/受让机组非必填 end
        
      } else if (
        (data.tradingVariety == "jypz03" && data.tradingWay == "jyfs05")
      ) {
        //20200114 阿彪 #3631 注释原因是发电权转让交易的表格没有该字段表头
        log(1855,data.tradingVariety , "jypz03" ,data.tradingWay ,"jyfs05")
        this.rowForm.customerId='';
        this.rowForm.customerName='';
        this.rowForm.tradingUnitId='';
      }
      if (data.tradingWay == "jyfs02") {
        this.isJzjj = true;
        this.rowForm.customerName = "";
        this.rowForm.customerId = "";
      }
      // <!--  #3250 wangc 20191223 交易品种为发电权转让，交易方式为集中撮合，交易分类、类型、机组、产品、出/受让发电企业、出/ 受让机组，设为必填项-->
       if (data.tradingWay == "jyfs05"&& data.tradingVariety == "jypz03") {
        this.rowForm.tradingClassify = "noNull";
        this.rowForm.type = "noNull";
        this.rowForm.fdOrgJz = "noNull";
        this.rowForm.product = "noNull";
        this.rowForm.sellOrAssigneeFdOrgId = "noNull";
        this.rowForm.sellOrAssigneeJz = "noNull";
      }

      this.getResult(data.jyTradingResultsId);

      // this.listLoading = false;
    },

    getResult(id) {
      //获取交易结果列表
      let params = {};
      params.jyTradingResultsId = id;
      //  #3010 2019-12-16 张亮三 在首页不传orgType
       if (sessionStorage.getItem("modelCode") == "dashboard" && this.orgAttribute=='FD') {
         params.orgType="product";
       }else{
         params.orgType = "product";
       }
      
      params.fdOrgId = this.orgId;
      params.limit = this.resultListQuery.limit;
      params.page = this.resultListQuery.page;
      params.orgAttribute = this.orgAttribute;
      //#3914 gaoaining 2020-04-22 当交易品种为发电转让权时添加参数 start
      if(this.ResultsInfo.tradingVariety == 'jypz03' && this.isjcjy == '0'){
        params.tradingVariety = 'jypz03';
      }
      //#3914 gaoaining 2020-04-22 当交易品种为发电转让权时添加参数 end
      getDetailsPageList(params).then(res => {
        let items = res.data.rows.map((item, index) => {
          item.index =
            index +
            1 +
            (this.resultListQuery.page - 1) * this.resultListQuery.limit;
           // #4365 gaoaining 2020-06-23 处理字段不显示问题 注释掉重新赋值，现在这个字段已返回 start
          // 20200417 阿彪 #3912 初始化弹窗表格缺少字段问题导致下拉框匹配不上 start
          // if (this.listQuery.tradingVariety === 'jypz03') {
          //   item.fdOrgJzId = item.tradingUnitId;
          // } 
          // 20200417 阿彪 #3912 初始化弹窗表格缺少字段问题导致下拉框匹配不上 end
          // #4365 gaoaining 2020-06-23 处理字段不显示问题 注释掉重新赋值，现在这个字段已返回 end
          return item;
        });
        this.listQuery.detailList = items;
        // #2723 wangc 20191121 数据处理增加月数组
        this.listQuery.detailList.forEach(element => {
          element.detailVal = this.mounthList;
        });
        // this.listQuery.detailList[0]["2019-05"] = "1";
        // this.listQuery.detailList[0]["2019-06"] = "1";
        // this.listQuery.detailList[1]["2019-07"] = "2";
        // console.log(this.listQuery.detailList);

        this.total = res.data.total;
        this.listLoading = false;
      });
      //2019-12-10 #2933 zhangp 进入时判断降幅参照对象
      if (typeof this.ResultsInfo.objcetData != "undefined") {        
        if (this.ResultsInfo.objcetData.dropReferenceCode != null) {
            //当降幅参照对象为标杆电价时
          if (this.ResultsInfo.objcetData.dropReferenceCode == "jfczdx001") {
             //2020-1-13 #3471 zhangp  当降幅参照对象选择的是标杆电价，发电类型为水电
            if (this.ResultsInfo.objcetData.powerTypeCode == "102") {
                 //遍历交易周期获取对应的code值
               this.transactionData.forEach((data, index) => {
                    if (data.propName == this.rowData.tradingCycleName) {
                      this.rowData.tradingCycle = data.propCode;
                    }
                });
                let param = {
                  isSupplyHeat: this.ResultsInfo.objcetData.isThermoelectricity,
                  generationCategory: String(
                    this.ResultsInfo.objcetData.powerTypeCode
                  ),
                  provenceCode: this.ResultsInfo.objcetData.provinceCode,
                  noticeDate: this.ResultsInfo.objcetData.releaseDate,
                  //2020-1-13 #3471 zhangp 增加调度电网和交易周期判断条件
                  gridCode: this.ResultsInfo.objcetData.gridCode,
                  tradingCycle: this.rowData.tradingCycle,
                  //交易期次
                  issue: this.rowData.tradingTime
                };
                getBenchmarkPrice(param).then(res => {
                  if(res.rel){
                     this.benchmarkPriceVariable = res.data;
                  }else{
                     this.benchmarkPriceVariable = "";
                  }
                });
            } else {
              let param = {
                isSupplyHeat: this.ResultsInfo.objcetData.isThermoelectricity,
                generationCategory: String(
                  this.ResultsInfo.objcetData.powerTypeCode
                ),
                provenceCode: this.ResultsInfo.objcetData.provinceCode,
                noticeDate: this.ResultsInfo.objcetData.releaseDate,
                //2020-1-13 #3471 zhangp 增加调度电网的判断条件
                gridCode: this.ResultsInfo.objcetData.gridCode,
              };
              getBenchmarkPrice(param).then(res => {
                if (res.rel) {
                  this.benchmarkPriceVariable = res.data;
                }else{
                   this.benchmarkPriceVariable = "";
                }
              });
            }
            this.dropReferenceOpent = false;
          } else {
            this.dropReferenceOpent = true;
          }
        }
      }
      /**2019-12-5 #2933 张朋 当降幅参照对象为标杆电价时  end*/
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
// <!--  #3250 wangc 20191223 交易品种为发电权转让，交易方式为集中撮合，交易分类、类型、机组、产品、出/受让发电企业、出/ 受让机组，设为必填项-->
      if (this.ResultsInfo.tradingWay == "jyfs05"&& this.ResultsInfo.tradingVariety == "jypz03") {
        this.rowForm.tradingClassify = "noNull";
        this.rowForm.type = "noNull";
        this.rowForm.fdOrgJz = "noNull";
        this.rowForm.product = "noNull";
        this.rowForm.sellOrAssigneeFdOrgId = "noNull";
        this.rowForm.sellOrAssigneeJz = "noNull";
      }
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
      /**2019-12-3  #2933 张朋 当降幅参照对象操作  start*/
      //当降幅参照对象为批复电价时
      if (this.ResultsInfo.objcetData.dropReferenceCode == "jfczdx002") {
        list.benchmarkElectricityPrice = ""; //标杆电价为空
        this.dropReferenceOpent = true;
      }
      /**2019-12-3  #2933 张朋 当降幅参照对象操作  end*/
      list.fdOrgName = this.LastName;
      // list.tieLineName = this.XL;
      list.transactionLineName = this.ResultsInfo.tieLineName;
      list.transactionLine = this.ResultsInfo.tieLineId;
      this.listQuery.detailList.push(list);
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
      let data = this.checkDetailList();
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
          let data = this.checkDetailList();
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
      //2019-11-24 #2807 张朋 表单验证
      const set = this.$refs;
      set["announcementForm"].validate(valid => {
        if (valid) { 
          let params = {};
          params = this.ResultsInfo;
          params.orgType = "product";
          this.listQuery.detailList.forEach(element => {
            element.status = data;
            element.orgType = "product";
          });
          params.detailList = this.listQuery.detailList;
          params.detailList.forEach((element, count) => {
            //判断电量值不为空时
            if (
              element.dealElectricity != null ||
              element.dealElectricity != "" ||
              typeof element.dealElectricity != undefined
            ) {
              let dealElectricity = element.dealElectricity + "";
              if (dealElectricity.indexOf(".") != -1) {
                let point = dealElectricity.indexOf(".");
                //截取小数点后八位小数
                params.detailList[count].dealElectricity = dealElectricity.slice(0, point + 9);
              }
            }
            //2019-11-9 #2556 张朋 当交易报价为绝对值时成交电价不进行切分
            if (this.electricityPriceStyle == true) {
              //判断成交成电价不为空时
              if (
                element.dealPrice != null ||
                element.dealPrice != "" ||
                typeof element.dealPrice != undefined
              ) {
                let dealPrice = element.dealPrice + "";
                if (dealPrice.indexOf(".") != -1) {
                  let point = dealPrice.indexOf(".");
                  params.detailList[count].dealPrice = dealPrice.slice(
                    0,
                    point + 9
                  );
                }
              }
            }
            element.fdOrgId = this.LastId;
          });
          //console.log(params);
          // #2723 wangc 20191121 数据处理方法
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
          // #3545 2020-01-14 张亮三  解决清楚用电企业保存后还显示问题 start
          params.detailList.forEach(item=>{
            if(item.eleEnterpriseName==""){
              item.eleEnterprise = "";
            }
          })
          // #3545 2020-01-14 张亮三  解决清楚用电企业保存后还显示问题 end
          //2019-11-26 #2807 张朋 announcementForm对象的数据赋值到指定的对象内
          params.jyTradingResultsBaseData = this.announcementForm;
          // console.log(params, 11);
          // #3932 保存提交按钮不可重复点击 fengzp 2020-0423
          if (data == "11") {
            this.saveLoading = true;
          }else { 
            this.submitLoading = true;
          } 

          update(params).then(res => {
            if (res.rel) {
            this.saveLoading = false;
            this.submitLoading = false;
              if (data == "11") {
                this.$notify({
                  title: "成功",
                  message: "保存成功",
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
              // this.errorMsgList = res.data;
              // this.checkerrorMsgList();
              this.saveLoading = false;
              this.submitLoading = false;

              this.$notify({
                title: "失败！",
                message: res.msg,
                type: "warning",
                duration: 2000
              });
            }
          });
        } else {
          return false;
        }
      });
    },
    //检测表格数据
    checkTab() {
      let data = {
        status: true,
        errIndex: []
      };
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
              // 2019-11-07 #2568  秦侯珍 交易结果-发电，交易方式为双边、挂牌，客户名称不是非必填；交易方式为集中竞价，“客户名称”应为非必填项。在客户名称框里增加叉号。 start
              if (this.jyTradingResultsInfo.tradingWayName == "集中竞价") {
                if (key == "customerName") {
                  Vue.set(this.listQuery.detailList[i], b, "");
                  Vue.set(this.listQuery.detailList[i], c, "");
                } else {
                  Vue.set(this.listQuery.detailList[i], b, "ipt-err-true");
                  Vue.set(this.listQuery.detailList[i], c, "不能为空值");
                  this.isErr = true;
                }
              } else {
                Vue.set(this.listQuery.detailList[i], b, "ipt-err-true");
                Vue.set(this.listQuery.detailList[i], c, "不能为空值");
                this.isErr = true;
              }
              // 2019-11-07 #2568  秦侯珍 交易结果-发电，交易方式为双边、挂牌，客户名称不是非必填；交易方式为集中竞价，“客户名称”应为非必填项。在客户名称框里增加叉号。 end
              if (data.status != false) {
                data.status = false;
              }
            } else {
              //当electricityPriceStyle为false时，报价方式为价差
              /**2019-11-4  #2556 张朋 验证成交电价类型  start*/

              //2019-11-6  #2556 张朋 当报价方式为价差时电价判断条件调整
              // if (this.electricityPriceStyle == false && key == "dealPrice") {
              //   //2019-11-7 #2556 张朋  成交电价为价差方式是小于等于0
              //   if (this.listQuery.detailList[i].dealPrice > 0) {
              //     Vue.set(this.listQuery.detailList[i], b, "ipt-err-true");
              //     //成交电价错误提示
              //     Vue.set(this.listQuery.detailList[i], c, "成交电价应为负数");
              //     if (data.status != false) {
              //       data.status = false;
              //     }
              //   } else if (
              //     this.listQuery.detailList[i].dealPrice.length -
              //       (String(this.listQuery.detailList[i].dealPrice).indexOf(".") +1) >8) {
              //     Vue.set(this.listQuery.detailList[i], b, "ipt-err-true");
              //     Vue.set(this.listQuery.detailList[i], c, "只限制8位小数");
              //     data.status = false;
              //   }
              //   /**2019-11-4  #2556 张朋 验证成交电价类型  end*/
              // } else {
              //   if (data.status != false) {
              //     data.status = true;
              //   }
              // }
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
              if(this.listQuery.detailList[i].type == 'csrlx_01' && key == "dealElectricity"){
                if (this.listQuery.detailList[i].dealElectricity > 0) {
                  Vue.set(this.listQuery.detailList[i], b, "ipt-err-true");
                  //成交电量错误提示
                  Vue.set(this.listQuery.detailList[i], c, "成交电量应为负数");
                  if (data.status != false) {
                    data.status = false;
                  }
                }
              }else if(this.listQuery.detailList[i].type == 'csrlx_02' && key == "dealElectricity"){
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
      }

      if (this.QJ) {
        let temp = this.listQuery.detailList[0].dealPrice;
        let checkdata = true;
        for (let index = 0; index < this.listQuery.detailList.length; index++) {
          if (temp != this.listQuery.detailList[index].dealPrice) {
            checkdata = false;
          }
        }
        if (!checkdata) {
          this.listQuery.detailList.forEach(element => {
            element.dealPriceStatus = "ipt-err-true";
            element.dealPriceStatusMsg = "出清价格不同，请修正";
          });
          if (data.status != false) {
            data.status = false;
          }
          return data;
        }
      }
      return data;
    },
    //编辑
    update(state) {
      //2019-11-21 #2700 阿彪 当出清方式如果选择统一出清时成交电价应该全部相等 start
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
      //2019-11-21 #2700 阿彪 当出清方式如果选择统一出清时成交电价应该全部相等 end
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
      //点击保存提示提交失败 #3128 去掉保存时删除接口 frj 2019-12-12 20:23:28
      // if (this.delIds) {
      //   this.listQuery.deleteDetailIDs = this.delIds;
      //   delResultId(this.delIds).then(res => {
      //     if (res.rel) {
      //       this.listQuery.status = state;

      //       this.putObjCom(state);
      //     } else {
      //       this.$notify({
      //         title: "提示",
      //         message: "提交失败",
      //         type: "warning",
      //         duration: 2000
      //       });
      //     }
      //   });
      // } else {
        this.listQuery.status = state;
        this.putObjCom(state);
      // }
    },
    resetTemp() {
      this.total = null;
      this.dialogStatus == "";
      const set = this.$refs;
      set.listQueryForm.resetFields();
      this.isEdit = false;
      (this.listQuery = {
        orgType: "buy",
        status: "",
        noticeDate: "", //发布日期
        tradingTime: "", //交易期次
        tradingCenterId: "", //交易中心
        tradingVariety: "", //交易品种
        tradingWay: "", //交易方式
        tradingCycle: "", //交易周期
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
          this.listQuery.detailList = items;
          this.total = this.listQuery.detailList.length;
          // if (this.delIds == "") {
          //   this.delIds += row.detailId;
          // } else {
          //   this.delIds += "," + row.detailId;
          // }
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
      let paramArr = {
        tradingVariety: this.ResultsInfo.tradingVariety,
        tradingWay: this.ResultsInfo.tradingWay
      }
      let tradingVariety = this.ResultsInfo.tradingVariety //交易品种
      let tradingWay = this.ResultsInfo.tradingWay //交易方式
      let jyflclasses = this.jyflclasses //交易分类
      let jycpclasses = this.jycpclasses //交易产品
      let jylxclasses = this.jylxclasses //交易类型
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
          // console.log("5666",outdata)
          // _this.clearShow = true; //2019-11-06 解决不清空上一次上传的内容问题
          if (outdata.length > 0) {
            _this.dealFile(outdata); // analyzeData: 解析导入数据
          }
         

          // let resultObj = {};
          // if(tradingVariety == "jypz03") {
          //   outdata.forEach(element => {
          //     if(!element["*交易分类"] || !element["*类型"] || !element["*产品"]) {
          //       _this.$notify({
          //         title: "提示",
          //         message: "导入失败！交易分类，交易类型，交易产品不能为空",
          //         type: "warning",
          //         duration: 2000
          //       });
          //       console.log("88",jyflclasses.indexOf(element["*交易分类"]))
          //     }
          //     else if(jyflclasses.indexOf(element["*交易分类"])<= -1 || jycpclasses.indexOf(element["*产品"])<= -1 || jylxclasses.indexOf(element["*类型"])<=-1){
          //       _this.$notify({
          //         title: "提示",
          //         message: "导入失败！维度中无该交易分类or交易产品or交易类型",
          //         type: "warning",
          //         duration: 2000
          //       });
          //     } else {
          //       resultObj = {};
          //       resultObj.fdOrgName = element["*发电公司"];
          //       resultObj.tradingUnitName = element["*交易单元"];
          //       resultObj.tradingUnitId = element["*交易单元"];
          //       resultObj.customerName = element["客户名称"];
          //       // resultObj.dealPrice = element["*成交电价"];
          //       // resultObj.dealElectricity = element["*成交电量"];
          //       // 2019-11-06 #2456 康如涛  解决导入无数据问题
          //       resultObj.dealPrice =
          //         element["*成交电价（" + _this.unitMap.priceUnit + "）"];
          //       resultObj.dealElectricity =
          //         element["*成交电量（" + _this.unitMap.electricityUnit + "）"];

          //       _this.listQuery.detailList.push(resultObj);

          //       console.log("566688",resultObj)

          //       let items = _this.listQuery.detailList.map((item, index) => {
          //         item.index =
          //           index +
          //           1 +
          //           (_this.resultListQuery.page - 1) * _this.resultListQuery.limit;
          //         item.or;
          //         return item;
          //       });
          //       _this.listQuery.detailList = items;
          //       _this.total = _this.listQuery.detailList.length;
          //     }    
          //   })
          // }
            
          
          // outdata.forEach(element => {
            
          //   resultObj = {};
          //   resultObj.fdOrgName = element["*发电公司"];
          //   resultObj.tradingUnitName = element["*交易单元"];
          //   resultObj.tradingUnitId = element["*交易单元"];
          //   resultObj.customerName = element["客户名称"];
          //   // resultObj.dealPrice = element["*成交电价"];
          //   // resultObj.dealElectricity = element["*成交电量"];
          //   // 2019-11-06 #2456 康如涛  解决导入无数据问题
          //   resultObj.dealPrice =
          //     element["*成交电价（" + _this.unitMap.priceUnit + "）"];
          //   resultObj.dealElectricity =
          //     element["*成交电量（" + _this.unitMap.electricityUnit + "）"];

          //   _this.listQuery.detailList.push(resultObj);

          //   console.log("566688",resultObj)

          //   let items = _this.listQuery.detailList.map((item, index) => {
          //     item.index =
          //       index +
          //       1 +
          //       (_this.resultListQuery.page - 1) * _this.resultListQuery.limit;
          //     item.or;
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
      // console.log("0909",data)
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
      // 2019-11-06 #2456 康如涛  解决无法导出问题
      // #2606 2019-11-18 张亮三 解决当数据只有一条时无法导出数据问题
      if (this.listQuery.detailList.length > 0) {
        if (typeof this.listQuery.detailList[0].detailId != "undefined") {
          if (this.listQuery.detailList[0].detailId != "") {
            //20191203 阿彪 #2858 交易管理 - 交易结果-发电 tradingVariety
            ResultExportObj(
              this.resultListQuery.jyTradingResultsId,
              this.LastName,
              this.listQuery.tradingVariety
            );
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
      let reg = /^\d+$|^\d*\.\d+$/g;
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
    },
    //获取客户名称数据
    getCustomerInfoByName(query) {
      if (query !== "") {
        this.loading = true;
        this.customerFilterData = [];
        let parameters = { name: query, type: "customer" };
        getCustomerByName(parameters).then(res => {
          this.loading = false;
          this.customerFilterData = res;
        });
      }
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
      getOrgByName(parameters).then(res => {
        this.loading = false;
        this.orgFilterData = res;
      });
    },
    //发电公司change事件
    selectOrg(value) {
      this.listRowData.tradingUnitName = "";
      this.tradingUnitFilterData = [];
      this.isSelectOrg = false;
      this.orgFilterData.forEach((item, orgName) => {
        if (item.orgName == value) {
          this.listRowData.fdOrgId = item.id;
        }
      });
    },
    initgetTradingUnitByName() {
      getTradingUnitByName({ orgId: this.orgId }).then(res => {
        this.loading = false;
        this.tradingUnitFilterData = res;
      });
    },
    getTradingUnitByName(query) {
      //按名称模糊查询交易单元
      this.tradingUnitFilterData = [];
      this.listRowData.fdOrgId = this.LastId;

      if (
        this.listRowData.fdOrgId != undefined &&
        this.listRowData.fdOrgId != ""
      ) {
        this.loading = true;
        let parameters = {
          tradingUnitName: query,
          orgId: this.orgId
        };

        getTradingUnitByName(parameters).then(res => {
          this.loading = false;
          this.tradingUnitFilterData = res;
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
    getAllOrgByAttribute(query) {
      //按名称模糊查询交易单元
      this.AllOrg = [];
      this.loading = true;
      let parameters = {
        orgName: query,
        attributeTypeCode: "zzjgsx02"
      };
      getAllOrgByAttribute(parameters).then(res => {
        this.loading = false;
        this.AllOrg = res;
      });
    },
    // #3545 2020-01-13 张亮三 用电企业模糊查询数据 start
    getAlleleEnterprise(query) {
      this.eleEnterpriseList = [];
      this.loading = true;
      let parameters = {
        name:query
      };
      if(this.ResultsInfo.tradingVariety == 'jypz03' && this.isjcjy == '0'){
        parameters.tradingVariety = 'jypz03';
      }
      getAlleleEnterprise(parameters).then(res => {
        this.loading = false;
        this.eleEnterpriseList = res;
      });
    },
    // #3545 2020-01-13 张亮三 用电企业模糊查询数据 end
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
    tradingUnitNameFocus1(index,row) {
      log(2796,index)
      log(2797,this.eleEnterpriseList)
      this.eleEnterpriseList.forEach(item=>{
        if(item.customerName==this.listQuery.detailList[index].eleEnterpriseName){
          this.listQuery.detailList[index].eleEnterprise=item.customerId;
        }
      })
      log(2803,this.listQuery.detailList[index])
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
      // 设置机组名称或者交易单元名称
      if (this.listQuery.tradingVariety === 'jypz03') {
        this.listQuery.detailList[row.index - 1].fdOrgJzId = data;
        this.listQuery.detailList[row.index - 1].fdOrgJz = this.tradingUnitMap[data]
      } else {
        this.listQuery.detailList[row.index - 1].tradingUnitId = data;
        this.listQuery.detailList[row.index - 1].tradingUnitName = this.tradingUnitMap[data]
      }
      //2019-12-4 #2933 张朋 点击交易单元判断降幅参照对象为批复电价
      if (this.dropReferenceOpent) {
        //根据交易单元获取批复电价
        getReplyPrice(data).then(res => {
          Vue.set(
            this.listQuery.detailList[row.index - 1],
            "authorizedTariff",
            res.data.authorizedTariff
          );
        });
      }
    },
    selectcustomerId(data, row) {
      this.customerFilterData.forEach(item => {
        if (item.customerName == data) {
          this.listQuery.detailList[row.index - 1].customerId = item.customerId;
        }
      });
    },
    getSellOrAssigneeFdOrgId(data, row) {
      this.listQuery.detailList[row.index - 1].sellOrAssigneeFdOrgId = data;
      //获取机组下拉选项 李志佳 2019年11月25日09:27:31
      getTradingUnitbyOrgId(data).then(res => {
        this.csunitList = res.data.rows;
      });
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
    customerNameFocus() {
      let rowData = Object.assign(
        {},
        this.listQuery.detailList[this.listRowData.index]
      );
      let detailList = Object.assign([], this.listQuery.detailList);
      rowData.customerNameStatus = false;
      detailList[this.listRowData.index - 1].customerNameStatus = false;
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
      this.uploadImportForm.resultId = this.resultId;
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
      if (this.canUplaodImport) {
        this.$refs.uploadFileAdd.submit();
      } else {
        this.$alert(
          `所选板为"${this.importContractForm.saleContractTypeName}",与文件不匹配，请修改后上传！`,
          "提示信息",
          {
            confirmButtonText: "确定",
            callback: action => {}
          }
        );
      }
    },
    //查看导入结果
    showImportResult() {
      this.uploadImportForm.resultId = this.resultId;
      getTradingStatus(this.uploadImportForm).then(res => {
        if(res.rel){
          this.$refs.importantDialog.initImportData(
            this.resultId
          );
        }else {
          this.$notify({
            title: "提示",
            message:res.msg,
            type: "warning",
            duration: 2000
          });
        }
      })
    },
    //模板下载
    downloadTemplateFile() {
      let parm = {
        tradingVariety: this.ResultsInfo.tradingVariety,
        tradingWay: this.ResultsInfo.tradingWay,
        description: "jyTransactionNotice"
      }
      downloadImportTemplate(parm);
    },
    dealPriceFocus() {
      // let rowData = Object.assign(
      //   {},
      //   this.listQuery.detailList[this.listRowData.index]
      // );
      // let detailList = Object.assign([], this.listQuery.detailList);
      // rowData.dealPriceStatus = false;
      // detailList[this.listRowData.index - 1].dealPriceStatus = false;
      // this.listQuery.detailList = [];
      // this.listQuery.detailList = detailList;
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
        jyTradingResultsId: this.resultListQuery.jyTradingResultsId
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
</style>

