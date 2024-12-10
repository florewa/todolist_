import { createRouter, createWebHistory } from 'vue-router'

const LoginView = () => import('@/pages/LoginView.vue')
const DashboardView = () => import('@/pages/DashboardView.vue')

// Функция проверки аутентификации
const isAuthenticated = () => !!sessionStorage.getItem('user_id')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      meta: { requiresAuth: true },
    },
    {
      path: '/',
      name: 'register',
      component: LoginView,
      meta: { requiresGuest: true },
    },
    {
      path: '/:catchAll(.*)',
      redirect: '/',
    },
  ],
})

// Глобальный Guard
router.beforeEach((to, from, next) => {
  const userAuthenticated = isAuthenticated()

  if (to.meta.requiresAuth && !userAuthenticated) {
    // Если маршрут требует авторизации, а пользователь не авторизован
    next('/') // Перенаправляем на логин
  } else if (to.meta.requiresGuest && userAuthenticated) {
    // Если пользователь авторизован, запрещаем доступ к страницам для гостей
    next('/dashboard') // Перенаправляем на dashboard
  } else {
    next() // Иначе разрешаем доступ
  }
})

export default router
