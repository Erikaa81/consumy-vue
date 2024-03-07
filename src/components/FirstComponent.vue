<script setup lang="ts">
const message = defineModel('message', {default: "Hello World"})

function limpar(){
   message.value = ""
}
</script>

<template>
 <h1>Meu primeiro componente</h1>

<div>
   Dizendo olá, para variar: {{message}}
   <button @click="limpar">apaga tudo!</button>
</div>

<input v-model="message"/>
</template>