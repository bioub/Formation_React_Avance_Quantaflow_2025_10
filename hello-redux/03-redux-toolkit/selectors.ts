import { createSelector } from "@reduxjs/toolkit";
import { AppState } from "./types";

export function pokemonsSelector(state: AppState) {
  return state.pokemons.list;
}

export function counterValueSelector(state: AppState) {
  return state.counter.value;
}

// With reselect (memoization)
export const filteredPokemonsSelector = createSelector(
  (state: AppState) => state.pokemons.list,
  (state: AppState) => state.pokemons.filter,
  (list, filter) => {
    const lowercasedFilter = filter.toLowerCase();
    return list.filter((pokemon) =>
      pokemon.name?.toLowerCase().includes(lowercasedFilter),
    );
  }
);

// Without reselect
// export function filteredPokemonsSelector(state: AppState) {
//   const filter = state.pokemons.filter.toLowerCase();
//   return state.pokemons.list.filter((pokemon) =>
//     pokemon.name?.toLowerCase().includes(filter),
//   );
// }