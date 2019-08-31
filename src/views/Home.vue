<template>
  <div class="home">
    <div class="header">Home View</div>
    <div class="wrapper hot-cinema">
      <div class="title">
        <span class="title-left">影院热映</span>
        <span class="title-right">即将上映</span>
        <span class="title-more">
          <router-link to="/list">更多</router-link>
        </span>
      </div>
      <div class="content">
        <div class="item" v-for="item of short_list" :key="item.id">
          <movie-card :item="item"></movie-card>
        </div>
      </div>
    </div>
    <div class="wrapper hot-douban">
      <div class="title">
        <span class="title-left">豆瓣热门</span>
        <span class="title-more">
          <router-link to="/list">更多</router-link>
        </span>
      </div>
    </div>
    <div class="wrapper rank">
      <div class="title">
        <span class="title-left">影片排行</span>
        <span class="title-more">
          <router-link to="/list">更多</router-link>
        </span>
      </div>
    </div>
    <div class="wrapper hot-movie">
      <div class="title">
        <span class="title-left">热门电影</span>
        <span class="title-more">
          <router-link to="/list">更多</router-link>
        </span>
      </div>
    </div>
    <div class="wrapper hot-tv">
      <div class="title">
        <span class="title-left">热门电视</span>
        <span class="title-more">
          <router-link to="/list">更多</router-link>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
import MovieCard from '../components/MovieCard';

export default {
  name: 'home',
  data() {
    return {
      list: [],
      short_list: [],
    }
  },
  mounted() {
    this.handleGetList();
  },
  methods: {
    handleGetList() {
      axios.get('http://localhost:8080/api/movie_hot_now')
        .then(res => {
          this.list = res.data.data;
          this.short_list = this.list.slice(0, 6);
          // console.log(this.short_list);
        })
        .catch(err => {
          console.log(err);
        })
    },
  },
  components: {
    MovieCard,
  }
}
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  // background-color: #ccc;
  .header {
    height: 1rem;
    font-size: .7rem;
    line-height: 1rem;
    text-align: center;
    color: rgb(89, 126, 190);
  }
  // background-color: #ccc;
  .wrapper {
    width: 100%;
    // height: 400px;
    // border: 1px solid #ccc;
    margin-top: 1rem;
    // background-color: #ccc;
    .title {
      height: 40px;
      line-height: 40px;
      font-size: 20px;
      .title-left {
        display: inline-block;
        margin-left: .2rem;
      }
      .title-right {
        display: inline-block;
        margin-left: .2rem;
        color: #aaa;
      }
      .title-more {
        // float: right;
        position: absolute;
        right: .2rem;
        font-size: 15px;
        a {
          color: blue;
          text-decoration: none;
        }
      }
    }
    .content {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      .item {
        width: 28vw;
        // height: 150px;
        margin: .1rem;
        // background-color: #ccc;
      }
    }
  }
}
</style>
