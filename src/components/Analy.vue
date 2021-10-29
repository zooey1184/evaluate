<template>
  <div>
    <div class="flex">
      <div ref="chart" class="chartWrap"></div>
      <div class="right pt-56">
        <div class="fontSize-18 mb-8 fontWeight-600">候选人： {{name}}</div>
        <ul>
          <li class="fontSize-16 flex" v-for="item in info" :key="item.key">
            <span class="text-align-right mr-16" style="width: 120px"
              >{{ item.title }} :</span
            >
            <span :style="{ color: getDesc(item.score).color }">{{
              item.score
            }}</span>
            <span class="ml-8 color-gray " v-if='getDesc(item.score).desc'>({{ getDesc(item.score).desc }})</span>
          </li>
        </ul>

        <div class="fontSize-16 mt-40 flex">
          <span class="text-align-right mr-16 fontWeight-600" style="width: 120px">评估结果 :</span>
          <span>综合得分{{getScore.score}}， {{getScore.desc}}， 建议{{getScore.suggest}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import {
  TitleComponent,
  PolarComponent,
  TooltipComponent,
} from "echarts/components";
import { BarChart } from "echarts/charts";
import { ref, unref } from "vue";
import { CanvasRenderer } from "echarts/renderers";
import LevelMap from "./analy";
echarts.use([
  TitleComponent,
  PolarComponent,
  TooltipComponent,
  BarChart,
  CanvasRenderer,
]);

export default {
  props: {
    info: {
      type: Array,
      default: () => [],
    },
    score: Number | String,
    visible: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      default: ''
    }
  },
  computed: {
    getDesc() {
      return (score) => {
        for (let [key, val] of LevelMap.entries()) {
          const [f, s] = key;
          if (score > f && score <= s) {
            return val;
          }
        }
        return {
          color: '#999',
          suggest: '',
          desc: ''
        }
      };
    },
    getScore() {
      let score = 0
      this.info.forEach(item => {
        score += item.score
      })
      const sum = parseInt(score/this.info.length) || 0
      return {
        score: sum,
        ...this.getDesc(sum)
      }
    }
  },
  methods: {
    init(x, data) {
      let option = {
        title: [
          {
            text: "候选评估测试分析",
          },
        ],
        polar: {
          radius: [10, "60%"],
        },
        radiusAxis: {
          max: 100,
        },
        angleAxis: {
          type: "category",
          data: x,
          startAngle: 90,
        },
        tooltip: {},
        series: {
          type: "bar",
          data: data,
          coordinateSystem: "polar",
          label: {
            show: true,
            // position: "middle",
            // formatter: "{b}: {c}",
            formatter: "{c}",
          },
        },
        backgroundColor: "#fff",
        animation: false,
      };
      const chartDom = this.$refs.chart;
      const c = echarts.init(chartDom);
      c.setOption(option);
    },
  },
  setup(props) {
    
  },
  mounted() {
    this.$watch(
      () => this.visible,
      (n) => {
        const info = unref(this.info);
        if (n && info.length) {
          const x = [];
          const data = [];
          info.forEach((item) => {
            x.push(item.title);
            data.push(item.score);
          });
          this.init(x, data);
        }
      },
      {
        immediate: true,
      }
    );
  },
};
</script>

<style lang="less" scoped>
.chartWrap {
  height: 45vh;
  width: 50%;
}
</style>
