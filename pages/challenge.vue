<script setup lang="ts">
import { ref } from "vue";
import { useSumPairFinder } from "~/composables/useSumPairFinder";

useHead({
  title: "Algorithmic Challenge - Rick & Morty Explorer",
  meta: [
    {
      name: "description",
      content: "Find pairs of numbers adding up to a target",
    },
  ],
});

const numbers = ref("");
const target = ref(0);

const { firstPair } = useSumPairFinder(numbers, target);
</script>

<template>
  <div class="max-w-md mx-auto p-6">
    <h2 class="text-2xl font-bold mb-6">Algorithmic Challenge</h2>

    <div class="space-y-4">
      <div>
        <label for="numbers" class="block font-medium mb-1"
          >Numbers (comma-separated):</label
        >
        <input
          id="numbers"
          v-model="numbers"
          type="text"
          placeholder="e.g. 1,4,7,9,3"
          class="border p-2 rounded w-full"
        />
      </div>

      <div>
        <label for="target" class="block font-medium mb-1">Target Sum:</label>
        <input
          id="target"
          v-model.number="target"
          type="number"
          placeholder="e.g. 10"
          class="border p-2 rounded w-full"
        />
      </div>

      <div class="mt-6 text-lg">
        <p v-if="Array.isArray(firstPair)" class="text-green-600">
          ✅ Found pair: {{ firstPair[0] }} + {{ firstPair[1] }} = {{ target }}
        </p>
        <p v-else class="text-red-600 font-semibold">❌ {{ firstPair }}</p>
      </div>
    </div>
  </div>
</template>
