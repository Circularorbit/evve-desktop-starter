import {createRouter, createWebHistory} from 'vue-router'

const routes = [
    {
        path: '/',
        redirect: 'home'
    },
    {
        path: '/home',
        component: () => import('@/views/Home.vue')
    },
    {
        path: '/setting',
        component: () => import('@/views/Setting.vue')
    },
    {
        path: '/menu1',
        component: () => import('@/views/Menu1.vue')
    },
    {
        path: '/menu2',
        component: () => import('@/views/Menu2.vue')
    },
    {
        path: '/menu3',
        component: () => import('@/views/Menu3.vue')
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router