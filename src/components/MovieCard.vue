<template>
  <div class="content" @click="toDetailView(item.id)">
    <div class="wrapper">
      <img :src="src">
    </div>
    <div class="name">
      <span>{{item.title}}</span>
    </div>
    <div class="rate">
      <rating-stars v-if="isRated" :size="'small'" :rate="item.rate">
        <span class="rating-num">{{item.rate}}</span>
      </rating-stars>
      <div v-else>
        <span class="rating-num">{{item.rate}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import RatingStars from './RatingStars.vue';
import { getDetail } from '@/api/get';

export default {

  name: 'movie-card',

  components: {
    RatingStars,
  },

  props: {
    item: Object,
    type: {
      type: String,
      default: 'movies',
    },
  },

  data() {
    return {
      picName: 'movie_default_medium.png',
    }
  },

  computed: {
    src() {
      return require(`../../public/img/${this.type}/${this.picName}`);
    },
    isRated() {
      return !isNaN(parseFloat(this.item.rate));
    },
  },

  methods: {
    _initStyle() {
      this.picName = this.item.cover.match(/([^/]+\.(jpg|png))/)[0];
    },
    toDetailView(id) {
      this.$router.push({ path: `/detail/${id}`});
    }
  },

  mounted() {
    this._initStyle();
  }
}
</script>

<style lang="scss" scoped>

@import '@/assets/css/mixin.scss';

.content {
  position: relative;
  display: flex;
  flex-direction: column;
  margin-top: .1rem;
  margin-bottom: .2rem;
  .wrapper {
    overflow: hidden;
    width: 100%;
    height: 0;
    padding-bottom: 140%;
    text-align: center;
    border-radius: .1rem;
    img {
      width: 100%;
    }
  }
  .name {
    width: 100%;
    height: .4rem;
    line-height: .4rem;
    font-size: .25rem;
    font-weight: bold;
    @include ellipsis;
  }
  .rate {
    width: 100%;
    height: .4rem;
    font-size: .25rem;
  }
}
</style>