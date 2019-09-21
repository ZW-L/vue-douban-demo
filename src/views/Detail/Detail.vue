<template>
  <div class="detail">
    <base-header v-if="detail" :back="true">{{detail.title}}</base-header>
    <div class="wrapper" ref="wrapper">
      <div v-if="detail" class="content" ref="content">
        <div class="pullup-wrapper">
          <img class="up-arrow" ref="up" src="../../../public/img/icons/arrow.png" alt="up-arrow">
        </div>
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
        </div>
        <div class="pullup-wrapper">
          <div v-if="!isLoading">
            <span class="pullup-txt">上拉加载更多</span>
          </div>
          <div v-else>
            <span class="pullup-txt">加载中...</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LinearSwiper from '@/components/LinearSwiper.vue';
import BaseHeader from '@/components/BaseHeader.vue';
import DetailMovieCard from './components/DetailMovieCard.vue';
import DetailContentDesc from './components/DetailContentDesc.vue';
import DetailCommentItem from './components/DetailCommentItem.vue';
import { getDetail } from '@/api/get';
import { speedCalc } from '@/api/scroll';

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
      commentBook: [true, true, true],
      scrollHeight: 0,
      isLoading: false,
      point: [null, null],
      translateY: 0,
      touchPath: [],
      pathIndex: 0,
      timer: '',
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

  mounted() {
    
  },

  methods: {
    _initScroll() {
      this.wrapper = this.$refs.wrapper;
      this.content = this.$refs.content;
      // 最大
      this.maxScrollY = this.wrapper.clientHeight - this.content.clientHeight;
      // console.log(this.maxScrollY, typeof this.maxScrollY);

      this.content.addEventListener('touchstart', e => {
        e.preventDefault();
        console.log('touchstart: ', this.translateY);
        // 反弹动画，顶/底部时
        if (this.translateY === 0 || this.translateY === this.maxScrollY) {
          this.content.style.transform = `translateY(${this.translateY}px)`;
          this.content.style.transition = '';
        }

        // const computedStyle = window.getComputedStyle(this.content);
        // const scrollY = computedStyle.transform.match(/(-?\d+)\)/)[1];
        this.content.style.transform = `translateY(${this.translateY}px)`;
        this.content.style.transition = '';
      });

      this.content.addEventListener('touchmove', e => {
        e.preventDefault();
        // console.log('touchmove: ', this.content.style.transform);
        const touches = e.touches[0];
        const time = Date.now();
        // 刻画轨迹
        if (this.touchPath.length < 5) {
          this.touchPath.push([Math.floor(touches.clientY), time]);
          this.pathIndex = this.pathIndex >= 5 ? 0 : this.pathIndex + 1;
        } else {
          this.touchPath[this.pathIndex] = [Math.floor(touches.clientY), time];
          this.pathIndex = this.pathIndex >= 5 ? 0 : this.pathIndex + 1;
        }
        // 检测是否是第一个点
        if (!this.point[0]) {
          // 第一个点，记录触摸的初始位置
          this.point[0] = Math.floor(touches.clientY);
          // 初始化等于第一个点的位置，否则第一轮计算值失败
          this.point[1] = this.point[0];
        } else {
          // 第二个点，覆盖 point[1] 的值
          this.point[1] = Math.floor(touches.clientY);
        }
        // 计算上拉/下拉的阈值
        // const scrollY = this.point[1] - this.point[0] > 50 ? 50 : this.point[1] - this.point[0];
        const scrollY = this.point[1] - this.point[0];
        console.log('touchmove: ' , this.point[0], this.point[1], this.translateY);
        this.content.style.transform = `translateY(${this.translateY + scrollY}px)`;
      });
      
      this.content.addEventListener('touchend', e => {
        e.preventDefault();
        console.log('touch end...');
        // 清理路径
        this.touchPath[this.pathIndex] = null;
        // console.log(this.touchPath);
        this.refresh();
        this.taxiing();
        this.pathIndex = 0;
        this.touchPath = [];
        // 清理工作
        // 反弹动画
        // 顶部时
        if (this.translateY > 0) {
          // console.log(this.translateY, this.maxScrollY);
          this.translateY = 0;
          this.content.style.transform = 'translateY(0)';
          this.content.style.transition = 'all .5s';
        }
        // 底部时
        if (this.translateY < this.maxScrollY) {
          // console.log(this.translateY, this.maxScrollY);
          this.translateY = this.maxScrollY;
          this.content.style.transform = `translateY(${this.translateY}px)`;
          this.content.style.transition = 'all .5s';
        }
        // 清空记录
        this.point = [null, null];
      })
    },
    taxiing() {
      const speed = speedCalc(this.touchPath);
      const isPullDown = speed[2] === 'pullDown';
      console.log(speed[0], this.translateY, speed[2]);

      if (speed[1] === 'slow') {
        console.log('slow');
        this.content.style.transform = isPullDown ? `translateY(${this.translateY + 100}px)`
        : `translateY(${this.translateY - 100}px)`;
        this.content.style.transition = 'all 2s';
      }
      if (speed[1] === 'middle') {
        console.log('middle');
        this.content.style.transform = isPullDown ? `translateY(${this.translateY + 300}px)`
          : `translateY(${this.translateY - 300}px)`;
        this.content.style.transition = 'all 2s';
      }
      if (speed[1] === 'fast') {
        console.log('fast');
        this.content.style.transform = isPullDown ? `translateY(${this.translateY + 500}px)`
          : `translateY(${this.translateY - 500}px)`;
        this.content.style.transition = 'all 2s';
      }
      this.refresh();
    },
    refresh() {
      // console.log(this.content.style.transform);
      this.translateY = +this.content.style.transform.match(/-?\d+/)[0];
    },
  },

  watch: {

  },
};
</script>

<style lang="scss" scoped>

@import '@/assets/css/mixin.scss';

.detail {
  width: 100%;
  .wrapper {
    position: absolute;
    width: 100%;
    // height: calc(100vh - 1rem);
    height: 100vh;
    overflow: hidden;
    .content {
      width: 100%;
      // -webkit-overflow-scrolling: touch;
      .pullup-wrapper {
        width: 100%;
        height: 1rem;
        text-align: center;
        line-height: 1rem;
        background-color: #ccc;
        .up-arrow {
          width: .6rem;
          height: .6rem;
        }
      }
      .content-item {
        margin-top: .6rem;
        padding: 0 .3rem;
        .title-light {
          line-height: .8rem;
          color: #ccc;
          font-size: .3rem;
        }
      }
      .pullup-wrapper {
        height: 1rem;
        text-align: center;
        background-color: #ccc;
        .pullup-txt {
          line-height: 1rem;
        }
      }
    }
  }
}
</style>
