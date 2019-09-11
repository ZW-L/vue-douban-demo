<template>
  <div class="item">
    <div class="item-user">
      <img class="item-user-pic" :src="avatar">
      <span class="item-username">{{user}}</span>
      <rating-stars :size="'small'" :rate="rate" class="item-stars">
        <span class="item-date">{{date}}</span>
      </rating-stars>
    </div>
    <div class="item-content">
      <div v-if="showShort">
        {{shortText}}
        <span v-show="showShort" class="show-btn" @click="showAll=!showAll">展开</span>
      </div>
      <div v-else>
        {{content}}
      </div>
    </div>
  </div>
</template>

<script>
import RatingStars from '@/components/RatingStars.vue';

export default {
  name: 'detail-comment-item',

  components: {
    RatingStars,
  },

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

  data() {
    return {
      showAll: false,
    }
  },

  computed: {
    showShort() {
      return !this.showAll && this.content.length > 80;
    },
    shortText() {
      let text = this.content.slice(0, 80);
      return `${text}...`;
    },
  },
};
</script>

<style lang="scss" scoped>

.item {
  padding: .2rem 0;
  .item-user {
    display: flex;
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
    .item-stars {
      margin-left: .2rem;
    }
  }
  .item-content {
    margin-left: .7rem;
    line-height: .4rem;
    font-size: .26rem;
    .show-btn {
      color: blue;
    }
  }
}
</style>
