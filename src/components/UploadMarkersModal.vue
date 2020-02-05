<template>
  <Modal class="upload-markers-modal" 
    v-bind:visible="visible" 
    v-on:opened="onOpened"
    v-on:close="onClose"
  >
    <template slot="header">
      Upload Markers
    </template>

    <template v-if="currentPage === 'PAGE_UPLOAD'">
      <div>If you want to create markers on the map, you may upload a CSV with five columns of up to 20 rows of address information.</div>
      <input type="file" accept=".csv" v-on:change="onFileChange" />
    </template>

    <template v-if="currentPage === 'PAGE_PREVIEW'">
      <table>
        <thead>
          <tr>
            <th v-for="(model, i) of header" v-bind:key="i">
              <select v-model="header[i]">
                <option v-for="option of headerOptions" v-bind:key="option">{{option}}</option>
              </select>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, i) of addressData" v-bind:key="i">
            <td v-for="(text, j) of row" v-bind:key="j">
              {{text}}
            </td>
          </tr>
        </tbody>
      </table>

      <template slot="footer">
        <div class="footer">
          <ThemeButton theme="success" v-on:click="onSubmit" v-bind:disabled="!canProceed">Confirm</ThemeButton>
        </div>
      </template>
    </template>
  </Modal>
</template>

<script>
  import { ADDRESS_COLUMNS } from '@/constants';
  import { CSVParser, ToastController } from '@/mixins';
  import Modal from '@/components/Modal';
  import ThemeButton from '@/components/ThemeButton';

  export default {
    mixins: [ CSVParser, ToastController ],

    props: {
      visible: Boolean
    },

    components: { Modal, ThemeButton },

    data() {
      return {
        fileName: null,
        header: [],
        addressData: []
      }
    },

    computed: {
      currentPage() {
        if (!this.addressData.length) {
          return 'PAGE_UPLOAD';
        }
        else {
          return 'PAGE_PREVIEW';
        }
      },

      headerOptions() {
        return ADDRESS_COLUMNS;
      },

      canProceed() {
        return ADDRESS_COLUMNS.every(column => this.header.includes(column));
      }
    },

    methods: {
      onOpened() {
        this.fileName = null;
        this.header = [];
        this.addressData = [];
      },

      onClose() {
        this.$emit('close');
      },

      onFileChange($event) {
        let file = $event.target.files[0];
        if (file) {
          let reader = new FileReader();
          reader.onload = (evt) => {
            this.fileName = file.name;
            this.parseData(evt.target.result);
          }
          reader.onerror = (evt) => {
            this.$_ToastController_danger('Failed to read file, reason: ' + evt);
          }
          reader.readAsText(file, "UTF-8");
        }
      },

      parseData(data) {
        let parsedData = this.$_CSVParser_parse(data);

        if (!parsedData.length) {
          this.$_ToastController_danger('Failed to read file, reason: empty file');
          this.errorMessage = '';
        }
        else if (parsedData.some(row => row.length !== ADDRESS_COLUMNS.length)) {
          this.$_ToastController_danger('Failed to read file, reason: invalid data format');
        }
        else {
          this.addressData = parsedData;
          this.header = [ ...this.headerOptions ];
        }
      },

      onSubmit() {
        this.$emit('success', { 
          fileName: this.fileName,
          addresses: this.addressData.map(row => row.reduce((obj, item, index) => ({ ...obj, [this.header[index]]: item }), {}))
        })
        this.onClose();
      }
    }
  }
</script>

<style lang="scss">
  @import "@/assets/theme.scss";

  .upload-markers-modal {
    input[type='file'] {
      margin: 10px 0;
    }

    .text-error {
      color: map-get($theme-colors, danger);
    }

    table {
      width: 100%;
      text-align: center;
      border: 1px solid $gray-300;
      border-collapse: collapse;

      tr {
        td {
          width: 20%;
          border: 1px solid $gray-300;
          padding: 5px;
        }

        th {
          border: 1px solid $gray-300;

          select {
            width: 100%;
            height: 100%;
            padding: 5px;
          }
        }
      }
    }

    .footer {
      text-align: right;
    }
  }
</style>