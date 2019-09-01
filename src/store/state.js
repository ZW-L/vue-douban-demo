const state = {
  // 首页顶部：影院热映 / 即将上映
  hotAndNew: {
    cinemaHot: {
      title: '影院热映',
      listName: 'movie_hot_now',
      list: '',
      type: 'movies',
    },
    comingSoon: {
      title: '即将上映',
      listName: 'movie_coming_soon',
      list: '',
      type: 'movies',
    },
  },
  // 排行榜：电影TOP250 / 一周口碑榜 / 豆瓣电影排行榜
  rankingList: {
    topList250: {
      title: '电影TOP250',
      listName: 'top_list_250',
      list: '',
      type: 'movies',
    },
    topListWeek: {
      title: '一周口碑榜',
      listName: 'top_list_week',
      list: '',
      type: 'movies',
    },
    topListNew: {
      title: '豆瓣电影排行榜',
      listName: 'top_list_new',
      list: '',
      type: 'movies',
    },
  },
  // 分类
  // 电影：
  // 电视剧：
  categories: {
    movies: [
      {
        title: '电影',
        listName: 'movie_categories_hot',
        list: '',
        type: 'movies',
      },
      {
        title: '最新',
        listName: 'movie_categories_new',
        list: '',
        type: 'movies',
      },
      {
        title: '华语',
        listName: 'movie_categories_chinese',
        list: '',
        type: 'movies',
      },
      {
        title: '欧美',
        listName: 'movie_categories_europe_and_america',
        list: '',
        type: 'movies',
      },
      {
        title: '韩国',
        listName: 'movie_categories_korea',
        list: '',
        type: 'movies',
      },
      {
        title: '日本',
        listName: 'movie_categories_japanese',
        list: '',
        type: 'movies',
      },
      {
        title: '豆瓣高分',
        listName: 'movie_categories_top_score',
        list: '',
        type: 'movies',
      },
      {
        title: '冷门佳片',
        listName: 'movie_categories_less_popular_but_nice',
        list: '',
        type: 'movies',
      },
    ],
    tvs: [
      {
        title: '电视剧',
        listName: 'tv_categories_hot',
        list: '',
        type: 'tvs',
      },
      {
        title: '国产剧',
        listName: 'tv_categories_chinese',
        list: '',
        type: 'tvs',
      },
      {
        title: '综艺',
        listName: 'tv_categories_variety',
        list: '',
        type: 'tvs',
      },
      {
        title: '美剧',
        listName: 'tv_categories_america',
        list: '',
        type: 'tvs',
      },
      {
        title: '韩剧',
        listName: 'tv_categories_korea',
        list: '',
        type: 'tvs',
      },
      {
        title: '日剧',
        listName: 'tv_categories_japanese',
        list: '',
        type: 'tvs',
      },
      {
        title: '日本动画',
        listName: 'tv_categories_japanese_cartoons',
        list: '',
        type: 'tvs',
      },
      {
        title: '纪录片',
        listName: 'tv_categories_documentary',
        list: '',
        type: 'tvs',
      },
    ],
  },
};

export default state;
