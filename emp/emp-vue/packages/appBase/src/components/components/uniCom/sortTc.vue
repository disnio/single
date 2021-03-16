<template>
  <sort-tr
    :ref="sref"
    v-bind:table="table"
    v-bind:columns="cols"
    v-bind:data="list"
    v-bind:event="tableEvent"
  ></sort-tr>
</template>

<script>
/**
 * @file: sortTc.vue
 * @return {type} 表格生成及单元格编辑
 * @description: 功能测试中
 * @author: wsc
 * @version: beta
 * @email: 291166364@qq.com
 * @date: 2020-12-11
 */

import { initLayout } from '@common/utils/init';
import { sortTr, genIdName, changeKeys, genColumns } from './sortTr';
import dw from '@common/components/uniCom/down';
import { validate } from '@common/components/uniCom/valid';

export default {
  name: 'sortTc',
  mixins: [dw],
  components: {
    'sort-tr': sortTr,
  },
  props: {
    sref: { type: String, default: 'sort_tb' },
    columns: Array,
    tableProp: {
      type: Object,
      default: {
        options: {},
      },
    },
    // 渲染的数据
    tableData: { type: Array, default: [] },
    tableEvent: { type: Object, default: {} },
    tableMethod: {
      type: Object,
      default: {
        lastOpts: true,
      },
    },
    tableCol: {
      type: Object,
      default: {
        selection: true,
        exclude: [],
        order: [],
        replace: [],
        headKv: [],
        heads: [],
        enclosure: false,
        validation: [],
      },
    },
    /**
     * @参数 {type} argName - description
     * @参数 {type} argName - description
     * @返回值 {type} argName - description
     * @描述: 自定义的列内部操作，输入、上传
     */
    colAction: { type: Array, default: [] },

    noRenderRow: { type: Array, default: [] },
    upload: {
      type: Object,
      default: {
        prop: 'enclosure',
        batch: 'batch',
        key: 'id',
      },
    },
    noRender: {
      type: Object,
    },
    query: { type: Object, default: { limit: 10, page: 1 } },
  },
  data() {
    return {
      selTpl: {
        prop: 'selection',
        width: '55',
        fixed: true,
        align: 'center',
        selectable: this.mtColSel,
      },
      // 序号列
      indexTpl: {
        prop: 'index',
        label: '序号',
        width: '50',
        fixed: true,
        align: 'center',
        index: this.mtColIndex,
      },
      optTpl: {
        prop: 'options',
        label: '操作',
        fixed: 'right',
        width: '160',
        renderTpl: this.renderLastTpl,
        see: true,
        align: 'center',
        'header-align': 'center',
      },
      table: {
        ref: 'sr_table',
        height: '290',
        border: true,
        'highlight-current-row': true,
        fit: true,
        defaultSort: {
          prop: 'index',
          order: 'ascending',
        },
        ...this.tableProp,
      },
      options: [
        {
          types: 'view',
          type: 'text',
          size: 'small',
          label: '查看',
          isShow: true,
        },
        {
          types: 'edit',
          type: 'text',
          size: 'small',
          label: '编辑',
          isShow: true,
        },

        {
          types: 'del',
          type: 'text',
          size: 'small',
          label: '删除',
          isShow: true,
        },
        {
          types: 'add',
          type: 'text',
          size: 'small',
          label: '添加',
          isShow: true,
        },
      ],

      cols: [],
      list: [],
    };
  },

  watch: {
    tableData: {
      immediate: true,
      deep: true,
      handler: function(n, o) {
        this.createCols();
      },
    },
    tableProp: {
      immediate: true,
      deep: true,
      handler: function(n, o) {
        this.createCols();
      },
    },
  },
  methods: {
    createCols() {
      let len, cols, dt;

      if (this.columns) {
        len = this.columns.length;
        cols = this.columns.map((v, i) => {
          if (v.width === '' && i < len - 2) {
            v.width = 150;
          }
          return v;
        });
      } else {
        cols = [];
      }
console.log(cols,'cols')
      dt = this.tableData.length > 0 ? [...this.tableData] : [];

      if (this.columns === undefined && dt.length > 0) {
        dt = dt.map((v) => {
          let obj = {};
          _.forEach(this.tableCol.heads, (h) => {
            obj[h] = v[h];
            if (this.tableProp.valid) {
              let act = _.includes(this.tableCol.validation, h);
              if (act) {
                let s = [h + 'State', h + 'Message'];
                _.forEach(s, (t) => {
                  obj[t] = v[t];
                });
              }
            }
          });

          return obj;
        });
        console.log('dt:', dt);
        cols = genColumns(dt, this.tableCol.headKv);
      }
      if (this.tableCol.nosort) {
        if (_.isArray(this.tableCol.nosort)) {
          cols = _.map(cols, (v) => {
            if (_.includes(this.tableCol.nosort, v.prop)) {
              v.sortable = false;
            }
            return v;
          });
        }

        if (this.tableCol.nosort === '*') {
          cols = _.map(cols, (v) => {
            v.sortable = false;
            return v;
          });
        }
      }

      if (!!this.tableCol.replace) {
        genIdName(cols, this.tableCol.replace);
      }
      cols = _.uniqBy(cols, (v) => {
        return v.prop;
      });

      if (
        this.tableCol.exclude &&
        this.tableCol.exclude.length > 0 &&
        cols.length > 0
      ) {
        cols = _.filter(cols, (v) => {
          let ex = false;
          this.tableCol.exclude.forEach((e) => {
            if (!_.startsWith(e, '-') && e === v.prop) {
              ex = true;
            }

            if (_.startsWith(e, '-')) {
              if (v.prop.includes(e.slice(1))) {
                ex = true;
              }
            }
          });

          return !ex;
          // return !_.includes(this.tableCol.exclude, v.prop);
        });
      }

      if (this.tableCol.enclosure) {
        // enclosure 不解析，用 formFile
        // dt = this.appendFiles(dt);
        let fIndex = _.findIndex(cols, (v) => {
          // v.prop === "files" ||
          return v.prop === (this.upload.prop || 'enclosure');
        });
        // 附件显示与下载
        // cols[fIndex].renderTpl = this.renderFiles;
        if (fIndex > -1) {
          cols[fIndex].renderTpl = this.mtUpload.bind(this);
        }
      }

      cols = cols.map((v) => {
        v = changeKeys(v);
        return v;
      });

      if (
        this.tableCol.order &&
        this.tableCol.order.length > 0 &&
        cols.length > 0
      ) {
        cols = this.mtColSort(this.tableCol.order, cols);
      }

      cols = _.compact(cols);

      if (this.colAction.length > 0) {
        cols = _.map(cols, (v) => {
          let index = _.findIndex(this.colAction, (k) => {
            if ('prop' in v) {
              return k.prop === v.prop;
            } else {
              return false;
            }
          });

          if (index !== -1) {
            switch (this.colAction[index].type) {
              case 'upload':
                v.renderTpl = (h, scope, item) => {
                  return this.colAction[index].renderTpl
                    ? this.colAction[index].renderTpl
                    : this.mtUpload(h, scope, item, this.colAction);
                };
                break;
              case 'select':
                v.renderTpl = (h, scope, item) => {
                  return this.colAction[index].renderTpl
                    ? this.colAction[index].renderTpl
                    : this.mtColFormSelect(h, scope, item, this.colAction);
                };
                break;
              case 'date':
                v.renderTpl = (h, scope, item) => {
                  return this.colAction[index].renderTpl
                    ? this.colAction[index].renderTpl
                    : this.mtDate(h, scope, item, this.colAction);
                };
                break;
              default:
                v.renderTpl = (h, scope, item) => {
                  return this.colAction[index].renderTpl
                    ? this.colAction[index].renderTpl
                    : this.mtColFormInput(h, scope, item, this.colAction);
                };
            }
          }
          return v;
        });
      }

      if (!this.tableProp.disabled && !!this.tableMethod.lastOpts) {
        if (
          !!this.tableMethod.lastOptWidth &&
          typeof this.tableMethod.lastOptWidth === 'function'
        ) {
          this.optTpl.width = this.tableMethod.lastOptWidth();
        } else if (
          !!this.tableMethod.lastOptWidth &&
          typeof this.tableMethod.lastOptWidth === 'string'
        ) {
          this.optTpl.width = this.tableMethod.lastOptWidth;
        }
        cols = [...cols, this.optTpl];
      }

      cols = _.compact(cols);

      if (this.tableCol.selection) {
        cols = [this.selTpl, this.indexTpl, ...cols];
      } else {
        cols = [this.indexTpl, ...cols];
      }
      if (cols.length > 2) {
        this.cols = cols;
      } else {
        this.cols = [];
      }

      if (this.tableData.length === 0) {
        this.list = [];
      } else {
        this.list = dt;
      }
    },
    // 表格高度
    setHeight() {
      this.tabHeight = initLayout() - 220;
      this.$set(this.table, 'height', this.tabHeight);
    },

    noRenderRow(scope) {
      if (!_.isEmpty(this.noRender)) {
        return scope.row[this.noRender.prop] === this.noRender.key;
      }
    },
    renderLastTpl(h, scope, item) {
      let optArr = this.tableMethod.lastOpts;

      let opts =
        optArr &&
        optArr.map((v) => {
          let index = _.findIndex(this.options, (m) => {
            return m.types === v.types;
          });
          return {
            ...this.options[index],
            ...v,
          };
        });

      return (
        opts &&
        opts.map((btn) => {
          if (typeof btn.isShow === 'function') {
            btn.isShow = btn.isShow(scope, item);
          }
          if (typeof btn.label === 'function') {
            btn.label = btn.label(scope, item);
          }

          return btn.isShow ? (
            <el-button
              icon={btn.icon}
              type={btn.type}
              onClick={() => btn.event(scope.row, item)}
            >
              {btn.label}
            </el-button>
          ) : null;
        })
      );
    },
    mtColIndex(index) {
      return index + 1 + (this.query.page - 1) * this.query.limit;
    },
    mtColSort(order, columns) {
      let cArr = columns.map((v) => v.prop);
      let restArr = _.difference(cArr, order);
      let arr = _.concat(order, restArr);
      return _.map(arr, (v) => {
        return _.find(columns, { prop: v });
      });
    },

    validCallback(row, index, prop, errors, invalidFields) {
      this.$emit('change', this.list);
      this.$emit(
        'validate',
        prop,
        !errors,
        row[`${prop}Message`] || null,
        index,
        row
      );
    },

    mtColFormInput(h, scope, item, colAct) {
      console.log(scope.row,'>')
      let act = _.find(colAct, (v) => {
        return v.prop === item.prop;
      });

      if (this.noRenderRow(scope)) return;

      let typeIn = act.typeIn ? act.typeIn : 'text';

      let hasError = scope.row && scope.row[`${item.prop}State`] === 'error';

      let in_props = {
        on: {
          blur: (e) => {
            if (act.rules) {
              validate(
                scope.row,
                item.prop,
                act.rules,
                'blur',
                this.validCallback
              );
            }
            this.mtInputBlur(e, scope.row, item, act);
          },
          input: (val) => {
            this.mtInputChange(val, scope.row, item, act);
          },
        },
        class: {
          [this.tableProp.err]: hasError,
        },
      };
      let disProp = item.prop + 'Disabled';
      let disabled = _.has(scope.row, disProp) && scope.row[disProp];

      const input_node = (
        <el-input
          type={typeIn}
          vModel={scope.row[item.prop]}
          {...in_props}
          disabled={this.tableProp.disabled || disabled || act.disabled}
        ></el-input>
      );

      let msg = hasError ? scope.row[`${item.prop}Message`] : '';

      return (
        <el-tooltip
          class="item"
          effect="dark"
          disabled={!hasError}
          content={msg}
          placement="top"
        >
          {input_node}
        </el-tooltip>
      );
    },
    mtInputChange(val, row, item, act) {
      let index = _.findIndex(this.list, (v) => {
        return v[act.key] === row[act.key];
      });

      if (index !== -1) {
        this.$set(this.list[index], item.prop, val);
      }
    },
    mtInputBlur(e, row, item, act) {
      let index = _.findIndex(this.list, (v) => {
        return v[act.key] === row[act.key];
      });

      if (index !== -1) {
        this.$emit('line-change', this.list[index]);
        this.$emit('change', this.list);
      }
    },
    mtUpload(h, scope, item) {
      let file_props = {
        attrs: {
          ...this.upload,
          enclosure: scope.row[this.upload.prop || 'enclosure'],
          disabled: this.tableProp.disabled || this.upload.disabled,
          event: {
            success: (res) => this.upload.event.success(res, scope),
            delete: (res) => this.upload.event.delete(res, scope),
            change: (res) => this.upload.event.change(res, scope),
          },
        },
      };

      return scope.row[this.upload.prop || 'enclosure'] !== undefined ? (
        <form-file {...file_props}></form-file>
      ) : (
        ''
      );
    },
    renderFiles(h, scope, item) {
      return (
        scope.row.files &&
        scope.row.files.map((btn, i) => {
          return (
            <el-button size="small" type="text" key={i}>
              <span onClick={() => this.downloadOut(btn)}>{btn.name}</span>
            </el-button>
          );
        })
      );
    },

    mtColFormSelect(h, scope, item, colAct) {
      let act = colAct.find((v) => {
        return v.prop === item.prop;
      });
      let options = [];
      if (
        item.prop in this.tableProp.options &&
        this.tableProp.options[item.prop].length !== 0
      ) {
        // options = this.tableProp.options[item.prop][scope.$index];
        options = this.tableProp.options[item.prop];

      }
      let props = act.props ? act.props : {};
      let sel_props = {
        props: {
          ...props,
          'remote-method': (v) => {
            props['remote-method'](v, scope, item);
          },
        },
        on: {
          change: (val) => {
            if (act.rules) {
              validate(
                scope.row,
                item.prop,
                act.rules,
                'change',
                this.validCallback
              );
            }
            if (act.on) {
              act.on.change(val, scope, item);
            }

            this.mtSelectChange(val, scope, item, act);
          },
          blur: () => {
            if (act.rules) {
              validate(
                scope.row,
                item.prop,
                act.rules,
                'blur',
                this.validCallback
              );
            }
          },
        },
        class: {
          [this.tableProp.err]:
            scope.row && scope.row[`${item.prop}State`] === 'error',
        },
      };
      return (
        <el-select
          {...sel_props}
          vModel={scope.row[item.prop]}
          disabled={this.tableProp.disabled}
        >
          {options &&
            options.map((v, i) => {
              return (
                <el-option label={v.label} value={v.value} key={i}></el-option>
              );
            })}
        </el-select>
      );
    },

    mtSelectChange(val, scope, item, act) {
      let index = _.findIndex(this.list, (v) => {
        return v[act.key] === scope.row[act.key];
      });
      let options = this.tableProp.options[item.prop][scope.row.$index] || [];

      let opt = options.find((v) => v.value === val);

      if (_.has(act, 'props') && _.has(act.props, 'remote')) {
        options = options.filter((v) => {
          return v.value.indexOf(val) !== -1;
        });
        this.tableProp.options[item.prop][scope.$index] = [...options];
      }

      if (index !== -1) {
        this.$set(this.list[index], item.prop, val);

        if (_.has(act, 'propName') && _.has(opt, 'label')) {
          this.$set(this.list[index], act.propName, opt.label);
        }

        this.$emit('line-change', this.list[index]);
        this.$emit('change', this.list);
      }
    },

    mtDate(h, scope, item, colAct) {
      let act = colAct.find((v) => {
        return v.prop === item.prop;
      });

      let typeIn = act.typeIn ? act.typeIn : 'date';

      let hasError = scope.row && scope.row[`${item.prop}State`] === 'error';

      let date_props = {
        props: {
          ...act.props,
        },
        on: {
          blur: (e) => {
            if (act.rules) {
              validate(
                scope.row,
                item.prop,
                act.rules,
                'blur',
                this.validCallback
              );
            }
          },
        },
        class: {
          [this.tableProp.err]: hasError,
        },
      };

      const date_node = (
        <el-date-picker
          type={typeIn}
          vModel={scope.row[item.prop]}
          {...date_props}
          disabled={this.tableProp.disabled}
        ></el-date-picker>
      );

      let msg = hasError ? scope.row[`${item.prop}Message`] : '';

      return (
        <el-tooltip
          class="item"
          effect="dark"
          disabled={!hasError}
          content={msg}
          placement="top"
        >
          {date_node}
        </el-tooltip>
      );
    },
  },
};
</script>
