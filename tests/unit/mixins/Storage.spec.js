import Storage from '@/mixins/Storage.js'

describe('Storage.js', () => {
	it('should have $_Storage_saveHistory method', () => {
		expect(typeof Storage.methods.$_Storage_saveHistory).toBe('function');
	})

	it('should have $_Storage_getHistory method', () => {
		expect(typeof Storage.methods.$_Storage_getHistory).toBe('function');
	})

	it('should have $_Storage_saveGeolocation method', () => {
		expect(typeof Storage.methods.$_Storage_saveGeolocation).toBe('function');
	})

	it('should have $_Storage_getGeolocation method', () => {
		expect(typeof Storage.methods.$_Storage_getGeolocation).toBe('function');
	})

})