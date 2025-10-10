import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "./store";

export function filterSelector(state: RootState) {
  return state.pokemons.filter;
}

export function pokemonsSelector(state: RootState) {
  return state.pokemons.list;
}

export function pokemonsLoadingSelector(state: RootState) {
  return state.pokemons.loading;
}
export function pokemonsErrorSelector(state: RootState) {
  return state.pokemons.error;
}

export function counterValueSelector(state: RootState) {
  return state.counter.value;
}

// With reselect (memoization)
export const filteredPokemonsSelector = createSelector(
  (state: RootState) => state.pokemons.list,
  (state: RootState) => state.pokemons.filter,
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