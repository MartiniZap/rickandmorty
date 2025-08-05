<script setup lang="ts">
import { useFavoritesStore } from "~/stores/favorites";
import { storeToRefs } from "pinia";

useHead({
  title: "Your Favorite Characters - Rick & Morty Explorer",
  meta: [
    {
      name: "description",
      content: "View your favorite Rick & Morty characters",
    },
  ],
});

const favoritesStore = useFavoritesStore();
const { favorites } = storeToRefs(favoritesStore);

const removeFromFavorites = (id: number) => {
  favoritesStore.remove(id);
};
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6">Your Favorite Characters</h1>

    <div v-if="favorites.length === 0" class="text-gray-500">
      You have no favorite characters yet.
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <div
        v-for="char in favorites"
        :key="char.id"
        class="border rounded p-4 cursor-pointer hover:shadow-lg"
      >
        <NuxtLink :to="`/character/${char.id}`" class="flex items-center gap-4">
          <img :src="char.image" :alt="char.name" class="w-16 h-16 rounded" />
          <div>
            <h2 class="font-semibold text-lg">{{ char.name }}</h2>
            <p class="text-sm text-gray-600">{{ char.location.name }}</p>
          </div>
        </NuxtLink>

        <button
          @click="removeFromFavorites(char.id)"
          class="mt-2 px-3 py-1 bg-red-500 text-white rounded"
        >
          Remove
        </button>
      </div>
    </div>
  </div>
</template>
