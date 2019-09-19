<template>
  <div class="home">
    <base-header>豆瓣电影</base-header>
    <div class="content-header"></div>
    <div class="wrapper" ref="wrapper">
      <div class="content">
        <div class="item">
          <category-title>
            <span @click="handleGetList(0, 'hotNew')" :class="{ 'active': hotCoverComing }">影院热映</span>
            <span @click="handleGetList(1, 'hotNew')" :class="{ 'active': !hotCoverComing }">即将上映</span>
          </category-title>
          <movie-category :categoryInfo="hotCategoryInfo"></movie-category>
        </div>
        <div class="item item-ranking">
          <ranking-list></ranking-list>
        </div>
        <div class="item item-movie">
          <category-title>
            <span v-for="(title, i) of movieTitles" :key="i" 
              @click="handleGetList(i, 'movie')"
              :class="{ 'active': movieIndex === i }"
            >
              {{title}}
            </span>
          </category-title>
          <movie-category :categoryInfo="movieCategoryInfo"></movie-category>
        </div>
        <div class="item item-tv">
          <category-title>
            <span v-for="(title, i) of tvTitles" :key="i" 
              @click="handleGetList(i, 'tv')"
              :class="{ 'active': tvIndex === i }"
            >
              {{title}}
            </span>
          </category-title>
          <movie-category :categoryInfo="tvCategoryInfo"></movie-category>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters } from 'vuex';
import BScroll from '@better-scroll/core';
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
      hotCoverComing: true,
      movieIndex: 0,
      tvIndex: 0,
    };
  },

  computed: {
    ...mapGetters([
      'hotAndNew',
      'rankingList',
      'categories',
    ]),
    categoriesMovies() {
      return this.categories.movies;
    },
    categoriesTvs() {
      return this.categories.tvs;
    },
    movieListNames() {
      return this.categoriesMovies.map(v => v.listName);
    },
    tvListNames() {
      return this.categoriesTvs.map(v => v.listName);
    },
    movieTitles() {
      return this.categoriesMovies.map(v => v.title);
    },
    tvTitles() {
      return this.categoriesTvs.map(v => v.title);
    },
    hotCategoryInfo() {
      return this.hotCoverComing ? this.hotAndNew.cinemaHot : this.hotAndNew.comingSoon;
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
    if (!this.hotAndNew.cinemaHot.list) {
      getList(this.hotAndNew.cinemaHot.listName)
        .then(res => {
          this.$store.commit('MOVIE_CINEMA_HOT', res.data.subjects);
        });
    }
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
    if (!this.categoriesMovies[0].list) {
      getList(this.categoriesMovies[0].listName)
        .then(res => {
          this.$store.commit('MOVIE_CATEGORIES_HOT', res.data.subjects);
        });
    }
    // 热门电视剧
    if (!this.categoriesTvs[0].list) {
      getList(this.categoriesTvs[0].listName)
        .then(res => {
          this.$store.commit('TV_CATEGORIES_HOT', res.data.subjects);
        });
    }
  },

  mounted() {
    this._initScroll();
  },

  beforeDestroy() {
    this.bs.destroy();
  },

  methods: {
    _initScroll() {
      this.bs = new BScroll(this.$refs.wrapper, {
        scrollY: true,
        click: true,
        probeType: 3,
      })
    },
    handleGetList(index, type) {
      // 影院热映和即将上映的数据请求/切换
      if (type === 'hotNew') {
        if ( index === 0 && !this.hotAndNew.cinemaHot.list) {
          getList(this.hotAndNew.cinemaHot.listName)
            .then(res => {
              this.$store.commit('MOVIE_CINEMA_HOT', res.data.subjects);
            });
        }
        if ( index === 1 && !this.hotAndNew.comingSoon.list) {
          getList(this.hotAndNew.comingSoon.listName)
            .then(res => {
              this.$store.commit('MOVIE_COMING_SOON', res.data.subjects);
            });
        }
        this.hotCoverComing = index === 0;
      }
      // 电影分类的数据请求/切换
      if (type === 'movie') {
        if (!this.categoriesMovies[index].list) {
          const listName = this.movieListNames[index];
          const mutationType = listName.toUpperCase();
          setTimeout(() => {
            console.log('Wait 2000 ms!');
            getList(listName)
              .then(res => {
                this.$store.commit(mutationType, res.data.subjects);
              });
          }, 1000);
        }
        this.movieIndex = index;
      }
      // 电视剧分类的数据请求/切换
      if (type === 'tv') {
        if (!this.categoriesMovies[index].list) {
          const listName = this.tvListNames[index];
          const mutationType = listName.toUpperCase();
          getList(listName)
            .then(res => {
              this.$store.commit(mutationType, res.data.subjects);
            });
        }
        this.tvIndex = index;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  
.home {
  width: 100%;
  .content-header {
    width: 100%;
    height: 1rem;
  }
  .wrapper {
    width: 100%;
    height: calc(100vh - 1rem);
    overflow: hidden;
    .content {
      .item-movie, .item-tv {
        margin-top: 1rem;
      }
    }
  }
}
</style>
