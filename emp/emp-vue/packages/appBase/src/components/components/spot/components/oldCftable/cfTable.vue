<!--
  警告： 公共组件 严禁修改！！！！！！！！！！！！！！
  功能：Table + Pagination
  作者：chenfei
  邮箱：18845640468@163.com
  时间：2019年10月01日 15:15:04
  版本：Pre-Alpha -> Alpaha -> beta -> v1.0
  WeChat: 18845640468
  警告： 公共组件 严禁修改！！！！！！！！！！！！！！
-->
<template>
    <div>
      <div class="cftable_container">
        <el-table
          ref="multipleTable"
          :data="tableData"
          :selectDefault="selectDefault"
          :cell-style="finalCellStyle"
          :span-method="objectSpanMethod"
          border
          style="width: 100%"
          :stripe="stripe"
          @selection-change="handleSelectionChange"
          :row-class-name="itableRowClassName"
          :height="maxHeight"
        >

          <template v-for="(item, index) in columns">
            <el-table-column v-if="item.type || item.type === 'selection'"
                             :key="index"
                             :prop="item.prop"
                             :label="item.label"
                             :align="item.align"
                             :width="item.width"
                             :type="item.type"
            >
            </el-table-column>

            <el-table-column v-else-if="item.type || item.type === 'index'"
                             :key="index"
                             :prop="item.prop"
                             :label="item.label"
                             :align="item.align"
                             :width="item.width"
                             :type="item.type"
                             :index="indexMethod"
            >
            </el-table-column>

            <el-table-column
              v-else
              :key="index"
              :prop="item.prop"
              :label="item.label"
              :align="item.align"
              :width="item.width"
              show-overflow-tooltip
              :fixed="item.fixed"
              :min-width="item.minWidth"
              header-align="center"
            >
            <!-- <template v-if="item.children">
              <div v-for="(items, indexs) in item.children" :key="indexs">
                <el-table-column
                  :prop="items.prop"
                  :label="items.label"
                  :align="items.align"
                  :width="items.width"
                ></el-table-column>
              </div>
            </template> -->
            <template v-for="(items, indexs) in item.children">
                <el-table-column
                  :prop="items.prop"
                  :label="items.label"
                  :align="items.align"
                  :width="items.width"
                  :fixed="items.fixed"
                  :key="indexs"
                  v-if="item.children"
                >
                </el-table-column>
              </template>
            </el-table-column>
          </template>

          <el-table-column v-if="showBtn"
                           label="操作"
                           align="center"
                           :width="btnHeaderWidth"
          >

            <template slot-scope="scope">
              <div>
                <template v-for="(item, index) in cfbtns(scope.row)">
                  <el-button
                    :type="item.type"
                    size="small"
                    :key="index"
                    @click.native.prevent="handleAction(item.action, scope.row, scope.$index)"
                  >
                    {{item.label}}
                  </el-button>
                </template>
              </div>
            </template>

          </el-table-column>


        </el-table>
      </div>

      <el-row
              v-if="showPage"
              class="cfpagination_container" style="text-align: right; margin-top: 12px">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 50]"
          :page-size="curPageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </el-row>
    </div>
</template>

<script>
	export default {
		name: "cfTable",
	  props:{
      /* Table 相关 */
      tableData: {
        type: Array,
        default: () => []
      },
      columns: {
        type: Array,
        default: () => []
      },
      maxHeight: {
        type: String,
      },
      cfbtns: {
        type: [Array, Function],
        default: () => []
      },
      // select 默认选中的项 的index 数组
      selectDefault: {
        type: Array,
        default: () => []
      },
      // 合并单元格的 method
      objectSpanMethod: {
        type: Function,
        default: function() {}
      },
      // 动态修改具体单元格style的 method
      finalCellStyle: {
        type: Function,
        default: function() {}
      },
      //指定 Table 组件的 row-class-name 属性来为 Table 中的某一行添加 class，表明该行处于某种状态
      itableRowClassName: {
        type: Function,
        default: function() {}
      },
      stripe: {
        type: Boolean,
        default: true
      },
      showBtn: {
        type: Boolean,
        default: true
      },
      showIndex: {
        type: Boolean,
        default: true
      },
      btnHeaderWidth: {
        type: String,
        default: '150'
      },

      /* Pagination 相关 */
      showPage: {
      	type: Boolean,
        default: true
      },
      total: {
        type: Number,
        default: 0
      },
      curPageSize: {
        type: Number,
        default: 10
      },
      currentPage: {
        type: Number,
        default: 1
      }
    },
    data() {
	    return {
       /* currentPage1:this.currentPage,
        curPageSize1:this.curPageSize*/
      }
    },
    watch: {
      tableData(val, oldVal) {
        this.$nextTick(() => {
          this.$refs.multipleTable.doLayout()
        })
      },
      deep: true,
      immediate: true
    },
    mounted() {},
    methods: {
      /* Table 相关 */
      doLayoutAgains() {
        // this.$nextTick(() => {
        //   this.$refs.multipleTable.doLayout()
        // })
        // console.log('54646516')
      },
      indexMethod(index) {
        return index * 1;
      },
      handleSelectionChange(val){
        this.$emit('handleSelectionChange',val)
      },
      handleAction(type, data, $index) {
        data.$cf_Index = $index
        this.$emit(type, data)
      },

      /* Pagination 相关*/
      handleSizeChange(val) {
        //console.log(`每页 ${val} 条`);
        this.$emit('fetchData', {page: this.currentPage, curPageSize: val})
      },
      handleCurrentChange(val) {
        //console.log(`当前页: ${val}`);
        this.$emit('fetchData', {page: val, curPageSize: this.curPageSize})
      }
    },
	}
</script>

<style scoped>

</style>
