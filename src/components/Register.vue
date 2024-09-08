<template>
  <section class="vh-100">
    <div class="container h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-lg-12 col-xl-11">
          <div class="card text-black" style="border-radius: 25px;">
            <div class="card-body p-md-5">
              <div class="row justify-content-center">
                <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                  <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                  <form class="mx-1 mx-md-4" novalidate @submit.prevent="register">

                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                      <div data-mdb-input-init class="form-outline flex-fill mb-0">
                        <input type="email" id="form3Example2c" class="form-control" v-model="form.userName"/>
                        <label class="form-label" for="form3Example2c">User name</label>
                        <p class="small fw-bold link-danger">{{ userNameError }}</p>
                      </div>
                    </div>

                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                      <div data-mdb-input-init class="form-outline flex-fill mb-0">
                        <input type="email" id="form3Example3c" class="form-control" v-model="form.email"/>
                        <label class="form-label" for="form3Example3c">Your Email</label>
                        <p class="small fw-bold link-danger">{{ emailError }}</p>
                      </div>
                    </div>

                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                      <div data-mdb-input-init class="form-outline flex-fill mb-0">
                        <input type="password" id="form3Example4c" class="form-control" v-model="form.password"/>
                        <label class="form-label" for="form3Example4c">Password</label>
                        <p class="small fw-bold link-danger">{{ passwordError }}</p>
                      </div>
                    </div>

                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-key fa-lg me-3 fa-fw"></i>
                      <div data-mdb-input-init class="form-outline flex-fill mb-0">
                        <input type="password" id="form3Example4cd" class="form-control" v-model="form.confirmPassword"/>
                        <label class="form-label" for="form3Example4cd">Repeat your password</label>
                        <p class="small fw-bold link-danger">{{ repeatPasswordError }}</p>
                      </div>
                    </div>

                    <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                      <button  type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-primary btn-lg"
                      @click="register">Sign in</button>
                    </div>

                  </form>

                </div>
                <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                  <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                       class="img-fluid" alt="Sample image">

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
  
<script>
import {auth, db} from "@/main";
    import { createUserWithEmailAndPassword } from 'firebase/auth';
    import { useGlobalStore } from "@/store/globalStore.js";
    import { collection, addDoc } from 'firebase/firestore'
    export default {
          name: "Register",
          data() {
            return {
              form: {
                userName: '',
                email: '',
                password: '',
                confirmPassword: '',
              },
              emailError: '',
              passwordError: '',
              repeatPasswordError: '',
              userNameError: ''
          }
      },
      computed: {
      },
      watch: {
        "form.userName": function (value) {
          this.userNameError = this.validateUserName(value) ? '' : 'Invalid user name';
        },
        "form.email": function (value) {
          this.emailError = this.validateEmail(value) ? '' : 'Invalid email';
        },
        "form.password": function (value) {
          this.passwordError = this.validatePassword(value) ? '' : 'Invalid email';
        },
        "form.confirmPassword": function (value) {
          this.repeatPasswordError = this.validateConfirmPassword() ? '' : 'The repeated password does not match the password';
        },

      },
      methods: {
        validateUserName(userName) {
          const usernameRegex = /^[A-Za-z0-9_.]+$/;
          return usernameRegex.test(userName);
        },
        validateEmail(email) {
          return /\S+@\S+\.\S+/.test(email);
        },
        validatePassword(password) {
          return password.length >= 6;
        },
        validateConfirmPassword() {
          return this.form.password === this.form.confirmPassword;
        },
        async register() {
          if (!(this.validateUserName(this.form.userName)
              && this.validateEmail(this.form.email)
              && this.validatePassword(this.form.password)
              && this.validateConfirmPassword())) {
            alert('Correct the errors indicated in red on the form');
            return;
          }
          const store = useGlobalStore();
          try {
            await createUserWithEmailAndPassword(auth, this.form.email, this.form.password)
                .then(() => {
                  store.setCurrentUser(auth.currentUser, this.form.userName, false);});
            await addDoc(collection(db, "users"), {
              authId: auth.currentUser.uid,
              userName: this.form.userName,
              isAdmin: false,
            })
            this.$router.push({name: 'Home'})
          } catch(error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
          }
       }
    }
  };
</script>