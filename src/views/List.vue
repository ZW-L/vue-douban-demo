<template>
  <div class="list">
    <div class="header">List View</div>
    <div class="content">
      <div class="item" v-for="item in list" :key="item.id">
        <movie-card :item="item"></movie-card>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import MovieCard from '../components/MovieCard';

export default {
  props: {},

  data(){
    return {
      list: {}
    }
  },

  created() {
    this.handleGetList()
  },

  methods: {
    handleGetList() {
      axios.get('http://localhost:8080/api/movie_hot_now')
        .then(res => {
          this.list = res.data.data;
          // console.log(this.list);
        })
        .catch(err => {
          console.log(err);
        })
    }
  },

  components: {
    MovieCard
  },
}
</script>

<style lang="scss" scoped>
.list {
  .header {
    height: 1rem;
    font-size: .7rem;
    line-height: 1rem;
    text-align: center;
    color: rgb(89, 126, 190);
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
</style>