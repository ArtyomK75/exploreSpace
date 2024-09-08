<script>
  import { useGlobalStore } from "@/store/globalStore.js";
  import { mapState } from "pinia";
  export default {
    name: 'App',
    computed: {
      ...mapState(useGlobalStore, ['isLoggedIn', 'loggedUserEmail', 'loggedUserName', "userId", 'isAdmin']),
      userName() {
        return this.isLoggedIn ? `(${this.loggedUserName})` : '';
      },
      getButtonNameLogInOut() {
        return this.isLoggedIn ? 'Logout' : 'Login';
      }
    },
    methods: {
      goToUserPage() {
        this.$router.push({name: 'User', params: { uid: this.userId }});
      }
    }
  };
</script>

<template>
  <v-app>
    <v-app-bar app>
      <v-app-bar-title>
        <h3 class="text-h4 white--text">Explore Space</h3>
      </v-app-bar-title>


      <v-btn @click="$router.push({name: 'Home'})">
        Home
      </v-btn>

      <v-btn v-if="isLoggedIn && !isAdmin" @click="$router.push({name: 'Test'})" >
        Get test
      </v-btn>

      <v-btn v-if="isLoggedIn && isAdmin" @click="$router.push({name: 'Admin'})">
        Create tests
      </v-btn>

      <v-spacer></v-spacer>
      <v-btn v-if="!isLoggedIn" @click="$router.push({name: 'Register'})">
        Sign in
      </v-btn>

      <v-btn @click="$router.push({name: 'LoginLogout'})">
        {{ getButtonNameLogInOut }}
      </v-btn>

      <v-btn v-if="isLoggedIn" @click="goToUserPage">
        User page {{ userName }}
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<style>

</style>