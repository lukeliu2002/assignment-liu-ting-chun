export default {
  methods: {
    _post(url, params = {}) {
      let form = new FormData();
      Object.entries(params).forEach(([key, value]) => {
        form.append(key, value);
      })

      return this.$http.post(url, form);
    },

    $_APIController_login(email, password) {
      return this._post('http://neat-mvp-api.herokuapp.com/v1/auth', { email, password });
    }
  }
}