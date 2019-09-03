<template>
  <div class="category">
    <div class="wrapper hot-cinema">
      <div class="title">
        <span class="title-left">{{categoryInfo.title}}</span>
        <span class="title-right" v-if="categoryInfo.subCategory">{{categoryInfo.subCategory}}</span>
      </div>
      <div class="content">
        <div class="item" v-for="item of listPart6" :key="item.id">
          <movie-card :item="item" :type="categoryInfo.type"></movie-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MovieCard from './MovieCard'
import { getList } from '../api/get'

export default {

  components:{
    MovieCard
  },

  props:{
    categoryInfo: {
      type: Object,
      default: {}
    }
  },

  computed: {
    list() {
      return this.categoryInfo.list;
    },
    listPart6() {
      return this.list.slice(0, 6);
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  margin-top: 1rem;
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
    }
  }
}
</style>