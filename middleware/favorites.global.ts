import { useFavoritesStore } from "~/stores/favorites";
import { defineNuxtRouteMiddleware, navigateTo, useNuxtApp } from "#imports";

export default defineNuxtRouteMiddleware((to) => {
  if (to.path === "/favorites") {
    const favoritesStore = useFavoritesStore();
    if (favoritesStore.favorites.length === 0 && process.client) {
      const nuxtApp = useNuxtApp();
      nuxtApp.$toast.error("No favorites yet! Add some characters first.");
      return navigateTo("/");
    }
  }
});

// This is the verison with the custom toast composable
// import { useFavoritesStore } from "~/stores/favorites";
// import { defineNuxtRouteMiddleware, navigateTo } from "#imports";
// import { useToast } from "~/composables/useToast";

// export default defineNuxtRouteMiddleware((to) => {
//   if (to.path === "/favorites") {
//     const favoritesStore = useFavoritesStore();
//     if (favoritesStore.favorites.length === 0) {
//       const toast = useToast();
//       toast.show("No favorites yet! Add some characters first.", 3000);
//       return navigateTo("/");
//     }
//   }
// });
