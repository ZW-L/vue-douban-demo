<template>
  <div class="list">
    <div class="header">List View</div>
    <div class="content">
      <div class="item" v-for="item in cinemaHot.list" :key="item.id">
        <movie-card :item="item" :type="cinemaHot.type"></movie-card>
      </div>
    </div>
  </div>
</template>

<script>
import MovieCard from '../components/MovieCard';

export default {
  components: {
    MovieCard
  },

  created() {
    console.log(this.list);
  },

  computed: {
    cinemaHot() {
      return this.$store.state.hotAndNew.cinemaHot;
    }
  }

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