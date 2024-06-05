import { createRouter, createWebHistory } from 'vue-router'
import SignIn from '../components/SignIn.vue'
import WelcomeView from '../views/WelcomeView.vue'
import Registration from '../components/Registration.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
     {
      path: '/',
      name: 'welcome',
      component: WelcomeView
      },
      {
      path: '/signin',
      name: 'signin',
      component: SignIn
      },
      {
        path: '/new',
        name: 'new',
        component: Registration
      }
    ]  
})

export default router
