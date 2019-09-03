const express = require('express');

const movieHotNow = require('./public/mock/list/movie_cinema_hot.json');
const movieComingSoon = require('./public/mock/list/movie_coming_soon.json');
const topList250 = require('./public/mock/list/top_list_250.json');
const topListWeek = require('./public/mock/list/top_list_week.json');
const topListNew = require('./public/mock/list/top_list_new.json');
const movieCategoriesHot = require('./public/mock/list/movie_categories_hot.json');
const tvCategoriesHot = require('./public/mock/list/tv_categories_hot.json');

const movie26868553 = require('./public/mock/movies/30135113.json');

const app = express();

const apiRoutes = express.Router();
app.use('/api', apiRoutes);

/* eslint-disable */
module.exports = {
  devServer: {
    before: function (app) {
      app.get('/api/movie_cinema_hot', function (req, res) {
        res.json({ code:0, data: movieHotNow.subjects });
      });
      app.get('/api/movie_coming_soon', function (req, res) {
        res.json({ code:0, data: movieComingSoon.subjects });
      });
      app.get('/api/top_list_250', function (req, res) {
        res.json({ code:0, data: topList250.subjects });
      });
      app.get('/api/top_list_week', function (req, res) {
        res.json({ code:0, data: topListWeek.subjects });
      });
      app.get('/api/top_list_new', function (req, res) {
        res.json({ code:0, data: topListNew.subjects });
      });
      app.get('/api/movie_categories_hot', function (req, res) {
        res.json({ code:0, data: movieCategoriesHot.subjects });
      });
      app.get('/api/tv_categories_hot', function (req, res) {
        res.json({ code:0, data: tvCategoriesHot.subjects });
      });
      app.get('/api/movies_detail', function (req, res) {
        res.json({ code: 0, data: movie26868553 });
      })
    },
  },
};
