import Vue from 'vue';
import AddressParser from '@/mixins/AddressParser.js'

describe('AddressParser.js', () => {
	it ('should have $_AddressParser_parse method', () => {
		expect(typeof AddressParser.methods.$_AddressParser_parse).toBe('function');
	})

	it ('should be able to parse address', () => {
		const vm = new Vue(AddressParser);
		expect(vm.$_AddressParser_parse({
			ADDRESS: 'ADDRESS', 
			CITY: 'CITY', 
			STATE: 'STATE', 
			ZIPCODE: 'ZIPCODE'
		})).toEqual('ADDRESS, CITY, STATE, ZIPCODE');
	})
})