import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home/Home.vue';
import About from '../views/About/About.vue';
import Settings from '../views/Settings/Settings.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/home' // 默认显示首页
  },
  {
    path: '/home',
    name: 'Home', // 路由名称（用于标签标签标题）
    component: Home,
    meta: { title: '首页', icon: 'el-icon-s-home' } // 自定义元信息（标题、图标）
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: { title: '关于', icon: 'el-icon-info' }
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings,
    meta: { title: '设置', icon: 'el-icon-setting' }
  }
];

const router = new VueRouter({
  routes
});

export default router;