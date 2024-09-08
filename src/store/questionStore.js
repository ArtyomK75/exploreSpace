import {defineStore, mapActions, mapState} from "pinia";
import useGlobalStore from "@/store/globalStore.js";
import { db } from "@/main.js";
import { collection, getDocs, query, where } from "firebase/firestore";

export const useQuestionsStore = defineStore('questionsStore', {
    state: () => ({
        questionsState: [],
        answeredQuestionsState: [],
    }),
    getters: {
        questions: (state) => state.questionsState,
        answers: (state) => state.answeredQuestionsState,
    },
    actions: {
        async getQuestions() {
            try {
                const q = query(collection(db, "questions"));
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    const docsElement = {...doc.data()};
                    docsElement.id = doc.id;
                    this.questionsState.push(docsElement);
                });
            } catch (error) {
                console.log('Error reading questions from firebase');
                return;
            }
            try {
                const answers = [];
                const store = useGlobalStore();
                const q = query(collection(db, "answers"), where("userId", "==", store.userId));
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    answers.push(doc.data());
                });
                this.questionsState.forEach((question) => {
                    const isAnswered = (element) => element.questionId === question.id;
                    const indexElement = answers.findIndex(isAnswered);
                    question.isAnswered = indexElement > -1;
                })
            } catch (error) {
                console.log(error);
                console.log('Error reading answers from firebase');
            }
        },
        async getAnsweredQuestionsByUser(userId) {
            const answers = [];
            const questionIds = [];
            try {

                const store = useGlobalStore();
                const q = query(collection(db, "answers"), where("userId", "==", userId));
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    const docData = doc.data();
                    docData.id = doc.id;
                    answers.push(docData);
                    if (!questionIds.includes(docData.questionId)) {
                        questionIds.push(docData.questionId);
                    }
                });
            } catch (error) {
                console.log(error);
                console.log('Error reading answers from firebase');
            }
            const questionTable = [];

            try {
                const q = query(collection(db, "questions"), where('__name__', "in", questionIds));
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    const docsElement = {...doc.data()};
                    docsElement.id = doc.id;
                    questionTable.push(docsElement);
                });
                answers.forEach((answer) => {
                    const question = (element) => answer.questionId === element.id;
                    const elementQuestion = questionTable.find(question);
                    elementQuestion.numberOfAnswer = answer.numberOfAnswer;
                    elementQuestion.answerId = answer.id;
                    elementQuestion.isAnswered = true;
                    this.answeredQuestionsState.push(elementQuestion);
                })
            } catch (error) {
                 console.log(error);
                 console.log('Error reading questions from firebase');
            }
        },

    },
})

