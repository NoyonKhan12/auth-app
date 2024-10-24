import DashboardPage from '@/components/DashboardPage.vue'
import LoginForm from '@/components/LoginForm.vue'
import SignupForm from '@/components/SignupForm.vue'
import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/signup'
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupForm
    },
    {
      path: '/login',
      name: 'login',
      component: LoginForm
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardPage,
      meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  console.log(from);
  
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!localStorage.getItem('accessToken')) {
      next('/login')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router