import { createAction } from "@reduxjs/toolkit";
import { Pokemon } from "./types";

// FSA (Flux Standard Action)
// https://github.com/redux-utilities/flux-standard-action

const increment = createAction('INCREMENT');
const decrement = createAction('DECREMENT');
const incrementByAmount = createAction<number>('INCREMENT_BY_AMOUNT');

const setFilter = createAction<string>('SET_FILTER');
const fetchPokemons = createAction('FETCH_POKEMONS');
const fetchPokemonsSuccess = createAction<Pokemon[]>('FETCH_POKEMONS_SUCCESS');
const fetchPokemonsError = createAction<Error>('FETCH_POKEMONS_ERROR');

export { increment, decrement, incrementByAmount, setFilter, fetchPokemons, fetchPokemonsSuccess, fetchPokemonsError };