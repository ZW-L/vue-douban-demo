<template>
  <div class="title">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'category-title',
  
}
</script>

<style lang="scss" scoped>

@import '@/assets/css/mixin.scss';
@import '@/assets/css/animations.scss';

.title {
  display: flex;
  flex-wrap: nowrap;
  @include home-title;
  font-size: .25rem;
  span {
    margin-right: .08rem;
    color: #ccc;
    animation: text-zoom-out .5s;
  }
  span.active {
    font-size: .4rem;
    color: #000;
    border-bottom: 2px solid rgb(78, 186, 136);
    animation: text-zoom-in .5s;
  }
}
</style>
