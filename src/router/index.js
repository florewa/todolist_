import { createRouter, createWebHistory } from 'vue-router'

const DashboardView = () => import('@/pages/DashboardView.vue')
const AuthForm = () => import('@/components/AuthForm.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/dashboard',
      name: 'home',
      component: DashboardView,
    },
    {
      path: '/',
      name: 'login',
      component: AuthForm,
    },
  ],
})
router.beforeEach((to, from, next) => {
  next()
})
export default router
