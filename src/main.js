import './assets/main.css'
import router from "@/router/index.js";

import { createApp } from 'vue';
import App from './App.vue';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

import { createPinia } from 'pinia';

import {Tooltip} from "bootstrap";

//firebase
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import { globalMixin } from '@/mixin/globalMixin.js'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDwTnZO6buLNH1lQ3D2L1jsNFB99iRy5MI",
    authDomain: "explore-space-4bb6a.firebaseapp.com",
    projectId: "explore-space-4bb6a",
    storageBucket: "explore-space-4bb6a.appspot.com",
    messagingSenderId: "974690476588",
    appId: "1:974690476588:web:ce8632abd0cbecbaa46789"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);


export {
    auth,
    db
};

export const DEPT_OF_DAYS = 30;

const vuetify = createVuetify ({
    components,
    directives,
    // icons: {
    //     iconfont: 'mdi', // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4' || 'faSvg'
    // }
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
            mdi,
        },
    },
});

export default vuetify;

// export default createVuetify({
//     icons: {
//         defaultSet: 'mdi',
//         aliases,
//         sets: {
//             mdi,
//         },
//     },
// })


const pinia = createPinia();


const app = createApp(App)
    .use(vuetify)
    .use(pinia)
    .use(router)
    .mixin(globalMixin);

app.directive('tooltipActivate',{
    mounted(el, binding) {
        let tooltip = new Tooltip(el, {
            placement: binding.arg || 'bottom',
            title: binding.value
        });
    }
})

app.mount('#app');

// const myGlobalStore = useGlobalStore();
// myGlobalStore.readCookies();