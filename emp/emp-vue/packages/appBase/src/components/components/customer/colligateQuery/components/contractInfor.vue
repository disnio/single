<template>
  <div class="app-container calendar-list-container">
    <!-- table -->
    <el-table
      border
      :data="list"
      v-loading.body="listLoading"
      ref="list"
      @selection-change="selsChange"
      height="290px"
    >
      <el-table-column align="center" type="selection"></el-table-column>

      <el-table-column prop="index" label="序号" align="center"></el-table-column>

      <el-table-column align="center" label="合同名称">
        <template slot-scope="scope">
          <div class="txt-left">{{scope.row.contractName}}</div>
        </template>
      </el-table-column>
      <el-table-column align="center" label="合同类型">
        <template slot-scope="scope">
          <span>{{scope.row.contractTypeName}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="关联合同模板">
        <template slot-scope="scope">
          <div class="txt-left">{{scope.row.contractTemplateName}}</div>
        </template>
      </el-table-column>
      <el-table-column align="center" label="状态">
        <template slot-scope="scope">
          <span>{{scope.row.dataStatusName}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="生效时间">
        <template slot-scope="scope">
          <span>{{scope.row.beginDateTime}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="失效时间">
        <template slot-scope="scope">
          <span>{{scope.row.endDateTime}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="view" label="查看详情">
        <template slot-scope="scope">
          <el-button size="small" type="text" @click="viewShow(scope.row)">预览</el-button>
        </template>
      </el-table-column>
      <el-table-column fixed="right" align="center" label="操作">
        <template slot-scope="scope">
          <el-button size="small" type="text" @click="handelCheck(scope.row,'views',true)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div v-show="!listLoading" class="pagination-container">
      <!-- page -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="listQuery.page"
        :page-sizes="[10,20,30, 50,100,200,500,1000]"
        :page-size="listQuery.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <el-dialog v-drag :close-on-click-modal="false"
      v-bind:title="this.sdTemplateId"
      :visible.sync="alertDialogVisible"
      custom-class="w1000 "
      v-loading="formLoading"
      :before-close="handleClose"
      append-to-body
    >
      <!-- 弹出form -->

      <div>
        <el-scrollbar>
          <div class="altdiv">
            <el-form
              ref="HtContractVO"
              :model="HtContractVO"
              label-width="150px"
              :rules="HtContractVORules"
            >
              <div>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="合同编码:" prop="htContract.contractCode">
                      <el-input readonly v-model="HtContractVO.htContract.contractCode"></el-input>
                    </el-form-item>
                    <el-form-item label="合同签订日期：" prop="htContract.signingDate">
                      <el-date-picker
                        @change="getSigningTime"
                        v-model="HtContractVO.htContract.signingDate"
                        type="date"
                        readonly
                        placeholder="日期选择"
                        style="width:100%;"
                      ></el-date-picker>
                    </el-form-item>
                    <div v-if="HtContractVO.htContract.contractTypeCode=='htlx01'">
                      <el-form-item prop="htContract.customerName" label="供应商名称：">
                        <el-select
                          style="width:100%;"
                          readonly
                          v-model="HtContractVO.htContract.customerName"
                          filterable
                          remote
                          :clearable="clear_able1"
                          placeholder="请输入"
                          :remote-method="remoteMethod1"
                          :loading="loading"
                          @change="codeValue1"
                        >
                          <el-option
                            v-for="item in options1"
                            :key="item.idex"
                            :label="item.customerName"
                            :value="item.customerId"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                    </div>
                    <div v-else-if="HtContractVO.htContract.contractTypeCode=='htlx02'">
                      <el-form-item prop="htContract.customerName" label="售电/被替代方:">
                        <el-select
                          style="width:100%;"
                          v-model="HtContractVO.htContract.customerName"
                          filterable
                          remote
                          readonly
                          :clearable="clear_able1"
                          placeholder="请输入"
                          :remote-method="remoteMethod2"
                          :loading="loading"
                          @change="codeValue2"
                        >
                          <el-option
                            v-for="item in options2"
                            :key="item.index"
                            :label="item.customerName"
                            :value="item.customerId"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                    </div>
                    <div v-else>
                      <el-form-item prop="htContract.customerName" label="甲方:">
                        <el-select
                          style="width:100%;"
                          v-model="HtContractVO.htContract.customerName"
                          filterable
                          remote
                          readonly
                          :clearable="clear_able1"
                          reserve-keyword
                          :remote-method="remoteMethod3"
                          :loading="loading"
                          @change="codeValue3"
                        >
                          <el-option
                            v-for="item in options3"
                            :key="item.index"
                            :label="item.customerName"
                            :value="item.customerId"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                    </div>

                    <el-form-item label="合同生效日期：" prop="htContract.beginDate">
                      <el-date-picker
                        @change="getBeginTime"
                        type="date"
                        readonly
                        placeholder="选择日期"
                        v-model="HtContractVO.htContract.beginDate"
                        style="width: 100%;"
                      ></el-date-picker>
                    </el-form-item>
                    <el-form-item prop="htContract.totalElectricity" label="合同总电量：">
                      <el-input
                        placeholder="请输入数值"
                        readonly
                        v-model="HtContractVO.htContract.totalElectricity"
                      >
                        <template slot="append">{{unitMap.electricityUnit }}</template>
                      </el-input>
                    </el-form-item>
                    <el-form-item label="附件">
                      <span v-if="file_rode" class="fileName">
                        <a
                          href="#"
                          :title="this.fileInfo.name"
                          :data-title="this.fileInfo.path"
                  
                        >{{fileInfo.name}}</a>
                      </span>
                      <span class="delFile" v-if="!uploadBtn" @click="showUpload">
                        <i class="el-icon-close"></i>
                      </span>
                      <el-upload
                        class="upload-demo no-list"
                        ref="uploadFileAdd"
                        action="/api/contract/htContract/uploadFile"
                        :show-file-list="show_file_name"
                        :before-upload="before_upload"
                        :headers="uplaodHeaders"
                        :on-change="handleChange"
                        :auto-upload="false"
                        :on-success="uploadCb"
                        :limit="limit_number"
                      >
                        <el-button slot="trigger" size="small" type="primary" v-if="uploadBtn">选取文件</el-button>
                      </el-upload>
                    </el-form-item>
                  </el-col>

                  <el-col :span="12">
                    <el-form-item label="合同名称:" prop="htContract.contractName">
                      <el-input readonly v-model="HtContractVO.htContract.contractName"></el-input>
                    </el-form-item>
                    <el-form-item label="合同状态：" prop="htContract.stateCode">
                      <el-select
                        style="width:100%"
                        v-model="HtContractVO.htContract.stateCode"
                        readonly
                        placeholder="请选择状态"
                      >
                        <el-option
                          v-for="item in althtStateCodeList"
                          :key="item.propCode"
                          :label="item.propName"
                          :value="item.propCode"
                        ></el-option>
                      </el-select>
                    </el-form-item>

                    <div v-if="HtContractVO.htContract.contractTypeCode=='htlx01'">
                      <el-form-item label="购电方:" prop="htContract.secondPartName">
                        <el-input
                          v-model="HtContractVO.htContract.secondPartName"
                          readonly
                          disabled
                        ></el-input>
                      </el-form-item>
                    </div>
                    <div v-else-if="HtContractVO.htContract.contractTypeCode=='htlx02'">
                      <el-form-item label="购电/替代方:" prop="htContract.secondPartName">
                        <el-select
                          readonly
                          style="width:100%;"
                          v-model="HtContractVO.htContract.secondPartName"
                          filterable
                          remote
                          :clearable="clear_able"
                          reserve-keyword
                          :remote-method="remoteMethod5"
                          :loading="loading"
                          @change="codeValue5"
                        >
                          <el-option
                            v-for="item in options5"
                            :key="item.index"
                            :label="item.customerName"
                            :value="item.customerId"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                    </div>
                    <div v-else>
                      <el-form-item prop="htContract.secondPartName" label="乙方:">
                        <el-input
                          readonly
                          v-model="HtContractVO.htContract.secondPartName"
                          disabled
                        ></el-input>
                      </el-form-item>
                    </div>

                    <el-form-item prop="htContract.endDate" label="合同失效日期：">
                      <el-date-picker
                        type="date"
                        @change="getEndTime"
                        placeholder="选择日期"
                        v-model="HtContractVO.htContract.endDate"
                        style="width: 100%;"
                        readonly
                      ></el-date-picker>
                    </el-form-item>
                    <el-form-item label="备注:" prop="htContract.remarks">
                      <el-input readonly v-model="HtContractVO.htContract.remarks"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-collapse>
                  <el-collapse-item
                    title="收益方式"
                    name="1"
                    style="margin-left:10px"
                    v-if="HtContractVO.htContract.contractTypeCode=='htlx03'"
                  >
                    <div v-if="this.saleContractType=='sdhtlx01'">
                      <el-row>
                        <el-col :span="12">
                          <el-form-item
                            prop="htContract.contractTypeCode"
                            label="合同类型:"
                            placeholder="保底合同"
                          >
                            <el-input readonly v-model="this.sdTemplateId"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="固定降价/保底电价:" prop="clausePrice.bottomPrice">
                            <el-input readonly v-model="HtContractVO.clausePrice.bottomPrice"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </div>

                    <div v-else-if="this.saleContractType=='sdhtlx02'">
                      <el-row>
                        <el-col :span="12">
                          <el-form-item
                            prop="htContract.contractTypeCode"
                            label="合同类型:"
                            placeholder="保底合同"
                          >
                            <el-input readonly v-model="this.sdTemplateId"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="用户分成比例:" prop="clausePrice.customerProportion">
                            <el-input
                              placeholder="%"
                              readonly
                              v-model="HtContractVO.clausePrice.customerProportion"
                            ></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </div>
                    <div v-else>
                      <el-row>
                        <el-col :span="8">
                          <el-form-item
                            prop="htContract.contractTypeCode"
                            label="合同类型:"
                            placeholder="保底合同"
                          >
                            <el-input readonly v-model="this.sdTemplateId"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item label="固定降价/保底电价:" prop="clausePrice.bottomPrice">
                            <el-input readonly v-model="HtContractVO.clausePrice.bottomPrice"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item label="用户分成比例:" prop="clausePrice.customerProportion">
                            <el-input
                              placeholder="%"
                              readonly
                              v-model="HtContractVO.clausePrice.customerProportion"
                            ></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </div>
                  </el-collapse-item>
                  <el-collapse-item
                    title="违约赔偿条件"
                    name="2"
                    style="margin-left:10px"
                    v-if="HtContractVO.htContract.contractTypeCode=='htlx03'"
                  >
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="是否赔偿：" prop="clauseDefault.compensate">
                          <el-select
                            style="width:100%"
                            readonly
                            v-model="HtContractVO.clauseDefault.compensate"
                            placeholder="请选择是否赔偿甲方"
                          >
                            <el-option
                              v-for="item in compensationList"
                              :key="item.propCode"
                              :label="item.propName"
                              :value="item.propCode"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item
                          v-if="HtContractVO.clauseDefault.compensate=='wypctj02'"
                          label="赔偿说明:"
                          placeholder="按用户成交价差赔偿"
                          prop="clauseDefault.compensationStatement"
                        >
                          <el-input
                            readonly
                            v-model="HtContractVO.clauseDefault.compensationStatement"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-collapse-item>
                  <el-collapse-item
                    title="免考核条件"
                    name="3"
                    style="margin-left:10px"
                    v-if="HtContractVO.htContract.contractTypeCode=='htlx03'"
                  >
                    <el-row>
                      <el-col :span="12">
                        <el-form-item
                          label="免考核条件:"
                          style="width:100%"
                          prop="clauseAssessment.assessmentExemption"
                        >
                          <el-select
                            readonly
                            style="width:100%"
                            v-model="HtContractVO.clauseAssessment.assessmentExemption"
                            placeholder="请选择免考核条件"
                            @change="SelectAssValue"
                          >
                            <el-option
                              v-for="item in conditions"
                              :key="item.propCode"
                              :label="item.propName"
                              :value="item.propCode"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item
                          label="甲方免考核比例(%):"
                          style="width:100%"
                          prop="clauseAssessment.partyAssessmentRatio"
                        >
                          <el-input-number
                            readonly
                            v-model="HtContractVO.clauseAssessment.partyAssessmentRatio"
                            :min="0"
                            :max="100"
                            label="输入数字"
                          ></el-input-number>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-collapse-item>
                  <el-collapse-item v-bind:title="this.ydtitle" name="4" style="margin-left:10px">
                    <div v-if="HtContractVO.htContract.contractTypeCode=='htlx02'">
                      <el-row>
                        <el-col :span="12">
                          <span style="margin-left:200px;">计划转让</span>
                          <span style="margin-left:100px;">转让电价</span>
                        </el-col>
                        <el-col :span="12">
                          <span style="margin-left:200px;">计划转让</span>
                          <span style="margin-left:100px;">转让电价</span>
                        </el-col>
                      </el-row>

                      <el-row>
                        <el-col :span="12">
                          <span style="margin-left:190px;">（{{unitMap.electricityUnit }}）</span>
                          <span style="margin-left:65px;">（{{unitMap.priceUnit}}）</span>
                        </el-col>
                        <el-col :span="12">
                          <span style="margin-left:190px;">（{{unitMap.electricityUnit }}）</span>
                          <span style="margin-left:65px;">（{{unitMap.priceUnit }}）</span>
                        </el-col>
                      </el-row>
                    </div>
                    <div v-else>
                      <el-row>
                        <el-col :span="12">
                          <el-row>
                            <el-col :span="12">
                              <div class="font_center">
                                <span>计划用电</span>
                              </div>
                            </el-col>
                            <el-col :span="12">
                              <div style="text-align: center;">
                                <span>计划电价</span>
                              </div>
                            </el-col>
                          </el-row>
                        </el-col>
                        <el-col :span="12">
                          <el-row>
                            <el-col :span="12">
                              <div class="font_center">
                                <span>计划用电</span>
                              </div>
                            </el-col>
                            <el-col :span="12">
                              <div style="text-align: center;">
                                <span>计划电价</span>
                              </div>
                            </el-col>
                          </el-row>
                        </el-col>
                      </el-row>

                      <el-row>
                        <el-col :span="12">
                          <el-row>
                            <el-col :span="12">
                              <div style="text-align: right;">
                                <span>({{unitMap.electricityUnit }})</span>
                              </div>
                            </el-col>
                            <el-col :span="12">
                              <div style="text-align: center;">
                                <span>({{unitMap.priceUnit }})</span>
                              </div>
                            </el-col>
                          </el-row>
                        </el-col>
                        <el-col :span="12">
                          <el-row>
                            <el-col :span="12">
                              <div style="text-align: right;">
                                <span>({{unitMap.electricityUnit }})</span>
                              </div>
                            </el-col>
                            <el-col :span="12">
                              <div style="text-align: center;">
                                <span>({{unitMap.priceUnit}})</span>
                              </div>
                            </el-col>
                          </el-row>
                        </el-col>
                      </el-row>
                    </div>

                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="1月:" prop="clausePlan.janElectricityTrade">
                          <el-input
                            type="number"
                            readonly
                            v-model="HtContractVO.clausePlan.janElectricityTrade"
                            style="width:45%"
                          ></el-input>
                          <el-input
                            type="number"
                            readonly
                            v-model="HtContractVO.clausePlan.janElectricityPrice"
                            style="width:45%"
                          ></el-input>
                        </el-form-item>
                        <el-form-item label="2月:" prop="clausePlan.febElectricityTrade">
                          <el-input
                            type="number"
                            readonly
                            v-model="HtContractVO.clausePlan.febElectricityTrade"
                            style="width:45%"
                          ></el-input>
                          <el-input
                            type="number"
                            readonly
                            v-model="HtContractVO.clausePlan.febElectricityPrice"
                            style="width:45%"
                          ></el-input>
                        </el-form-item>
                        <el-form-item label="3月:" prop="clausePlan.marElectricityTrade">
                          <el-input
                            type="number"
                            readonly
                            v-model="HtContractVO.clausePlan.marElectricityTrade"
                            style="width:45%"
                          ></el-input>
                          <el-input
                            type="number"
                            readonly
                            v-model="HtContractVO.clausePlan.marElectricityPrice"
                            style="width:45%"
                          ></el-input>
                        </el-form-item>
                        <el-form-item label="4月:" prop="clausePlan.aprElectricityTrade">
                          <el-input
                            type="number"
                            readonly
                            v-model="HtContractVO.clausePlan.aprElectricityTrade"
                            style="width:45%"
                          ></el-input>
                          <el-input
                            type="number"
                            readonly
                            v-model="HtContractVO.clausePlan.aprElectricityPrice"
                            style="width:45%"
                          ></el-input>
                        </el-form-item>
                        <el-form-item label="5月:" prop="clausePlan.mayElectricityTrade">
                          <el-input
                            type="number"
                            readonly
                            v-model="HtContractVO.clausePlan.mayElectricityTrade"
                            style="width:45%"
                          ></el-input>
                          <el-input
                            type="number"
                            readonly
                            v-model="HtContractVO.clausePlan.mayElectricityPrice"
                            style="width:45%"
                          ></el-input>
                        </el-form-item>
                        <el-form-item label="6月:" prop="clausePlan.junElectricityTrade">
                          <el-input
                            type="number"
                            readonly
                            v-model="HtContractVO.clausePlan.junElectricityTrade"
                            style="width:45%"
                          ></el-input>
                          <el-input
                            type="number"
                            readonly
                            v-model="HtContractVO.clausePlan.junElectricityPrice"
                            style="width:45%"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="7月:" prop="clausePlan.julElectricityTrade">
                          <el-input
                            type="number"
                            readonly
                            v-model="HtContractVO.clausePlan.julElectricityTrade"
                            style="width:45%"
                          ></el-input>
                          <el-input
                            type="number"
                            readonly
                            v-model="HtContractVO.clausePlan.julElectricityPrice"
                            style="width:45%"
                          ></el-input>
                        </el-form-item>
                        <el-form-item label="8月:" prop="clausePlan.augElectricityTrade">
                          <el-input
                            type="number"
                            readonly
                            v-model="HtContractVO.clausePlan.augElectricityTrade"
                            style="width:45%"
                          ></el-input>
                          <el-input
                            type="number"
                            readonly
                            v-model="HtContractVO.clausePlan.augElectricityPrice"
                            style="width:45%"
                          ></el-input>
                        </el-form-item>
                        <el-form-item label="9月:" prop="clausePlan.sepElectricityTrade">
                          <el-input
                            type="number"
                            readonly
                            v-model="HtContractVO.clausePlan.sepElectricityTrade"
                            style="width:45%"
                          ></el-input>
                          <el-input
                            type="number"
                            readonly
                            v-model="HtContractVO.clausePlan.sepElectricityPrice"
                            style="width:45%"
                          ></el-input>
                        </el-form-item>
                        <el-form-item label="10月:" prop="clausePlan.octElectricityTrade">
                          <el-input
                            type="number"
                            readonly
                            v-model="HtContractVO.clausePlan.octElectricityTrade"
                            style="width:45%"
                          ></el-input>
                          <el-input
                            type="number"
                            readonly
                            v-model="HtContractVO.clausePlan.octElectricityPrice"
                            style="width:45%"
                          ></el-input>
                        </el-form-item>
                        <el-form-item label="11月:" prop="clausePlan.novElectricityTrade">
                          <el-input
                            type="number"
                            readonly
                            v-model="HtContractVO.clausePlan.novElectricityTrade"
                            style="width:45%"
                          ></el-input>
                          <el-input
                            type="number"
                            readonly
                            v-model="HtContractVO.clausePlan.novElectricityPrice"
                            style="width:45%"
                          ></el-input>
                        </el-form-item>
                        <el-form-item label="12月:" prop="clausePlan.decElectricityTrade">
                          <el-input
                            type="number"
                            readonly
                            v-model="HtContractVO.clausePlan.decElectricityTrade"
                            style="width:45%"
                          ></el-input>
                          <el-input
                            type="number"
                            readonly
                            v-model="HtContractVO.clausePlan.decElectricityPrice"
                            style="width:45%"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-collapse-item>
                  <el-collapse-item
                    title="终止履约赔偿条件"
                    name="5"
                    style="margin-left:10px"
                    v-if="HtContractVO.htContract.contractTypeCode=='htlx03'"
                  >
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="赔偿方式：" prop="clauseViolation.compensation">
                          <el-select
                            @change="getSelectValue"
                            v-model="HtContractVO.clauseViolation.compensation"
                            placeholder="请选择赔偿方式"
                            style="width:100%"
                            readonly
                          >
                            <el-option
                              v-for="item in htWaysOfCompensation"
                              :key="item.propCode"
                              :label="item.propName"
                              :value="item.propCode"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <div v-if="this.HtContractVO.clauseViolation.compensation=='pcfs_01'">
                          <el-form-item label="签约电量乘固定降价" prop="clauseViolation.compensationValue2">
                            <el-input
                              placeholder="%"
                              readonly
                              v-model="HtContractVO.clauseViolation.compensationValue2"
                            ></el-input>
                          </el-form-item>
                        </div>
                        <div v-else>
                          <el-form-item label="支付违约金：" prop="clauseViolation.compensationValue1">
                            <el-input
                              placeholder="万"
                              readonly
                              v-model="HtContractVO.clauseViolation.compensationValue1"
                            ></el-input>
                          </el-form-item>
                        </div>
                      </el-col>
                    </el-row>
                  </el-collapse-item>
                  <el-collapse-item
                    title="合同附加条款"
                    name="6"
                    style="margin-left:10px"
                    v-if="HtContractVO.htContract.contractTypeCode=='htlx03'"
                  >
                    <el-form-item label="合同附加条款：">
                      <el-input
                        type="textarea"
                        rows="5"
                        resize="none"
                        readonly
                        v-model="HtContractVO.additionalClause.additionalClauseText"
                      ></el-input>
                    </el-form-item>
                  </el-collapse-item>
                </el-collapse>
              </div>
            </el-form>
          </div>
        </el-scrollbar>
      </div>
      <div slot="footer" class="dialog-footer btn_footer">
        <!-- 按钮 -->
        <el-button class="cancel-btn" @click="close()">关闭</el-button>
      </div>
    </el-dialog>
    <!-- 预览 -->
    <el-dialog v-drag :close-on-click-modal="false"
      title="预览"
      :visible.sync="viewDialogVisible"
      custom-class="w1000"
      :lock-scroll="true"
      append-to-body
    >
     <!--  2019-11-11 #2619 滕超 弹框高度自适应 start-->
      <div :style="{paddingRight:'10px',height:dialogHeight+'px'}">
        <!--  2019-11-11 #2619 滕超 弹框高度自适应 end-->
      <el-scrollbar class="h300 bda">
        <div style="height:500px ">
          <p v-html="this.htmlstr"></p>
        </div>
      </el-scrollbar>
      </div>
    </el-dialog>
    <!-- 根据模板类型选择弹框 -->
    <el-dialog v-drag :close-on-click-modal="false" title="选择合同类型" :visible.sync="ADDtypeDialog" custom-class="w480">
      <el-row>
        <el-col :span="12">
          <p>
            <b>请选择新增合同类型：</b>
          </p>
          <p>
            <b>请选择关联售电合同模板：</b>
          </p>
        </el-col>
        <el-col :span="12">
          <el-select
            @change="gethtValue"
            v-model="HtContractVO.htContract.contractTypeCode"
            placeholder="请选择合同类型"
          >
            <el-option
              v-for="item in altContractTypeCodeList"
              :key="item.propCode"
              :label="item.propName"
              :value="item.propCode"
            ></el-option>
          </el-select>
          <el-select
            v-model="HtContractVO.htContract.templateId"
            placeholder="关联售电合同"
            style="margin-top:20px;"
            @change="SelectValue"
          >
            <el-option
              v-for="item in ContractTypeList"
              :key="item.templateId"
              :label="item.templateName"
              :value="item.templateId"
            ></el-option>
          </el-select>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button class="ok-btn" @click="switchShow()">确 定</el-button>
        <!-- 待修改 -->
      </span>
    </el-dialog>
    <Transfer
      ref="transfer"
      :althtStateCodeList="althtStateCodeList"
      :htWaysOfCompensation="htWaysOfCompensation"
      @initList="initList"
    ></Transfer>
    <PurchaseAndSale
      ref="purchaseAndSale"
      :althtStateCodeList="althtStateCodeList"
      :htWaysOfCompensation="htWaysOfCompensation"
      @initList="initList"
    ></PurchaseAndSale>
    <SellElectronics
      ref="sellElectronics"
      :althtStateCodeList="althtStateCodeList"
      :htWaysOfCompensation="htWaysOfCompensation"
      :assessmentElectricityPriceTypes="assessmentElectricityPriceTypes"
      :devAssessmentElecPriceWays="devAssessmentElecPriceWays"
      @initList="initList"
    ></SellElectronics>
  </div>
</template>

<script>
import {
  getContractTypeCode,
  getStateCode,
  getContractType,
  page,
  addObj,
  delObj,
  exportObj,
  getcompensation,
  getconditions,
  getWaysOfCompensation,
  getObj,
  editObj,
  viewShow,
  download,
  getSupplierCode
} from "@common/api/contractManage/contractLedger/index";
import { getToken } from "@common/utils/auth";
import { mapGetters } from "vuex";
import { getcustomerId } from "@common/api/contractManage/contractLedger/index";
import { parseTime ,getUnitMap,initDialogHeight} from "@common/utils/index";
// 引入合同台账查询组件
import {
  SellElectronics,
  PurchaseAndSale,
  Transfer
} from "@common/components//contractLedger";
import { getSelectList,downloadOneFile } from "@common/api/base";
export default {
  name: "contract-infor",
  components: {
    Transfer,
    PurchaseAndSale,
    SellElectronics
  },
  props: {
    customerId: {
      type: String
    }
  },
  data() {
    return {
      unitMap:{},
      dialogHeight: "", //预览弹框高度
      assessmentElectricityPriceTypes: [],
      devAssessmentElecPriceWays: [],
      currentCusmerId: this.customerId,
      //搜索查询相关字段
      listQuery: {
        page: 1,
        limit: 10,
        contractTypeCode: undefined, //合同类型下拉框
        status: undefined, //合同状态下拉框
        contractName: undefined, //合同名称下拉框
        customerId: undefined
      },
      ContractTypeCodeList: [], //合同类型下拉框数组
      altContractTypeCodeList: [], //弹出合同类型下拉框数组
      htStateCodeList: [], //合同状态下拉框数组
      althtStateCodeList: [], //弹出合同状态下拉框数组

      listLoading: true, //加载状态
      formLoading: false, //加载状态
      /*****按钮权限*******/
      contractLedgerManager_btn_edit: false,
      contractLedgerManager_btn_del: false,
      contractLedgerManager_btn_add: false,
      contractLedgerManager_btn_DeleteByID: false,
      contractLedgerManager_btn_Export: false,
      /*******************/
      list: null, //tableList
      HtContractVO: {
        additionalClause: {
          //additionalClauseId: "", //附加条款主键id
          additionalClauseText: "", //附加条款内容
          contractId: "" //合同信息表主键
        },
        clauseAssessment: {
          assessmentExemption: "", //免考核条件
          partyAssessmentRatio: 0 // 甲方免考核比例
          //violationId: null //主键
        },
        clauseDefault: {
          compensate: "", //是否赔偿
          compensationStatement: "" //赔偿说明
        },
        clauseViolation: {
          compensation: "", //赔偿方式
          compensationAmount: "", //按总数额赔偿
          quantityPriceProduct: "", //负偏差惩罚比例
          positiveDeviationExemption: "", //合同信息表主键
          compensationValue1: "", //支付违约金
          compensationValue2: "", //签约电量乘固定降价
          compensationValue: "" //表单提交变量

          //terminationPerformanceId: "" //主键
        },
        clausePlan: {
          aprElectricityPrice: "", //4月交易电价/转让电价
          aprElectricityTrade: "", //4月交易电量/计划转让
          augElectricityPrice: "", //8月交易电价/转让电价
          augElectricityTrade: "", //8月交易电量/计划转让
          decElectricityPrice: "", //12月交易电价/转让电价
          decElectricityTrade: "", //12月交易电量/计划转让
          febElectricityPrice: "", //2月交易电价/转让电价
          febElectricityTrade: "", //2月交易电量/计划转让
          janElectricityPrice: "", //1月交易电价/转让电价
          janElectricityTrade: "", //1月交易电量/计划转让
          julElectricityPrice: "", //7月交易电价/转让电价
          julElectricityTrade: "", //7月交易电量/计划转让
          junElectricityPrice: "", //6月交易电价/转让电价
          junElectricityTrade: "", //6月交易电量/计划转让
          marElectricityPrice: "", //3月交易电价/转让电价
          marElectricityTrade: "", //3月交易电量/计划转让
          mayElectricityPrice: "", //5月交易电价/转让电价
          mayElectricityTrade: "", //5月交易电量/计划转让
          novElectricityPrice: "", //11月交易电价/转让电价
          novElectricityTrade: "", //11月交易电量/计划转让
          octElectricityPrice: "", //10月交易电价/转让电价
          octElectricityTrade: "", //10月交易电量/计划转让
          sepElectricityPrice: "", //9月交易电价/转让电价
          sepElectricityTrade: "" //9月交易电量/计划转让
        },
        clausePrice: {
          bottomPrice: "", //保底电价
          contractId: "", ///合同信息表主键
          customerProportion: "" //用户分成比例
        },
        htContract: {
          beginDate: "", //合同生效日期
          contractCode: "", //合同编码
          contractId: "", //主键
          contractName: "", //合同名称
          contractTypeCode: "htlx03", //合同类型
          crtTime: "",
          crtUser: "",
          customerCode: "", //甲方id
          customerName: "", //甲方name
          enclosure: "", //附件路径
          endDate: "", //合同失效日期
          isdelete: "",
          orgId: "",
          purchaserName: "", ///购电方名称
          remarks: "", ///备注
          replacedParty: "", ///替代方
          signingDate: "", //合同签订日期
          stateCode: "", //合同状态
          secondPartCode: "", //乙方id
          secondPartName: "", //乙方name
          totalElectricity: 0, ///合同总电量
          updTime: "",
          updUser: "",
          templateId: "" //合同模板id
        }
      },
      //表单校验
      HtContractVORules: {
        "htContract.contractCode": [
          {
            required: true,
            message: "请输入合同编码",
            trigger: "blur"
          }
        ],

        "htContract.signingDate": [
          {
            required: true,
            message: "请输入合同签订日期",
            trigger: "blur"
          }
        ],
        "htContract.customerName": [
          {
            required: true,
            message: "请输入名称",
            trigger: "blur"
          }
        ],
        "htContract.beginDate": [
          {
            required: true,
            message: "请输入合同生效日期",
            trigger: "blur"
          }
        ],
        "htContract.totalElectricity": [
          {
            required: true,
            message: "请输入数字",
            trigger: "blur"
          }
        ],
        "htContract.contractName": [
          {
            required: true,
            message: "请输入合同名称",
            trigger: "blur"
          }
        ],
        "htContract.stateCode": [
          {
            required: true,
            message: "请输入合同状态",
            trigger: "blur"
          }
        ],
        "htContract.secondPartName": [
          {
            required: true,
            message: "请输入名称",
            trigger: "blur"
          }
        ],
        "htContract.endDate": [
          {
            required: true,
            message: "请输入合同失效日期",
            trigger: "blur"
          }
        ],

        "clausePrice.bottomPrice": [
          {
            required: true,
            message: "请输入保底电价",
            trigger: "blur"
          }
        ],

        "clauseDefault.compensationStatement": [
          {
            required: true,
            message: "请输入赔偿说明",
            trigger: "blur"
          }
        ],
        "clauseAssessment.assessmentExemption": [
          {
            required: true,
            message: "请输入免考核条件",
            trigger: "blur"
          }
        ],
        "clauseViolation.compensation": [
          {
            required: true,
            message: "请输入赔偿方式",
            trigger: "blur"
          }
        ],
        "htContract.contractTypeCode": [
          {
            required: true,
            message: "请输入合同类型",
            trigger: "blur"
          }
        ],
        "clauseDefault.compensate": [
          {
            required: true,
            message: "请输入是否赔偿",
            trigger: "blur"
          }
        ],
        "clausePrice.customerProportion": [
          {
            required: true,
            message: "请输入用户分成比例",
            trigger: "blur"
          }
        ],

        "clauseViolation.compensationValue1": [
          {
            required: true,
            message: "请输入支付违约金：",
            trigger: "blur"
          }
        ],
        "clauseViolation.compensationValue2": [
          {
            required: true,
            message: "请输入签约电量乘固定降价:",
            trigger: "blur"
          }
        ],
        "clauseAssessment.partyAssessmentRatio": [
          {
            required: true,
            message: "请输入甲方免考核比例",
            trigger: "blur"
          }
        ]
      },
      total: null, //分页总数
      sdTemplateId: "", //售电模板标题
      alertDialogVisible: false, //新增编辑弹出框状态
      loading: false, //加载状态
      //-------------------------下拉框模糊查询
      clear_able1: true,
      clear_able: true,
      options1: [],
      options2: [],
      options3: [],
      options5: [],
      loading: false,
      datatemp: "",
      states: ["Oregon", "Texas", "Utah", "Vermont", "Virginia", "Washington"],
      //-------------------------
      //上传=====================
      fileInfo: { path: "", name: "" },
      myFileList: [],
      file_rode: false,
      uploadBtn: true, //上传
      show_file_name: true,
      limit_number: 1,
      //===========================
      ydtitle: "", //标题
      viewDialogVisible: false, //预览弹出状态
      htmlstr: "", //返回页面
      ADDtypeDialog: false, //选择弹出状态
      ContractTypeList: [], //售电下拉框
      saleContractType: "", //收益方式类型
      flagoption: "", //操作记录
      compensationList: [], //是否赔偿
      conditions: [], //免考核条件
      htWaysOfCompensation: [] //赔偿方式
    };
  },
  watch: {
    customerId(val) {
      this.currentCusmerId = val;
      //获取tableList
      this.getList();
    }
  },
  mounted: function() {
    this.tMdataCustomerManager_btn_allot = false;
    let that = this;
    window.onresize = function temp() {
      that.setLayoutHeight();
    };
    /**
     * @功能描述: 获取自适应弹框高度
     * @参数:
     * @返回值:
     * @样式作用范围: 预览
     * @作者: 滕超
     * @Date: 2019-11-11 15:39:50
     * @最新修改内容:
     * @LastEditTime:
     */
    this.dialogHeight = initDialogHeight();
    that.dialogHeight = initDialogHeight();
  },
  created() {
    this.getList();
    this.unitMap=getUnitMap(this.allSubMenus,this.unitMap);
    //获取token
    this.uplaodHeaders = {
      Authorization: getToken()
    };
    /***********按钮权限************/
    this.contractLedgerManager_btn_edit = this.elements[
      "contractLedgerManager_btn_edit"
    ];
    this.contractLedgerManager_btn_del = this.elements[
      "contractLedgerManager_btn_del"
    ];
    this.contractLedgerManager_btn_add = this.elements[
      "contractLedgerManager_btn_add"
    ];
    this.contractLedgerManager_btn_DeleteByID = this.elements[
      "contractLedgerManager_btn_DeleteByID"
    ];
    this.contractLedgerManager_btn_Export = this.elements[
      "contractLedgerManager_btn_Export"
    ];
    /******************************/

    //是否赔偿
    getcompensation().then(res => {
      this.compensationList = res;
    });
    //赔偿方式
    getWaysOfCompensation().then(res => {
      this.htWaysOfCompensation = res;
    });
    //获取免考核条件
    getconditions().then(res => {
      this.conditions = res;
    });
    //获取合同类型
    getContractTypeCode().then(res => {
      let ListValue = [{ propName: "全部合同类型" }];
      res.forEach(item => {
        ListValue.push({ propName: item.propName, propCode: item.propCode });
      });
      this.altContractTypeCodeList = res;
      this.ContractTypeCodeList = ListValue;
    });
    //获取合同状态
    getStateCode().then(res => {
      let ListValue = [{ propName: "全部状态" }];
      res.forEach(item => {
        ListValue.push({ propName: item.propName, propCode: item.propCode });
      });
      this.althtStateCodeList = res;
      this.htStateCodeList = ListValue;
    });
    //关联售电合同
    getContractType(this.HtContractVO.htContract.contractTypeCode).then(res => {
      this.ContractTypeList = res.data;
    });
  },
  computed: {
    ...mapGetters(["elements","allSubMenus"])
  },
  methods: {
    //根据类型、状态、关键字查询
    search(name) {
      this.getList();
    },
    //获取合同类型
    gethtValue(val) {
      this.ContractTypeList = null;
      getContractType(this.HtContractVO.htContract.contractTypeCode).then(
        res => {
          this.ContractTypeList = res.data;
        }
      );
      this.HtContractVO.htContract.contractTypeCode = val;
      this.HtContractVO.htContract.templateId = "";
    },
    //获取列表
    getList() {
      this.listQuery.customerId = this.currentCusmerId;
      this.listLoading = true;
      page(this.listQuery).then(response => {
        if (response.data.total != "0") {
          let items = response.data.rows.map((item, index) => {
            item.index =
              index + 1 + (this.listQuery.page - 1) * this.listQuery.limit;
            return item;
          });
        }
        this.list = response.data.rows;
        this.total = response.data.total;
        this.listLoading = false;
      });
    },
    //下拉框触发事件
    getSelectValue(data) {
      this.HtContractVO.clauseViolation.compensation = data;
    },
    //关闭
    close() {
      //清空表单
      const _set = this.$refs;
      if (_set.HtContractVO === undefined) {
      } else {
        _set.HtContractVO.resetFields();
      }
      this.HtContractVO.htContract.contractTypeCode = "htlx03";
      this.alertDialogVisible = false;
      this.ADDtypeDialog = false;
    },
    //打开新增选择框
    handleCreate() {
      //清空字段
      Object.assign(this.$data.HtContractVO, this.$options.data().HtContractVO);
      this.options1 = [];
      this.options2 = [];
      this.options3 = [];
      this.options5 = [];
      this.fileInfo = { path: "", name: "" }; //初始化文件内容
      this.HtContractVO.htContract.contractTypeCode = "htlx03";
      this.HtContractVO.htContract.templateId = "";
      //查询售电下拉框
      getContractType(this.HtContractVO.htContract.contractTypeCode).then(
        res => {
          this.ContractTypeList = res.data;
        }
      );
      this.ADDtypeDialog = true;
      this.uploadBtn = true; //打开上传按钮
      this.file_rode = false;
    },
    //新增打开弹出框
    switchShow() {
      //清空上传文件
      if (this.$refs.uploadFileAdd === undefined) {
      } else {
        this.$refs.uploadFileAdd.clearFiles();
      }

      this.flagoption = "add";
      this.file_rode = false;
      if (
        this.HtContractVO.htContract.templateId == null ||
        this.HtContractVO.htContract.templateId == ""
      ) {
      } else {
        for (let item of this.ContractTypeList) {
          if (this.HtContractVO.htContract.templateId == item.templateId) {
            this.sdTemplateId = item.saleContractTypeName;
          }
        }
        if (this.HtContractVO.htContract.contractTypeCode != "htlx02") {
          getSupplierCode("zzjgsx01").then(res => {
            this.HtContractVO.htContract.secondPartName = res.data.orgName;
            this.HtContractVO.htContract.secondPartCode = res.data.orgId;
          });
        }

        for (let item of this.ContractTypeList) {
          if (this.HtContractVO.htContract.templateId == item.templateId) {
            this.saleContractType = item.saleContractType;
          }
        }
        if (this.HtContractVO.htContract.contractTypeCode == "htlx02") {
          this.ydtitle = "发电权转让计划";
        } else {
          this.ydtitle = "用电计划";
        }
        //清空表单
        const _set = this.$refs;
        if (_set.HtContractVO === undefined) {
        } else {
          _set.HtContractVO.resetFields();
        }
        this.alertDialogVisible = true;
      }
    },
    //修改方法（修改后）
    handelCheck(row, state, isView) {
      // console.log(row);
      let dataInfo = {};
      dataInfo.flagOption = state;
      dataInfo.state = isView;
      dataInfo.sdTemplateName = row.saleContractTypeName;
      dataInfo.saleContractType = row.saleContractType;
      let htContractInfo = {};
      getObj(row.contractId).then(res => {
        // console.log(res);
        //延时赋值，防止表单被修改查出的数据异步赋值
        if (res.rel) {
          htContractInfo = res.data;
          this.initSelectData();
          if (htContractInfo.htContract.contractTypeCode == "htlx03") {
            this.$refs.sellElectronics.initEditDialog(htContractInfo, dataInfo);
          } else if (htContractInfo.htContract.contractTypeCode == "htlx01") {
            this.$refs.purchaseAndSale.initEditDialog(htContractInfo, dataInfo);
          } else {
            this.$refs.transfer.initEditDialog(htContractInfo, dataInfo);
          }
        } else {
          this.$alert(res.msg, {
            type: "warning",
            confirmButtonText: "确定",
            callback: action => {}
          });
        }
      });
    },
    initSelectData() {
      //获取文档类型
      if (this.devAssessmentElecPriceWays.length == 0) {
        getSelectList("deviation_assessment_method").then(res => {
          this.devAssessmentElecPriceWays = res;
        });
      }
      if (this.htWaysOfCompensation.length == 0) {
        getSelectList("ways_of_compensation").then(res => {
          this.htWaysOfCompensation = res;
        });
      }
    },
    //获取列表
    initList() {
      this.listQuery.page = 1;
      // this.$set(this.listQuery, "status", "");
      // this.$set(this.listQuery, "contractName", "");
      // this.$set(this.listQuery, "contractTypeCode", "");
      this.getList();
    },

    //修改方法
    handleUpdate(row, state) {
      //清空上传文件
      if (this.$refs.uploadFileAdd === undefined) {
      } else {
        this.$refs.uploadFileAdd.clearFiles();
      }
      if (this.HtContractVO.htContract.contractTypeCode == "htlx03") {
        this.remoteMethod3(this.HtContractVO.htContract.customerName); //查模糊数组
      } else {
      }
      this.flagoption = state;
      this.sdTemplateId = row.saleContractTypeName;
      getObj(row.contractId).then(response => {
        // console.log(row.contractId);
        //延时赋值，防止表单被修改查出的数据异步赋值
        setTimeout(() => {
          if (this.HtContractVO.htContract.contractTypeCode == "htlx03") {
            this.HtContractVO = response.data;
            // console.log(this.HtContractVO);
            // if(response.data.clauseViolation!=undefined){
            // console.log(response.data);
            // console.log(response.data.clauseViolation);
            if (response.data.clauseViolation.compensation != "pcfs_01") {
              this.HtContractVO.clauseViolation.compensationValue1 =
                response.data.clauseViolation.compensationValue;
            } else {
              this.HtContractVO.clauseViolation.compensationValue2 =
                response.data.clauseViolation.compensationValue;
            }
            // }
          } else {
            this.HtContractVO.htContract = response.data.htContract;
            this.HtContractVO.clausePlan = response.data.clausePlan;
          }
        }, 0);
        this.HtContractVO.htContract.contractTypeCode =
          response.data.htContract.contractTypeCode;

        if (this.HtContractVO.htContract.contractTypeCode == "htlx02") {
          this.ydtitle = "发电权转让计划";
        } else {
          this.ydtitle = "用电计划";
        }
        this.alertDialogVisible = true;
        this.saleContractType = row.saleContractType;
        this.showUplaodFile(response.data.htContract.enclosure);
        this.file_rode = true;
        this.uploadBtn = false;
        if (this.fileInfo.name == "undefined" || this.fileInfo.name == "") {
          this.file_rode = false;
          this.uploadBtn = true;
        }
      });
    },
    //删除方法
    handleDeleteByID() {
      if (this.sels != "" && this.sels != null) {
        this.$confirm("此操作将永久删除, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          delObj(this.sels).then(res => {
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
      } else {
        this.$alert("请选择要删除项", "消息提示", {
          type: "warning",
          confirmButtonText: "确定",
          callback: action => {}
        });
      }
    },
    //导出方法
    handleExport() {
      let parme = {
        contractTypeCode: this.listQuery.contractTypeCode,
        status: this.listQuery.status,
        contractName: this.listQuery.contractName
      };
      exportObj(parme);
    },
    //下载
    handleDownload() {
      if (this.sels != "" && this.sels != null) {
        download(this.sels);
      } else {
        this.$confirm("请选择要下载合同", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
      }
    },
    //预览方法
    viewShow(row) {
      let parme = {
        contractId: row.contractId
      };
      this.contractId = row.contractId;
      viewShow(parme).then(res => {
        this.htmlstr = res;
        this.viewDialogVisible = true;
      });
    },
    //预览下载
    viewDownload() {
      download(this.contractId);
    },
    //获取关联售电合同
    SelectValue(data) {
      this.HtContractVO.htContract.templateId = data;
    },
    //获取ID
    selsChange(val) {
      let id = "";
      val.forEach(element => {
        id += "," + element.contractId;
      });
      id = id.substring(1);
      this.sels = id;
    },
    //免考核条件选择事件
    SelectAssValue(val) {
      if (val == "mkhtj_01") {
        this.HtContractVO.clauseAssessment.partyAssessmentRatio = 0;
      } else if (val == "mkhtj_02") {
        this.HtContractVO.clauseAssessment.partyAssessmentRatio = 100;
      } else if (val == "mkhtj_03") {
        this.HtContractVO.clauseAssessment.partyAssessmentRatio = 50;
      }
    },
    //分页
    handleSizeChange(val) {
      this.listQuery.limit = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getList();
    },
    //时间格式化方法
    getSigningTime(val) {
      if (val != null && val != "") {
        this.HtContractVO.htContract.signingDate = parseTime(
          val,
          "{y}-{m}-{d}"
        );
      }
    },
    getBeginTime(val) {
      if (val != null && val != "") {
        this.HtContractVO.htContract.beginDate = parseTime(val, "{y}-{m}-{d}");
      }
    },
    getEndTime(val) {
      if (val != null && val != "") {
        this.HtContractVO.htContract.endDate = parseTime(val, "{y}-{m}-{d}");
      }
    },
    //弹框关闭执行方法
    handleClose() {
      //清空表单
      const _set = this.$refs;
      if (_set.HtContractVO === undefined) {
      } else {
        _set.HtContractVO.resetFields();
      }
      this.HtContractVO.htContract.contractTypeCode = "htlx03";
      this.alertDialogVisible = false;
      this.ADDtypeDialog = false;
    },
    //---------------------------------下拉框模糊查询
    remoteMethod1(query) {
      this.options1 = [];
      let cusType = "";
      if (this.HtContractVO.htContract.contractTypeCode == "htlx03") {
        cusType = "khlb1";
      } else {
        cusType = "khlb3";
      }
      if (query !== "") {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          let parme = { cusType: cusType, name: query };
          getcustomerId(parme).then(res => {
            this.options1 = res;
          });
        }, 200);
      } else {
        this.options1 = [];
      }
    },
    remoteMethod2(query) {
      this.options2 = [];
      let cusType = "";
      if (this.HtContractVO.htContract.contractTypeCode == "htlx03") {
        cusType = "khlb1";
      } else {
        cusType = "khlb3";
      }
      if (query !== "") {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          let parme = { cusType: cusType, name: query };
          getcustomerId(parme).then(res => {
            this.options2 = res;
          });
        }, 200);
      } else {
        this.options2 = [];
      }
    },
    remoteMethod3(query) {
      this.options3 = [];
      let cusType = "";
      if (this.HtContractVO.htContract.contractTypeCode == "htlx03") {
        cusType = "khlb1";
      } else {
        cusType = "khlb3";
      }
      if (query !== "") {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          let parme = { cusType: cusType, name: query };
          getcustomerId(parme).then(res => {
            this.options3 = res;
          });
        }, 200);
      } else {
        this.options3 = [];
      }
    },

    remoteMethod5(query) {
      this.options5 = [];
      let cusType = "";
      if (this.HtContractVO.htContract.contractTypeCode == "htlx03") {
        cusType = "khlb1";
      } else {
        cusType = "khlb3";
      }
      if (query !== "") {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          let parme = { cusType: cusType, name: query };
          getcustomerId(parme).then(res => {
            this.options5 = res;
          });
        }, 200);
      } else {
        this.options5 = [];
      }
    },
    codeValue1() {
      this.options1.map(item => {
        if (item.customerName === this.HtContractVO.htContract.customerName) {
          this.HtContractVO.htContract.customerCode = item.customerId;
        } else {
          this.HtContractVO.htContract.customerCode = this.HtContractVO.htContract.customerName;
        }
      });
    },
    codeValue2() {
      this.options2.map(item => {
        if (item.customerName === this.HtContractVO.htContract.customerName) {
          this.HtContractVO.htContract.customerCode = item.customerId;
        } else {
          this.HtContractVO.htContract.customerCode = this.HtContractVO.htContract.customerName;
        }
      });
    },
    codeValue3() {
      this.options3.map(item => {
        if (item.customerName === this.HtContractVO.htContract.customerName) {
          this.HtContractVO.htContract.customerCode = item.customerId;
        } else {
          this.HtContractVO.htContract.customerCode = this.HtContractVO.htContract.customerName;
        }
      });
    },
    codeValue5() {
      this.options5.map(item => {
        if (item.customerName === this.HtContractVO.htContract.secondPartName) {
          this.HtContractVO.htContract.secondPartCode = item.customerId;
        } else {
          this.HtContractVO.htContract.secondPartCode = this.HtContractVO.htContract.secondPartName;
        }
      });
    },
    //---------------------------------
    //上传==========================================================
    before_upload(file) {
      this.myFileList = [];
    },
    handleChange(file, fileList) {
      let existFile = fileList.slice(0, fileList.length - 1).find(f => {
        f.name === file.name;
      });
      this.fileInfo.name = file.name;
      this.fileInfo.path = "";
      this.file_rode = true;
      this.uploadBtn = false;
    },
    uploadCb(response, file, fileList) {
      if (response.rel) {
        this.HtContractVO.htContract.enclosure = response.data.filePath;
        this.showUplaodFile(this.HtContractVO.htContract.enclosure);
        this.submitForm();
      } else {
        this.$notify({
          title: "失败",
          message: res.msg,
          type: "warning",
          duration: 2000
        });
      }
    },
    submitForm() {
      if (this.flagoption === "edit") {
        this.editObject(this.HtContractVO);
      } else {
        this.addObject(this.HtContractVO);
      }
    },

    showUpload() {
      this.$refs.uploadFileAdd.clearFiles();
      this.fileInfo.name = "";
      this.fileInfo.path = "";
      this.HtContractVO.htContract.enclosure = "";
      this.uploadBtn = true;
    },
    closeDialog() {
      if (this.flagoption === "edit") {
        this.fileInfo.name = "";
        this.fileInfo.path = "";
        //  this.form.enclosure = "";
        this.uploadBtn = true;
      } else {
        this.fileInfo.name = "";
        this.fileInfo.path = "";
        this.HtContractVO.htContract.enclosure = "";
        this.uploadBtn = true;
      }
    },
    showUplaodFile(data) {
      let file = data;
      let fileArr = file.split("/");
      this.fileInfo.path = data;
      this.fileInfo.name = fileArr[fileArr.length - 1];
    },

    submitSave() {
      const set = this.$refs;
      let _this = this;
      let sum = 0;
      sum += Number(this.HtContractVO.clausePlan.aprElectricityTrade);
      sum += Number(this.HtContractVO.clausePlan.augElectricityTrade);
      sum += Number(this.HtContractVO.clausePlan.decElectricityTrade);
      sum += Number(this.HtContractVO.clausePlan.febElectricityTrade);
      sum += Number(this.HtContractVO.clausePlan.janElectricityTrade);
      sum += Number(this.HtContractVO.clausePlan.julElectricityTrade);
      sum += Number(this.HtContractVO.clausePlan.junElectricityTrade);
      sum += Number(this.HtContractVO.clausePlan.marElectricityTrade);
      sum += Number(this.HtContractVO.clausePlan.mayElectricityTrade);
      sum += Number(this.HtContractVO.clausePlan.novElectricityTrade);
      sum += Number(this.HtContractVO.clausePlan.octElectricityTrade);
      sum += Number(this.HtContractVO.clausePlan.sepElectricityTrade);
      if (this.HtContractVO.htContract.totalElectricity != sum) {
        this.$alert("请调整合同分月电量", "消息提示", {
          type: "warning",
          confirmButtonText: "确定",
          callback: action => {}
        });
      } else {
        set["HtContractVO"].validate(valid => {
          if (valid) {
            this.formLoading = true;
            if (this.HtContractVO.htContract.enclosure === "") {
              if (this.fileInfo.name === "") {
                this.submitForm();
              } else {
                set.uploadFileAdd.submit();
              }
            } else {
              if (
                this.fileInfo.path === this.HtContractVO.htContract.enclosure ||
                this.fileInfo.name == ""
              ) {
                this.submitForm();
              } else {
                set.uploadFileAdd.submit();
              }
            }
          } else {
            return false;
          }
        });
      }
    },
    //================================
    //修改
    editObject() {
      if (this.HtContractVO.clauseViolation.compensation != "pcfs_01") {
        this.HtContractVO.clauseViolation.compensationValue = this.HtContractVO.clauseViolation.compensationValue1;
      } else {
        this.HtContractVO.clauseViolation.compensationValue = this.HtContractVO.clauseViolation.compensationValue2;
      }
      editObj(this.HtContractVO).then(res => {
        this.formLoading = false;

        this.alertDialogVisible = false;
        this.ADDtypeDialog = false;
        this.formLoading = false;
        this.getList();
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
    },
    //新增
    addObject() {
      if (this.HtContractVO.clauseViolation.compensation != "pcfs_01") {
        this.HtContractVO.clauseViolation.compensationValue = this.HtContractVO.clauseViolation.compensationValue1;
      } else {
        this.HtContractVO.clauseViolation.compensationValue = this.HtContractVO.clauseViolation.compensationValue2;
      }
      addObj(this.HtContractVO).then(res => {
        this.formLoading = false;

        this.alertDialogVisible = false;
        this.ADDtypeDialog = false;
        this.getList();
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
    },
      //点击文件列表中已上传的文件
      handlePreview() {
        downloadOneFile( this.HtContractVO.htContract.enclosure);
    },
  }
};
</script>

<style scoped>
.choose_contract {
  margin-left: 20px;
}
.yulan_color {
  color: blue;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}

input[type="number"] {
  -moz-appearance: textfield;
}

.altdiv {
  height: 450px;
  padding-right: 15px;
}
.font_center {
  text-align: right;
  margin-right: 1px;
}
.view_style {
  text-align: right;
  padding-right: 10px;
  margin-bottom: 5px;
}
.button_center {
  display: block;
  margin: 0 auto;
}
.el-input-number {
  line-height: 26px !important;
  width: 38% !important;
}
</style>
<style>