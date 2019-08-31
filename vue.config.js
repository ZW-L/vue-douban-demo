const express = require('express');
const movieHotNow = require('./public/mock/list/movie_hot_now.json');

const app = express();
const subject = movieHotNow.subjects;

const apiRoutes = express.Router();
app.use('/api', apiRoutes);

module.exports = {
  // baseUrl: '/',
  // outputDir: 'dist',
  devServer: {
    before: function(app) {
      app.get('/api/movie_hot_now', function(req, res) {
        res.json({ code:0, data: subject });
      });
    },
  },
};
