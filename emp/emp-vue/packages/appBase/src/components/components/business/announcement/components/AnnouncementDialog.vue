<!--
 * @功能描述: 
 * @版本: 
 * @作者: 
 * @Date: 2019-10-08 10:08:13
 * @最新修改内容: 
 * @LastEditTime: 2020-06-18 17:35:37
 -->
<template>
  <div class="app-container calendar-list-container">
    <!-- 弹窗 -->
    <el-dialog
      v-drag
      :close-on-click-modal="false"
      custom-class="w800"
      :title="dialogInfo.title"
      :visible.sync="dialogVisible"
      :modal-append-to-body="false"
    >
      <!-- v-loading="saveLoading" -->
      <!--2019-11-11 #2620 张朋 弹框自适应高度赋值 -->
      <!-- 2019年11月19日14:33:18 #2725 李志佳 交易公告弹窗表单优化 -->
      <div :style="{paddingRight:'10px',height:dialogHeight+'px'}">
        <el-scrollbar>
          <el-form
            :model="announcementForm"
            :rules="announcementFormRules"
            ref="announcementForm"
            label-width="120px"
          >
            <el-form-item label="交易序列名称" prop="noticeName">
              <!-- <el-autocomplete -->
              <el-input
                style="width:98%"
                class="inline-input"
                v-model="announcementForm.noticeName"
                :disabled="dialogInfo.notEdit"
                :clearable="true"
                placeholder="请输入交易序列"
              ></el-input>
              <!-- placement="bottom"
              :trigger-on-focus="false"
              :fetch-suggestions="querySearch"
              @select="handleSelect"-->
              <!-- </el-autocomplete> -->
            </el-form-item>
            <el-row>
              <el-col :span="12">
                <el-form-item label="交易中心" prop="tradeCenterName">
                  <el-select
                    v-model="announcementForm.tradeCenterName"
                    :disabled="dialogInfo.notEdit"
                    style="width:96%"
                    placeholder="请选择"
                    :clearable="true"
                    @change="getVariety"
                  >
                    <el-option
                      v-for="(item, index) in tradeCenters"
                      :key="index"
                      :label="item.jyorgName"
                      :value="item.jyorgName"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="公告日期" prop="noticeDate">
                  <el-date-picker
                    class="datetime"
                    style="width:96%"
                    :clearable="true"
                    v-model="announcementForm.noticeDate"
                    type="date"
                    placeholder="请选择"
                    :disabled="dialogInfo.notEdit"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="交易品种" prop="tradeVarietyCode">
                  <el-select
                    v-model="announcementForm.tradeVarietyCode"
                    :disabled="dialogInfo.notEdit"
                    style="width:96%"
                    :clearable="true"
                    placeholder="请选择"
                    @change="changeTradeVarietyCode"
                  >
                    <el-option
                      v-for="(item, index) in tradeVarietysCom"
                      :key="index"
                      :label="item.propName"
                      :value="item.propCode"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <!-- 2019年11月21日09:42:22 李志佳 #2727 添加交易子类下拉框 start -->
                <el-form-item label="交易子类" prop="subclassesCode">
                  <el-select
                    v-model="announcementForm.subclassesCode"
                    :disabled="dialogInfo.notEdit"
                    style="width:96%"
                    :clearable="true"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="(item, index) in subclasses"
                      :key="index"
                      :label="item.propName"
                      :value="item.propCode"
                    ></el-option>
                  </el-select>
                </el-form-item>

                <!-- 2019年11月21日09:42:22 李志佳 #2727 添加交易子类下拉框 end -->
                <el-form-item label="交易周期" prop="tradeCycleCode">
                  <el-select
                    v-model="announcementForm.tradeCycleCode"
                    :disabled="dialogInfo.notEdit"
                    style="width:96%"
                    @change="changeTradeCycle"
                    :clearable="true"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="(item, index) in tradeCycles"
                      :key="index"
                      :label="item.propName"
                      :value="item.propCode"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <!-- 2019年11月21日09:42:22 李志佳 #2727 添加交易方式对出清方式的筛选 -->
                <el-form-item label="交易方式" prop="tradeWayCode">
                  <el-select
                    v-model="announcementForm.tradeWayCode"
                    :disabled="dialogInfo.notEdit"
                    style="width:96%"
                    :clearable="true"
                    placeholder="请选择"
                    @change="changeSub"
                  >
                    <el-option
                      v-for="(item, index) in newTradeWays"
                      :key="index"
                      :label="item.fpjyfsName"
                      :value="item.fpjyfs"
                    ></el-option>
                  </el-select>
                </el-form-item>

                <!-- 2019年11月21日09:42:22 李志佳 #2727 添加出清方式下拉框 start -->
                <!-- 李志佳 修改必填验证 2020年1月2日10:27:15-->
                <span v-if="!noclear">
                  <el-form-item label="出清方式" prop="clearModeCode">
                    <el-select
                      v-model="announcementForm.clearModeCode"
                      :disabled="dialogInfo.notEdit || noclear"
                      style="width:96%"
                      :clearable="true"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="(item, index) in clearings"
                        :key="index"
                        :label="item.propName"
                        :value="item.propCode"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </span>
                <span v-else>
                  <el-form-item label="出清方式" prop="nocheck">
                    <el-select
                      v-model="announcementForm.clearModeCode"
                      :disabled="dialogInfo.notEdit || noclear"
                      style="width:96%"
                      :clearable="true"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="(item, index) in clearings"
                        :key="index"
                        :label="item.propName"
                        :value="item.propCode"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </span>
                <!-- 2019年11月21日09:42:22 李志佳 #2727 添加出清方式下拉框 end -->

                <el-form-item label="交易期次" prop="tradeIssure">
                  <!-- <el-input
                  v-model="announcementForm.tradeIssure"
                  :disabled="dialogInfo.notEdit"
                  class="w180"
                  placeholder="请输入交易期次"
                  ></el-input>-->

                  <!-- <el-input v-model="listQuery.tradingTime" placeholder="请输入交易期次"></el-input> -->
                  <el-date-picker
                    v-if="announcementForm.tradeCycleCode == ''"
                    type="year"
                    style="width:96%"
                    :clearable="true"
                    placeholder="选择年"
                    disabled
                  ></el-date-picker>
                  <el-date-picker
                    v-if="announcementForm.tradeCycleCode == 'jyzq01'"
                    v-model="tradeIssureData.yearData"
                    type="year"
                    style="width:96%"
                    placeholder="选择年"
                    :clearable="true"
                    @change="setTradeIssure"
                    :disabled="dialogInfo.notEdit"
                  ></el-date-picker>
                  <el-date-picker
                    v-if="announcementForm.tradeCycleCode == 'jyzq02'"
                    v-model="tradeIssureData.yearData"
                    type="year"
                    @change="setTradeIssure"
                    style="width:48%;float:left;"
                    placeholder="选择年"
                    :clearable="true"
                    :disabled="dialogInfo.notEdit"
                  ></el-date-picker>
                  <el-date-picker
                    @change="setTradeIssure"
                    v-if="announcementForm.tradeCycleCode == 'jyzq03'"
                    v-model="tradeIssureData.monthData"
                    type="month"
                    placeholder="选择月"
                    :clearable="true"
                    style="width:96%"
                    :disabled="dialogInfo.notEdit"
                  ></el-date-picker>
                  <el-date-picker
                    @change="setTradeIssure"
                    v-if="announcementForm.tradeCycleCode == 'jyzq04'"
                    v-model="tradeIssureData.tradeBeginMonth"
                    type="month"
                    placeholder="选择月"
                    :clearable="true"
                    style="width:45%;float:left;"
                    :disabled="dialogInfo.notEdit"
                  ></el-date-picker>
                  <div
                    v-if="announcementForm.tradeCycleCode == 'jyzq04'"
                    style="width:6%;float:left;"
                  >至</div>
                  <el-date-picker
                    @change="setTradeIssure"
                    v-if="announcementForm.tradeCycleCode == 'jyzq04'"
                    v-model="tradeIssureData.tradeEndMonth"
                    type="month"
                    placeholder="选择月"
                    :clearable="true"
                    style="width:45%;float:left;"
                    :disabled="dialogInfo.notEdit"
                  ></el-date-picker>
                  <el-date-picker
                    @change="setTradeIssure"
                    v-if="announcementForm.tradeCycleCode == 'jyzq05'"
                    v-model="tradeIssureData.tradeBeginMonth"
                    type="month"
                    placeholder="选择月"
                    :clearable="true"
                    style="width:45%;float:left;"
                    :disabled="dialogInfo.notEdit"
                  ></el-date-picker>
                  <div
                    v-if="announcementForm.tradeCycleCode == 'jyzq05'"
                    style="width:6%;float:left;"
                  >至</div>
                  <el-date-picker
                    @change="setTradeIssure"
                    v-if="announcementForm.tradeCycleCode == 'jyzq05'"
                    v-model="tradeIssureData.tradeEndMonth"
                    type="month"
                    placeholder="选择月"
                    :clearable="true"
                    style="width:45%;float:left;"
                    :disabled="dialogInfo.notEdit"
                  ></el-date-picker>

                  <el-select
                    @change="setTradeIssure"
                    v-if="announcementForm.tradeCycleCode == 'jyzq02'"
                    style="width:48%;float:left;"
                    :clearable="true"
                    v-model="tradeIssureData.quarter"
                    placeholder="季度"
                    :disabled="dialogInfo.notEdit"
                  >
                    <el-option
                      v-for="item in quarterOptions"
                      :key="item.propCode"
                      :label="item.propName"
                      :value="item.propCode"
                    ></el-option>
                  </el-select>
                  <!-- 2019-11-01 #2452 wangc 新增周选择项 start-->
                  <el-date-picker
                    @change="setTradeIssure"
                    v-if="announcementForm.tradeCycleCode == 'jyzq06'"
                    v-model="tradeIssureData.monthData"
                    type="month"
                    placeholder="选择月"
                    :clearable="true"
                    style="width:48%;float:left;"
                    :disabled="dialogInfo.notEdit"
                  ></el-date-picker>
                  <el-select
                    @change="setTradeIssure"
                    v-if="announcementForm.tradeCycleCode == 'jyzq06'"
                    style="width:48%;float:left;"
                    :clearable="true"
                    v-model="tradeIssureData.weekData"
                    placeholder="周"
                    :disabled="dialogInfo.notEdit"
                  >
                    <el-option
                      v-for="item in weekOptions"
                      :key="item.propCode"
                      :label="item.propName"
                      :value="item.propCode"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <!-- 2019-11-01 #2452 wangc 新增周选择项 end-->
              </el-col>
            </el-row>

            <el-form-item label="报价方式" prop="quotationMethod">
              <el-select
                v-model="announcementForm.quotationMethod"
                :disabled="dialogInfo.notEdit"
                style="width:39%"
                :clearable="true"
                placeholder="请选择"
              >
                <el-option
                  v-for="(item, index) in methodOptions"
                  :key="index"
                  :label="item.propName"
                  :value="item.propCode"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-row>
              <el-col :span="12">
                <!-- 2019-11-01 #2452 wangc 新增字段-->
                <!--2019-11-12 #2490 张朋 能源类型、公告批次、用户群体添加点击事件 -->
                <el-form-item label="能源类型" prop="energyType">
                  <el-select
                    v-model="announcementForm.energyType"
                    :disabled="dialogInfo.notEdit"
                    style="width:96%"
                    :clearable="true"
                    @change="energyTypeChange"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="(item, index) in energyTypeOptions"
                      :key="index"
                      :label="item.propName"
                      :value="item.propCode"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="公告批次" prop="noticeBatch">
                  <el-select
                    v-model="announcementForm.noticeBatch"
                    :disabled="dialogInfo.notEdit"
                    style="width:96%"
                    :clearable="true"
                    @change="noticeBatchChange"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="(item, index) in noticeBatchOptions"
                      :key="index"
                      :label="item.propName"
                      :value="item.propCode"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <!-- 2019-11-01 #2452 wangc 新增字段-->
                <el-form-item label="报价开始时间从" prop="quotationEndTime">
                  <el-date-picker
                    type="datetime"
                    style="width:96%"
                    :disabled="dialogInfo.notEdit"
                    v-model="announcementForm.quotationEndTime"
                    placeholder="选择日期"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    format="yyyy-MM-dd HH:mm:ss"
                    tyle="width:185px ;"
                  ></el-date-picker>
                </el-form-item>
                <el-form-item label="交易规模" prop="tradeScale">
                  <el-input
                    v-model="announcementForm.tradeScale"
                    :disabled="dialogInfo.notEdit"
                    type="number"
                    class="dw"
                    :clearable="true"
                    placeholder
                    style="width:55%"
                  ></el-input>
                  <span align="right">{{units.electricityUnit}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <!-- 2019-11-01 #2452 wangc 新增用户群体字段 start-->
                <el-form-item label="用户群体" prop="userGroup">
                  <el-select
                    v-model="announcementForm.userGroup"
                    :disabled="dialogInfo.notEdit"
                    style="width:96%"
                    :clearable="true"
                    @change="userGroupChange"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="(item, index) in userGroupOptions"
                      :key="index"
                      :label="item.propName"
                      :value="item.propCode"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <!-- 2019-11-01 #2452 wangc 新增用户群体字段 end-->
                <!-- 2019-11-01 #2452 wangc 新增批次备注字段 start-->
                <el-form-item label="批次备注" prop="batchDesc">
                  <!-- 2019-11-011 #2633 康如涛 去掉批次备注数值类型限制 start-->
                  <el-input
                    v-model="announcementForm.batchDesc"
                    :disabled="dialogInfo.notEdit"
                    class="dw"
                    style="width:96%"
                    :clearable="true"
                    placeholder
                  ></el-input>
                  <!-- 2019-11-11 #2633 康如涛 去掉批次备注数值类型限制 end-->
                </el-form-item>
                <!-- 2019-11-01 #2452 wangc 新增批次备注字段 end-->
                <el-form-item label="至" prop="quotationStartTime">
                  <el-date-picker
                    type="datetime"
                    v-model="announcementForm.quotationStartTime"
                    placeholder="选择日期"
                    :disabled="dialogInfo.notEdit"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    format="yyyy-MM-dd HH:mm:ss"
                    tyle="width:185px ;"
                    style="width:96%"
                  ></el-date-picker>
                </el-form-item>
                <el-form-item
                  label="联络线路"
                  prop="tieLineId"
                  :rules="isJypz02?[{ required: true, message: '请选择联络线路', trigger: 'change' }]:[{ required: false, message: '', trigger: 'change' }]"
                >
                  <el-select
                    v-model="announcementForm.tieLineId"
                    :disabled="dialogInfo.notEdit"
                    style="width:96%"
                    :clearable="true"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="(item, index) in liaisonLine"
                      :key="index"
                      :label="item.tieLineName"
                      :value="item.tieLineId"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-form-item label="上传附件">
                  <!--                 
                <el-upload
                  :class="!uploadBtn ? 'hidden' : 'show'"
                  ref="uploadFileAdd"
                  action="/api/business/tradeNotice/uploadFile"
                  :headers="uplaodHeaders"
                  :auto-upload="false"
                  :limit="limit_number"
                  :show-file-list="false"
                  :multiple="false"
                  :on-change="uploadChange"
                  :on-success="uploadSuccess"
                  :on-error="uploadErr"
                  :before-upload="uploadBefore"
                >
                  <el-button slot="trigger" size="small" type="primary" v-if="uploadBtn">选取文件</el-button>
                  </el-upload>-->
                  <el-upload
                    :class="!dialogInfo.notEdit?'upload-demo':'upload-demo views'"
                    ref="uploadFileAdd"
                    action="/api/business/tradeNotice/uploadFile"
                    :show-file-list="show_file_name"
                    :limit="limit_number"
                    :multiple="true"
                    :headers="uplaodHeaders"
                    :auto-upload="false"
                    :file-list="myFileList"
                    :before-upload="handleBefore"
                    :on-change="handleChange"
                    :on-success="uploadSuccess"
                    :on-error="uploadErr"
                    :on-exceed="handleExceed"
                    :on-remove="handleRemove"
                    :on-preview="handlePreview"
                    style="width:98%"
                  >
                    <el-button
                      v-if="!dialogInfo.notEdit"
                      slot="trigger"
                      size="small"
                      type="primary"
                    >选取文件</el-button>
                  </el-upload>
                </el-form-item>
                <el-form-item label="备注">
                  <el-input
                    style="width:98%"
                    v-model="announcementForm.remakes"
                    :disabled="dialogInfo.notEdit"
                    placeholder
                    rows="4"
                    type="textarea"
                    :maxlength="400"
                    @input="visitSituationInput"
                    :autosize="false"
                  ></el-input>
                  <span class="validateText">{{ visitSituationFormRemnant }}/400</span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-scrollbar>
      </div>
      <div slot="footer" class="dialog-footer">
        <!--2019-11-6 #2490 张朋  修改按钮 -->
        <el-button
          style="float:left"
          v-if="this.modificationRecordState"
          @click="handlechangesRecord"
        >修改记录</el-button>
        <!--2019-11-5 #2489 张朋 保存按钮显示状态-->
        <!-- #3885 gaoaining 2020-04-09 防止网络不好多次点击按钮保存问题(添加saveBtnLoading)  start-->
        <el-button
          class="save-btn"
          :loading="saveBtnLoading"
          v-if="dialogInfo.btnSave && this.submitState==true"
          @click="save('11')"
        >保存</el-button>
        <el-button
          class="submit-btn"
          :loading="saveBtnLoading"
          v-if="dialogInfo.btnSubmit"
          @click="save('3')"
        >提交</el-button>
        <el-button class="cancel-btn" @click="dialogVisible = false">取 消</el-button>
        <!-- #3885 gaoaining 2020-04-09 防止网络不好多次点击按钮保存问题(添加saveBtnLoading)  end-->
      </div>
    </el-dialog>
    <el-dialog
      v-drag
      :close-on-click-modal="false"
      title="查看文件"
      :visible.sync="viewsDialog"
      custom-class="w800"
      :lock-scroll="true"
    >
      <el-row>
        <el-col :span="24">
          <Views :pdfUrl="pdfUrl" ref="views"></Views>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer" align="right">
        <el-button class="btn-save" @click="closeModal">确 定</el-button>
      </div>
    </el-dialog>
    <!--2019-11-7 #2490  张朋  修改记录组件 -->
    <adjustmentRecord ref="adjustmentRecord" :unitMap="unitMap"></adjustmentRecord>
  </div>
</template> 
<script>
import {
  addObj,
  putObj,
  getListByNoticeName,
  tMdataJyorg,
  getTradeWay
} from "@common/api/business/announcement/index";
import txt from "@common/assets/icons/txt.png";
import word from "@common/assets/icons/word.png";
import pdf from "@common/assets/icons/pdf.png";
import { getSelectList, downloadOneFile } from "@common/api/base";
import { mapGetters } from "vuex";
//2019-11-11 #2620 张朋 引用弹框自适应路径
import { parseTime, initDialogHeight } from "@common/utils/index";
import { getToken } from "@common/utils/auth";
export default {
  name: "AnnouncementDialog",
  components: {
    Views: () =>
      import("@common/components/marketingSystem/policyDocument/components/Views"),
    //2019-11-7 #2490 张朋 修改记录页面路径
    adjustmentRecord: () => import("./adjustmentRecord")
  },
  props: {
    btns: { type: Object },
    dialogInfo: { type: Object },
    tradeCenters: { type: Array },
    tradeVarietys: { type: Array },
    tradeWays: { type: Array },
    tradeCycles: { type: Array },
    quarterOptions: { type: Array },
    liaisonLine: { type: Array },
    myOrgId: { type: String },
    lastOrgId: { type: String },
    unitMap: { type: Object }
  },
  data() {
    const validateTradeIssure = (rule, value, callback) => {
      if (this.announcementForm.tradeCycleCode == "jyzq01") {
        if (this.tradeIssureData.yearData == "") {
          callback(new Error("请选择交易期次"));
        } else {
          callback();
        }
      } else if (this.announcementForm.tradeCycleCode == "jyzq02") {
        if (
          this.tradeIssureData.yearData == "" ||
          this.tradeIssureData.quarter == ""
        ) {
          callback(new Error("请选择交易期次"));
        } else {
          callback();
        }
      } else if (this.announcementForm.tradeCycleCode == "jyzq03") {
        if (this.tradeIssureData.monthData == "") {
          callback(new Error("请选择交易期次"));
        } else {
          callback();
        }
      } else if (this.announcementForm.tradeCycleCode == "jyzq04") {
        if (
          this.tradeIssureData.tradeEndMonth === "" &&
          this.tradeIssureData.tradeBeginMonth === ""
        ) {
          callback(new Error("请选择交易期次"));
        } else {
          callback();
        }
      } else if (this.announcementForm.tradeCycleCode == "jyzq05") {
        if (
          this.tradeIssureData.tradeEndMonth == "" &&
          this.tradeIssureData.tradeBeginMonth == ""
        ) {
          callback(new Error("请选择交易期次"));
        } else {
          callback();
        }
        //#2453 交易周期字段下拉框中增加周、交易期次字段下拉框中增加选择周 wangc
      } else if (this.announcementForm.tradeCycleCode == "jyzq06") {
        if (
          this.tradeIssureData.monthData == "" &&
          this.tradeIssureData.weekData == ""
        ) {
          callback(new Error("请选择交易期次"));
        } else {
          callback();
        }
      }
    };
    const quotationEndTime = (rule, value, callback) => {
      var end = new Date(value).getTime();
      var start = new Date(this.announcementForm.quotationEndTime).getTime();
      if (end <= start) {
        callback(new Error("结束时间大于开始时间"));
      } else {
        callback();
      }
    };
    return {
      saveBtnLoading: false, //保存加载
      isJypz02: false, //交易品种是否为跨省
      subclasses: [], //交易子类维度
      clearings: [], //出清方式维度
      newTradeWays: [], //筛选后交易方式维度
      tradeCenterTemp: [], //临时交易中心数据
      filterVar: [],
      noclear: true,
      // lsTradeCycleCode
      tradeIssureData: {
        quarter: "",
        monthData: "",
        yearData: "",
        tradeEndMonth: "",
        tradeBeginMonth: "",
        weekData: ""
      },
      dialogHeight: "", //2019-11-11 #2620 张朋 弹框获取自适应高度数据
      modificationRecordState: false, //2019-11-6 #2490 张朋  修改按钮
      submitState: true, //2019-11-6 #2490 张朋 保存按钮初始化是否显示
      weekOptions: [],
      energyTypeOptions: [],
      methodOptions: [],
      userGroupOptions: [],
      noticeBatchOptions: [],
      uploadSuccessCb: false,
      saveLoading: "",
      pdfUrl: "",
      viewsDialog: false,
      myFileList: [],
      isUpload: false,
      changeFileList: [],
      show_file_name: true,
      limit_number: 10,
      uplaodHeaders: "",
      file_rode: false,
      uploadBtn: true,
      dialogVisible: false,
      fileInfo: { path: "", name: "" },
      dialogInfoData: this.dialogInfo,
      announcementForm: {
        noticeId: "",
        noticeName: "", //交易序列名称
        tradeCenterId: "", //交易中心
        tradeCenterName: "", //交易中心
        tradeVarietyCode: "", //交易品种
        tradeVarietyName: "", //交易品种
        subclassesCode: "", //交易子类
        subclassesName: "",
        clearModeCode: "", //出清方式
        clearModeName: "",
        tradeCycleCode: "", //交易周期
        quotationMethod: "", //报价方式
        tradeCycleName: "", //交易周期
        tradeIssure: "", //交易期次
        tradeScale: "", //交易规模
        tradeWayCode: "", //交易方式代码
        tradeWayName: "", //交易方式
        tieLineId: "", //联络线路
        batchDesc: "", //批次备注
        noticeBatch: "", //公告批次
        noticeBatchName: "", //2019-11-9 #2490 张朋 公告批次名称
        userGroup: "", //用户群体
        userGroupName: "", //2019-11-8 #2490 张朋  用户群体名称
        energyType: "", //能源类型
        energyTypeName: "", //2019-11-9 #2490 张朋 能源类型名称
        enclosure: "",
        remakes: "",
        noticeDate: "",
        quotationEndTime: "", //时间开始
        quotationStartTime: "", //时间结束
        tradeEndMonth: "",
        tradeBeginMonth: ""
      },
      units: this.unitMap,
      noticeId: "",
      state: "",
      announcementFormRules: {
        //验证结束时间
        quotationStartTime: [
          {
            required: false,
            validator: quotationEndTime
          }
        ],
        tradeCenterName: [
          {
            required: true,
            message: "请选择交易中心",
            trigger: "change"
          }
        ],
        noticeDate: [
          {
            required: true,
            message: "请选择公告日期",
            trigger: "change"
          }
        ],
        tradeVarietyCode: [
          {
            required: true,
            message: "请选择交易品种",
            trigger: "change"
          }
        ],
        clearModeCode: [
          {
            required: true,
            message: "请选择出清方式",
            trigger: "change"
          }
        ],
        tradeWayCode: [
          {
            required: true,
            message: "请选择交易方式",
            trigger: "change"
          }
        ],
        noticeName: [
          {
            required: true,
            message: "请选择交易序列名称",
            trigger: "change"
          }
        ],
        tradeCycleCode: [
          {
            required: true,
            message: "请选择交易周期",
            trigger: "change"
          }
        ],
        quotationMethod: [
          {
            required: true,
            message: "请选择报价方式",
            trigger: "change"
          }
        ],
        tradeIssure: [
          {
            required: true,
            validator: validateTradeIssure
          }
        ],
        // tradeScale: [
        //   {
        //     required: true,
        //     message: "请输入交易规模",
        //     trigger: "blur"
        //   }
        // ],
        noticeBatch: [
          {
            required: true,
            message: "请输入公告批次",
            trigger: "blur"
          }
        ],
        userGroup: [
          {
            required: true,
            message: "请输入用户群体",
            trigger: "blur"
          }
        ],
        energyType: [
          {
            required: true,
            message: "请输入能源类型",
            trigger: "blur"
          }
        ]
        // tieLineId: [
        //   {
        //     required: true,
        //     message: "请选择联络线路",
        //     trigger: "blur"
        //   }
        // ]
      },
      visitSituationFormRemnant: 0
    };
  },
  watch: {
    dialogInfo(val) {
      this.dialogInfoData = val;
    }
  },
  /**2019-11-11 #2620 张朋  弹框自适应高度 start */
  mounted() {
    const that = this;
    this.dialogHeight = initDialogHeight(); //2019-11-12 #2620 张朋 获取弹框高度
    window.onresize = function temp() {
      this.dialogHeight = initDialogHeight(); //2019-11-12 #2620 张朋  获取弹框高度(监控高度变化)
    };
  },
  /**2019-11-11 #2620 张朋  弹框自适应高度 end */
  created() {
    this.uplaodHeaders = {
      Authorization: getToken()
    };
    getSelectList("week").then(res => {
      this.weekOptions = res;
    });
    getSelectList("Quotation_method").then(res => {
      this.methodOptions = res;
    });
    getSelectList("energy_type").then(res => {
      this.energyTypeOptions = res;
    });
    getSelectList("user_groups").then(res => {
      this.userGroupOptions = res;
    });
    getSelectList("announcement_batches").then(res => {
      this.noticeBatchOptions = res;
    });
    getSelectList("subclasses").then(res => {
      this.subclasses = res;
    });
    getSelectList("clearing_mode").then(res => {
      this.clearings = res;
    });
  },
  //2019年11月21日16:14:27 李志佳 #2727 交易品种下拉框计算属性
  computed: {
    tradeVarietysCom: function() {
      return this.tradeVarietys.filter(res => {
        return this.filterVar.indexOf(res.propCode) != -1;
      });
    }
  },
  methods: {
    //备注信息字数统计
    visitSituationInput() {
      let txtVal = this.announcementForm.remakes.length - 1;
      this.visitSituationFormRemnant = txtVal + 1;
    },
    // 2019年11月21日09:42:22 李志佳 #2727 添加交易方式对出清方式的筛选
    changeSub(val) {
      if (val == "jyfs02" || val == "jyfs05" || val == "jyfs06") {
        this.noclear = false;
      } else {
        this.noclear = true;
        this.announcementForm.clearModeCode = "";
      }
    },
    /**
     * @方法名称: getVariety
     * @功能描述: 根据交易中心获取交易品种
     * @参数:
     * @返回值:
     * @作者: 李志佳
     * @Date: 2019-11-21 16:08:24
     * @最新修改内容:
     * @LastEditTime:
     */

    getVariety(val) {
      this.announcementForm.tradeVarietyCode = "";
      this.announcementForm.tradeWayCode = "";
      this.tradeCenterTemp = this.tradeCenters.filter(
        item => item.jyorgName == this.announcementForm.tradeCenterName
      );
      tMdataJyorg(this.tradeCenterTemp[0].jyorgId).then(res => {
        this.filterVar = res.data.fpjypzList;
        this.announcementForm.quotationMethod = res.data.quotationMethod;
      });
      
    },
    closeModal() {
      this.viewsDialog = false;
    },
    setTradeIssure(val) {
      if (val == null) {
        this.announcementForm.tradeIssure = "";
        return false;
      }

      if (this.announcementForm.tradeCycleCode == "jyzq01") {
        this.announcementForm.tradeIssure = parseTime(
          this.tradeIssureData.yearData,
          "{y}"
        );
      } else if (this.announcementForm.tradeCycleCode == "jyzq02") {
        this.announcementForm.tradeIssure =
          parseTime(this.tradeIssureData.yearData, "{y}") +
          "-" +
          this.tradeIssureData.quarter;
      } else if (this.announcementForm.tradeCycleCode == "jyzq03") {
        this.announcementForm.tradeIssure = parseTime(
          this.tradeIssureData.monthData,
          "{y}-{m}"
        );
      } else if (this.announcementForm.tradeCycleCode == "jyzq04") {
        this.announcementForm.tradeBeginMonth = parseTime(
          this.tradeIssureData.tradeBeginMonth,
          "{y}-{m}"
        );
        this.announcementForm.tradeEndMonth = parseTime(
          this.tradeIssureData.tradeEndMonth,
          "{y}-{m}"
        );
      } else if (this.announcementForm.tradeCycleCode == "jyzq05") {
        this.announcementForm.tradeBeginMonth = parseTime(
          this.tradeIssureData.tradeBeginMonth,
          "{y}-{m}"
        );
        this.announcementForm.tradeEndMonth = parseTime(
          this.tradeIssureData.tradeEndMonth,
          "{y}-{m}"
        );
        //#2453 交易周期字段下拉框中增加周、交易期次字段下拉框中增加选择周 wangc
      } else if (this.announcementForm.tradeCycleCode == "jyzq06") {
        this.announcementForm.tradeIssure =
          parseTime(this.tradeIssureData.monthData, "{y}-{m}") +
          "-" +
          this.tradeIssureData.weekData;
      }
    },
    // //交易序列选取
    // handleSelect(item) {
    //   console.log(item);
    //   this.affiliatedGroupId = item.groupId;
    // },
    // //模糊查询交易序列
    // querySearch(queryString, cb) {
    //   var query = this.announcementForm.noticeName;
    //   var results = [];
    //    var val = [];
    //   getListByNoticeName(query).then(res => {
    //     // console.log()
    //     results = res.dataList;
    //     cb(results);
    //   });
    // },
    changeTradeCycle() {
      this.announcementForm.tradeIssure = "";
      this.tradeIssureData = {
        quarter: "",
        monthData: "",
        yearData: "",
        tradeEndMonth: "",
        tradeBeginMonth: "",
        weekData: ""
      };
    },
    /**
     * @方法名称: handlechangesRecord
     * @功能描述: 修改记录点击查看信息
     * @参数:
     * @返回值:
     * @作者: 张朋
     * @Date: 2019-11-07 11:26:16
     * @最新修改内容:
     * @LastEditTime:
     */
    handlechangesRecord() {
      this.$refs.adjustmentRecord.openadjustmentRecordDialog(this.noticeId);
    },
    clearForm() {
      this.saveLoading = false;
      this.saveBtnLoading = false;
      //2019年11月22日11:09:39 李志佳 计算属性修改
      this.tradeCenterTemp = [];
      this.newTradeWays = [];
      this.filterVar = [];
      this.visitSituationFormRemnant = 0;
      this.announcementForm = {
        tradeEndMonth: "",
        tradeBeginMonth: "",
        noticeId: "",
        noticeName: "", //交易序列名称
        tradeCenterId: "", //交易中心
        tradeCenterName: "", //交易中心
        tradeVarietyCode: "", //交易品种
        tradeVarietyName: "", //交易品种
        subclassesCode: "", //交易子类
        clearModeCode: "", //出清方式
        subclassesName: "",
        clearModeName: "",
        tradeCycleCode: "", //交易周期
        quotationMethod: "", //报价方式
        tradeCycleName: "", //交易周期
        tradeIssure: "", //交易期次
        tradeScale: "", //交易规模
        tradeWayCode: "", //交易方式代码
        tradeWayName: "", //交易方式
        tieLineId: "", //联络线路
        enclosure: "",
        remakes: "",
        noticeDate: "",
        quotationEndTime: "", //时间开始
        quotationStartTime: "", //时间结束
        batchDesc: "", //批次备注
        // 20191104 #2452新增默认下拉框选项
        noticeBatch: "ggpc001", //公告批次
        userGroup: "yhqt001", //用户群体
        energyType: "nylx001", //能源类型
        noticeBatchName: "", //2019-11-8 #2490 张朋 公告批次名称
        userGroupName: "", //2019-11-8 #2490 张朋 用户群体名称
        energyTypeName: "" //2019-11-8 #2490 张朋 能源类型名称
      };
      this.tradeIssureData = {
        quarter: "",
        monthData: "",
        yearData: "",
        tradeEndMonth: "",
        tradeBeginMonth: "",
        weekData: ""
      };
      // this.$set(this.announcementForm,'tradeCenterId','')
      // this.$set(this.announcementForm,'tradeVarietyCode','')
      // this.$set(this.announcementForm,'tradeCycleCode','')
      // this.$set(this.announcementForm,'tradeWayCode','')
      // this.$set(this.announcementForm,'noticeDate','')
      //  for(let key in this.announcementForm){
      //    if(key!="tradeIssure"){
      //      this.$set(this.announcementForm,key,'')
      //    }

      //   }
      if (typeof this.$refs.announcementForm != "undefined") {
        this.$refs.announcementForm.resetFields();
      }
    },
    //显示新增
    showDialog() {
      //#3888 新增初始化  gaoaining  2020-04-09
      this.modificationRecordState = false;
      this.submitState = true;
      this.clearForm();
      this.changeTradeCycle();
      this.uploadSuccessCb = false;
      this.announcementForm.enclosure = "";
      this.initUpload(this.announcementForm.enclosure);
      this.dialogVisible = true;
    },
    handlePreview(file) {
      this.viewsDialog = true;
      this.pdfUrl =
        "/api/business/tradeNotice/read?token=" +
        getToken() +
        "&id=" +
        this.noticeId +
        "&fileName=" +
        file.name;

      if (typeof this.$refs.views != "undefined") {
        this.$refs.views.getPdf("show", this.pdfUrl);
      }
    },
    //提交保存
    save(state) {
      //#3885 gaoaining 2020-04-09 添加点击保存按钮加载
      const set = this.$refs;
      set["announcementForm"].validate(valid => {
        if (valid) {
          this.saveBtnLoading = true;
          if (this.validateIssure()) {
            this.saveBtnLoading = false;
            return false;
          }
          this.saveLoading = true;
          this.state = state;
          if (this.announcementForm.enclosure == "") {
            if (!this.isUpload) {
              this.submitForm();
            } else {
              set.uploadFileAdd.submit();
            }
          } else {
            if (!this.isUpload) {
              this.submitForm();
            } else {
              set.uploadFileAdd.submit();
            }
          }
        } else {
          return false;
        }
      });
    },
    setRequestInfo(res) {
      this.saveLoading = false;
      this.saveBtnLoading = false;
      if (res.rel) {
        this.dialogVisible = false;
        this.$notify({
          title: res.msg,
          message: res.msg,
          type: "success",
          duration: 2000
        });
        this.$emit("initList");
      } else {
        this.$notify({
          title: res.msg,
          message: res.msg,
          type: "warning",
          duration: 2000
        });
      }
    },
    //添加信息
    create(parame) {
      addObj(parame)
        .then(res => {
          this.isUpload = false;
          this.setRequestInfo(res);
        })
        .catch(function(error) {
          console.log("发生错误！", error);
        });
    },
    //关闭窗口
    closeDialog(formName) {
      this.dialogVisible = false;
    },
    //修改信息
    update(parame) {
      putObj(parame)
        .then(res => {
          this.isUpload = false;
          this.setRequestInfo(res);
        })
        .catch(function(error) {
          console.log("发生错误！", error);
        });
    },
    setTradeIssureData() {
      if (this.announcementForm.tradeCycleCode == "jyzq01") {
        this.tradeIssureData.yearData = this.announcementForm.tradeIssure;
      } else if (this.announcementForm.tradeCycleCode == "jyzq02") {
        let tradeIssure = this.announcementForm.tradeIssure;
        let tradeIssureArr = tradeIssure.split("-");
        this.tradeIssureData.yearData = tradeIssureArr[0];
        this.tradeIssureData.quarter = tradeIssureArr[1];
      } else if (this.announcementForm.tradeCycleCode == "jyzq03") {
        this.tradeIssureData.monthData = this.announcementForm.tradeIssure;
      } else if (this.announcementForm.tradeCycleCode == "jyzq04") {
        this.tradeIssureData.tradeBeginMonth = this.announcementForm.tradeBeginMonth;
        this.tradeIssureData.tradeEndMonth = this.announcementForm.tradeEndMonth;
      } else if (this.announcementForm.tradeCycleCode == "jyzq05") {
        this.tradeIssureData.tradeBeginMonth = this.announcementForm.tradeBeginMonth;
        this.tradeIssureData.tradeEndMonth = this.announcementForm.tradeEndMonth;
        //#2453 交易周期字段下拉框中增加周、交易期次字段下拉框中增加选择周 wangc
      } else if (this.announcementForm.tradeCycleCode == "jyzq06") {
        let tradeIssure = this.announcementForm.tradeIssure;
        let tradeIssureArr = tradeIssure.split("-");
        this.tradeIssureData.monthData =
          tradeIssureArr[0] + "-" + tradeIssureArr[1];
        this.tradeIssureData.weekData = tradeIssureArr[2];
      }
    },
    down() {
      this.$emit("downFile", this.announcementForm);
    },
    /**
     * @方法名称: userGroupChange
     * @功能描述:用群群体下拉框点击数据获取name值
     * @参数: value
     * @返回值:
     * @作者: 张朋
     * @工单号：#2490
     * @Date: 2019-11-08 18:10:51
     * @最新修改内容:
     * @LastEditTime:
     */
    userGroupChange(value) {
      //2019-11-8 #2490 张朋 清空用户群体名称数据
      this.announcementForm.userGroupName = "";
      this.userGroupOptions.forEach((item, propCode) => {
        if (item.propCode == value) {
          this.announcementForm.userGroupName = item.propName;
        }
      });
    },
    /**
     * @方法名称: noticeBatchChange
     * @功能描述: 公告批次下拉框点击数据获取name值
     * @参数: value
     * @返回值:
     * @作者: 张朋
     * @工单号：#2490
     * @Date: 2019-11-08 18:17:33
     * @最新修改内容:
     * @LastEditTime:
     */
    noticeBatchChange(value) {
      this.announcementForm.noticeBatchName = "";
      this.noticeBatchOptions.forEach((item, propCode) => {
        if (item.propCode == value) {
          this.announcementForm.noticeBatchName = item.propName;
        }
      });
    },
    /**
     * @方法名称: energyTypeChange
     * @功能描述: 能源类型下拉框点击数据获取name值
     * @参数: value
     * @返回值:
     * @作者: 张朋
     * @工单号：#2490
     * @Date: 2019-11-08 18:17:33
     * @最新修改内容:
     * @LastEditTime:
     */
    energyTypeChange(value) {
      this.announcementForm.energyTypeName = "";
      this.energyTypeOptions.forEach((item, propCode) => {
        if (item.propCode == value) {
          this.announcementForm.energyTypeName = item.propName;
        }
      });
    },
    //显示编辑及查看窗口
    showEditDialog(data) {
      //2019-11-4 #2489  张朋 保存按钮状态值
      this.submitState = data.submitState;
      this.modificationRecordState = data.modificationRecordState;
      // this.lsTradeCycleCode=data.lsTradeCycleCode
      this.clearForm();
      /**2019-11-8 #2490 张朋 用户群体名称、能源类型名称、公告批次名称赋值 start*/
      this.announcementForm.noticeBatchName = data.noticeBatchName;
      this.announcementForm.userGroupName = data.userGroupName;
      this.announcementForm.energyTypeName = data.energyTypeName;
      this.announcementForm.quotationMethod = data.quotationMethod;
      /**2019-11-8 #2490 张朋 用户群体名称、能源类型名称、公告批次名称赋值 end*/

      this.uploadSuccessCb = false;
      this.noticeId = data.noticeId;
      for (let key in this.announcementForm) {
        if (typeof data[key] != "undefined") {
          this.announcementForm[key] = data[key];
        } else {
          this.announcementForm[key] = "";
        }
      }
      
      if (typeof this.announcementForm.enclosure == "undefined") {
        this.announcementForm.enclosure = "";
      }
      //2019年11月21日17:28:45 初始化下拉框 #2727
      this.announcementForm.tradeVarietyCode = "";
      this.announcementForm.tradeWayCode = "";
      this.tradeCenterTemp = this.tradeCenters.filter(
        item => item.jyorgName == this.announcementForm.tradeCenterName
      );
      tMdataJyorg(this.tradeCenterTemp[0].jyorgId).then(res => {
        this.filterVar = res.data.fpjypzList;
      });
      this.changeTradeVarietyCode(data.tradeVarietyCode);
      this.announcementForm.tradeVarietyCode = data.tradeVarietyCode;
      this.announcementForm.tradeWayCode = data.tradeWayCode;
      this.changeSub(this.announcementForm.tradeWayCode);
      this.initUpload(this.announcementForm.enclosure);
      this.setTradeIssureData();
      this.visitSituationInput();
      this.dialogVisible = true;
    },
    //
    submitForm() {
      let parame = {};
      //2019年11月22日11:14:09 字段赋判断错误修改
      let subclasses = this.subclasses.filter(
        item => item.propCode == this.announcementForm.subclassesCode
      );
      let clearings = this.clearings.filter(
        item => item.propCode == this.announcementForm.clearModeCode
      );
      let tradeCenter = this.tradeCenters.filter(
        item => item.jyorgName == this.announcementForm.tradeCenterName
      );
      let tradeVariety = this.tradeVarietys.filter(
        item => item.propCode == this.announcementForm.tradeVarietyCode
      );
      let tradeWay = this.tradeWays.filter(
        item => item.propCode == this.announcementForm.tradeWayCode
      );
      let tradeCycle = this.tradeCycles.filter(
        item => item.propCode == this.announcementForm.tradeCycleCode
      );
      if (tradeCenter.length > 0) {
        parame.tradeCenterId = tradeCenter[0].jyorgId;
        parame.tradeCenterName = tradeCenter[0].jyorgName;
      } else {
        parame.tradeCenterId = this.announcementForm.tradeCenterId;
        parame.tradeCenterName = this.announcementForm.tradeCenterName;
      }
      if (tradeVariety.length > 0) {
        parame.tradeVarietyCode = tradeVariety[0].propCode;
        parame.tradeVarietyName = tradeVariety[0].propName;
      } else {
        parame.tradeVarietyCode = this.announcementForm.tradeVarietyCode;
        parame.tradeVarietyName = this.announcementForm.tradeVarietyName;
      }
      if (tradeCycle.length > 0) {
        parame.tradeCycleCode = tradeCycle[0].propCode;
        parame.tradeCycleName = tradeCycle[0].propName;
      } else {
        parame.tradeCycleCode = this.announcementForm.tradeCycleCode;
        parame.tradeCycleName = this.announcementForm.tradeCycleName;
      }
      if (tradeWay.length > 0) {
        parame.tradeWayCode = tradeWay[0].propCode;
        parame.tradeWayName = tradeWay[0].propName;
      } else {
        parame.tradeWayCode = this.announcementForm.tradeWayCode;
        parame.tradeWayName = this.announcementForm.tradeWayName;
      }
      parame.noticeName = this.announcementForm.noticeName;
      parame.tieLineId = this.announcementForm.tieLineId;

      parame.tradeScale = this.announcementForm.tradeScale;
      parame.remakes = this.announcementForm.remakes;
      parame.enclosure = this.announcementForm.enclosure;
      parame.state = this.state;
      parame.noticeDate = this.announcementForm.noticeDate;
      if (
        this.announcementForm.tradeCycleCode == "jyzq04" ||
        this.announcementForm.tradeCycleCode == "jyzq05"
      ) {
        parame.tradeIssure = "";
      } else {
        parame.tradeIssure = this.announcementForm.tradeIssure;
      }

      parame.quotationEndTime = this.announcementForm.quotationEndTime;
      parame.quotationStartTime = this.announcementForm.quotationStartTime;
      parame.tradeBeginMonth = this.announcementForm.tradeBeginMonth;
      parame.tradeEndMonth = this.announcementForm.tradeEndMonth;
      parame.orgId = this.lastOrgId;
      parame.regionalOrgId = this.myOrgId;
      parame.batchDesc = this.announcementForm.batchDesc;
      parame.noticeBatch = this.announcementForm.noticeBatch;
      parame.userGroup = this.announcementForm.userGroup;
      parame.energyType = this.announcementForm.energyType;
      log(this.announcementForm.quotationMethod);
      parame.quotationMethod = this.announcementForm.quotationMethod;
      //**2019-11-8 #2490 张朋 用户群体、能源类型和公告批次name赋值 start */
      parame.energyTypeName = this.announcementForm.energyTypeName;
      parame.userGroupName = this.announcementForm.userGroupName;
      parame.noticeBatchName = this.announcementForm.noticeBatchName;
      //**2019-11-8 #2490 张朋 用户群体、能源类型和公告批次name赋值 end */
      /** 2019年11月21日16:14:27 李志佳 #2727 交易子类 出清方式 satrt  */
      if (subclasses.length > 0) {
        parame.subclassesCode = subclasses[0].propCode;
        parame.subclassesName = subclasses[0].propName;
      } else {
        parame.subclassesCode = this.announcementForm.subclassesCode;
        parame.subclassesName = this.announcementForm.subclassesName;
      }
      if (clearings.length > 0) {
        parame.clearModeCode = clearings[0].propCode;
        parame.clearModeName = clearings[0].propName;
      } else {
        parame.clearModeCode = this.announcementForm.clearModeCode;
        parame.clearModeName = this.announcementForm.clearModeName;
      }
      /** 2019年11月21日16:14:27 李志佳 #2727  交易子类 出清方式 end  */
      this.tradeCenters.forEach(element => {
        //新增两个字段
        if (this.announcementForm.tradeCenterName == element.jyorgName) {
          if (
            element.quotationSubsection != null &&
            element.quotationSubsection != ""
          ) {
            parame.quotationSubsection = element.quotationSubsection;
          }
          // if (
          //   element.quotationMethod != null &&
          //   element.quotationMethod != ""
          // ) {
          //   parame.quotationMethod = element.quotationMethod;
          // }
        }
      });

      if (this.dialogInfoData.status == "add") {
        this.create(parame);
      } else {
        parame.noticeId = this.noticeId;
        this.update(parame);
      }
    },
    //初始化上传
    initUpload(files) {
      this.isUpload = false;
      let fileArr = [];
      this.myFileList = [];
      if (typeof files == "undefined") {
        return false;
      }
      if (files != "") {
        fileArr = files.split("|");
        fileArr.forEach(item => {
          if (item != "") {
            let fileInfo = item.split("/");
            this.myFileList.push({
              url: item,
              name: fileInfo[fileInfo.length - 1]
            });
          }
        });
      }
    },
    //文件列表移除文件
    handleRemove(file, fileList) {
      let enclosures = [];
      fileList.forEach(item => {
        if (item.status == "success") {
          enclosures.push(item.url);
        }
      });
      if (enclosures.length > 0) {
        this.announcementForm.enclosure = enclosures.join("|");
      } else {
        this.announcementForm.enclosure = "";
      }
    },
    //点击文件列表中已上传的文件##
    // handlePreview(file) {
    //   downloadOneFile(file.url);
    // },
    //上传文件之前
    handleBefore(file) {},
    //文件状态改变
    handleChange(file, fileList) {
      fileList.forEach(item => {
        if (item.status == "ready") {
          this.isUpload = true;
          this.changeFileList.push(item.name);
        }
      });
    },
    //上传成功
    uploadSuccess(response, file, fileList) {
      let enclosures = [];
      // this.myFileList.push(response.data.filePath)
      // console.log(this.myFileList);
      // this.formLoading = false;
      let statusSuccess = true;
      fileList.forEach(item => {
        if (item.status != "success") {
          statusSuccess = false;
        }
      });
      if (statusSuccess) {
        fileList.forEach(item => {
          if (typeof item.response == "undefined") {
            enclosures.push(item.url);
          } else {
            enclosures.push(item.response.data.filePath);
          }
        });
        this.announcementForm.enclosure = enclosures.join("|");
        this.submitForm();
      }
      // this.showUplaodFile(this.contractLedgerForm.htContract.enclosure);
      // this.formLoading = false;
    },
    //上传失败
    uploadErr(response, file, fileList) {
      this.saveLoading = false;
      this.saveBtnLoading = false;
      this.$notify({
        title: "上传提示",
        message: "上传失败",
        type: "warning",
        duration: 2000
      });
    },
    //文件超出个数限制
    handleExceed() {
      this.$notify({
        title: "上传提示",
        message: "文件最多上传10个",
        type: "warning",
        duration: 2000
      });
    },
    //交易期次验证
    validateIssure() {
      if (
        this.announcementForm.tradeIssure == "" &&
        (this.tradeIssureData.tradeEndMonth == "" ||
          this.tradeIssureData.tradeBeginMonth == "")
      ) {
        this.$notify({
          title: "提示",
          message: "请选择交易期次",
          type: "warning",
          duration: 2000
        });
        return true;
      } else {
        var beginMonth = new Date(this.tradeIssureData.tradeBeginMonth);
        var EndMonth = new Date(this.tradeIssureData.tradeEndMonth);
        if (beginMonth.getTime() > EndMonth.getTime()) {
          this.$notify({
            title: "提示",
            message: "起始日期不能大于结束日期",
            type: "warning",
            duration: 2000
          });
          return true;
        } else {
          if (this.announcementForm.tradeCycleCode === "jyzq04") {
            var beginMonth2 = parseTime(
              this.tradeIssureData.tradeBeginMonth,
              "{y}-{m}"
            ).split("-"); //把年、月拆分开
            var EndMonth2 = parseTime(
              this.tradeIssureData.tradeEndMonth,
              "{y}-{m}"
            ).split("-"); //把年、月拆分开
            var setYer = EndMonth2[0] - beginMonth2[0]; //计算出年份差
            var setMat = "";
            if (setYer == 0) {
              setMat = EndMonth2[1] - beginMonth2[1] + 1; //计算月份差
            } else {
              setMat = setYer * 12 + (EndMonth2[1] - beginMonth2[1]) + 1; //计算月份差
            }
            if (setMat != 6) {
              this.$notify({
                title: "提示",
                message: "交易周期应为6个月",
                type: "warning",
                duration: 2000
              });
              return true;
            } else {
              return false;
            }
          } else {
            return false;
          }
        }
      }
    },
    changeTradeVarietyCode(val) {
      if (val == "jypz02") {
        this.isJypz02 = true;
      } else {
        this.isJypz02 = false;
      }
      /** 2019年11月21日16:14:27 李志佳 #2727 交易品种筛选交易方式 satrt  */
      let parame = {
        tradeCenterId: this.tradeCenterTemp[0].jyorgId,
        tradeVarietyCode: val
      };
      this.announcementForm.tradeWayCode = "";
      getTradeWay(parame).then(res => {
        this.newTradeWays = res.jyfsList;
      });
      /** 2019年11月21日16:14:27 李志佳 #2727 交易品种筛选交易方式 end  */
    }
  }
};
</script>
<style scoped>
.el-input.dw {
  width: 81%;
}
.el-autocomplete {
  width: 100%;
}
.w180 {
  width: 180px;
}
.uploadBtnTrue {
  display: block !important;
}
.uploadBtnFalse {
  display: none !important;
}
.delFile {
  display: inline;
  margin-left: 30px;
  cursor: pointer;
}
.validateText {
  position: absolute;
  font-size: 10px;
  bottom: -4px;
  right: 10%;
}
.hand {
  cursor: pointer;
}
</style>