import { Action, legacy_createStore as createStore } from '@reduxjs/toolkit';
import { AppState } from './types';
import { reducer } from './reducers';
import {
  decrement,
  fetchPokemons,
  fetchPokemonsSuccess,
  increment,
  incrementByAmount,
  setFilter,
} from './actions';
import { counterValueSelector, filteredPokemonsSelector, pokemonsSelector } from './selectors';

const store = createStore<AppState, Action>(reducer);

store.subscribe(() => {
  console.log('Pokemons', pokemonsSelector(store.getState()));
  console.log('Counter', counterValueSelector(store.getState()));
  console.log('Filtered pokemons', filteredPokemonsSelector(store.getState()));
});

console.log('Initial state', store.getState());

// Dispatching actions
store.dispatch(increment());
store.dispatch(decrement());
store.dispatch(incrementByAmount(5));
store.dispatch(fetchPokemons());
store.dispatch(
  fetchPokemonsSuccess([
    {
      id: 1,
      name: 'Bulbizarre',
      types: ['Plante', 'Poison'],
      hp: 45,
      cp: 49,
      picture:
        'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/001.png',
      created: new Date(),
    },
    {
      id: 4,
      name: 'Salamèche',
      types: ['Feu'],
      hp: 39,
      cp: 52,
      picture:
        'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/004.png',
      created: new Date(),
    },
    {
      id: 7,
      name: 'Carapuce',
      types: ['Eau'],
      hp: 44,
      cp: 48,
      picture:
        'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/007.png',
      created: new Date(),
    },
  ]),
);
store.dispatch(setFilter('Sala'));
