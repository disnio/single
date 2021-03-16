
<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-button-group>
        <el-button
          type="primary"
          v-if="zcglInformation_btn_add"
          icon="el-icon-plus"
          @click="handlerAdd"
        >新增</el-button>
        <el-button
          type="primary"
          v-if="zcglInformation_btn_edit"
          icon="el-icon-edit"
          @click="handlerEdit"
        >编辑</el-button>
        <el-button
          type="primary"
          v-if="zcglInformation_btn_del"
          icon="el-icon-delete"
          @click="handleDelete"
        >删除</el-button>
      </el-button-group>
    </div>
    <el-row>
      <el-col :span="5" class="f-mt10">
        <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>政策分类</span>
          </div>
          <div class="tree" :style="'height:'+(scrollbarHeight-5)+'px'">
            <el-scrollbar style="height:100%">
              <el-tree
                class="filter-tree"
                :data="treeData"
                node-key="roleCode"
                highlight-current
                :props="defaultProps"
                :filter-node-method="filterNode"
                ref="menuTree"
                @node-click="getNodeData"
                :default-expanded-keys="[roleCode]"
              ></el-tree>
          </el-scrollbar>
          </div>
        </el-card>
      </el-col>
      <el-col :span="19" class="f-mt10">
        <el-card class="box-card f-ml10">
          <el-form
            class="two-col"
            :rules="rules"
            :label-position="labelPosition"
            label-width="120px"
            :model="form"
            ref="form"
          >            
            <el-form-item label="上级分类" prop="proleCode">
              <el-select
                :disabled="formEdit"
                :clearable="true"
                v-model="form['proleCode']"
                placeholder="请选择"
              >
              <el-option
                v-for="item in pRoles"
                :key="item.propCode"
                :label="item.roleName"
                :value="item.roleCode"   
              ></el-option>
            </el-select>           
            </el-form-item>
            <el-form-item label="分类编码" prop="roleCode">
              <el-input v-model="form.roleCode" disabled placeholder="请输入分类编码"></el-input>
            </el-form-item>
            <el-form-item label="分类名称" prop="roleName">
              <el-input v-model="form.roleName" :disabled="formEdit" placeholder="请输入分类名称"></el-input>
            </el-form-item>
            <el-form-item label="排序" prop="propSort">
              <el-input v-model="form.propSort" :disabled="formEdit" placeholder="请输入排序"></el-input>
            </el-form-item>
           
            <el-form-item v-if="formStatus == 'update'">
              <!-- <el-button type="primary" @click="preview">预览</el-button> -->
              <el-button type="primary" @click="update">更新</el-button>
              <el-button @click="onCancel">取消</el-button>
            </el-form-item>
            <el-form-item v-if="formStatus == 'create'">
              <el-button type="primary" @click="create">保存</el-button>
              <el-button @click="onCancel">取消</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
    <!-- <el-dialog v-drag :close-on-click-modal="false" title="提示" :visible.sync="dialogVisible" width="30%">
      <span>/api/admin/dim/getDimByPropCode?propCode={{form.propCode}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog> -->
  </div>
</template>

<script>
import {
  getTree,
  addObj,
  getObj,
  delObj,
  putObj,
  fetchAll,
  checkOnlyOne,
  getExistList,
  checkPolicyTree,
  getRoleCode
} from "@common/api/marketingSystem/classification/index";

import { mapGetters } from "vuex";
import { initLayout, initLayoutInfo } from "@common/utils/init";
import { parseTime } from "@common/utils/index";
export default {
  name: "zcglInformation",
  data() {
    return {
      roleCode:'',
      roleCodeId:'',
      pRoleCode:'',
      pRoles:[],
      scrollbarHeight: "",
      dialogVisible: false,
      tree_all: [],
      highlight_current: true,
      default_expand_all: true,
      dialogTreeVisible: false,
      tree_data: [],
      treeData: [],
      treeDataAll:[],
      filterText: "", //搜索
      defaultProps: {
        children: "children",
        label: "label"
      },
      formAdd: true,
      formStatus: "", //控制是添加还是编辑状态
      formEdit: true, //表单能否编辑
      labelPosition: "right", //label的对齐方式
      beginDate: undefined, //开始时间
      endDate: undefined,
      form: {
        proleCode: undefined,
        roleName: '',
        roleCode: "",
        propSort: undefined, //排序
      },
      rules: {
        proleCode: [
          {
            required: true,
            message: "请选择上级分类",
            trigger: "blur"
          }
        ],
        // roleCode: [
        //   {
        //     required: true,
        //     message: "请输入分类编码",
        //     trigger: "blur"
        //   }
        // ],
        roleName: [
          {
            required: true,
            message: "请输入分类名称",
            trigger: "blur"
          }
        ],
        propSort: [
          {
            required: true,
            message: "请输入排序",
            trigger: "blur"
          }
        ],
       
      },
      zcglInformation_btn_add: false,
      zcglInformation_btn_edit: false,
      zcglInformation_btn_del: false
    };
  },
  mounted(){
    getTree().then(data => {
      this.roleCode = data[0].roleCode;
    });
},
  created() {
    this.init();
    this.zcglInformation_btn_add = this.elements["zcglInformation:btn_add"];
    this.zcglInformation_btn_edit = this.elements["zcglInformation:btn_edit"];
    this.zcglInformation_btn_del = this.elements["zcglInformation:btn_del"];
  },
  computed: {
     ...mapGetters(["elements", "code","allSubMenus","userOrgInfo"])
  },
  watch: {
    filterText(val) {
      this.$refs.menuTree.filter(val);
    }
  },
  methods: {
    init(){
      this.scrollbarHeight = initLayout() - 160; //document.body.clientWidth;
      window.onresize = function temp() {
        this.scrollbarHeight = initLayout() - 160;
      };
      this.getList();
      getExistList().then( res=>{
         this.pRoles = res;
       })
       
    },
    getList() {
      getTree().then(data => {
        this.treeData = data; 
        this.treeDataAll=[{roleCode: "-1", roleName: "政策分类管理"}]; 
        this.setTreeDataAll(this.treeData); 
        this.pRoles = this.treeDataAll;
      });  
    },
    //重新设置下拉框的数据格式
    setTreeDataAll(data) {  
      data.map(item => {
        if (typeof item.children != "undefined") {
          this.setTreeDataAll(item.children);
        }
        this.treeDataAll.push({
          roleCode: item.roleCode,
          roleName: item.roleName,
          proleCode: item.proleCode
        });
      });
    },

    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },

    //点击树的方法
    getNodeData(data) {
      this.resetForm()
      this.pRoleCode = data.roleCode;
      this.formStatus = "";
      this.formEdit = true;
      getObj(data.roleCode).then(response => {
        this.roleCodeId = response.id;
        for(let key  in this.form){
          this.form[key] = response[key];
        }
      });
      
    },
    update() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.form.id =this.roleCodeId;
          let par = this.form;
          putObj(this.roleCodeId, par).then(res => {
            if(res.rel){ 
              this.getList(); 
              this.formEdit = true;
              this.formStatus ="" 
              this.$notify({
                title: "成功",
                message: res.msg,
                type: "success",
                duration: 2000
              });
              
            }else{
              this.$notify({
                title: "提示",
                message: res.msg,
                type: "warning",
                duration: 2000
              });
            } 
          });
        }
      });
    },
    //重置form
    resetForm() {
      const set = this.$refs;
      if (typeof set["form"] != "undefined") {
        set["form"].resetFields();
      }
      this.form = {
        proleCode:'',
        roleName: '',
        roleCode: '',
        propSort: '', //排序
      };
      this.formStatus='';
    },
    //新增保存方法
    create() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          // this.form.proleCode = this.pRoleCode;
          let par = this.form;
          addObj(par).then(res => {
            if(res.rel){
              this.getList();
              this.formEdit = true;
              this.formStatus ="" 
              this.$notify({
                title: "成功",
                message:res.msg,
                type: "success",
                duration: 2000
              });
            }else{
              this.$notify({
                title: "提示",
                message: res.msg,
                type: "warning",
                duration: 2000
              });
            }          
          });
          
        }
      });
    },
    onCancel() {
      this.formEdit = true;
      this.formStatus = "";
    },
    //点击新增
    handlerAdd() {
      // if(this.pRoleCode == 'undefind' || this.pRoleCode == ''){
      //   getExistList().then( res=>{
      //    this.pRoles = res;
      //   })
      // }
        this.resetForm();
        this.form.proleCode = this.pRoleCode;
        // 20200310 #3851  qhz  基础数据管理-政策分类管理-获取编码
        getRoleCode().then(response => {
          this.form.roleCode = response.data;
        });
        this.formEdit = false;
        this.formStatus = "create";
    },
    //点击编辑
    handlerEdit() {
      if(this.pRoleCode){
        getExistList(this.pRoleCode).then( res=>{
         this.pRoles = res;
        })
        this.formEdit = false;
        this.formStatus = "update";
      }else{
        this.$notify({
          title: "提示",
          message: '请选择要修改的分类',
          type: "warning",
          duration: 2000
        });
      }
    },
    //删除分类
    handleDelete() {
      if(this.pRoleCode){
        checkPolicyTree(this.pRoleCode).then(res => {
          if(res.rel){
            this.$confirm("此操作将永久删除, 是否继续?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            }).then(() => {
              delObj(this.pRoleCode).then(res => {
                if(res.rel){
                  this.getList();
                  this.resetForm();
                  this.onCancel();
                  this.form.proleCode='';
                  this.pRoleCode='';
                  this.$notify({
                    title: "成功",
                    message: res.msg,
                    type: "success",
                    duration: 2000
                  });
                }else{
                  this.$notify({
                    title: "提示",
                    message: res.msg,
                    type: "warning",
                    duration: 2000
                  });
                }
                
              });
            });
          }else{
            this.$notify({
              title: "提示",
              message: res.msg,
              type: "warning",
              duration: 2000
            });
          }
        })
      }else{
        this.$notify({
          title: "提示",
          message: "您还没选择要删除的分类",
          type: "warning",
          duration: 2000
        });
      }
      
    },
  

 
 
  }
};
</script>

<style scoped>
.two-col .el-form-item {
  width: 100% !important;
}
.tree {
  overflow-y: hidden;
  overflow-x: scroll;
  width: 100%;
  height: 450px;
}
.two-col .el-select{width: 100%;}
</style>