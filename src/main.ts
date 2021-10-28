import { createApp } from 'vue'
import App from './App.vue'
import 'ant-design-vue/dist/antd.css';
import './styles/index.less'

import {Button} from 'ant-design-vue'
import Storages from 'js-storage'

const app = createApp(App);

app.config.globalProperties.$storage = Storages.sessionStorage
app.component('a-button', Button)

app.mount('#app')