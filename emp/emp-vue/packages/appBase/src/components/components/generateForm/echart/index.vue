<template>
  <div :id="id" :class="className" :style="{ height: height, width: width }" />
</template>

<script>
// import tdTheme from './theme.json' // 引入默认主题
import echartMixins from "./resizeMixins";
import echarts from 'echarts';

export default {
  name: 'wqEchart',
  mixins: [echartMixins],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    },
    options: {
      type: Object,
      default: ()=>({})
    }
  },
  data () {
    return {
      chart: null
    }
  },
  watch: {
    options: {
      handler (options) {
        // 设置true清空echart缓存
        this.chart.setOption(options, true)
      },
      deep: true
    }
  },
  mounted () {
    // echarts.registerTheme('tdTheme', tdTheme); // 覆盖默认主题
    require("echarts/theme/macarons"); // echarts 主题

    this.initChart();
  },
  methods: {
    initChart () {
      // 初始化echart
      this.chart = echarts.init(this.$el, 'tdTheme')
      this.chart.setOption(this.options, true)
    }
  }
}
</script>

<style>
/* .wqchart {
  flex: 1;
} */
</style>
