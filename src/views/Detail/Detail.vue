<template>
  <div class="detail">
    <header class="header">Detail View</header>
    <div class="content">
      <detail-movie-card
        :cover="detail.cover"
        :title="detail.title"
        :info="detail.info"
        :rate="detail.rate"
      ></detail-movie-card>
      <div class="desc content-item">
        <header class="desc-title title-light">详情介绍</header>
        <div class="desc-content">{{detail.desc}}</div>
      </div>
      <div class="cast content-item">
        <header class="cast-title title-light">演员表</header>
        <linear-swiper :list="castList"></linear-swiper>
      </div>
      <div class="related content-item">
        <header class="related-title title-light">预告片/剧照</header>
        <div class="related-content">
          <div class="related-video">
            <video controls>
              <source :src="detail.show.videos[0].src">
            </video>
          </div>
          <div class="related-pic">

          </div>
        </div>
      </div>
      <div class="comment content-item">
        <header class="comment-title title-light">精彩短评</header>
        <div class="comment-list" v-for="item in detail.comment" :key="item.avatar">
          <comment-item
            :user="item.user"
            :avatar="item.avatar"
            :content="item.content"
          ></comment-item>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getDetail } from '@/api/get';
import CommentItem from '@/components/CommentItem.vue';
import LinearSwiper from '@/components/LinearSwiper.vue';
import DetailMovieCard from './components/DetailMovieCard.vue';

export default {

  components: {
    CommentItem,
    LinearSwiper,
    DetailMovieCard,
  },

  props: {},

  data() {
    return {
      detail: {},
    };
  },

  computed: {
    castList() {
      return this.detail.members.cast;
    },
  },

  created() {
    getDetail().then(res => {
      console.log(res.data.data);
      this.detail = res.data.data;
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
    .desc {
      .desc-content {
        text-indent: .5rem;
        line-height: .4rem;
        @include multi-ellipsis(5);
      }
    }
    .related {
      .related-video {
        width: 50%;
        & video {
          width: 100%;
        }
      }
    }
  }
}
</style>
