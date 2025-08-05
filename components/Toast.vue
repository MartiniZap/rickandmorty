<template>
  <div
    v-if="message"
    class="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-600 text-white p-3 rounded shadow"
  >
    {{ message }}
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useToast } from "~/composables/useToast";

const { message } = useToast();
</script>

<style scoped></style>
