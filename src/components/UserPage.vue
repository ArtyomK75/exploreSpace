<script>
import { useQuestionsStore } from '@/store/questionStore.js'
import {mapActions, mapState} from "pinia";
import AnsweredTestCard from "@/components/AnsweredTestCard.vue";
export default {
  name: 'UserPage',
  components: {AnsweredTestCard},
  props: ['uid'],
  data() {
    return {
      currentPage: 1,
      questionsPerPage: 5,
      totalPages: 0,
    }
  },
  computed: {
    ...mapState(useQuestionsStore, ['answers']),
    paginatedQuestions() {
      this.totalPages = Math.ceil(this.answers.length / this.questionsPerPage);
      const start = (this.currentPage - 1) * this.questionsPerPage;
      const end = start + this.questionsPerPage;
      return this.answers.slice(start, end);
    },
  },
  methods: {
    ...mapActions(useQuestionsStore, ['getAnsweredQuestionsByUser']),
    getStyleOfCard(question) {
      return question.numberOfAnswer === question.numberOfCorrectAnswer ? '#bdffda' : '#ffc1b8';
    },
  },
  mounted() {
    this.getAnsweredQuestionsByUser(this.uid);
  },
};
</script>

<template>
  <v-icon icon="mdi-home" />
  <section class="vh-100">
    <div class="container h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-lg-12 col-xl-12">
          <v-row justify-lg="center">
            <v-col  cols="12" v-for="ticket in paginatedQuestions" :key="ticket.answerId">
              <answered-test-card :ticket="ticket" :currentColor="getStyleOfCard(ticket)" :isAnswered="true"/>
            </v-col>
          </v-row>
          <v-row justify-lg="center">
            <v-pagination
                v-model="currentPage"
                v-model:items-per-page="questionsPerPage"
                :length="totalPages"
                :total-visible="totalPages > 5 ? 5 : totalPages"
                prev-icon="mdi-menu-left"
                next-icon="mdi-menu-right"
            ></v-pagination>
          </v-row>
        </div>
      </div>
    </div>
  </section>


</template>

<style>

</style>