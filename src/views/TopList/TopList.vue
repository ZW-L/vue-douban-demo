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
import MovieCard from '@/components/MovieCard';

export default {

  name: 'top-list',

  components: {
    MovieCard
  },

  data() {
    return {
      list: [],
    }
  },

  created() {
    const { category } = this.$route.params;
    if (category == 'week') {
      this.list = this.$store.getters.rankingList.topListWeek.list;
    }
    if (category == '250') {
      this.list = this.$store.getters.rankingList.topList250.list;
    }
    if (category == 'new') {
      this.list = this.$store.getters.rankingList.topListNew.list;
    }
    console.log(this.list);
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