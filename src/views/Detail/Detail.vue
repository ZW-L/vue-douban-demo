<template>
  <div class="detail">
    <header class="header">Detail View</header>
    <div class="content">
      <div class="content-header">
        <detail-movie-card
          :cover="detail.cover"
          :title="detail.title"
          :info="detail.info"
          :rate="detail.rate"
        ></detail-movie-card>
      </div>
      <div class="content-item">
        <header class="title-light">详情介绍</header>
        <detail-content-desc :desc="detail.desc"></detail-content-desc>
      </div>
      <div class="content-item">
        <header class="title-light">演员表</header>
        <linear-swiper 
          :list="members"
          :ratio="140"
        ></linear-swiper>
      </div>
      <div class="content-item">
        <header class="title-light">预告片/剧照</header>
        <linear-swiper 
          :list="pics"
          :slideWidth="180"
          :ratio="56"
        ></linear-swiper>
      </div>
      <div class="content-item">
        <header class="title-light">精彩短评</header>
        <div class="comment-list" v-for="item in detail.comment" :key="item.avatar">
          <detail-comment-item
            :user="item.user"
            :avatar="item.avatar"
            :content="item.content"
          ></detail-comment-item>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getDetail } from '@/api/get';
import LinearSwiper from '@/components/LinearSwiper.vue';
import DetailMovieCard from './components/DetailMovieCard.vue';
import DetailContentDesc from './components/DetailContentDesc.vue';
import DetailCommentItem from './components/DetailCommentItem.vue';

export default {

  name: 'detail',

  components: {
    DetailMovieCard,
    DetailContentDesc,
    LinearSwiper,
    DetailCommentItem,
  },

  props: {},

  data() {
    return {
      detail: {},
    };
  },

  computed: {
    director() {
      return this.detail.members.director;
    },
    cast() {
      return this.detail.members.cast;
    },
    members() {
      const list = [];
      list.push({ title: this.director.name, pic: this.director.avatar, type: '导演' });
      return this.cast.reduce((accu, curr) => {
        accu.push({ title: curr.name, pic: curr.avatar, type: '演员' });
        return accu;
      }, list);
    },
    pics() {
      let videos = this.detail.show.videos.map(v => ({ pic: v.pic, isVideo: true, src: v.src }));
      let pics = this.detail.show.pics.map(v => ({ pic: v }));
      return videos.concat(pics);
    }
  },

  created() {
    getDetail('movies_detail').then(res => {
      this.detail = res.data.data;
      // console.log(this.detail);
    });
  },
};
</script>

<style lang="scss" scoped>

@import '@/assets/css/mixin.scss';

.detail {
  width: 100%;
  .header {
    height: 1rem;
    font-size: .7rem;
    line-height: 1rem;
    text-align: center;
    color: rgb(89, 126, 190);
  }
  .content {
    .content-item {
      margin-top: .6rem;
      padding: 0 .3rem;
      .title-light {
        line-height: .8rem;
        color: #ccc;
        font-size: .3rem;
      }
    }
  }
}
</style>
