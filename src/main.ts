import ElementPlus from 'element-plus'
import {createApp} from 'vue'
import router from './router'
import {createPinia} from "pinia";
import App from './App.vue'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import './assets/css/style.css'
import './assets/css/dark.theme.css'
import './assets/css/light.theme.css'


createApp(App).use(router as any).use(createPinia() as any).use(ElementPlus as any).mount('#app')
