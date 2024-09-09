import './assets/main.css'
import router from "@/router/index.js";

import { createApp } from 'vue';
import App from './App.vue';
import 'bootstrap/dist/css/bootstrap.min.css';

import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css';

import { createPinia } from 'pinia';

import {Tooltip} from "bootstrap";

//firebase
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import { globalMixin } from '@/mixin/globalMixin.js'

export const NASA_API_KEY = import.meta.env.VITE_NASA_API_KEY;

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID,
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
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
            mdi,
        },
    },
});

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
