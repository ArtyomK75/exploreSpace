import {defineStore} from "pinia";

export const useGlobalStore = defineStore('globalStore', {
    state: () => ({
        nasaAPIKeyState: 'VXpW95518Nge2DapthZAFWSNN75Q8D2nqNJyl8qi',
        currentUserState: null,
        isLoggedInState: false,
        userEmailStore: '',
        userNameStore: '',
        isAdminStore: false,
        userIdStore: ''
    }),
    getters: {
        getApiKey: (state) => state.nasaAPIKeyState,
        currentUser: (state) => state.currentUserState,
        isLoggedIn: (state) => state.isLoggedInState,
        loggedUserEmail: (state) => state.userEmailStore,
        loggedUserName: (state) => state.userNameStore,
        isAdmin: (state) => state.isAdminStore,
        userId: (state) => state.userIdStore
    },
    actions: {
        readCookies() {
            function getCookie(name) {
                let cookieArr = document.cookie.split(";");
                for (let i = 0; i < cookieArr.length; i++) {
                    let cookiePair = cookieArr[i].split("=");
                    if (name === cookiePair[0].trim()) {
                        return decodeURIComponent(cookiePair[1]);
                    }
                }
                return null;
            }
            const userObject = JSON.parse(getCookie('userObject'));
            console.log(userObject);
            if (userObject !== null) {
                this.currentUserState = userObject.currentUserState;
                this.isLoggedInState = userObject.isLoggedInState;
                this.userEmailStore = userObject.userEmailStore;
                this.userNameStore = userObject.userNameStore;
                this.isAdminStore = userObject.isAdminStore;
                this.userIdStore = userObject.userIdStore;
            }
        },
        setCookie(name, value) {
            const expires = new Date().setDate(new Date().getDate() + 1);
            document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires}`;
        },
        setCurrentUser(currentUser, userName, isAdmin) {
            this.currentUserState = currentUser;
            this.isLoggedInState = currentUser !== null;
            this.userEmailStore = currentUser ? currentUser.email : '';
            this.userNameStore = currentUser ? userName : '';
            this.isAdminStore = currentUser ? isAdmin : false;
            this.userIdStore = currentUser ? currentUser.uid : '';
            if (this.isLoggedInState) {
                const userObject = {
                    currentUserState: this.currentUserState,
                    isLoggedInState: this.isLoggedInState,
                    userEmailStore: this.userEmailStore,
                    userNameStore: this.userNameStore,
                    isAdminStore: this.isAdminStore,
                    userIdStore: this.userIdStore,
                };
                this.setCookie('userObject', JSON.stringify(userObject));
            }
        }
    }
})

export default useGlobalStore;
