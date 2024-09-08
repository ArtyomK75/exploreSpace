<script>
  import { answerMixin } from "@/mixin/answerMixin.js";
  export default {
    name: "AnsweredTestCard",
    mixins: [answerMixin],
    props: ['ticket', 'currentColor'],
    methods: {
      isVisible(currentAnswerNumber) {
          return this.ticket.numberOfAnswer === currentAnswerNumber || this.ticket.numberOfCorrectAnswer === currentAnswerNumber;
      }
    },
  }
</script>


<template>

  <v-container>
    <v-row dense>
      <v-col cols="12">
        <v-card :color="currentColor">
          <v-card-text class="text-h5">
            {{ ticket.question }}
          </v-card-text>

          <v-col  cols="12">
            <div v-for="answer in answers" :key="answer.answerNumber" >
              <p v-if="isVisible(answer.answerNumber)" :style="setColorOfAnswer(answer.answerNumber)">{{ answer.answerText }}</p>
            </div>
          </v-col>

        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style>

</style>