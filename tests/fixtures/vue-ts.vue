<script setup lang="ts">
import { ref } from 'vue';

const count = ref<number>(0);
const increment = (): void => { count.value += 1; };
</script>

<template>
  <button @click="increment">
    Count: {{ count }}
  </button>
</template>
