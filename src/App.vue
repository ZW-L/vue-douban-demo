<template>
  <div id="app">
    <!-- <home-view></home-view> -->
    <router-view></router-view>
  </div>
</template>
<script>
import HomeView from './views/Home'
export default {
  components: {
    HomeView
  }
}
</script>
<style lang="scss" scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
