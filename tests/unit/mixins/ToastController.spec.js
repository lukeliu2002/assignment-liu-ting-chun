import ToastController from '@/mixins/ToastController.js'

describe('ToastController.js', () => {
	it('should have $_ToastController_danger method', () => {
		expect(typeof ToastController.methods.$_ToastController_danger).toBe('function');
	})
})