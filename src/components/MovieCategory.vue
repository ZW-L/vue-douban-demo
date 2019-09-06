<template>
  <div class="category">
    <div class="wrapper">
      <div class="title">
        <span class="title-left">{{categoryInfo.title}}</span>
        <span class="title-right" v-if="sign">??????</span>
      </div>
      <div class="content">
        <swiper class="swiper-wrapper" ref="mySwiper" :options="swiperOption">
          <div class="swiper-pagination"  slot="pagination"></div>
          <swiper-slide class="swiper-item" v-for="(list, index) of listPart6" :key="index">
            <div class="slide-content">
              <movie-card class="slide-content-item" v-for="item in list" :key=item.id
                :item="item" 
                :type="categoryInfo.type" 
                :listName="categoryInfo.listName"
              ></movie-card>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </div>
</template>

<script>
import { getList } from '../api/get';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import MovieCard from './MovieCard.vue';

export default {

  components:{
    MovieCard,
    swiper,
    swiperSlide
  },

  props:{
    categoryInfo: {
      type: Object,
      default: {}
    },
    sign: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      swiperOption: {
        slidesPerView: 1,
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets'
        }
      }
    }
  },

  created() {
    // console.log(this.categoryInfo.listName);
  },

  computed: {
    list() {
      return this.categoryInfo.list;
    },
    listPart6() {
      let listPart6 = []
      for (let i = 0; i < this.list.length; i += 6) {
        listPart6.push(this.list.slice(i, i+6));
      }
      return listPart6;
    }
  }
};
</script>

<style lang="scss" scoped>

.content /deep/ .swiper-pagination {
  // background-color: red;
  bottom: 0;
}

.wrapper {
  width: 100%;
  margin-top: 1rem;
  .title {
    height: 40px;
    line-height: 40px;
    font-size: 20px;
    .title-left {
      display: inline-block;
      margin-left: .2rem;
    }
    .title-right {
      display: inline-block;
      margin-left: .2rem;
      color: #aaa;
    }
  }
  .content {
    // background-color: #ccc;
    .slide-content {
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      width: 100%;
      // height: 600px;
      padding-bottom: 10px;
      .slide-content-item {
        width: 30%;
      }
    }
  }
}
</style>
