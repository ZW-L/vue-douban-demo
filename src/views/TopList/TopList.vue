<template>
  <div class="list">
    <base-header :back="true">排行榜</base-header>
    <div class="content">
      <div class="item" v-for="item in list" :key="item.id">
        <movie-card :item="item"></movie-card>
      </div>
    </div>
  </div>
</template>

<script>
import BaseHeader from '@/components/BaseHeader.vue';
import MovieCard from '@/components/MovieCard';

export default {

  name: 'top-list',

  components: {
    MovieCard,
    BaseHeader,
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
  margin-top: 1.2rem;
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