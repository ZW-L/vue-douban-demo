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


### 生命周期函数


#### created


#### mounted

+ 可以在这里动态更改 CSS，在 `created` 钩子中不能获取！(原因？)

### vue-router


### vuex




## 第三方库的使用


### express


### webpack


### babel


### axios


### vue-awesome-swiper

使用：
```js

```

注意：
+ pagination 是可以通过指定样式的，也可以在组件中使用样式穿透实现。


### better-scroll

使用：
```js

```

注意：
+ 一定要固定 wrapper 的高度(或宽度)，才会发生滚动；而且只会监听 wrapper 的第一个元素(因此要再包一个 content 块)。
+ `click` 参数是点击穿透的(否则点击都是作用在 wrapper 上)， `probeType` 参数默认为 1 (若要监听 scroll 事件，一定要设置为 2?)。
+ `refresh()` 用于重新计算滚动区域高度，否则滑动会出现问题。

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

### CSS: 按比例放缩图片
&emsp;&emsp;这样使用的优点是，不用知道 wrapper 的宽高，就能在不拉伸图片的前提下放缩图片。
HTML:
```html
<div class="item">
    <div class="wrapper">
      <img :src="item.pic">
    </div>
</div>
```
CSS:
```scss
.item {
  width: 100%;
  .wrapper {
    overflow: hidden;
    width: 100%;
    height: 0;
    padding-bottom: 100%;
    border-radius: .2rem;
    .show {
      width: 100%;
    }
  }
}
```
说明：
+ wrapper 的 `height` 为 0，但它的盒子高度被 `padding-bottom` 撑开了，这时候 `padding-bottom` 的值如果是百分比的话，是相对于 `width` 的值的，也就是说可以将其设置为图片实际"高/宽"的百分比（在组件中还可以动态设置）。
+ `padding-bottom` 不能为 `padding-top`，否则图片直接被 `hidden`。
+ img 的 width 直接设置为 100%。