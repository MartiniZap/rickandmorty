<template>
  <div>
    <header
      class="bg-gray-800 text-white p-4 flex justify-between items-center"
    >
      <h1 class="text-xl font-bold">Rick & Morty Explorer</h1>

      <nav class="space-x-4">
        <NuxtLink
          to="/"
          class="hover:underline"
          active-class="underline font-semibold"
          >Home</NuxtLink
        >
        <NuxtLink
          to="/favorites"
          class="hover:underline"
          active-class="underline font-semibold"
          >Favorites</NuxtLink
        >
        <NuxtLink
          to="/challenge"
          class="hover:underline"
          active-class="underline font-semibold"
          >Challenge</NuxtLink
        >
      </nav>
    </header>

    <main class="p-6">
      <slot />
      <Toast />
    </main>
  </div>
</template>
<script setup lang="ts">
import Toast from "~/components/Toast.vue";
</script>
