import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/global.css';
import App from './App.vue';
import router from './router'; // 引入路由

Vue.use(ElementUI);

new Vue({
  el: '#app',
  router, // 注入路由
  render: h => h(App)
});