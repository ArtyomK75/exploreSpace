import {createRouter, createWebHistory} from 'vue-router';
import { useGlobalStore } from "@/store/globalStore.js";
import HomePage from '../components/HomePage.vue';
import AdminPage from '../components/AdminPage.vue';
import NotFoundPage from '../components/NotFoundPage.vue';
import UserPage from '../components/UserPage.vue';
import ChildPage from '../components/ChildPage.vue';
import Register from "@/components/Register.vue";
import LoginLogout from "@/components/LoginLogout.vue";
import getTestPage from "@/components/getTestPage.vue";


export const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomePage
    },
    {
        path: '/admin',
        name: 'Admin',
        component: AdminPage,
        meta: { requiresAuth: true, isAdmin: true }
    },
    {
        path: '/test',
        name: 'Test',
        component: () => import('@/components/getTestPageComposition.vue'),
        meta: { requiresAuth: true, isAdmin: false }
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
    },
    {
        path: '/login',
        name: 'LoginLogout',
        component: LoginLogout,
    },
    {
        path: '/notFound',
        name: 'NotFound',
        component: NotFoundPage
    },
    {
        path: '/user/:uid',
        name: 'User',
        props: true,
        component: UserPage,
        meta: { requiresAuth: true }
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    const globStore = useGlobalStore();
    const isAuthenticated = globStore.isLoggedIn;
    const isAdmin = globStore.isAdmin;

    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!isAuthenticated) {
            next({name: 'LoginLogout'});
        } else if (to.matched.some(record => record.meta.isAdmin) && !isAdmin) {
            next({name: 'NotFound'});
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;