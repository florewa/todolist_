import { createRouter, createWebHistory } from 'vue-router'

const LoginView = () => import('@/pages/LoginView.vue')

const DashboardView = () => import('@/pages/DashboardView.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
    },
    {
      path: '/',
      name: 'register',
      component: LoginView,
    },
  ],
})
router.beforeEach((to, from, next) => {
  next()
})
export default router
