<template>
  <div class="flex" v-if='info.length'>
    <div ref="Radar" class="chartWrap"></div>
    <div class="right pt-56">
      <ul>
        <li class="fontSize-16 flex items-center" v-for="item in info" :key="item.key">
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
        <span>技能综合得分</span>
        <span>{{getScore.score}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts/core";
import { TitleComponent, LegendComponent } from "echarts/components";
import { RadarChart } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";
import { ref, unref } from "vue";
import LevelMap from "./analy";

echarts.use([TitleComponent, LegendComponent, RadarChart, CanvasRenderer]);

export default {
  props: {
    info: {
      type: Array,
      default: () => [],
    },
    visible: Boolean,
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
      var chartDom = this.$refs.Radar;
      var myChart = echarts.init(chartDom);
      var option;

      const xx = [];
      x.forEach((item) => {
        xx.push({
          name: item,
          max: 100,
        });
      });
      option = {
        title: {
          text: "技能分析",
        },
        legend: {
          data: ["skill"],
        },
        radar: {
          // shape: 'circle',
          indicator: xx,
        },
        series: [
          {
            name: "",
            type: "radar",
            data: [
              {
                value: data,
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
