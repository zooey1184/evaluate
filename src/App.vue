<template>
  <div>
    <Wrap>
      <div class="pt-16">
        <h3 class="mr-8 fontSize-24 text-align-center">候选评估测试
          <span class="fontSize-14">({{date}})</span>
        </h3>
        <div class="float-right mb-8 flex items-center">
          <a-input style="width: 200px" v-model:value='name' placeholder="请输入候选人姓名" />
          <a-button class="ml-8" type='primary' @click='handleCalc'>计算得分</a-button>
        </div>
      </div>
      <a-divider />
      <div>
        <div v-for='item in question' class="mb-32" :key='item.key'>
          <Score v-model:score="item.score">
            <template v-slot:title>
              <div class="fontSize-16">
                {{item.title}}
                <ExperimentOutlined @click="handleSkills" v-if='item.key === "skill"' />
              </div>
            </template>
            <div v-if='item.desc' class="color-gray">
              {{item.desc}}
            </div>
          </Score>
        </div>
      </div>

      <a-drawer :title="title" width='60%' placement="right" v-model:visible="visible">
        <TestPane ref='skill'></TestPane>
      </a-drawer>

      <a-drawer height='100%' placement="top" v-model:visible="visibleAnaly">
        <div>
          <AnalyPane :info='question' :score='sum' :visible='visibleAnaly' :name='name'></AnalyPane>
        </div>
        <AnalySkillPane :info='skillInfo' :visible='visibleAnaly'></AnalySkillPane>
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
      const question = this.question
      let t = 0
      question.forEach(item => {
        t += item.score
      })
      return t/question.length
    }
  },
  watch: {
    visible(n) {
      if (!n) {
        const skill = this.$refs.skill
        const info = skill.getInfo()
        let score = 0
        info?.forEach((item => {
          score += item.score
        }))
        const s = this.question.find(item => item.key === 'skill')
        if (s && info?.length) {
          s.score = parseInt(score/info.length)
          this.skillInfo = info
          // const skillMap = this.$storage.get('skill') || {}
          // skillMap[this.name || 'a'] = info
          // this.$storage.set('skill', skillMap)
        }
      }
    },
    name(n) {
      console.log(n);
    }
  },
  methods: {
    handleSkills() {
      this.visible = true;
    },
    handleCalc() {
      this.visibleAnaly = true
      // console.log(this.question);
      // const infoMap = this.$storage.get('info') || {}
      // infoMap[this.name || 'a'] = this.question
      // this.$storage.set('skill', infoMap)
    }
  },
  setup() {
    const date = dayjs().format("YYYY-MM-DD");
    const visible = ref(false);
    const title = ref("技能匹配");

    const visibleAnaly = ref(false)
    const skillInfo = ref([])

    const question = ref([
      {
        title: '技能匹配',
        desc: '考察候选人【专业技能】是否符合要求，',
        key: 'skill',
        score: 0,
      },
      {
        title: '岗位匹配',
        desc: '考察候选人的岗位匹配度，是否符合岗位要求',
        key: 'post',
        score: 0,
      },
      {
        title: '经历匹配',
        desc: '考察候选人在过往经历是否虚假，是否存在有专业对口的经历，例如有过对应项目的经验等',
        key: 'exp',
        score: 0,
      },
      {
        title: '综合匹配',
        desc: '考察候选人的价值观是否符合企业文化，以及未来的职业规划是否具有稳定性',
        key: 'comprehensive',
        score: 0,
      },
    ])

    const name = ref('')
    console.log('更新时间: 2021.10.29');
    return {
      date: date,
      question,
      visible,
      title,
      visibleAnaly,
      skillInfo,
      name
    };
  },
};
</script>
