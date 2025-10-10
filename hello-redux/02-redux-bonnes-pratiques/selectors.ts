import { AppState } from "./types";

export function pokemonsSelector(state: AppState) {
  return state.pokemons.list;
}

export function counterValueSelector(state: AppState) {
  return state.counter.value;
}

export function filteredPokemonsSelector(state: AppState) {
  const filter = state.pokemons.filter.toLowerCase();
  return state.pokemons.list.filter((pokemon) =>
    pokemon.name?.toLowerCase().includes(filter),
  );
}