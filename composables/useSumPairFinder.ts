import { ref, watch } from "vue";
import type { Ref } from "vue";

export function useSumPairFinder(numbers: Ref<string>, target: Ref<number>) {
  const firstPair = ref<[number, number] | string | null>(null);

  watch(
    [numbers, target],
    () => {
      const numList = numbers.value
        .split(",")
        .map((n) => parseInt(n.trim()))
        .filter((n) => !isNaN(n));

      const seen = new Set<number>();
      firstPair.value = "No valid pair found";

      for (const num of numList) {
        const complement = target.value - num;
        if (seen.has(complement)) {
          firstPair.value = [complement, num];
          break;
        }
        seen.add(num);
      }
    },
    { immediate: true }
  );

  return { firstPair };
}
