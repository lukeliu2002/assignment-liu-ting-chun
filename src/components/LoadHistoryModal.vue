<template>
  <Modal class="load-history-modal" 
    v-bind:visible="visible" 
    v-on:opened="onOpened"
    v-on:close="onClose"
  >
    <template slot="header">
      Load History
    </template>

    <HistoryBlock 
      v-for="(record, index) of history" 
      v-bind:key="index" 
      v-bind:index="index + 1"
      v-bind:record="record"
      v-on:click="onLoadHistory(record)" />

  </Modal>
</template>

<script>
  import { Storage } from '@/mixins';
  import HistoryBlock from '@/components/HistoryBlock';
  import Modal from '@/components/Modal';

  export default {
    props: {
      visible: Boolean
    },

    mixins: [ Storage ],

    components: { HistoryBlock, Modal },

    data() {
      return {
        history: []
      }
    },

    methods: {
      onOpened() {
        this.history = this.$_Storage_getHistory();
      },

      onClose() {
        this.$emit('close');
      },

      onLoadHistory(record) {
        this.$emit('success', record.markers);
        this.onClose();
      }
    }
  }
</script>

<style lang="scss">
  .load-history-modal {
    .history-block {
      &:not(:last-of-type) {
        margin-bottom: 10px;
      }
    }
  }
</style>