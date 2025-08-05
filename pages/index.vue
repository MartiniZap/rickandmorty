<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Characters</h1>

    <input
      v-model="search"
      type="text"
      placeholder="Search by name..."
      class="w-full p-2 mb-4 border rounded"
    />

    <div v-if="loading && page === 1" class="text-gray-500">Loading...</div>
    <div v-else-if="error" class="text-red-500">Error loading data.</div>

    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      <NuxtLink
        v-for="char in characters"
        :key="char.id"
        :to="`/character/${char.id}`"
        class="border p-3 rounded hover:shadow"
      >
        <img :src="char.image" :alt="char.name" class="rounded mb-2" />
        <h2 class="font-semibold">{{ char.name }}</h2>
        <p class="text-sm text-gray-500">Location: {{ char.location.name }}</p>
      </NuxtLink>
    </div>

    <button
      v-if="data?.info?.next && !loading"
      @click="loadMore"
      class="mt-4 w-full px-4 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      Load More
    </button>

    <div v-if="loading && page > 1" class="text-gray-500 mt-2">
      Loading more...
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useDebounce } from "@vueuse/core";
import { useApi } from "~/composables/useApi";
import { useHead } from "#imports";

useHead({
  title: "Rick & Morty Explorer - Home",
  meta: [
    { name: "description", content: "Browse Rick & Morty characters easily" },
  ],
});

const search = ref("");
const debouncedSearch = useDebounce(search, 500);

const page = ref(1);
const characters = ref<any[]>([]);

const apiUrl = computed(() =>
  debouncedSearch.value
    ? `https://rickandmortyapi.com/api/character/?name=${debouncedSearch.value}&page=${page.value}`
    : `https://rickandmortyapi.com/api/character?page=${page.value}`
);

const { data, error, loading, refresh } = useApi<{
  results: any[];
  info: { next: string | null };
}>(apiUrl);

watch(debouncedSearch, () => {
  page.value = 1;
  characters.value = [];
  refresh();
});

watch(
  () => data.value,
  (newData) => {
    if (newData?.results) {
      if (page.value === 1) {
        characters.value = newData.results;
      } else {
        characters.value = [...characters.value, ...newData.results];
      }
    }
  }
);

const loadMore = () => {
  if (data.value?.info.next) {
    page.value++;
    refresh();
  }
};
</script>
