<template>
  <div class="floating-button" v-bind:class="theme" v-on:click="onClick">
    <div v-if="icon" class="rounded-icon">
      <i v-bind:class="icon" />
    </div>
    <div class="description-text">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      icon: String,
      theme: String
    },

    methods: {
      onClick(e) {
        this.$emit('click', e);
      }
    }
  }
</script>

<style lang="scss">
  @import "@/assets/theme.scss";

  .floating-button {
    text-align: center;
    cursor: pointer;

    .rounded-icon {
      position: relative;
      width: 38px;
      height: 38px;
      border-radius: 50%;
      margin: 0 auto 3px;
      color: $white;
      transition: transform 0.5s;
      
      i {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }

    .description-text {
      font-size: 11px;
      line-height: 11px;
      text-align: center;
      margin: 0 auto;
    }

    &:hover .rounded-icon {
      transform: scale(1.1);
    }

    @each $theme, $color in $theme-colors {
      &.#{$theme} .rounded-icon {
        background-image: linear-gradient(30deg, rgba($color, 1), rgba($color, 0.5));
      }
    }
  }
</style>