<template>
  <div class="title">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'category-title',

  components: {},

  props: {},

  data() {
    return {
    }
  },

}
</script>

<style lang="scss" scoped>

@import '@/assets/css/mixin.scss';

.title {
  display: flex;
  flex-wrap: nowrap;
  @include home-title;
  font-size: .25rem;
  span {
    margin-right: .02rem;
    color: #ccc;
    &:first-child {
      font-size: .4rem;
      color: #000;
    }
  }
}
</style>
