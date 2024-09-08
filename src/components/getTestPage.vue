<script>
  import { useQuestionsStore } from '@/store/questionStore.js'
  import { useGlobalStore } from '@/store/globalStore.js'
  import QuestionCard from "@/components/QuestionCard.vue";
  import {mapActions, mapState} from "pinia";
  import {addDoc, collection} from "firebase/firestore";
  import {db} from "@/main.js";
  export default {
    name: 'GetTestPage',
    components: {QuestionCard},
    data() {
      return {
        currentPage: 1,
        questionsPerPage: 3,
        maxQuestionsPerTest: 6,
        totalPages: 0,
        localQuestions: [],
        answerSaved: false
      }
    },
    computed: {
      ...mapState(useQuestionsStore, ['questions']),
      ...mapState(useGlobalStore, ['userId']),
      paginatedQuestions() {
        if (this.localQuestions.length === 0) {
          if (this.questions.length > this.maxQuestionsPerTest) {
            const randomIndexes = [];
            while (randomIndexes.length < this.maxQuestionsPerTest) {
              const randomValue = this.randomInteger(0, this.questions.length - 1);
              if (!randomIndexes.includes(randomValue)) {
                randomIndexes.push(randomValue);
              }
            }
            randomIndexes.forEach((index) => {this.localQuestions.push(this.questions[index])})
          }else {
            this.localQuestions = this.questions.slice(0);
          }
          this.totalPages = Math.ceil(this.localQuestions.length / this.questionsPerPage);
          for (let i = 0; i < this.localQuestions.length; i++) {
            this.localQuestions[i].numberOfTicket = i + 1;
            if(!this.localQuestions[i].answered) {
              this.localQuestions[i].answered = false;
            }
            if(!this.localQuestions[i].numberOfAnswer) {
              this.localQuestions[i].numberOfAnswer = 0;
            }
          }
        }
        const start = (this.currentPage - 1) * this.questionsPerPage;
        const end = start + this.questionsPerPage;
        return this.localQuestions.slice(start, end);
      },
      isAllAnswersChecked() {
        let result = true;
        this.localQuestions.forEach((question) => {if (question.numberOfAnswer === 0) {result = false;}})
        return result;
      },
    },
    methods: {
      ...mapActions(useQuestionsStore, ['getQuestions']),

      randomInteger(min, max) {
        let rand = min + Math.random() * (max + 1 - min);
        return Math.floor(rand);
      },

      saveAnswerInDb(question) {
        addDoc(collection(db, "answers"), {
          userId: this.userId,
          questionId: question.id,
          numberOfAnswer: question.numberOfAnswer
        })
      },

      async saveTest() {
        try{
          await this.localQuestions.forEach((question) => {this.saveAnswerInDb(question)});
          this.answerSaved = true;
        } catch(error) {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
        }
      },
      getStyleOfCard(question) {
        if (this.answerSaved) {
          return question.numberOfAnswer === question.numberOfCorrectAnswer ? '#bdffda' : '#ffc1b8';
        }
        return 'white';
      }
    },
    watch: {
    },
    mounted() {
      this.getQuestions();
    },
  };
</script>

<template>
  <v-icon icon="mdi-home" />
  <v-icon icon="home" />
  <section class="vh-100">
    <div class="container h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-lg-12 col-xl-12">
          <v-row justify-lg="center">
            <v-col  cols="12" v-for="ticket in paginatedQuestions" :key="ticket.id">
              <question-card :ticket="ticket" :currentColor="getStyleOfCard(ticket)" :isAnswered="answerSaved"/>
            </v-col>
          </v-row>
          <v-row justify-lg="center">
            <v-btn v-if="isAllAnswersChecked" @click="saveTest">Save answer options</v-btn>
          </v-row>
          <v-row justify-lg="center">
            <v-pagination
                class="pagination mb-2"
                v-model="currentPage"
                v-model:items-per-page="questionsPerPage"
                :length="totalPages"
                :total-visible="totalPages > 2 ? 2 : totalPages"
                prev-icon="mdi-menu-left"
                next-icon="mdi-menu-right"
            ></v-pagination>
          </v-row>
        </div>
      </div>
    </div>
  </section>


</template>

<style scoped>

</style>