<template>
  <div>
    <slot name='title'>
      <div class="fontSize-16">{{title}}</div>
    </slot>
    <div>
      <slot></slot>
      <a-slider :tooltipVisible='tooltipVisible' :value="score" @change='handleChangeCount' />
      <slot name='footer'></slot>
    </div>
  </div>
</template>

<script>
import {Slider} from 'ant-design-vue'

export default {
  props: {
    title: String,
    tooltipVisible: Boolean,
    score: {
      type: Number,
      default: 0
    }
  },
  components: {
    'a-slider': Slider
  },
  emits: ['update:score'],
  methods: {
    handleChangeCount(e) {
      this.$emit('update:score', e)
    }
  },
}
</script>
