import {useGlobalStore} from '@/store/globalStore.js';
import {mapState} from "pinia";

export const globalMixin = {
    // data() {
    //     return {
    //         mixIsLoggedIn: false,
    //         mixLoggedUserEmail: '',
    //         mixLoggedUserName: '',
    //         mixUserId: ''
    //     }
    // },
    // compute: {
    //     ...mapState(useGlobalStore, ['isLoggedIn', 'loggedUserEmail', 'loggedUserName', "userId"]),
    // },
    // methods: {
    //     mixCompIsLoggedIn() {
    //         this.mixIsLoggedIn = this.isLoggedIn;
    //     },
    // },
    // updated() {
    //     this.mixCompIsLoggedIn();
    // }
}
