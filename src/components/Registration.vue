<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { Auth } from '../auth';

const router = useRouter();
const email = ref('');
const password = ref('');
const passwordConfirmation = ref('');
const errorMessage = ref('');
const awaiting = ref(false);
const registerSuccess = ref(false); 

const auth = new Auth();

async function onSubmit() {
  awaiting.value = true;

  try {
    await auth.register(email.value, password.value, passwordConfirmation.value);
    registerSuccess.value = true; 
    router.push('/'); 
    
    errorMessage.value = '';
  } catch (error) {
    awaiting.value = false;
    console.error('Erro durante o registro:', error);
    errorMessage.value = 'Ocorreu um erro durante o registro.';
  }
}
</script>

<template>
  <div>
    <h1>Registre-se</h1>
    <form @submit.prevent="onSubmit">
      <label>E-Mail: </label>
      <input v-model="email" type="email" /><br />
      <label>Senha: </label>
      <input v-model="password" type="password" /><br />
      <label>Confirme a senha: </label>
      <input v-model="passwordConfirmation" type="password" /><br />
      <button type="submit" v-show="!awaiting">Registrar</button>
    </form>
    <div v-if="errorMessage" style="color: red">{{ errorMessage }}</div>
  </div>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin: auto;
}

.form-group {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 15px;
}

label {
  min-width: 150px;
  text-align: left;
  margin-right: 10px;
}

input {
  width: 200px;
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>