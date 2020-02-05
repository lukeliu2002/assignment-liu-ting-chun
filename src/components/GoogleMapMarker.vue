<script>
  import { AddressParser, Storage, ToastController } from '@/mixins';

  export default {
    props: {
      google: {
        type: Object,
        required: true
      },
      map: {
        type: Object,
        required: true
      },
      marker: {
        type: Object,
        required: true
      },
      centered: Boolean
    },

    mixins: [ AddressParser, Storage, ToastController ],

    data() {
      return {
        markerObj: null
      }
    },

    mounted() {
      return new Promise(resolve => {
        let address = this.$_AddressParser_parse(this.marker.address);
        let cachedLocation = this.$_Storage_getGeolocation(address);

        if (cachedLocation) {
          this.setMarker(cachedLocation);
          resolve();
        }
        else {
          const Geocoder = new this.google.maps.Geocoder();
          let load = () => {
            Geocoder.geocode({ address }, (results, status) => {
              if (status === 'OVER_QUERY_LIMIT') {
                setTimeout(() => { load() }, 1000);
                return;
              }
              else if (status === 'OK') {
                let location = results[0].geometry.location;
                this.$_Storage_saveGeolocation(address, location);
                this.setMarker(location);
              }
              else {
                this.$_ToastController_danger('Failed to identify address: ' + address);
              }

              resolve();
            })
          }

          load();
        }
      })
    },

    methods: {
      setMarker({ lat, lng }) {
        const Marker = this.google.maps.Marker;
        this.markerObj = new Marker({
          position: { lat, lng },
          map: this.map,
          icon: this.marker.icon
        });

        if (this.centered) {
          const LatLng = this.google.maps.LatLng;
          this.map.setCenter(new LatLng(lat, lng));
        }
      }
    },

    beforeDestroy() {
      if (this.markerObj) 
        this.markerObj.setMap(null);
    },

    render() {
      return null;
    }
  };
</script>