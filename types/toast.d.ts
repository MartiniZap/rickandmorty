import type { ToastType, ToastOptions } from "vue3-toastify";

declare module "#app" {
  interface NuxtApp {
    $toast: {
      (message: string, options?: ToastOptions): void;
      success(message: string, options?: ToastOptions): void;
      error(message: string, options?: ToastOptions): void;
      info(message: string, options?: ToastOptions): void;
      warning(message: string, options?: ToastOptions): void;
    };
  }
}

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $toast: {
      (message: string, options?: ToastOptions): void;
      success(message: string, options?: ToastOptions): void;
      error(message: string, options?: ToastOptions): void;
      info(message: string, options?: ToastOptions): void;
      warning(message: string, options?: ToastOptions): void;
    };
  }
}
