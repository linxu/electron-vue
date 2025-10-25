<template>
  <el-container class="app">
    <el-header class="app-header">
      <top-menu @select="handleMenuSelect"/>
    </el-header>
    <el-container>
      <el-aside width="200px" class="app-left-menus">
        <left-menu @select="handleMenuSelect"/>
      </el-aside>
      <el-container>
        <el-header height="41px" class="app-tabs-header">
          <app-tabs />
        </el-header>
        <el-main class="app-main">
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import TopMenu from './views/Menu/TopMenu.vue';
import LeftMenu from './views/Menu/LeftMenu.vue';
import AppTabs from './views/Tabs/AppTabs.vue';
import { startsWith } from 'lodash-es';

export default {
  components: {
    TopMenu,
    LeftMenu,
    AppTabs,
  },
  data() {
  },
  created() {
  },
  methods: {
    handleMenuSelect(key) {
      let find = startsWith(key, '/');
      if (!find) {
        return;
      }
      if (key === this.$route.path) {
        return;
      }
      this.$router.push(key);
    },
  }
};
</script>

<style scoped>
.app {
  height: 100%;
}
.app-header {
  padding: 0;
}
.app-left-menus {
  background-color: #545c64;
}
.app-tabs-header {
  background-color: #f5f7fa;
  padding: 0 10px;
}
.app-main {
  padding: 10px;
}
</style>