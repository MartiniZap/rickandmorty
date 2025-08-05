<template>
  <div class="p-6">
    <button @click="goBack" class="mb-4 text-blue-500 underline">
      ← Go back
    </button>

    <div v-if="loading" class="text-gray-500">Loading character...</div>
    <div v-else-if="error" class="text-red-500">Error loading character.</div>

    <div v-else class="flex flex-col md:flex-row gap-6">
      <img :src="character.image" :alt="character.name" class="w-48 rounded" />

      <div class="flex flex-col justify-start">
        <h1 class="text-3xl font-bold mb-2">{{ character.name }}</h1>
        <p><strong>Status:</strong> {{ character.status }}</p>
        <p><strong>Species:</strong> {{ character.species }}</p>
        <p><strong>Gender:</strong> {{ character.gender }}</p>
        <p><strong>Origin:</strong> {{ character.origin?.name }}</p>
        <p><strong>Location:</strong> {{ character.location?.name }}</p>

        <button
          v-if="character"
          @click="toggleFavorite"
          class="mt-6 px-4 py-2 rounded text-white max-w-max self-start"
          :class="alreadyFavorite ? 'bg-red-500' : 'bg-green-500'"
        >
          {{ alreadyFavorite ? "Remove from Favorites" : "Add to Favorites" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { ref, computed, watch } from "vue";
import { useHead } from "#imports";
import { useApi } from "~/composables/useApi";
import { useFavoritesStore } from "~/stores/favorites";

const characterName = ref("");

useHead(() => ({
  title: characterName.value
    ? `${characterName.value} - Rick & Morty Explorer`
    : "Character Details - Rick & Morty Explorer",
}));

const route = useRoute();
const router = useRouter();

const id = route.params.id as string;
const url = computed(() => `https://rickandmortyapi.com/api/character/${id}`);

const { data, error, loading } = useApi<any>(url);

const character = computed(() => data.value ?? {});

watch(
  () => data.value,
  (newCharacter) => {
    if (newCharacter?.name) {
      characterName.value = newCharacter.name;
    }
  }
);

const goBack = () => router.back();

const favoritesStore = useFavoritesStore();
const alreadyFavorite = computed(() =>
  favoritesStore.isFavorite(character.value?.id)
);

const toggleFavorite = () => {
  if (!character.value) return;
  if (alreadyFavorite.value) {
    favoritesStore.remove(character.value.id);
  } else {
    favoritesStore.add(character.value);
  }
};
</script>
