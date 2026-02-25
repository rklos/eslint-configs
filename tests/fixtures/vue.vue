<script setup>
import { ref } from 'vue';

const count = ref(0);
const increment = () => { count.value += 1; };
</script>

<template>
  <button @click="increment">
    Count: {{ count }}
  </button>
</template>
