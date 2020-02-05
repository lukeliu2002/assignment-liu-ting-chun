<template>
  <button class="theme-button" 
    v-bind:class="theme" 
    v-bind:disabled="disabled"
    v-on:click="onClick">
    <slot></slot>
  </button>
</template>

<script>
  export default {
    props: {
      theme: String,
      disabled: Boolean
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

  .theme-button {
    display: inline-block;
    font-weight: 400;
    color: $white;
    text-align: center;
    vertical-align: middle;
    user-select: none;
    background-color: transparent;
    border: 1px solid transparent;
    padding: 6px 12px;
    font-size: 16px;
    line-height: 1.5;
    border-radius: 4px;
    cursor: pointer;

    &:disabled {
      cursor: not-allowed;
    }

    @each $theme, $color in $theme-colors {
      &.#{$theme} {
        &:not(:disabled) {
          background-color: $color;
          border-color: $color;
        }

        &:disabled {
          background-color: rgba($color, 0.5);
          border-color: rgba($color, 0.5);
        }
      }
    }
  }
</style>