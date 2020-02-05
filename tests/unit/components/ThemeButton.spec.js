import { shallowMount } from '@vue/test-utils';
import ThemeButton from '@/components/ThemeButton.vue';

describe('ThemeButton.vue', () => {
  it ('should have theme and disabled props', () => {
    expect(ThemeButton.props).toEqual({
      theme: String,
      disabled: Boolean
    });
  })

  it('should emit click event onclick', () => {
  	const wrapper = shallowMount(ThemeButton);
  	wrapper.trigger('click');
    expect(wrapper.emitted('click')).toHaveLength(1);
  })
})