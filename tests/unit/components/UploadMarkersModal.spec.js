import { shallowMount } from '@vue/test-utils';
import UploadMarkersModal from '@/components/UploadMarkersModal.vue';

describe('UploadMarkersModal.vue', () => {
  it ('should have visible prop', () => {
    expect(UploadMarkersModal.props).toEqual({
      visible: Boolean
    });
  })

  it ('should return parsed data on upload success', () => {
    const wrapper = shallowMount(UploadMarkersModal);
    wrapper.setData({
      fileName: 'test.csv',
      header: ['ADDRESS', 'CITY', 'STATE', 'ZIPCODE', 'CATEGORY'],
      addressData: [
        ["1700 Sunset Blvd", "Los Angeles", "CA", "90221", "two-family dwellings"],
        ["23475 Long Valley Rd", "Woodland Hills", "CA", "90221", "extensive agricultural use"],
        ["1320 Glendale Blvd", "Los Angeles", "CA", "90221", "residential accessory"],
        ["3601 S Gaffey St", "San Pedro", "CA", "90221", "residential estate"],
        ["1562 Baxter St", "Los Angeles", "CA", "90221", "residential accessory"],
        ["3922 Sunset Blvd", "Los Angeles", "CA", "90221", "limited ground floor commercial"],
        ["1750 Hillhurst Ave", "Los Angeles", "CA", "90221", "two-family dwellings"],
        ["6126 Hollywood Blvd", "Los Angeles", "CA", "90221", "extensive agricultural use"],
        ["1329 N Lake Ave", "Pasadena", "CA", "90221", "limited ground floor commercial"],
        ["709 N La Brea Ave", "Los Angeles", "CA", "90221", "public facility"],
        ["929 S Broadway", "Los Angeles", "CA", "90221", "extensive agricultural use"],
        ["1016 N Alvarado St", "Los Angeles", "CA", "90221", "residential estate"],
        ["401 S Hope St", "Los Angeles", "CA", "90221", "open space"],
        ["720 N Virgil Ave", "Los Angeles", "CA", "90221", "residential estate"],
        ["5851 Clinton St", "Los Angeles", "CA", "90221", "residential estate"],
        ["7001 Franklin Ave", "Los Angeles", "CA", "90221", "extensive agricultural use"],
        ["822 N Alvarado St", "Los Angeles", "CA", "90221", "two-family dwellings"],
        ["701 S Santa Fe Ave", "Compton", "CA", "90221", "public facility"],
        ["905 E El Segundo Blvd", "Los Angeles", "CA", "90221", "limited ground floor commercial"],
        ["12521 Vermont Ave", "Los Angeles", "CA", "90221", "two-family dwellings"]
      ]
    });
    wrapper.vm.onSubmit();
    expect(wrapper.emitted('success')[0][0]).toEqual({
      fileName: 'test.csv',
      addresses: [
        {
          ADDRESS: '1700 Sunset Blvd',
          CITY: 'Los Angeles',
          STATE: 'CA',
          ZIPCODE: '90221',
          CATEGORY: 'two-family dwellings'
        },
        {
          ADDRESS: '23475 Long Valley Rd',
          CITY: 'Woodland Hills',
          STATE: 'CA',
          ZIPCODE: '90221',
          CATEGORY: 'extensive agricultural use'
        },
        {
          ADDRESS: '1320 Glendale Blvd',
          CITY: 'Los Angeles',
          STATE: 'CA',
          ZIPCODE: '90221',
          CATEGORY: 'residential accessory'
        },
        {
          ADDRESS: '3601 S Gaffey St',
          CITY: 'San Pedro',
          STATE: 'CA',
          ZIPCODE: '90221',
          CATEGORY: 'residential estate'
        },
        {
          ADDRESS: '1562 Baxter St',
          CITY: 'Los Angeles',
          STATE: 'CA',
          ZIPCODE: '90221',
          CATEGORY: 'residential accessory'
        },
        {
          ADDRESS: '3922 Sunset Blvd',
          CITY: 'Los Angeles',
          STATE: 'CA',
          ZIPCODE: '90221',
          CATEGORY: 'limited ground floor commercial'
        },
        {
          ADDRESS: '1750 Hillhurst Ave',
          CITY: 'Los Angeles',
          STATE: 'CA',
          ZIPCODE: '90221',
          CATEGORY: 'two-family dwellings'
        },
        {
          ADDRESS: '6126 Hollywood Blvd',
          CITY: 'Los Angeles',
          STATE: 'CA',
          ZIPCODE: '90221',
          CATEGORY: 'extensive agricultural use'
        },
        {
          ADDRESS: '1329 N Lake Ave',
          CITY: 'Pasadena',
          STATE: 'CA',
          ZIPCODE: '90221',
          CATEGORY: 'limited ground floor commercial'
        },
        {
          ADDRESS: '709 N La Brea Ave',
          CITY: 'Los Angeles',
          STATE: 'CA',
          ZIPCODE: '90221',
          CATEGORY: 'public facility'
        },
        {
          ADDRESS: '929 S Broadway',
          CITY: 'Los Angeles',
          STATE: 'CA',
          ZIPCODE: '90221',
          CATEGORY: 'extensive agricultural use'
        },
        {
          ADDRESS: '1016 N Alvarado St',
          CITY: 'Los Angeles',
          STATE: 'CA',
          ZIPCODE: '90221',
          CATEGORY: 'residential estate'
        },
        {
          ADDRESS: '401 S Hope St',
          CITY: 'Los Angeles',
          STATE: 'CA',
          ZIPCODE: '90221',
          CATEGORY: 'open space'
        },
        {
          ADDRESS: '720 N Virgil Ave',
          CITY: 'Los Angeles',
          STATE: 'CA',
          ZIPCODE: '90221',
          CATEGORY: 'residential estate'
        },
        {
          ADDRESS: '5851 Clinton St',
          CITY: 'Los Angeles',
          STATE: 'CA',
          ZIPCODE: '90221',
          CATEGORY: 'residential estate'
        },
        {
          ADDRESS: '7001 Franklin Ave',
          CITY: 'Los Angeles',
          STATE: 'CA',
          ZIPCODE: '90221',
          CATEGORY: 'extensive agricultural use'
        },
        {
          ADDRESS: '822 N Alvarado St',
          CITY: 'Los Angeles',
          STATE: 'CA',
          ZIPCODE: '90221',
          CATEGORY: 'two-family dwellings'
        },
        {
          ADDRESS: '701 S Santa Fe Ave',
          CITY: 'Compton',
          STATE: 'CA',
          ZIPCODE: '90221',
          CATEGORY: 'public facility'
        },
        {
          ADDRESS: '905 E El Segundo Blvd',
          CITY: 'Los Angeles',
          STATE: 'CA',
          ZIPCODE: '90221',
          CATEGORY: 'limited ground floor commercial'
        },
        {
          ADDRESS: '12521 Vermont Ave',
          CITY: 'Los Angeles',
          STATE: 'CA',
          ZIPCODE: '90221',
          CATEGORY: 'two-family dwellings'
        }
      ]
    });
  })
})