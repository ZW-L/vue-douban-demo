<template>
  <div class="content">
    <div class="wrapper">
      <img :src="item.cover">
    </div>
    <div class="name">
      <span>{{item.title}}</span>
    </div>
    <div class="rate">
      <span class="rating-stars" ref="stars"></span>
      <span class="rating-num">{{item.rate}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'movie-card',
  props: {
    item: Object,
  },
  data() {
    return {
      src: 'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2566158271.jpg',
    }
  },
  mounted() {
    // console.log(this.cover)
    const el = this.$refs.stars;
    const position_y = (Math.ceil(this.item.rate) + 1) * 10;
    el.style.backgroundPosition = `0 ${position_y}px`;
  }
}
</script>


<style lang="scss" scoped>
.content {
  display: flex;
  .wrapper {
    width: 100%;
    img {
      width: 100%;
      border-radius: .1rem;
    }
  }
  .name {
    width: 100%;
    height: .4rem;
    line-height: .4rem;
    font-size: .25rem;
    font-weight: bold;
  }
  .rate {
    width: 100%;
    height: .4rem;
    line-height: .4rem;
    font-size: .25rem;
    .rating-stars {
      display: inline-block;
      width: 1rem;
      height: .2rem;
      background: url('../../public/img/icons/stars.png');
      // background-position: 0 80px;
      background-size: cover;
    }
    .rating-num {
      margin-left: .1rem;
    }
  }
}
</style>