<template>
  <div class="item">
    <div class="wrapper">
      <img class="pic" :src="avatar">
    </div>
    <slot name="title"></slot>
    <slot></slot>
  </div>
</template>

<script>
 export default {
   name: 'linear-swiper-item',

   props: {
     avatar: {
       type: String,
       default: '',
     }
   },

 }
</script>

<style lang="scss" scoped>
.item {
  .wrapper {
    .pic {
      width: 100%;
      border-radius: .2rem;
    }
  }
}
</style>