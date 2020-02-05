export default {
  methods: {
    $_Storage_saveHistory(fileName, markers) {
      let existingRecords = JSON.parse(localStorage.getItem('records') || '[]');
      existingRecords.unshift({
        fileName,
        createdDate: new Date(),
        markers
      });

      if (existingRecords.length > 3) {
        existingRecords.pop();
      }

      localStorage.setItem('records', JSON.stringify(existingRecords));
    },

    $_Storage_getHistory() {
      let existingRecords = JSON.parse(localStorage.getItem('records') || '[]');

      while (existingRecords.length < 3) {
        existingRecords.push({});
      }

      return existingRecords;
    },

    $_Storage_saveGeolocation(address, location) {
      let existingCache = JSON.parse(localStorage.getItem('geolocationCache') || '{}');
      existingCache[address] = location;
      localStorage.setItem('geolocationCache', JSON.stringify(existingCache));
    },

    $_Storage_getGeolocation(address) {
      let existingCache = JSON.parse(localStorage.getItem('geolocationCache') || '{}');
      return existingCache[address];
    }
  }
}