<template>
  <section class="vh-100">
    <div class="container h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-lg-12 col-xl-11">
          <div class="card text-black" style="border-radius: 25px; padding-top: 50px; padding-bottom: 50px">
            <div class="container-fluid h-custom">
              <div class="row d-flex justify-content-center align-items-center h-100">

                <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">{{ titleLogInOut }}</p>

                <div class="col-md-9 col-lg-6 col-xl-5">
                  <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                       class="img-fluid" alt="Sample image">
                </div>
                <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                  <form>
                    <div v-if="!isLoggedIn">
                      <!-- Email input -->
                      <div data-mdb-input-init class="form-outline mb-4">
                        <input type="email" id="form3Example3" class="form-control form-control-lg"
                               placeholder="Enter a valid email address" v-model="form.email"/>
                        <label class="form-label" for="form3Example3">Email address</label>
                      </div>

                      <!-- Password input -->
                      <div data-mdb-input-init class="form-outline mb-3">
                        <input type="password" id="form3Example4" class="form-control form-control-lg"
                               placeholder="Enter password" v-model="form.password"/>
                        <label class="form-label" for="form3Example4">Password</label>
                      </div>
                      <p class="small fw-bold link-danger">{{ loginError }}</p>
                    </div>
                    <div class="text-center text-lg-start mt-4 pt-2">
                      <button  v-if="!isLoggedIn" type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-primary btn-lg"
                               style="padding-left: 2.5rem; padding-right: 2.5rem;" @click="login">Login</button>
                      <button  v-else type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-primary btn-lg"
                               style="padding-left: 2.5rem; padding-right: 2.5rem;" @click="logout">Logout</button>
                      <p v-if="!isLoggedIn" class="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <a href="#" @click="$router.push({name: 'Register'})"
                                                                                        class="link-danger">Register</a></p>
                    </div>

                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section></template>
  
<script>
    import {auth, db} from "@/main";
    import { signInWithEmailAndPassword } from 'firebase/auth';
    import { signOut } from 'firebase/auth';
    import { useGlobalStore } from "@/store/globalStore.js";
    import {mapActions, mapState} from "pinia";
    import { collection, query, where, getDocs } from "firebase/firestore";

    export default {
        name: "LoginLogout",
        data() {
            return {
              form: {
                email: '',
                password: '',
              },
              isUserLoggedIn: false,
              titleLogInOut: 'Login',
              loginError: ''
            }
        },
    computed: {
      ...mapState(useGlobalStore, ['isLoggedIn']),
    },
    watch: {
      isUserLoggedIn: function (value) {
        this.titleLogInOut = value ? 'Logout' : 'Login';
      },
      'form.email': function () {
        this.loginError = '';
      },
      'form.password': function () {
        this.loginError = '';
      },
    },
    methods: {
        ...mapActions(useGlobalStore, ['setCookie']),
        async login() {
          const store = useGlobalStore();
          try {
            await signInWithEmailAndPassword(auth, this.form.email, this.form.password)
                .then(() => {
                });
          } catch (error) {
            this.loginError = 'You entered an incorrect username and password combination';
            return;
          }
          try {
            const q = query(collection(db, "users"), where("authId", "==", auth.currentUser.uid));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
              const docData = doc.data();
              store.setCurrentUser(auth.currentUser, docData.userName, docData.isAdmin);
              this.$router.push({name: 'Home'})
            });
          } catch (error) {
            this.loginError = 'The combination of username and password combination is not found in database';
          }
        },
        async logout() {
          const store = useGlobalStore();
          await signOut(auth)
              .then(() => {
                store.setCurrentUser(auth.currentUser);
                this.$router.push({name: 'Home'})
              }).catch((error) => {
                this.loginError = 'Something went wrong, try again.';
          });
          this.setCookie('userObject', null);
        }

      },
      mounted() {
          this.isUserLoggedIn = this.isLoggedIn;
      },
    };
</script>