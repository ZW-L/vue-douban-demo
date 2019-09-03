<template>
  <div class="detail">
    <header class="header">Detail View</header>
    <div class="content">
      <div class="info">
        <header class="info-title">{{detail.title}}</header>
        <div class="info-content">
          <div class="info-content-pic">
            <img :src="detail.cover">
          </div>
          <div class="info-content-detail">
            <div class="info-content-item" v-for="(value, index) of detail.info" :key="index">
              <p>{{value}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="desc">
        <header class="desc-title">详情介绍</header>
        <div class="desc-content">{{detail.desc}}</div>
      </div>
      <div class="cast">
        <header class="cast-title">演员表</header>
        <linear-swiper :list="castList"></linear-swiper>
      </div>
      <div class="related">
        <header class="related-title">预告片/剧照</header>
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
      <div class="comment">
        <header class="comment-title">精彩短评</header>
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
import { getDetail } from '../api/get';
import CommentItem from '../components/CommentItem';
import LinearSwiper from '../components/LinearSwiper';

export default {

  components: {
    CommentItem,
    LinearSwiper,
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
    }
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
@import '../assets/css/mixin.scss';

.detail {
  width: 100%;
  // background-color: rgb(218, 218, 218);
  .header {
    height: 1rem;
    font-size: .7rem;
    line-height: 1rem;
    text-align: center;
    color: rgb(89, 126, 190);
  }
  .content {
    padding: 0 .3rem;
    .info {
      header.info-title {
        height: .8rem;
        line-height: .8rem;
        font-size: .5rem;
        font-weight: bold;
      }
      .info-content {
        display: flex;
        .info-content-pic {
          width: 30%;
          & img {
            width: 100%;
            border-radius: .1rem;
          }
        }
        .info-content-detail {
          width: 70%;
          padding-left: .2rem;
          .info-content-item {
            // height: .4rem;
            line-height: .4rem;
            &:nth-child(3) {
              @include ellipsis();
            }
          }
        }
      }
    }
    .desc {
      margin-top: .6rem;
      .desc-title {
        line-height: .8rem;
        color: #ccc;
        font-size: .3rem;
      }
      .desc-content {
        text-indent: .5rem;
        line-height: .4rem;
        @include multi-ellipsis(5);
      }
    }
    .comment {
      margin-top: .6rem;
      .comment-title {
        line-height: .8rem;
        color: #ccc;
        font-size: .3rem;
      }
    }
    .cast {
      margin-top: .6rem;
      .cast-title {
        line-height: .8rem;
        color: #ccc;
        font-size: .3rem;
      }
    }
    .related {
      margin-top: .6rem;
      .related-title {
        line-height: .8rem;
        color: #ccc;
        font-size: .3rem;
      }
      .related-video {
        width: 50%;
        & video {
          width: 100%;
          // height: 100px;
        }
      }
    }
  }
}
</style>
