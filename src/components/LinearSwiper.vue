<template>
  <div class="swiper-content">
    <swiper class="swiper-wrapper" ref="mySwiper" :options="swiperOption">
      <swiper-slide class="swiper-item" v-for="(item, index) of list" :key="index">
        <linear-swiper-item :item="item" :ratio="ratio">
          <div slot="title" v-show="item.title">
            <div class="swiper-title">{{item.title}}</div>  
          </div>
          <div class="swiper-info" v-show="item.type">{{item.type}}</div>
        </linear-swiper-item>
      </swiper-slide>
      <div class="swiper-scrollbar" slot="scrollbar"></div>
    </swiper>
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import LinearSwiperItem from './LinearSwiperItem.vue';

export default {
  name: 'linear-swiper',

  components: {
    LinearSwiperItem,
    swiper,
    swiperSlide,
  },

  props: {
    list: Array, // list like: [{ pic: '', title: '', ... }], must have param: pic.
    slideWidth: {
      type: Number,
      default: 80,
    },
    slideSpace: {
      type: Number,
      default: 10,
    },
    scrollbarDragSize: {
      type: Number,
      default: 30,
    },
    ratio: Number,
  },

  data() {
    return {
      swiperOption: {
        width: this.slideWidth, // 每个 slide 的宽度
        freeMode: true, // 开启惯性滑动和触底反弹
        freeModeMomentumRatio: 1, // 惯性滑动的速度
        spaceBetween: this.slideSpace, // slide 的间隔
        scrollbar: { // 设置滚动条
          el: '.swiper-scrollbar', // 作为滚动条的 DOM 元素
          dragSize: this.scrollbarDragSize, //  设置滚动条的间隔
        },
      },
    };
  },

  created() {
    // console.log(this.ratio);
  }
};
</script>

<style lang="scss" scoped>

@import '../assets/css/mixin.scss';

.swiper-content {
  .swiper-wrapper {
    display: flex;
    justify-content: space-around;
    .swiper-item {
      display: flex;
      flex-direction: column;
      width: 22%;
      .swiper-pic {
        width: 100%;
        border-radius: .1rem;
      }
      .swiper-title {
        padding-top: .1rem;
        @include ellipsis();
      }
      .swiper-info {
        padding-top: .1rem;
        padding-bottom: .5rem;
        text-align: center;
        color: #ccc;
      }
    }
  }
}
</style>
