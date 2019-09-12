export const hotAndNew = state => state.hotAndNew;

export const rankingList = state => state.rankingList;

export const categoriesHot = state => ({
  movies: state.categories.movies[0],
  tvs: state.categories.tvs[0],
});

export const categoriesMovies = state => state.categories.movies;

export const categoriesTvs = state => state.categories.tvs;

export const movieListNames = state => state.categories.movies.map(v => v.listName);

export const tvListNames = state => state.categories.tvs.map(v => v.listName);

export const homepageListName = state => {
  const listName = [];
  listName.push(state.hotAndNew.cinemaHot.listName);
  listName.push(state.hotAndNew.comingSoon.listName);
  for (let i = 0; i < state.categories.movies.length; i += 1) {
    listName.push(state.categories.movies[i].listName);
  }
  for (let i = 0; i < state.categories.tvs.length; i += 1) {
    listName.push(state.categories.tvs[i].listName);
  }

  return listName;
};
