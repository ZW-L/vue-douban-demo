<template>
  <div class="category">
    <div v-if="list" class="content">
      <swiper class="swiper-wrapper" ref="mySwiper" :options="swiperOption">
        <div class="swiper-pagination"  slot="pagination"></div>
        <swiper-slide class="swiper-item" v-for="(list, index) of listPart6" :key="index">
          <div class="slide-content">
            <div class="slide-content-item" v-for="item in list" :key=item.id>
              <movie-card v-if="item"
                :item="item"
                :type="categoryInfo.type"
                :listName="categoryInfo.listName"
              ></movie-card>
              <div v-else></div>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
    <div v-else class="content-loading">
      <div class="loading-pic"></div>
    </div>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import MovieCard from './MovieCard.vue';

export default {

  components: {
    MovieCard,
    swiper,
    swiperSlide,
  },

  props: {
    categoryInfo: Object,
  },

  data() {
    return {
      swiperOption: {
        slidesPerView: 1,
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
        },
      },
    };
  },

  computed: {
    list() {
      return this.categoryInfo.list;
    },
    listPart6() {
      const listPart6 = [];
      for (let i = 0; i < this.list.length; i += 6) {
        const list = this.list.slice(i, i + 6);
        while (list.length < 6) {
          list.push(false);
        }
        listPart6.push(list);
      }
      return listPart6;
    },
  },
};
</script>

<style lang="scss" scoped>

@import '@/assets/css/mixin.scss';

.content /deep/ .swiper-pagination {
  bottom: 0;
}

@import '@/assets/css/animations.scss';

.category {
  box-sizing: border-box;
  width: 100%;
  padding: 0 .2rem;
  margin-bottom: .5rem;
  .content {
    animation: rotateX-in 1s ease;
    .slide-content {
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      width: 100%;
      padding-bottom: 10px;
      .slide-content-item {
        width: 30%;
      }
    }
  }
  .content-loading {
    height: 8.4rem;
    text-align: center;
    .loading-pic {
      display: inline-block;
      margin-top: .5rem;
      width: 1rem;
      height: 1rem;
      background-image: url('../../public/img/icons/loading_1.png');
      background-size: cover;
      animation: loading 2s ease infinite;
    }
  }
}
</style>
