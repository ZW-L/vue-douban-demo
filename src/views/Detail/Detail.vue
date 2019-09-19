<template>
  <div class="detail">
    <base-header v-if="detail" :back="true">{{detail.title}}</base-header>
    <div class="white-header"></div>
    <div class="wrapper" ref="wrapper">
      <div v-if="detail" class="content" ref="content">
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
          <div class="comment-list" v-for="(list, index) of commentPart10" :key="index">
            <div class="comment-part" v-show="commentBook[index]" v-for="item of list" :key="item.user">
              <detail-comment-item
                :user="item.user"
                :avatar="item.avatar"
                :content="item.content"
              ></detail-comment-item>
            </div>
          </div>
          <div class="commnet-more" v-show="isBottom">
            <h1>加载更多...</h1>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from '@better-scroll/core';
import LinearSwiper from '@/components/LinearSwiper.vue';
import BaseHeader from '@/components/BaseHeader.vue';
import DetailMovieCard from './components/DetailMovieCard.vue';
import DetailContentDesc from './components/DetailContentDesc.vue';
import DetailCommentItem from './components/DetailCommentItem.vue';
import { getDetail } from '@/api/get';

export default {

  name: 'detail',

  components: {
    DetailMovieCard,
    DetailContentDesc,
    BaseHeader,
    LinearSwiper,
    DetailCommentItem,
  },

  data() {
    return {
      detail: null,
      commentBook: [true],
      isBottom: false,
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
      const videos = this.detail.show.videos.map(v => ({ pic: v.pic, isVideo: true, src: v.src }));
      const pics = this.detail.show.pics.map(v => ({ pic: v }));
      return videos.concat(pics);
    },
    commentPart10() {
      const commentPart10 = [];
      for (let i = 0; i < this.detail.comment.length; i += 10) {
        commentPart10.push(this.detail.comment.slice(i, i + 10));
      }
      return commentPart10;
    },
  },

  created() {
    const { id } = this.$route.params;
    getDetail(id).then(res => {
      this.detail = res.data;
    }).catch(err => {
      // alert('页面丢失！');
      console.log('Data not found!');
      // this.$router.go(-1);
    }).finally(() => {
      this._initScroll();
    });
  },

  beforeDestroy() {
    this.bs.destroy();
  },

  methods: {
    _initScroll() {
      this.bs = new BScroll(this.$refs.wrapper, {
        scrollY: true,
        click: true,
        probeType: 3,
      })
    },
    _isBook(index) {
      return this.commentBook.includes(index);
    },
  },
};
</script>

<style lang="scss" scoped>

@import '@/assets/css/mixin.scss';

.detail {
  width: 100%;
  .white-header {
    width: 100%;
    height: 1rem;
  }
  .wrapper {
    width: 100%;
    height: calc(100vh - 1rem);
    overflow: hidden;
    .content {
      width: 100%;
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
}
</style>
