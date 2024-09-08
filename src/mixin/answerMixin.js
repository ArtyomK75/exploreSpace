export const answerMixin = {
    props: ['ticket', 'currentColor', 'isAnswered'],
    data() {
        return {
            answers: []
        }
    },
    methods: {
        setColorOfAnswer(numberAnswer){
            if (this.isAnswered) {
                if (this.ticket.numberOfCorrectAnswer === numberAnswer) {
                    return {'background-color': '#bdffda'};
                }
                if (this.ticket.numberOfAnswer === numberAnswer && this.ticket.numberOfCorrectAnswer !== numberAnswer) {
                    return {'background-color': '#ba6971'};
                }
            }
        }
    },
    mounted() {
        this.answers = [{answerNumber: 1, answerText: this.ticket.answer1},
            {answerNumber: 2, answerText: this.ticket.answer2},
            {answerNumber: 3, answerText: this.ticket.answer3},
            {answerNumber: 4, answerText: this.ticket.answer4},]
    }
}