<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <main>
    <h1>Delivery: Welcome</h1>
    <nav>
      <RouterLink :to="{name: 'signin'}">Sign In</RouterLink>
    </nav>
  </main>
</template>