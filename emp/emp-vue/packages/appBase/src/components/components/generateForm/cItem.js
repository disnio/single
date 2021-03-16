/**
 * @file: cItem.js
 * @method
 * @description: 表单生成
 * @author: wsc
 * @date: 2020-11-09
 */
import FormFile from "./components/formFile";
import Province from "./components/province";
import Industry from "./components/industry";
import Org from "./components/org";

export const cItem = {
  name: "cItem",
  components: {
    "form-file": FormFile,
    "province": Province,
    "industry": Industry,
    "org": Org,
  },
  props: {
    itemProps: [Array, Object],
    values: Object,
    inline: Boolean,
  },
  data() {
    return {
      form: this.values
    }
  },

  watch: {
    form: {
      deep: true,
      handler: function (n) {
        this.$emit(`update:values`, n);
        if (this.$refs.selChange!=undefined) {
          this.$refs.selChange.dropDownVisible = false;
        }
      }
    },

    values: function (n) {
      if (this.values !== this.form) {
        _.keys(this.values).map(v => {
          this.$set(this.form, v, this.values[v]);
        })
      }
    }
  },

  methods: {

    renderNull(props) {
      let item_props = {
        props: props.item,
      };
      return (
        <el-form-item
          {...item_props}
        >
        </el-form-item>
      )
    },
    renderButton(props) {
      let item_props = {
        props: props.item,
      };

      let btn_props = {
        attrs: {
          ...props.el,
        },
        on: {
          click: props.click
        }
      };

      return (
        <el-form-item
          {...item_props}
        >
          <el-button {...btn_props}>
            {props.el.text}
          </el-button>
        </el-form-item>
      )
    },

    renderInput(props) {
      console.log(props,'props')
      let item_props = {
        props: props.item,
      };

      let input_props = {
        attrs: {
          ...props.el,
        },
        on: {
          ...props.on
        }
      };
      let text_item = {
        attrs:{
          ...props.textInfo,
        }
      }
      // 对应组件内的slot 必须做处理，转到组件内部 
      const append = () => {
        return props.append && (
          <div slot="append">
            {
              _.isString(props.append) ? props.append
                : props.append()
            }
          </div>
        );
      }


      // input_prepend, cItem>下slots
      const prepend = () => {
        return props.prepend ? (
          <div slot="prepend">
            {
              _.isString(props.prepend) ? props.prepend
                : props.prepend()
            }
          </div>
        ) : (
          this.$slots.input_prepend && <div slot="prepend">
            {this.$slots.input_prepend}
          </div>
        );
      };


      return (
        <el-form-item
          {...item_props}
        >
          <el-input
            type={props.type}
            {...input_props}
            vModel={this.form[props.item.prop]}>
            {prepend()}
            {append()}
          </el-input>
          <span {...text_item }>{props.text}</span>
        </el-form-item>
      )
    },

    renderCheckbox(props) {
      let item_props = {
        props: props.item,
      };
      let chk_props = {
        attrs: {
          ...props.el
        },
      };
      return (
        <el-form-item {...item_props}>
          <el-checkbox-group vModel={this.form[props.item.prop]}>
            {
              props.options && props.options.map((v, i) => {
                return (
                  <el-checkbox {...chk_props} label={v.label} value={v.value} key={i}>

                  </el-checkbox>
                )
              })
            }

          </el-checkbox-group>
        </el-form-item>
      )
    },

    renderDate(props) {
      let item_props = {
        props: props.item,
      };
      let date_props = {
        attrs: {
          ...props.el
        },
        on:{
          ...props.on
        }
      };
      return (
        <el-form-item {...item_props}>
          <el-date-picker
            {...date_props}
            vModel={this.form[props.item.prop]}
            type={props.type}
          >
          </el-date-picker>
        </el-form-item>
      )
    },

    renderSwitch(props) {
      let item_props = {
        props: props.item,
      };
      let sw_props = {
        attrs: {
          ...props.el
        },
      };
      return (
        <el-form-item {...item_props}>
          <el-switch
            {...sw_props}
            vModel={this.form[props.item.prop]}
            type={props.type}
          >
          </el-switch>
        </el-form-item>
      )
    },

    renderSelect(props) {
      let item_props = {
        props: props.item,
      };
      let sel_props = {
        attrs: {
          ...props.el
        },
        on: {
          ...props.on
        }
      };
      return (
        <el-form-item {...item_props}>
          <el-select {...sel_props}
                     vModel={this.form[props.item.prop]}>
            {
              props.options && props.options.map((v, i) => {
                return (
                  <el-option label={v.label} value={v.value} key={i}>

                  </el-option>
                )
              })
            }
          </el-select>
        </el-form-item>
      )
    },

    renderCus(props) {
      let item_props = {
        props: props.item,
      };
      let sel_props = {
        attrs: {
          ...props.el
        },
        on: {
          ...this.$listeners,
          ...props.event
        }
      };

      let genCus = (pp) => {
        switch (pp.type) {
          case "industry":
            return (
              <industry
                {...sel_props}
                values={this.form[pp.item.prop]}
              >

              </industry>
            );
          case "province":
            return (
              <province
                {...sel_props}
                values={this.form[pp.item.prop]}
              >

              </province>
            )
          case "org":
            return (
              <org
                {...sel_props}
                values={this.form[pp.item.prop]}
              >

              </org>
            )
          default:
            return <div>无表单项</div>
        }
      }

      return (
        <el-form-item {...item_props}>
          {genCus(props)}
        </el-form-item>
      )
    },

    renderText(props) {
      let item_props = {
        props: props.item,
      };

      let txt_props = {
        attrs: {
          ...props.el,
        },
      };

      return (
        <el-form-item
          {...item_props}
        >
          <el-input
            type={props.type}
            {...txt_props}
            vModel={this.form[props.item.prop]}>
          </el-input>
        </el-form-item>
      )
    },
    renderCascader(props) {
      let item_props = {
        props: props.item,
      };

      let cas_props = {
        attrs: {
          ...props.el,
        },
        on: {
          ...props.on
        }
      };
      return (
        <el-form-item {...item_props}>
          <el-cascader {...cas_props} vModel={this.form[props.item.prop]} ref={'selChange'}>

          </el-cascader>
        </el-form-item>
      )

    },
    renderAutoComplete(props) {
      let item_props = {
        props: props.item,
      };

      let auto_props = {
        attrs: {
          ...props.el,
        },
      };
      // 对应组件内的slot 必须做处理，转到组件内部
      const suffix = (
        this.$slots.auto_suffix && <div slot="suffix">
          {this.$slots.auto_suffix}
        </div>
      );

      return (
        <el-form-item
          {...item_props}
        >
          <el-autocomplete
            type={props.type}
            {...auto_props}
            vModel={this.form[props.item.prop]}>
            {suffix}
          </el-autocomplete>
        </el-form-item>
      )
    },

    renderUpload(props) {
      let item_props = {
        props: props.item,
      };

      let file_props = {
        attrs: {
          ...props.el,
          enclosure: this.form.enclosure
        },
      };

      return (
        <el-form-item
          {...item_props}
        >
          <form-file
            {...file_props}
          >

          </form-file>
        </el-form-item>
      )
    },

    renderRow(child, key) {
      if (this.inline) {
        return child
      } else {
        let cols = 24 / child.length;
          return (
            <el-row key={key}>
              {
                child.map(v => {
                  return (
                    <el-col span={cols} md={cols} lg={cols} xl={cols}>
                      {v}
                    </el-col>
                  )
                })
              }
  
            </el-row>
          )
        }
    },
    renderInput2(props) {
      let item_props = {
        props: props.item,
      };

      let input_props = {
        attrs: {
          ...props.el,
        },
        on: {
          ...props.on
        }
      };
      let text_item = {
        attrs:{
          ...props.textInfo,
        }
      }
      // 第二个input
      let item_props2 = {
        props: props.douInput.item,
      };

      let input_props2 = {
        attrs: {
          ...props.douInput.el,
        },
        on: {
          ...props.douInput.on
        }
      };
      let text_item2 = {
        attrs:{
          ...props.douInput.textInfo,
        }
      }

      return (
        <div style="position:relative">
          <el-form-item
            {...item_props}
            class="douInput"
          >
            <el-input
              type={props.type}
              {...input_props}
              vModel={this.form[props.item.prop]}>
            </el-input>
            <span {...text_item }>{props.text}&nbsp;&nbsp;~&nbsp;&nbsp;</span>
          </el-form-item>

          <el-form-item
          {...item_props2}
          class="douInput_2"
        >
          <el-input
            type={props.type}
            {...input_props2}
            vModel={this.form[props.douInput.item.prop]}>
          </el-input>
          <span {...text_item2 }>{props.douInput.text}</span>
        </el-form-item>
      </div>
        
      )
    },

    // 时间选择器
    renderTimePicker(props) {

    }

  },

  render(createElement, context) {
    let genR = (types, v) => {
      console.log(types,v,'1')
      switch (types) {
        case "button":
          return this.renderButton(v);
        case "select":
          return this.renderSelect(v);
        case "cus":
          return this.renderCus(v);
        case "checkbox":
          return this.renderCheckbox(v);
        case "date":
          return this.renderDate(v);
        case "switch":
          return this.renderSwitch(v);
        case "textarea":
          return this.renderText(v);
        case "upload":
          return this.renderUpload(v);
        case "input":
          return this.renderInput(v);
        case "doubleInput":
            return this.renderInput2(v);
        case "cascader":
          return this.renderCascader(v);
        default:
          return this.renderNull(v)
      }
    };

    let rows = this.itemProps.map((row, index) => {
      if (Array.isArray(row)) {
        let form_row = row.map((v) => {
          return genR(v.types, v)
        });

        return this.renderRow(form_row, "form_row" + index)
      } else {
        return <div> </div>
      }
    });

    return (
      <div>
        {rows}
      </div>
    )
  }

}
