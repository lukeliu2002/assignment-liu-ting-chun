import APIController from '@/mixins/APIController.js'

describe('APIController.js', () => {
	it('should have _post method', () => {
		expect(typeof APIController.methods._post).toBe('function');
	})

	it('should have $_APIController_login method', () => {
		expect(typeof APIController.methods.$_APIController_login).toBe('function');
	})
})