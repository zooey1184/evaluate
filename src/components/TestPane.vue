<template>
  <div class="pos-r">
    <a-tabs>
      <a-tab-pane v-for='item in getTabs' :key="item.key">
        <template v-slot:tab>
          <span>{{item.title}}</span>
          <span class="color-gray" v-if='item.score'>（{{item.score}}）</span>
        </template>
        <div class="">
          <ul>
            <li v-for='(ii, iindex) in item.content' :key='iindex' class="mb-32">
              <Score :title='`${iindex+1}. ${ii.title}`' v-model:score="ii.score">
                <div class="mt-8 color-gray">
                  {{ii.content}}
                </div>
              </Score>
            </li>
          </ul>
        </div>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import {Tabs} from 'ant-design-vue'
import { ref } from 'vue'
import Score from './Score.vue'

export default {
  components: {
    'a-tabs': Tabs,
    'a-tab-pane': Tabs.TabPane,
    Score
  },
  computed: {
    getTabs() {
      const tabs = this.tabs
      const _tabs = []
      tabs.forEach(item => {
        let score = 0
        let t = 0
        item.content.forEach(ic => {
          if (ic.score) {
            score += ic.score
            t++
          }
        })
        item.score = t ? parseInt(score/t) : score
        _tabs.push(item)
      });
      return _tabs
    }
  },
  methods: {
    getInfo() {
      const _tabs = []
      this.getTabs.forEach(item => {
        if (item.score) {
          _tabs.push(item)
        }
      })
      return _tabs
    }
  },
  setup() {
    const tabs = ref([
      {
        title: 'css',
        key: 'css',
        content: [
          {
            title: '布局类',
            score: 0,
            content: '页面底部的按钮固定 始终在内容底部或窗口底部'
          },
        ]
      },
      {
        title: 'js',
        key: 'js',
        content: [
          {
            title: 'js-优化遍历类',
            score: 0,
            content: '多层循环遍历，外部长度长好，还是内部长度长好？'
          }
        ]
      },
      {
        title: 'html',
        key: 'html',
        content: [
          {
            title: 'seo',
            score: 0,
            content: '前端SEO优化应该怎么做？'
          }
        ]
      },
      {
        title: '打包工具类',
        key: 'webpack',
        content: [
          {
            title: 'webpack-loaders',
            score: 0,
            content: 'webpack loader执行顺序'
          },
          {
            title: 'webpack-plugin',
            score: 0,
            content: 'compile 生命周期'
          },
          {
            title: 'webpack-优化',
            score: 0,
            content: '如何从webpack 配置上优化项目'
          }
        ]
      },
      {
        title: 'git',
        key: 'git',
        content: [
          {
            title: 'git 内部规范',
            score: 0,
            content: '提交规范'
          },
          {
            title: 'git2',
            score: 0,
            content: '如何提交让git链只有单条'
          }
        ]
      },
      {
        title: '算法',
        key: 'code',
        content: [
          {
            title: 'leecode-1',
            score: 0,
            content: '上台阶 一次1-2   100阶有几种情况'
          }
        ]
      },
      {
        title: '其他',
        key: 'other',
        content: [
          {
            title: '题目1',
            score: 0,
            content: 'a==1 && a==2 && a==3'
          },
          {
            title: '题目2',
            score: 0,
            content: '[1, 2, 3].map(parseInt)'
          }
        ]
      },
    ])
    return {
      tabs
    }
  },
}
</script>