<template>
  <div class="header">
    <div class="header-left">
      <div @click="goBack()" v-if="back">
        <img class="back-icon" :src="require('../../public/img/icons/back.png')" />
      </div>
    </div>
    <div class="header-content">
      <slot></slot>
    </div>
    <div class="header-right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'base-header',

  props: {
    back: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    goBack() {
      this.$router.go(-1);
    }
  },
};
</script>

<style lang="scss" scoped>

.header /deep/ .router-link-active {
  color: #fff;
}

.header {
  z-index: 999;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  height: 1rem;
  text-align: center;
  color: #fff;
  background-color: rgb(78, 186, 136);
  .header-left, .header-right {
    width: 15%;
  }
  .header-left {
    font-size: .4rem;
    line-height: 1rem;
    .back-icon {
      width: 50%;
    }
  }
  .header-content {
    width: 70%;
    line-height: 1rem;
    font-size: .4rem;
  }
}
</style>
