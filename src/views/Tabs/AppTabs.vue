<template>
  <el-tabs 
    v-model="activeTab" 
    type="card" 
    closable 
    @tab-click="handleTabClick"
    @tab-remove="handleTabRemove"
  >
    <el-tab-pane 
      v-for="tab in tabs" 
      :key="tab.path" 
      :label="tab.title" 
      :name="tab.path"
    ></el-tab-pane>
  </el-tabs>
</template>
<script> 
  export default {
    name: 'AppTabs',
    data() {
      return {
        tabs: [],
        activeTab: '/home'
      };
    },
    watch: {
      $route(to) {
        this.addTab(to);
        this.activeTab = to.path;
      }
    },
    created() {
      this.addTab(this.$route);
    },
    methods: {
      addTab(route) {
        if (!route.meta || this.tabs.some(tab => tab.path === route.path)) return;
        this.tabs.push({
          path: route.path,
          title: route.meta.title,
          name: route.name
        });
      },
      handleTabClick(tab) {
        if (tab.name === this.$route.path) {
          return;
        }
        this.$router.push(tab.name);
      },
      handleTabRemove(path) {
        if (path === '/home') {
          return;
        }
        const index = this.tabs.findIndex(tab => tab.path === path);
        this.tabs.splice(index, 1);
        if (path === this.activeTab) {
          const newTab = this.tabs[index - 1] || this.tabs[0];
          this.$router.push(newTab.path);
        }
      }
    }
  }
</script>
<style scoped>
::v-deep .el-tabs__item.is-active {
    background-color: #fff !important;
}
</style>