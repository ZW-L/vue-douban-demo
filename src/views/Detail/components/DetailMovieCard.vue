<template>
  <div class="card">
    <div class="card-wrapper"  ref="wrapper">
      <div class="card-info">
        <div class="info-pic">
          <img :src="cover" ref="pic">
        </div>
        <div class="info-content">
          <div class="content-title">{{title}}</div>
          <div class="content-desc" v-for="(i, index) of info" :key="index">
            <p class="content-desc-line">{{i}}</p>
          </div>
        </div>
      </div>
      <div class="card-rate">
        <div class="rate-title">
          <span class="title-normal">豆瓣评分</span>
          <span class="title-sup">TM</span>
        </div>
        <div class="rate-content">
          <div class="content-nums">{{rate}}</div>
          <div class="content-stars">
            <div class="stars-pic" ref="stars"></div>
            <div class="rating-nums">(34215人评价)</div>
          </div>
          <div class="rate-btn">去写点评</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getRandomColor } from '@/api/util';

export default {
  name: 'detial-movie-card',

  props: {
    cover: String,
    title: String,
    info: Array,
    rate: String,
  },

  mounted() {
    const wrapper = this.$refs.wrapper;
    wrapper.style.backgroundColor = getRandomColor();
    const stars = this.$refs.stars;
    const position_y = (Math.ceil(this.rate) + 1) * 15;
    stars.style.backgroundPosition = `0 ${position_y}px`;
  },
}
</script>

<style lang="scss" scoped>

@import '@/assets/css/mixin.scss';

.card {
  .card-wrapper {
    padding: 0 .3rem;
    padding-bottom: .4rem;
    background: rgba(0, 0, 0, .3);
    color: #fff;
    .card-info {
      display: flex;
      padding-top: .3rem;
      .info-pic {
        width: 40%;
        & img {
          width: 100%;
          border-radius: .15rem;
        }
      }
      .info-content {
        width: 60%;
        margin-left: .1rem;
        .content-title {
          font-size: .5rem;
        }
        .content-desc {
          margin-top: .1rem;
          font-size: .25rem;
          .content-desc-line {
            line-height: .3rem;
            @include ellipsis();
          }
        }
      }
    }
    .card-rate {
      margin-top: .3rem;
      width: 100%;
      height: 1.8rem;
      border-radius: .2rem;
      background-color: rgba(0, 0, 0, .1);
      .rate-title {
        display: flex;
        height: .8rem;
        margin-left: .3rem;
        .title-normal {
          font-size: .28rem;
          line-height: .8rem;
        }
        .title-sup {
          line-height: .65rem;
          font-size: .15rem;
        }
      }
      .rate-content {
        display: flex;
        height: 1rem;
        // justify-content: space-between;
        .content-nums {
          width: 20%;
          height: 1rem;
          line-height: .8rem;
          margin-left: .3rem;
          font-size: .8rem;
        }
        .content-stars {
          .stars-pic {
            width: 1.5rem;
            height: .3rem;
            line-height: .5rem;
            background: url('../../../../public/img/icons/stars.png');
            background-size: cover;
          }
          .rating-nums {
            margin-top: .15rem;
            font-size: .25rem;
          }
        }
        .rate-btn {
          width: 2rem;
          margin-left: 1rem;
          text-align: right;
        }
      }
    }
  }
}
</style>