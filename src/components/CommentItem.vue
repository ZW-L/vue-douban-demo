<template>
  <div class="item">
    <div class="item-user">
      <img class="item-user-pic" :src="avatar">
      <span class="item-username">{{user}}</span>
      <span class="item-rate" ref="stars"></span>
      <span class="item-date">{{date}}</span>
    </div>
    <div class="item-content">
      <span>{{content}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'comment-item',

  props: {
    avatar: String,
    user: String,
    rate: {
      type: String,
      default: '8',
    },
    date: {
      type: String,
      default: '2019-9-1',
    },
    content: String,
  },

  methods: {
    _setStars() {
      const el = this.$refs.stars;
      const position_y = (Math.ceil(this.rate) + 1) * 10;
      el.style.backgroundPosition = `0 ${position_y}px`;
    }
  },

}
</script>

<style lang="scss" scoped>

@import '../assets/css/mixin.scss';

.item {
  padding: .2rem 0;
  .item-user {
    display: flex;
    line-height: .5rem;
    align-items: center;
    .item-user-pic {
      width: .5rem;
      height: .5rem;
      border-radius: 50%;
    }
    .item-username {
      margin-left: .2rem;
      font-size: .3rem;
      font-weight: bold;
    }
    .item-rate {
      margin-left: .2rem;
      width: 1rem;
      height: .2rem;
      line-height: .5rem;
      background: url('../../public/img/icons/stars.png');
      background-size: cover;
    }
    .item-date {
      color: #ccc;
      margin-left: .2rem;
    }
  }
  .item-content {
    margin-left: .7rem;
    line-height: .4rem;
    font-size: .26rem;
    @include multi-ellipsis(3);
  }
}
</style>