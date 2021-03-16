<!--
 * @功能描述: 
 * @版本: 
 * @作者: 阿彪
 * @Date: 2019-10-28 11:43:01
 * @最新修改内容: #2511 添加工作计划编码
 * @LastEditTime: 2019-11-25 13:45:48
 -->
<template>
  <div>
    <el-dialog
      v-drag
      :close-on-click-modal="false"
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      custom-class="w1000 "
      v-loading="formLoading"
      :before-close="handleClose"
    >
    <!--  2019-11-12 #2616 秦侯珍 弹出页面展示问题 start-->
      <div :style="{paddingRight:'10px',height:dialogHeight+'px'}">
        <el-scrollbar>
      <!--  2019-11-12 #2616 秦侯珍 弹出页面展示问题 end-->
      <!--from弹出 -->
      <div class="app-container calendar-list-container">
        <div class="f-ml10 form-inline-168">
          <el-form :inline="true" :model="form" class="demo-form-inline" label-width="120px">
            <el-row>
              <el-col :span="8">
                <el-form-item label="计划年月:" algin="right">
                  <el-date-picker
                    :disabled="isSubmit"
                    v-model="form.planYear"
                    type="month"
                    placeholder
                    @change="getPlanYear"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="组织机构:">
                  <el-input disabled v-model="form.orgName" placeholder></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="所属部门:">
                  <el-input disabled v-model="form.deptName" placeholder></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="pageType!='formulate'">
              <!-- <el-col :span="12">
                <el-form-item label="审批人:"> 
                  <el-input disabled v-model="form.approver" placeholder></el-input>
                </el-form-item>
              </el-col> 
              <el-col :span="12">
                <el-form-item label="审批状态:">
                  <el-input disabled v-model="form.approvalStatus" placeholder></el-input>
                </el-form-item>
              </el-col>-->
            </el-row>
          </el-form>
        </div>
      </div>

      <el-tabs v-model="tabsData.activeName" type="border-card" @tab-click="handleClick">
        <!--上月结算工作 -->
        <el-tab-pane
          label="上月结转工作"
          name="lastMonthCarriedForward"
          v-if="tabsData.lastMonthCarriedForward"
        >
          <el-table
            :key="tableKey"
            :data="lastMonthCarriedForwardList"
            v-loading.body="listLoading"
            :height="tabHeight"
            border
            fit
            highlight-current-row
            style="width: 100%"
          >
            <el-table-column type="index" label="序号" align="center" width="70px"></el-table-column>
            <el-table-column align="center" label="是否完成">
              <template slot-scope="scope">
                <div class="txt-left">
                  <el-checkbox :disabled="iscomplete" v-model="scope.row.complete"></el-checkbox>
                </div>
              </template>
            </el-table-column>
            <el-table-column width="140px" align="center" label="是否重点工作">
              <template slot-scope="scope">
                <div class="txt-left">
                  <el-checkbox v-model="scope.row.keyWork"></el-checkbox>
                </div>
              </template>
            </el-table-column>
            <el-table-column width="220px" align="center" label="工作内容">
              <template slot-scope="scope">
                <el-popover
                  placement="top-start"
                  title="工作内容预览"
                  width="300"
                  trigger="hover"
                  :content="scope.row.jobContent"
                >
                  <span slot="reference">{{ scope.row.jobContent }}</span>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column align="center" label="开始时间">
              <template slot-scope="scope">
                <span>{{ scope.row.startTime }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="完成时间">
              <template slot-scope="scope">
                <span>{{ scope.row.endTime }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="负责人">
              <template slot-scope="scope">
                <span>{{ scope.row.personLiable }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="配合部门">
              <template slot-scope="scope">
                <span>{{ scope.row.coordinationDepartmentName }}</span>
              </template>
            </el-table-column>
            <el-table-column width="140px" align="center" label="备注">
              <template slot-scope="scope">
                <span>{{ scope.row.remarks }}</span>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>

        <!--结转工作 -->
        <el-tab-pane label="结转工作" name="carriedForward" v-if="tabsData.carriedForward">
          <el-table
            :key="tableKey"
            :data="carryForwardList"
            v-loading.body="listLoading"
            :height="tabHeight"
            border
            fit
            highlight-current-row
            style="width: 100%"
          >
            <el-table-column type="selection" align="center" width="55"></el-table-column>
            <el-table-column type="index" label="序号" align="center" width="70px"></el-table-column>
            <el-table-column align="center" label="是否完成">
              <template slot-scope="scope">
                <div class="txt-left">
                  <el-checkbox :disabled="iscomplete" v-model="scope.row.complete"></el-checkbox>
                </div>
              </template>
            </el-table-column>
            <el-table-column width="140px" align="center" label="是否重点工作">
              <template slot-scope="scope">
                <div class="txt-left">
                  <el-checkbox :disabled="this.monstate" v-model="scope.row.keyWork"></el-checkbox>
                </div>
              </template>
            </el-table-column>
            <el-table-column width="220px" align="center" label="工作内容">
              <template slot-scope="scope">
                <el-popover
                  placement="top-start"
                  title="工作内容预览"
                  width="300"
                  trigger="hover"
                  :content="scope.row.jobContent"
                >
                  <span slot="reference">{{ scope.row.jobContent }}</span>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column align="center" label="开始时间">
              <template slot-scope="scope">
                <span>{{ scope.row.startTime }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="完成时间">
              <template slot-scope="scope">
                <span>{{ scope.row.endTime }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="负责人">
              <template slot-scope="scope">
                <span>{{ scope.row.personLiable }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="配合部门">
              <template slot-scope="scope">
                <span>{{ scope.row.coordinationDepartmentName }}</span>
              </template>
            </el-table-column>
            <el-table-column width="140px" align="center" label="备注">
              <template slot-scope="scope">
                <span>{{ scope.row.remarks }}</span>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>

        <!--新增工作 -->
        <el-tab-pane
          label="新增工作"
          :key="new Date().toLocaleDateString()"
          name="addWork"
          v-if="tabsData.addWork"
        >
          <!--2019-10-16  实现查看下不显示操作按钮 -->
          <div
            class="filter-container"
            v-if="(dialogType == 'add' || dialogType == 'edit')&&monstate"
          >
            <el-button-group>
              <el-button
                class="filter-item"
                @click="handleAdd"
                icon="el-icon-plus"
                type="primary"
              >新增</el-button>
              <el-button
                class="filter-item"
                @click="workUpdate"
                type="primary"
                icon="el-icon-delete"
              >编辑</el-button>
              <el-button
                class="filter-item"
                @click="deleteWorkById"
                type="primary"
                icon="el-icon-delete"
              >删除</el-button>
            </el-button-group>
          </div>
          <!--  :data="listQuery.addWorkList"-->
          <el-table
            @selection-change="selsChange"
            :height="tabHeight"
            :key="tableKey"
            border
            fit
            highlight-current-row
            :data="addWorkList"
            style="width: 100%"
          >
            <!-- <el-table-column :disabled="isEdit" type="index" label="序号" align="center" width="70px">
            </el-table-column>-->
            <el-table-column type="selection" align="center" width="55"></el-table-column>
            <el-table-column type="index" label="序号" align="center" width="70px"></el-table-column>
            <el-table-column width="110px"  align="center" label="工作计划编码">
              <template slot-scope="scope">
                <span>{{ scope.row.onlyCode }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="是否完成">
              <template slot-scope="scope">
                <div class="txt-left">
                  <el-checkbox :disabled="iscomplete" v-model="scope.row.complete"></el-checkbox>
                  <!-- {{scope.row.complete}} -->
                </div>
              </template>
            </el-table-column>
            <el-table-column align="center" label="是否重点工作">
              <template slot-scope="scope">
                <div class="txt-left">
                  <el-checkbox v-model="scope.row.keyWork"></el-checkbox>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="工作内容" width="180">
              <template slot-scope="scope">
                <el-popover
                  placement="top-start"
                  title="工作内容预览"
                  width="300"
                  trigger="hover"
                  :content="scope.row.jobContent"
                >
                  <span slot="reference">{{ scope.row.jobContent }}</span>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column align="center" label="开始时间">
              <template slot-scope="scope">
                <div class="txt-left">{{ scope.row.startTime }}</div>
              </template>
            </el-table-column>
            <el-table-column width="140px" align="center" label="完成时间">
              <template slot-scope="scope">
                <div class="txt-left">{{ scope.row.endTime }}</div>
              </template>
            </el-table-column>
            <el-table-column width="200px" align="center" label="负责人">
              <template slot-scope="scope">
                <div class="txt-left">{{ scope.row.personLiable }}</div>
              </template>
            </el-table-column>
            <el-table-column width="200px" align="center" label="配合部门">
              <template slot-scope="scope">
                <div class="txt-left">{{ scope.row.coordinationDepartmentName }}</div>
              </template>
            </el-table-column>
            <el-table-column width="140px" align="center" label="备注">
              <template slot-scope="scope">
                <div class="txt-left">{{ scope.row.remarks }}</div>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>

        <!--计划外工作 -->
        <el-tab-pane label="计划外工作" name="outsideThePlan" v-if="tabsData.outsideThePlan">
          <!--2019-10-16  实现查看下不显示操作按钮-->
          <div class="filter-container" v-if="dialogType == 'shift'&&monstate">
            <el-button-group>
              <el-button
                class="filter-item"
                @click="handleCreate"
                icon="el-icon-plus"
                type="primary"
              >新增</el-button>
              <el-button
                class="filter-item"
                @click="handleUpdate"
                type="primary"
                icon="el-icon-delete"
              >编辑</el-button>
              <el-button
                class="filter-item"
                @click="handleDelById"
                type="primary"
                icon="el-icon-delete"
              >删除</el-button>
            </el-button-group>
          </div>

          <el-table
            @selection-change="selsChange"
            :key="tableKey"
            border
            :height="tabHeight"
            fit
            highlight-current-row
            :data="outsideThePlanList"
            style="width: 100%"
          >
            <el-table-column type="selection" align="center" width="55"></el-table-column>
            <el-table-column type="index" label="序号" align="center" width="70px"></el-table-column>
            <el-table-column align="center" label="是否完成">
              <template slot-scope="scope">
                <div class="txt-left">
                  <el-checkbox :disabled="iscomplete" v-model="scope.row.complete"></el-checkbox>
                </div>
              </template>
            </el-table-column>
            <el-table-column width="140px" align="center" label="是否重点工作">
              <template slot-scope="scope">
                <div class="txt-left">
                  <el-checkbox v-model="scope.row.keyWork"></el-checkbox>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="工作内容" width="180">
              <template slot-scope="scope">
                <el-popover
                  placement="top-start"
                  title="工作内容预览"
                  width="300"
                  trigger="hover"
                  :content="scope.row.jobContent"
                >
                  <span slot="reference">{{ scope.row.jobContent }}</span>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column align="center" label="开始时间">
              <template slot-scope="scope">
                <div class="txt-left">{{ scope.row.startTime }}</div>
              </template>
            </el-table-column>
            <el-table-column width="140px" align="center" label="完成时间">
              <template slot-scope="scope">
                <div class="txt-left">{{ scope.row.endTime }}</div>
              </template>
            </el-table-column>
            <el-table-column width="200px" align="center" label="负责人">
              <template slot-scope="scope">
                <div class="txt-left">{{ scope.row.personLiable }}</div>
              </template>
            </el-table-column>
            <el-table-column width="200px" align="center" label="配合部门">
              <template slot-scope="scope">
                <div class="txt-left">{{ scope.row.coordinationDepartmentName }}</div>
              </template>
            </el-table-column>
            <el-table-column width="140px" align="center" label="备注">
              <template slot-scope="scope">
                <div class="txt-left">{{ scope.row.remarks }}</div>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
      </el-scrollbar>
      </div>
      <div slot="footer" class="dialog-footer" align="right">
        <!-- 修改记录按钮 s #2511 阿彪 2019-11-14 18:39:02 -->
        <el-button
          v-if="form.approvalStatus =='已提交'&&displayStatus=='marketingPlanFormulate'"
          style="float:left"
          class="filter-item check"
          plain
          @click="clicXGJL()"
        >修改记录</el-button>
        <!-- 修改记录按钮 e #2511 阿彪 2019-11-14 18:39:02 -->
        <!-- 2019-11-05 #2403 郑文杰  添加按钮的显示判断(已保存状态下按钮才会出现)   start -->
        <el-button
          class="save-btn"
          v-if="
            dialogType == 'add' ||
              dialogType == 'edit'&&form.approvalStatus=='已保存' ||
              dialogType == 'carriedForward'
          "
          :disabled="!this.monstate"
          @click="save('11')"
          :loading="isLoading"
        >保 存</el-button>
        <!-- 2019-11-05 #2403 郑文杰  添加按钮的显示判断(已保存状态下按钮才会出现)   end -->
        <el-button
          class="submit-btn"
          v-if="dialogType == 'add' || dialogType == 'edit'"
          @click="save('3')"
          :disabled="!this.monstate"
          :loading="isTiLoading"
        >提 交</el-button>
        <el-button class="submit-btn" v-if="dialogType == 'carriedForward'" @click="carryForward">结转</el-button>
        <el-button class="cancel-btn" @click="handleClose">关 闭</el-button>
      </div>
    </el-dialog>

    <!--工作静态新增框 -->
    <el-dialog
      v-drag
      :close-on-click-modal="false"
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
      v-loading="formLoading"
      :modal-append-to-body="false"
      custom-class="w640"
    >
    <!--  2019-11-12 #2616 秦侯珍 弹出页面展示问题 start-->
      <div :style="{paddingRight:'10px',height:dialogHeight+'px'}">
        <el-scrollbar>
      <!--  2019-11-12 #2616 秦侯珍 弹出页面展示问题 end-->
      <el-form :model="planInfoForm" ref="planInfoForm" label-width="140px">
        <el-row>
          <el-col :span="12">
            <el-form-item prop="startTime" label="开始时间:">
              <el-date-picker
                v-model="planInfoForm.startTime"
                type="date"
                placeholder="请选择开始时间"
                style="width:100%;"
                @change="getStartTime"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="endTime" label="结束时间:">
              <el-date-picker
                v-model="planInfoForm.endTime"
                type="date"
                placeholder="请选择完成时间"
                style="width:100%;"
                @change="getEndTime"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item prop="personLiable" label="负责人:">
              <el-input v-model="planInfoForm.personLiable"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="coordinationDepartment" label="配合部门:">
              <el-select
                class="filter-item"
                v-model="planInfoForm.coordinationDepartment"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in deptOptions"
                  :key="item.deptId"
                  :label="item.deptName"
                  :value="item.deptId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item prop="jobContent" label="工作内容:">
              <el-input
                placeholder="请输入"
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4 }"
                :maxlength="400"
                @input="jobContentInput"
                v-model="planInfoForm.jobContent"
              ></el-input>
              <span class="validateText">{{ jobContentFormRemnant }}/400</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="备注:">
              <el-input
                placeholder="请输入"
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4 }"
                :maxlength="400"
                @input="remarksInput"
                v-model="planInfoForm.remarks"
              ></el-input>
              <span class="validateText">{{ remarksFormRemnant }}/400</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item>
              <el-checkbox v-model="planInfoForm.keyWork">是否重点工作</el-checkbox>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      </el-scrollbar>
      </div>
      <!--新增工作弹出按钮 -->
      <div v-if="dialogStatus == 'workCreate'" slot="footer" class="dialog-footer btn_footer">
        <el-button
          class="save-btn"
          :disabled="disabaled"
          :loading="isCuLoading"
          @click="create_planInfo('planInfoForm')"
        >保 存</el-button>
        <el-button class="cancel-btn" @click="cancel()">关 闭</el-button>
      </div>

      <div v-if="dialogStatus == 'updataCreate'" slot="footer" class="dialog-footer btn_footer">
        <el-button
          class="save-btn"
          :disabled="disabaled"
          :loading="CuLoading"
          @click="update_PlanInfo('planInfoForm')"
        >保 存</el-button>
        <el-button class="cancel-btn" @click="cancel()">关 闭</el-button>
      </div>

      <!--调整 -->
      <div
        v-if="dialogStatus == 'create'"
        slot="footer"
        class="dialog-footer btn_footer"
        align="right"
      >
        <el-button class="save-btn" :loading="bcLoading" @click="create_bc('planInfoForm')">保 存</el-button>
        <el-button class="cancel-btn" @click="cancel()">关 闭</el-button>
      </div>

      <div
        v-if="dialogStatus == 'update'"
        slot="footer"
        class="dialog-footer btn_footer"
        align="right"
      >
        <el-button class="save-btn" :loading="BcLoading" @click="update_bc('planInfoForm')">保 存</el-button>
        <el-button class="cancel-btn" @click="cancel()">关 闭</el-button>
      </div>
    </el-dialog>

    <!-- -->
    <el-dialog
      v-drag
      :close-on-click-modal="false"
      :visible.sync="carryOverFormVisible"
      v-loading="formLoading"
      :modal-append-to-body="false"
      custom-class="w640"
    >
      <!--  2019-11-12 #2616 秦侯珍 弹出页面展示问题 start-->
      <div :style="{paddingRight:'10px',height:dialogHeight+'px'}">
        <el-scrollbar>
      <!--  2019-11-12 #2616 秦侯珍 弹出页面展示问题 end-->
      <div style="width:100%;height:100px">
        <div class="fontMove">
          <span>
            结转月份:
            <span style="color:blue">{{ form.planYear }}</span>
          </span>
        </div>
      </div>
      </el-scrollbar>
      </div>
      <div slot="footer" class="dialog-footer btn_footer" label-width="140px">
        <el-button class="save-btn" @click="createPlanInfo()">确 认</el-button>
        <el-button class="cancel-btn" @click="cancel()">关 闭</el-button>
      </div>
    </el-dialog>
    <!-- 修改记录弹窗 阿彪 #2511 20191114  s -->
    <el-dialog
      v-drag
      :close-on-click-modal="false"
      custom-class="w880"
      title="修改记录"
      :visible.sync="dialogFormVisibleTwo"
    >
      <amendantRecord
        @setRecords="getRecords"
        :originalId="form.planId"
        ref="amendantRecord"
        :list="zlist"
        :total="ztotal"
      ></amendantRecord>
      <div slot="footer" class="dialog-footer btn_footer">
      <!-- 按钮 -->
      <el-button class="cancel-btn" @click="dialogFormVisibleTwo = false">关闭</el-button>
      </div>
    </el-dialog>
    <!-- 修改记录弹窗 阿彪 #2511 20191114  e -->
  </div>
</template>
    
<script>
import { getDeptListByOrgId } from "@common/api/admin/employeeManager/index";
import {
  resultPage,
  resultList
} from "@common/api/business/jyTransactionNotice/index";
import {
  addObj,
  pageList,
  editObj,
  putObj,
  carryOverObj,
  putDetilsObj,
  addDetailsObj,
  delDetailsObj,
  checkUniqueness,
  getCurrentUserInfo,
  getDetailsById,
  deletByid
} from "@common/api/marketingSystem/marketingPlan/index";

import { getUserOrgInfo } from "@common/api/public/index";
import { mapGetters } from "vuex";
import { parseTime,initDialogHeight } from "@common/utils/index";
import { getPageList } from "@common/api/base";
import amendantRecord from "@common/components//planFormulateRecord";
export default {
  name: "result",
  components: {
    amendantRecord
  },
  props: {
    pageType: String,
    tabs: {
      type: Object
    },
    planYear: {
      type: Date
    },
    addPlanYear: {
      type: Date
    }
  },
  data() {
    return {
      disabaled: false,
      monstate: true,
      isLoading: false,
      isTiLoading: false,
      isCuLoading: false,
      CuLoading: false,
      bcLoading: false,
      BcLoading: false,
      iscomplete: false, //是否完成默认值
      isSubmit: false,
      dialogType: "add",
      tabsData: this.tabs,
      workType: 2,
      name: "",
      deptOptions: [],

      state: "true",
      visible: false,
      //form中的 状态禁用
      noButten: true,
      addNoButten: false, //新增工作按钮隐藏
      // lastMonthCarriedForward:false, //上月结转信息
      // carriedForward:false, //结转信息
      // addWork:false, //新增工作
      // outsideThePlan:false, //计划外工作
      sels: [],
      //activeName:'',
      addWorkList: [], //静态新增工作数组信息
      carryForwardList: [], //结转列表
      outsideThePlanList: [], //计划外工作列表
      lastMonthCarriedForwardList: [], //上月结转工作列表
      listLoading: false, //加载列表
      disabled: false, //禁用
      dialogFormVisible: false, //新增工作=》新增form表单
      carryOverFormVisible: false, //结转弹出确认信息
      dialogVisible: false,
      carryOverState: "0",
      formLoading: false,
      startTime: new Date(),
      endTime: new Date(),
      complete: false,
      jobContentFormRemnant: 0, //工作内容输入起始值
      remarksFormRemnant: 0, //备注输入框起始值
      dialogTitle: "",
      tabHeight: "",//表格高度
      planList: [],
      addStartTime: this.addPlanYear,
      //结转工作
      carryForwardList: [],
      planInfoForm: {
        index: 0,
        complete: false,
        keyWork: "",
        jobContent: "",
        startTime: "",
        endTime: "",
        personLiable: "",
        coordinationDepartment: "",
        coordinationDepartmentName: "",
        remarks: "",
        pid: ""
      },
      dialogHeight: "",
      dialogStatus: "",
      form: {
        orgName: "",
        planYear: "",
        approvalStatus: "",
        personLiable: "",
        deptName: ""
      },
      dialogResultStatus: "",
      textMap: {
        update: "编辑",
        create: "新增",
        workCreate: "新增",
        updateCreate: "新增"
      },
      sels: "", //复选框
      tableKey: 0,
      zlist: [],
      ztotal: 0,
      displayStatus: "", //修改记录是否显示判断状态
      dialogFormVisibleTwo: false, //修改记录弹窗
      approvalStatus:''
    };
  },
  watch: {
    tabs(val) {
      this.tabsData = val;
    }
    // addPlanYear(val) {
    //   this.addStartTime = val;
    // }
  },
  mounted() {
    const that = this;
    this.dialogHeight = initDialogHeight();
    window.onresize = function temp() {
      that.dialogHeight = initDialogHeight();
    }
  },
  created() {
    getDeptListByOrgId({ orgId: this.orgId }).then(res => {
      this.deptOptions = res.data;
    });
    this.setLayoutHeight();
  },
  computed: {
    ...mapGetters(["elements", "orgId"])
  },
  methods: {
       /**
     * @方法名称: clicXGJL
     * @功能描述: 修改记录
     * @参数:
     * @返回值:
     * @作者: 阿彪
     * @issues:#2511
     * @Date: 2019-11-41 14:47:22
     * @最新修改内容:
     * @LastEditTime:
     */
    clicXGJL() {
      let listPageInfo = {
        limit: 10,
        page: 1
      };
      this.getRecords(listPageInfo);
      this.dialogFormVisibleTwo = true;
    },
    /**
     * @方法名称: getRecords
     * @功能描述: 修改记录查询
     * @参数: 
     * @返回值: 
     * @作者: 阿彪
     * @issues: #2511
     * @Date: 2019-11-14 15:41:00
     * @最新修改内容: 
     * @LastEditTime: 
     */
    getRecords(listPageInfo) {
      let parme = {
        pid: this.form.planId,
        limit: listPageInfo.limit,
        page: listPageInfo.page
      };
      getPageList(parme).then(res => {
        let items = res.data.rows.map((item, index) => {
          item.index = index + 1 + (listPageInfo.page - 1) * listPageInfo.limit;
          return item;
        });
        this.zlist = res.data.rows;
        this.ztotal = res.data.total;
      });
    },
    setLayoutHeight() {
      this.tabHeight = initDialogHeight() * 0.66 + "px"; //修改计算的表格高度
    },

    //获取所属部门
    getCurrentUserInfo() {
      getCurrentUserInfo().then(res => {
        this.form.deptName = res.deptName;
        this.deptOptions.forEach(element => {
          if (element.deptName == this.form.deptName) {
            this.form.deptId = element.deptId;
          }
        });
      });
    },
    //定制初始化
    initCreatDialog(data) {
      this.isLoading = false;
      this.isTiLoading = false;
      this.isCuLoading = false;
      this.CuLoading = false;
      this.bcLoading = false;
      this.BcLoading = false;
      this.iscomplete = true;
      this.monstate = true;
      // this.planList = planList;
      this.resetTemp(); //清空form表单
      this.getUserOrgInfo();
      this.getCurrentUserInfo();
      this.form.planYear = parseTime(new Date(), "{y}-{m}");
      this.addStartTime = new Date();
      this.addWorkList = [];
      this.isSubmit = false;
      this.dialogType = "add";
      // this.form.orgName=orgInfo.orgName;
      this.dialogVisible = true; //显示制定弹出框
      this.addNoButten = true; //显示新增工作按钮操作
      this.dialogTitle = "工作计划制定"; //title名称
      setTimeout(() => {
        this.getList();
      }, 1000);
    },

    initUpdateDialog(data, type) {
      this.approvalStatus = data.approvalStatus;//20191114 阿彪 #2511 记录状态
      this.displayStatus=sessionStorage.getItem("modelCode");//20191114 阿彪 #2511 判断所在页面
      this.iscomplete = false;
      this.monstate = true;
      this.resetTemp(); //清空form表单
      this.form.planYear = data.planYear;
      this.addStartTime = data.planYear;
      this.form.orgName = data.orgName;
      this.form.orgId = data.orgId;
      this.form.deptId = data.deptId;
      this.form.personLiable = data.personLiable;
      this.form.approver = data.approver;
      this.form.approvalStatus = data.approvalStatusName;
      this.form.planId = data.planId;
      this.form.deptName = data.deptName;
      this.dialogType = type;
      this.iscomplete = false;
      if (type == "edit") {
        this.isSubmit = true;
        this.dialogTitle = "工作计划编辑";
        this.addNoButten = true; //显示新增工作按钮操作
      } else if (type == "carriedForward") {
        this.dialogTitle = "工作计划结转";
      } else if (type == "view") {
        this.iscomplete = true;
        this.dialogTitle = "工作计划查看";
      } else if (type == "shift") {
        this.dialogTitle = "工作计划调整";
        this.workType = "3";
        this.iscomplete = true;
      }

      this.getList();
      this.dialogVisible = true;
    },

    //获取用户单位信息
    getUserOrgInfo() {
      getUserOrgInfo().then(res => {
        if (res.length > 0) {
          this.form.orgId = res[res.length - 1].id;
          this.form.orgName = res[res.length - 1].orgName;

          this.monstate = true;
          if (this.dialogType == "add") {
            let param = {};
            param.planYear = parseTime(new Date(), "{y}-{m}");
            checkUniqueness(param).then(res => {
              if (res.data.flag == false) {
                this.monstate = false;
                this.$message({
                  message: res.msg,
                  type: "warning"
                });
              }
            });
            // this.planList.forEach(element => {
            //   if (element.planYear == this.form.planYear) {
            //     this.monstate = false;
            //     this.$message({
            //       message: "该月份工作计划已制定",
            //       type: "warning"
            //     });
            //   }
            // });
            // if (this.monstate) {
            //   this.carryOverState = "0";
            //   this.getList();
            // }
          } else {
            this.carryOverState = "0";
            this.getList();
          }
        }
      });
    },

    //结转操作
    carryForward() {
      this.carryOverFormVisible = true;
    },

    createPlanInfo() {
      // this.form.approvalStatus = "已结转";
      carryOverObj(this.form).then(res => {
        if (res.rel) {
          this.$notify({
            title: res.msg,
            message: res.msg,
            type: "success",
            duration: 2000
          });
          this.dialogVisible = false;
          this.carryOverFormVisible = false;
          this.$emit("getList");
        } else {
          this.$notify({
            title: res.msg,
            message: res.msg,
            type: "warning",
            duration: 2000
          });
          this.dialogVisible = false;
          this.carryOverFormVisible = false;
          this.$emit("getList");
        }
      });
    },
    handleDelById() {
      if (typeof this.detailsIds!="undefined" && this.detailsIds!="") {
        this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        delDetailsObj(this.detailsIds).then(res => {
          if (res.rel) {
            this.$notify({
              title: res.msg,
              message: res.msg,
              type: "success",
              duration: 2000
            });
            this.getList();
          } else {
            this.$notify({
              title: res.msg,
              message: res.msg,
              type: "warning",
              duration: 2000
            });
            this.getList();
          }
        });
      });
      }
      
    },

    //保存
    save(state) {
      let parame = {};
      this.form.approvalStatus = state;
      parame.workPlanDetails = this.addWorkList;
      //parame.state = state;
      parame.workPlan = this.form;

      if (this.dialogType == "add") {
        if (state == "11") {
          this.isLoading = true;
        }
        if (state == "3") {
          this.isTiLoading = true;
        }
        addObj(parame).then(res => {
          this.dialogVisible = false;
          this.isLoading = false;
          this.isTiLoading = false;
          if (res.rel) {
            this.$notify({
              title: "成功",
              message: res.msg,
              type: "success",
              duration: 2000
            });
            // this.isLoading = false;
            // this.isTiLoading = false;
            this.$emit("getList");
          } else {
            this.$notify({
              title: "失败",
              message: res.msg,
              type: "warning",
              duration: 2000
            });
          }
        });
      } else {
        if (state == "11") {
          this.isLoading = true;
        }
        if (state == "3") {
          this.isTiLoading = true;
        }
        editObj(parame).then(res => {
          this.dialogVisible = false;
          this.isLoading = false;
          this.isTiLoading = false;
          if (res.rel) {
            this.$notify({
              title: "成功",
              message: res.msg,
              type: "success",
              duration: 2000
            });
            this.$emit("getList");
          } else {
            this.$notify({
              title: "失败",
              message: res.msg,
              type: "warning",
              duration: 2000
            });
          }
        });
      }
    },

    //获取计划详细表信息
    getList() {
      let data = {};
      this.listLoading = true; //加载
      let params = {};
      if (this.form.planYear != "" && this.form.planYear != null) {
        params.planYear = this.form.planYear;
      }
      if (this.form.orgId != "" && this.form.orgId != null) {
        params.orgId = this.form.orgId;
      }
      if (this.form.deptId != "" && this.form.deptId != null) {
        params.deptId = this.form.deptId;
      }
      // if (this.form.orgName != "" && this.form.orgName != null) {
      //   params.orgName = this.form.orgName;
      // }
      if (this.workType != "" && this.workType != null) {
        params.workType = this.workType;
      }
      if (this.state != "" && this.state != null) {
        params.state = this.state;
      }
      params.carryOverState = this.carryOverState;

      // if (this.workType != "" && this.workType != null) {
      //   params.workType = this.workType;
      // }

      // if (this.form.planId != "" && this.form.planId != null) {
      //   params.pid = this.form.planId;
      // }
      // pageList(params).then(response => {
      pageList(params).then(response => {
        if (this.workType == 1 && this.state == "false") {
          if (typeof response.data.rows != "undefined") {
            this.lastMonthCarriedForwardList = response.data.rows;
            this.lastMonthCarriedForwardList.forEach(element => {
              element.index = 0;
            });
          }
        }
        if (this.workType == 1 && this.state == "true") {
          if (typeof response.data.rows != "undefined") {
            this.carryForwardList = response.data.rows;
            this.carryForwardList.forEach(element => {
              element.index = 0;
            });
          }
        }
        if (this.workType == 2) {
          if (typeof response.data.rows != "undefined") {
            this.addWorkList = response.data.rows;

            this.addWorkList.forEach(element => {
              element.index = 0;
            });
            for (let i = 0; i < this.addWorkList.length; i++) {
              this.addWorkList[i].index = i + 1;
            }
          }
        }
        if (this.workType == 3) {
          if (typeof response.data.rows != "undefined") {
            this.outsideThePlanList = response.data.rows;

            this.outsideThePlanList.forEach(element => {
              element.index = 0;
            });
            for (let i = 0; i < this.outsideThePlanList.length; i++) {
              this.outsideThePlanList[i].index = i + 1;
            }
          }
        }
        this.listLoading = false;
      });
    },

    handleCreate() {
      this.isLoading = false;
      this.isTiLoading = false;
      this.isCuLoading = false;
      this.CuLoading = false;
      this.bcLoading = false;
      this.BcLoading = false;
      this.resetPlanInfoForm();
      this.dialogFormVisible = true;
      this.dialogStatus = "create";
    },

    resetTemp() {
      this.form = {
        orgName: "",
        planYear: "",
        approvalStatus: "",
        personLiable: "",
        deptName: ""
      };
    },

    resetPlanInfoForm() {
      this.planInfoForm = {
        index: this.planInfoForm.index,
        complete: "",
        keyWork: "",
        jobContent: "",
        startTime: "",
        endTime: "",
        personLiable: "",
        coordinationDepartment: "",
        coordinationDepartmentname: "",
        remarks: "",
        pid: ""
      };
    },

    //新增工作_新增方法
    handleAdd() {
      this.isLoading = false;
      this.isTiLoading = false;
      this.isCuLoading = false;
      this.CuLoading = false;
      this.bcLoading = false;
      this.BcLoading = false;
      this.resetPlanInfoForm();
      this.Data = parseTime(this.addStartTime, "{y}-{m}");
      this.Data += "-1";
      this.planInfoForm.startTime = this.Data;
      this.planInfoForm.endTime = this.Data;
      this.dialogFormVisible = true;
      this.dialogStatus = "workCreate";
    },

    //新增工作_修改方法
    workUpdate() {
      this.isLoading = false;
      this.isTiLoading = false;
      this.isCuLoading = false;
      this.CuLoading = false;
      this.bcLoading = false;
      this.BcLoading = false;
      this.dialogStatus = "updataCreate";
      if (typeof this.indexs !="undefined") {
           if (this.indexs != "" && this.indexs.length < 2) {
        let flag = this.indexs - 1;
        this.planInfoForm = this.addWorkList[flag];
        this.dialogFormVisible = true;
        if (this.addWorkList != null) {
          this.addWorkList.forEach(element => {
            element.index = 0;
          });
          for (let i = 0; i < this.addWorkList.length; i++) {
            this.addWorkList[i].index = i + 1;
          }
        }
      } else if (this.indexs.length > 1) {
        this.$message({
          message: "禁止选取多条数据",
          type: "warning"
        });
      } else {
        this.$message({
          message: "请选择一条数据",
          type: "warning"
        });
      }
      }
   
    },

    //新增工作_新增数据
    create_planInfo(formName) {
      this.isCuLoading = true;
      const set = this.$refs;
      let that = this;
      set[formName].validate(valid => {
        if (valid) {
          let parame = {};
          this.planInfoForm.index += 1;
          parame.index = this.planInfoForm.index; //索引
          if (this.planInfoForm.startTime.indexOf("T") == -1) {
            parame.startTime = this.planInfoForm.startTime;
          } else {
            parame.startTime = parseTime(
              this.planInfoForm.startTime,
              "{y}-{m}-{d}"
            ); //开始时间
          }
          if (this.planInfoForm.endTime.indexOf("T") == -1) {
            parame.endTime = this.planInfoForm.endTime;
          } else {
            parame.endTime = parseTime(
              this.planInfoForm.endTime,
              "{y}-{m}-{d}"
            ); //开始时间
          }
          parame.keyWork = this.planInfoForm.keyWork; //是否重点工作
          parame.personLiable = this.planInfoForm.personLiable; //负责人
          parame.orgName = this.planInfoForm.orgName; //配合部门
          parame.jobContent = this.planInfoForm.jobContent; //工作内容
          parame.remarks = this.planInfoForm.remarks;
          parame.complete = this.planInfoForm.complete;
          parame.coordinationDepartment = this.planInfoForm.coordinationDepartment;
          parame.coordinationDepartmentName = this.planInfoForm.coordinationDepartmentName;
          this.deptOptions.forEach(element => {
            if (element.deptId == parame.coordinationDepartment) {
              parame.coordinationDepartmentName = element.deptName;
            }
          });

          that.addWorkList.push(parame);
          if (this.addWorkList != null) {
            this.addWorkList.forEach(element => {
              element.index = 0;
            });
            for (let i = 0; i < this.addWorkList.length; i++) {
              this.addWorkList[i].index = i + 1;
            }
          }
          this.dialogFormVisible = false;
          this.resetPlanInfoForm();
        } else {
          this.isCuLoading = false;
          return false;
        }
      });
    },
    update_PlanInfo() {
      this.CuLoading = true;
      console.log(this.planInfoForm);

      this.deptOptions.forEach(element => {
        if (element.deptId == this.planInfoForm.coordinationDepartment) {
          this.planInfoForm.coordinationDepartmentName = element.deptName;
        }
      });

      this.addWorkList.forEach(element => {
        if (this.planInfoForm.index == element.index) {
          if (this.planInfoForm.startTime.indexOf("T") == -1) {
            element.startTime = this.planInfoForm.startTime;
          } else {
            element.startTime = parseTime(
              this.planInfoForm.startTime,
              "{y}-{m}-{d}"
            ); //开始时间
          }
          if (this.planInfoForm.endTime.indexOf("T") == -1) {
            element.endTime = this.planInfoForm.endTime;
          } else {
            element.endTime = parseTime(
              this.planInfoForm.endTime,
              "{y}-{m}-{d}"
            ); //开始时间
          }
          element.keyWork = this.planInfoForm.keyWork; //是否重点工作
          element.personLiable = this.planInfoForm.personLiable; //负责人
          element.orgName = this.planInfoForm.orgName; //配合部门
          element.jobContent = this.planInfoForm.jobContent; //工作内容
          element.remarks = this.planInfoForm.remarks;
          element.complete = this.planInfoForm.complete;
          element.coordinationDepartment = this.planInfoForm.coordinationDepartment;
          element.coordinationDepartmentName = this.planInfoForm.coordinationDepartmentName;
        }
      });
      if (this.addWorkList != null) {
        this.addWorkList.forEach(element => {
          element.index = 0;
        });
        for (let i = 0; i < this.addWorkList.length; i++) {
          this.addWorkList[i].index = i + 1;
        }
      }
      this.dialogFormVisible = false;
      // this.CuLoading = false;
    },

    //工作删除
    deleteWorkById() {
      if (this.indexs == ""||typeof this.indexs =="undefined") {
        this.$message({
          message: "请选择一条数据",
          type: "warning"
        });
      } else {
        //20191116 阿彪 #2511 工作计划制定添加删除接口，后台添加修改记录功能
        var n = this.indexs.split(",");
        let delfun=()=>{
          n.forEach(element => {
            this.addWorkList.splice(n - 1, 1);
            this.addWorkList.forEach(element => {
              element.index = 0;
            });
            for (let i = 0; i < this.addWorkList.length; i++) {
              this.addWorkList[i].index = i + 1;
            }
          });
        };
        if(this.displayStatus=='marketingPlanFormulate'){//根据modelCode判断当前页面是工作计划制定页面
          this.$confirm("此操作将永久删除, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }).then(() => {
            let ids=''
            n.forEach(el => {
              if(typeof this.addWorkList[el-1].detailsId!='undefined'){
                ids+=','+this.addWorkList[el-1].detailsId;
              }
            })
            ids = ids.substring(1);
            deletByid({detailsId:ids,state:this.approvalStatus}).then(res => {
              if (res.rel) {
                this.$notify({
                  title: res.msg,
                  message: res.msg,
                  type: "success",
                  duration: 2000
                });
                delfun()
              } else {
                this.$notify({
                  title: res.msg,
                  message: res.msg,
                  type: "warning",
                  duration: 2000
                });
              }
            });
          });
        }else{
          delfun()
        }
      }
    },

    //复选框
    selsChange(val) {
      let id = "";
      val.forEach(element => {
        id += "," + element.planId;
      });
      id = id.substring(1);
      this.sels = id;

      let index = ""; //索引
      val.forEach(element => {
        index += "," + element.index;
      });
      index = index.substring(1);
      this.indexs = index;

      let detailsId = "";
      val.forEach(element => {
        detailsId += "," + element.detailsId;
      });
      detailsId = detailsId.substring(1);
      this.detailsIds = detailsId;
    },

    handleClick(tab, event) {
      this.resetPlanInfoForm();
      this.workType = tab.name;
      if (this.workType == "lastMonthCarriedForward") {
        this.workType = "1";
        this.carryOverState = "1";
        this.state = "false";
      } else if (this.workType == "carriedForward") {
        this.workType = "1";
        this.carryOverState = "0";
        this.state = "true";
      } else if (this.workType == "addWork") {
        this.workType = "2";
        this.carryOverState = "0";
        this.state = "true";
      } else if (this.workType == "outsideThePlan") {
        this.workType = "3";
        this.carryOverState = "0";
        this.state = "true";
      } else if (this.workType == "outsideThePlan") {
      }
      this.getList();
    },

    //点击计划年月触发列表查询方法
    getPlanYear(val) {
      this.lastMonthCarriedForwardList = [];
      this.carryForwardList = [];
      this.addWorkList = [];
      this.outsideThePlanList = [];
      this.monstate = true;
      if (val) {
        this.monthData = parseTime(val, "{y}-{m}");
        this.addStartTime = this.monthData;
      }
      this.form.planYear = this.monthData;
      if (this.dialogType == "add") {
        let param = {};
        param.planYear = this.monthData;
        checkUniqueness(param).then(res => {
          if (res.data.flag == false) {
            this.monstate = false;
            this.$message({
              message: res.msg,
              type: "warning"
            });
          }
        });
        // this.planList.forEach(element => {
        //   if (element.planYear == this.monthData) {
        //     this.monstate = false;
        //     this.$message({
        //       message: "该月份工作计划已制定",
        //       type: "warning"
        //     });
        //   }
        // });
        // if (this.monstate) {
        //   this.getList();
        // }
      } else {
        this.getList();
      }
    },
    getEndTime(val) {
      this.disabaled = false;

      if (val) {
        this.monthData = parseTime(val, "{y}-{m}-{d}");
      }
      this.planInfoForm.endTime = this.monthData;
      if (
        this.planInfoForm.endTime != "" &&
        this.planInfoForm.startTime != ""
      ) {
        let time1 = new Date(this.planInfoForm.endTime).getTime();
        let time2 = new Date(this.planInfoForm.startTime).getTime();

        if (time1 < time2) {
          this.disabaled = true;
          this.$notify({
            title: "失败",
            message: "开始时间不能大于结束时间",
            type: "error",
            duration: 2000
          });
        }
      }
    },
    getStartTime(val) {
      this.disabaled = false;

      if (val) {
        this.monthData = parseTime(val, "{y}-{m}-{d}");
      }
      this.planInfoForm.startTime = this.monthData;

      if (
        this.planInfoForm.endTime != "" &&
        this.planInfoForm.startTime != ""
      ) {
        let time1 = new Date(this.planInfoForm.endTime).getTime();
        let time2 = new Date(this.planInfoForm.startTime).getTime();
        if (time1 < time2) {
          this.disabaled = true;
          this.$notify({
            title: "失败",
            message: "开始时间不能大于结束时间",
            type: "error",
            duration: 2000
          });
          this.isLoading = false;
          this.isTiLoading = false;
          this.isCuLoading = false;
          this.CuLoading = false;
          this.bcLoading = false;
          this.BcLoading = false;
        }
      }
    },

    //编辑
    handleUpdate() {
      this.isLoading = false;
      this.isTiLoading = false;
      this.isCuLoading = false;
      this.CuLoading = false;
      this.bcLoading = false;
      this.BcLoading = false;
      if (typeof this.detailsIds!="undefined") {
         let n = this.detailsIds.split(",");
      if (this.detailsIds != "") {
        this.outsideThePlanList.forEach(element => {
          if (element.detailsId == this.detailsIds) {
            this.planInfoForm = element;
          }
          this.dialogStatus = "update";
          this.dialogFormVisible = true;
        });
      } else if (n.length > 1) {
        this.$message({
          message: "禁止选取多条数据",
          type: "warning"
        });
      } else {
        this.$message({
          message: "请选择一条数据",
          type: "warning"
        });
       }
     }
    },

    //编辑的公共组
    public_update(formName) {
      this.BcLoading = true;
      const set = this.$refs;
      set[formName].validate(valid => {
        if (valid) {
          this.dialogFormVisible = false;
          putDetilsObj(this.planInfoForm, this.planInfoForm.detailsId).then(
            res => {
              if (res.rel) {
                this.$notify({
                  title: "成功",
                  message: res.msg,
                  type: "success",
                  duration: 2000
                });
                this.dialogFormVisible = false;
                this.getList();
              } else {
                this.$notify({
                  title: "失败",
                  message: res.msg,
                  type: "warning",
                  duration: 2000
                });
                this.BcLoading = false;
              }
            }
          );
        } else {
          return false;
          this.BcLoading = false;
        }
      });
    },

    public_add(formName) {
      this.bcLoading = true;
      const set = this.$refs;
      set[formName].validate(valid => {
        if (valid) {
          this.planInfoForm.pid = this.form.planId;
          this.planInfoForm.workType = "3";
          this.planInfoForm.carryOverState = "0";
          addDetailsObj(this.planInfoForm).then(res => {
            this.dialogFormVisible = false;
            if (res.rel) {
              this.$notify({
                title: "成功",
                message: res.msg,
                type: "success",
                duration: 2000
              });
              this.getList();
            } else {
              this.$notify({
                title: "失败",
                message: res.msg,
                type: "warning",
                duration: 2000
              });
              this.bcLoading = false;
            }
          });
        } else {
          return false;
          this.bcLoading = false;
        }
      });
    },

    //新增的form的 保存
    create_bc(planInfoForm) {
      this.planInfoForm.workType = this.workType;
      this.public_add(planInfoForm);
    },

    //编辑的form的 保存
    update_bc(planInfoForm) {
      this.planInfoForm.workType = this.workType;
      this.public_update(planInfoForm);
      this.getList();
    },

    jobContentInput() {
      let txtVal = this.planInfoForm.jobContent.length - 1;
      this.jobContentFormRemnant = txtVal + 1;
    },
    remarksInput() {
      let txtVal = this.planInfoForm.remarks.length - 1;
      this.remarksFormRemnant = txtVal + 1;
    },

    //关闭form
    cancel(formName) {
      this.dialogFormVisible = false;
      this.carryOverFormVisible = false;
      //  const set = this.$refs;
      //  set[formName].resetFields();
      this.resetPlanInfoForm();
    },

    //弹框关闭执行方法
    handleClose() {
      //清空表单
      const _set = this.$refs;
      if (_set.contractLedgerForm === undefined) {
      } else {
        _set.contractLedgerForm.resetTemp();
      }
      this.dialogVisible = false;
    }
  }
};
</script>
<style scoped>
.validateText {
  position: absolute;
  font-size: 10px;
  bottom: -4px;
  right: 9px;
}

.fontMove {
  font-size: 30px;
  margin-top: 80px;
  margin-left: 50px;
}
</style>
