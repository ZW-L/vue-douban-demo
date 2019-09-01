<template>
  <div class="home">
    <div class="header">Home View</div>
    <div>
      <movie-category :categoryInfo="cinemaHot"></movie-category>
    </div>
    <div v-for="item of categoriesTwo" :key="item.title">
      <movie-category :categoryInfo="item"></movie-category>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import MovieCategory from '../components/MovieCategory';
import { getList } from '../api/get';
import { mapGetters } from 'vuex';

export default {
  name: 'home',

  components: {
    MovieCategory
  },

  created() {
    getList(this.hotAndNew.cinemaHot.listName)
      .then(res => {
        this.$store.commit('GET_CINEMA_HOT', res.data.data);
      })
      .catch(err => {
        console.log(err);
      })
  },

  computed: {
    ...mapGetters([
      'hotAndNew',
      'rankingList',
      'categoriesTwo',
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
