<template>
  <transition name="modal">
    <div class="modal-mask" v-if="visible">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <div class="modal-header-content" v-if="$slots.header">
              <slot name="header"></slot>
            </div>
            <div class="modal-header-icon">
              <i class="fas fa-times" v-on:click="onClose"></i>
            </div>
          </div>
          <div class="modal-body">
            <slot></slot>
          </div>
          <div class="modal-footer" v-if="$slots.footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    props: {
      visible: Boolean
    },

    watch: {
      visible(newVal, oldVal) {
        if (newVal && !oldVal) {
          this.$emit('opened');
        }
        else if (!newVal && oldVal) {
          this.$emit('closed');
        }
      }
    },

    methods: {
      onClose() {
        this.$emit('close');
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/theme.scss";

  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity .3s ease;
  }

  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  .modal-container {
    display: flex;
    flex-direction: column;
    max-width: 90vw;
    width: 800px;
    margin: 0px auto;
    background-color: $white;
    box-shadow: 0 4px 25px 0 rgba(0,0,0,.1);
    transition: all .3s ease;
    font-family: Helvetica, Arial, sans-serif;
    max-height: 100vh;

    .modal-header {
      flex: 0 0 auto;
      display: flex;
      padding: 10px;
      box-shadow: 0 10px 15px -10px rgba(0,0,0,.05);

      .modal-header-content {
        margin-right: auto;
      }

      .modal-header-icon {
        margin-left: auto;
        cursor: pointer;

        &:not(:hover) {
          opacity: 0.3;
        }
      }
    }

    .modal-body {
      flex: 1 1 auto;
      padding: 10px;
      overflow: auto;
    }

    .modal-footer {
      border-top: 1px solid $gray-400;
      flex: 0 0 auto;
      padding: 10px;
    }
  }

  .modal-enter,
  .modal-leave-active {
    opacity: 0;
  }

  .modal-enter .modal-container,
  .modal-leave-active .modal-container {
    transform: scale(1.1);
  }
</style>