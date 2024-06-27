<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { buyers } from '../buyers';
import { Auth } from '../auth'; 

const router = useRouter();
const auth = new Auth();
const currentUser = auth.currentUser();

const selectedFile = ref<File | null>(null);
const buyerEmail = ref('');
const message = ref('');
const alertType = ref('');
const route = useRoute()

const buyerId = route.params.id

const fetchBuyer = async () => {
  if (!currentUser || !currentUser.id) {
    message.value = 'ID do usuário é inválido.';
    alertType.value = 'danger';
    return;
  }

  try {
    const response = await buyers.getBuyer(currentUser.id, buyerEmail.value);
    if (response) {
      buyerEmail.value = response.buyer.email;
    } else {
      message.value = 'Falha ao obter dados do comprador.';
      alertType.value = 'danger';
    }
  } catch (error) {
    message.value = 'Erro ao obter dados do comprador.';
    alertType.value = 'danger';
  }
};

const handleSubmit = async () => {
  try {
    const response = await buyers.editBuyer(buyerEmail.value, buyerId)

    message.value = response.message || 'Loja editada com sucesso!'
    alertType.value = 'success'
    await fetchBuyer() 
  } catch (error) {
    message.value = 'Erro ao editar loja.'
    alertType.value = 'danger'
  }
}


onMounted(() => {
  fetchBuyer();
});
</script>

<template>
  <div>
    <h1>Perfil do Usuário</h1>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="email">Email:</label>
        <input type="email" v-model="buyerEmail" required />
      </div>
      <button type="submit">Salvar</button>
    </form>
    <p v-if="message">{{ message }}</p>
  </div>
</template>
<style scoped>
.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 10px 15px;
  font-size: 16px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.alert {
  margin-top: 15px;
  padding: 10px;
  border-radius: 4px;
}

.alert-success {
  background-color: #d4edda;
  color: #155724;
}

.alert-danger {
  background-color: #f8d7da;
  color: #721c24;
}
</style>
