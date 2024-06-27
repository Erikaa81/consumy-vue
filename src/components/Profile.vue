<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { buyers } from '../buyers';
import { Auth } from '../auth'; 

const router = useRouter();
const auth = new Auth();
const currentUser = auth.currentUser();
const userBuyers = ref<any[]>([]);
const route = useRoute()
const buyerId = route.params.id


const selectedFile = ref<File | null>(null);
const buyerEmail = ref('');
const message = ref('');
const alertType = ref('');

const fetchBuyer = async () => {
  if (!currentUser || !currentUser.id) {
    message.value = 'ID do usuário é inválido.';
    alertType.value = 'danger';
    return;
  }

  try {
    const response = await buyers.getBuyers();
    if (response.buyers && response.buyers.length) {
      userBuyers.value = response.buyers
    } else {
      message.value = 'Falha ao obter dados do comprador.';
      alertType.value = 'danger';
    }
  } catch (error) {
    message.value = 'Erro ao obter dados do comprador.';
    alertType.value = 'danger';
  }
}

const editBuyer = (buyerId: number) => {
  router.push({ name: 'editBuyer', params: { id: buyerId, email: buyerEmail.value } });
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

const onFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    selectedFile.value = target.files[0]
  }
}

onMounted(fetchBuyer)
</script>

<template>
<div>
  <h1>Perfil</h1>
  <ul>
    <li v-for="buyer in userBuyers" :key="buyer.id">
      {{ buyer.email }}
      <form @submit.prevent="handleSubmit()">
         
        <button @click="editBuyer(buyer.id)">Editar</button>
      </form>
    </li>
  </ul>
  <p v-if="message" :class="`alert alert-${alertType}`">{{ message }}</p>
</div>
</template>

<style scoped>
/* Adicione seus estilos aqui */
</style>
