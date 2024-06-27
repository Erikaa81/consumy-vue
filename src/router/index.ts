import { createRouter, createWebHistory } from 'vue-router'
import SignIn from '../components/SignIn.vue'
import WelcomeView from '../views/WelcomeView.vue'
import Registration from '../components/Registration.vue'
import EditBuyer from '../components/EditBuyer.vue'
import Profile from '../components/Profile.vue'


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
      },
      {
        path: '/profile',
        name: 'profile',
        component: Profile,
        props: true

      },
      {
        path: '/buyers/:id',
        name: 'editBuyer',
        component: EditBuyer,
        props: true
      },
    ] 
})

export default router
