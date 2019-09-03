import * as types from './mutation_type';

export default {
  [types.MOVIE_CINEMA_HOT](state, list) {
    state.hotAndNew.cinemaHot.list = list;
  },
  [types.MOVIE_COMING_SOON](state, list) {
    state.hotAndNew.comingSoon.list = list;
  },
  [types.TOP_LIST_250](state, list) {
    state.rankingList.topList250.list = list;
  },
  [types.TOP_LIST_WEEK](state, list) {
    state.rankingList.topListWeek.list = list;
  },
  [types.TOP_LIST_NEW](state, list) {
    state.rankingList.topListNew.list = list;
  },
  [types.MOVIE_CATEGORIES_HOT](state, list) {
    state.categories.movies[0].list = list;
  },
  [types.MOVIE_CATEGORIES_NEW](state, list) {
    state.categories.movies[1].list = list;
  },
  [types.MOVIE_CATEGORIES_CHINESE](state, list) {
    state.categories.movies[2].list = list;
  },
  [types.MOVIE_CATEGORIES_EUROPE_AND_AMERICA](state, list) {
    state.categories.movies[3].list = list;
  },
  [types.MOVIE_CATEGORIES_KOREA](state, list) {
    state.categories.movies[4].list = list;
  },
  [types.MOVIE_CATEGORIES_JAPANESE](state, list) {
    state.categories.movies[5].list = list;
  },
  [types.MOVIE_CATEGORIES_TOP_SCORE](state, list) {
    state.categories.movies[6].list = list;
  },
  [types.MOVIE_CATEGORIES_LESS_POPULAR_BUT_NICE](state, list) {
    state.categories.movies[7].list = list;
  },
  [types.TV_CATEGORIES_HOT](state, list) {
    state.categories.tvs[0].list = list;
  },
  [types.TV_CATEGORIES_CHINESE](state, list) {
    state.categories.tvs[1].list = list;
  },
  [types.TV_CATEGORIES_VARIETY](state, list) {
    state.categories.tvs[2].list = list;
  },
  [types.TV_CATEGORIES_AMERICA](state, list) {
    state.categories.tvs[3].list = list;
  },
  [types.TV_CATEGORIES_KOREA](state, list) {
    state.categories.tvs[4].list = list;
  },
  [types.TV_CATEGORIES_JAPANESE](state, list) {
    state.categories.tvs[5].list = list;
  },
  [types.TV_CATEGORIES_JAPANESE_CARTOONS](state, list) {
    state.categories.tvs[6].list = list;
  },
  [types.TV_CATEGORIES_DOCUMENTARY](state, list) {
    state.categories.tvs[7].list = list;
  },
};
