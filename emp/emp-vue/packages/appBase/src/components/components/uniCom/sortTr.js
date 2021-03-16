/**
 * @file: sortTr.js
 * @method changeKeys
 * @param {Object} v
 * @return {Object}
 * @description: 对象属性值 1->true, 0->false
 * @author: wsc
 * @date: 2020-09-26
 */

export function changeKeys(v) {
  const boolHead = ["sortable", "see"]
  Object.keys(v).forEach(k => {
    if (_.includes(boolHead, k)) {
      if (v[k] === 1) {
        v[k] = true;
      } else if (v[k] === 0) {
        v[k] = false;
      }
    }

  });

  return v;
}

export function genColumns(list, colPair) {
  console.log("🚀genColumns", list, colPair)
  return _.compact(_.keys(list[0]).map(v => {
    if (colPair[v]) {
      return {
        label: colPair[v],
        prop: v,
        sortable: true,
        width: "160"
      }
    }

  }))
}

// 统一带 Name 和 对应 id 的表头
export function genIdName(list, replaceHead) {
  let hkeys = _.keys(replaceHead);
  _.forEach(hkeys, v => {
    let index = _.findIndex(list, val => {
      return val.prop === v;
    });
    if (index !== -1) {
      let obj = {
        ...list[index],
        prop: replaceHead[v]
      }
      list.splice(index, 1, obj)
    }
  });
}

import FormFile from "./formFile";

export const sortTr = {
  name: "sortTr",
  components: {
    "form-file": FormFile,
  },
  props: {
    table: Object,
    data: Array,
    columns: Array,
    options: Array,
    event: Object,
  },

  data() {
    return {
      cache: {}
    }
  },

  methods: {

    scopeCell(h, props, item) {
      if (typeof item.renderTpl === 'function') {
        return item.renderTpl(h, props, item)
      } else {
        return props.row[item.prop];
      }
    },

    renderSelect(h, item) {
      const cellProps = {
        props: {
          ...item
        },
        "min-width": item["min-width"],
        on: {
          ...this.$listeners,
          ...this.event,
        },
      };
      return (
        <el-table-column
          type={item.prop}
          {...cellProps}
        >

        </el-table-column>
      );
    },

    renderCell(h, item) {
      const cellProps = {
        props: {
          ...item,
        },
        ...item,
        on: {
          ...this.$listeners,
          ...this.event,
        },
        scopedSlots: {
          default: props => {
            return this.scopeCell(h, props, item)
          }
        },
      };
      return (
        <el-table-column
          {...cellProps}
        >

        </el-table-column>
      )
    }
  },
  render(h) {
    const tableProps = {
      props: {
        ...this.$attrs,
        data: this.data,
        ...this.table,
      },
      on: {
        ...this.$listeners,
        ...this.event,
      },
      ref: this.table.ref,
      scopedSlots: this.$scopedSlots,
    };

    return (
      <el-table
        width={"100%"}
        {...tableProps}
        ref={tableProps.ref}
      >
        {
          this.columns && this.columns.map((item) => {
            if (!_.has(item, "prop")) return;
            switch (item.prop) {
              case "selection":
              case "index":
                return this.renderSelect(h, item);

              default:
                return this.renderCell(h, item)
            }
          })
        }
      </el-table>
    )
  }

}
