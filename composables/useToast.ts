import { ref } from "vue";

const message = ref<string | null>(null);

export function useToast() {
  function show(msg: string, duration = 3000) {
    message.value = msg;
    setTimeout(() => {
      message.value = null;
    }, duration);
  }

  return {
    message,
    show,
  };
}
