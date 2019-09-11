<template>
  <div class="ranking-list">
    <div class="title">电影排行</div>
    <router-link to="/toplist/week" class="list" ref="topWeek">
      <div class="list-left">
        <div class="item-up">豆瓣周榜</div>
        <div class="item-down">口碑电影</div>
      </div>
      <div class="list-right">
        <div class="item" v-for="(item, index) in topListWeekShort" :key="index">
          <span class="item-title">{{index+1}}. {{item.title}}</span>
          <span class="item-rate">{{item.rate}}</span>
        </div>
      </div>
    </router-link>
    <router-link to="/toplist/250" class="list" ref="top250">
      <div class="list-left">
        <div class="item-up">TOP250</div>
        <div class="item-down">豆瓣电影</div>
      </div>
      <div class="list-right">
        <div class="item" v-for="(item, index) in topList250Short" :key="index">
          <span class="item-title">{{index+1}}. {{item.title}}</span>
          <span class="item-rate">{{item.rate}}</span>
        </div>
      </div>
    </router-link>
    <router-link to="/toplist/new" class="list" ref="topNew">
      <div class="list-left">
        <div class="item-up">豆瓣周榜</div>
        <div class="item-down">热门电影</div>
      </div>
      <div class="list-right">
        <div class="item" v-for="(item, index) in topListNewShort" :key="index">
          <span class="item-title">{{index+1}}. {{item.title}}</span>
          <span class="item-rate">{{item.rate}}</span>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {

  name: 'ranking-list',

  computed: {
    rankingList() {
      return this.$store.getters.rankingList;
    },
    topListWeekShort() {
      return this.rankingList.topListWeek.list.slice(0, 3);
    },
    topList250Short() {
      return this.rankingList.topList250.list.slice(0, 3);
    },
    topListNewShort() {
      return this.rankingList.topListNew.list.slice(0, 3);
    },
  },

  mounted() {
    // const { topWeek, top250, topNew } = this.$refs;
    // topWeek.style.backgound = `url(${this.topListWeekShort[0].pic})`;
  },

}
</script>

<style lang="scss" scoped>

@import '@/assets/css/mixin.scss';

.ranking-list {
  margin-top: .5rem;
  padding: .2rem;
  .title {
    @include home-title;
  }
  .list {
    display: flex;
    margin-top: .2rem;
    width: 100%;
    height: 2rem;
    border-radius: .1rem;
    overflow: hidden;
    .list-left {
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      padding: .5rem .2rem;
      width: 2rem;
      text-align: center;
      background-color: rgba(0, 0, 0, .6);
      .item-up {
        font-size: .28rem;
        color: #ccc;
      }
      .item-down {
        font-size: .32rem;
        color: #fff;
      }
    }
    .list-right {
      box-sizing: border-box;
      width: calc(100% - 2rem);
      display: flex;
      padding: .3rem .2rem;
      flex-direction: column;
      justify-content: space-around;
      background-color: rgba(0, 0, 0, .3);
      .item {
        display: flex;
        color: #fff;
        .item-title {
          display: inline-block;
          max-width: calc(100% - 1rem);
          @include ellipsis;
        }
        .item-rate {
          margin-left: .1rem;
          font-size: .25rem;
          color: rgb(255, 172, 45);
        }
      }
    }
  }
}
</style>