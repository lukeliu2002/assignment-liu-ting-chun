import { shallowMount } from '@vue/test-utils';
import HistoryBlock from '@/components/HistoryBlock.vue';

describe('HistoryBlock.vue', () => {
  it ('should have index and record props', () => {
    expect(HistoryBlock.props).toEqual({
      index: {
        type: Number,
        required: true
      },
      record: Object
    });
  })

  it('should emit click event onclick', () => {
    const wrapper = shallowMount(HistoryBlock, {
      propsData: { 
        index: 1,
        record: {} 
      }
    });
    wrapper.trigger('click');
    expect(wrapper.emitted('click')).toHaveLength(1);
  })
})