<template>
  <div id="home">
    <UploadMarkersModal 
      v-bind:visible="isUploadModalVisible" 
      v-on:close="onCloseUploadModal" 
      v-on:success="onUploadSuccess"
    />

    <LoadHistoryModal 
      v-bind:visible="isHistoryModalVisible" 
      v-on:close="onCloseHistoryModal" 
      v-on:success="onLoadHistorySuccess"
    />

    <GoogleMap>
      <template slot-scope="{ google, map }">
        <GoogleMapMarker
          v-for="marker in markers"
          v-bind:key="marker.id"
          v-bind:marker="marker"
          v-bind:google="google"
          v-bind:map="map"
        />
      </template>
    </GoogleMap>
    <div class="floating-div">
      <div class="button-wrapper">
        <FloatingButton theme="primary" icon="fas fa-cloud-upload-alt" v-on:click="onClickUploadMarkers">          
          Upload Markers
        </FloatingButton>
      </div>

      <div class="button-wrapper">
        <FloatingButton theme="success" icon="fas fa-history" v-on:click="onClickHistoryModal">          
          Load History
        </FloatingButton>
      </div>

      <div class="button-wrapper">
        <FloatingButton theme="danger" icon="fas fa-sign-out-alt" v-on:click="onLogout">          
          Logout
        </FloatingButton>
      </div>
    </div>
  </div>
</template>

<script>
  import { GOOGLE_MAP_ICON } from '@/constants';
  import { Storage } from '@/mixins';
  import { 
    FloatingButton, 
    GoogleMap, 
    GoogleMapMarker, 
    LoadHistoryModal, 
    UploadMarkersModal } from '@/components';

  export default {
    mixins: [ Storage ],

    components: {
      FloatingButton,
      GoogleMap,
      GoogleMapMarker,
      LoadHistoryModal,
      UploadMarkersModal
    },

    data() {
      return {
        isUploadModalVisible: false,
        isHistoryModalVisible: false,
        markers: []
      }
    },

    methods: {
      onClickUploadMarkers() {
        this.isUploadModalVisible = true;
      },

      onCloseUploadModal() {
        this.isUploadModalVisible = false;
      },

      onUploadSuccess({ fileName, addresses }) {
        let categoryColorMap = addresses.reduce((output, { CATEGORY }, index) => ({ ...output, [CATEGORY]: GOOGLE_MAP_ICON[index % GOOGLE_MAP_ICON.length] }), {});
        this.markers = addresses.map(marker => ({ icon: categoryColorMap[marker.CATEGORY], address: marker, id: JSON.stringify(marker) }));
        this.$_Storage_saveHistory(fileName, this.markers);
      },

      onClickHistoryModal() {
        this.isHistoryModalVisible = true;
      },

      onCloseHistoryModal() {
        this.isHistoryModalVisible = false;
      },

      onLoadHistorySuccess(markers) {
        this.markers = markers;
      },

      onLogout() {
        this.$store.commit('setAuthentication', false);
        this.$router.replace('/login');
      }
    }
  }
</script>

<style lang="scss">
  @import "@/assets/theme.scss";

  #home {
    width: 100vw;
    height: 100vh;

    .floating-div {
      position: fixed;
      bottom: 25px;
      left: 50%;
      padding: 6px;
      background: rgba($white, 0.5);
      z-index: 1;
      transform: translateX(-50%);
      display: flex;
      border-radius: 10px;
      width: 100%;
      max-width: 300px;
      box-shadow: 0 10px 15px -10px rgba(0,0,0,.05);

      .button-wrapper {
        flex-grow: 1;
        flex-basis: 0;
      }
    }
  }
</style>
