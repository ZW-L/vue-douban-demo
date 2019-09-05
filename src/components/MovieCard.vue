<template>
  <div class="content" @click="toDetailView(item.id)">
    <div class="wrapper">
      <img :src="require(`../../public/img/${type}/${picName}`)">
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
import { getDetail } from '@/api/get';

export default {

  name: 'movie-card',

  props: {
    item: Object,
    type: String,
    listName: String,
  },

  data() {
    return {
      picName: 'movie_default_medium.png',
    }
  },

  methods: {
    _initStyle() {
      this.picName = this.item.cover.match(/([^/]+\.(jpg|png))/)[0];
      const el = this.$refs.stars;
      const position_y = (Math.ceil(this.item.rate) + 1) * 10;
      el.style.backgroundPosition = `0 ${position_y}px`;
    },
    toDetailView(id) {
      getDetail(this.listName).then(res => {
        console.log(res.data.data);
        this.$router.push({ path: `/detail/${id}`});
      });
    }
  },

  mounted() {
    this._initStyle();
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
      background-size: cover;
    }
    .rating-num {
      margin-left: .1rem;
    }
  }
}
</style>