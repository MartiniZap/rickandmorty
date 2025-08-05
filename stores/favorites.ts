import { defineStore } from "pinia";

export const useFavoritesStore = defineStore("favorites", () => {
  const favorites = ref<any[]>([]);

  const add = (character: any) => {
    if (!favorites.value.find((c) => c.id === character.id)) {
      favorites.value.push(character);
    }
  };

  const remove = (id: number) => {
    favorites.value = favorites.value.filter((c) => c.id !== id);
  };

  const isFavorite = (id: number) => {
    return favorites.value.some((c) => c.id === id);
  };

  return { favorites, add, remove, isFavorite };
});
