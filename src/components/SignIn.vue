<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { Auth } from '../auth'
const router = useRouter()
const awaiting = ref(false)
const email = defineModel<string>('email')
const password = defineModel<string>('password')
const errorMessage = ref('')
const remember = defineModel<boolean>('remember', { default: true })

async function onSubmit(form: Event) {
  let auth = new Auth(remember.value)
  awaiting.value = true
  auth.signIn(
    email.value || '',
    password.value || '',
    () => {
      awaiting.value = false
      router.push('/')
    },
    () => {
      awaiting.value = false
      console.log('não foi dessa vez!')
      errorMessage.value = 'Invalid email or password!'
    }
  )
}
</script>

<template>
  <div>
    <h1>Sign In</h1>
    <form @submit.prevent="onSubmit">
      <label>E-Mail: </label>
      <input v-model="email" type="email" /><br />
      <label>Senha: </label>
      <input v-model="password" type="password" /><br />
      <label>Remember Me: </label>
      <input v-model="remember" type="checkbox" /><br />
      <button type="submit" v-show="!awaiting">Sign In</button>
    </form>
    <div v-if="errorMessage" style="color: red">{{ errorMessage }}</div>
  </div>
</template>
