<template>
  <div>
    <movie-category v-if="categoryInfo" :categoryInfo="categoryInfo"></movie-category>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import MovieCategory from '@/components/MovieCategory.vue';
import { getList } from '@/api/get';

export default {
  name: 'page',

  components: {
    MovieCategory,
  },

  props: {},

  data() {
    return {
      categoryInfo: '',
    }
  },

  computed: {
    ...mapGetters([
      'hotAndNew',
      'rankingList',
      'categoriesHot',
      'categoriesMovies',
      'categoriesTvs',
      'movieListNames',
      'tvListNames'
    ]),
  },

  methods: {
    _updateList(listName) {
      // 即将上映
      getList(listName)
        .then(res => {
          console.log(res.data.data);
          this.$store.commit('MOVIE_COMING_SOON', res.data.data);
        });
    },
    _checkList(listName) {
      // console.log(listName);
      if (this.movieListNames.includes(listName)) {
        console.log('movies');
      }
      if (this.tvListNames.includes(listName)) {
        console.log('tvs');
      }
    },
  },
}
</script>

<style lang="scss" scoped>

</style>