<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <!-- 查询条件 -->
      <el-form :inline="true" :model="listQuery" ref="listQueryForm">
        <!--引用区域和区域公司组件 -->
        <org-selects ref="orgSelects" @select="selectOrg" @initOrg="initOrg"></org-selects>
        <!--#2828 gaoaining 2019-12-31 低分辨率优化 -->
        <el-form-item v-if="pageInfo.width<1300" label="申报期次">
          <el-date-picker
            style="width:116px"
            v-model="listQuery['declarationTime']"
            type="month"
            @change="getTime"
            placeholder="请选择月份"
          ></el-date-picker>
        </el-form-item>
        <el-form-item v-else label="申报期次">
          <el-date-picker
            style="width:160px"
            v-model="listQuery['declarationTime']"
            type="month"
            @change="getTime"
            placeholder="请选择月份"
          ></el-date-picker>
        </el-form-item>
        <el-button
          class="filter-items"
          v-waves
          icon="el-icon-search"
          type="primary"
          @click="search()"
        >查询</el-button>
      </el-form>
    </div>
    <!--#2828 gaoaining 2019-12-31 布局优化 -->
    <el-row class="f-mt10">
      <el-col :span="18">
        <el-button-group class="f-mb10">
          <el-button
            class="filter-item"
            type="primary"
            icon="el-icon-plus"
            @click="handleCreate"
            v-if="jyEleDeclareManager_btn_add"
          >新增</el-button>
          <el-button
            type="primary"
            icon="el-icon-delete"
            @click="handleDeleteById"
            v-if="jyEleDeclareManager_btn_del"
          >删除</el-button>
          <el-button
            type="primary"
            icon="el-icon-upload"
            @click="handleExport"
            v-if="jyEleDeclareManager_btn_export"
          >
            <i class="sign-out"></i>导出
          </el-button>
        </el-button-group>
      </el-col>
      <el-col :span="6" align="right" style="line-height:36px;">单位：{{unitMap["electricityUnit"]}}</el-col>
    </el-row>
    <el-table
      :key="tableKey"
      :data="list"
      v-loading.body="listLoading"
      border
      fit
      highlight-current-row
      style="width: 100%"
      @selection-change="selsChange"
    >
      <el-table-column align="center" width="55" type="selection"></el-table-column>
      <el-table-column prop="index" label="序号" align="center" width="55px"></el-table-column>
      <el-table-column align="center" label="组织名称">
        <template slot-scope="scope">
          <span>{{ scope.row.orgName }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="申报期次" width="100px">
        <template slot-scope="scope">
          <span>{{ scope.row.declarationTime }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="申报客户数量" width="100px">
        <template slot-scope="scope">
          <span>{{ scope.row.participants }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="客户申报电量" width="100px">
        <template slot-scope="scope">
          <div class="txt-right">{{ scope.row.declareTotalElectricity }}</div>
        </template>
      </el-table-column>
      <el-table-column align="center" label="申报开始时间" width="170px">
        <template slot-scope="scope">
          <div class="txt-right">{{ scope.row.declareStartTime }}</div>
        </template>
      </el-table-column>
      <el-table-column align="center" label="申报结束时间" width="170px">
        <template slot-scope="scope">
          <div class="txt-right">{{ scope.row.declareEndTime }}</div>
        </template>
      </el-table-column>

      <el-table-column align="center" label="状态" width="100px">
        <template slot-scope="scope">
          <span>{{ scope.row.stateName }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" align="center" label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            size="small"
            type="text"
            @click="handleCheck(scope.row)"
            v-if="jyEleDeclareManager_btn_view"
          >查看</el-button>
          <el-button
            size="small"
            type="text"
            @click="handleUpdate(scope.row)"
            v-if="jyEleDeclareManager_btn_edit && scope.row.stateCode != '6'"
          >编辑</el-button>
          <el-button
            size="small"
            type="text"
            @click="handleDelete(scope.row)"
            v-if="jyEleDeclareManager_btn_del && scope.row.stateCode != '6'"
          >删除</el-button>
          <el-button
            size="small"
            type="text"
            v-if="jyEleDeclareManager_btn_CancelConfirm && scope.row.stateCode == '6'"
            @click="handleCancelConfirm(scope.row)"
          >取消确认</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div v-show="!listLoading" class="pagination-container">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="listQuery.page"
        :page-sizes="[10, 20, 30, 50, 100, 200, 500, 1000]"
        :page-size="listQuery.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>

    <el-dialog
      v-drag
      :close-on-click-modal="false"
      ref="dialogResult"
      custom-class="w480"
      :title="textMap[dialogStatus]"
      :visible.sync="dialogVisible"
    >
      <el-form :model="addForm" :rules="rules" ref="addForm" label-width="120px">
        <el-form-item label="申报期次" prop="tradingCycle">
          <el-date-picker
            v-model="addForm['tradingCycle']"
            type="month"
            @change="getaddTime"
            placeholder="请选择月份"
            style="width:100%"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="申报开始时间" prop="declareStartTime">
          <el-date-picker
            v-model="addForm['declareStartTime']"
            type="datetime"
            @change="getaddTime1"
            placeholder="请选择时间"
            style="width:100%"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="申报结束时间" prop="declareEndTime">
          <el-date-picker
            v-model="addForm['declareEndTime']"
            type="datetime"
            @change="getaddTime2"
            placeholder="请选择时间"
            style="width:100%"
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer f-mt10" align="center">
        <el-button :loading="confirmBtnLoading" class="save-btn" @click="createTime">确 定</el-button>
      </div>
    </el-dialog>
    <!--2019-11-21 #2754 张朋 弹框调整 -->
    <el-dialog
      v-drag
      :close-on-click-modal="false"
      ref="dialogResult"
      custom-class="w1200"
      :width="layoutInfo.width+'px'"
      :title="textMap[dialogStatus]"
      :visible.sync="dialogEleDeclareVisible"
      :before-close="beforeClose"
      v-loading="saveLoading"
    >
      <!-- 弹出form -->
      <!--2019-11-11 #2620 张朋 弹框自适应高度赋值 -->
      <div :style="{paddingRight:'10px',height:dialogHeight+'px'}">
        <el-scrollbar>
          <div class="filter-container">
            <el-form :inline="true" :model="listQuery" ref="listQueryForm" class="demo-form-inline">
              <el-form-item label="申报期次:" prop="tradingCycleCode" label-width="80px" algin="right">
                <span>{{ listQuery.tradePeriod }}</span>
              </el-form-item>
              <el-form-item label="状态:" prop="tradingCycleCode" label-width="50px" algin="right">
                <span>{{ listQuery.tradingCycleCode }}</span>
              </el-form-item>
            </el-form>
          </div>
          <div>
            <!-- 按钮 -->
            <!-- #3389 gaoaining 2019-12-30 重构按钮和查询的显示布局 start -->
            <div class="f-mtb10 clearfix">
              <el-form :model="filterForm" ref="filterForm">
                <el-row class="f-mtb10">
                  <el-radio-group v-model="filterForm.radio" @change="changeLabel">
                    <el-radio label="1">全部</el-radio>
                    <el-radio label="2">未提交</el-radio>
                    <el-radio label="5">待确认</el-radio>
                    <el-radio label="6">已确认</el-radio>
                  </el-radio-group>
                  <!-- #3389 gaoaining 2019-12-30添加客户批次 start-->
                  <el-select
                    class="f-ml10"
                    :clearable="true"
                    v-model="filterForm.customerBatchCode"
                    placeholder="请选择客户批次"
                    v-if=" batchFlag"
                    @change="changeBatch"
                  >
                    <el-option
                      v-for="item in batchList"
                      :key="item.index"
                      :label="item.propName"
                      :value="item.propCode"
                    ></el-option>
                  </el-select>
                  <!-- #3389 gaoaining 2019-12-30添加客户批次 end-->
                </el-row>

                <el-row>
                  <el-col :span="10">
                    <el-button
                      class="filter-item no-radius"
                      @click="InnerHandleExport"
                      type="primary"
                      icon="el-icon-upload"
                    >导出</el-button>
                    <input
                      class="result-upload"
                      ref="importInput"
                      val
                      id="imFile"
                      type="file"
                      style="display: none"
                      @change="importExcel($event)"
                      accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                    />
                    <el-button
                      v-if="isTempUploadFinished"
                      class="filter-item"
                      type="primary"
                      icon="el-icon-upload"
                      @click="onUploadClick"
                    >导入</el-button>
                    <el-button
                      class="filter-item"
                      v-if="isTempUploadFinished"
                      type="primary"
                      icon="el-icon-view"
                      @click="showImportResult"
                    >导入解析</el-button>
                    <el-button
                      v-if="isTempUploadFinished"
                      class="filter-item"
                      type="primary"
                      icon="el-icon-download"
                      @click="downloadTemplateFile"
                    >模板下载</el-button>
                  </el-col>

                  <el-col :span="10" v-if="!Checked">
                    <el-button
                      class="submit-btn"
                      @click="Issued"
                      v-if="jyEleDeclareManager_btn_Issued"
                      :disabled="
                    masterState_btn || this.listQuery.tradingCycleCode == '已下发'
                  "
                    >下 发</el-button>
                    <el-button
                      class="save-btn"
                      @click="Report"
                      v-if="jyEleDeclareManager_btn_Report"
                      :disabled="masterState_btn"
                    >确认完毕</el-button>
                    <el-button
                      class="submit-btn"
                      @click="confirm"
                      v-if="jyEleDeclareManager_btn_check"
                      :disabled="masterState1_btn"
                    >确 认</el-button>
                    <el-button
                      class="cancel-btn"
                      @click="reject"
                      v-if="jyEleDeclareManager_btn_check"
                      :disabled="masterState1_btn"
                    >驳 回</el-button>
                  </el-col>
                  <div style="float:right">
                    <span>单位：{{unitMap["electricityUnit"]}}</span>
                  </div>
                </el-row>
              </el-form>
            </div>
            <!-- #3389 gaoaining 2019-12-30 重构按钮和查询的显示布局 end -->
            <!--#2739 2019-11-20  内网测试环境，交易管理-客户申报电量管理，优化 wangc 修改为懒加载table start-->
            <div class="bigdata-table">
              <ElBigdataTable
                highlight-current-row
                ref="singleTable"
                custom-class="w1000 "
                v-show="tableShow"
                @selection-change="selsChange1"
                border
                fit
                v-loading.body="listLoading1"
                :key="filterForm.radio"
                :data="sumList"
                :height="tabHeight"
                :row-height="32"
              >
                <!-- :height="layoutInfo.height-280" -->
                <el-table-column
                  align="center"
                  width="40px"
                  v-if="filterForm.radio == '1' || filterForm.radio == '5'"
                  type="selection"
                ></el-table-column>
                <el-table-column prop="index1" label="序号" align="center" width="40px"></el-table-column>
                <el-table-column align="center" label="客户名称" width="170px">
                  <template slot-scope="scope">
                    <div class="txt-left">
                      <!-- 2019年11月20日19:40:17 李志佳 #2741 查看不可点 start-->
                      <el-input
                        :disabled="customerNameState || noEdit"
                        v-model="scope.row.customerName"
                      ></el-input>
                    </div>
                  </template>
                </el-table-column>
                <!-- 20191125 #2767 wangc 交易管理 - 客户申报电量管理 - 优化-前端开发 start -->
                <el-table-column
                  v-if="this.declarationType=='0'"
                  align="center"
                  label="户表号"
                  width="170px"
                >
                  <template slot-scope="scope">
                    <div class="txt-left">
                      <!-- 2019年11月20日19:40:17 李志佳 #2741 查看不可点 start-->
                      <el-input
                        :disabled="customerNameState || noEdit"
                        v-model="scope.row.meterNumber"
                      ></el-input>
                    </div>
                  </template>
                </el-table-column>
                <!-- 20191125 #2767 wangc 交易管理 - 客户申报电量管理 - 优化-前端开发 end -->
                <el-table-column align="center" label="上年同期实际用电量" width="160px">
                  <template slot-scope="scope">
                    <div class="txt-left">
                      <el-input
                        type="number"
                        :disabled=" scope.row.stateCode== '6' || disWried || noEdit"
                        v-model="scope.row.lastYearActualElectricity "
                      ></el-input>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="本期合同电量" width="120px">
                  <template slot-scope="scope">
                    <div class="txt-left">
                      <el-input
                        type="number"
                        :disabled=" scope.row.stateCode== '6' || disWried || noEdit"
                        v-model="scope.row.thisPeriodContractElectricity"
                      ></el-input>
                    </div>
                  </template>
                </el-table-column>

                <el-table-column align="center" label="本月申报电量" width="120px">
                  <template slot-scope="scope">
                    <div class="txt-right">
                      <el-input
                        type="number"
                        :disabled=" scope.row.stateCode== '6' || disWried || noEdit"
                        v-model="scope.row.declarationElectricity"
                      ></el-input>
                    </div>
                  </template>
                </el-table-column>

                <el-table-column align="center" label="年度双边分解电量" width="160px">
                  <template slot-scope="scope">
                    <div class="txt-right">
                      <el-input
                        type="number"
                        :disabled=" scope.row.stateCode== '6' || disWried || noEdit"
                        v-model="scope.row.yearDecomposeElectricity"
                      ></el-input>
                    </div>
                  </template>
                </el-table-column>

                <el-table-column
                  v-if="this.isDlsbGD==false"
                  align="center"
                  label="月度缩减电量"
                  width="120px"
                >
                  <template slot-scope="scope">
                    <div class="txt-right">
                      <el-input
                        type="number"
                        :disabled=" scope.row.stateCode== '6' || disWried || noEdit"
                        v-model="scope.row.monthDecrement"
                      ></el-input>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  v-if="this.isDlsbGD==false"
                  align="center"
                  label="月度双边电量"
                  width="120px"
                >
                  <template slot-scope="scope">
                    <div class="txt-right">
                      <el-input
                        type="number"
                        :disabled=" scope.row.stateCode== '6' || disWried || noEdit"
                        v-model="scope.row.monthBilateralPower"
                      ></el-input>
                    </div>
                  </template>
                </el-table-column>

                <el-table-column align="center" label="月度竞价电量" width="120px">
                  <template slot-scope="scope">
                    <div class="txt-right">
                      <el-input
                        type="number"
                        :disabled=" scope.row.stateCode== '6' || disWried || noEdit"
                        v-model="scope.row.monthBiddingVolume"
                      ></el-input>
                    </div>
                  </template>
                </el-table-column>

                <el-table-column
                  v-if="this.isDlsbGD==false"
                  align="center"
                  label="光伏电量"
                  width="80px"
                >
                  <template slot-scope="scope">
                    <div class="txt-right">
                      <el-input
                        type="number"
                        :disabled=" scope.row.stateCode== '6' || disWried || noEdit"
                        v-model="scope.row.gfdl"
                      ></el-input>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  v-if="this.isDlsbGD==false"
                  align="center"
                  label="年度挂牌分解电量"
                  width="160px"
                >
                  <template slot-scope="scope">
                    <div class="txt-right">
                      <el-input
                        type="number"
                        :disabled="true"
                        v-model="scope.row.yearHangingDecomposeElectric"
                      ></el-input>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="调整电量" width="80px">
                  <template slot-scope="scope">
                    <div class="txt-right">
                      <el-input
                        type="number"
                        :disabled=" scope.row.stateCode== '6' || noEdit"
                        v-model="scope.row.adjustElectricity"
                      ></el-input>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column width="200px" align="center" label=" 调整原因">
                  <template slot-scope="scope">
                    <div class="txt-right">
                      <el-input
                        :disabled=" scope.row.stateCode== '6' || noEdit"
                        v-model="scope.row.adjustCause"
                      ></el-input>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  v-if="this.isDlsbGD==false"
                  width="200px"
                  align="center"
                  label="附件上传"
                >
                  <template slot-scope="scope">
                    <div class="txt-right" v-if="scope.row.enclosure">
                      <el-link
                        :disabled="scope.row.stateCode== '6'"
                        @click="downFile(scope.row)"
                      >{{scope.row.fileName}}</el-link>
                      <el-button size="small" type="text" @click="delectFile(scope.row)">删除</el-button>
                    </div>
                    <div v-else>
                      <el-upload
                        class="upload-demo"
                        ref="fileAdd"
                        action="@common/api/business/importFile/uploadFile"
                        :disabled=" scope.row.stateCode== '6'"
                        :on-change="onChange"
                        :file-list="scope.row.fileList"
                        :show-file-list="true"
                        :limit="limit_number"
                        :accept="accept"
                        :multiple="false"
                        :headers="onHeaders"
                        :data="onImportForm"
                        :before-upload="onBefore"
                        :on-success="onSuccess"
                        :on-exceed="onExceed"
                        :on-error="onError"
                        :on-remove="onRemove"
                      >
                        <el-button
                          slot="trigger"
                          size="small"
                          type="primary"
                          @click="fileAdd(scope.row)"
                        >点击上传</el-button>
                      </el-upload>
                    </div>
                  </template>
                </el-table-column>

                <el-table-column width="100px" align="center" label="状态">
                  <template slot-scope="scope">
                    <span>{{ scope.row.stateName }}</span>
                  </template>
                </el-table-column>
                <el-table-column width="160px" align="center" label="申报日期">
                  <template slot-scope="scope">
                    <span>
                      <el-date-picker
                        :disabled=" scope.row.stateCode== '6' || disWried || noEdit"
                        v-model="scope.row.declarationDate"
                        @change="setDeclarationDate($event, scope.row)"
                        type="date"
                        style="width:120px"
                      ></el-date-picker>
                    </span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="备注">
                  <template slot-scope="scope">
                    <el-input
                      :disabled=" scope.row.stateCode== '6' || noEdit"
                      v-model="scope.row.remark"
                    ></el-input>
                  </template>
                </el-table-column>
                <!-- 2019年11月20日19:40:17 李志佳 #2741 查看不可点 end-->
                <el-table-column
                  v-if="
              Checked == false &&
                (filterForm.radio == '1' || filterForm.radio == '5'||filterForm.radio == '6')
            "
                  fixed="right"
                  align="center"
                  label="操作"
                  width="120px"
                >
                  <template slot-scope="scope">
                    <div v-if="scope.row.stateCode != '6'">
                      <el-button
                        size="small"
                        type="text"
                        :disabled="masterState1_btn"
                        @click="handlePassState(scope.row)"
                      >确认</el-button>
                      <el-button
                        size="small"
                        type="text"
                        :disabled="masterState1_btn"
                        @click="handleRejectState(scope.row)"
                      >驳回</el-button>
                    </div>
                    <div v-else>
                      <el-button size="small" type="text" @click="UNhandlePassState(scope.row)">取消确认</el-button>
                    </div>
                  </template>
                </el-table-column>
              </ElBigdataTable>
            </div>
            <!--#2739  内网测试环境，交易管理-客户申报电量管理，优化 wangc 修改为懒加载table end-->

            <!-- 分页 -->
            <div v-show="!listLoading1" class="pagination-container">
              <el-pagination
                @size-change="handleSizeChange1"
                @current-change="handleCurrentChange1"
                :current-page.sync="pageList.page"
                :page-sizes="[10, 20, 30, 50, 100, 200, 500, 1000]"
                :page-size="pageList.limit"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total1"
              ></el-pagination>
            </div>
          </div>
          <div class="filter-container">
            <el-form :inline="true" :model="listQuery" class="demo-form-inline">
              <el-form-item label="已确认客户申报电量:" label-width="150px" algin="right">
                <!-- 重新设置字段值 2020-04-24 张亮三  start-->
                <span>{{ declarationConfirmElectricity }}</span>
                <!-- 重新设置字段值 2020-04-24 张亮三  end-->
              </el-form-item>
              <el-form-item label="本月申报电量合计:" label-width="150px" algin="right">
                <!-- 重新设置字段值 2020-04-24 张亮三  start-->
                <span>{{ declarationElectricity }}</span>
                <!-- 重新设置字段值 2020-04-24 张亮三  end-->
              </el-form-item>
            </el-form>
          </div>
        </el-scrollbar>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button
          v-if="this.dialogStatus != 'check'"
          class="save-btn"
          @click="submitSave"
          :disabled="this.masterState_btn1"
        >保 存</el-button>
        <el-button class="cancel-btn" @click="cancel">关 闭</el-button>
      </div>
    </el-dialog>
    <!-- 导入数据弹窗-->
    <important-dialog
      ref="importantDialog"
      :declarationId="this.declarationId"
      v-on:initList="initList"
      v-on:downinfo1="downinfo1"
    ></important-dialog>
    <!-- 导入数据弹窗 end  -->
    <!-- 导入数据模板类型选择-->
    <el-dialog
      v-drag
      :close-on-click-modal="false"
      title="电量申报导入"
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
                action="/api/business/importFile/importFile"
                :accept="accept"
                :show-file-list="show_file_name"
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

    <GdSpecialDialog ref="gdSpecialDialog" :linedata="this.linedata" />
    <GdSpecialDialogSee ref="gdSpecialSeeDialog" :linedata="this.linedata" />
  </div>
</template>

<script>
import {
  page,
  addObj,
  innerExportObj,
  getObj,
  delObj,
  getOrgAll,
  putObj,
  periodSelectObj,
  exportObj,
  getDeatilPageById,
  checkData,
  getDeclarationById,
  getIdBytradingCycle,
  insertMainData,
  editState,
  getStatusToReport,
  editAllState,
  getorgIsHelp,
  getDlsbIsGD,
  editInfo,
  updateReportStatus,
  downloadImportTemplate,
  getjyEleDeclareManageInfo,
  updateOneDeclaration,
  getBatchFlag,
  getGdSpecial,
  getDeatilalculationSum //2020-04-24 张亮三 查询已确认客户申报电量/本月申报电量合计 接口
} from "@common/api/business/jyEleDeclareManage/index";
import { getToken } from "@common/utils/auth";
import { downloadOneFileUs1, getSelectList } from "@common/api/base";
import { getUserOrgInfo } from "@common/api/public/index";
//2019-11-11 #2620 张朋 自定义弹框高度路径引用
import { parseTime, getUnitMap, initDialogHeight } from "@common/utils/index";
import { mapGetters } from "vuex";
import { initLayout, initLayoutInfo } from "@common/utils/init";
//引用区域和区域公司组件路径
import OrgSelects from "@common/components//orgSelectSellElectricity";

export default {
  name: "jyEleDeclaremanage",
  components: {
    GdSpecialDialog: () => import("./components/GdSpecialDialog"),
    GdSpecialDialogSee: () => import("./components/GdSpecialDialogSee"),
    SellElectronics: () =>
      import("@common/components//contractLedger/SellElectronicsDialog"),
    PurchaseAndSale: () =>
      import(
        "@common/components//contractLedger/PurchaseAndSaleElectronicsDialog"
      ),
    Transfer: () => import("@common/components//contractLedger/TransferDialog"),
    ImportantDialog: () => import("./components/ImportantDialog"),
    //区域和区域公司组件
    OrgSelects
  },
  data() {
    const declareEndTime = (rule, value, callback) => {
      if (value == "" || value == null) {
        callback(new Error("请输入申报结束时间"));
      } else {
        var end = new Date(value).getTime();
        var start = new Date(this.addForm.declareStartTime).getTime();
        if (end <= start) {
          callback(new Error("结束时间大于开始时间"));
        } else {
          callback();
        }
      }
    };
    return {
      linedata: {},
      nowFlag: '',
      confirmBtn: true,
      noEdit: false, //查看
      //20191125 #2767 wangc  有无户表号状态
      declarationType: "",
      layoutInfo: {},
      details: {},
      id: "",
      isState: false,
      unit: "千千瓦时",
      vParames: [],
      stateCode: "",
      onHeaders: {},
      uplaodHeaders: {},
      states: true,
      masterState_btn1: false,
      orgId: "",
      disWried: false,
      isDlsbGD: false, // 电量申报是否广东模式
      delStates: true,
      tableShow: true,
      masterState: "", //主状态
      masterState_btn: false,
      sels: "",
      uploadImportForm: {
        description: "jyEleDeclareManage",
        declarationId: ""
      },
      onImportForm: {},
      sels1: "",
      list: null,
      orgAll: [],
      total: null,
      confirmBtnLoading: false, //确定加载
      listLoading: false,
      saveLoading: false,
      listLoading1: false,
      listQuery: {
        page: 1,
        limit: 10,
        declareTotalElectricity: undefined,
        tradePeriod: undefined,
        declarationTime: undefined, //交易期次
        tradingCycleCode: undefined, //交易周期
        orgId: undefined
      },
      canUplaodImport: true,
      uplaodImport: true,
      addForm: {
        tradingCycle: "", //交易期次
        declareStartTime: "", //开始时间
        declareEndTime: "" //结束时间
      },
      rules: {
        tradingCycle: [
          {
            required: true,
            message: "请输入申报期次",
            trigger: "blur"
          }
        ],
        declareStartTime: [
          {
            required: true,
            message: "请输入申报开始时间",
            trigger: "change"
          }
        ],
        declareEndTime: [
          {
            required: true,
            // message: "请输入申报结束时间",
            trigger: "blur",
            validator: declareEndTime
          }
        ]
      },
      dialogVisible: false,
      dialogEleDeclareVisible: false,
      dialogStatus: "",
      importTypeDialog: false,
      isTempUploadFinished: true,
      jyEleDeclareManager_btn_edit: false,
      jyEleDeclareManager_btn_del: false,
      jyEleDeclareManager_btn_CancelConfirm: false,
      jyEleDeclareManager_btn_add: false,
      jyEleDeclareManager_btn_export: false,
      jyEleDeclareManager_btn_view: false,
      jyEleDeclareManager_btn_Issued: false,
      jyEleDeclareManager_btn_Report: false,
      jyEleDeclareManager_btn_check: false,
      customerNameState: true, //客户名称禁用状态
      textMap: {
        check: "查看",
        update: "编辑",
        create: "选择申报期次"
      },
      tableKey: 0,
      tableKey1: 1,
      importantLoading: false,
      state: false,
      accept:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel",
      show_file_name: true,
      limit_number: 1,
      myFileList: [],
      announcementDate: undefined,
      declarationId: undefined,
      // #2739 修改懒加载显示高度 wangc 2019-11-20
      tabHeight: this.tableHeight,
      tradePeriod: "",
      isChecked: false, //是否是查看
      sumList: [],
      altlist: {},
      /////////////////////////////
      loading: false, //检索等待
      total1: null,
      filterForm: {
        radio: "1"
      },
      pageList: {
        page: 1,
        limit: 10,
        declarationTime: "", //添加期次
        declarationId: "",
        stateCode: ""
      },
      Checked: false,
      masterState1_btn: false,
      unitMap: {},
      dialogHeight: {}, //2019-11-11 #2620 张朋 弹框获取自适应高度数据
      batchList: [], //客户批次
      batchFlag: false, //是否设置客户批次
      pageInfo: { width: 0, height: 0 },
      declarationConfirmElectricity: "", //已确认客户申报电量
      declarationElectricity: "" //本月申报电量合计
    };
  },

  // #2739 2019-11-20 监听懒加载显示高度 wangc
  watch: {
    tableHeight(val) {
      this.tabHeight = val;
      /** 2019-11-11 #2636 康如涛 设置表格最小高度  */
      this.setLayoutHeight();
    }
  },
  created() {
    // #2739 2019-11-20 初始化懒加载显示高度 wangc
    this.setLayoutHeight();
    this.unitMap = getUnitMap(this.allSubMenus, this.unitMap);
    this.init();
    this.getList();
    this.jyEleDeclareManager_btn_edit = this.elements[
      "jyEleDeclareManager:btn_edit"
    ];
    this.jyEleDeclareManager_btn_CancelConfirm = this.elements[
      "jyEleDeclareManager:btn_CancelConfirm"
    ];
    this.jyEleDeclareManager_btn_del = this.elements[
      "jyEleDeclareManager:btn_del"
    ];
    this.jyEleDeclareManager_btn_add = this.elements[
      "jyEleDeclareManager:btn_add"
    ];
    this.jyEleDeclareManager_btn_export = this.elements[
      "jyEleDeclareManager:btn_export"
    ];
    this.jyEleDeclareManager_btn_view = this.elements[
      "jyEleDeclareManager:btn_view"
    ];
    this.jyEleDeclareManager_btn_Issued = this.elements[
      "jyEleDeclareManager:btn_Issued"
    ];
    this.jyEleDeclareManager_btn_Report = this.elements[
      "jyEleDeclareManager:btn_Report"
    ];
    this.jyEleDeclareManager_btn_check = this.elements[
      "jyEleDeclareManager:btn_check"
    ];
    this.jyEleDeclareManager_btn_check = this.elements[
      "jyEleDeclareManager:btn_check"
    ];
    this.uplaodHeaders = {
      Authorization: getToken(),
      ModelCode: sessionStorage.getItem("modelCode")
    };
    this.onHeaders = {
      Authorization: getToken(),
      ModelCode: sessionStorage.getItem("modelCode")
    };
    //#3389 gaoaining 2019-12-30获取客户批次维度
    getSelectList("announcement_batches").then(res => {
      this.batchList = res;
    });
  },
  /**2019-11-11 #2620 张朋  弹框自适应高度 start */
  mounted() {
    const that = this;
    this.dialogHeight = initDialogHeight();
    this.layoutInfo = initLayoutInfo();
    window.onresize = function temp() {
      that.layoutInfo = initLayoutInfo();
      that.dialogHeight = initDialogHeight();
      that.pageInfo.width = `${document.documentElement.clientWidth}`;
    };
    this.pageInfo.width = `${document.documentElement.clientWidth}`;
    
  },
  /**2019-11-11 #2620 张朋  弹框自适应高度 end */
  computed: {
    ...mapGetters(["elements", "allSubMenus"])
  },
  methods: {
    getSearchGd() {
      getUserOrgInfo().then(res => {
        this.orgId = res[res.length - 1].id;
        if (this.orgId != null && this.orgId != "") {
          let params = {};
          params.parameterCode = "1030015";
          params.configurationId = "3";
          params.orgId = this.orgId;
          getGdSpecial(params).then(res => {
            if (res == "0") {
              // 如果是广东模式
              this.nowFlag = 'gdSpecial'
            } else {
              // 非广东模式
              this.nowFlag = 'normal'
            }
          });
        }
      });
    },
    setLayoutHeight() {
      /*
       * @功能描述: 设置表格最小高度为280.
       * @param
       * @作者: wangc
       * @Date: 2019-11-20
       */
      if (typeof this.tabHeight == "undefined") {
        this.tabHeight = 280;
      } else {
        if (this.tabHeight < 300) {
          this.tabHeight = 280;
        }
      }
    },
    //设置查询条件中组织ID
    selectOrg(id) {
      this.listQuery.orgId = id;
    },
    //按组织初始化列表
    initOrg(id) {
      this.listQuery.orgId = id;
      this.getList();
    },
    init() {
      this.initParams();
      this.getSearchGd();
      this.getOrgData();
      this.setLayoutHeight();
      this.getBatchFlag(); //是否设置客户批次
    },
    setLayoutHeight() {
      //this.tabHeight = initLayout() - 230;
      // #2739 2019-11-20 设置懒加载显示高度 wangc
      this.tabHeight = initDialogHeight() * 0.6; //2019-11-12 #2620 张朋 修改计算的表格高度
    },
    search() {
      this.getList();
    },
    // 初始化企业配置参数:电量申报是否 广东模式
    initParams() {
      getUserOrgInfo().then(res => {
        this.orgId = res[res.length - 1].id;
        if (this.orgId != null && this.orgId != "") {
          let params = {};
          params.parameterCode = "1030004";
          params.configurationId = "3";
          params.orgId = this.orgId;
          getDlsbIsGD(params).then(res => {
            if (res == "0") {
              // 如果是广东模式，隐藏列 0-是
              this.isDlsbGD = true;
              // this.unit = "万千瓦时";
            } else {
              // 非广东模式，则正常显示列 1-否 或 空时
              this.isDlsbGD = false;
            }
          });
        }
      });
    },
    getOrgData() {
      //获取所有发电公司数据
      let parames = {};
      parames.attributeTypeCode = "zzjgsx01";
      getOrgAll(parames).then(res => {
        this.orgAll = res;
      });
    },
    //查看导入结果
    showImportResult() {
      let oParame = {};
      oParame.fileType = "jyEleDeclareManage";
      oParame.page = "1";
      oParame.limit = "20";
      oParame.iscorrect = "1";
      this.showImportResultLoading = true;
      this.$refs.importantDialog.initImportData(
        this.declarationId,
        this.isDlsbGD,
        // 20191125 #2767 wangc  传入户表号状态字段
        this.declarationType
      );
      // getjyEleDeclareManageInfo(oParame).then(res => {
      //   this.showImportResultLoading = false;
      //   if (res.rel) {
      //     if (typeof res.data == "undefined") {
      //       this.$notify({
      //         title: "导入结果提示",
      //         message: res.msg,
      //         type: "warning",
      //         duration: 2000
      //       });
      //     } else {
      //       let importInfo = res.data.rows;
      //       if (importInfo.length > 0) {
      //         this.$refs.importantDialog.initImportData(importInfo[0]);
      //       } else {
      //         this.$notify({
      //           title: "导入结果提示",
      //           message: "文件中模板名称有误，请查证后重新导入！",
      //           type: "warning",
      //           duration: 2000
      //         });
      //       }
      //     }
      //   } else {
      //     this.$notify({
      //       title: "导入结果提示",
      //       message: "文件正在处理中，请稍后查看！",
      //       type: "warning",
      //       duration: 2000
      //     });
      //   }
      // });
    },
    //附件下载
    downFile(row) {
      let parme = {
        enclosures: row.enclosure
      };
      downloadOneFileUs1(parme);
    },
    //删除上传文件
    delectFile(row) {
      row.enclosure = "";
      updateOneDeclaration(row).then(res => {
        this.getinlist();
      });
    },

    fileAdd(row) {
      this.id = row.detailId;
      this.details = row;
    },
    //上传文件之前
    onBefore(file) {
      this.onImportForm.detailId = this.id;
    },
    handleBefore(file) {},
    //文件状态改变
    onChange(file, fileList) {
      this.uplaodImport = this.checkImportFileName(file.name);
    },
    handleChange(file, fileList) {
      this.canUplaodImport = this.checkImportFileName(file.name);
    },

    checkImportFileName() {
      return true;
    },
    //上传成功
    onSuccess(response, file, fileList) {
      this.isState = true;
      this.$notify({
        title: "上传提示",
        message: "文件上传成功",
        type: "success",
        duration: 2000
      });
      this.details.enclosure = response.data.filePath;
      updateOneDeclaration(this.details).then(res => {
        this.getinlist();
      });
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
    //删除
    onRemove() {
      this.isState = false;
    },
    //上传失败
    onError(response, file, fileList) {
      this.isState = false;
      this.$notify({
        title: "上传提示",
        message: "文件上传失败",
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
    //文件超出个数限制
    onExceed() {
      this.$notify({
        title: "上传提示",
        message: "文件最多上传一个",
        type: "warning",
        duration: 2000
      });
    },
    handleExceed() {
      this.$notify({
        title: "导入提示",
        message: "导入最多上传1个",
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
    //获取列表
    getList() {
      this.listLoading = true;
      page(this.listQuery).then(response => {
        let items = response.data.rows.map((item, index) => {
          item.index =
            index + 1 + (this.listQuery.page - 1) * this.listQuery.limit;
          return item;
        });
        this.list = items;
        this.total = response.data.total;
        this.listLoading = false;
      });
    },
    //显示上传选择窗口
    onUploadClick() {
      if (this.$refs.uploadFileAdd === undefined) {
      } else {
        this.$refs.uploadFileAdd.clearFiles();
      }
      this.uploadImportForm.declarationId = this.declarationId;
      this.importTypeDialog = true;
    },
    initList() {
      this.listQuery.page = 1;
      // this.$set(this.listQuery,'status','')
      // this.$set(this.listQuery,'contractName','')
      // this.$set(this.listQuery,'contractTypeCode','')
      this.getList();
    },
    uploadImportFile() {
      this.$refs.importInput.click();
    },
    //导入
    importExcel(e) {
      //event is not defined
      let _this = this;
      // var event =  window.event || arguments.callee.caller.arguments[0];

      let userAgent = navigator.userAgent;
      if (userAgent.indexOf("Firefox") > -1) {
        this.file = e.currentTarget.files[0];
      } else {
        this.file = event.currentTarget.files[0];
      }

      //this.file = obj.currentTarget.files[0]; //火狐报错
      var rABS = false; //是否将文件读取为二进制字符串
      var f = this.file;
      var reader = new FileReader();
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
          if (outdata.length > 0) {
            _this.dealFile(outdata); // analyzeData: 解析导入数据
          }
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
    //查询
    handleFilter() {
      this.listQuery.announcementDate = this.announcementDate;
      this.getList();
    },
    //点击分页操作
    handleSizeChange(val) {
      this.listQuery.limit = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getList();
    },
    //打开新增
    handleCreate() {
      //2019年11月20日19:40:17 李志佳 #2741 查看不可点
      this.noEdit = false;
      this.confirmBtnLoading = false; //确定按钮加载关闭
      this.isTempUploadFinished = true;
      this.dialogStatus = "create";
      this.dialogVisible = true;
      this.$nextTick(() => {
        this.$refs.addForm.clearValidate();
      });
      this.addForm["tradingCycle"] = "";
      this.addForm["declareEndTime"] = "";
      this.addForm["declareStartTime"] = "";
    },
    // 新增触发事件
    createTime() {
      this.confirmBtnLoading = true;
      // if (this.addForm.tradingCycle == "") {
      //   this.$notify({
      //     title: "提示",
      //     message: "请选择申报期次",
      //     type: "warning",
      //     duration: 2000
      //   });
      // } else if (this.addForm.declareStartTime == "") {
      //   this.$notify({
      //     title: "提示",
      //     message: "请选择申报开始时间",
      //     type: "warning",
      //     duration: 2000
      //   });
      // } else if (this.addForm.declareEndTime == "") {
      //   this.$notify({
      //     title: "提示",
      //     message: "请选择申报结束时间",
      //     type: "warning",
      //     duration: 2000
      //   });
      // } else {
      //调接口返回ID主表、参数：this.addForm.tradingCycle
      // 能成功，传返回的主键调两个接口
      let parme = {
        declarationTime: this.addForm["tradingCycle"],
        declareEndTime: this.addForm["declareEndTime"],
        declareStartTime: this.addForm["declareStartTime"],
        isCrossDistrict: "0"
      };
      this.$refs.addForm.validate(valid => {
        if (valid) {
          getIdBytradingCycle(parme).then(res => {
            if (res.rel) {
              if (res.data) {
                insertMainData(parme).then(res => {
                  if (res.rel) {
                    this.declarationId = res.data.id;
                    this.pageList.declarationId = res.data.id;
                    let parme = {
                      declarationId: this.declarationId,
                      limit: 10,
                      page: 1
                    };
                    let parme1 = {
                      declarationId: this.declarationId
                      //stateCode: ""
                    };
                    /** 2020-01-09 #3564  康如涛 解决无declarationTime传参 显示查询出错问题 start */
                    this.pageList.declarationTime = this.addForm[
                      "tradingCycle"
                    ];
                    this.pageList.declarationId = res.data.id;
                    if(this.nowFlag == 'gdSpecial'){
                      this.linedata = {
                        declarationId: this.declarationId,
                        declarationTime:this.addForm["tradingCycle"],
                        stateName: '新增'
                      }
                      this.dialogVisible = false;
                      this.$refs.gdSpecialDialog.dialogFormVisible = true
                    }else{
                      this.getinlist(parme, parme1);
                    }                 
                    /** 2020-01-09 #3564  康如涛 解决无declarationTime传参 显示查询出错问题 end */
                  } else {
                    this.$notify({
                      title: res.msg,
                      message: res.msg,
                      type: "warning",
                      duration: 2000
                    });
                  }
                });
              } else {
                this.confirmBtnLoading = false;
                this.$notify({
                  title: res.msg,
                  message: res.msg,
                  type: "warning",
                  duration: 2000
                });
              }
            } else {
              this.$notify({
                title: res.msg,
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

      // }
    },
    //弹窗关闭前操作
    beforeClose() {
      this.resetTemp();
      this.getList();
      this.dialogEleDeclareVisible = false;
    },
    //打开查看
    handleCheck(row) {
      if(this.nowFlag == 'gdSpecial'){
        this.linedata = row
        this.$refs.gdSpecialSeeDialog.dialogFormVisible = true
      }else{
        this.filterForm.customerBatchCode = "";
      // 20191125 #2767 wangc 传入户表号状态
      this.declarationType = row.declarationType;
      this.declarationId = row.declarationId;
      let parme = { declarationId: row.declarationId, limit: 10, page: 1 };
      let parme1 = { declarationId: row.declarationId };
      this.pageList.declarationId = row.declarationId;
      this.pageList.declarationTime = row.declarationTime;
      this.pageList.customerBatchCode = ""; //客户批次默认为空
      this.getinlist(parme, parme1);
      this.isChecked = true;
      this.dialogStatus = "check";
      this.Checked = true;
      this.isTempUploadFinished = false; //不显示导入/导入解析/模板下载按钮
      // this.declarationId = row.declarationId;
      this.dialogEleDeclareVisible = true;
      //2019年11月20日19:40:17 李志佳 #2741 查看不可点 
      this.noEdit = true;
      }
    },
    //打开编辑
    handleUpdate(row) {
      if(this.nowFlag == 'gdSpecial'){
        this.linedata = row
        this.$refs.gdSpecialDialog.dialogFormVisible = true
      }else{
              this.filterForm.customerBatchCode = "";
      // 20191125 #2767 wangc 传入户表号状态
      this.declarationType = row.declarationType;
      //2019年11月20日19:40:17 李志佳 #2741 查看不可点
      this.noEdit = false;
      this.isTempUploadFinished = true; //显示导入/导入解析/模板下载按钮
      this.masterState_btn = false;
      this.masterState_btn1 = false;
      getUserOrgInfo().then(res => {
        this.orgId = res[res.length - 1].id;
        if (this.orgId != null && this.orgId != "") {
          let params = {};
          params.parameterCode = "1030001";
          params.configurationId = "3";
          params.orgId = this.orgId;
          getorgIsHelp(params).then(res => {
            if (res != "0") {
              //否
              this.disWried = true;
            } else {
              this.disWried = false;
            }
          });
        }
      });

      this.masterState = row.stateCode;
      if (row.stateCode == "6") {
        this.Checked = true;
      }

      this.dialogStatus = "update";
      this.Checked = false;
      this.declarationId = row.declarationId;

      this.pageList.declarationId = row.declarationId;
      this.pageList.declarationTime = row.declarationTime;
      this.pageList.customerBatchCode = ""; //客户批次默认为空
      this.pageList.page = 1;
      this.getinlist();

      this.dialogEleDeclareVisible = true;
      //按钮disable方法###
      if (this.masterState == "6") {
        this.masterState1_btn = true;
        this.masterState_btn = true;
      } else if (this.masterState == "4") {
        this.masterState_btn = false;
        this.masterState1_btn = false;
      } else if (this.masterState == "1" || this.masterState == "5") {
        this.masterState_btn = false;
        this.masterState1_btn = false;
      } else {
        this.masterState_btn = true;
        this.masterState1_btn = true;
      }
      }
    },
    // 复选框点击
    selsChange(val) {
      let id = "";
      val.forEach(element => {
        id += "," + element.declarationId;
      });
      id = id.substring(1);
      this.sels = id;
      // #2740 2019-11-20 张亮三 增加状态数组delStatesArr用于存储每一次点击的状态
      let delStatesArr = [];
      val.forEach(element => {
        // #2740 2019-11-20 张亮三 增加状态数组用于存储每一次点击的状态
        delStatesArr.push(element.stateCode);
      });
      // #2740 2019-11-20 张亮三 判断当状态只有 “ 1 ” 时才能删除
      if (delStatesArr.includes("4") || delStatesArr.includes("6")) {
        this.delStates = false;
      } else {
        this.delStates = true;
      }
    },
    // 复选框点击
    selsChange1(val) {
      this.vParames = val;
      let id = "";
      val.forEach(element => {
        id += "," + element.detailId;
      });
      id = id.substring(1);
      this.sels1 = id;
      let state = true;
      let confirmBtn = true;
      val.forEach(element => {
        if (element.stateCode != "5") {
          state = false;
        }
        //  吴志超 2020年04月29日 修改 工单 #3967
        // 点击“确认”按钮，该组织的交易管理中企业参数“是否协助客户申报”参数值为“是”时，“未提交”、“待确认”状态的客户申报信息均可批量确认
        if (element.stateCode == "6") {
          confirmBtn = false;
        }
      });
      this.states = state;
      this.confirmBtn = confirmBtn;
    },
    //批量删除
    handleDeleteById() {
      if (this.sels != "" && this.sels != null) {
        if (this.delStates) {
          this.$confirm("此操作将永久删除, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }).then(() => {
            delObj(this.sels).then(() => {
              this.$notify({
                title: "成功",
                message: "删除成功",
                type: "success",
                duration: 2000
              });
              this.getList();
            });
          });
        } else {
          this.$alert("只有新增状态可删除", "消息提示", {
            type: "warning",
            confirmButtonText: "确定",
            callback: action => {}
          });
        }
      } else {
        this.$alert("请选择要删除项", "消息提示", {
          type: "warning",
          confirmButtonText: "确定",
          callback: action => {}
        });
      }
    },
    //行内删除
    handleDelete(row) {
      if (row.stateCode == "1") {
        this.$confirm("此操作将永久删除, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          delObj(row.declarationId).then(res => {
            if (res.rel) {
              this.$notify({
                title: "成功",
                message: "删除成功",
                type: "success",
                duration: 2000
              });
            } else {
              this.$notify({
                title: "提示",
                message: res.msg,
                type: "warning",
                duration: 2000
              });
            }

            this.getList();
            const index = this.list.indexOf(row);
            this.list.splice(index, 1);
          });
        });
      } else {
        this.$alert("只有新增状态可删除", "消息提示", {
          type: "warning",
          confirmButtonText: "确定",
          callback: action => {}
        });
      }
    },
    //导出功能
    handleExport() {
      let parme = {
        isCrossDistrict: "0",
        tradingCycle: this.listQuery.tradingCycle
      };
      exportObj(parme);
    },
    //导出功能(NEWS)
    InnerHandleExport() {
      let parme = {
        declarationId: this.declarationId
      };
      innerExportObj(parme);
    },
    //单独获取日期
    getAnnouncementDate(val) {
      this.announcementDate = val;
    },
    //获取交易期次
    getPeriodData(val) {
      this.tradePeriod = val;
    },
    //时间格式
    getTime(val) {
      if (val != null && val != "") {
        this.listQuery["declarationTime"] = parseTime(val, "{y}-{m}");
      }
    },
    //时间格式

    //时间格式
    getaddTime(val) {
      if (val != null && val != "") {
        this.addForm["tradingCycle"] = parseTime(val, "{y}-{m}");
      }
    },
    getaddTime1(val) {
      if (val != null && val != "") {
        this.addForm["declareStartTime"] = parseTime(
          val,
          "{y}-{m}-{d} {h}:{i}:{s}"
        );
      }
    },
    // 设置表格申报日期格式
    setDeclarationDate(val, row) {
      if (val != null && val != "") {
        this.sumList[
          row.index1 - (this.pageList.page - 1) * this.pageList.limit - 1
        ]["declarationDate"] = parseTime(val, "{y}-{m}-{d} {h}:{i}:{s}");
      }
    },
    getaddTime2(val) {
      if (val != null && val != "") {
        this.addForm["declareEndTime"] = parseTime(
          val,
          "{y}-{m}-{d} {h}:{i}:{s}"
        );
      }
    },
    //获取弹出框内的值
    getinlist() {
      this.upinfo();
      this.downinfo();
      this.filterForm.radio = "1";
      this.masterState_btn = false;
      this.masterState1_btn = false;
      this.dialogVisible = false;
      this.dialogEleDeclareVisible = true;
    },
    // 设置电量申报合计
    setSums(res) {
      this.listLoading1 = false;
      this.tableShow = true;
      if (res.rel) {
        //  this.listQuery.monthTotalElectricity = res.monthTotalElectricity;
        //  this.listQuery.dmonthDeclaredPowerSum= res.data.dmonthDeclaredPowerSum;
        //  this.listQuery.declarationElectricitySum= res.data.declarationElectricitySum;
        // 重新设置 已确认客户申报电量/本月申报电量合计 字段的值
        this.declarationConfirmElectricity =
          res.data.declarationConfirmElectricity;
        this.declarationElectricity = res.data.declarationElectricity;
      }
    },
    // 下部分分页
    downinfo1(parme, m) {
      this.sumList = [];
      this.listLoading1 = true;
      getDeatilPageById(this.pageList).then(res => {
        //  this.setSums(res);
        let items = res.data.resultData.data.rows.map((item, index) => {
          item.index1 =
            index + 1 + (this.pageList.page - 1) * this.pageList.limit;
          return item;
        });

        // let dataIndex = (this.pageList.page - 1) * this.pageList.limit + 1;
        // // this.sumList[m-dataIndex]=items[m-dataIndex];
        // this.$set(this.sumList, m - dataIndex, items[m - dataIndex]);
        this.sumList = items;
        let flag = 0;
        this.sumList.forEach(element => {
          if (element.stateCode == "6") {
            flag += 1;
          }
        });
        if (this.sumList.length == flag) {
          this.masterState_btn1 = true;
        }
        this.total1 = res.data.resultData.data.total;
      });
      this.getCulationSum();
    },

    downinfo() {
      this.listLoading1 = true;
      let parame = {};
      for (let key in this.pageList) {
        if (this.pageList[key] != "") {
          parame[key] = this.pageList[key];
        }
      }
      getDeatilPageById(parame).then(res => {
        //  this.setSums(res);
        if (res.rel) {
          // this.listQuery.declarationElectricitySum= res.data.declarationElectricitySum;
          let items = res.data.resultData.data.rows.map((item, index) => {
            item.index1 =
              index + 1 + (this.pageList.page - 1) * this.pageList.limit;
            return item;
          });
          this.sumList = items;
          let flag = 0;
          this.sumList.forEach(element => {
            if (element.stateCode == "6") {
              flag += 1;
            }
          });
          if (this.sumList.length == flag) {
            this.masterState_btn1 = true;
          }
          this.total1 = res.data.resultData.data.total;
          this.listLoading1 = false;
        } else {
          this.$notify({
            title: "提示",
            message: res.msg,
            type: "warning",
            duration: 2000
          });
        }
      });
      this.getCulationSum();
    },
    // #3937 2020-04-24 张亮三 已确认客户申报电量/本月申报电量合计 字段值查询方法 start
    getCulationSum() {
      let params = {
        declarationTime: this.pageList.declarationTime,
        declarationId: this.pageList.declarationId,
        customerBatchCode: this.pageList.customerBatchCode
      };
      getDeatilalculationSum(params)
        .then(res => {
          this.setSums(res);
        })
        .catch(err => {});
    },
    // #3937 2020-04-24 张亮三 已确认客户申报电量/本月申报电量合计 字段值查询方法 end
    // 上部分表单
    upinfo() {
      getDeclarationById({ declarationId: this.declarationId }).then(res => {
        this.listQuery.tradePeriod = res.declarationTime;
        // this.listQuery.declareTotalElectricity = res.declareTotalElectricity;
        this.listQuery["tradingCycleCode"] = res.stateName;
        this.declarationType = res.declarationType;
      });
    },

    downloadTemplateFile() {
      downloadImportTemplate("customerPage");
    },
    // 状态触发事件
    changeLabel(val) {
      if (val == "1") {
        val = "";
        this.masterState_btn1 = false;
      } else if (val == "2") {
        val = "2,7";
      }
      this.tableShow = false;
      let parme = {
        declarationId: this.declarationId,
        limit: 10,
        page: 1,
        stateCode: val
      };
      this.pageList.stateCode = parme.stateCode;
      this.downinfo();
    },
    //分页
    handleSizeChange1(val) {
      this.pageList.limit = val;
      this.downinfo();
    },
    handleCurrentChange1(val) {
      this.pageList.page = val;
      this.downinfo();
    },
    //清字段
    resetTemp() {
      this.Checked = false;
      this.dialogStatus == "";
      const set = this.$refs;
      set.listQueryForm.resetFields();
      // this.listQuery = {
      //   page: 1,
      //   limit: 10,
      //   tradingCycleCode: undefined //交易周期
      // };
    },
    // 下发
    Issued() {
      let parme = {
        declarationId: this.declarationId,
        stateCode: "4"
      };
      editState(parme).then(res => {
        if (res.rel) {
          this.$notify({
            title: "成功",
            message: "成功",
            type: "success",
            duration: 2000
          });
          let parme1 = { declarationId: this.declarationId };
          this.upinfo(parme1);
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
    submitSave() {
      this.saveLoading = true;
      editInfo(this.sumList).then(res => {
        if (res.rel) {
          this.saveLoading = false;
          this.$notify({
            title: "成功",
            message: "成功",
            type: "success",
            duration: 2000
          });
          let parme = {
            declarationId: this.declarationId,
            limit: 10,
            page: 1
          };
          this.downinfo(parme);
        } else {
          this.saveLoading = false;
          this.$notify({
            title: "提示",
            message: res.msg,
            type: "warning",
            duration: 2000
          });
        }
      });
    },
    cancel() {
      this.dialogEleDeclareVisible = false;
      //2019年11月20日19:40:17 李志佳 #2741 查看不可点
      this.noEdit = false;
      this.getList();
    },
    UNhandlePassState(row) {
      this.masterState_btn = false;
      let parme = {
        detailId: row.detailId,
        stateCode: "5",
        //20191125 #2767 wangc  有无户表号状态
        declarationId: this.declarationId
      };
      this.passStat1(parme, row);
    },
    // 上报
    Report() {
      let parme = {
        declarationId: this.declarationId
      };
      getStatusToReport(parme).then(res => {
        if (res.rel) {
          if (res.data) {
            let parme = {
              declarationId: this.declarationId,
              stateCode: "6"
            };
            updateReportStatus(parme).then(res => {
              if (res.rel) {
                this.$notify({
                  title: "成功",
                  message: "成功",
                  type: "success",
                  duration: 2000
                });
                this.getList();
                this.dialogEleDeclareVisible = false;
                // let parme1 = { declarationId: this.declarationId };
                // this.upinfo(parme1);
              } else {
                this.$notify({
                  title: "提示",
                  message: res.msg,
                  type: "warning",
                  duration: 2000
                });
              }
            });
          } else {
            this.$notify({
              title: "提示",
              message: res.msg,
              type: "warning",
              duration: 2000
            });
          }
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
    //====================================================================================================================
    //  行内 确认按钮方法
    handlePassState(row) {
      checkData(row).then(res => {
        if (!res.rel) {
          this.$confirm("超过往期申报电量最大日值范围，是否确认?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }).then(() => {
            let flag = false;
            row.stateCode = "6";
            if (row.declarationDate == null) {
              row.declarationDate = parseTime(
                new Date(),
                "{y}-{m}-{d} {h}:{i}:{s}"
              );
            }
            if (!this.disWried) {
              if (row.stateCode == "5" || row.stateCode == "2") {
                flag = true;
              }
            } else {
              if (row.stateCode == "5") {
                flag = true;
              }
            }
            if ((flag = true)) {
              // let parme = {
              //   detailId: row.detailId,
              //   stateCode: "6",
              //   adjustCause: row.adjustCause,
              //   adjustElectricity: row.adjustElectricity,
              // };
              let parme = row;

              if (typeof row.declarationDate == "object") {
                parme.declarationDate = parseTime(
                  row.declarationDate,
                  "{y}-{m}-{d} {h}:{i}:{s}"
                );
              } else {
                if (typeof row.declarationDate == "string") {
                  if (row.declarationDate.length < 16) {
                    parme.declarationDate = row.declarationDate + " 00:00:00";
                  }
                }
              }
              this.passState(parme, row);
            } else {
              this.$alert("待确认状态才可以确认", "消息提示", {
                type: "warning",
                confirmButtonText: "确定",
                callback: action => {}
              });
            }
          });
        } else {
          let flag = false;
          row.stateCode = "6";
          if (row.declarationDate == null) {
            row.declarationDate = parseTime(
              new Date(),
              "{y}-{m}-{d} {h}:{i}:{s}"
            );
          }
          if (!this.disWried) {
            if (row.stateCode == "5" || row.stateCode == "2") {
              flag = true;
            }
          } else {
            if (row.stateCode == "5") {
              flag = true;
            }
          }
          if ((flag = true)) {
            // let parme = {
            //   detailId: row.detailId,
            //   stateCode: "6",
            //   adjustCause: row.adjustCause,
            //   adjustElectricity: row.adjustElectricity,
            // };
            let parme = row;

            if (typeof row.declarationDate == "object") {
              parme.declarationDate = parseTime(
                row.declarationDate,
                "{y}-{m}-{d} {h}:{i}:{s}"
              );
            } else {
              if (typeof row.declarationDate == "string") {
                if (row.declarationDate.length < 16) {
                  parme.declarationDate = row.declarationDate + " 00:00:00";
                }
              }
            }
            this.passState(parme, row);
          } else {
            this.$alert("待确认状态才可以确认", "消息提示", {
              type: "warning",
              confirmButtonText: "确定",
              callback: action => {}
            });
          }
        }
      });
    },
    passStat1(parme, row) {
      this.masterState_btn1 = false;
      this.stateCode = parme.stateCode;
      let oldData = Object.assign([], this.sumList);
      editAllState(parme).then(res => {
        if (res.rel) {
          this.$notify({
            title: "成功",
            message: "成功",
            type: "success",
            duration: 2000
          });
          let parme = {
            declarationId: this.declarationId,
            declarationTime: this.pageList.declarationTime,
            limit: 10,
            page: 1
          };
          if (this.stateCode == "6") {
            getDeatilPageById(parme).then(res => {
              //  this.setSums(res);
              res.data.resultData.data.rows.forEach((item, index) => {
                if (item.detailId == row.detailId) {
                  oldData[index] = item;
                  oldData[index]["index1"] = index + 1;
                }
              });
              this.sumList = oldData;
              let flag = 0;
              this.sumList.forEach(element => {
                if (element.stateCode == "6") {
                  flag += 1;
                }
              });
              if (this.sumList.length == flag) {
                this.masterState_btn1 = true;
              }
            });
            this.getCulationSum();
          } else {
            this.downinfo1(parme, row.index1);
          }
          let parme1 = { declarationId: this.declarationId };
          this.upinfo(parme1);
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
    passState(parme, row) {
      this.masterState_btn1 = false;
      this.stateCode = parme.stateCode;
      //20191125 #2767 wangc  有无户表号状态
      parme.declarationId = this.declarationId;
      let oldData = Object.assign([], this.sumList);
      editAllState(parme).then(res => {
        if (res.rel) {
          this.$notify({
            title: "成功",
            message: "成功",
            type: "success",
            duration: 2000
          });
          let parme = {
            declarationId: this.declarationId,
            declarationTime: this.pageList.declarationTime,
            limit: 10,
            page: 1
          };
          if (this.stateCode == "6") {
            getDeatilPageById(parme).then(res => {
              //  this.setSums(res);
              res.data.resultData.data.rows.forEach((item, index) => {
                if (item.detailId == row.detailId) {
                  oldData[index] = item;
                  oldData[index]["index1"] = index + 1;
                }
              });
              // this.sumList = oldData;
              let dataIndex =
                (this.pageList.page - 1) * this.pageList.limit + 1;
              this.$set(
                this.sumList,
                row.index1 - dataIndex,
                oldData[row.index1 - dataIndex]
              );
              let flag = 0;
              this.sumList.forEach(element => {
                if (element.stateCode == "6") {
                  flag += 1;
                }
              });
              if (this.sumList.length == flag) {
                this.masterState_btn1 = true;
              }
            });
            this.getCulationSum();
          } else {
            this.downinfo(parme);
          }
          let parme1 = { declarationId: this.declarationId };
          this.upinfo(parme1);
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
    // 行内驳回
    handleRejectState(row) {
      if (row.stateCode == "5") {
        let parme = {
          detailId: row.detailId,
          stateCode: "7"
        };
        this.passState(parme);
      } else {
        this.$alert("待确认状态才可以驳回", "消息提示", {
          type: "warning",
          confirmButtonText: "确定",
          callback: action => {}
        });
      }
    },

    //====================================================================================================================
    // 确认

    //  吴志超 2020年04月29日 修改 工单 #3967
    // 点击“确认”按钮，该组织的交易管理中企业参数“是否协助客户申报”参数值为“是”时，“未提交”、“待确认”状态的客户申报信息均可批量确认
    confirm() {
      if (this.sels1 != "" && this.sels1 != null) {
        // 待确认 如果批量选择选择的都是待确认状态 直接走确认
        if (this.states) {
          // let parme = {
          //   detailId: this.sels1,
          //   stateCode: "6"
          //   // adjustCause: val.adjustCause,
          //   // adjustElectricity: val.adjustElectricity
          // };
          this.vParames.forEach(element => {
            element.stateCode = "6";
          });
          this.rejectState(this.vParames);
          let parme1 = { declarationId: this.declarationId };
          this.upinfo(parme1);
        } else {
          // 判断所选数据中是否存在“已确认”的数据
          if (this.confirmBtn) {
            //  否调取 “企业参数中” “交易参数设置”的参数名称为“是否协助客户申报”的值
            getBatchFlag({
              configurationId: "3",
              parameterCode: "1030001"
            }).then(res => {
              // 如果值为是则直接走确认
              if (res === 0) {
                this.vParames.forEach(element => {
                  element.stateCode = "6";
                });
                this.rejectState(this.vParames);
                let parme1 = { declarationId: this.declarationId };
                this.upinfo(parme1);
              } else {
                // 否则提示
                this.$alert("请选择待确认状态", "消息提示", {
                  type: "warning",
                  confirmButtonText: "确定",
                  callback: action => {}
                });
              }
            });
          } else {
            this.$alert(
              "当前选择存在“已确认”数据，请检查所选数据！",
              "消息提示",
              {
                type: "warning",
                confirmButtonText: "确定",
                callback: action => {}
              }
            );
          }
        }
      } else {
        this.$alert("请选择要确认项", "消息提示", {
          type: "warning",
          confirmButtonText: "确定",
          callback: action => {}
        });
      }
    },

    handleCancelConfirm(row) {
      let parme = {
        declarationId: row.declarationId,
        stateCode: "4"
      };
      updateReportStatus(parme).then(res => {
        if (res.rel) {
          this.$notify({
            title: "成功",
            message: "成功",
            type: "success",
            duration: 2000
          });
        } else {
          this.$notify({
            title: "提示",
            message: res.msg,
            type: "warning",
            duration: 2000
          });
        }
        this.getList();
      });
    },
    rejectState(parmes) {
      //20191125 #2767 wangc  有无户表号状态
      parmes.declarationId = this.declarationId;
      editInfo(parmes).then(res => {
        if (res.rel) {
          this.$notify({
            title: "成功",
            message: "成功",
            type: "success",
            duration: 2000
          });
          let parme = {
            declarationId: this.declarationId,
            limit: 10,
            page: 1
          };
          this.downinfo(parme);
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
    // 驳回
    reject() {
      if (this.sels1 != "" && this.sels1 != null) {
        if (this.states) {
          var parmeArr = [];
          if (this.sels1.indexOf(",") != -1) {
            this.sels1 = this.sels1.split(",");
            this.sels1.forEach(item => {
              parmeArr.push({ detailId: item, stateCode: "7" });
            });
          } else {
            this.sels1 = this.sels1;
            parmeArr.push({ detailId: this.sels1, stateCode: "7" });
          }
          // let parme = {
          //   detailId: this.sels1,
          //   stateCode: "7"
          // };
          this.rejectState(parmeArr);
          let parme1 = { declarationId: this.declarationId };
          this.upinfo(parme1);
        } else {
          this.$alert("请选择待确认状态", "消息提示", {
            type: "warning",
            confirmButtonText: "确定",
            callback: action => {}
          });
        }
      } else {
        this.$alert("请选择要驳回项", "消息提示", {
          type: "warning",
          confirmButtonText: "确定",
          callback: action => {}
        });
      }
    },
    /**
     * @方法名称:获取客户批次
     * @功能描述:
     * @参数:
     * @返回值:
     * @作者: gaoaining
     * @Date: 2019-12-30 14:33:49
     * @最新修改内容:
     * @LastEditTime:
     */
    changeBatch(val) {
      this.pageList.customerBatchCode = val;
      this.declarationElectricity = "";
      this.declarationConfirmElectricity = "";
      this.downinfo();
    },
    /**
     * @方法名称:
     * @功能描述: #3389 获取客户批次参数是否被设置
     * @参数:
     * @返回值:
     * @作者: gaoaining
     * @Date: 2020-01-02 14:26:16
     * @最新修改内容:
     * @LastEditTime:
     */
    getBatchFlag() {
      let params = {};
      params.configurationId = "3";
      params.parameterCode = "1030011";
      getBatchFlag(params).then(res => {
        if (res != "0") {
          this.batchFlag = false;
        } else {
          this.batchFlag = true;
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.titleName {
  float: right;
  font-weight: bold;
  font-size: 14px;
}
.filter-items {
  display: inline-block;
  vertical-align: middle;
  margin-bottom: -10px;
}
</style>

