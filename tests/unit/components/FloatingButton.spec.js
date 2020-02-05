import { shallowMount } from '@vue/test-utils';
import FloatingButton from '@/components/FloatingButton.vue';

describe('FloatingButton.vue', () => {
	it ('should have icon and theme props', () => {
		expect(FloatingButton.props).toEqual({
      icon: String,
      theme: String
    });
	})

  it('should emit click event onclick', () => {
  	const wrapper = shallowMount(FloatingButton);
  	wrapper.trigger('click');
    expect(wrapper.emitted('click')).toHaveLength(1);
  })
})