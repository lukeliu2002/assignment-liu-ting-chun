import GoogleMapMarker from '@/components/GoogleMapMarker.vue';

describe('GoogleMapMarker.vue', () => {
	it ('should have google, map and marker props', () => {
		expect(GoogleMapMarker.props).toEqual({
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
    });
	})
})