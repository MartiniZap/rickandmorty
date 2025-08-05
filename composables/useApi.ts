import { ref, watch } from "vue";
import type { Ref } from "vue";

export function useApi<T>(url: Ref<string>, options = {}) {
  const data = ref<T | null>(null);
  const error = ref<Error | null>(null);
  const loading = ref(true);

  const fetchData = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await $fetch<T>(url.value, options);
      data.value = response;
    } catch (err: any) {
      error.value = err;
    } finally {
      loading.value = false;
    }
  };

  watch(url, fetchData, { immediate: true });

  return { data, error, loading, refresh: fetchData };
}
