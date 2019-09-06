<template>
  <div class="home">
    <div class="header">Home View</div>
    <div>
      <movie-category :categoryInfo="cinemaHot" :sign="true"></movie-category>
    </div>
    <div v-for="item of categoriesHot" :key="item.title">
      <movie-category :categoryInfo="item"></movie-category>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import MovieCategory from '@/components/MovieCategory';
import { getList } from '@/api/get';
import { mapGetters } from 'vuex';

export default {
  name: 'home',

  components: {
    MovieCategory
  },

  created() {
    // 影院热映
    getList(this.cinemaHot.listName)
      .then(res => {
        this.$store.commit('MOVIE_CINEMA_HOT', res.data.data);
      })
      .catch(err => console.log(err));
    // 热门电影
    getList(this.categoriesHot.movies.listName)
      .then(res => {
        this.$store.commit('MOVIE_CATEGORIES_HOT', res.data.data);
      })
    // 热门电视剧
    getList(this.categoriesHot.tvs.listName)
      .then(res => {
        this.$store.commit('TV_CATEGORIES_HOT', res.data.data);
      })
  },

  computed: {
    ...mapGetters([
      'hotAndNew',
      'rankingList',
      'categoriesHot',
      'categoriesMovies',
      'categoriesTvs',
    ]),
    cinemaHot() {
      return this.hotAndNew.cinemaHot;
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  .header {
    height: 1rem;
    font-size: .7rem;
    line-height: 1rem;
    text-align: center;
    color: rgb(89, 126, 190);
  }
}
</style>
