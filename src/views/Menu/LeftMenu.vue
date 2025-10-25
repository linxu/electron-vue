<template>
  <el-menu
    :default-active="$router.path"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    @select="handleMenuSelect"
  >
    <el-menu-item 
      v-for="route in $router.options.routes" 
      :key="route.path"
      :index="route.path"
      v-if="!route.redirect"
    >
      <i :class="route.meta.icon"></i>
      <span slot="title">{{ route.meta.title }}</span>
    </el-menu-item>
  </el-menu>
</template>
<script>
export default {
  name: 'LeftMenu',
  methods: {
    handleMenuSelect(key) {
      this.$emit('select', key)
    }
  }
}
</script>
<style scoped>
.app-left-menus > .el-menu {
  border-right: none;
}
</style>