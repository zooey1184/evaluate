<template>
  <div class="flex">
    <div ref="Radar" class="chartWrap"></div>
    <div class="right"></div>
  </div>
</template>

<script>
import * as echarts from "echarts/core";
import { TitleComponent, LegendComponent } from "echarts/components";
import { RadarChart } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";

echarts.use([TitleComponent, LegendComponent, RadarChart, CanvasRenderer]);

export default {
  methods: {
    init() {
      var chartDom = this.$refs.Radar;
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        title: {
          text: "技能分析",
        },
        legend: {
          data: ["skill"],
        },
        radar: {
          // shape: 'circle',
          indicator: [
            { name: "Sales", max: 100 },
            { name: "Administration", max: 100 },
            { name: "Information Technology", max: 100 },
            { name: "Customer Support", max: 100 },
            { name: "Development", max: 100 },
            { name: "Marketing", max: 100 },
          ],
        },
        series: [
          {
            name: "",
            type: "radar",
            data: [
              {
                value: [32, 65, 88, 50, 78, 90],
                name: "skill",
              },
            ],
          },
        ],
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