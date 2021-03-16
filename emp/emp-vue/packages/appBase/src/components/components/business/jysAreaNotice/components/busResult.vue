<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container f-ml10 form-inline-180">
      <el-form :inline="true" :model="listQuery" ref="listQueryForm" label-width="100px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="交易序列名称" prop="tradingCenterId" algin="right">
              <el-select
                class="four-col left"
                :disabled="isDisabled"
                v-model="jyTradingResultsInfo.jyxlmc"
              >
                <el-option
                  v-for="item in centerOptions"
                  :key="item.propCode"
                  :label="item.propName"
                  :value="item.propCode"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="交易品种" prop="tradingVariety">
              <!-- 2019-10-28 #2440 交易品种显示为名称 滕超-->
              <el-select
                class="four-col left"
                :disabled="isDisabled"
                v-model="jyTradingResultsInfo.tradingVarietyName"
              >
                <el-option
                  v-for="item in varietyOptions"
                  :key="item.propCode"
                  :label="item.propName"
                  :value="item.propCode"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="交易方式" prop="tradingWay">
              <!-- 2019-10-28 #2440 交易方式显示为名称 滕超-->
              <el-select
                class="four-col left"
                :disabled="isDisabled"
                v-model="jyTradingResultsInfo.tradingWayName"
              >
                <el-option
                  v-for="item in wayOptions"
                  :key="item.propCode"
                  :label="item.propName"
                  :value="item.propCode"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="交易周期" prop="tradingCycle" algin="right">
              <el-select
                class="four-col left"
                :disabled="isDisabled"
                v-model="jyTradingResultsInfo.tradingCycleName"
              >
                <el-option
                  v-for="item in periodOptions"
                  :key="item.propCode"
                  :label="item.propName"
                  :value="item.propCode"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="交易期次" prop="tradingTime">
              <el-input v-model="listQuery.tradingTime" :disabled="isDisabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="noticeDate" label="发布日期">
              <el-input v-model="listQuery.noticeDate" :disabled="isDisabled"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
      <el-tab-pane v-if="this.state" label="发电公司交易结果" name="first">
        <div class="top-box">
          <el-button
            type="primary"
            v-if="isDashboard"
            icon="el-icon-download"
            @click="handleExportFd"
          >导出</el-button>
          <div class="txt-right unit-info">单位：{{unitMap.electricityUnit}}、{{unitMap.priceUnit}}</div>
        </div>
        <el-table
          :key="tableKey"
          :data="listQuery.buyList"
          v-loading.body="listLoading"
          border
          fit
          highlight-current-row
          style="width: 100%"
          height="300px"
        >
          <!-- </el-table-column>-->
          <el-table-column :disabled="isEdit" prop="index" label="序号" align="center" width="70px"></el-table-column>
          <!--2019-12-10 #2965 zhangp  调整展现格式 start -->
          <el-table-column align="center" label="发电公司">
            <template slot-scope="scope">
              <el-input disabled v-model="scope.row.fdOrgName"></el-input>
            </template>
          </el-table-column>
          <el-table-column width="140px" align="center" label="交易单元">
            <template slot-scope="scope">
              <el-input disabled v-model="scope.row.tradingUnitName"></el-input>
            </template>
          </el-table-column>
          <el-table-column width="140px" align="center" label="客户名称">
            <template slot-scope="scope">
              <el-input disabled v-model="scope.row.customerName"></el-input>
            </template>
          </el-table-column>
          <el-table-column width="200px" align="center" label="成交电量">
            <template slot-scope="scope">
              <el-input disabled v-model="scope.row.dealElectricity"></el-input>
            </template>
          </el-table-column>
          <el-table-column width="200px" align="center" label="成交电价">
            <template slot-scope="scope">
              <el-input disabled v-model="scope.row.dealPrice"></el-input>
            </template>
          </el-table-column>
           <!--2019年12月19日09:39:44 李志佳 增加‘降幅’、‘绝对价’、‘标杆电价’、‘批复电价’字段 start -->
          <el-table-column align="center" label="降幅">
            <template slot-scope="scope">
              <el-input disabled v-model="scope.row.decline"></el-input>
            </template>
          </el-table-column>
          <el-table-column align="center" label="绝对价">
            <template slot-scope="scope">
              <el-input
                disabled
                v-model="scope.row.absolutePrice"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column align="center" label="标杆电价">
            <template slot-scope="scope">
              <el-input
                disabled
                v-model="scope.row.benchmarkElectricityPrice"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column align="center" label="批复电价">
            <template slot-scope="scope">
              <el-input
                disabled
                v-model="scope.row.authorizedTariff"
              ></el-input>
            </template>
          </el-table-column>
          <!--2019-12-3 #2933  张朋 增加‘降幅’、‘绝对价’、‘标杆电价’、‘批复电价’字段 end -->
          <!--李志佳 2019年12月19日14:18:24 发电/售电 -月电量分解 start-->
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
                disabled
                v-model="scope.row[item.month]"
              ></el-input>
            </template>
          </el-table-column>
          <!--李志佳 2019年12月19日14:18:47 发电/售电 -月电量分解  end -->
          <!--2019-12-10 #2965 zhangp  调整展现格式 end -->
        </el-table>
        <div v-show="!listLoading" class="pagination-container">
          <el-pagination
            @size-change="handleSizeChange1"
            @current-change="handleCurrentChange1"
            :current-page.sync="buyListQuery.page"
            :page-sizes="[10, 20, 30, 50, 100, 200, 500, 1000]"
            :page-size="buyListQuery.limit"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total1"
          ></el-pagination>
        </div>
        <div>
          <!--李志佳 2019年12月19日09:29:20 start -->
          <!-- <el-form
            :model="announcementForm"
            :rules="rules"
            ref="announcementForm"
            label-width="120px"
          >
            <el-row>
              <el-col :span="6">
                <el-form-item label="厂用电率">
                  <el-input
                    width="140px"
                    class="inline-input"
                    v-model="announcementForm.useElecRate"
                    disabled
                    placeholder="请输入厂用电率"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="减扣基数电量">
                  <el-input
                    width="140px"
                    class="inline-input"
                    v-model="announcementForm.jkjsdl"
                    disabled
                    placeholder="请输入减扣基数电量"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form> -->
          <!--李志佳 2019年12月19日09:29:29 end -->
        </div>
      </el-tab-pane>
      <el-tab-pane v-else label="发电公司交易结果" name="first">
        <div class="top-box">
          <el-button
            type="primary"
            v-if="isDashboard"
            icon="el-icon-download"
            @click="handleExportFd"
          >导出</el-button>
          <div class="txt-right unit-info">单位：{{unitMap.electricityUnit}}、{{unitMap.priceUnit}}</div>
        </div>
        <el-table
          :key="tableKey"
          :data="listQuery.buyList"
          v-loading.body="listLoading"
          border
          fit
          highlight-current-row
          style="width: 100%"
          height="300px"
        >
          <!-- </el-table-column>-->
          <el-table-column :disabled="isEdit" prop="index" label="序号" align="center" width="70px"></el-table-column>
          <!--2019-12-10 #2965 zhangp 字段调整为禁用框状态 start-->
          <!-- <el-table-column align="cente r" label="交易分类">
            <template slot-scope="scope">
              <span>{{ scope.row.tradingClassifyName }}</span>
            </template>
          </el-table-column>-->
          <el-table-column disabled="prop" label="交易分类" align="center">
            <template slot-scope="scope">
              <el-select style="width:100%;" disabled v-model="scope.row.tradingClassify">
                <el-option
                  v-for="(item, index) in classify"
                  :key="index"
                  :label="item.propName"
                  :value="item.propCode"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <!-- <el-table-column width="140px" align="center" label="类型">
            <template slot-scope="scope">
              <span>{{ scope.row.typeName }}</span>
            </template>
          </el-table-column>-->
          <el-table-column disabled="prop" label="类型" align="center">
            <template slot-scope="scope">
              <el-select style="width:100%;" disabled v-model="scope.row.type">
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
              <el-input disabled v-model="scope.row.fdOrgName"></el-input>
            </template>
          </el-table-column>
          <el-table-column width="140px" align="center" label="机组">
            <template slot-scope="scope">
              <el-input disabled v-model="scope.row.fdOrgJz"></el-input>
            </template>
          </el-table-column>
          <!-- <el-table-column width="140px" align="center" label="产品">
            <template slot-scope="scope">
              <el-input
                  disabled
                  v-model="scope.row.product"
                ></el-input>
            </template>
          </el-table-column>-->
          <el-table-column disabled prop label="产品" align="center">
            <template slot-scope="scope">
              <el-select style="width:100%;" disabled v-model="scope.row.product">
                <el-option
                  v-for="(item, index) in Products"
                  :key="index"
                  :label="item.propName"
                  :value="item.propCode"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column width="140px" align="center" label="出/受让发电企业">
            <template slot-scope="scope">
              <el-input disabled v-model="scope.row.sellOrAssigneeFdOrgName"></el-input>
            </template>
          </el-table-column>
          <el-table-column width="140px" align="center" label="出/受让机组">
            <template slot-scope="scope">
              <el-input disabled v-model="scope.row.sellOrAssigneeJz"></el-input>
            </template>
          </el-table-column>
          <el-table-column width="200px" align="center" label="成交电量">
            <template slot-scope="scope">
              <el-input disabled v-model="scope.row.dealElectricity"></el-input>
            </template>
          </el-table-column>
          <el-table-column width="200px" align="center" label="成交电价">
            <template slot-scope="scope">
              <el-input disabled v-model="scope.row.dealPrice"></el-input>
            </template>
          </el-table-column>
          <!--2019年12月19日09:39:44 李志佳 增加‘降幅’、‘绝对价’、‘标杆电价’、‘批复电价’字段 start -->
          <el-table-column align="center" label="降幅">
            <template slot-scope="scope">
              <el-input disabled v-model="scope.row.decline"></el-input>
            </template>
          </el-table-column>
          <el-table-column align="center" label="绝对价">
            <template slot-scope="scope">
              <el-input
                disabled
                v-model="scope.row.absolutePrice"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column align="center" label="标杆电价">
            <template slot-scope="scope">
              <el-input
                disabled
                v-model="scope.row.benchmarkElectricityPrice"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column align="center" label="批复电价">
            <template slot-scope="scope">
              <el-input
                disabled
                v-model="scope.row.authorizedTariff"
              ></el-input>
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
                disabled
                v-model="scope.row[item.month]"
              ></el-input>
            </template>
          </el-table-column>
           <!--2019年12月19日09:39:44 李志佳 增加‘降幅’、‘绝对价’、‘标杆电价’、‘批复电价’字段 end -->
        </el-table>
        <!--2019-12-10 #2965 zhangp 字段调整为禁用框状态 end-->
        <div v-show="!listLoading" class="pagination-container">
          <el-pagination
            @size-change="handleSizeChange1"
            @current-change="handleCurrentChange1"
            :current-page.sync="buyListQuery.page"
            :page-sizes="[10, 20, 30, 50, 100, 200, 500, 1000]"
            :page-size="buyListQuery.limit"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total1"
          ></el-pagination>
        </div>
        <!-- 李志佳 2019年12月19日09:28:49 start-->
        <!-- <el-form
          :model="announcementForm"
          :rules="rules"
          ref="announcementForm"
          label-width="120px"
        >
          <el-row>
            <el-col :span="6">
              <el-form-item label="厂用电率" prop="useElecRate">
                <el-input
                  width="140px"
                  class="inline-input"
                  v-model="announcementForm.useElecRate"
                  disabled
                  placeholder="请输入厂用电率"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="减扣基数电量" prop="jkjsdl">
                <el-input
                  width="140px"
                  class="inline-input"
                  v-model="announcementForm.jkjsdl"
                  disabled
                  placeholder="请输入减扣基数电量"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form> -->
        <!-- 李志佳 2019年12月19日09:28:41 end-->
      </el-tab-pane>
      <el-tab-pane v-if="this.state" label="售电公司交易结果" name="second">
        <div class="top-box">
          <el-button
            type="primary"
            v-if="isDashboard"
            icon="el-icon-download"
            @click="handleExportSd"
          >导出</el-button>
          <div class="txt-right unit-info">单位：{{unitMap.electricityUnit}}、{{unitMap.priceUnit}}</div>
        </div>
        <el-table
          :key="tableKey"
          :data="listQuery.detailList"
          v-loading.body="listLoading"
          border
          fit
          highlight-current-row
          style="width: 100%"
          height="300px"
        >
          <!-- </el-table-column>-->
          <el-table-column :disabled="isEdit" prop="index" label="序号" align="center" width="70px"></el-table-column>
          <el-table-column align="center" label="单位名称">
            <template slot-scope="scope">
              <el-input disabled v-model="scope.row.sdOrgName"></el-input>
            </template>
          </el-table-column>
          <el-table-column align="center" label="交易路线">
            <template slot-scope="scope">
              <el-input disabled v-model="scope.row.transactionLineName"></el-input>
            </template>
          </el-table-column>
          <el-table-column align="center" label="发电公司">
            <template slot-scope="scope">
              <el-input disabled v-model="scope.row.fdOrgName"></el-input>
            </template>
          </el-table-column>
          <el-table-column width="140px" align="center" label="交易单元">
            <template slot-scope="scope">
              <el-input disabled v-model="scope.row.tradingUnitName"></el-input>
            </template>
          </el-table-column>
          <el-table-column width="200px" align="center" label="成交电量">
            <template slot-scope="scope">
              <el-input disabled v-model="scope.row.dealElectricity"></el-input>
            </template>
          </el-table-column>
          <el-table-column width="200px" align="center" label="成交电价">
            <template slot-scope="scope">
              <el-input disabled v-model="scope.row.dealPrice"></el-input>
            </template>
          </el-table-column>
          <el-table-column  align="center" label="降幅">
              <template slot-scope="scope">
                  <el-input
                    disabled
                    type="number"
                    v-model="scope.row.decline"
                  ></el-input>
              </template>
          </el-table-column>
            <el-table-column  align="center" label="绝对价">
              <template slot-scope="scope">
                  <el-input
                    disabled
                    type="number"
                    v-model="scope.row.absolutePrice"
                  ></el-input>
              </template>
          </el-table-column>
          <el-table-column align="center" label="标杆电价">
              <template slot-scope="scope">
                  <el-input
                    disabled
                    type="number"
                    v-model="scope.row.benchmarkElectricityPrice"
                  ></el-input>
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
                disabled
                v-model="scope.row[item.month]"
              ></el-input>
            </template>
          </el-table-column>
        </el-table>
        <div v-show="!listLoading" class="pagination-container">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="sellListQuery.page"
            :page-sizes="[10, 20, 30, 50, 100, 200, 500, 1000]"
            :page-size="sellListQuery.limit"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane label="市场成交情况" name="third">
        <el-form :model="form" ref="form" label-width="160px">
          <div class="base_power_infor">发电公司市场交易情况</div>
            <!-- #4309 qinhz 2020-06-23 首页-交易结果-市场成交情况页面优化 start -->
            <el-tabs
              class="f-mb10"
              type="border-card"
              v-model="activeName2"
              @tab-click="handleClick"
            >
              <el-tab-pane label="各类型" name="first">
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="市场总规模" prop="tradeScale">
                      <span class="spanText">{{form.tradeScale}}</span>
                      <span>{{unitMap.electricityUnit}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="市场成交电量" prop="fdSccjdl">
                      <span class="spanText">{{form.fdSccjdl}}</span>
                      <span>{{unitMap.electricityUnit}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="其中外来电量" prop="fdQzwldl">
                      <span class="spanText">{{form.fdQzwldl}}</span>
                      <span>{{unitMap.electricityUnit}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="其中公司无法参与电量" prop="fdQzgswfcydl">
                      <span class="spanText">{{countFdQzgswfcydl}}</span>
                      <span>{{unitMap.electricityUnit}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="市场平均电价" prop="fdScpjdj">
                      <span class="spanText">{{form.fdScpjdj}}</span>
                      <span>{{unitMap.priceUnit}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="市场降幅" prop="fdScjf">
                      <span class="spanText">{{form.fdScjf}}</span>
                      <span>{{unitMap.priceUnit}}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="公司可参与规模" prop="fdGskcygm">
                      <span class="spanText">{{form.fdGskcygm}}</span>
                      <span>{{unitMap.electricityUnit}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="公司参与电量" prop="fdGscydl">
                      <span class="spanText">{{form.fdGscydl}}</span>
                      <span>{{unitMap.electricityUnit}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="市场装机" prop="fdGskcyzjdysczj">
                      <span class="spanText">{{form.fdGskcyzjdysczj}}</span>
                      <span>{{unitMap.capacityUnit}}</span>
                    </el-form-item>
                  </el-col>
                  <!-- <el-col :span="8">
                    <el-form-item label="公司电量份额" prop="fdGsdlfe">
                      <el-input disabled class="ddw" v-model="form.fdGsdlfe" placeholder></el-input>
                      <span>%</span>
                    </el-form-item>
                  </el-col>-->
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="公司可参与装机" prop="fdGskcyzj">
                      <span class="spanText">{{form.fdGskcyzj}}</span>
                      <span>{{unitMap.capacityUnit}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="公司参与装机" prop="fdGscyzj">
                      <span class="spanText">{{form.fdGscyzj}}</span>
                      <span>{{unitMap.capacityUnit}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="公司容量份额" prop="fdGsrlfe">
                      <span class="spanText">{{form.fdGsrlfe}}</span>
                      <span>%</span>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!-- <el-form-item label="发电自律情况" prop="fdFdzlqk">
                  <el-input type="textarea" :rows="2" placeholder v-model="form.fdFdzlqk"></el-input>
                </el-form-item>
                <el-form-item label="自律及未自律集团名单" prop="fdZljiwzljtmd">
                  <el-input type="textarea" :rows="2" placeholder v-model="form.fdZljiwzljtmd"></el-input>
                </el-form-item>-->
                <!-- #3409 2019-12-31 张亮三 把发电自律情况、自律及未自律集团名单 改为备注 start-->
                <el-form-item label="备注" prop="fdMemo">
                  <el-input
                    type="textarea"
                    :disabled="this.disState"
                    :autosize="{ minRows: 2, maxRows: 4}"
                    maxlength="500"
                    show-word-limit
                    v-model="form.fdMemo"
                  ></el-input>
                </el-form-item>
              </el-tab-pane>
              <el-tab-pane
                v-for="(item, index) in form.jyMarketEleConditionList"
                :key="index"
                :label="item.text"
                :name="item.name" >
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="市场总规模" prop="fdJyzgm">
                      <span class="spanText">{{item.fdJyzgm}}</span>
                      <span>{{unitMap.electricityUnit}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="市场成交电量" prop="fdSccjdl">
                      <span class="spanText">{{item.fdSccjdl}}</span>
                      <span>{{unitMap.electricityUnit}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="其中外来电量" prop="fdQzwldl">
                      <span class="spanText">{{item.fdQzwldl}}</span>
                      <span>{{unitMap.electricityUnit}}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="其中公司无法参与电量" prop="fdQzgswfcydl">
                      <span class="spanText">{{item.fdQzgswfcydl}}</span>
                      <span>{{unitMap.electricityUnit}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="市场平均电价" prop="fdScpjdj">
                      <span class="spanText">{{item.fdScpjdj}}</span>
                      <span>{{unitMap.priceUnit}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="市场降幅" prop="fdScjf">
                      <span class="spanText">{{item.fdScjf}}</span>
                      <span>{{unitMap.priceUnit}}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="公司可参与规模" prop="fdGskcygm">
                      <span class="spanText">{{item.fdGskcygm}}</span>
                      <span>{{unitMap.electricityUnit}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="公司参与电量" prop="fdGscydl">
                      <span class="spanText">{{item.fdGscydl}}</span>
                      <span>{{unitMap.electricityUnit}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="市场装机" prop="fdGskcyzjdysczj">
                      <span class="spanText">{{item.fdGskcyzjdysczj}}</span>
                      <span>{{unitMap.capacityUnit}}</span>
                    </el-form-item>
                  </el-col>
                  <!-- <el-col :span="8">
                    <el-form-item label="公司电量份额" prop="fdGsdlfe">
                      <el-input disabled class="ddw" v-model="item.fdGsdlfe" placeholder></el-input>
                      <span>%</span>
                    </el-form-item>
                  </el-col>-->
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="公司可参与装机" prop="fdGskcyzj">
                      <span class="spanText">{{item.fdGskcyzj}}</span>
                      <span>{{unitMap.capacityUnit}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="公司参与装机" prop="fdGscyzj">
                      <span class="spanText">{{item.fdGscyzj}}</span>
                      <span>{{unitMap.capacityUnit}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="公司容量份额" prop="fdGsrlfe">
                      <span class="spanText">{{item.fdGsrlfe}}</span>
                      <span>%</span>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-form-item label="备注" prop="fdMemo">
                  <el-input
                    type="textarea"
                    :disabled="disState "
                    :autosize="{ minRows: 2, maxRows: 4}"
                    maxlength="500"
                    show-word-limit
                    v-model="item.fdMemo"
                  ></el-input>
                </el-form-item>
              </el-tab-pane>
            </el-tabs>
            <div class="base_power_infor">发电公司市场交易情况--协商直签大用户</div>
            <el-row>
              <el-col :span="8">
                <el-form-item label="市场总规模">
                  <span class="spanText">{{form.generateEleConsultMarketTotalScale}}</span>
                  <span>{{unitMap.electricityUnit}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="市场成交电量">
                  <span class="spanText">{{form.generateEleConsultMarketDealElectricity}}</span>
                  <span>{{unitMap.electricityUnit}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="公司可参与规模">
                  <span class="spanText">{{form.generateEleConsultCompanyPartScale}}</span>
                  <span>{{unitMap.electricityUnit}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="市场平均电价" prop="generateEleConsultMarketAveragePrice">
                  <span class="spanText">{{form.generateEleConsultMarketAveragePrice}}</span>
                  <span>{{unitMap.priceUnit}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="市场降幅" prop="generateEleConsultMarketDecreasePrice">
                  <span class="spanText">{{form.generateEleConsultMarketDecreasePrice}}</span>
                  <span>{{unitMap.priceUnit}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="备注">
              <el-input
                type="textarea"
                :disabled="this.disState"
                :autosize="{ minRows: 2, maxRows: 4}"
                maxlength="500"
                show-word-limit
                v-model="form.generateEleConsultMemo"
              ></el-input>
            </el-form-item>

            <div class="base_power_infor">发电公司市场交易情况--与售电公司协商对接</div>
            <el-row>
              <el-col :span="8">
                <el-form-item label="市场总规模">
                  <span class="spanText">{{form.generateEleConnectionMarketTotalScale}}</span>
                  <span>{{unitMap.electricityUnit}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="市场成交电量">
                  <span class="spanText">{{form.generateEleConnectionMarketDealElectricity}}</span>
                  <span>{{unitMap.electricityUnit}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="公司可参与规模">
                  <span class="spanText">{{form.generateEleConnectionCompanyPartScale}}</span>
                  <span>{{unitMap.electricityUnit}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="市场平均电价" prop="generateEleConnectionMarketAveragePrice">
                  <span class="spanText">{{form.generateEleConnectionMarketAveragePrice}}</span>
                  <span>{{unitMap.priceUnit}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="市场降幅" prop="generateEleConnectionMarketDecreasePrice">
                  <span class="spanText">{{form.generateEleConnectionMarketDecreasePrice}}</span>
                  <span>{{unitMap.priceUnit}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="备注">
              <el-input
                type="textarea"
                :disabled="this.disState"
                :autosize="{ minRows: 2, maxRows: 4}"
                maxlength="500"
                show-word-limit
                v-model="form.generateEleConnectionMemo"
              ></el-input>
            </el-form-item>
            <div class="base_power_infor">售电公司市场交易情况</div>
            <el-row>
              <el-col :span="8">
                <el-form-item label="可参与直接交易规模" prop="sdKzjcyjygm">
                  <span class="spanText">{{form.sdKzjcyjygm}}</span>
                  <span>{{unitMap.electricityUnit}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="购电量" prop="sdSdgsYgdl">
                  <span class="spanText">{{form.sdSdgsYgdl}}</span>
                  <span>{{unitMap.electricityUnit}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="售电价" prop="sdPjsdj">
                  <span class="spanText">{{form.sdPjsdj}}</span>
                  <span>{{unitMap.priceUnit}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="售电降幅" prop="sdSdcjf">
                  <span class="spanText">{{form.sdSdcjf}}</span>
                  <span>{{unitMap.priceUnit}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="购电价" prop="sdPjgdj">
                  <span class="spanText">{{form.sdPjgdj}}</span>
                  <span>{{unitMap.priceUnit}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="购电降幅" prop="sdGdcSwcJf">
                  <span class="spanText">{{form.sdGdcSwcJf}}</span>
                  <span>{{unitMap.priceUnit}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="购销价差" prop="sdGxjc">
                  <span class="spanText">{{form.sdGxjc}}</span>
                  <span>{{unitMap.priceUnit}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="售电公司获价差分成比例" prop="sdSdgshjcfcbl">
                  <span class="spanText">{{form.sdSdgshjcfcbl}}</span>
                  <span>%</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="考虑分成后售电价" prop="sdGxjc">
                  <span class="spanText">{{form.sdKlfchsdj}}</span>
                  <span>{{unitMap.priceUnit}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="考虑分成后售电降幅" prop="sdGxjc">
                  <span class="spanText">{{form.sdKlfchsdjf}}</span>
                  <span>{{unitMap.priceUnit}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="考虑分成后购销价差" prop="sdGxjc">
                  <span class="spanText">{{form.sdKlfchgxjc}}</span>
                  <span>{{unitMap.priceUnit}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <div class="headerFont">发电背景售电公司</div>
            <el-row>
              <el-col :span="8">
                <el-form-item label="购电量" prop="sdFdbjsdgsdlgm">
                  <span class="spanText">{{form.sdFdbjsdgsdlgm}}</span>
                  <span>{{unitMap.electricityUnit}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="占售电份额" prop="sdZsdfe">
                  <span class="spanText">{{form.sdZsdfe}}</span>
                  <span>%</span>
                </el-form-item>
              </el-col>
              <!-- <el-col :span="8">
                <el-form-item label="用户侧降幅" prop="sdYhcjf">
                  <el-input
                    class="ddw"
                    :disabled="this.disState"
                    v-model="form.sdYhcjf"
                    placeholder
                  ></el-input>
                  <span>{{unitMap.priceUnit}}</span>
                </el-form-item>
              </el-col>-->
            </el-row>
            <!-- <el-form-item label="自律情况" prop="sdZlqk">
              <el-input type="textarea" :rows="2" placeholder v-model="form.sdZlqk"></el-input>
            </el-form-item>-->
            <!--2019-11-28 #2866 张朋 添加备注字段 -->
            <el-form-item label="备注">
              <el-input
                :disabled="this.disState"
                type="textarea"
                v-model="form.memo"
                :autosize="{ minRows: 2, maxRows: 4}"
                maxlength="500"
                show-word-limit
                placeholder="请输入备注"
              ></el-input>
            </el-form-item>
        <!-- <el-form :model="form" :rules="rules" ref="form" label-width="180px">
          <div class="base_power_infor">发电公司市场交易情况</div>
          <el-row> -->
            <!--2019-12-9 #2965 zhangp 添加市场总规模 -->
            <!-- <el-col :span="8">
              <el-form-item label="市场总规模" prop="tradeScale">
                <el-input
                  :disabled="this.disState"
                  class="ddw"
                  v-model="form.tradeScale"
                  placeho
                  lder
                ></el-input>
                <span>{{unitMap.electricityUnit}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8"> -->
              <!--2019-12-9 #2965 zhango 市场成交电量 -->
              <!-- <el-form-item label="市场成交电量" prop="fdSccjdl">
                <el-input
                  class="ddw"
                  type="number"
                  :disabled="this.disState"
                  v-model="form.fdSccjdl"
                  placeholder
                ></el-input>
                <span>{{unitMap.electricityUnit}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="其中外来电量">
                <el-input class="ddw" :disabled="this.disState" v-model="form.fdQzwldl" placeholder></el-input>
                <span>{{unitMap.electricityUnit}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="其中公司无法参与电量">
                <el-input
                  class="ddw"
                  :disabled="this.disState"
                  v-model="form.fdQzgswfcydl"
                  placeholder
                ></el-input>
                <span>{{unitMap.electricityUnit}}</span>
              </el-form-item>
            </el-col> -->
            <!--2019-12-9 #2965 zhangp 添加市场平均电价字段 -->
            <!-- <el-col :span="8">
              <el-form-item label="市场平均电价">
                <el-input :disabled="this.disState" v-model="form.fdScpjdj" placeholder class="ddw"></el-input>
                <span>{{unitMap.priceUnit}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="市场降幅">
                <el-input class="ddw" :disabled="this.disState" v-model="form.fdScjf" placeholder></el-input>
                <span>{{unitMap.priceUnit}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="公司可参与规模">
                <el-input
                  class="ddw"
                  :disabled="this.disState"
                  v-model="form.fdGskcygm"
                  placeholder
                ></el-input>
                <span>{{unitMap.electricityUnit}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="公司参与电量">
                <el-input class="ddw" :disabled="this.disState" v-model="form.fdGscydl" placeholder></el-input>
                <span>{{unitMap.electricityUnit}}</span>
              </el-form-item>
            </el-col> -->
            <!--2019-12-9 #2965 zhangp 隐藏公司电量份额 -->
            <!-- <el-col :span="8">
              <el-form-item label="公司电量份额">
                <el-input disabled class="ddw" v-model="form.fdGsdlfe" placeholder></el-input>
                <span>%</span>
              </el-form-item>
            </el-col>-->
            <!-- <el-col :span="8">
              <el-form-item label="公司可参与装机">
                <el-input
                  class="ddw"
                  :disabled="this.disState"
                  v-model="form.fdGskcyzj"
                  placeholder
                ></el-input>
                <span>{{unitMap.capacityUnit}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="公司参与装机">
                <el-input class="ddw" :disabled="this.disState" v-model="form.fdGscyzj" placeholder></el-input>
                <span>{{unitMap.capacityUnit}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="公司容量份额">
                <el-input disabled class="ddw" v-model="form.fdGsrlfe" placeholder></el-input>
                <span>%</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="对应市场装机" prop="fdGskcyzjdysczj">
                <el-input
                  type="number"
                  :disabled="this.disState"
                  class="ddw"
                  v-model="form.fdGskcyzjdysczj"
                  placeholder
                ></el-input>
                <span>{{unitMap.electricityUnit}}</span>
              </el-form-item>
            </el-col>
          </el-row> -->
          <!--2020-02-03  #3669 zhangp 添加内容字段 start -->
          <!-- <el-form-item label="发电自律情况">
            <el-input type="textarea" :rows="2" placeholder v-model="form.fdFdzlqk"></el-input>
          </el-form-item>
          <el-form-item label="自律及未自律集团名单">
            <el-input type="textarea" :rows="2" placeholder v-model="form.fdZljiwzljtmd"></el-input>
          </el-form-item> -->
           <!-- <el-form-item label="备注">
            <el-input type="textarea" :disabled="true" :rows="2" placeholder v-model="form.fdMemo"></el-input>
          </el-form-item> -->
          <!--2020-02-03 #3669 zhangpeng 添加内容  -->
          <!-- <div class="base_power_infor">发电公司市场交易情况-协商直签大用户</div>
          <el-row>
            <el-col :span="8">
              <el-form-item label="市场总规模" prop="tradeScale">
                <el-input
                  :disabled="true"
                  class="ddw"
                  v-model="form.generateEleConsultMarketTotalScale"
                  placeho
                  lder
                ></el-input>
                <span>{{unitMap.electricityUnit}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="市场成交电量" prop="fdSccjdl">
                <el-input
                  class="ddw"
                  type="number"
                  :disabled="true"
                  v-model="form.generateEleConsultMarketDealElectricity"
                  placeholder
                ></el-input>
                <span>{{unitMap.electricityUnit}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
               <el-form-item label="公司可参与规模">
                <el-input
                  class="ddw"
                  :disabled="true"
                  v-model="form.generateEleConsultCompanyPartScale"
                  placeholder
                ></el-input>
                <span>{{unitMap.electricityUnit}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
               <el-form-item label="市场平均电价">
                <el-input :disabled="true" v-model="form.generateEleConsultMarketAveragePrice" placeholder class="ddw"></el-input>
                <span>{{unitMap.priceUnit}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
               <el-form-item label="市场降幅">
                <el-input class="ddw" :disabled="true" v-model="form.generateEleConsultMarketDecreasePrice" placeholder></el-input>
                <span>{{unitMap.priceUnit}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
             <el-form-item label="备注">
               <el-input type="textarea" :rows="2" :disabled="true" placeholder v-model="form.generateEleConsultMemo"></el-input>
          </el-form-item>
            </el-col>
          </el-row>
          <div class="base_power_infor">发电公司市场交易情况-与售电公司协商对接</div>
          <el-row>
            <el-col :span="8">
              <el-form-item label="市场总规模" prop="tradeScale">
                <el-input
                  :disabled="true"
                  class="ddw"
                  v-model="form.generateEleConnectionMarketTotalScale"
                  placeho
                  lder
                ></el-input>
                <span>{{unitMap.electricityUnit}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="市场成交电量" prop="fdSccjdl">
                <el-input
                  class="ddw"
                  type="number"
                  :disabled="true"
                  v-model="form.generateEleConnectionMarketDealElectricity"
                  placeholder
                ></el-input>
                <span>{{unitMap.electricityUnit}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
               <el-form-item label="公司可参与规模">
                <el-input
                  class="ddw"
                  :disabled="true"
                  v-model="form.generateEleConnectionCompanyPartScale"
                  placeholder
                ></el-input>
                <span>{{unitMap.electricityUnit}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
               <el-form-item label="市场平均电价">
                <el-input :disabled="true" v-model="form.generateEleConnectionMarketAveragePrice" placeholder class="ddw"></el-input>
                <span>{{unitMap.priceUnit}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
               <el-form-item label="市场降幅">
                <el-input class="ddw" :disabled="true" v-model="form.generateEleConnectionMarketDecreasePrice" placeholder></el-input>
                <span>{{unitMap.priceUnit}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
             <el-form-item label="备注">
               <el-input type="textarea" :rows="2" :disabled="true" placeholder v-model="form.generateEleConnectionMemo"></el-input>
          </el-form-item>
            </el-col>
          </el-row> -->
            <!--2020-02-03  #3669 zhangp 添加内容字段 end -->
          <!-- <div class="base_power_infor">售电公司市场交易情况</div>
          <el-row>
            <el-col :span="8"> -->
              <!--2019-11-27 #2866 张朋 新增可参与直接交易规模字段 -->
              <!-- <el-form-item label="可参与直接交易规模" prop="sdKzjcyjygm">
                <el-input
                  class="ddw"
                  :disabled="this.disState"
                  v-model="form.sdKzjcyjygm"
                  placeholder
                ></el-input>
                <span>{{unitMap.electricityUnit}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8"> -->
              <!--2019-11-25 #2818 张朋 售电公司应购电量改为购电量 -->
              <!-- <el-form-item label="购电量" prop="sdSdgsYgdl">
                <el-input
                  class="ddw"
                  :disabled="this.disState"
                  v-model="form.sdSdgsYgdl"
                  placeholder
                ></el-input>
                <span>{{unitMap.electricityUnit}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8"> -->
              <!--2019-11-25 #2818 张朋 平均售电价改为售电价 -->
              <!-- <el-form-item label="售电价" prop="sdPjgdj">
                <el-input :disabled="this.disState" v-model="form.sdPjgdj" placeholder class="ddw"></el-input>
                <span>{{unitMap.priceUnit}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8"> -->
              <!--2019-11-25 #2818 张朋 售电侧降幅改为售电降幅 -->
              <!-- <el-form-item label="售电降幅" prop="sdSdcjf">
                <el-input class="ddw" :disabled="this.disState" v-model="form.sdSdcjf" placeholder></el-input>
                <span>{{unitMap.priceUnit}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8"> -->
              <!--2019-11-25 #2818 张朋 平均购电价改为购电价 -->
              <!-- <el-form-item label="购电价" prop="sdPjsdj">
                <el-input :disabled="this.disState" v-model="form.sdPjsdj" placeholder class="ddw"></el-input>
                <span>{{unitMap.priceUnit}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8"> -->
              <!--2019-11-25 #2818 张朋 购电侧（上网侧）降幅改为购电降幅 -->
              <!-- <el-form-item label="购电降幅" prop="sdGdcSwcJf">
                <el-input
                  class="ddw"
                  :disabled="this.disState"
                  v-model="form.sdGdcSwcJf"
                  placeholder
                ></el-input>
                <span>{{unitMap.priceUnit}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="购销价差" prop="sdGxjc">
                <el-input class="ddw" disabled v-model="form.sdGxjc" placeholder></el-input>
                <span>{{unitMap.priceUnit}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8"> -->
              <!--2019-11-27  #2866 张朋 添加售电公司获价差分成比例字段-->
              <!-- <el-form-item label="售电公司获价差分成比例" prop="sdSdgshjcfcbl">
                <el-input
                  class="ddw"
                  :disabled="this.disState"
                  v-model="form.sdSdgshjcfcbl"
                  placeholder
                ></el-input>
                <span>%</span>
              </el-form-item>
            </el-col>
            <el-col :span="8"> -->
              <!--2019-11-27 #2866 张朋 添加考虑分成后售电价字段 -->
              <!-- <el-form-item label="考虑分成后售电价" prop="sdGxjc">
                <el-input class="ddw" disabled v-model="form.sdKlfchsdj" placeholder></el-input>
                <span>{{unitMap.priceUnit}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8"> -->
              <!--2019-11-28 #2866 张朋 新增考虑分成后售电降幅字段 -->
              <!-- <el-form-item label="考虑分成后售电降幅" prop="sdGxjc">
                <el-input class="ddw" disabled v-model="form.sdKlfchsdjf" placeholder></el-input>
                <span>{{unitMap.priceUnit}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8"> -->
              <!--2019-11-28 #2866 张朋 新增考虑分成后购销价差字段  -->
              <!-- <el-form-item label="考虑分成后购销价差" prop="sdGxjc">
                <el-input class="ddw" disabled v-model="form.sdKlfchgxjc" placeholder></el-input>
                <span>{{unitMap.priceUnit}}</span>
              </el-form-item>
            </el-col>
          </el-row> -->
          <!--2019-12-2 #2866 张朋 显示信息调整 -->
          <!-- <div class="headerFont">发电背景售电公司</div>
          <el-row>
            <el-col :span="8"> -->
              <!--2019-11-25 #2818 张朋 发电背景售电公司代理规模改为发电背景售电公司购电量 -->
              <!-- <el-form-item label="购电量" prop="sdFdbjsdgsdlgm">
                <el-input
                  class="ddw"
                  :disabled="this.disState"
                  v-model="form.sdFdbjsdgsdlgm"
                  placeholder
                ></el-input>
                <span>{{unitMap.electricityUnit}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="占售电份额" prop="sdZsdfe">
                <el-input disabled class="ddw" v-model="form.sdZsdfe" placeholder></el-input>
                <span>%</span>
              </el-form-item>
            </el-col> -->
            <!-- <el-col :span="8">
                <el-form-item label="用户侧降幅" prop="sdYhcjf">
                  <el-input
                    class="ddw"
                    :disabled="this.disState"
                    v-model="form.sdYhcjf"
                    placeholder
                  ></el-input>
                  <span>{{unitMap.priceUnit}}</span>
                </el-form-item>
            </el-col>-->
          <!-- </el-row> -->
          <!-- <el-form-item label="自律情况" prop="sdZlqk">
              <el-input type="textarea" :rows="2" placeholder v-model="form.sdZlqk"></el-input>
          </el-form-item>-->
          <!--2019-11-28 #2866 张朋 添加备注字段 -->
          <!-- <el-form-item label="备注">
            <el-input
              type="textarea"
              :disabled="true"
              v-model="form.memo"
              :autosize="{ minRows: 2, maxRows: 4}"
              maxlength="500"
              show-word-limit
              placeholder="请输入备注"
            ></el-input>
          </el-form-item>
        </el-form> -->

        
        <!-- #4309 qinhz 2020-06-23 首页-交易结果-市场成交情况页面优化  end -->
      </el-form>
      </el-tab-pane>

    </el-tabs>

    <!-- </el-form> -->

    <!-- <div slot="footer" class="dialog-footer f-mt10" align="center">
      <el-button type="danger" @click="cancel">关 闭</el-button>
    </div>-->
  </div>
</template>
<script>
import {
  resultPage,
  resultList,
  getDetailsPageList,
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
  customerFuzzyQuery,
  getTradingUnitAll,
  getValueByOrgIdAndCode,
  getMonths,
  getResultBaseData //获取厂用电率，减扣基数电量数据
} from "@common/api/business/jyTransactionNotice/index"; 
import { getSCDetails,exportObjJyjg,getConditionByNoticeId } from "@common/api/business/jysAreaNotice/index";
//2019-12-10 #2965 zhangp 引用获取下拉框
import { getSelectList } from "@common/api/base";
//#3010 2019-12-06 张亮三 引入请求首页计量单位方法getHomeUnit
import { getHomeUnit } from "@common/api/dashboard/index";
import {} from "@common/api/admin/group/index";
import { getUnitMap, getUnitMapByModelCode } from "@common/utils/index";
import { mapGetters } from "vuex";
export default {
  name: "result",
  props: {
    jyTradingResultsId: {
      type: String
    },
    // jyTradingResultsInfo: {
    //   type: Object
    // },
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
    }
    // dialogStatus: {
    //   type: String
    // }
  },
  data() {
    return {
      isDashboard:false, //#3215 2019-12-23 张亮三 增加判断是否首页
      unitMap: {},
      rules: {},
      disState: true,
      mounthList: [],
      jydyOptions: [],
      testList:this.periodOptions,
      state: "",
      form: {
        //#4309 qinhz 2020-06-23 首页-交易结果-市场成交情况页面优化
        jyMarketEleConditionList: [
          {
            text: "煤机",
            unitType: "mj",
            name: "second",
            fdJyzgm: "", //发电公司市场交易情况-市场总规模
            fdGscydl: "", //发电公司市场交易情况-公司参与电量
            fdGskcyzjdysczj: "", //发电公司市场交易情况-市场装机
            fdGscyzj: "", //发电公司市场交易情况-公司参与装机
            fdGskcygm: "", //发电公司市场交易情况-公司可参与规模
            fdGskcyzj: "", //发电公司市场交易情况-公司可参与装机
            fdQzgswfcydl: "", //发电公司市场交易情况-其中公司无法参与电量
            fdQzwldl: "", //发电公司市场交易情况-其中外来电量
            fdScjf: "", //发电公司市场交易情况-市场降幅
            fdMemo: "", //发电公司市场交易情况-备注
            fdSccjdl: "", //发电公司市场交易情况-市场成交电量
            fdScpjdj: "" //发电公司市场交易情况-市场平均电价
          },
          {
            text: "燃油",
            unitType: "ry",
            name: "third",
            fdJyzgm: "", //发电公司市场交易情况-市场总规模
            fdGscydl: "", //发电公司市场交易情况-公司参与电量
            fdGskcyzjdysczj: "", //发电公司市场交易情况-市场装机
            fdGscyzj: "", //发电公司市场交易情况-公司参与装机
            fdGskcygm: "", //发电公司市场交易情况-公司可参与规模
            fdGskcyzj: "", //发电公司市场交易情况-公司可参与装机
            fdQzgswfcydl: "", //发电公司市场交易情况-其中公司无法参与电量
            fdQzwldl: "", //发电公司市场交易情况-其中外来电量
            fdScjf: "", //发电公司市场交易情况-市场降幅
            fdMemo: "", //发电公司市场交易情况-备注
            fdSccjdl: "", //发电公司市场交易情况-市场成交电量
            fdScpjdj: "" //发电公司市场交易情况-市场平均电价
          },
          {
            text: "燃气",
            unitType: "rq",
            name: "fourth",
            fdJyzgm: "", //发电公司市场交易情况-市场总规模
            fdGscydl: "", //发电公司市场交易情况-公司参与电量
            fdGskcyzjdysczj: "", //发电公司市场交易情况-市场装机
            fdGscyzj: "", //发电公司市场交易情况-公司参与装机
            fdGskcygm: "", //发电公司市场交易情况-公司可参与规模
            fdGskcyzj: "", //发电公司市场交易情况-公司可参与装机
            fdQzgswfcydl: "", //发电公司市场交易情况-其中公司无法参与电量
            fdQzwldl: "", //发电公司市场交易情况-其中外来电量
            fdScjf: "", //发电公司市场交易情况-市场降幅
            fdMemo: "", //发电公司市场交易情况-备注
            fdSccjdl: "", //发电公司市场交易情况-市场成交电量
            fdScpjdj: "" //发电公司市场交易情况-市场平均电价
          },

          {
            text: "核电",
            unitType: "hd",
            name: "fifth",
            fdJyzgm: "", //发电公司市场交易情况-市场总规模
            fdGscydl: "", //发电公司市场交易情况-公司参与电量
            fdGskcyzjdysczj: "", //发电公司市场交易情况-市场装机
            fdGscyzj: "", //发电公司市场交易情况-公司参与装机
            fdGskcygm: "", //发电公司市场交易情况-公司可参与规模
            fdGskcyzj: "", //发电公司市场交易情况-公司可参与装机
            fdQzgswfcydl: "", //发电公司市场交易情况-其中公司无法参与电量
            fdQzwldl: "", //发电公司市场交易情况-其中外来电量
            fdScjf: "", //发电公司市场交易情况-市场降幅
            fdMemo: "", //发电公司市场交易情况-备注
            fdSccjdl: "", //发电公司市场交易情况-市场成交电量
            fdScpjdj: "" //发电公司市场交易情况-市场平均电价
          },
          {
            text: "水电",
            unitType: "sd",
            name: "sixth",
            fdJyzgm: "", //发电公司市场交易情况-市场总规模
            fdGscydl: "", //发电公司市场交易情况-公司参与电量
            fdGskcyzjdysczj: "", //发电公司市场交易情况-市场装机
            fdGscyzj: "", //发电公司市场交易情况-公司参与装机
            fdGskcygm: "", //发电公司市场交易情况-公司可参与规模
            fdGskcyzj: "", //发电公司市场交易情况-公司可参与装机
            fdQzgswfcydl: "", //发电公司市场交易情况-其中公司无法参与电量
            fdQzwldl: "", //发电公司市场交易情况-其中外来电量
            fdScjf: "", //发电公司市场交易情况-市场降幅
            fdMemo: "", //发电公司市场交易情况-备注
            fdSccjdl: "", //发电公司市场交易情况-市场成交电量
            fdScpjdj: "" //发电公司市场交易情况-市场平均电价
          },
          {
            text: "风电",
            unitType: "fd",
            name: "seventh",
            fdJyzgm: "", //发电公司市场交易情况-市场总规模
            fdGscydl: "", //发电公司市场交易情况-公司参与电量
            fdGskcyzjdysczj: "", //发电公司市场交易情况-市场装机
            fdGscyzj: "", //发电公司市场交易情况-公司参与装机
            fdGskcygm: "", //发电公司市场交易情况-公司可参与规模
            fdGskcyzj: "", //发电公司市场交易情况-公司可参与装机
            fdQzgswfcydl: "", //发电公司市场交易情况-其中公司无法参与电量
            fdQzwldl: "", //发电公司市场交易情况-其中外来电量
            fdScjf: "", //发电公司市场交易情况-市场降幅
            fdMemo: "", //发电公司市场交易情况-备注
            fdSccjdl: "", //发电公司市场交易情况-市场成交电量
            fdScpjdj: "" //发电公司市场交易情况-市场平均电价
          },
          {
            text: "光伏",
            unitType: "gf",
            name: "eighth",
            fdJyzgm: "", //发电公司市场交易情况-市场总规模
            fdGscydl: "", //发电公司市场交易情况-公司参与电量
            fdGskcyzjdysczj: "", //发电公司市场交易情况-市场装机
            fdGscyzj: "", //发电公司市场交易情况-公司参与装机
            fdGskcygm: "", //发电公司市场交易情况-公司可参与规模
            fdGskcyzj: "", //发电公司市场交易情况-公司可参与装机
            fdQzgswfcydl: "", //发电公司市场交易情况-其中公司无法参与电量
            fdQzwldl: "", //发电公司市场交易情况-其中外来电量
            fdScjf: "", //发电公司市场交易情况-市场降幅
            fdMemo: "", //发电公司市场交易情况-备注
            fdSccjdl: "", //发电公司市场交易情况-市场成交电量
            fdScpjdj: "" //发电公司市场交易情况-市场平均电价
          },
          {
            text: "其他",
            unitType: "qt",
            name: "nineth",
            fdJyzgm: "", //发电公司市场交易情况-市场总规模
            fdGscydl: "", //发电公司市场交易情况-公司参与电量
            fdGskcyzjdysczj: "", //发电公司市场交易情况-市场装机
            fdGscyzj: "", //发电公司市场交易情况-公司参与装机
            fdGskcygm: "", //发电公司市场交易情况-公司可参与规模
            fdGskcyzj: "", //发电公司市场交易情况-公司可参与装机

            fdQzgswfcydl: "", //发电公司市场交易情况-其中公司无法参与电量
            fdQzwldl: "", //发电公司市场交易情况-其中外来电量
            fdScjf: "", //发电公司市场交易情况-市场降幅
            fdMemo: "", //发电公司市场交易情况-备注
            fdSccjdl: "", //发电公司市场交易情况-市场成交电量
            fdScpjdj: "" //发电公司市场交易情况-市场平均电价
          }
        ],
        // conditionId: "", //市场成交情况id
        //#3896 gaoaining 2020-04-15 form表单添加数组 start
        //#3896 gaoaining 2020-04-15 form表单添加数组 end
        tradeScale: "", //交易总规模
        releaseDate: "",
        fdFdzlqk: "", //发电公司市场交易情况-发电自律情况
        fdGscydl: "", //发电公司市场交易情况-公司参与电量
        // fdGsdlfe: "", //发电公司市场交易情况-公司电量份额
        fdGskcygm: "", //发电公司市场交易情况-公司可参与规模
        fdGskcyzj: "", //发电公司市场交易情况-公司可参与装机
        fdGsrlfe: "", //发电公司市场交易情况-公司容量份额
        fdJyzgm: "", //发电公司市场交易情况-交易总规模
        fdQzgswfcydl: "", //发电公司市场交易情况-其中公司无法参与电量
        fdSccjdl: "", //市场成交电量
        fdQzwldl: "", //发电公司市场交易情况-其中外来电量
        fdScjf: "", //发电公司市场交易情况-市场降幅
        fdMemo: "", //#3409 发电公司市场交易情况-备注
        fdScpjdj: "", //发电公司市场交易情况-市场平均电价
        fdZljiwzljtmd: "", //发电公司市场交易情况-自律及未自律集团名单
        fdGscyzj: "", //发电公司市场交易情况-公司参与装机
        noticeId: "", //交易公告id
        noticeName: "", //交易序列名称
        fdGskcyzjdysczj: "", //公司可参与装机对应市场装机
        quotationMethod: "", //报价方式，来源为维度数据，保存value为code值。
        quotationMethodName: "", //报价方式名称
        sdFdbjsdgsdlgm: "", //售电公司市场交易情况-发电背景售电公司代理规模
        sdGdcSwcJf: "", //售电公司市场交易情况-购电侧（上网侧）降幅
        sdGxjc: "", //售电公司市场交易情况-购销价差
        sdPjgdj: "", //售电公司市场交易情况-平均购电价
        sdPjsdj: "", //售电公司市场交易情况-平均售电价
        sdSdcjf: "", //售电公司市场交易情况-售电侧降幅
        sdSdgsYgdl: "", //售电公司市场交易情况-售电公司应购电量
        sdYhcjf: "", //售电公司市场交易情况-用户侧降幅
        sdZlqk: "", //售电公司市场交易情况-自律情况
        sdZsdfe: "", //售电公司市场交易情况-占售电份额
        status: "", //提交保存状态：已保存：11，已提交：3
        statusName: "", //提交保存状态：已保存：11，已提交：3
        tradeCenterId: "", //交易中心id
        tradeCenterName: "", //交易中心名称
        tradeCycleCode: "", //交易周期（jyzq01 年、jyzq02 季度 、jyzq03 月、日）
        tradeCycleName: "", //交易周期（年、月、日）
        tradeIssure: "", //交易期次
        tradeVarietyCode: "", //交易品种编码（省内、跨省、发电权）
        tradeVarietyName: "", //交易品种名称（省内、跨省、发电权）
        tradeWayCode: "", //交易方式编码（jyfs01 双边协商、jyfs02 集中竞价、jyfs03 挂牌）
        tradeWayName: "", //交易方式名称（双边协商、集中竞价、挂牌）
        sdKzjcyjygm: "", //可直接参与交易规模
        sdSdgshjcfcbl: "", //售电公司获价差分成比例
        sdKlfchsdj: "", //考虑分成售电价
        sdKlfchsdjf: "", //考虑分成后售电降幅
        sdKlfchgxjc: "", //考虑分成后购销价差
        memo: "", //备注
        generateEleConsultMarketTotalScale: "", //发电公司市场交易情况--协商直签大用户--市场总规模
        generateEleConsultMarketDealElectricity: "", //发电公司市场交易情况--协商直签大用户--市场成交电量
        generateEleConsultCompanyPartScale: "", //发电公司市场交易情况--协商直签大用户--公司可参与规模
        generateEleConsultMarketAveragePrice: "", //发电公司市场交易情况--协商直签大用户--市场平均电价
        generateEleConsultMarketDecreasePrice: "", //发电公司市场交易情况--协商直签大用户--市场降幅
        generateEleConsultMemo: "", //发电公司市场交易情况--协商直签大用户--备注
        generateEleConnectionMarketTotalScale: "", //发电公司市场交易情况--与售电公协商对接--市场总规模
        generateEleConnectionMarketDealElectricity: "", //发电公司市场交易情况--与售电公协商对接--市场成交电量
        generateEleConnectionCompanyPartScale: "", //发电公司市场交易情况--与售电公协商对接--公司可参与规模
        generateEleConnectionMarketAveragePrice: "", //发电公司市场交易情况--与售电公协商对接--市场平均电价
        generateEleConnectionMarketDecreasePrice: "", //发电公司市场交易情况--与售电公协商对接--市场降幅
        generateEleConnectionMemo: "" //发电公司市场交易情况--与售电公协商对接--备注
      },
      // form: {
      //   fdMemo:"", //发电公司市场交易情况--备注
      //   generateEleConsultMarketTotalScale: 0, //发电公司市场交易情况--协商直签大用户--市场总规模
      //   generateEleConsultMarketDealElectricity: 0,//发电公司市场交易情况--协商直签大用户--市场成交电量
      //   generateEleConsultCompanyPartScale: 0,//发电公司市场交易情况--协商直签大用户--公司可参与规模
      //   generateEleConsultMarketAveragePrice: 0,//发电公司市场交易情况--协商直签大用户--市场平均电价
      //   generateEleConsultMarketDecreasePrice: 0,// 发电公司市场交易情况--协商直签大用户--市场降幅
      //   generateEleConsultMemo:"", //发电公司市场交易情况--协商直签大用户--备注
      //   generateEleConnectionMarketTotalScale: 0,//发电公司市场交易情况--与售电公司协商对接--市场总规模
      //   generateEleConnectionMarketDealElectricity: 0,//发电公司市场交易情况--与售电公司协商对接----市场成交电量
      //   generateEleConnectionCompanyParScale: 0,//发电公司市场交易情况--与售电公司协商对接--公司可参与规
      //   generateEleConnectionMarketAveragePrice: 0,//发电公司市场交易情况--与售电公司协商对接--市场平均电价
      //   generateEleConnectionMarketDecreasePrice: 0, //发电公司市场交易情况--与售电公司协商对接--市场降幅
      //   generateEleConnectionMemo: 0,//发电公司市场交易情况--与售电公司协商对接--备注
      //   conditionId: "", //市场成交情况id
      //   crtTime: "", //创建时间
      //   crtUser: "", //创建人
      //   fdFdzlqk: "", //发电公司市场交易情况-发电自律情况
      //   fdGscydl: 0, //发电公司市场交易情况-公司参与电量
      //   fdGsdlfe: 0, //发电公司市场交易情况-公司电量份额
      //   fdGskcygm: 0, //发电公司市场交易情况-公司可参与规模
      //   fdGskcyzj: 0, //发电公司市场交易情况-公司可参与装机
      //   fdGsrlfe: 0, //发电公司市场交易情况-公司容量份额
      //   fdJyzgm: "", //发电公司市场交易情况-市场成交电量
      //   fdQzgswfcydl: "", //发电公司市场交易情况-其中公司无法参与电量
      //   fdQzwldl: "", //发电公司市场交易情况-其中外来电量
      //   fdScjf: "", //发电公司市场交易情况-市场降幅
      //   fdScpjdj: "", //发电公司市场交易情况-市场平均电价
      //   fdZljiwzljtmd: "", //发电公司市场交易情况-自律及未自律集团名单
      //   isdelete: "", //是否已删除，0未删除 1已删除
      //   fdGscyzj: 0, //发电公司市场交易情况-公司参与装机
      //   noticeId: "", //交易公告id
      //   jyxlmc: "", //交易序列名称
      //   quotationMethod: "", //报价方式，来源为维度数据，保存value为code值。
      //   quotationMethodName: "", //报价方式名称
      //   sdFdbjsdgsdlgm: 0, //售电公司市场交易情况-发电背景售电公司代理规模
      //   sdGdcSwcJf: 0, //售电公司市场交易情况-购电侧（上网侧）降幅
      //   sdGxjc: 0, //售电公司市场交易情况-购销价差
      //   sdPjgdj: "", //售电公司市场交易情况-平均购电价
      //   sdPjsdj: 0, //售电公司市场交易情况-平均售电价
      //   sdSdcjf: "", //售电公司市场交易情况-售电侧降幅
      //   sdSdgsYgdl: 0, //售电公司市场交易情况-售电公司应购电量
      //   sdYhcjf: "", //售电公司市场交易情况-用户侧降幅
      //   sdZlqk: "", //售电公司市场交易情况-自律情况
      //   sdZsdfe: 0, //售电公司市场交易情况-占售电份额
      //   status: "", //提交保存状态：已保存：11，已提交：3
      //   statusName: "", //提交保存状态：已保存：11，已提交：3
      //   tradeCenterId: "", //交易中心id
      //   tradeCenterName: "", //交易中心名称
      //   tradeCycleCode: "", //交易周期（jyzq01 年、jyzq02 季度 、jyzq03 月、日）
      //   tradeCycleName: "", //交易周期（年、月、日）
      //   tradeIssure: "", //交易期次
      //   tradeVarietyCode: "", //交易品种编码（省内、跨省、发电权）
      //   tradeVarietyName: "", //交易品种名称（省内、跨省、发电权）
      //   tradeWayCode: "", //交易方式编码（jyfs01 双边协商、jyfs02 集中竞价、jyfs03 挂牌）
      //   tradeWayName: "", //交易方式名称（双边协商、集中竞价、挂牌）
      //   updTime: "", //修改时间
      //   updUser: "" //修改人
      // },
      classify: [], //交易分类数据
      AssignmentType: [], //类型数据
      Products: [], //产品数据
      activeName: "first",
      activeName2: "first",
      isDisabled: true,
      loading: false, //检索等待
      delIds: "",
      isEdit: true,
      orgAttribute: "", //#3010 2019-12-16 张亮三 用于获取是哪个公司
      dialogFormVisible: false,
      dialogResultStatus: "",
      textMap: {
        update: "编辑",
        create: "新增"
      },
      //2019-12-9 #2965 张朋 新增字段
      announcementForm: {
        cyzj: "", //参与装机
        useElecRate: "", //厂用电率
        jkjsdl: "" //减扣基数电量
      },
      tableKey: 0,
      resultList: [],
      total: null,
      total1: null,
      listLoading: true,
      listQuery: {
        sdOrgId: undefined,
        transactionLine: undefined,
        noticeDate: undefined, //发布日期
        tradingTime: undefined, //交易期次
        tradingCenterId: undefined, //交易中心
        tradingVariety: undefined, //交易品种
        tradingWay: undefined, //交易方式
        tradingCycle: undefined, //交易周期
        buyList: [],
        sellList: []
      },
      resultPageQuery: {
        jyTradingResultsId: undefined
      },
      sellListQuery: {
        orgType: "sell",
        page: 1,
        limit: 10,
        jyTradingResultsId: undefined
      },
      buyListQuery: {
        orgType: "buy",
        page: 1,
        limit: 10,
        jyTradingResultsId: undefined
      },
      noticeDate: undefined,
      fileList: [],
      tradingUnitAll: [],
      tradingUnitFilterData: [],
      tradingUnitCell: null,
      dialogStatus: "",
      jyTradingResultsInfo: {},
      rowData: {}
    };
  },
  watch: {},
  created() {
    // 取值时：把获取到的Json字符串转换回对象
    var objStr = sessionStorage.getItem("objStr");
    //#2991 2019-12-03 张亮三 增加判断start
    if (objStr && objStr != null) {
      let dataStr = JSON.parse(objStr);  
      this.dialogStatus = dataStr.dialogStatus;
      this.jyTradingResultsInfo = dataStr.jyTradingResultsInfo;
      this.getResultList(this.dialogStatus, this.jyTradingResultsInfo,dataStr);
    }
    //#2991 2019-12-03 张亮三 增加判断end
    if (sessionStorage.getItem("modelCode") == "dashboard") {
      // this.unitMap = getUnitMapByModelCode(
      //   this.allSubMenus,
      //   this.unitMap,
      //   "jyjghzcx"
      // );
      this.isDashboard = true;
      // #3010 2019-12-06 张亮三 当modelCode未首页时获取首页的计量单位 start
      this.getHomeUnitData(this.orgId, "jyjghzcx");
      // #3010 2019-12-06 张亮三 当modelCode未首页时获取首页的计量单位 end
      // #2991 2019-12-03 张亮三 修复交易结果不显示单位bug
      return this.unitMap;
    } else {
      this.unitMap = getUnitMap(this.allSubMenus, this.unitMap);
    }
    // this.getConditionData(this.jyTradingResultsInfo.jyTradingResultsId,"MarketTurnover")
    this.getSelectData(); //获取下拉框数据
  },
  computed: {
    ...mapGetters(["elements", "orgId", "allSubMenus"]),
    countFdQzgswfcydl() {
      if (this.form.fdSccjdl && this.form.fdSccjdl != "") {
        return (
          Number(this.form.fdSccjdl) -
          Number(this.form.fdQzwldl) -
          Number(this.form.fdGskcygm)
        );
      } else {
      }
    }
  },
  mounted() {
    // if(this.$store.state.settl.notice){
    //   console.log(this.$store.state.settl.notice);
    //     this.dialogStatus = this.$store.state.settl.notice.dialogStatus,
    //     this.jyTradingResultsInfo = this.$store.state.settl.notice.jyTradingResultsInfo
    //     this.getResultList(this.dialogStatus, this.jyTradingResultsInfo);
    // }
  },
  methods: {
    //#4309 qinhz 2020-06-23 首页-交易结果-市场成交情况页面优化-获取市场成交情况信息
    getConditionData(noticeId,modelCode) {
      this.clearForm(); //清除表单数据
      let parm = {
        noticeId: noticeId,
        modelCode: modelCode
      };
      getConditionByNoticeId(parm).then(res => {
        this.$set(
          this,
          "rowData",
          res.data
        );
        if (this.rowData.status) {
          if (this.rowData.fdJyzgm) {
            this.rowData.tradeScale = this.rowData.fdJyzgm;
          } else {
            this.rowData.tradeScale = "";
          }
        }
        this.form.status = "";
        for (let key in this.form) {
          if (typeof this.rowData[key] != "undefined") {
            this.$nextTick(() => {
              this.$set(this.form, key, this.rowData[key]);
            });
          }
        }
        if (this.rowData.jyMarketEleConditionList) {
          if (this.rowData.jyMarketEleConditionList.length == 0) {
            let jyMarketEleConditionList = Object.assign(
              [],
              this.form["jyMarketEleConditionList"]
            );
            this.$set(
              this.rowData,
              "jyMarketEleConditionList",
              jyMarketEleConditionList
            );
          } else {
            this.rowData.jyMarketEleConditionList.forEach(item => {
              // 吴志超 2020年4月27日 修改工单 #3954  调整后的页签顺序依次为：煤机、燃油、燃气、水电、风电、光伏、核电、其它
              if (item.unitType == "mj") {
                item.text = "煤机";
                item.indexVal = "0";
              } else if (item.unitType == "ry") {
                item.text = "燃油";
                item.indexVal = "1";
              } else if (item.unitType == "rq") {
                item.text = "燃气";
                item.indexVal = "2";
              } else if (item.unitType == "sd") {
                item.text = "水电";
                item.indexVal = "3";
              } else if (item.unitType == "fd") {
                item.text = "风电";
                item.indexVal = "4";
              } else if (item.unitType == "gf") {
                item.text = "光伏";
                item.indexVal = "5";
              } else if (item.unitType == "hd") {
                item.text = "核电";
                item.indexVal = "6";
              } else if (item.unitType == "qt") {
                item.text = "其他";
                item.indexVal = "7";
              }
            });
            this.rowData.jyMarketEleConditionList.sort(
              this.comparisonFunction("indexVal")
            );
            let jyMarketEleConditionList = Object.assign(
              [],
              this.rowData["jyMarketEleConditionList"]
            );
            if (
              typeof this.rowData.fdGsrlfe != "undefined" &&
              this.rowData.fdGsrlfe != ""
            ) {
              this.rowData.fdGsrlfe = Number(this.rowData.fdGsrlfe).toFixed(2);
            }
            if (typeof this.rowData.sdZsdfe != "undefined" && this.rowData.sdZsdfe != "") {
              this.rowData.sdZsdfe = Number(this.rowData.sdZsdfe).toFixed(2);
            }
            if (
              typeof jyMarketEleConditionList != "undefined" &&
              jyMarketEleConditionList.length != ""
            ) {
              jyMarketEleConditionList.forEach(element => {
                if (
                  typeof element.fdGsrlfe != "undefined" &&
                  element.fdGsrlfe != ""
                ) {
                  element.fdGsrlfe = Number(element.fdGsrlfe).toFixed(2);
                }
              });
            }
            jyMarketEleConditionList.sort(this.comparisonFunction("indexVal"));
            this.$set(
              this.form,
              "jyMarketEleConditionList",
              jyMarketEleConditionList
            );
            // this.form.jyMarketEleConditionList.sort(this.comparisonFunction('indexVal'));
          }
        }     
      });
    },
    /**
     * @功能描述: 获取下拉框数据
     * @参数:
     * @返回值:
     * @作者: 张朋
     * @Date: 2019-12-10 09:33:03
     * @最新修改内容:
     * @LastEditTime:
     */
    getSelectData() {
      //交易分类
      getSelectList("Transaction_classify").then(res => {
        this.classify = res;
      });
      //出/受让类型
      getSelectList("Exit/Assignment_Type").then(res => {
        this.AssignmentType = res;
      });
      //交易产品
      getSelectList("Trading_products").then(res => {
        this.Products = res;
      });
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
    /**
     * @方法名称:getResultList
     * @功能描述: 获取分解月
     * @参数: 
     * @返回值: 
     * @作者: 李志佳
     * @Date: 2019-12-19 14:16:16
     * @最新修改内容: 
     * @LastEditTime: 
     */
    getResultList(status, data, code) {
      this.orgAttribute = data.orgAttribute;
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
          });
        }
      });
      if (data.tradingVariety == "jypz03") {
        this.state = false;
      } else {
        this.state = true;
      }
      this.sellListQuery.jyTradingResultsId = data.jyTradingResultsId;
      this.buyListQuery.jyTradingResultsId = data.jyTradingResultsId;
      for (let key in this.listQuery) {
        if (key != "buyList:" && key != "sellList:") {
          this.listQuery[key] = data[key];
        }
      }
      this.getSellResult(data.jyTradingResultsId);
      this.getBuyResult(data.jyTradingResultsId);
      this.getSCResult(data.jyTradingResultsId);
      setTimeout(() => {
        this.getConditionData(data.jyTradingResultsId, "MarketTurnover");       
      }, 500);
    },
    /**
     * @功能描述: 数组按照某一属性排序
     * @参数:
     * @返回值:
     * @作者: qinhz
     * @Date: 2020-06-23
     * @最新修改内容:
     * @LastEditTime:
     */
    comparisonFunction(propertyName) {
      return function(obj1, obj2) {
        var val1 = obj1[propertyName];
        var val2 = obj2[propertyName];
        if (val1 < val2) {
          return -1;
        } else if (val1 > val2) {
          return 1;
        } else {
          return 0;
        }
      };
    },
    getSellResult(id) {
      //获取交易结果列表
      let params = {};
      params.page = this.sellListQuery.page;
      params.limit = this.sellListQuery.limit;
      params.jyTradingResultsId = id || this.sellListQuery.jyTradingResultsId;
      //  #3010 2019-12-16 张亮三 在首页不传orgType
      // if (sessionStorage.getItem("modelCode") == "dashboard" && this.getResultList=='QY') {
      //   params.orgType = "";
      // }else{
      //    params.orgType = "sell";
      // }
      params.orgType = "sell";
      params.sdOrgId = this.orgId;
      params.orgAttribute = this.orgAttribute;
      getDetailsPageList(params).then(res => {
        let items = res.data.rows.map((item, index) => {
          item.index =
            index +
            1 +
            (this.sellListQuery.page - 1) * this.sellListQuery.limit;
          return item;
        });
        this.listQuery.detailList = items;
        this.total = res.data.total;
        this.listLoading = false;
      });
    },
    //设置期次信息
    setDate(val) {
      this.form.releaseDate = parseTime(this.form.releaseDate, "{y}-{m}-{d}");
    },
    /**
     * @功能描述:清空发电公司交易结果数据
     * @参数:
     * @返回值:
     * @作者: 张朋
     * @Date: 2019-12-09 21:00:43
     * @最新修改内容:
     * @LastEditTime:
     */
    emptyFdData() {
      this.rowForm = {
        index: "",
        tieLineName: "", //线路
        fdOrgName: "", //发电公司
        customerId: "noNull", //客户名称
        customerName: "noNull", //客户名称
        dealElectricity: "noNull", //成交电量
        tradingUnitId: "noNull", //交易单元
        dealPrice: "noNull" //成交电价
      };
      this.announcementForm = {
        jkjsdl: "",
        useElecRate: "",
        cyzj: ""
      };
    },
    getBuyResult(id) {
      this.emptyFdData();
      /**2019-11-26 #2805 张朋 厂用电率、减扣基数电量数据 start*/
      let param = {
        jyTradingResultsId: id
      };
      // #3010 2019-12-17 张亮三 给后端传递orgAttribute 用于判断是发电/售电、区域公司
       param.orgAttribute = this.orgAttribute;
      getResultBaseData(param).then(res => {
        if (res.falg) {
          if (res.data) {
            this.announcementForm.jkjsdl = res.data.jkjsdl;
            this.announcementForm.useElecRate = res.data.useElecRate;
            this.announcementForm.cyzj = res.data.cyzj;
          } else {
            this.announcementForm.jkjsdl = "";
            this.announcementForm.useElecRate = "";
            this.announcementForm.cyzj = "";
          }
        }
      });
      /**2019-11-26 #2805 张朋 获取参与装机、厂用电率、减扣基数电量数据 end*/

      //获取交易结果列表
      let params = {};
      params.page = this.buyListQuery.page;
      params.limit = this.buyListQuery.limit;
      params.jyTradingResultsId = id || this.buyListQuery.jyTradingResultsId;
      //  #3010 2019-12-16 张亮三 在首页不传orgType
      // if (sessionStorage.getItem("modelCode") == "dashboard") {
      //   params.orgType="";
      // }else{
      //   params.orgType = "product";
      // }
      params.orgType = "product";
      params.fdOrgId = this.orgId;
      params.orgAttribute = this.orgAttribute;
      getDetailsPageList(params).then(res => {
        let items = res.data.rows.map((item, index) => {
          item.index =
            index + 1 + (this.buyListQuery.page - 1) * this.buyListQuery.limit;
          return item;
        });
        this.listQuery.buyList = items;
        this.total1 = res.data.total;
        this.listLoading = false;
      });
    },
    getSCResult(id) {
      let params = {};
      params.noticeId = id;
      getSCDetails(params).then(res => {
        this.form = res.data;
        //如果市场成交情况有状态值,拿取库内的信息，否则获取从交易公告内取数据
        if (this.form.status) {
          if (this.form.fdJyzgm) {
            this.form.tradeScale = this.form.fdJyzgm;
          } else {
            this.form.tradeScale = "";
          }
        }
      });
    },

    resetTemp() {
      this.activeName = "first";
    },
    handleSizeChange(val) {
      this.sellListQuery.limit = val;
      this.getSellResult();
    },
    handleCurrentChange(val) {
      this.sellListQuery.page = val;
      this.getSellResult();
    },
    handleSizeChange1(val) {
      this.buyListQuery.limit = val;
      this.getBuyResult();
    },
    handleCurrentChange1(val) {
      this.buyListQuery.page = val;
      this.getBuyResult();
    },

    // cancel(formName) {
    //   this.resetTemp();
    //   this.$emit("callList");
    //   this.$emit("closeResultDialog");
    // },
    /**
     * @方法名称: handleClick
     * @功能描述: 点击tab标签页重新获取计量单位
     * @参数:
     * @返回值:
     * @作者: 张亮三 #3010
     * @Date: 2019-12-06 17:33:16
     * @最新修改内容:
     * @LastEditTime:
     */
    handleClick(tab) {
      if (tab.name == "first") {
        
      } else if (tab.name == "second") {
        
      } else if (tab.name == "third") {
        
      }
    },
    /**
     * @方法名称: handleExportFd
     * @功能描述: 首页交易结果（交易发电）结果导出功能
     * @参数: 
     * @返回值: 
     * @作者: 张亮三
     * @Date: 2019-12-23 15:30:21
     * @最新修改内容: 
     * @LastEditTime: 
     */ 
    handleExportFd(){
      let params = {};
      params.page = this.buyListQuery.page;
      params.limit = 1000;
      params.jyTradingResultsId = this.buyListQuery.jyTradingResultsId;
      params.orgType = "product";
      params.fdOrgId = this.orgId;
      params.tradingTime = this.listQuery.tradingTime;
      params.tradingCycleCode = this.jyTradingResultsInfo.tradingCycle;
      if(this.listQuery.buyList.length==0){
        return this.$notify({
            title: "提示",
            message: "当前没有可导出数据",
            type: "warning",
            duration: 2000
          });
      }
      exportObjJyjg(params)
    },
    /**
     * @方法名称: handleExport
     * @功能描述: 首页交易结果（交易售电）结果导出功能
     * @参数: 
     * @返回值: 
     * @作者: 张亮三
     * @Date: 2019-12-23 15:30:21
     * @最新修改内容: 
     * @LastEditTime: 
     */  
    handleExportSd(){
      let params = {};
      params.page = this.sellListQuery.page;
      params.limit = 1000;
      params.jyTradingResultsId = this.sellListQuery.jyTradingResultsId;
      params.orgType = "sell";
      params.sdOrgId = this.orgId;
      params.tradingTime = this.listQuery.tradingTime;
      params.tradingCycleCode = this.jyTradingResultsInfo.tradingCycle;
      if(this.listQuery.detailList.length==0){
          return this.$notify({
            title: "提示",
            message: "当前没有可导出数据",
            type: "warning",
            duration: 2000
          });
      }
      exportObjJyjg(params)
    },
    clearForm() {
      this.activeName2 = "first";
      this.form = {
        jyMarketEleConditionList: [
          {
            text: "煤机",
            unitType: "mj",
            name: "second",
            fdJyzgm: "", //发电公司市场交易情况-市场总规模
            fdGscydl: "", //发电公司市场交易情况-公司参与电量
            fdGskcyzjdysczj: "", //发电公司市场交易情况-市场装机
            fdGscyzj: "", //发电公司市场交易情况-公司参与装机
            fdGskcygm: "", //发电公司市场交易情况-公司可参与规模
            fdGskcyzj: "", //发电公司市场交易情况-公司可参与装机
            fdQzgswfcydl: "", //发电公司市场交易情况-其中公司无法参与电量
            fdQzwldl: "", //发电公司市场交易情况-其中外来电量
            fdScjf: "", //发电公司市场交易情况-市场降幅
            fdMemo: "", //发电公司市场交易情况-备注
            fdSccjdl: "", //发电公司市场交易情况-市场成交电量
            fdScpjdj: "" //发电公司市场交易情况-市场平均电价
          },
          {
            text: "燃油",
            unitType: "ry",
            name: "third",
            fdJyzgm: "", //发电公司市场交易情况-市场总规模
            fdGscydl: "", //发电公司市场交易情况-公司参与电量
            fdGskcyzjdysczj: "", //发电公司市场交易情况-市场装机
            fdGscyzj: "", //发电公司市场交易情况-公司参与装机
            fdGskcygm: "", //发电公司市场交易情况-公司可参与规模
            fdGskcyzj: "", //发电公司市场交易情况-公司可参与装机
            fdQzgswfcydl: "", //发电公司市场交易情况-其中公司无法参与电量
            fdQzwldl: "", //发电公司市场交易情况-其中外来电量
            fdScjf: "", //发电公司市场交易情况-市场降幅
            fdMemo: "", //发电公司市场交易情况-备注
            fdSccjdl: "", //发电公司市场交易情况-市场成交电量
            fdScpjdj: "" //发电公司市场交易情况-市场平均电价
          },
          {
            text: "燃气",
            unitType: "rq",
            name: "fourth",
            fdJyzgm: "", //发电公司市场交易情况-市场总规模
            fdGscydl: "", //发电公司市场交易情况-公司参与电量
            fdGskcyzjdysczj: "", //发电公司市场交易情况-市场装机
            fdGscyzj: "", //发电公司市场交易情况-公司参与装机
            fdGskcygm: "", //发电公司市场交易情况-公司可参与规模
            fdGskcyzj: "", //发电公司市场交易情况-公司可参与装机
            fdQzgswfcydl: "", //发电公司市场交易情况-其中公司无法参与电量
            fdQzwldl: "", //发电公司市场交易情况-其中外来电量
            fdScjf: "", //发电公司市场交易情况-市场降幅
            fdMemo: "", //发电公司市场交易情况-备注
            fdSccjdl: "", //发电公司市场交易情况-市场成交电量
            fdScpjdj: "" //发电公司市场交易情况-市场平均电价
          },

          {
            text: "水电",
            unitType: "sd",
            name: "sixth",
            fdJyzgm: "", //发电公司市场交易情况-市场总规模
            fdGscydl: "", //发电公司市场交易情况-公司参与电量
            fdGskcyzjdysczj: "", //发电公司市场交易情况-市场装机
            fdGscyzj: "", //发电公司市场交易情况-公司参与装机
            fdGskcygm: "", //发电公司市场交易情况-公司可参与规模
            fdGskcyzj: "", //发电公司市场交易情况-公司可参与装机
            fdQzgswfcydl: "", //发电公司市场交易情况-其中公司无法参与电量
            fdQzwldl: "", //发电公司市场交易情况-其中外来电量
            fdScjf: "", //发电公司市场交易情况-市场降幅
            fdMemo: "", //发电公司市场交易情况-备注
            fdSccjdl: "", //发电公司市场交易情况-市场成交电量
            fdScpjdj: "" //发电公司市场交易情况-市场平均电价
          },
          {
            text: "风电",
            unitType: "fd",
            name: "seventh",
            fdJyzgm: "", //发电公司市场交易情况-市场总规模
            fdGscydl: "", //发电公司市场交易情况-公司参与电量
            fdGskcyzjdysczj: "", //发电公司市场交易情况-市场装机
            fdGscyzj: "", //发电公司市场交易情况-公司参与装机
            fdGskcygm: "", //发电公司市场交易情况-公司可参与规模
            fdGskcyzj: "", //发电公司市场交易情况-公司可参与装机
            fdQzgswfcydl: "", //发电公司市场交易情况-其中公司无法参与电量
            fdQzwldl: "", //发电公司市场交易情况-其中外来电量
            fdScjf: "", //发电公司市场交易情况-市场降幅
            fdMemo: "", //发电公司市场交易情况-备注
            fdSccjdl: "", //发电公司市场交易情况-市场成交电量
            fdScpjdj: "" //发电公司市场交易情况-市场平均电价
          },
          {
            text: "光伏",
            unitType: "gf",
            name: "eighth",
            fdJyzgm: "", //发电公司市场交易情况-市场总规模
            fdGscydl: "", //发电公司市场交易情况-公司参与电量
            fdGskcyzjdysczj: "", //发电公司市场交易情况-市场装机
            fdGscyzj: "", //发电公司市场交易情况-公司参与装机
            fdGskcygm: "", //发电公司市场交易情况-公司可参与规模
            fdGskcyzj: "", //发电公司市场交易情况-公司可参与装机
            fdQzgswfcydl: "", //发电公司市场交易情况-其中公司无法参与电量
            fdQzwldl: "", //发电公司市场交易情况-其中外来电量
            fdScjf: "", //发电公司市场交易情况-市场降幅
            fdMemo: "", //发电公司市场交易情况-备注
            fdSccjdl: "", //发电公司市场交易情况-市场成交电量
            fdScpjdj: "" //发电公司市场交易情况-市场平均电价
          },
          {
            text: "核电",
            unitType: "hd",
            name: "fifth",
            fdJyzgm: "", //发电公司市场交易情况-市场总规模
            fdGscydl: "", //发电公司市场交易情况-公司参与电量
            fdGskcyzjdysczj: "", //发电公司市场交易情况-市场装机
            fdGscyzj: "", //发电公司市场交易情况-公司参与装机
            fdGskcygm: "", //发电公司市场交易情况-公司可参与规模
            fdGskcyzj: "", //发电公司市场交易情况-公司可参与装机
            fdQzgswfcydl: "", //发电公司市场交易情况-其中公司无法参与电量
            fdQzwldl: "", //发电公司市场交易情况-其中外来电量
            fdScjf: "", //发电公司市场交易情况-市场降幅
            fdMemo: "", //发电公司市场交易情况-备注
            fdSccjdl: "", //发电公司市场交易情况-市场成交电量
            fdScpjdj: "" //发电公司市场交易情况-市场平均电价
          },
          {
            text: "其他",
            unitType: "qt",
            name: "nineth",
            fdJyzgm: "", //发电公司市场交易情况-市场总规模
            fdGscydl: "", //发电公司市场交易情况-公司参与电量
            fdGskcyzjdysczj: "", //发电公司市场交易情况-市场装机
            fdGscyzj: "", //发电公司市场交易情况-公司参与装机
            fdGskcygm: "", //发电公司市场交易情况-公司可参与规模
            fdGskcyzj: "", //发电公司市场交易情况-公司可参与装机
            fdQzgswfcydl: "", //发电公司市场交易情况-其中公司无法参与电量
            fdQzwldl: "", //发电公司市场交易情况-其中外来电量
            fdScjf: "", //发电公司市场交易情况-市场降幅
            fdMemo: "", //发电公司市场交易情况-备注
            fdSccjdl: "", //发电公司市场交易情况-市场成交电量
            fdScpjdj: "" //发电公司市场交易情况-市场平均电价
          }
        ],

        tradeScale: "", //交易总规模
        releaseDate: "",
        fdFdzlqk: "", //发电公司市场交易情况-发电自律情况
        fdGscydl: "", //发电公司市场交易情况-公司参与电量
        // fdGsdlfe: "", //发电公司市场交易情况-公司电量份额
        fdGskcygm: "", //发电公司市场交易情况-公司可参与规模
        fdGskcyzj: "", //发电公司市场交易情况-公司可参与装机
        fdGsrlfe: "", //发电公司市场交易情况-公司容量份额
        fdJyzgm: "", //发电公司市场交易情况-交易总规模
        fdQzgswfcydl: "", //发电公司市场交易情况-其中公司无法参与电量
        fdSccjdl: "", //市场成交电量
        fdQzwldl: "", //发电公司市场交易情况-其中外来电量
        fdScjf: "", //发电公司市场交易情况-市场降幅
        fdScpjdj: "", //发电公司市场交易情况-市场平均电价
        fdZljiwzljtmd: "", //发电公司市场交易情况-自律及未自律集团名单
        fdGscyzj: "", //发电公司市场交易情况-公司参与装机
        noticeId: "", //交易公告id
        fdGskcyzjdysczj: "", //公司可参与装机对应市场装机
        noticeName: "", //交易序列名称
        quotationMethod: "", //报价方式，来源为维度数据，保存value为code值。
        quotationMethodName: "", //报价方式名称
        sdFdbjsdgsdlgm: "", //售电公司市场交易情况-发电背景售电公司代理规模
        sdGdcSwcJf: "", //售电公司市场交易情况-购电侧（上网侧）降幅
        sdGxjc: "", //售电公司市场交易情况-购销价差
        sdPjgdj: "", //售电公司市场交易情况-平均购电价
        sdPjsdj: "", //售电公司市场交易情况-平均售电价
        sdSdcjf: "", //售电公司市场交易情况-售电侧降幅
        sdSdgsYgdl: "", //售电公司市场交易情况-售电公司应购电量
        sdYhcjf: "", //售电公司市场交易情况-用户侧降幅
        sdZlqk: "", //售电公司市场交易情况-自律情况
        sdZsdfe: "", //售电公司市场交易情况-占售电份额
        status: "", //提交保存状态：已保存：11，已提交：3
        statusName: "", //提交保存状态：已保存：11，已提交：3
        tradeCenterId: "", //交易中心id
        tradeCenterName: "", //交易中心名称
        tradeCycleCode: "", //交易周期（jyzq01 年、jyzq02 季度 、jyzq03 月、日）
        tradeCycleName: "", //交易周期（年、月、日）
        tradeIssure: "", //交易期次
        tradeVarietyCode: "", //交易品种编码（省内、跨省、发电权）
        tradeVarietyName: "", //交易品种名称（省内、跨省、发电权）
        tradeWayCode: "", //交易方式编码（jyfs01 双边协商、jyfs02 集中竞价、jyfs03 挂牌）
        tradeWayName: "", //交易方式名称（双边协商、集中竞价、挂牌）
        sdKzjcyjygm: "", //可直接参与交易规模
        sdSdgshjcfcbl: "", //售电公司获价差分成比例
        sdKlfchsdj: "", //考虑分成售电价
        sdKlfchsdjf: "", //考虑分成后售电降幅
        sdKlfchgxjc: "", //考虑分成后购销价差
        memo: "", //备注
        fdMemo: "", //发电市场备注
        generateEleConsultMarketTotalScale: "", //发电公司市场交易情况--协商直签大用户--市场总规模
        generateEleConsultMarketDealElectricity: "", //发电公司市场交易情况--协商直签大用户--市场成交电量
        generateEleConsultCompanyPartScale: "", //发电公司市场交易情况--协商直签大用户--公司可参与规模
        generateEleConsultMarketAveragePrice: "", //发电公司市场交易情况--协商直签大用户--市场平均电价
        generateEleConsultMarketDecreasePrice: "", //发电公司市场交易情况--协商直签大用户--市场降幅
        generateEleConsultMemo: "", //发电公司市场交易情况--协商直签大用户--备注
        generateEleConnectionMarketTotalScale: "", //发电公司市场交易情况--与售电公协商对接--市场总规模
        generateEleConnectionMarketDealElectricity: "", //发电公司市场交易情况--与售电公协商对接--市场成交电量
        generateEleConnectionCompanyPartScale: "", //发电公司市场交易情况--与售电公协商对接--公司可参与规模
        generateEleConnectionMarketAveragePrice: "", //发电公司市场交易情况--与售电公协商对接--市场平均电价
        generateEleConnectionMarketDecreasePrice: "", //发电公司市场交易情况--与售电公协商对接--市场降幅
        generateEleConnectionMemo: "" //发电公司市场交易情况--与售电公协商对接--备注
      };
    }
  }
};
</script>
<style scoped>
.el-input.ddw {
  width: 50%;
}
.base_power_infor {
  height: 30px;
  line-height: 30px;
  padding-left: 20px;
  font-weight: 700;
  background-color: #f4f7fa;
  color: #606266 !important;
  margin-bottom: 10px;
}
.headerFont {
  margin-left: 60px;
  font-weight: 500;
  color: #606266 !important;
}
.spanText {
  display: inline-block;
  width: 49%;
  white-space: nowrap;
  border-bottom: 1px solid #696969;
}
.top-box {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom:10px;
}
</style>




