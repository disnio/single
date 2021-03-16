<template>
  <el-dialog
    v-drag
    :close-on-click-modal="false"
    title="导入"
    :visible.sync="visible"
    custom-class="w480"
    append-to-body
    @open="init"
    @close="cancel"
  >
    <el-form ref="goods" :model="goods" label-width="150px" style="width:94%">
      <c-item :itemProps.sync="itemProps" :values.sync="goods"> </c-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button class="ok-btn" @click="ok">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { cItem } from '@common/components/uniCom/cItem';
// import fetch from "@common/utils/fetch";
// import dw from "@common/components/uniCom/down";

export default {
  name: 'ImpUpload',
  components: {
    'c-item': cItem,
  },
  data() {
    return {
      goods: {
        enclosure: '',
        file: '',
      },
      itemProps: [
        [
          {
            types: 'upload',
            item: {
              prop: 'enclosure',
              label: '上传文件',
              'label-width': '140px',
              size: 'small',
              rules: [
                {
                  required: true,
                  message: '必须上传附件',
                  trigger: 'blur',
                },
              ],
            },
            el: {
              disabled: false,
              multiple: false,
              limitNumber: 1,
              // 回调
              event: {
                success: this.upSuccess,
                delete: this.upDelete,
              },
            },
          },
        ],
      ],
    };
  },

  props: {
    visible: Boolean,
    state: Boolean,
  },
  watch: {
    state: {
      immediate: true,
      handler: function(n, o) {
        this.itemProps[0][0].el.disabled = this.state;
      },
    },
  },
  methods: {
    init() {
      this.goods.enclosure = '';
    },
    ok() {
      this.$emit('fileOk', this.goods);
    },
    cancel() {
      this.$emit('fileCancel');
    },
    // 上传成功
    upSuccess(sd) {
      if (
        sd.res &&
        sd.res.batch !== '' &&
        !_.isUndefined(sd.res.batch) &&
        !_.isNull(sd.res.batch)
      ) {
        this.goods.enclosure = sd.res.batch;
        this.goods.file = sd.res.file;
      }
    },
    // 删除文件成功
    upDelete(files) {
      if (files.length === 0) {
        this.goods.enclosure = '';
      }
      console.log('delete success:', files);
    },
    // 解析
    importExcel(e) {
      let _this = this;

      let userAgent = navigator.userAgent;
      if (userAgent.indexOf('Firefox') > -1) {
        this.file = e.currentTarget.files[0];
      } else {
        this.file = event.currentTarget.files[0];
      }

      //this.file = obj.currentTarget.files[0]; //火狐报错
      let rABS = false; //是否将文件读取为二进制字符串
      let f = this.file;
      let reader = new FileReader();
      FileReader.prototype.readAsBinaryString = function(f) {
        let binary = '';
        let rABS = false; //是否将文件读取为二进制字符串
        let wb; //读取完成的数据
        let outdata;
        let reader = new FileReader();
        reader.onload = function(e) {
          let bytes = new Uint8Array(reader.result);
          let length = bytes.byteLength;
          for (let i = 0; i < length; i++) {
            binary += String.fromCharCode(bytes[i]);
          }
          let XLSX = require('xlsx');
          if (rABS) {
            wb = XLSX.read(btoa(fixdata(binary)), {
              //手动转化
              type: 'base64',
            });
          } else {
            wb = XLSX.read(binary, {
              type: 'binary',
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
  },
};
</script>

<style scoped></style>
