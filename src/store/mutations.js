import * as types from './mutation_type';

export default {
  [types.GET_CINEMA_HOT](state, list) {
    state.hotAndNew.cinemaHot.list = list;
  },
};
