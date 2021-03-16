<!--
 * @功能描述: 
 * @版本: 
 * @作者: gaoaining
 * @Date: 2020-01-19 11:24:20
 * @最新修改内容: 
 * @LastEditTime: 2020-08-25 14:32:01
 -->
<template>
    <div class="wrapper-container">
        <!-- overflow: hidden：清除子元素相对父元素的超界溢出 -->
        <div style="overflow: hidden" :style="{height : showMore ? 'auto': showHeight + 'px'}">
            <div ref="content">
                <slot>
                    <!-- 当外界 <show-more> 标签中有元素时，使用 <show-more> 标签中的元素进行渲染，否则使用下面这个 div 进行渲染 -->
                    <div>{{content}}</div>
                </slot>
            </div>
        </div>
    
        <div class="control" v-show="isLongContent" :class="{'show-more' : showMore}">
            <el-button type="text" @click="toggleShowMore">{{ showMore ? '收起' : '展开'}}</el-button>
        </div>
    </div>
</template>

<script>
import { initLayout } from "@common/utils/init";
export default {
  name: "show-more",
   props: {
      showHeight: {
        type: Number,
        required: true,
        default: 32
      },
      content: {
        type: String,
        default: null
      }
    },
  data() {
    return {
       showMore: false,
       isLongContent: false

    };
  },
  created() {
    this.init();
  },
  watch: {
   // 每当内容变化时都重新计算一次高度
    content () {
    this.calculateHeight()
    }

  },
  methods: {
    init(){
      this.calculateHeight()
    },
      refresh () {
        this.calculateHeight()
      },
      calculateHeight () {
        // $nextTick()，等待内容获取完毕再计算高度，异步处理
        this.$nextTick().then(() => {
          let contentHeight = this.$refs.content.clientHeight
          if (contentHeight > this.showHeight) {
            this.isLongContent = true
          } else {
            this.isLongContent = false
          }
        })
      },
      toggleShowMore () {
        this.showMore = !this.showMore
      }
    
    }
};
</script>

<style scoped>
.wrapper-container {
    position: relative;

}
.control {    
        bottom: 0;
        width: 100%;
        line-height: 24px;
        font-size: 12px;
        text-align: right;
        background-image: linear-gradient(-180deg, rgba(255, 255, 255, 0) 0%, #fff 70%);
    }
.el-button--text{
  font-size: 12px;
}
.show-more {
    padding-top: 0;
    background: none;
}
</style>

