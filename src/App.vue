<template>
  <div>
    <Wrap>
      <div class="pt-16">
        <h3 class="mr-8 fontSize-24 text-align-center">候选评估测试
          <span class="fontSize-14">({{date}})</span>
        </h3>
        <div class="float-right mb-8 flex items-center">
          <a-input style="width: 200px" placeholder="请输入候选人姓名" />
          <span>{{sum}}</span>
          <a-button class="ml-8" type='primary' @click='handleCalc'>计算得分</a-button>
        </div>
      </div>
      <a-divider />
      <div>
        <Score title="技能匹配" class="mb-32" v-model:score="skill_score">
          <template v-slot:title>
            <div class="fontSize-16">
              技能匹配
              <ExperimentOutlined @click="handleSkills" />
            </div>
            
          </template>
        </Score>
        <!-- <Score title='项目匹配'></Score> -->
        <!-- <Score title='文化匹配'></Score> -->
        <Score title='综合匹配' v-model:score="com_score"></Score>
      </div>

      <a-drawer :title="title" :width='800' placement="right" v-model:visible="visible">
        <TestPane ref='skill'></TestPane>
      </a-drawer>

      <a-drawer height='100%' placement="top" v-model:visible="visibleAnaly">
        <div>
          <AnalyPane></AnalyPane>
        </div>
        <AnalySkillPane ></AnalySkillPane>
        
      </a-drawer>
    </Wrap>
  </div>
</template>

<script>
import { Input, Divider, Button, Drawer } from "ant-design-vue";
import dayjs from "dayjs";
import Wrap from "./components/Wrap.vue";
import Score from "./components/Score.vue";
import { ref } from "vue";
import { ExperimentOutlined } from "@ant-design/icons-vue";
import TestPane from './components/TestPane.vue'
import AnalyPane from './components/Analy.vue'
import AnalySkillPane from './components/AnalySkill.vue'

export default {
  components: {
    "a-input": Input,
    "a-divider": Divider,
    "a-button": Button,
    "a-drawer": Drawer,
    Wrap,
    ExperimentOutlined,
    Score,
    TestPane,
    AnalyPane,
    AnalySkillPane
  },
  computed: {
    sum() {
      return (this.skill_score + this.com_score)/2
    }
  },
  methods: {
    handleSkills() {
      this.visible = true;
    },
    handleCalc() {
      const params = [
        {
          title: '技能匹配',
          score: this.skill_score
        },
        {
          title: '综合匹配',
          score: this.com_score
        }
      ]

      this.visibleAnaly = true
    }
  },
  setup() {
    const date = dayjs().format("YYYY-MM-DD");
    const skill_score = ref(10);
    const com_score = ref(10)
    const visible = ref(false);
    const title = ref("技能匹配");

    const visibleAnaly = ref(false)
    return {
      date: date,
      skill_score,
      com_score,
      visible,
      title,
      visibleAnaly
    };
  },
};
</script>
