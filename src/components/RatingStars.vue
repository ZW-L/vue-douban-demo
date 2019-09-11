<template>
  <div class="rate">
    <div :class="classes" ref="stars"></div>
    <div class="inline-text">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {

  name: 'rating-stars',

  props: {
    size: {
      type: String,
      default: 'middle',
    },
    rate: {
      type: String,
      default: '0',
    }
  },

  computed: {
    classes() {
      return ['stars'].concat(`stars-${this.size}`);
    },
    basePositionY() {
      return this.size === 'large' ? 20 : (this.size === 'middle' ? 15 : 10);
    },
  },

  created() {
    this.$nextTick(() => {
      const { stars } = this.$refs;
      const position_y = (Math.ceil(this.rate) + 1) * this.basePositionY;
      stars.style.backgroundPosition = `0 ${position_y}px`;
    })
  },
}
</script>

<style lang="scss" scoped>

.rate {
  display: flex;
  align-content: center;
  .stars {
    background: url('../../public/img/icons/stars.png');
    background-size: cover;
    @each $size, $value in ('small': 1, 'middle': 2, 'large': 3) {
      &-#{$size} {
        $baseWidth: 1rem;
        $width: $baseWidth + ($value - 1) * 0.5rem;
        width: $width;
        height: $width * 0.2;
      }
    }
  }
  .inline-text {
    margin-left: .1rem;
  }
}

</style>