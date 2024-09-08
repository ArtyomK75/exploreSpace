<script>
  import {answerMixin} from '@/mixin/answerMixin.js';
  export default {
    name: "QuestionCard",
    mixins: [answerMixin],
    props: ['ticket', 'currentColor', 'isAnswered'],
  }
</script>


<template>

  <v-container>
    <v-row dense>
      <v-col cols="12">
        <v-card :color="currentColor">
          <v-card-title class="text-h5">
            Question: {{ ticket.numberOfTicket }} <span v-if="ticket.numberOfAnswer!==0">checked answer is {{ ticket.numberOfAnswer }}</span>

          </v-card-title>

          <v-card-text class="text-h7">
            {{ ticket.question }}
          </v-card-text>
          <v-radio-group v-model="ticket.numberOfAnswer" :disabled="isAnswered">
            <v-radio v-tooltip-activate="'Click on this option if you think it is correct'" v-for="answer in answers" :key="answer.answerNumber" :value=answer.answerNumber
                     :label="answer.answerText" :style="setColorOfAnswer(answer.answerNumber)"></v-radio>
          </v-radio-group>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style>

</style>