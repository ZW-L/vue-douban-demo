<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import HomeView from './views/Home/Home.vue';

export default {
  name: 'app',

  components: {
    HomeView
  },

  data() {
    return {
      transitionName: '',
    }
  },

  watch: {
    $route(to, from) {
      this.transitionName = to.meta.index > from.meta.index ? 'slide-left' : 'slide-right';
    },
  },
}
</script>

<style lang="scss" scoped>

@import '@/assets/css/mixin.scss';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
// @include router-change;
</style>
