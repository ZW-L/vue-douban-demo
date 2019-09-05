<template>
  <div class="desc">
    <div v-if="showShort" class="desc-content">
      {{shortText}}
      <span class="show-btn" v-show="showShort" @click="showAll=!showAll">展开</span>
    </div>
    <div v-else class="desc-content">
      {{desc}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'detail-content-desc',

  props: {
    desc: String,
  },

  data() {
    return {
      showAll: false,
    }
  },

  computed: {
    showShort() {
      return !this.showAll && this.desc.length > 80;
    },
    shortText() {
      let text = this.desc.slice(0, 120);
      return `${text}...`;
    }
  },

};
</script>

<style lang="scss" scoped>

@import '@/assets/css/mixin.scss';

.desc {
  .desc-content {
    position: relative;
    text-indent: 2em;
    line-height: .4rem;
  }
  .show-btn {
    color: blue;
  }
}
</style>
