import LoadHistoryModal from '@/components/LoadHistoryModal.vue';

describe('LoadHistoryModal.vue', () => {
  it ('should have index and record props', () => {
    expect(LoadHistoryModal.props).toEqual({
      visible: Boolean
    });
  })
})