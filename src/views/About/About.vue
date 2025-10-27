<template>
  <div>
    <h2>关于</h2>
    <p>关于介绍</p>
  </div>
</template>
<script>
export default {
  name: 'About',
  data() {
    return {};
  },
  created() {
    console.log(localStorage.getItem('app'));
  },
};
</script>