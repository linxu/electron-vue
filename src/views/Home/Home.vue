<template>
  <div>
    <h2>{{ appInfo.name }}</h2>
    <p>这是首页的示例内容</p>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  name: 'Home',
  data () {
    return {
    }
  },
  created() {
    this.getData();
    setTimeout(() => {
      console.log(this.$store.state.base.appInfo);
    }, 3000);
    window.electronStore.getState().then(state => {
      console.log('共享数据：', state);
    });
    localStorage.setItem('app', 'electron vue');
  },
  computed: {
    ...mapGetters(['appInfo'])
  },
  methods: {
    getData() {
      this.$store.dispatch('getAppInfo');
    }
  },
}
</script>