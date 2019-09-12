<template>
  <div class="home">
    <base-header>豆瓣电影</base-header>
    <div>
      <category-title>
        <span @click="handleGetList()">影院热映</span>
        <span @click="handleGetList()">即将上映</span>
      </category-title>
      <movie-category :categoryInfo="hotCategoryInfo"></movie-category>
    </div>
    <ranking-list></ranking-list>
    <div>
      <category-title>
        <span v-for="(title, i) of movieTitles" :key="i" @click="handleGetList(i, 'movie')">
          {{title}}
        </span>
      </category-title>
      <movie-category :categoryInfo="movieCategoryInfo"></movie-category>
    </div>
    <div>
      <category-title>
        <span v-for="(title, i) of tvTitles" :key="i" @click="handleGetList(i, 'tv')">
          {{title}}
        </span>
      </category-title>
      <movie-category :categoryInfo="tvCategoryInfo"></movie-category>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters } from 'vuex';
import BaseHeader from '@/components/BaseHeader.vue';
import CategoryTitle from '@/components/CategoryTitle.vue';
import MovieCategory from '@/components/MovieCategory.vue';
import RankingList from './components/RankingList.vue';
import { getList } from '@/api/get';

export default {
  name: 'home',

  components: {
    MovieCategory,
    RankingList,
    BaseHeader,
    CategoryTitle,
  },

  data() {
    return {
      movieIndex: 0,
      tvIndex: 0,
    };
  },

  computed: {
    ...mapGetters([
      'hotAndNew',
      'rankingList',
      'categoriesMovies',
      'categoriesTvs',
      'movieListNames',
      'tvListNames',
    ]),
    cinemaHot() {
      return this.hotAndNew.cinemaHot;
    },
    movieTitles() {
      return this.categoriesMovies.map(v => v.title);
    },
    tvTitles() {
      return this.categoriesTvs.map(v => v.title);
    },
    hotCategoryInfo() {
      return this.cinemaHot;
    },
    movieCategoryInfo() {
      return this.categoriesMovies[this.movieIndex];
    },
    tvCategoryInfo() {
      return this.categoriesTvs[this.tvIndex];
    }
  },

  created() {
    // 影院热映
    getList(this.cinemaHot.listName)
      .then(res => {
        this.$store.commit('MOVIE_CINEMA_HOT', res.data.subjects);
      });
    // 电影排行
    getList(this.rankingList.topListWeek.listName)
      .then(res => {
        this.$store.commit('TOP_LIST_WEEK', res.data.subjects);
      });
    getList(this.rankingList.topList250.listName)
      .then(res => {
        this.$store.commit('TOP_LIST_250', res.data.subjects);
      });
    getList(this.rankingList.topListNew.listName)
      .then(res => {
        this.$store.commit('TOP_LIST_NEW', res.data.subjects);
      });
    // 热门电影
    getList(this.categoriesMovies[0].listName)
      .then(res => {
        this.$store.commit('MOVIE_CATEGORIES_HOT', res.data.subjects);
      });
    // 热门电视剧
    getList(this.categoriesTvs[0].listName)
      .then(res => {
        this.$store.commit('TV_CATEGORIES_HOT', res.data.subjects);
      });
  },

  methods: {
    handleGetList(index, type) {
      if (type === 'movie') {
        const listName = this.movieListNames[index];
        getList(listName)
          .then(res => {
            const mutationType = listName.toUpperCase();
            this.$store.commit(mutationType, res.data.subjects);
            this.movieIndex = index;
          });
      }
      if (type === 'tv') {
        const listName = this.tvListNames[index];
        getList(listName)
          .then(res => {
            const mutationType = listName.toUpperCase();
            this.$store.commit(mutationType, res.data.subjects);
            this.tvIndex = index;
          });
      }
    },
  },
};
</script>
