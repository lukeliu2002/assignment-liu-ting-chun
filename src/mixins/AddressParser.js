export default {
	methods: {
    $_AddressParser_parse({ ADDRESS, CITY, STATE, ZIPCODE }) {
      return `${ADDRESS}, ${CITY}, ${STATE}, ${ZIPCODE}`;
		}
	}
}