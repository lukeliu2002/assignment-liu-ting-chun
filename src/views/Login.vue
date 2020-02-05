<template>
  <div class="login">
    <div class="fullscreen-overlay">
      <div class="centered">
        <div class="login-block">
          <h3>Welcome</h3>

          <div class="input-group">
            <input placeholder="Email" v-model="email">
            <input type="password" placeholder="Password" v-model="password">
          </div>

          <div class="button-group">
            <ThemeButton theme="success" v-on:click="submit" v-bind:disabled="!canProceed || isLoading">
              {{ isLoading ? 'Loading...' : 'Login' }}
            </ThemeButton>
          </div>

          <div class="login-block-footer">
            <a href="https://neat-api-docs.herokuapp.com/#accounts" target="_blank">Register Now!</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { APIController, ToastController } from '@/mixins';
  import { ThemeButton } from '@/components';

  export default {
    mixins: [ APIController, ToastController ],

    components: { ThemeButton },

    data() {
      return {
        isLoading: null,
        email: null,
        password: null
      }
    },

    computed: {
      canProceed() {
        return this.email && this.password;
      }
    },

    methods: {
      async submit() {
        this.isLoading = true;
        try {
          let response = await this.$_APIController_login(this.email, this.password);
          if (response.data.id) {
            this.$store.commit('setAuthentication', true);
            this.$router.replace('/');
          }
        }
        catch {
          this.$_ToastController_danger('Invalid credential.');
        }
        this.isLoading = false;
      }
    }
  }
</script>

<style lang="scss">
  @import "@/assets/theme.scss";

  .login {
    .fullscreen-overlay {
      position: fixed;
      z-index: 9998;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: table;
      background-color: rgba(0, 0, 0, .5);
    }

    .centered {
      display: table-cell;
      vertical-align: middle;
    }

    .login-block {
      padding-top: 14px;
      margin: 0 auto;
      border-top: solid 8px map-get($theme-colors, primary);
      background-color: $white;
      width: 300px;
      max-width: calc(100% - 30px);
    }

    h3 {
      text-align: center;
      margin-bottom: 48px;
    }

    .input-group {
      width: 100%;
      box-sizing : border-box;
      padding: 0 16px;
      margin-bottom: 48px;

      input {
        display: block;
        box-sizing : border-box;
        width: 100%;
        height: 32px;
        padding: 4px 8px;
        font-size: 14px;
        font-weight: 400;
        line-height: 1.5;
        color: $gray-700;
        background-color: $white;
        background-clip: padding-box;
        border: 1px solid $gray-400;
        border-radius: 5px;

        &:not(:last-of-type) {
          margin-bottom: 5px;
        }
      }
    }

    .button-group {
      width: 100%;
      box-sizing : border-box;
      padding: 0 16px;
      margin-bottom: 16px;

      .theme-button {
        display: block;
        width: 100%;
      }
    }

    .login-block-footer {
      padding: 14px;
      background-color: $gray-200;
      text-align: center;
    }
  }
</style>