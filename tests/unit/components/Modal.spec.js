import { shallowMount } from '@vue/test-utils';
import Modal from '@/components/Modal.vue';

describe('Modal.vue', () => {
  it('has visible props', () => {
    expect(Modal.props).toEqual({ visible: Boolean })
  })

  it('should notify visiblity change', () => {
  	const wrapper = shallowMount(Modal, {
  		propsData: { visibility: false }
  	});
  	wrapper.vm.$options.watch.visible.call(wrapper.vm, true);
  	expect(wrapper.emitted('opened')).toHaveLength(1);
  })
})