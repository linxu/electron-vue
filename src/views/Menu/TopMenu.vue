<template>
  <el-menu
    mode="horizontal"
    @select="handleMenuSelect"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b">
    <el-menu-item index="0" disabled class="app-title">Electron Vue 文档</el-menu-item>
    <el-menu-item index="100">处理中心</el-menu-item>
    <el-submenu index="2">
      <template slot="title">我的工作台</template>
      <el-menu-item index="2-1">选项1</el-menu-item>
      <el-menu-item index="2-2">选项2</el-menu-item>
      <el-menu-item index="2-3">选项3</el-menu-item>
      <el-submenu index="2-4">
        <template slot="title">选项4</template>
        <el-menu-item index="2-4-1">选项1</el-menu-item>
        <el-menu-item index="2-4-2">选项2</el-menu-item>
        <el-menu-item index="2-4-3">选项3</el-menu-item>
      </el-submenu>
    </el-submenu>
    <el-menu-item index="4"><a href="https://www.baidu.com" target="_blank">百度一下</a></el-menu-item>
  </el-menu>
</template>
<script>
export default {
  name: 'TopMenu',
  methods: {
    handleMenuSelect(key) {
      this.$emit('select', key);
    }
  }
}
</script>
<style scoped> 
.app-title {
  opacity: 1;
  color: #ffd04b !important;
  font-size: 19px;
  font-weight: bold;
}
.app-header a {
  text-decoration: none;
}
</style>