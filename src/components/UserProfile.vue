<script setup lang="ts">
import { Auth } from '../auth'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const auth = new Auth()
const isLoggedIn = ref(auth.isLoggedIn())
const currentUser = ref(auth.currentUser())
const route = useRoute()

const signOut = function () {
  auth.signOut(() => (isLoggedIn.value = auth.isLoggedIn()))
}

const goToProfile = () => {
  router.push({ name: 'profile' })
}

</script>

<template>
  <main>
    <template v-if="isLoggedIn">
      <h3>Hi, {{ currentUser && currentUser.email }}</h3>
      <br />
      <nav>
        <a @click="signOut">Sign Out</a>
      </nav>
      <button @click="goToProfile">Go to Profile</button>
        </template>
    <template v-else>
      <h3>Please log in to have access</h3>
      <br />
      <nav>
        <RouterLink :to="{ name: 'signin' }">Sign In</RouterLink>
        <RouterLink :to="{ name: 'new' }">Register</RouterLink>
      </nav>
    </template>
  </main>
</template>