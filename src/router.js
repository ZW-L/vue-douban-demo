import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home/Home.vue';
import TopList from './views/TopList/TopList.vue';
import Detail from './views/Detail/Detail.vue';
import CategoryPage from './views/Home/views/Page.vue';
import ErrorView from './views/Error.vue';


Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      name: 'home',
      path: '/home',
      meta: { index: 0 },
      component: Home,
      children: [
        {
          path: '/home/:page',
          name: 'page',
          component: CategoryPage,
        },
      ],
    },
    {
      name: 'toplist',
      path: '/toplist/:category',
      meta: { index: 1 },
      component: TopList,
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
    {
      name: 'detail',
      path: '/detail/:id',
      meta: { index: 2 },
      component: Detail,
    },
    {
      name: 'error',
      path: '/error',
      meta: { index: 3 },
      component: ErrorView,
    },
  ],
});
