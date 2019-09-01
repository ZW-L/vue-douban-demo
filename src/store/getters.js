export const hotAndNew = state => state.hotAndNew;

export const rankingList = state => state.rankingList;

export const categoriesTwo = state => ({
  movies: state.categories.movies[0],
  tvs: state.categories.tvs[0],
});

export const categoriesMovies = state => state.categories.movies;

export const categoriesTvs = state => state.categories.tvs;
