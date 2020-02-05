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
      }
    },

    mixins: [ AddressParser, Storage, ToastController ],

    data() {
      return {
        markerObj: null
      }
    },

    mounted() {
      return new Promise(resolve => {
        const Geocoder = new this.google.maps.Geocoder();
        const Marker = this.google.maps.Marker;

        let address = this.$_AddressParser_parse(this.marker.address);
        let cachedLocation = this.$_Storage_getGeolocation(address);

        if (cachedLocation) {
          this.markerObj = new Marker({
            position: cachedLocation,
            map: this.map,
            icon: this.marker.icon
          });
          resolve();
        }
        else {
          let load = () => {
            Geocoder.geocode({ address }, (results, status) => {
              if (status === 'OVER_QUERY_LIMIT') {
                setTimeout(() => { load() }, 1000);
                return;
              }
              else if (status === 'OK') {
                let location = results[0].geometry.location;
                this.$_Storage_saveGeolocation(address, location);
                this.markerObj = new Marker({
                  position: location,
                  map: this.map,
                  icon: this.marker.icon
                });
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

    beforeDestroy() {
      if (this.markerObj) 
        this.markerObj.setMap(null);
    },

    render() {
      return null;
    }
  };
</script>