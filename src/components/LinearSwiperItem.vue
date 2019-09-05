<template>
  <div class="item" :style="wrapBottom">
    <div class="wrapper" ref="wrapper">
      <div class="show-btn" v-show="item.isVideo"></div>
        <img class="show" :src="item.pic">
    </div>
    <slot name="title"></slot>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'linear-swiper-item',

  props: {
    item: {
      type: Object,
      default: '',
    },
    ratio: {
      type: Number,
      default: 100,
    },
  },

  data() {
    return {
      wrapBottom: { 'padding-bottom': '.3rem' },
      isPlay: false,
    }
  },

  mounted() {
    const wrapper = this.$refs.wrapper;
    wrapper.style.paddingBottom = `${this.ratio}%`;
  },

};
</script>

<style lang="scss" scoped>
.item {
  width: 100%;
  .wrapper {
    overflow: hidden;
    width: 100%;
    height: 0;
    border-radius: .2rem;
    .show-btn {
      z-index: 100;
      position: absolute;
      left: 50%;
      top: 50%;
      width: .8rem;
      height: .8rem;
      margin-left: -.4rem;
      margin-top: -.5rem;
      background-image: url('../../public/img/icons/play.png');
      background-size: cover;
    }
    .show {
      width: 100%;
    }
  }
}
</style>
