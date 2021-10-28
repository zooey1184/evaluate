<template>
  <div>
    <div class="flex">
      <div ref="chart" class="chartWrap"></div>
      <div class="right pt-56">
        <ul>
          <li class="fontSize-16">
            技能匹配：较为匹配
          </li>
        </ul>
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
import { CanvasRenderer } from "echarts/renderers";
echarts.use([
  TitleComponent,
  PolarComponent,
  TooltipComponent,
  BarChart,
  CanvasRenderer,
]);

export default {
  props: {},
  methods: {
    init() {
      var chartDom = this.$refs.chart;
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        title: [
          {
            text: "候选评估测试分析",
          },
        ],
        polar: {
          radius: [10, "60%"],
        },
        radiusAxis: {
          max: 5,
        },
        angleAxis: {
          type: "category",
          data: ["a", "b", "c", "d"],
          startAngle: 90,
        },
        tooltip: {},
        series: {
          type: "bar",
          data: [2, 1.2, 2.4, 3.6],
          coordinateSystem: "polar",
          label: {
            show: true,
            position: "middle",
            formatter: "{b}: {c}",
          },
        },
        backgroundColor: "#fff",
        animation: false,
      };

      option && myChart.setOption(option);
    },
  },
  setup() {},
  mounted() {
    this.init()
  }
};
</script>

<style lang="less" scoped>
.chartWrap {
  height: 45vh;
  width: 50%;
}
</style>
