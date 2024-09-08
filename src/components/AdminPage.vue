<script>
  import {db} from "@/main.js";
  import {addDoc, collection} from "firebase/firestore";
  export default {
    name: 'AdminPage',
    data() {
      return {
        form: {
          question: '',
          answer1: '',
          answer2: '',
          answer3: '',
          answer4: '',
          numberOfCorrectAnswer: 0,
        },
        questionError: '',
      }
    },
    methods: {
      async saveQuestion(event) {
        if (!this.checkIsAllCorrect()) {
          return;
        }
        try {
          await addDoc(collection(db, "questions"), {
            question: this.form.question,
            answer1: this.form.answer1,
            answer2: this.form.answer2,
            answer3: this.form.answer3,
            answer4: this.form.answer4,
            numberOfCorrectAnswer: +this.form.numberOfCorrectAnswer,
          });
          alert('Question was successfully recorded in db');
          document.getElementById('inputQuestionForm').reset();

        } catch(error) {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
        }

      },
      checkIsAllCorrect() {
        let isAllCorrect = true;
        this.questionError = '';
        if (this.form.question === '') {
          this.questionError += 'You need to specify a question';
          isAllCorrect = false;
        }
        if (this.form.answer1 === '') {
          this.questionError = (this.questionError.length > 0 ? '\n': '') + 'You need to specify a first answer';
          isAllCorrect = false;
        }
        if (this.form.answer2 === '') {
          this.questionError += (this.questionError.length > 0 ? '\n': '') + 'You need to specify a second answer';
          isAllCorrect = false;
        }
        if (this.form.answer3 === '') {
          this.questionError += (this.questionError.length > 0 ? '\n': '') + 'You need to specify a third answer';
          isAllCorrect = false;
        }
        if (this.form.answer4 === '') {
          this.questionError += (this.questionError.length > 0 ? '\n': '') + 'You need to specify a fourth answer';
          isAllCorrect = false;
        }
        if (this.form.numberOfCorrectAnswer === 0) {
          this.questionError += (this.questionError.length > 0 ? '\n': '') + 'You need to specify number of correct answer';
          isAllCorrect = false;
        }
        return isAllCorrect;
      }
    },
    watch: {
      "form.question": function (value) {
        this.questionError = '';
      },
      "form.answer1": function (value) {
        this.questionError = '';
      },
      "form.answer3": function (value) {
        this.questionError = '';
      },
      "form.answer4": function (value) {
        this.questionError = '';
      },
      "form.answer2": function (value) {
        this.questionError = '';
      },
      "form.numberOfCorrectAnswer": function (value) {
        this.questionError = '';
      },

    },
  };
</script>

<template>
  <section class="vh-100">
    <div class="container h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-lg-12 col-xl-11">
          <div class="card text-black" style="border-radius: 25px;">
            <div class="card-body p-md-5">
              <div class="row justify-content-center">
                <div class="col-md-10 col-lg-12 col-xl-12 order-2 order-lg-1">

                  <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4" >Enter question for test</p>

                  <form class="mx-1 mx-md-12" id="inputQuestionForm" novalidate @submit.prevent="saveQuestion">

                    <div class="d-flex flex-row align-items-center mb-md-12">
                      <v-textarea
                          solo
                          name="input-1-1"
                          label="Enter question here"
                          v-model="form.question"
                      ></v-textarea>
                    </div>
                    <p class="small fw-bold link-danger" style="white-space: pre;">{{ questionError }}</p>

                    <div class="d-flex flex-row align-items-lg-center mb-4">
                      <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                      <input type="radio" id="radio1" value=1 v-model="form.numberOfCorrectAnswer" />
                      <div data-mdb-input-init class="form-outline flex-fill mb-0">
                        <input type="text" id="formAnswer1" class="form-control" v-model="form.answer1"/>
                        <label class="form-label" for="formAnswer1">Enter answer 1</label>
                      </div>
                    </div>

                    <div class="d-flex flex-row align-items-lg-center mb-4">
                      <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                      <input type="radio" id="radio2" value=2 v-model="form.numberOfCorrectAnswer" /> <br>
                      <div data-mdb-input-init class="form-outline flex-fill mb-0">
                        <input type="text" id="formAnswer2" class="form-control" v-model="form.answer2"/>
                        <label class="form-label" for="formAnswer2">Enter answer 2</label>
                      </div>
                    </div>

                    <div class="d-flex flex-row align-items-lg-center mb-4">
                      <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                      <input type="radio" id="radio3" value=3 v-model="form.numberOfCorrectAnswer" />
                      <div data-mdb-input-init class="form-outline flex-fill mb-0">
                        <input type="text" id="formAnswer3" class="form-control" v-model="form.answer3"/>
                        <label class="form-label" for="formAnswer3">Enter answer 3</label>
                      </div>
                    </div>

                    <div class="d-flex flex-row align-items-lg-center mb-4">
                      <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                      <input type="radio" id="radio4" value=4 v-model="form.numberOfCorrectAnswer" />
                      <div data-mdb-input-init class="form-outline flex-fill mb-0">
                        <input type="text" id="formAnswer4" class="form-control" v-model="form.answer4"/>
                        <label class="form-label" for="formAnswer4">Enter answer 4</label>
                      </div>
                    </div>

                    <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                      <button  type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-primary btn-lg"
                               @click="saveQuestion">Save question</button>
                    </div>

                  </form>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>


</template>

<style scoped>

</style>