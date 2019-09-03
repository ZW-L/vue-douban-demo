## 项目目录

```
|- project/
  |- node_modules/
  |- public/
    |- img/
      |- icons/
      |- movies/
      |- tvs/
      |- movie_default_medium.png
    |- mock/    // Mock 服务的数据
      |- list/    // 电影 json 文件
    |- index.html
    |- manifest.json
    |- robots.txt
  |- src/
    |- api/    // 封装请求模块
    |- assets/  // 静态资源
      |- css/   // 格式化 css、Scss 变量/混合...
    |- components/    // 组件封装
    |- store/   // vuex
      |- index.js
      |- state.js
      |- getters.js
      |- mutations.js
      |- mutations_type.js
      |- actions.js
    |- views/   // 路由视图组件
      |- Home.vue
      |- List.vue
      |- Detail.vue
    |- App.vue    // app 根组件
    |- main.js
    |- registerServiceWorker.js
    |- router.js    // 路由配置
  |- tests/   
    |- unit/    // 单元测试
  |- .browserslisttrc
  |- .editorconfig    // 编辑器规定
  |- .eslintrc.js   // ESLint 配置
  |- .gitignore
  |- .babel.config.js   // Babel 配置
  |- package.json
  |- package-lock.json
  |- postcss.config.js    // PostCSS 配置
  |- vue.config.js    // Webpack 配置
  |- README.md
```

## vue 的使用

### vue-router


### vuex



## 第三方库的使用

### express


### webpack


### babel


### axios


### vue-awesome-swiper


### ESLint





## 问题及解决

### 模拟请求本地 json 数据
&emsp;&emsp;在 `vue.config.js` 中配置：
```js
// 引入 express，需要先安装 express
const express = require('express');
// 引入相关 json 文件
const movieHotNow = require('./public/mock/list/movie_hot_now.json');
const movieComingSoon = require('./public/mock/list/movie_coming_soon.json');
// 创建 express 服务器
const app = express();
// 使用路由中间件
const apiRoutes = express.Router();
app.use('/api', apiRoutes);

/* eslint-disable */
module.exports = {
  // 配置开发服务器
  devServer: {
    before: function (app) {
      app.get('/api/movie_hot_now', function (req, res) {
        // 返回 json 数据，用 axios 获取时是 response.data.data
        res.json({ code:0, data: movieHotNow.subjects });
      });
      app.get('/api/movie_coming_soon', function (req, res) {
        res.json({ code:0, data: movieComingSoon.subjects });
      });
    },
  },
};
```

### 访问本地图片
&emsp;&emsp;使用 `require(img_path)` 的方式，但是 `img_path` 不能是一个纯变量引用！应该使用一个路径前缀，再配合图片变量名的方式。

```html
<!-- MovieCard.vue -->
<img :src="require(`../../public/img/${type}/${picName}`)">
```

### CSS: 设置评分星星样式
使用：
+ `background` 设置图片背景
+ `background-size` 设置图片超出尺寸的显示方式
```css
.rating-stars {
  background: url('../../public/img/icons/stars.png');
  background-size: cover;
}
```
+ 动态的 `background-position` 设置图片偏移
```js
/* 背景图片位于 "public/img/icons/stars.png"，共有 11 种评分模式，每层高度为 10px
  以图片左下角为原点，向右为 +x，向上为 +y，通过评分判断 y 偏移量，设置为元素的 backgroundPosition
*/
const el = this.$refs.stars;  // 获取 DOM 元素
const position_y = (Math.ceil(this.item.rate) + 1) * 10;  // 纵轴偏移
el.style.backgroundPosition = `0 ${position_y}px`;  // 设置偏移
```
