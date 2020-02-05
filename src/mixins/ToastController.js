export default {
  methods: {
    $_ToastController_danger(text) {
      this.$toasted.show(text, {
        iconPack: 'fontawesome', 
        icon: 'fa-times',
        className: 'custom-danger',
        position: 'top-center', 
        duration : 5000
      });
    }
  }
}