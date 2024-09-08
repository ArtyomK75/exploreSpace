<script setup>
  import { ref, computed, onMounted } from 'vue';
  import { useQuestionsStore } from '@/store/questionStore.js';
  import { useGlobalStore } from '@/store/globalStore.js';
  import QuestionCard from "@/components/QuestionCard.vue";
  import { addDoc, collection } from "firebase/firestore";
  import { db } from "@/main.js";
  const questionsStore = useQuestionsStore();
  const globalStore = useGlobalStore();

  const currentPage = ref(1);
  const questionsPerPage = ref(3);
  const maxQuestionsPerTest = ref(6);
  const totalPages = ref(0);
  const localQuestions = ref([]);
  const answerSaved = ref(false);

  const paginatedQuestions = computed(() => {
    if (localQuestions.value.length === 0) {
      if (questionsStore.questions.length > maxQuestionsPerTest.value) {
        const randomIndexes = [];
        while (randomIndexes.length < maxQuestionsPerTest.value) {
          const randomValue = randomInteger(0, questionsStore.questions.length - 1);
          if (!randomIndexes.includes(randomValue)) {
            randomIndexes.push(randomValue);
          }
        }
        randomIndexes.forEach((index) => {
          localQuestions.value.push(questionsStore.questions[index])
        });
      } else {
        localQuestions.value = questionsStore.questions.slice(0);
      }
      totalPages.value = Math.ceil(localQuestions.value.length / questionsPerPage.value);
      for (let i = 0; i < localQuestions.value.length; i++) {
        localQuestions.value[i].numberOfTicket = i + 1;
        if (!localQuestions.value[i].answered) {
          localQuestions.value[i].answered = false;
        }
        if (!localQuestions.value[i].numberOfAnswer) {
          localQuestions.value[i].numberOfAnswer = 0;
        }
      }
    }
    const start = (currentPage.value - 1) * questionsPerPage.value;
    const end = start + questionsPerPage.value;
    return localQuestions.value.slice(start, end);
  });

  const isAllAnswersChecked = computed(() => {
    return localQuestions.value.every(question => question.numberOfAnswer !== 0);
  });

  const randomInteger = (min, max) => {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  };

  const saveAnswerInDb = (question) => {
    addDoc(collection(db, "answers"), {
      userId: globalStore.userId,
      questionId: question.id,
      numberOfAnswer: question.numberOfAnswer
    });
  };

  const saveTest = async () => {
    try {
      await localQuestions.value.forEach((question) => { saveAnswerInDb(question) });
      answerSaved.value = true;
    } catch (error) {
      console.error(error.code, error.message);
    }
  };

  const getStyleOfCard = (question) => {
    if (answerSaved.value) {
      return question.numberOfAnswer === question.numberOfCorrectAnswer ? '#bdffda' : '#ffc1b8';
    }
    return 'white';
  };
  onMounted(() => {
    questionsStore.getQuestions();
  });
</script>

<template>
  <v-icon icon="mdi-home" />
  <v-icon icon="home" />
  <section class="vh-100">
    <div class="container h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-lg-12 col-xl-12">
          <v-row justify-lg="center">
            <v-col cols="12" v-for="ticket in paginatedQuestions" :key="ticket.id">
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