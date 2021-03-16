<template>
  <el-form ref="headQuery" :model="headQuery" :inline="true" label-width="80px">
    <c-item
      :inline="false"
      :itemProps.sync="itemProps"
      :values.sync="headQuery"
    >
    </c-item>
  </el-form>
</template>

<script>
// 电量分配计划 wsc 2020-02-01
import { cItem } from '@common/components/uniCom/cItem';
import {
  validPosHansNumber,
  validatorNumber,
  validateNumberFromZeroToHundred,
} from '@common/utils/validate';

export default {
  name: 'elecFp',
  components: {
    'c-item': cItem,
  },
  props: {
    query: {
      type: Object,
      default: {},
    },
    state: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    state: {
      immediate: true,
      handler: function(n, o) {
        if (n !== o) {
          this.itemProps.forEach((v) => {
            _.forEach(v, (k) => {
              k.el.disabled = n;
            });
          });
        }
      },
    },
    query: {
      immediate: true,
      handler: function(n, o) {
        if (!_.isEqual(n, o)) {
          this.headQuery = {
            ...n,
          };
        }
      },
      deep: true,
    },
    headQuery: {
      handler: function(n, o) {
        this.$emit('update:query', n);
      },
      deep: true,
    },
  },
  data() {
    return {
      headQuery: {},
      itemProps: [
        [
          {
            types: 'input',
            type: 'number',
            item: {
              prop: 'yearLongTermElectricity',
              label: '年度长协电量',
              'label-width': '120px',
              size: 'small',
            },

            el: {
              clearable: true,
              disabled: false,
            },
            append: '%',
            rules: [
              {
                message: '数值必须大于0',
                trigger: 'blur',
                validator: validPosHansNumber,
              },
            ],
            on: {
              blur: this.bluryearLongTermElectricity.bind(this),
            },
          },
          {
            types: 'input',
            type: 'number',
            item: {
              prop: 'monthElectricityBidding',
              label: '月度竞价电量',
              'label-width': '120px',
              size: 'small',
            },

            el: {
              clearable: true,
              disabled: false,
            },
            append: '%',
            rules: [
              {
                message: '数值必须大于0',
                trigger: 'blur',
                validator: validPosHansNumber,
              },
            ],
            on: {
              blur: this.blurmonthElectricityBidding.bind(this),
            },
          },
        ],
        [
          {
            types: 'input',
            type: 'number',
            item: {
              prop: 'largeIndustrialPower',
              label: '大工业电量',
              'label-width': '120px',
              size: 'small',
            },

            el: {
              clearable: true,
              disabled: false,
            },
            append: '千千瓦时',
          },
          {
            types: 'input',
            type: 'number',
            item: {
              prop: 'generalCommercialElectricity',
              label: '一般工商业电量',
              'label-width': '120px',
              size: 'small',
            },

            el: {
              clearable: true,
              disabled: false,
            },
            append: '千千瓦时',
          },
        ],
        [
          {
            types: 'input',
            type: 'number',
            item: {
              prop: 'singlePowerGeneration',
              label: '单一制电量',
              'label-width': '120px',
              size: 'small',
            },

            el: {
              clearable: true,
              disabled: false,
            },
            append: '千千瓦时',
          },
          {
            types: 'input',
            type: 'number',
            item: {
              prop: 'twoPartPower',
              label: '两部制电量',
              'label-width': '120px',
              size: 'small',
            },

            el: {
              clearable: true,
              disabled: false,
            },
            append: '千千瓦时',
          },
        ],
        [
          {
            types: 'input',
            type: 'number',
            item: {
              prop: 'peakPower',
              label: '高峰电量',
              'label-width': '120px',
              size: 'small',
            },

            el: {
              clearable: true,
              disabled: false,
            },
            append: '千千瓦时',
          },
          {
            types: 'input',
            type: 'number',
            item: {
              prop: 'peakLectricityPrice',
              label: '高峰电价',
              'label-width': '120px',
              size: 'small',
            },

            el: {
              clearable: true,
              disabled: false,
            },
            append: '元/千千瓦时',
          },
        ],
        [
          {
            types: 'input',
            type: 'number',
            item: {
              prop: 'horizontalElectricQuantity',
              label: '平段电量',
              'label-width': '120px',
              size: 'small',
            },

            el: {
              clearable: true,
              disabled: false,
            },
            append: '千千瓦时',
          },
          {
            types: 'input',
            type: 'number',
            item: {
              prop: 'horizontalElectricPrice',
              label: '平段电价',
              'label-width': '120px',
              size: 'small',
            },

            el: {
              clearable: true,
              disabled: false,
            },
            append: '元/千千瓦时',
          },
        ],
        [
          {
            types: 'input',
            type: 'number',
            item: {
              prop: 'lowPower',
              label: '低谷电量',
              'label-width': '120px',
              size: 'small',
            },

            el: {
              clearable: true,
              disabled: false,
            },
            append: '千千瓦时',
          },
          {
            types: 'input',
            type: 'number',
            item: {
              prop: 'lowPrice',
              label: '低谷电价',
              'label-width': '120px',
              size: 'small',
            },

            el: {
              clearable: true,
              disabled: false,
            },
            append: '元/千千瓦时',
          },
        ],
      ],
    };
  },

  methods: {
    blurmonthElectricityBidding(e) {
      console.log('blurmonthElectricityBidding', e.target.value);
      this.$set(
        this.headQuery,
        'yearLongTermElectricity',
        (100 - parseFloat(e.target.value, 10).toFixed(2)).toString()
      );
    },

    bluryearLongTermElectricity(e) {
      console.log('bluryearLongTermElectricity', e.target.value);
      this.$set(
        this.headQuery,
        'monthElectricityBidding',
        (100 - parseFloat(e.target.value, 10).toFixed(2)).toString()
      );
    },
  },
};
</script>

<style scoped></style>
