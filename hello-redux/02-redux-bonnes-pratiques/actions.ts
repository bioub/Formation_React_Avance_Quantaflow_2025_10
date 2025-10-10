import { INCREMENT, DECREMENT, INCREMENT_BY_AMOUNT, FETCH_POKEMONS, FETCH_POKEMONS_SUCCESS, SET_FILTER, FETCH_POKEMONS_ERROR } from "./constants";

// FSA (Flux Standard Action)
// https://github.com/redux-utilities/flux-standard-action

function increment() {
  return { type: INCREMENT };
}

function decrement() {
  return { type: DECREMENT };
}

function incrementByAmount(amount: number) {
  return { type: INCREMENT_BY_AMOUNT, payload: amount };
}

function setFilter(filter: string) {
  return { type: SET_FILTER, payload: filter };
}

function fetchPokemons() {
  return { type: FETCH_POKEMONS };
}

function fetchPokemonsSuccess(pokemons: any[]) {
  return { type: FETCH_POKEMONS_SUCCESS, payload: pokemons };
}

function fetchPokemonsError(error: any) {
  return { type: FETCH_POKEMONS_ERROR, payload: error, error: true };
}

export { increment, decrement, incrementByAmount, setFilter, fetchPokemons, fetchPokemonsSuccess, fetchPokemonsError };